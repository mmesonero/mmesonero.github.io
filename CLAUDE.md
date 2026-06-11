# mmesonero.github.io — Claude Context

Personal portfolio site. Single-file React app served as static files via GitHub Pages. No build step.

---

## Stack

- **Static HTML** + React via CDN (React 18, Babel standalone for JSX) — `index.html` loads everything.
- **Single source file**: `app.jsx` — components, project data (`PROJECTS`), in-progress data (`IN_PROGRESS`), category rendering.
- **Single stylesheet**: `styles.css` — CSS variables in `:root`, all layout, modal, carousel, category, WIP styles.
- **Assets**: `assets/` — images (PNG/JPG), logos, interactive demo HTMLs, platform icons.
- **Docs**: this file (`CLAUDE.md`) is the source of truth. Keep it current after structural changes.

### Local dev

```bash
npx serve C:\Users\Msonero\mmesonero.github.io -l 3003
```

Config in `cleanfeed/.claude/launch.json` under the name `mmesonero-site` so the Preview MCP can boot it.

### Deploy

GitHub Pages, auto-deploy from `main`. Push from Bash (PowerShell heredocs choke on `$` in commit messages):

```bash
git add -A
git commit -m "..."
git push origin main
```

Live at https://mmesonero.github.io, propagates in 1-2 min.

---

## Design system

### Fonts — Outfit everywhere

The site uses **a single font: Outfit**. There is no Cormorant, no JetBrains Mono in the rendered UI.

Variables in `:root`:

```css
--serif: 'Cormorant Garamond', ...   /* defined but UNUSED on the main site */
--sans:  'Outfit', 'Inter', ...      /* the only typeface */
--mono:  'Outfit', 'Inter', ...      /* aliased to Outfit on purpose */
```

`--mono` is aliased to Outfit so every legacy reference (mono labels, pills, counters, category headers) resolves to Outfit without rewriting every selector. **Keep it that way.** If you ever introduce a second typeface, do it explicitly in a single class, not via `--mono`.

Italics were also eliminated globally — every `.italic` span was changed to `font-style: normal` and given a gold color instead. No italic styling on titles or taglines.

### Colors

- `--bg`: `#0D0D0D` (dark mode page / carousel / iframe — the dark plane)
- `--bg-elev`: `#1A1A17` (the lighter card surface — `.card.card-inline` body, modal, internal demo panels)
- `--text`: `#ECEAE3`
- `--accent`: `#D4B775` (gold) — used for category labels, gold pills, accent in titles, "View on GitHub" hover
- **Carousel/iframe background is ALWAYS `#0D0D0D`.** Demo HTMLs must set `body { background: #0D0D0D }`.
- **Project card body (`.card.card-inline` `.card-body`) is ALWAYS `#1A1A17`** via `--bg-elev`. The slide above is `#0D0D0D`, the card body below it is `#1A1A17`. This two-tone is INTENTIONAL — the card body must read as a lighter elevated surface that holds the project name + tagline + GitHub button.
- **`--bg` and `--bg-elev` MUST remain separate tokens with different hex values.** Never collapse them (no `--bg-elev: var(--bg)`, no global `#1A1A17` → `#0D0D0D` sweep, no `--bg-elev: #0D0D0D`). If you ever unify them, the card body merges into the slide and the project name area stops reading as a card — that's the failure mode the user has already flagged twice. Revert immediately.
- **Internal panels INSIDE demo HTMLs stay `#1A1A17`** (popup-frame in `popup-demo.html`, `.platform` rows, `.email-card`, `.label-card`, etc.). They are cards floating on the dark `#0D0D0D` demo body. Do not sweep those internal `#1A1A17` values when changing the global plane color.

### Typography lock — hero ↔ carousel slide titles

Hero `<h1>` and carousel `.composed-title` MUST share the same typographic system. They're the two largest pieces of type on the site and they need to read as one voice.

