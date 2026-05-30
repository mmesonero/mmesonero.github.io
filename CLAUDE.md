# mmesonero.github.io — Claude Context

Personal portfolio site. Single-file React app served as static files via GitHub Pages. No build step.

## Stack
- **Static HTML** + React via CDN (React 18, Babel standalone for JSX)
- **Single file**: `app.jsx` — all components, project data, glyphs
- **Styles**: `styles.css` — single stylesheet, CSS variables for theming
- **Assets**: `assets/` — images, logos, interactive demo HTMLs
- Served locally via `npx serve C:\Users\Msonero\mmesonero.github.io -l 3003` (config in `cleanfeed/.claude/launch.json` as `mmesonero-site`)

## Design system

### Fonts
- **Serif** (`var(--serif)`): Cormorant Garamond — only for hero "Manuel Mesonero" title
- **Sans** (`var(--sans)`): Outfit — body, all slide titles, all UI text
- **Mono** (`var(--mono)`): JetBrains Mono — labels, code, small caps

### Colors
- bg light: `#FAFAF7`, dark: `#121210`
- accent gold: `#C8A864` (light) / `#D4B775` (dark)
- text: `#1A1815` / `#ECEAE3`
- **Carousel bg ALWAYS `#0B0B0B`** (do not change)

## Carousel system

The carousel is the modal slideshow. Dimensions are **LOCKED to aspect-ratio 1440/900 (1.6)** — every slide displays in the exact same box size. Do NOT use `min-height` — use `aspect-ratio` instead so navigating between slides never causes layout shift.

Key CSS lines (in `styles.css`):
```css
.modal .thumb         { aspect-ratio: 1440 / 900; height: auto; }
.carousel             { aspect-ratio: 1440 / 900; background: #0B0B0B; }
.modal-carousel-wrap  { aspect-ratio: 1440 / 900; }
```

### Slide layout decision tree (in `Carousel` JSX)

The Carousel component renders different layouts based on slide properties:

| Slide has | Layout used | Visual |
|---|---|---|
| `scrollable: true` | `carousel-composed` | Legacy, unused |
| `interactive: true` + (`split: true` OR `label`) | `carousel-split` | Text panel **left** (34%) + iframe **right** (66%) |
| `interactive: true` + `title` (no split, no label) | `carousel-overlay-iframe` | Full iframe + title overlay **top center** |
| `interactive: true` alone | full iframe | Just the iframe |
| `label` / `title` (image, not interactive) | `carousel-overlay` | Full image + title overlay top center |
| nothing | plain image | Image with `object-fit: contain` |

**Use `split: true` (NOT `label`) when you want split layout without the mono eyebrow.** The eyebrow `label` is redundant when the title already says the same thing (e.g. "Extension Popup" eyebrow + "Open the extension" title — kill the eyebrow). Reserve `label` for when there's genuine context to add beyond the title.

### When to use split vs overlay

- **Split** when the demo content is naturally narrow (Claude popup window, blocked-page card, dashboard popup) — it fits in the right 66% and leaves the left for text.
- **Overlay** when the demo content is wide and wants the full canvas (extension dashboard, speed config panel, labels grid, security flow) — title floats over the top center.

### Slide data shape

```js
{
  src: "assets/foo-demo.html",   // image path or HTML demo path
  caption: "",                    // ALWAYS "" — captions are disabled
  interactive: true,              // true if src is an HTML iframe demo
  label: "Inline widget",         // mono-cased eyebrow (split-only)
  title: ["Below every", "claude.ai"],  // array — each item one line
  titleGold: "chat box.",         // single gold italic line (closing)
  subtitle: ["...", "..."],       // 1-3 muted lines. RARELY USED — keep slides executive
}
```

**Editorial rule**: prefer executive slides. Label + title + titleGold is usually enough. Add subtitle ONLY if a concept genuinely needs explanation. Three lines of subtitle is the maximum.

