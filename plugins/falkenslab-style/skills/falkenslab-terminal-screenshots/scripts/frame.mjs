#!/usr/bin/env node
// Frames a terminal screenshot as a macOS window: traffic lights, a centered title, rounded corners, a thin
// border and a soft shadow, on a transparent background. Renders HTML with headless Chrome/Edge, so it needs
// nothing installed but a Chromium browser.
//
//   node frame.mjs <input.png> <output.png> [--title "Captain Whiskers"] [--crop top,right,bottom,left]
//                  [--bg "#141414"] [--scale 2] [--width 1320]
//
// --crop   pixels to cut from the input first (the OS's own title bar, a scrollbar): e.g. 41,14,8,8
// --bg     the window's color: the terminal's background, so the title bar and the content match
// --scale  device pixel ratio of the output (2 for crisp text on retina screens; the input isn't upscaled)
// --width  the output's width in CSS pixels before --scale (the input is scaled to fit); default: the input's
// CHROME   environment variable: the browser's path, when it isn't found
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args.splice(i, 2)[1] : fallback;
};
const title = flag("title", "");
const crop = flag("crop", "0,0,0,0").split(",").map(Number);
const bg = flag("bg", "#141414");
const scale = Number(flag("scale", "1"));
const widthFlag = flag("width", "");
const [input, output] = args;
if (!input || !output) {
  console.error('Usage: node frame.mjs <input.png> <output.png> [--title "…"] [--crop t,r,b,l] [--bg "#141414"] [--scale 2] [--width 1320]');
  process.exit(1);
}

// The PNG's size, from its IHDR chunk.
const png = readFileSync(input);
if (png.toString("ascii", 1, 4) !== "PNG") throw new Error(`${input} isn't a PNG`);
const [top, right, bottom, left] = [0, 1, 2, 3].map((i) => crop[i] ?? 0);
const srcWidth = png.readUInt32BE(16) - left - right;
const srcHeight = png.readUInt32BE(20) - top - bottom;

const BAR = 36; // title bar height
const PAD = 56; // room around the window for its shadow
const width = widthFlag ? Number(widthFlag) : srcWidth;
const ratio = width / srcWidth;
const height = Math.round(srcHeight * ratio);
const escape = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
html, body { margin: 0; background: transparent; }
body { padding: ${PAD}px; width: ${width}px; }
.window { width: ${width}px; border-radius: 12px; overflow: hidden; background: ${bg};
  box-shadow: 0 0 0 1px rgba(255,255,255,.10), 0 0 0 1.5px rgba(0,0,0,.55), 0 14px 36px rgba(0,0,0,.30), 0 4px 10px rgba(0,0,0,.18); }
.bar { height: ${BAR}px; position: relative; display: flex; align-items: center; justify-content: center; }
.lights { position: absolute; left: 14px; top: 0; height: ${BAR}px; display: flex; align-items: center; gap: 8px; }
.lights i { width: 12px; height: 12px; border-radius: 50%; box-shadow: inset 0 0 0 .5px rgba(0,0,0,.25); }
.title { font: 600 13px -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif; color: #e6e6e6; letter-spacing: .1px; }
.content { width: ${width}px; height: ${height}px; overflow: hidden; }
.content img { display: block; width: ${Math.round((srcWidth + left + right) * ratio)}px; margin: ${-top * ratio}px 0 0 ${-left * ratio}px; }
</style></head><body><div class="window">
<div class="bar"><div class="lights"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i></div><div class="title">${escape(title)}</div></div>
<div class="content"><img src="${pathToFileURL(path.resolve(input)).href}"></div>
</div></body></html>`;

const chrome =
  process.env.CHROME ??
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].find(existsSync);
if (!chrome) throw new Error("No Chrome or Edge found: set CHROME to the browser's path.");

const dir = mkdtempSync(path.join(tmpdir(), "frame-"));
try {
  const page = path.join(dir, "frame.html");
  writeFileSync(page, html);
  execFileSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--user-data-dir=${path.join(dir, "profile")}`,
    "--default-background-color=00000000",
    `--force-device-scale-factor=${scale}`,
    `--window-size=${width + 2 * PAD},${height + BAR + 2 * PAD}`,
    `--screenshot=${path.resolve(output)}`,
    pathToFileURL(page).href,
  ], { stdio: "ignore" });
} finally {
  rmSync(dir, { recursive: true, force: true });
}
console.log(`${output}: ${(width + 2 * PAD) * scale} x ${(height + BAR + 2 * PAD) * scale}`);
