// A Falken's Lab page's behavior: English and Spanish, light, dark or the system's theme, tabs and copy
// buttons. Every element with data-text="key" takes TEXTS[lang][key] (HTML allowed in "intro").
const TEXTS = {
  en: {
    language: "Language", theme: "Theme", themes: { light: "Light", dark: "Dark", system: "System" },
    copy: "Copy", copied: "Copied", docs: "Docs", start: "Get started",
    title: "PROJECT's promise, in a few words",
    intro: "What it is, for whom, and what sets it apart, in one or two sentences.",
    whyTitle: "Why PROJECT",
    why1Title: "A first reason", why1: "One or two sentences of what it means for the reader.",
    why2Title: "A second reason", why2: "One or two sentences of what it means for the reader.",
    why3Title: "A third reason", why3: "One or two sentences of what it means for the reader.",
  },
  es: {
    language: "Idioma", theme: "Tema", themes: { light: "Claro", dark: "Oscuro", system: "Sistema" },
    copy: "Copiar", copied: "Copiado", docs: "Documentación", start: "Empezar",
    title: "La promesa de PROJECT, en pocas palabras",
    intro: "Qué es, para quién y qué lo distingue, en una o dos frases.",
    whyTitle: "Por qué PROJECT",
    why1Title: "Una primera razón", why1: "Una o dos frases de lo que significa para quien lee.",
    why2Title: "Una segunda razón", why2: "Una o dos frases de lo que significa para quien lee.",
    why3Title: "Una tercera razón", why3: "Una o dos frases de lo que significa para quien lee.",
  },
};

function stored(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
// ?lang=es, else what the person chose last time, else the browser's language, else English.
function pickLang() {
  const params = new URLSearchParams(location.search);
  for (const lang of [params.get("lang"), stored("lang"), ...(navigator.languages ?? [navigator.language])]) {
    const short = String(lang ?? "").slice(0, 2).toLowerCase();
    if (short in TEXTS) return short;
  }
  return "en";
}
let lang = pickLang();
const t = (key) => TEXTS[lang][key];

// Light, dark or the system's; the choice is remembered (the head applies it before painting).
let theme = ["light", "dark"].includes(stored("theme")) ? stored("theme") : "system";
function applyTheme() {
  if (theme === "system") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  for (const button of document.querySelectorAll("[data-theme-choice]")) {
    const choice = button.dataset.themeChoice;
    button.setAttribute("aria-pressed", String(choice === theme));
    button.title = t("themes")[choice];
    button.setAttribute("aria-label", t("themes")[choice]);
  }
}
for (const button of document.querySelectorAll("[data-theme-choice]")) {
  button.addEventListener("click", () => {
    theme = button.dataset.themeChoice;
    try { theme === "system" ? localStorage.removeItem("theme") : localStorage.setItem("theme", theme); } catch {}
    applyTheme();
  });
}

function applyLang() {
  document.documentElement.lang = lang;
  for (const element of document.querySelectorAll("[data-text]")) {
    const text = t(element.dataset.text);
    if (text === undefined) continue;
    if (element.dataset.text === "intro") element.innerHTML = text;
    else element.textContent = text;
  }
  document.getElementById("langs")?.setAttribute("aria-label", t("language"));
  document.getElementById("themes")?.setAttribute("aria-label", t("theme"));
  for (const button of document.querySelectorAll(".lang")) button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
  applyTheme();
}
for (const button of document.querySelectorAll(".lang")) {
  button.addEventListener("click", () => {
    lang = button.dataset.lang;
    try { localStorage.setItem("lang", lang); } catch {}
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
    applyLang();
  });
}

// Tabs: one panel shown at a time.
for (const tab of document.querySelectorAll(".tab")) {
  tab.addEventListener("click", () => {
    const list = tab.closest(".tabs");
    for (const other of list.querySelectorAll(".tab")) {
      const on = other === tab;
      other.setAttribute("aria-selected", String(on));
      document.getElementById(other.dataset.panel).hidden = !on;
    }
  });
}

// Copy buttons: the command next to them.
for (const button of document.querySelectorAll(".copy")) {
  button.addEventListener("click", async () => {
    const text = button.parentElement.querySelector("span")?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = t("copied");
      setTimeout(() => (button.textContent = t("copy")), 1500);
    } catch {}
  });
}

applyLang();
