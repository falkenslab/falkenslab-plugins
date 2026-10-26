// Applies the mechanical rules of the markdown-writing skill to existing files, in place:
//  1. joins hard-wrapped lines of paragraphs, list items and blockquotes into one line each;
//  2. removes horizontal rules (---, ***, ___) used as section separators.
// Leaves YAML frontmatter, fenced code, tables, headings and HTML untouched, and keeps line endings.
// Usage: node fix-markdown.mjs <file.md> [more.md ...]
import fs from "node:fs";

const isRule = (s) => /^\s{0,3}([-*_])(\s*\1){2,}\s*$/.test(s);
// A line that starts with a template placeholder ({{name}}) stands on its own: it may expand to whole blocks.
const isPlaceholder = (s) => /^\s*\{\{/.test(s);
const startsBlock = (s) => s.trim() === "" || isRule(s) || isPlaceholder(s) || /^\s*(#|\||```|~~~|[-*+] |\d+[.)] |>|<)/.test(s);
const endsParagraph = (s) => s.trim() === "" || isRule(s) || isPlaceholder(s) || /^\s*(#|\||```|~~~|>|<)/.test(s) || /( {2}|\\)$/.test(s);

for (const file of process.argv.slice(2)) {
  const src = fs.readFileSync(file, "utf8");
  const eol = src.includes("\r\n") ? "\r\n" : "\n";
  const lines = src.split(/\r?\n/);
  const out = [];

  // YAML frontmatter is copied as is.
  let i = 0;
  if (lines[0]?.trim() === "---") {
    const end = lines.indexOf("---", 1);
    if (end > 0) { out.push(...lines.slice(0, end + 1)); i = end + 1; }
  }

  let inFence = false;
  for (; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; out.push(line); continue; }
    if (inFence) { out.push(line); continue; }
    const prev = out.length ? out[out.length - 1] : "";
    // A rule after a blank line is a separator: drop it (after a text line it would be a setext heading).
    if (isRule(line) && prev.trim() === "") continue;
    // A blank line right after another blank line (left by a dropped rule) is redundant.
    if (line.trim() === "" && prev.trim() === "" && out.length) continue;
    // "> a" + "> b" -> "> a b", except a new speaker/label line such as "> **Name:**" or "> (note)".
    if (/^>\s*\S/.test(line) && /^>\s*\S/.test(prev) && !/^>\s*(\*\*|\()/.test(line)) {
      out[out.length - 1] = `${prev} ${line.replace(/^>\s*/, "")}`;
      continue;
    }
    // Indented continuation of a list item, or a plain continuation line of a paragraph.
    const continuation = /^\s+\S/.test(line) ? !/^\s*([-*+] |\d+[.)] |```|~~~|\|)/.test(line) : !startsBlock(line);
    if (!endsParagraph(prev) && continuation) {
      out[out.length - 1] = `${prev} ${line.trim()}`;
      continue;
    }
    out.push(line);
  }
  fs.writeFileSync(file, out.join(eol));
}
