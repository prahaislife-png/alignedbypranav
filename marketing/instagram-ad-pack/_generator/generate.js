// Renders the Aligned by Pranav Instagram ad pack to PNG, in the website's design:
// BluuNext / Apfel Grotezk / Fragment Mono, paper + ink + red pen, handwritten key words,
// specimen sheets and Pranav's photograph. Needs Playwright with Chromium.
// usage (from the repo root): node marketing/instagram-ad-pack/_generator/generate.js . marketing/instagram-ad-pack [filter]
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const REPO = process.argv[2];
const OUT = process.argv[3];
const FILTER = process.argv[4] || "";
const HERE = __dirname;
const b64 = (p) => fs.readFileSync(p).toString("base64");
const font = (file) => `url(data:font/woff2;base64,${b64(path.join(REPO, "src/fonts", file))}) format("woff2")`;
const PHOTO = `data:image/jpeg;base64,${b64(path.join(REPO, "public/images/portrait/pranav-vibhute-2x3.jpg"))}`;
const HW = JSON.parse(fs.readFileSync(path.join(HERE, "hw.json"), "utf8"));
const svg = (name) => fs.readFileSync(path.join(HERE, "svg", `${name}.svg`), "utf8").replace('class="h-full w-full"', 'width="100%" height="100%"');

const C = {
  paper: "#f3f1eb", paper2: "#e7e3d8", paper3: "#dcd6c8", ink: "#221b2b", muted: "#5a5460", madder: "#a3352b",
  plum: "#332b40", night: "#211b29", gold: "#a88a62", goldLight: "#d1bc98", sage: "#6f7a64", line: "#cfc8ba",
};

const base = `
@font-face{font-family:bluu;font-weight:700;font-style:normal;src:${font("bluu-next-latin-700-normal.woff2")}}
@font-face{font-family:bluu;font-weight:700;font-style:italic;src:${font("bluu-next-latin-700-italic.woff2")}}
@font-face{font-family:apfel;font-weight:400;src:${font("apfel-grotezk-latin-400-normal.woff2")}}
@font-face{font-family:apfel;font-weight:700;src:${font("apfel-grotezk-latin-700-normal.woff2")}}
@font-face{font-family:fragment;font-weight:400;src:${font("fragment-mono-latin-400-normal.woff2")}}
:root{--color-paper:${C.paper};--color-paper-2:${C.paper2};--color-ink:${C.ink};--color-madder:${C.madder};--color-sage:${C.sage};--color-line:${C.line};--color-gold:${C.gold};--color-muted:${C.muted}}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:apfel,sans-serif;color:${C.ink};-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
.canvas{position:relative;overflow:hidden;background:${C.paper}}
.night{background:${C.night};color:${C.paper}}
.plum{background:${C.plum};color:${C.paper}}
.d{font-family:bluu;font-weight:700;letter-spacing:-.025em;color:${C.ink}}
.night .d,.plum .d{color:${C.paper}}
.i{font-family:bluu;font-style:italic;font-weight:700;color:${C.madder}}
.night .i,.plum .i{color:${C.goldLight}}
.note{font-family:fragment;text-transform:lowercase;color:${C.madder};letter-spacing:0}
.night .note,.plum .note{color:${C.goldLight}}
.muted{color:${C.muted}} .night .muted,.plum .muted{color:rgba(243,241,235,.78)}
.ruled{background-image:linear-gradient(to bottom,transparent calc(100% - 1.5px),${C.line} calc(100% - 1.5px));background-size:100% 46px}
.btn{display:inline-flex;align-items:center;gap:18px;background:${C.ink};color:${C.paper};font-family:apfel;font-weight:700;box-shadow:10px 10px 0 ${C.madder}}
.night .btn,.plum .btn{background:${C.paper};color:${C.ink};box-shadow:10px 10px 0 ${C.gold}}
`;

// ------------------------------------------------------------------ building blocks
const waIcon = (s) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="currentColor"><path d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2c0 1.2.9 2.4 1 2.5.1.2 1.7 2.7 4.2 3.7 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.4Z"/></svg>`;
const btn = (label, size = 30) => `<span class="btn" style="font-size:${size}px;padding:${size * 0.85}px ${size * 1.45}px">${waIcon(size * 1.15)}${label}</span>`;
const note = (t, size = 24, extra = "") => `<p class="note" style="font-size:${size}px;${extra}"><span>§ </span>${t}</p>`;

// Handwriting in a fixed vertical frame so every word shares one baseline: y from -770 to +430.
const TOP = -770, SPAN = 1200;
const hwBox = (word) => { const [x, , w] = HW[word].viewBox.split(" ").map(Number); return { x, w }; };