| Property | `.hero h1` | `.composed-title` |
|---|---|---|
| `font-family` | `var(--sans)` (Outfit) | `var(--sans)` (Outfit) |
| `font-weight` | `700` | `700` |
| `letter-spacing` | `-0.035em` | `-0.035em` |
| `line-height` | `0.98` | `1.05` (slightly looser — multi-line titles) |
| Default color | `var(--text)` `#ECEAE3` | `var(--text)` `#ECEAE3` |
| Accent color | `.italic` → `var(--accent)` `#D4B775` | `.composed-gold` → `var(--accent)` `#D4B775` |

**Rule**: gold accent across the whole site is **always** `var(--accent)`. Never hardcode `#d4a84b` or other near-golds — they read as a different brand.

---

## Site structure

### `app.jsx` top-down

```
PROJECTS        — array of complete projects (cards + slides + modal info)
IN_PROGRESS     — array of "What I'm working on" cards (3 max recommended)
Glyph           — abstract SVG glyphs for cards without imagery
Carousel        — slideshow logic, decision tree for which layout to use
ProjectCard     — the card preview shown on the grid
Modal           — the popup with carousel + project info
InProgress      — the section that lists IN_PROGRESS
Contact         — bottom contact panel
App             — the root, including category grouping for PROJECTS
```

### Categories

`PROJECTS` cards are grouped on the page by their `category` field. The render order is fixed:

```js
const order = ["AI Projects", "Projects"];
```

Any unknown category goes after these two. Each category gets a centered gold header with the category name (no count, no rule line). When a category has exactly one project, the grid auto-centers it via `.projects:has(> :only-child)`.

---

## Carousel system

The carousel is the modal slideshow. Dimensions are **LOCKED to aspect-ratio 1440/900 (1.6)** — every slide displays in the exact same box. Do NOT use `min-height` for sizing — use `aspect-ratio` so navigating between slides never causes layout shift.

```css
.modal .thumb         { aspect-ratio: 1440 / 900; height: auto; }
.carousel             { aspect-ratio: 1440 / 900; background: #0D0D0D; }
.modal-carousel-wrap  { aspect-ratio: 1440 / 900; }
```

### Slide layout decision tree (inside `Carousel`)

| Slide has | Layout used | Visual |
|---|---|---|
| `scrollable: true` | `carousel-composed` | Legacy, unused |
| `interactive: true` + (`split: true` OR `label`) | `carousel-split` | Text panel **left** (34%) + iframe **right** (66%) |
| `interactive: true` + `title` (no split, no label) | `carousel-overlay-iframe` | Full iframe + title overlay **top center** |
| `interactive: true` alone | full iframe | Just the iframe (no overlay text) |
| `label` / `title` (image, not interactive) | `carousel-overlay` | Full image + title overlay top center |
| nothing | plain image | Image with `object-fit: cover` |

**Use `split: true` when you want split layout without the eyebrow.** `label` adds a mono-style eyebrow above the title, which is redundant when the title already says the same thing. Reserve `label` for when there's genuine context to add beyond the title.

### Iframe flash fix

Every `<iframe>` in the Carousel uses `key={slides[idx].src}` and a CSS fade-in animation. This eliminates a stale-content flash when switching between iframe slides:

```css
.carousel-iframe {
  background: #0D0D0D;
  animation: iframeFadeIn .25s ease-out;
}
```

Don't remove either piece — both are needed.

### Iframe full height in overlay mode

`carousel-overlay-iframe` lets the iframe fill the entire carousel (height: 100%, no margin-top). The overlay title sits on top with `position: absolute; z-index: 5`. **Don't reintroduce `margin-top: 160px`** — it cropped CTT slide 2 to 404px instead of the carousel's full 559px and the user noticed.

### Image fit

`.carousel-img { object-fit: cover }`. This eliminates the 1px subpixel hairline that `contain` could leave at 982.125 fractional widths. All carousel images must be exactly **1440×900** so cover doesn't actually crop anything.

---

## Slide data shape