## Demo HTML pattern

Every interactive slide is a static HTML file in `assets/*-demo.html`. They are loaded in the carousel via `<iframe>`.

### Rules for demo HTMLs

1. **Body bg MUST be `#0B0B0B`** to match carousel — never use a different shade.
2. **Use REAL CSS from the actual project source** — copy variables, colors, spacing from the project being demoed. Look at `cleanfeed/ui/dashboard.html`, `cleanfeed/content/video.js`, `claude-token-tracker/dashboard.html`, etc.
3. **Logo** — use `cleanfeed-logo.png` for CleanFeed UI (NOT `logo.png` which is the portfolio MM monogram). For CTT use `ctt-icon-large.png`.
4. **Disable user interaction** at the end of every demo HTML:
   ```js
   document.querySelectorAll('button, input').forEach(el => {
     el.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); });
     el.tabIndex = -1;
   });
   ```
   Scroll is allowed. Clicks on toggles/buttons are blocked. This makes demos "look-only".
5. **No internal hero title** — if the slide uses split or overlay, the React side already provides the title. The demo HTML should contain ONLY the UI being showcased.
6. **Scroll hint** — for scrollable demos (popup, labels) add a small pulsing "scroll ↓" pill that hides on first scroll.

## Copy / voice rules

Project descriptions and slide titles share a voice. Apply consistently.

### What we DON'T write
- **No sycophantic openings**. "This is amazing." "Revolutionary." Cut.
- **No marketing speak**. "Unlock your potential." "Transform your workflow." Cut.
- **No vague benefit claims**. "Improves productivity." "Saves time." Be concrete or skip.
- **No "Just" or "Simply"**. Reads as condescending.
- **No long technical paragraphs**. The reader is a human first, an engineer second.
- **No emoji** unless the user explicitly asks.

### What we DO write
- **Open with the problem, not the product**. "Claude won't tell you when you're about to hit your limit — until you do." "YouTube was built so you'd choose what you watch."
- **Concrete, specific details**. File names (`config.json`), API names (`/api/organizations/{orgId}/usage`), model names (`GPT-4o-mini`), exact counts (`eleven labels`).
- **Personal voice when it lands**. "I haven't sorted an email by hand in months." "I built it for myself." Used sparingly.
- **Punchy first sentence**. The hook is the whole sale.
- **Mention features lightly**, not as a bulleted list. Weave them in: "Hide Shorts and Reels, kill the recommendations sidebar, drop the For You tab."
- **End quietly**. No CTA, no exclamation. A dry observation or a small flourish: "The content you actually follow, the way you meant to watch it."

### Title pattern (carousel slides)
- `title` is an array of 1-3 short lines (sentence broken for visual rhythm)
- `titleGold` is the closing 1-2 words — italic gold, the punchline
- Together they're a complete sentence: `["Open the", "extension,"] + "take it all back."`
- 50-60px font, centered or left in split — needs to read at a glance

### Subtitle pattern
- Used RARELY. Prefer no subtitle. A title that needs explanation is a weak title.
- If used: 1-3 short lines, each one thought. Max ~80 chars per line.

## Project list (`PROJECTS` array)

Order: CleanFeed → Claude Token Tracker → Gmail Auto-Labeler.

### CleanFeed (6 slides)
| # | Slide | Mode |
|---|---|---|
| 1 | `cf-hero.jpg` | plain image (Canva hero) |
| 2 | `dashboard-demo.html` | overlay-iframe, title "Dashboard to control everything." |
| 3 | `popup-demo.html` | **split**, label "Extension Popup", title "Open the extension, take it all back." |
| 4 | `blocked-demo.html` | **split**, label "Site Blocking", title "Block sites before you enter." |
| 5 | `speed-demo.html` | overlay-iframe, title "Watch at your own pace." |
| 6 | `skip-demo.html` | overlay-iframe, title "Jump forward or back." |