/** A word written by pen, set inline in a BluuNext line, with a red-pen baseline under it. */
const written = (word, { color = "currentColor", rule = C.madder, stroke = 3.2 } = {}) => {
  const { x, w } = hwBox(word);
  const H = 1.42; // em
  const below = ((SPAN + TOP) / SPAN) * H; // em below the baseline
  return `<svg viewBox="${x} ${TOP} ${w} ${SPAN}" style="display:inline-block;height:${H}em;width:auto;vertical-align:-${below}em;margin:-.3em .02em -.16em;overflow:visible" fill="none">
    <line x1="${x + 20}" x2="${x + w - 20}" y1="12" y2="12" stroke="${rule}" stroke-width="2" vector-effect="non-scaling-stroke"/>
    <path d="${HW[word].d}" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
  </svg>`;
};

/** *word* → handwritten (must exist in hw.json); _text_ → BluuNext italic in red pen / gold. */
const rich = (t, opts) => t
  .replace(/\*([^*]+)\*([^\s<]*)/g, (_, w, punct) => { if (!HW[w]) throw new Error(`no handwriting for "${w}"`); return `<span style="white-space:nowrap">${written(w, opts)}${punct}</span>`; })
  .replace(/_([^_]+)_/g, '<span class="i">$1</span>');

/** The handwritten "aligned" on a red baseline, with "by pranav" in mono. */
const wordmark = (h, { tone = "light" } = {}) => {
  const { x, w } = hwBox("aligned");
  const ink = tone === "light" ? C.ink : C.goldLight;
  const rule = tone === "light" ? C.madder : C.gold;
  const by = tone === "light" ? C.madder : C.goldLight;
  return `<span style="display:inline-flex;align-items:flex-end;gap:${h * 0.14}px">
    <svg viewBox="${x} ${TOP} ${w} ${SPAN}" height="${h}" style="width:auto;overflow:visible" fill="none">
      <line x1="${x - 40}" x2="${x + w + 20}" y1="10" y2="10" stroke="${rule}" stroke-width="2" vector-effect="non-scaling-stroke"/>
      <path d="${HW.aligned.d}" stroke="${ink}" stroke-width="${Math.max(2.2, h / 26)}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
    </svg>
    <span style="font-family:fragment;font-size:${Math.min(h * 0.24, 34)}px;color:${by};margin-bottom:${h * 0.3}px;white-space:nowrap">by pranav</span>
  </span>`;
};

/** A measuring rule with millimetre ticks. */
const ruler = (w, ticks = 40, color = C.ink) => `<svg width="${w}" height="18" viewBox="0 0 ${ticks * 10} 18" preserveAspectRatio="none" style="display:block">
  <line x1="0" x2="${ticks * 10}" y1="0.5" y2="0.5" stroke="${color}" stroke-width="1.2" vector-effect="non-scaling-stroke"/>
  ${Array.from({ length: ticks + 1 }, (_, i) => `<line x1="${i * 10}" x2="${i * 10}" y1="0" y2="${i % 10 === 0 ? 18 : i % 5 === 0 ? 11 : 6}" stroke="${color}" stroke-width="1.2" vector-effect="non-scaling-stroke"/>`).join("")}
</svg>`;

/** A graphologist's specimen sheet: fig. number, caption, ruling, illustration, measuring rule. */
const specimen = ({ ill, fig, caption, w, h, rotate = 0, compact = false }) => `
  <figure style="width:${w}px;height:${h}px;display:flex;flex-direction:column;border:1.5px solid ${C.line};background:${C.paper};transform:rotate(${rotate}deg);box-shadow:0 1px 0 ${C.line}">
    ${compact ? "" : `<figcaption style="display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:${w * 0.03}px ${w * 0.045}px;border-bottom:1.5px solid ${C.line};font-family:fragment;font-size:${Math.round(w * 0.042)}px;color:${C.muted}">
      <span style="color:${C.madder}">fig. ${fig}</span><span style="text-transform:lowercase;white-space:nowrap">${caption}</span></figcaption>`}
    <div class="${compact ? "" : "ruled"}" style="position:relative;flex:1;overflow:hidden">
      <div style="position:absolute;inset:4%">${svg(ill)}</div>
    </div>
    ${compact ? "" : `<div style="padding:${w * 0.02}px ${w * 0.045}px ${w * 0.035}px">${ruler(w - w * 0.09 - 3, 40)}</div>`}
  </figure>`;