```js
{
  src: "assets/foo-demo.html",    // image path OR HTML demo path
  caption: "",                     // ALWAYS "" — captions are disabled
  interactive: true,               // true if src is an HTML iframe demo
  split: true,                     // true → split layout for iframe slides without an eyebrow
  label: "Extension Popup",        // mono-cased eyebrow above the title (split layouts only). Use SPARINGLY
  title: ["Below every", "claude.ai"],  // array — one entry = one line
  titleGold: "chat box.",          // single gold closing line
  subtitle: ["...", "..."],        // 1-3 muted lines. RARELY USED — keep slides executive
  titleTop: "32px"                 // per-slide override for overlay panel top position
}
```

**Editorial rule**: prefer executive slides. `title + titleGold` is usually enough. Add `label` only when you have something genuinely different to say (a category, a type, a step name). Add `subtitle` only when a concept needs explanation. Most polished slides on the site have neither.

---

## Demo HTML pattern

Every interactive slide is a static HTML file in `assets/*-demo.html`. They're loaded in the carousel via `<iframe>`.

### Rules

1. **Body background MUST be `#0D0D0D`** to match the carousel. Never a different shade.
2. **Use REAL CSS from the actual source project being demoed**. Copy variables, colors, spacing from the project. Examples:
   - CleanFeed demos → `cleanfeed/ui/popup.html`, `cleanfeed/ui/dashboard.html`, `cleanfeed/content/video.js`
   - Claude Token Tracker demos → `claude-token-tracker/dashboard.html`, `claude-token-tracker/content.js`, `claude-token-tracker/options.html`
   - Gmail Auto-Labeler demos → `mis-utomatizaciones/config.json`, `gmail_labels.py`, `.github/workflows/gmail.yml`
3. **Logo**: use the actual project logo (e.g. `cleanfeed-logo.png`), NOT the portfolio's `logo.png`.
4. **Disable interaction**:
   ```js
   document.querySelectorAll('button, input').forEach(el => {
     el.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); });
     el.tabIndex = -1;
   });
   ```
   Scrolling stays allowed.
5. **No internal hero title** — if the slide is in `split` or `overlay-iframe` mode, the React side already provides the title. Strip any duplicate big heading inside the demo.
6. **Use `clamp()` for responsive sizing** inside demos. Iframes render at smaller-than-native viewports (e.g. 895×559 when designed for 1440×900). Fixed `px` sizes look oversized. Pattern:
   ```css
   .hero-title { font-size: clamp(48px, 8vw, 78px); }
   .ghost-col { top: 8%; gap: clamp(50px, 9vh, 100px); }
   ```
7. **Scroll hint**: for scrollable demos (popup, labels) add a small pulsing `scroll ↓` pill that hides on first scroll.

### Card thumbnail screenshots

For projects where the slide-1 demo is an HTML file (e.g. CTT), the **card thumbnail is a Playwright screenshot of a separate `*-card.html` file**. The card variant is usually a cleaner version of the demo (less content, larger title) optimized for the small thumbnail.

To regenerate a card screenshot:

```powershell
npx --yes playwright@1 screenshot --viewport-size=1440,900 `
  "file:///C:/Users/Msonero/mmesonero.github.io/assets/<name>-card.html" `
  "C:\Users\Msonero\mmesonero.github.io\assets\<name>-hero.png"
```

The card thumb is shown with `object-fit: cover` and `object-position: top center`, so the bottom ~10% of the image gets cropped. Place key content within the top 90% of the canvas.

### Inline carousel slide layout — SAFE ZONE rules

Every PNG thumbnail rendered in the **InlineCarousel** (`.inline-carousel` on cards) must be **1440×810** (16:9, matches `.thumb { aspect-ratio: 16/9 }`). Inside that frame the panel/content MUST stay inside the SAFE ZONE so it never collides with the carousel chrome:

| Edge | Reserved by | Safe min/max |
|------|-------------|--------------|
| Left (split slide) | `.inline-overlay-panel--left` text: `left:max(56px,7%)`, `max-width:36%` → right edge ~**518px** | content must start at **x ≥ 580** |
| Left (non-split) | `.inline-carousel-prev` `<` button: `left:6px`, width `30px` → right edge x=**36** | content must start at **x ≥ 50** |
| Right | `.inline-carousel-next` `>` button: `right:6px`, width `30px` → left edge x=**1404** | content must end at **x ≤ 1390** |
| Top | rounded card corner + breathing room | content must start at **y ≥ 40** |
| Bottom | `.thumb-dots` indicator: `bottom:11px`, ~50px wide, ~25px tall → occupies y ≈ **750..795** | content must end at **y ≤ 720** |

