// Builds everything from data/prompts.json. No dependencies: `node scripts/build.mjs`.
//  - index.html           the JSON is copied into the page (so it works offline from file://)
//  - questions/<lang>.md  all questions as one readable list
//  - templates/<lang>/    one Markdown template per situation (Obsidian, Notion, Bear, any notes app)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "data/prompts.json"), "utf8"));
const LANGS = ["en", "ru"];
const TOOL = "https://pairclear.github.io/reflection-journal/";
const SITE = { en: "https://pairclear.com/en/", ru: "https://pairclear.com/ru/" };
const utm = (m) => "?utm_source=github&utm_medium=" + m + "&utm_campaign=reflection-journal";

const L = {
  en: {
    title: "Relationship journal prompts by situation",
    intro: "Questions for the hard moments in a relationship, grouped by situation. Pick one situation, answer the questions in order, skip what does not fit. Each question has a follow-up in italics.",
    banner: "> **Self-reflection, not diagnosis.** These questions are not a test or therapy and do not replace a professional. If you are thinking about hurting yourself, are afraid of your partner, or there is violence at home, call emergency services (112 in Europe, 911 in the US and Canada) or find a free helpline at [findahelpline.com](https://findahelpline.com).",
    use: "Use when", first: "First", closing: "Wrap-up (for every situation)",
    tool: "Answer them one at a time in the [web tool](" + TOOL + "?lang=en" + "&s=", tool2: "), which keeps your answers only in your browser.",
    contents: "Situations", foot: "Written with AI assistance. Licence: CC BY 4.0. Made by [PairClear](" + SITE.en + utm("readme") + "). Generated from `data/prompts.json`, do not edit by hand.",
    tpl_note: "Self-reflection, not diagnosis. If you are not safe, see findahelpline.com.",
    situation: "situation"
  },
  ru: {
    title: "Вопросы для дневника отношений по ситуациям",
    intro: "Вопросы на трудные моменты в отношениях, сгруппированные по ситуациям. Выбери одну ситуацию, отвечай по порядку, пропускай то, что не подходит. У каждого вопроса есть уточнение курсивом.",
    banner: "> **Саморефлексия, а не диагностика.** Эти вопросы не тест и не терапия и не заменяют специалиста. Если есть мысли навредить себе, ты боишься партнёра или дома есть насилие, позвони в экстренную службу (112 в Европе, 911 в США и Канаде) или найди бесплатную линию поддержки на [findahelpline.com](https://findahelpline.com).",
    use: "Когда подходит", first: "Сначала", closing: "Итог (для любой ситуации)",
    tool: "Отвечать по одному вопросу удобно в [веб-версии](" + TOOL + "?lang=ru" + "&s=", tool2: "), она хранит ответы только в твоём браузере.",
    contents: "Ситуации", foot: "Написано с помощью ИИ. Лицензия: CC BY 4.0. Сделано [PairClear](" + SITE.ru + utm("readme") + "). Файл собран из `data/prompts.json`, не правь его вручную.",
    tpl_note: "Саморефлексия, не диагностика. Если тебе небезопасно, смотри findahelpline.com.",
    situation: "ситуация"
  }
};

const qline = (q, lang, n) => n + ". **" + q.q[lang] + "**  \n   _" + q.f[lang] + "_";

// 1) questions/<lang>.md
mkdirSync(join(root, "questions"), { recursive: true });
for (const lang of LANGS) {
  const l = L[lang];
  let md = "# " + l.title + "\n\n" + l.banner + "\n\n" + l.intro + "\n\n## " + l.contents + "\n\n";
  md += data.situations.map(s => "- [" + s.title[lang] + "](#" + s.id + ")").join("\n") + "\n- [" + l.closing + "](#closing)\n";
  for (const s of data.situations) {
    md += "\n<a id=\"" + s.id + "\"></a>\n\n## " + s.title[lang] + "\n\n";
    md += "**" + l.use + ":** " + s.use_when[lang] + "\n\n";
    md += "**" + l.first + ":** " + s.before[lang] + "\n\n";
    md += s.prompts.map((q, i) => qline(q, lang, i + 1)).join("\n") + "\n\n";
    md += l.tool + s.id + l.tool2 + "\n";
  }
  md += "\n<a id=\"closing\"></a>\n\n## " + l.closing + "\n\n" + data.closing.map((q, i) => qline(q, lang, i + 1)).join("\n") + "\n\n---\n\n" + l.foot + "\n";
  writeFileSync(join(root, "questions", lang + ".md"), md);
}

// 2) templates/<lang>/<id>.md  ({{date}} works in Obsidian core Templates; elsewhere just replace it)
for (const lang of LANGS) {
  const dir = join(root, "templates", lang);
  mkdirSync(dir, { recursive: true });
  for (const s of data.situations) {
    let md = "---\ndate: {{date}}\n" + L[lang].situation + ": " + s.title[lang] + "\ntags: [reflection-journal, " + s.id + "]\n---\n\n";
    md += "# " + s.title[lang] + "\n\n> " + s.before[lang] + "\n\n";
    for (const q of s.prompts.concat(data.closing)) md += "## " + q.q[lang] + "\n_" + q.f[lang] + "_\n\n\n\n";
    md += "---\n" + L[lang].tpl_note + "\n";
    writeFileSync(join(dir, s.id + ".md"), md);
  }
}

// 3) index.html
const htmlPath = join(root, "index.html");
const html = readFileSync(htmlPath, "utf8");
const re = /\/\*DATA\*\/[\s\S]*?\/\*\/DATA\*\//;
if (!re.test(html)) throw new Error("DATA markers not found in index.html");
writeFileSync(htmlPath, html.replace(re, () => "/*DATA*/" + JSON.stringify(data) + "/*/DATA*/"));

console.log("Built: index.html, questions/{en,ru}.md, templates/{en,ru}/*.md");