/** Pranav's photograph with a fig. caption. */
const portrait = ({ w, h, tone = "light", pos = "50% 20%", caption = true }) => `
  <figure style="width:${w}px">
    <div style="width:${w}px;height:${h}px;background:url(${PHOTO}) ${pos}/cover no-repeat"></div>
    ${caption ? `<figcaption style="display:flex;justify-content:space-between;margin-top:14px;font-family:fragment;font-size:${Math.round(Math.max(20, w * 0.04))}px;color:${tone === "light" ? C.muted : "rgba(243,241,235,.7)"}">
      <span style="color:${tone === "light" ? C.madder : C.goldLight}">fig. — portrait</span><span>pranav vibhute</span></figcaption>` : ""}
  </figure>`;

/** Handwriting guide lines (ascender, x-height, red baseline, descender) across the canvas. */
const guides = (top, h, tone = "light") => {
  const c = tone === "light" ? C.line : "rgba(209,188,152,.28)";
  const red = tone === "light" ? "rgba(163,53,43,.55)" : C.gold;
  return `<svg style="position:absolute;left:0;right:0;top:${top}px" width="1080" height="${h}" viewBox="0 0 100 100" preserveAspectRatio="none">
    <line x1="0" x2="100" y1="12" y2="12" stroke="${c}" stroke-dasharray="1.2 1.2" vector-effect="non-scaling-stroke" stroke-width="1.5"/>
    <line x1="0" x2="100" y1="44" y2="44" stroke="${c}" stroke-dasharray=".4 1" vector-effect="non-scaling-stroke" stroke-width="1.5"/>
    <line x1="0" x2="100" y1="72" y2="72" stroke="${red}" vector-effect="non-scaling-stroke" stroke-width="1.5"/>
    <line x1="0" x2="100" y1="96" y2="96" stroke="${c}" stroke-dasharray="1.2 1.2" vector-effect="non-scaling-stroke" stroke-width="1.5"/>
  </svg>`;
};

const BYLINE = "pranav vibhute · graphologist &amp; alignment consultant";

// ------------------------------------------------------------------ services
// Headlines match AD_COPY.md and the landing pages. *word* = written by pen, _text_ = italic red pen.
const services = [
  { id: "signature", no: "01", ill: "signature", cap: "signature analysis", title: "Signature & Handwriting Analysis",
    light: { h: "Your *signature*, through a graphologist’s _eyes._", s: "Signature &amp; handwriting analysis with Pranav Vibhute" },
    dark: { h: "When did you last really look at your *signature*?", s: "A personal consultation, started on WhatsApp" } },
  { id: "logo", no: "02", ill: "logo", cap: "logo analysis", title: "Business Logo Analysis & Design",
    light: { h: "Take a closer look at your business *logo*.", s: "Colour · composition · symbols · balance" },
    dark: { h: "Before your logo goes to print, a considered _second look._", s: "Logo analysis &amp; corrective design with Pranav" } },
  { id: "wristwatch", no: "03", ill: "wristwatch", cap: "wristwatch alignment", title: "Wristwatch & Clock Alignment",
    light: { h: "Choose your next *watch* with _intention._", s: "Personal wristwatch &amp; clock alignment" },
    dark: { h: "An object you look at many times a _day._", s: "Personal recommendations from Pranav Vibhute" } },
  { id: "office-clock", no: "04", ill: "office-clock", cap: "office clock alignment", title: "Business & Office Clock Alignment",
    light: { h: "The *clock* on your office wall deserves a _second thought._", s: "Business &amp; office clock alignment" },
    dark: { h: "Setting up a new office? Begin with the *clock*.", s: "Selection and placement, with Pranav Vibhute" } },
  { id: "phone", no: "05", ill: "phone-number", cap: "phone number alignment", title: "Phone Number Selection & Alignment",
    light: { h: "Choosing a new *number*? Consider it _carefully_ first.", s: "Personal &amp; business number alignment" },
    dark: { h: "A *number* you will share for _years._", s: "Review your options with Pranav Vibhute" } },
  { id: "drawing", no: "06", ill: "drawing", cap: "drawing analysis", title: "Drawing Analysis",
    light: { h: "A new way to talk about your child’s *drawings*.", s: "Reflective drawing analysis · not diagnostic" },
    dark: { h: "A *drawing* is an invitation to talk, not a test to _pass._", s: "Reflective drawing analysis · not diagnostic" } },
  { id: "vision-board", no: "07", ill: "vision-board", cap: "vision board alignment", title: "Vision Board Alignment",
    light: { h: "A *vision* board that reflects what _matters_ to you.", s: "Create or revisit yours with Pranav Vibhute" },
    dark: { h: "The clarity you find while _making_ it.", s: "Guided vision board alignment" } },
];
const amp = (t) => t.replace(/&(?!amp;)/g, "&amp;");