#### Title overlay (JSX, top-center) — font + placement

The slide title comes from the slide config's `title: ["..."]` (white lines) + `titleGold: "..."` (gold last line) and is rendered by the InlineCarousel as a `<div className="inline-overlay-panel">` (or `inline-overlay-panel--left` for split slides). It is NOT baked into the PNG — that's why the build script masks the baked title region with bg.

- **Font**: same `.composed-title` family/weight as the modal carousel + hero, scaled down for the small inline box.
- **Size**: `font-size: clamp(18px, 3.4vw, 28px)` (defined in `styles.css`); split-slide variant clamps to `clamp(15px, 2.8vw, 24px)` so it fits in the narrower left lane.
- **Color**: white lines from `title[]`, gold line from `titleGold` (`.composed-gold` → `color: var(--accent)`).
- **Text-shadow**: `0 2px 18px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.6)` so it stays readable over busy backgrounds.
- **Top-center placement** (`inline-overlay-panel`, default): `position:absolute; top: 6%; left: 50%; transform: translateX(-50%); max-width: calc(100% - 56px); text-align: center;` → the title sits at ~6% of the slide height (≈ y=49 on the 810-tall slide), centered. The PNG content below it should start at **y ≥ 150** to give it breathing room.
- **Left placement** (`inline-overlay-panel--left`, applied when `split: true`): `top: 50%; left: max(56px, 7%); transform: translateY(-50%); max-width: 36%; text-align: left;` → the title sits at the vertical center of the slide, on the left lane. The PNG panel must stay to the right of x ≈ 580 so the two don't overlap.

#### Split-slide rule

A slide is "split" when its config has `split: true` (the JSX overlay sits LEFT, not top-center). cf-popup and cf-blocked are split. cf-speed, cf-skip and cf-dashboard are NOT split (title sits top-center), so they only need to clear the `<` button (x ≥ 50), not the left text.

#### Build pipeline (script: `C:\Users\usuario\.claude\tools\zoom-split-thumbs.js`)

For CleanFeed-style thumbnails (panel + baked title text), the script does:

1. **mask** the baked title region with bg (`#0D0D0D`).
2. **crop** EXACTLY the panel content range (drops the empty internal padding inside the panel box). For 2x2-grid cards (cf-dashboard), this is the full content row block instead of a single panel.
3. **extend** the canvas to 16:9 with bg (`#0D0D0D`) so the panel lands inside the safe zone after resize. `extendLeft/Right` shrink the panel horizontally so it clears the `<>` buttons; `extendTop/Bottom` position it vertically (and shift it down to clear top-center title when needed).
4. **resize** to 1440×810.

After each script run, verify the output panel bbox sits inside the safe zone with a raw-pixel bbox scan (threshold >60 for content, >14 for full panel box). All five CleanFeed thumbs currently pass.

**Tuning a thumb (recipe)**:
1. Read the source `.bak` and measure the true content bbox (raw pixel scan).
2. Decide target output bbox inside the safe zone (`x ≥ Lmin`, `x ≤ 1390`, `y ≥ 40`, `y ≤ 720`).
3. Solve for `extendTop/Bottom/Left/Right` so `(content_in_source + extend) * 1440/canvas_w` lands at the target. Keep `canvas_w/canvas_h = 16/9`.
4. Re-run the script, re-scan the bbox, confirm all four edges pass.

#### Pipeline gotchas