### Claude Token Tracker (3 slides)
| # | Slide | Mode |
|---|---|---|
| 1 | `ctt-hero-demo.html` | full iframe (no title — demo has its own Claude UI mimic) |
| 2 | `ctt-widget-demo.html` | overlay-iframe, title "Below every claude.ai chat box." |
| 3 | `ctt-dashboard-demo.html` | **split**, title "Extension. One click for the metrics." |

### Gmail Auto-Labeler (5 slides)
| # | Slide | Mode |
|---|---|---|
| 1 | `gmail-hero.png` | plain image |
| 2 | `features-demo.html` | overlay-iframe, title "Hosted, secure, every single hour." |
| 3 | `labels-demo.html` | overlay-iframe, title "Every email sorted automatically." |
| 4 | `security-demo.html` | **split**, title "Untrusted by default." |
| 5 | `gmail-workflow-demo.html` | overlay-iframe, title "Cron every hour, zero servers." |

## Lessons learned (do not repeat)

1. **Never use PNG canvas with non-#0B0B0B color** — it shows up as a visible grey box inside the black carousel. Either crop the PNG or rebuild as an HTML demo.
2. **Never bake text into PNGs** — bake-in fonts (Helvetica/Arial in PIL) won't match the portfolio's Outfit. Use HTML overlay text.
3. **Never use `min-height` on the carousel** — causes height to vary slide-to-slide based on content. Lock with `aspect-ratio: 1440 / 900`.
4. **Never duplicate the title inside the demo HTML** — if React's split-left or overlay-panel is providing the title, the demo HTML must NOT have its own big header. Strip it.
5. **Never use `logo.png` (MM monogram) inside CleanFeed extension UI demos** — that's the portfolio brand. The extension's own logo is `cleanfeed-logo.png`.
6. **Iframe inside `.split-right` must fill** — use `align-items: stretch` on split-right and `height: 100%; flex: 1 1 auto` on iframe, otherwise the iframe shrinks to its intrinsic size.
7. **The carousel modal grid is `3fr : 1fr`** — carousel takes 75% of modal width, project description takes 25%. Modal max-width 1600px.
8. **Tab/iframe sandbox**: demos are static HTML in `assets/`, loaded with `src="assets/foo.html"`. Same-origin. Inner scripts can run normally. Don't use `srcdoc` — it breaks relative asset paths.

## Asset inventory

### CleanFeed
- `cf-hero.jpg` — Canva hero (1440×900)
- `cf-logo.png` — CleanFeed wings logo (modal header)
- `cleanfeed-logo.png` — CleanFeed wings logo for use INSIDE extension demos
- Platform icons: `youtube.png`, `instagram.png`, `x.jpg`, `tiktok.jpg`
- Interactive demos: `dashboard-demo.html`, `popup-demo.html`, `blocked-demo.html`, `speed-demo.html`, `skip-demo.html`
- Legacy PNGs (still in repo, no longer used in slides): `cf-dashboard.png`, `cf-popup.png`, `cf-blocked.png`, `cf-speed.png`, `cf-skip.png`

### Claude Token Tracker
- `ctt-hero.png` — Canva hero (used as cardImage only)
- `ctt-icon.png` / `ctt-icon-large.png` — extension icons
- Interactive demos: `ctt-hero-demo.html`, `ctt-widget-demo.html`, `ctt-dashboard-demo.html`

### Gmail Auto-Labeler
- `gmail-hero.png` — Canva hero
- `gmail-features.png` — Canva features grid (legacy, replaced by features-demo.html)
- Interactive demos: `features-demo.html`, `labels-demo.html`, `security-demo.html`

## Deploy

GitHub Pages auto-deploys from `main` branch.

- Local preview: `npx serve C:\Users\Msonero\mmesonero.github.io -l 3003` → http://localhost:3003
- Push: `git push origin main` from Bash (not PowerShell — heredoc commit messages fail in PS)
- Live: https://mmesonero.github.io