// A · light: specimen sheet of the service, handwritten key word.
const feedLight = (s) => ({ w: 1080, h: 1350, html: `
  <div class="canvas" style="width:1080px;height:1350px">
    <div style="position:absolute;left:72px;right:72px;top:64px;display:flex;justify-content:space-between;align-items:flex-end">
      ${wordmark(70)}
      ${note(`consultation ${s.no}`, 24, "margin-bottom:14px")}
    </div>
    <div style="position:absolute;left:50%;top:205px;transform:translateX(-50%)">
      ${specimen({ ill: s.ill, fig: s.no, caption: s.cap, w: 500, h: 590, rotate: 1.5 })}
    </div>
    <div style="position:absolute;left:72px;right:72px;bottom:200px">
      <h1 class="d" style="font-size:76px;line-height:1.14">${rich(s.light.h)}</h1>
      <p class="muted" style="font-size:28px;margin-top:22px;line-height:1.35">${s.light.s}</p>
    </div>
    <div style="position:absolute;left:72px;bottom:72px">${btn("Enquire on WhatsApp", 30)}</div>
  </div>` });

// B · night: Pranav's photograph, the face of the consultation.
const feedDark = (s) => ({ w: 1080, h: 1350, html: `
  <div class="canvas night" style="width:1080px;height:1350px">
    <div style="position:absolute;left:72px;right:72px;top:64px;display:flex;justify-content:space-between;align-items:flex-end">
      ${wordmark(70, { tone: "dark" })}
      ${note(`consultation ${s.no}`, 24, "margin-bottom:14px")}
    </div>
    <div style="position:absolute;left:72px;top:210px">${portrait({ w: 430, h: 560, tone: "dark", pos: "50% 12%" })}</div>
    <div style="position:absolute;left:546px;top:250px;width:462px">
      ${specimen({ ill: s.ill, fig: s.no, caption: s.cap, w: 420, h: 500, rotate: -2 })}
    </div>
    <div style="position:absolute;left:72px;right:72px;bottom:200px">
      <h1 class="d" style="font-size:72px;line-height:1.14">${rich(s.dark.h, { color: C.paper, rule: C.gold })}</h1>
      <p class="muted" style="font-size:28px;margin-top:22px;line-height:1.35">${s.dark.s}</p>
    </div>
    <div style="position:absolute;left:72px;bottom:72px">${btn("Enquire on WhatsApp", 30)}</div>
  </div>` });

// Stories / Reels 9:16. Keep the top ~250px and bottom ~340px clear of key content.
const story = (s) => ({ w: 1080, h: 1920, html: `
  <div class="canvas" style="width:1080px;height:1920px">
    <div style="position:absolute;left:0;right:0;top:250px;display:flex;justify-content:center">${wordmark(84)}</div>
    <div style="position:absolute;left:50%;top:430px;transform:translateX(-50%)">
      ${specimen({ ill: s.ill, fig: s.no, caption: s.cap, w: 560, h: 660, rotate: 1.5 })}
    </div>
    <div style="position:absolute;left:90px;right:90px;top:1170px;text-align:center">
      ${note(`consultation ${s.no}`, 26)}
      <h1 class="d" style="font-size:86px;line-height:1.14;margin-top:26px">${rich(s.light.h)}</h1>
      <p class="note" style="font-size:24px;margin-top:30px;color:${C.muted}">${BYLINE}</p>
    </div>
  </div>` });

// ------------------------------------------------------------------ carousels & posts
const frame = (inner, { tone = "", n, total, swipe = false, bg } = {}) => ({ w: 1080, h: 1350, html: `
  <div class="canvas ${tone}" style="width:1080px;height:1350px;${bg ? `background:${bg}` : ""}">
    ${inner}
    ${n ? `<p style="position:absolute;left:84px;bottom:64px;font-family:fragment;font-size:24px;color:${tone ? "rgba(243,241,235,.6)" : C.muted}"><span style="color:${tone ? C.goldLight : C.madder}">${String(n).padStart(2, "0")}</span> / ${String(total).padStart(2, "0")}</p>` : ""}
    ${swipe ? `<p style="position:absolute;right:84px;bottom:64px;font-family:fragment;font-size:24px;color:${tone ? C.goldLight : C.madder}">swipe →</p>` : `<div style="position:absolute;right:84px;bottom:52px">${wordmark(46, { tone: tone ? "dark" : "light" })}</div>`}
  </div>` });