- **Sharp re-orders chained ops** (`resize` runs BEFORE `extend`, `composite` runs LAST). Materialize each stage to a `.toBuffer()` to force the intended order — see the script body.
- **Always read from `<file>.bak`** (not the previous output). The script falls back to `src` only if `.bak` doesn't exist; back up before the first run so re-runs don't double-process.
- The content-end y for each panel is measured by raw pixel scan. When a panel changes (e.g. you regenerate the `*-thumb.html` source), re-measure and update the comment block + crop dims in the script.
- For PNGs generated from `*-thumb.html` via Playwright (e.g. cf-dashboard), screenshot to a regular `.png` path first, then move/rename to `.bak`. Playwright rejects unknown extensions (`Error: path: unsupported mime type "null"`).

---

## How to add things

### Add a project

1. Decide its category: `"AI Projects"` (Python / ML / agentic) or `"Projects"` (everything else). Add a new category only when there are at least 2 projects to put in it.
2. Append an entry to the `PROJECTS` array:
   ```js
   {
     name: "Project Name",
     category: "AI Projects",
     tagline: "One concrete sentence — what it does, no marketing.",
     tags: ["Python", "AI", "FastAPI"],
     description: "1-2 short paragraphs. Problem first, then solution, no bullshit.",
     status: "complete",
     githubUrl: "https://github.com/mmesonero/repo",
     accent: "cleanfeed",                    // glyph id (used if no cardImage)
     cardImage: "assets/foo-hero.png",       // optional — the thumb shown in the grid
     logo: "assets/foo-logo.png",            // optional — small logo in modal header
     slides: [ ... ]
   }
   ```
3. Add at least one slide. Plain hero PNG is the simplest:
   ```js
   slides: [
     { src: "assets/foo-hero.png", caption: "" }
   ]
   ```
4. Save, hard refresh (`Ctrl+Shift+R`) to bypass cached assets.

### Add slides to an existing project

Append to the `slides:` array. Three common patterns:

**Plain image slide**:
```js
{ src: "assets/foo.png", caption: "" }
```

**Interactive HTML demo with overlay title**:
```js
{
  src: "assets/foo-demo.html",
  caption: "",
  interactive: true,
  title: ["Hosted, secure,", "every"],
  titleGold: "single hour."
}
```

**Interactive HTML demo with text panel left + iframe right**:
```js
{
  src: "assets/foo-demo.html",
  caption: "",
  interactive: true,
  split: true,
  title: ["Open the", "extension,"],
  titleGold: "take it all back."
}
```

### Add a "What I'm working on" entry

Append to `IN_PROGRESS`:

```js
{
  name: "Project Name",
  tagline: "One sentence — what it does. No filler.",
  tags: ["Stack", "Tag"],
  progress: 0.4   // 0 to 1
}
```

Grid is 3 columns on desktop, 2 below 1024px. Three entries fit in one row at desktop.

### Add an image