const launch = [
  frame(`
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
      ${note("introducing", 28)}
      <div style="margin-top:80px">${wordmark(190, { tone: "dark" })}</div>
      <p class="i" style="font-size:52px;margin-top:90px">Clarity. Intention. Alignment.</p>
    </div>`, { tone: "night", swipe: true, n: 1, total: 6 }),
  frame(`
    <div style="position:absolute;left:84px;top:96px">${portrait({ w: 420, h: 600, pos: "50% 10%" })}</div>
    <div style="position:absolute;left:560px;right:84px;top:130px">
      ${note("your consultant", 24)}
      <h2 class="d" style="font-size:96px;line-height:.98;margin-top:26px">Pranav Vibhute</h2>
      <p class="note" style="font-size:24px;margin-top:22px;line-height:1.4">graphologist and alignment consultant</p>
    </div>
    <div style="position:absolute;left:84px;right:84px;top:800px">
      <p style="font-size:34px;line-height:1.5">Pranav works one to one with individuals, families and businesses, looking closely at signatures, handwriting, logos, everyday objects and personal choices, and talking through what he observes.</p>
      <div style="display:flex;gap:0;margin-top:44px;border-top:2px solid ${C.ink}">
        ${["Specific", "Personal", "Reflective"].map((t, i) => `<p style="flex:1;padding:22px 0 0 ${i ? 26 : 0}px;${i ? `border-left:1.5px solid ${C.line}` : ""};display:flex;align-items:baseline;gap:12px"><span style="font-family:fragment;font-size:22px;color:${C.madder}">0${i + 1}</span><span class="d" style="font-size:42px">${t}</span></p>`).join("")}
      </div>
    </div>`, { swipe: true, n: 2, total: 6 }),
  frame(`
    <div style="position:absolute;left:84px;right:84px;top:100px">
      ${note("seven consultations", 24)}
      <ol style="list-style:none;margin-top:40px;border-top:2px solid ${C.ink}">
        ${services.map((s) => `<li style="display:flex;align-items:center;gap:28px;padding:16px 0;border-bottom:1.5px solid ${C.line}">
          <span style="font-family:fragment;font-size:24px;color:${C.madder};width:40px">${s.no}</span>
          <span class="d" style="flex:1;font-size:44px;line-height:1.08">${amp(s.title)}</span>
          <span style="flex:none;width:74px;height:92px;border:1.5px solid ${C.line};background:${C.paper};position:relative"><span style="position:absolute;inset:3%">${svg(s.ill)}</span></span></li>`).join("")}
      </ol>
    </div>`, { swipe: true, n: 3, total: 6, bg: C.paper2 }),
  frame(`
    <div style="position:absolute;left:84px;right:84px;top:110px;bottom:170px;display:flex;flex-direction:column;justify-content:center">
      ${note("how it works", 24)}
      <h2 class="d" style="font-size:88px;line-height:1.02;margin-top:30px">Three simple _steps._</h2>
      <div style="position:relative;margin-top:70px">
        <div style="position:absolute;left:41px;top:20px;bottom:40px;width:2px;background:${C.madder}"></div>
        ${[["Explore a service", "Choose the consultation that feels relevant to you."], ["Connect on WhatsApp", "Send a short message. Ask about the process and starting price first."], ["Consult with Pranav", "Pranav explains how your consultation works, then guides it personally."]]
          .map(([t, d], i) => `<div style="position:relative;display:flex;gap:44px;margin-top:${i ? 52 : 0}px">
            <span class="d" style="flex:none;width:84px;height:84px;border:2px solid ${C.ink};background:${C.paper};display:flex;align-items:center;justify-content:center;font-size:44px">${i + 1}</span>
            <div><p class="d" style="font-size:50px;line-height:1.1">${t}</p><p class="muted" style="font-size:30px;line-height:1.45;margin-top:10px">${d}</p></div></div>`).join("")}
      </div>
    </div>`.replace(/_([^_]+)_/g, '<span class="i">$1</span>'), { swipe: true, n: 4, total: 6 }),
  frame(`
    <div style="position:absolute;left:84px;right:84px;top:110px;bottom:170px;display:flex;flex-direction:column;justify-content:center">
      ${note("clarity first", 24)}
      <h2 class="d" style="font-size:80px;line-height:1.04;margin-top:30px">What a consultation is, and <span class="i">isn’t.</span></h2>
      <div style="display:flex;gap:28px;margin-top:60px">
        <div style="flex:1;background:${C.paper2};padding:44px 40px"><p class="d" style="font-size:46px">It is</p>
          ${["Personal, led by Pranav", "Grounded in something specific to you", "Interpretive and reflective", "Open to your questions"].map((t) => `<p style="font-size:28px;line-height:1.35;margin-top:22px;display:flex;gap:16px"><span style="width:20px;height:2px;background:${C.madder};margin-top:19px;flex:none"></span>${t}</p>`).join("")}</div>
        <div style="flex:1;border:2px solid ${C.line};padding:44px 40px"><p class="d" style="font-size:46px">It isn’t</p>
          ${["A scientific or psychometric test", "A medical or psychological diagnosis", "A prediction or guarantee", "A replacement for professional advice"].map((t) => `<p class="muted" style="font-size:28px;line-height:1.35;margin-top:22px;display:flex;gap:16px"><span style="width:20px;height:2px;background:${C.muted};margin-top:19px;flex:none"></span>${t}</p>`).join("")}</div>
      </div>
    </div>`, { swipe: true, n: 5, total: 6 }),
  frame(`
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 84px 120px">
      ${note(BYLINE, 22)}
      <h2 class="d" style="font-size:118px;line-height:1.02;margin-top:44px">Begin with a ${written("conversation", { color: C.paper, rule: C.gold, stroke: 3.6 })}.</h2>
      <p class="muted" style="font-size:32px;margin-top:56px;line-height:1.45">Tap the link in our bio, or send a message<br/>on WhatsApp to ask about any consultation.</p>
      <div style="margin-top:60px">${btn("Enquire on WhatsApp", 30)}</div>
    </div>`, { tone: "plum", n: 6, total: 6 }),
];

const eduSlide = (no, total, eyebrow, title, text) => frame(`
  <div style="position:absolute;left:84px;right:84px;top:110px;bottom:170px;display:flex;flex-direction:column;justify-content:center">
    ${ruler(912, 60, C.line)}
    <p style="font-family:fragment;font-size:150px;line-height:1;color:${C.madder};margin:40px 0 46px">${no}</p>
    ${note(eyebrow, 24)}
    <h2 class="d" style="font-size:100px;line-height:1;margin-top:28px">${title}</h2>
    <p class="muted" style="font-size:38px;line-height:1.5;margin-top:40px;max-width:880px">${text}</p>
  </div>`, { swipe: true, n: Number(no) + 1, total });

const signatureEdu = [
  frame(`
    <div style="position:absolute;left:84px;right:84px;top:110px">
      ${note("signature &amp; handwriting", 24)}
      <h2 class="d" style="font-size:94px;line-height:1.14;margin-top:30px">What a graphologist looks at in a ${rich("*signature*.")}</h2>
    </div>
    <div style="position:absolute;left:50%;bottom:150px;transform:translateX(-50%)">${specimen({ ill: "signature", fig: "01", caption: "signature analysis", w: 400, h: 470, rotate: 1.5 })}</div>`, { swipe: true, n: 1, total: 6 }),
  eduSlide("01", 6, "letterforms", "Shape and legibility", "The forms you give each letter: simplified or ornate, connected or separate, easy to read or not."),
  eduSlide("02", 6, "direction", "Rise, fall and slant", "Whether the signature climbs, falls or stays level on the line, and which way the strokes lean."),
  eduSlide("03", 6, "size &amp; spacing", "How much room it takes", "The size of the signature compared with your handwriting, and the space it leaves around your name."),
  eduSlide("04", 6, "flow", "Rhythm of the stroke", "One continuous movement or several separate ones; quick and fluent, or slow and deliberate."),
  frame(`
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 84px 120px">
      ${note("a perspective, not a verdict", 24)}
      <h2 class="d" style="font-size:84px;line-height:1.04;margin-top:34px">What these details may express is what Pranav explores <span class="i">with you.</span></h2>
      <p class="muted" style="font-size:31px;line-height:1.5;margin-top:36px">Graphology is interpretive, not a scientific or psychological test. Signature refinement is available if you would like it.</p>
      <div style="margin-top:56px">${btn("Ask about signature analysis", 28)}</div>
    </div>`, { tone: "night", n: 6, total: 6 }),
];