1. Drop the source file in `Downloads\web\` (or wherever your design tool exports to).
2. Copy + resize to **exactly 1440×900 PNG** in `assets/`:
   ```powershell
   Copy-Item "C:\Users\Msonero\Downloads\web\<source>.png" "C:\Users\Msonero\mmesonero.github.io\assets\<target>.png" -Force
   ```
   For dimension mismatch use the System.Drawing script pattern (see git history for `gmail-hero.png` / `gmail-features-hero.png` for the exact PowerShell snippet that crops + resizes to 1440×900).
3. Reference the asset path in `cardImage` or `slides[i].src`.

### Crop / resize a PNG to 1440×900

```powershell
Add-Type -AssemblyName System.Drawing
$src = "C:\Users\Msonero\mmesonero.github.io\assets\<file>.png"
$img = [System.Drawing.Image]::FromFile($src)
$bmp = New-Object System.Drawing.Bitmap(1440, 900)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.DrawImage($img, 0, 0, 1440, 900)   # or DrawImage(src, destRect, srcRect, unit) for crop
$g.Dispose(); $img.Dispose()
$bmp.Save($src, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
```

---

## Project list (current)

### AI Projects (1 project)

#### Gmail Auto-Labeler — 2 slides

| # | Slide | Mode |
|---|---|---|
| 1 | `gmail-hero.png` | plain image (Canva "From chaos to clarity") |
| 2 | `gmail-features-hero.png` | plain image (Canva 4-icon: Hosted on GitHub / Uses GitHub Secrets / Every 1 hour / Smart & Secure) |

### Projects (2 projects)

#### CleanFeed — 6 slides

| # | Slide | Mode |
|---|---|---|
| 1 | `cf-hero.jpg` | plain image (Canva YouTube + "Turn off Shorts") |
| 2 | `dashboard-demo.html` | overlay-iframe, `titleTop: 32px` — "Dashboard to *control everything.*" |
| 3 | `popup-demo.html` | **split** — "Open the extension, *take it all back.*" |
| 4 | `blocked-demo.html` | **split** — "Block sites before you *enter.*" |
| 5 | `speed-demo.html` | overlay-iframe — "Watch at your own *pace.*" |
| 6 | `skip-demo.html` | overlay-iframe — "Jump forward *or back.*" |

#### Claude Token Tracker — 3 slides

| # | Slide | Mode |
|---|---|---|
| 1 | `ctt-hero-demo.html` | full iframe (no overlay — demo has its own Claude UI mimic with ghost messages + real widget bar at bottom) |
| 2 | `ctt-widget-demo.html` | overlay-iframe — "Below every claude.ai *chat box.*" |
| 3 | `ctt-dashboard-demo.html` | **split** — "Extension. One click *to track the usage.*" |

### In Progress (3 cards, 3-col grid)

- **AIO Sync** — Electron / Windows — 70%
- **AI News Scraper** — Python / AI — 30%
- **Clinical AI Assistant** — Next.js / FastAPI / AI — 10%

---

## Copy / voice rules

Project taglines, descriptions and slide titles share a single voice. Apply consistently.

### Don't write
- **Sycophantic openings**. "This is amazing." "Revolutionary." Cut.
- **Marketing speak**. "Unlock your potential." "Transform your workflow." Cut.
- **Vague benefit claims**. "Improves productivity." "Saves time." Be concrete or skip.
- **"Just" or "Simply"**. Reads condescending.
- **Long technical paragraphs**. Reader is a human first, an engineer second.
- **Emojis** unless the user explicitly asks.
- **Model names in copy** (e.g. "GPT-4o-mini"). Say "a small language model" or just "AI". Models change; copy shouldn't.

### Do write
- **Open with the problem**. "Claude won't tell you when you're about to hit your limit — until you do." "YouTube was built so you'd choose what you watch."
- **Concrete, specific details**. File names, API endpoints, exact counts.
- **Personal voice when it lands**, used sparingly. "I haven't sorted an email by hand in months."
- **Punchy first sentence**. The hook is the whole sale.
- **Mention features lightly**, woven into prose, not bulleted.
- **End quietly**. No CTA, no exclamation. A dry observation closes better than a sales line.

### Description length

Descriptions are **2-3 short sentences max**. Current targets:

- Gmail: "Runs every hour on GitHub Actions, hands each new email to a small language model, and files it under one of the labels — no server, no laptop, no manual sorting."
- CTT: "A Chrome extension that pins your real Claude usage right below the chat box — two slim bars, two reset times. No third-party servers, no polling hacks."
- CleanFeed: 5 sentences (longest, because the framing earns it — "YouTube was built so you'd choose..."). Cap at this length.

### Title pattern (carousel slides)

- `title` is an array of 1-3 short lines (sentence broken for visual rhythm).
- `titleGold` is the closing 1-2 words — gold color, the punchline.
- Together they form a complete sentence: `["Open the", "extension,"] + "take it all back."`
- 56-78px font, centered or in split — needs to read at a glance.

---

## Lessons learned (do not repeat)

1. **PNG canvas color must be `#0D0D0D`.** A `#111113` canvas looks like a visible grey box inside the carousel. Either crop the PNG to remove the canvas or rebuild as an HTML demo.
2. **Never bake text into PNGs.** Baked-in fonts won't match Outfit. Use HTML overlay text via React.
3. **Never use `min-height` on the carousel.** Lock with `aspect-ratio: 1440 / 900` so slides don't change size between navigation.
4. **Never duplicate the title inside the demo HTML.** If React's split-left or overlay-panel provides the title, the demo HTML must not have its own big header.
5. **`logo.png` is the portfolio brand (MM monogram), NOT a project logo.** Use `cleanfeed-logo.png`, `ctt-icon-large.png`, etc. inside extension demos.
6. **`carousel-overlay-iframe` iframe height must be 100%, not `calc(100% - 160px)`.** The overlay title overlays on top via z-index; don't shrink the iframe.
7. **Add `key={slides[idx].src}` to every iframe.** Without it React reuses iframes across slides and you see stale content for ~250ms.
8. **Fonts: one typeface (Outfit).** Cormorant Garamond and JetBrains Mono are gone from the UI. `--mono` is aliased to Outfit on purpose.
9. **Card thumbnails get cropped ~10% at the bottom.** The card thumb has `aspect-ratio: 16/9` but the PNG is 16/10. Don't put critical content below ~90% of the canvas.
10. **The single-card category centering is `:has(> :only-child)`** on `.projects`. Don't break it; modern browsers support `:has()` fine.
11. **`.composed-title` typography is locked to hero h1.** `font-weight: 700`, `letter-spacing: -0.035em`, `color: var(--text)`. **Don't** drift back to weight 600 / no spacing — the slide title stops reading as "the same voice as the hero" and the eye sees two different typesetters.
12. **`.composed-gold` MUST be `var(--accent)` (`#D4B775`)**, never `#d4a84b`. Same gold across hero italic, category headers, gold pills, and slide gold accents. A 2-3 hue drift in gold is enough that the page reads as inconsistent even if you can't name why.
13. **All carousel slide assets are exactly 1440×900.** This was violated by `aio-dashboard.png` (1373×821) which letterboxed under `object-fit: cover` and shifted layout. Fixed by re-rendering onto a 1440×900 `#0D0D0D` canvas. Audit with `System.Drawing.Image::FromFile` whenever a slide looks "off."

---

## Asset inventory

### CleanFeed
- `cf-hero.jpg` — Canva hero (1440×900)
- `cf-logo.png` — CleanFeed wings logo (modal header)
- `cleanfeed-logo.png` — same logo for use INSIDE extension demos
- Platform icons: `youtube.png`, `instagram.png`, `x.jpg`, `tiktok.jpg`
- Interactive demos: `dashboard-demo.html`, `popup-demo.html`, `blocked-demo.html`, `speed-demo.html`, `skip-demo.html`
- Legacy PNGs still in repo (not used in slides): `cf-dashboard.png`, `cf-popup.png`, `cf-blocked.png`, `cf-speed.png`, `cf-skip.png`

### Claude Token Tracker
- `ctt-hero.png` — Playwright screenshot of `ctt-hero-card.html` (used as cardImage)
- `ctt-icon.png` / `ctt-icon-large.png` — extension icons
- `claude-logo.svg` — Claude spark (orange, `#d97757`)
- Card source: `ctt-hero-card.html`
- Modal slides: `ctt-hero-demo.html`, `ctt-widget-demo.html`, `ctt-dashboard-demo.html`

### Gmail Auto-Labeler
- `gmail-hero.png` — Canva hero (1440×900, cropped from original)
- `gmail-features-hero.png` — Canva 4-icon (1440×900)
- Standalone demos (not currently in slides but kept): `features-demo.html`, `labels-demo.html`, `security-demo.html`, `gmail-workflow-demo.html`, `gmail-hero-demo.html`, `gmail-hero-card.html`

---

## Deploy / Git workflow

- Local: `npx serve` on port 3003. Hard refresh (`Ctrl+Shift+R`) after asset changes — the browser caches PNG/SVG aggressively.
- Commits: stage explicit files (`git add app.jsx styles.css assets/foo.png`) — avoid `git add -A` because it pulls in node_modules or stray screenshots.
- Commit messages: short subject + 3-5 bullet points in the body. Include Co-Authored-By when Claude wrote the change.
- Push from Bash, not PowerShell. PowerShell heredocs choke on `$` and break the commit message.
- GitHub Pages auto-deploys from `main`. Live at https://mmesonero.github.io.