const logoEdu = [
  frame(`
    <div style="position:absolute;left:84px;right:84px;top:110px">
      ${note("for founders &amp; business owners", 24)}
      <h2 class="d" style="font-size:94px;line-height:1.14;margin-top:30px">Four ways to look again at your ${rich("*logo*.")}</h2>
    </div>
    <div style="position:absolute;left:50%;bottom:150px;transform:translateX(-50%)">${specimen({ ill: "logo", fig: "02", caption: "logo analysis", w: 400, h: 470, rotate: -1.5 })}</div>`, { swipe: true, n: 1, total: 6 }),
  eduSlide("01", 6, "colour", "Do the colours agree?", "How the colours sit together, and whether the logo still holds up in a single colour or in black and white."),
  eduSlide("02", 6, "composition", "Where the eye goes first", "How the name, symbol and spacing are arranged, and which element a viewer notices first."),
  eduSlide("03", 6, "shapes &amp; symbols", "What the forms suggest", "Circles, angles, lines and icons all carry associations. It helps to know which ones your logo is using."),
  eduSlide("04", 6, "balance", "Does it feel steady?", "Weight, proportion and alignment: whether the logo feels settled at a glance or slightly off."),
  frame(`
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 84px 120px">
      ${note("business logo analysis &amp; design", 24)}
      <h2 class="d" style="font-size:84px;line-height:1.04;margin-top:34px">Pranav reviews all four, plus the logo’s <span class="i">symbolic reading.</span></h2>
      <p class="muted" style="font-size:31px;line-height:1.5;margin-top:36px">Corrective design and refinement are available if you are looking for change. No design can guarantee business results.</p>
      <div style="margin-top:56px">${btn("Ask about logo analysis", 28)}</div>
    </div>`, { tone: "night", n: 6, total: 6 }),
];

const quote = (q, about, ill, no) => frame(`
  <div style="position:absolute;left:84px;right:84px;top:90px;bottom:380px;display:flex;flex-direction:column;justify-content:center">
    <p style="font-family:bluu;font-weight:700;font-size:260px;line-height:.7;color:${C.madder};height:120px">“</p>
    <p class="d" style="font-size:92px;line-height:1.1;margin-top:40px">${q}</p>
    ${note(`on ${about}`, 24, "margin-top:56px")}
  </div>
  <div style="position:absolute;left:84px;bottom:130px">${specimen({ ill, fig: no, caption: "", w: 170, h: 205, compact: true })}</div>`, {});

const quotes = [
  quote("A signature is a small, habitual act of <span class=\"i\" style=\"white-space:nowrap\">self-expression.</span>", "signature &amp; handwriting analysis", "signature", "01"),
  quote("A drawing is an invitation to talk, not a test to <span class=\"i\">pass.</span>", "drawing analysis", "drawing", "06"),
  quote("The point of a vision board is not the board. It is the clarity you find while <span class=\"i\">making it.</span>", "vision board alignment", "vision-board", "07"),
];

// Story Highlight covers: Instagram crops to the centre circle.
const highlight = (ill, label) => ({ w: 1080, h: 1920, html: `
  <div class="canvas night" style="width:1080px;height:1920px;display:flex;align-items:center;justify-content:center">
    <div style="width:760px;height:760px;border-radius:50%;background:${C.paper};display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative">
      ${ill === "photo" ? `<div style="position:absolute;inset:0;background:url(${PHOTO}) 50% 14%/cover"></div>`
        : ill ? `<div style="width:500px;height:620px">${svg(ill)}</div>`
        : `<div>${wordmark(150)}</div>`}
    </div>
    <p style="position:absolute;bottom:430px;left:0;right:0;text-align:center;font-family:fragment;font-size:40px;color:${C.goldLight};text-transform:lowercase">${label}</p>
  </div>` });
const highlights = [["signature", "signature"], ["logo", "logo"], ["wristwatch", "watch"], ["office-clock", "office"], ["phone-number", "number"], ["drawing", "drawing"], ["vision-board", "vision"], ["photo", "about"]];

// Profile pictures. Instagram shows them as a small circle: the face reads best.
const profilePhoto = { w: 1080, h: 1080, html: `<div class="canvas" style="width:1080px;height:1080px;background:url(${PHOTO}) 50% 9%/150% auto no-repeat"></div>` };
const profileMark = { w: 1080, h: 1080, html: `
  <div class="canvas night" style="width:1080px;height:1080px;display:flex;align-items:center;justify-content:center">
    <svg viewBox="${hwBox("a").x} ${TOP + 250} ${hwBox("a").w} ${SPAN - 500}" width="560" height="560" fill="none" style="overflow:visible">
      <line x1="${hwBox("a").x - 60}" x2="${hwBox("a").x + hwBox("a").w + 60}" y1="10" y2="10" stroke="${C.madder}" stroke-width="5" vector-effect="non-scaling-stroke"/>
      <path d="${HW.a.d}" stroke="${C.paper}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
    </svg>
  </div>` };


// ------------------------------------------------------------------ free watch check (tool ads)
// The example sheet is a real output of the tool (rendered from a sample watch photo).
const EXAMPLE = `data:image/png;base64,${b64(path.join(HERE, "example-sheet.png"))}`;
const exampleSheet = (w, rotate) => `<div style="width:${w}px;height:${w * 1.25}px;background:url(${EXAMPLE}) center/cover;border:1.5px solid ${C.ink};box-shadow:14px 14px 0 ${C.ink};transform:rotate(${rotate}deg)"></div>`;
const toolPoints = `<p class="note" style="font-size:24px;color:${C.muted}">free · two minutes · your photo stays on your phone</p>`;

const toolFeed = { w: 1080, h: 1350, html: `
  <div class="canvas" style="width:1080px;height:1350px">
    <div style="position:absolute;left:72px;right:72px;top:64px;display:flex;justify-content:space-between;align-items:flex-end">
      ${wordmark(70)}
      ${note("free tool", 24, "margin-bottom:14px")}
    </div>
    <h1 class="d" style="position:absolute;left:72px;right:72px;top:200px;font-size:96px;line-height:1.02">Put your watch on the <span class="i">specimen sheet.</span></h1>
    <div style="position:absolute;left:72px;top:520px;width:400px;display:flex;flex-direction:column;gap:34px">
      <p class="muted" style="font-size:31px;line-height:1.42">Its colours, shape and details, recorded in two minutes. Then a free first look from Pranav.</p>
      <p class="note" style="font-size:23px;line-height:1.7;color:${C.muted}">free<br/>two minutes<br/>your photo stays on your phone</p>
    </div>
    <div style="position:absolute;right:72px;top:500px">${exampleSheet(470, 3)}</div>
    <div style="position:absolute;left:72px;bottom:72px">${btn("Try the free watch check", 30).replace(/<svg[\s\S]*?<\/svg>/, "")}</div>
  </div>` };

const toolStory = { w: 1080, h: 1920, html: `
  <div class="canvas" style="width:1080px;height:1920px">
    <div style="position:absolute;left:0;right:0;top:250px;display:flex;justify-content:center">${wordmark(84)}</div>
    <div style="position:absolute;left:90px;right:90px;top:420px;text-align:center">
      ${note("free tool · watch specimen check", 26)}
      <h1 class="d" style="font-size:92px;line-height:1.03;margin-top:24px">Put your watch on the <span class="i">specimen sheet.</span></h1>
    </div>
    <div style="position:absolute;left:50%;top:760px;transform:translateX(-50%)">${exampleSheet(560, -2)}</div>
    <div style="position:absolute;left:0;right:0;top:1500px;text-align:center">${toolPoints}</div>
  </div>` };

// ------------------------------------------------------------------ render
const jobs = [];
services.forEach((s, i) => {
  const n = String(i + 1).padStart(2, "0");
  jobs.push([`01-feed-ads/${n}-${s.id}-A-light.png`, feedLight(s)]);
  jobs.push([`01-feed-ads/${n}-${s.id}-B-dark.png`, feedDark(s)]);
  jobs.push([`02-story-reel-ads/${n}-${s.id}-story.png`, story(s)]);
});
launch.forEach((j, i) => jobs.push([`03-carousel-launch/slide-${i + 1}.png`, j]));
signatureEdu.forEach((j, i) => jobs.push([`04-carousel-signature/slide-${i + 1}.png`, j]));
logoEdu.forEach((j, i) => jobs.push([`05-carousel-logo/slide-${i + 1}.png`, j]));
quotes.forEach((j, i) => jobs.push([`06-quote-posts/quote-${i + 1}.png`, j]));
highlights.forEach(([ill, label], i) => jobs.push([`07-highlight-covers/${i + 1}-${label}.png`, highlight(ill, label)]));
jobs.push([`07-highlight-covers/profile-picture.png`, profilePhoto]);
jobs.push([`07-highlight-covers/profile-picture-mark.png`, profileMark]);
jobs.push([`08-free-watch-check/watch-check-feed.png`, toolFeed]);
jobs.push([`08-free-watch-check/watch-check-story.png`, toolStory]);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  let count = 0;
  for (const [file, job] of jobs) {
    if (FILTER && !file.includes(FILTER)) continue;
    await page.setViewportSize({ width: job.w, height: job.h });
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${job.html}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    const dest = path.join(OUT, file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    await page.screenshot({ path: dest, clip: { x: 0, y: 0, width: job.w, height: job.h } });
    count++;
  }
  await browser.close();
  console.log(`rendered ${count} images`);
})();
