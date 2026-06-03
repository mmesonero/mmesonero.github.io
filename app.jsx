/* =========================================================
   Manuel Mesonero, Personal Portfolio
   React app. Single file. Soft luxury, warm + gold.
   ========================================================= */

const { useState, useEffect, useRef, useCallback } = React;

/* ---------- project data ---------- */
const PROJECTS = [
  {
    name: "AIO Sync",
    category: "Projects",
    tagline: "Every RGB brand ships its own software and they all conflict. One app to sync them all.",
    inline: true,
    tags: ["Electron", "Node.js", "JavaScript"],
    description:
      "Armoury Crate, iCUE, LGHUB, MSI Center — each one fighting for the same devices. AIO Sync talks to all of them through their native protocols and syncs every LED at once. Set a scene, pick an animated wallpaper, or kill every light with one click. A floating bubble keeps CPU, GPU, RAM, and AIO temps on screen without opening Task Manager.",
    status: "complete",
    accent: "lattice",
    cardImage: "assets/aio-hero.png",
    slides: [
      {
        src: "assets/aio-main-demo.html",
        caption: "",
        interactive: true,
      },
      {
        src: "assets/aio-bubble-demo.html",
        caption: "",
        interactive: true,
        split: true,
        title: ["Floating bubble,"],
        titleGold: "live temps.",
      },
    ],
  },
  {
    name: "CleanFeed",
    category: "Projects",
    tagline: "A Chrome extension that strips Shorts, Reels, and every algorithm built to keep your thumb moving.",
    inline: true,
    tags: ["Chrome Ext.", "Manifest V3", "JavaScript"],
    description:
      "YouTube was built so you'd choose what you watch. Now an algorithm chooses for you, and most of what it pushes is vertical: Shorts, Reels, TikTok-shaped slop designed to keep your thumb moving, not your mind. CleanFeed strips that out. Hide Shorts and Reels, kill the recommendations sidebar, drop the For You tab. Toggle each filter per platform, or hard-block a site when you need to focus. The content you actually follow, the way you meant to watch it.",
    status: "complete",
    githubUrl: "https://github.com/mmesonero/cleanfeed",
    accent: "cleanfeed",
    cardImage: "assets/cf-hero.jpg",
    logo: "assets/cf-logo.png",
    slides: [
      { src: "assets/cf-hero.jpg", caption: "" },
      {
        src: "assets/dashboard-demo.html",
        caption: "",
        interactive: true,
      },
      {
        src: "assets/popup-demo.html",
        caption: "",
        interactive: true,
        split: true,
        title: ["Open the", "extension,"],
        titleGold: "take it all back.",
      },
      {
        src: "assets/blocked-demo.html",
        caption: "",
        interactive: true,
        split: true,
        title: ["Block sites", "before you"],
        titleGold: "enter.",
      },
      {
        src: "assets/speed-demo.html",
        caption: "",
        interactive: true,
        title: ["Watch at your own"],
        titleGold: "pace.",
      },
      {
        src: "assets/skip-demo.html",
        caption: "",
        interactive: true,
        title: ["Jump forward"],
        titleGold: "or back.",
      },
    ],
  },
  {
    name: "Claude Token Tracker",
    category: "Projects",
    tagline: "The usage bar Anthropic shows quietly, and sometimes not at all, pinned right under your chat box.",
    inline: true,
    tags: ["Chrome Ext.", "Manifest V3", "JavaScript"],
    description:
      "Anthropic hides your real token consumption, you have to dig in to find it. This extension surfaces it in real time: live 5h and weekly limits pinned under the chat box, plus a full dashboard with tokens per day, cost, model breakdown, top projects, and cache efficiency. Local-only, no third-party servers.",
    status: "complete",
    githubUrl: "https://github.com/mmesonero/claude-token-tracker",
    accent: "ctt",
    cardImage: "assets/ctt-hero.png",
    logo: "assets/ctt-icon-large.png",
    slides: [
      { src: "assets/ctt-hero-demo.html", caption: "", interactive: true },
      {
        src: "assets/ctt-widget-demo.html",
        caption: "",
        interactive: true,
        title: ["Below every"],
        titleGold: "claude.ai chat box.",
      },
      {
        src: "assets/ctt-dashboard-demo.html",
        caption: "",
        interactive: true,
        split: true,
        title: ["Extension. One click"],
        titleGold: "to track the usage.",
      },
      {
        src: "assets/ctt-usage-demo.html",
        caption: "",
        interactive: true,
      },
    ],
  },
  {
    name: "Gmail Auto-Labeler",
    category: "AI Agents",
    tagline: "A GitHub Action that reads my inbox every hour and files every email under one of the labels.",
    tags: ["Python", "AI", "GitHub Actions"],
    description:
      "Runs every hour on GitHub Actions, hands each new email to a small language model, and files it under one of the labels, no server, no laptop, no manual sorting.",
    status: "complete",
    githubUrl: "https://github.com/mmesonero/gmail-labeler",
    accent: "labeler",
    inline: true,
    cardImage: "assets/gmail-hero.png",
    slides: [
      { src: "assets/gmail-hero.png", caption: "" },
      { src: "assets/gmail-features-hero.png", caption: "" },
    ],
  },
];

const IN_PROGRESS = [
  {
    name: "AI News Scraper",
    tagline: "Pulls the day's AI news from YouTube channels and the web, condenses it into a single brief.",
    tags: ["Python", "AI"],
    progress: 0.4,
  },
  {
    name: "Clinical AI Assistant",
    tagline: "Records the consultation, transcribes it, and returns a structured clinical note, so the doctor stops typing.",
    tags: ["Next.js", "FastAPI", "AI"],
    progress: 0.3,
  },
  {
    name: "WhatsApp Automation",
    tagline: "Watches my WhatsApp inbox and routes, tags, or auto-replies by rule, pure logic for now, AI hooks coming later.",
    tags: ["Node.js", "WhatsApp", "Automation"],
    progress: 0.1,
  },
];

/* ---------- thumbnail glyphs (abstract, not illustrative) ---------- */
const Glyph = ({ kind }) => {
  switch (kind) {
    case "lattice":
      return (
        <svg className="thumb-glyph" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="50" cy="20" r="3" fill="currentColor"/>
          <circle cx="20" cy="55" r="3" fill="currentColor"/>
          <circle cx="80" cy="55" r="3" fill="currentColor"/>
          <circle cx="35" cy="85" r="3" fill="currentColor"/>
          <circle cx="65" cy="85" r="3" fill="currentColor"/>
          <line x1="50" y1="20" x2="20" y2="55"/>
          <line x1="50" y1="20" x2="80" y2="55"/>
          <line x1="20" y1="55" x2="35" y2="85"/>
          <line x1="80" y1="55" x2="65" y2="85"/>
          <line x1="35" y1="85" x2="65" y2="85"/>
          <line x1="20" y1="55" x2="80" y2="55"/>
        </svg>
      );
    case "pampano":
      return (
        <svg className="thumb-glyph" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M5 60 Q 20 45, 35 60 T 65 60 T 95 60"/>
          <path d="M5 72 Q 20 57, 35 72 T 65 72 T 95 72" opacity="0.55"/>
          <path d="M5 84 Q 20 69, 35 84 T 65 84 T 95 84" opacity="0.3"/>
        </svg>
      );
    case "folio":
      return (
        <svg className="thumb-glyph" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.9">
          <rect x="22" y="22" width="56" height="56"/>
          <line x1="22" y1="38" x2="78" y2="38"/>
          <line x1="22" y1="54" x2="78" y2="54"/>
          <line x1="22" y1="70" x2="78" y2="70"/>
          <line x1="50" y1="22" x2="50" y2="78"/>
        </svg>
      );
    case "marginalia":
      return (
        <svg className="thumb-glyph" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.9">
          <line x1="22" y1="30" x2="78" y2="30"/>
          <line x1="22" y1="42" x2="78" y2="42"/>
          <line x1="22" y1="54" x2="64" y2="54"/>
          <line x1="22" y1="66" x2="78" y2="66"/>
          <line x1="22" y1="78" x2="50" y2="78"/>
          <rect x="68" y="48" width="14" height="14" fill="currentColor" opacity="0.6"/>
        </svg>
      );
    case "labeler":
      return (
        <svg className="thumb-glyph" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.9">
          <rect x="18" y="30" width="64" height="42" rx="2"/>
          <polyline points="18,34 50,56 82,34"/>
          <path d="M58 58 L82 58 L82 82 L66 82 L58 74 Z" fill="currentColor" opacity="0.18"/>
          <path d="M58 58 L82 58 L82 82 L66 82 L58 74 Z"/>
          <circle cx="64" cy="66" r="1.6" fill="currentColor"/>
        </svg>
      );
    case "cleanfeed":
      return (
        <svg className="thumb-glyph" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.9">
          <path d="M30 35 L50 20 L70 35 L70 65 L50 80 L30 65 Z"/>
          <line x1="30" y1="50" x2="70" y2="50" opacity="0.4"/>
          <line x1="40" y1="35" x2="40" y2="65" opacity="0.3"/>
          <line x1="60" y1="35" x2="60" y2="65" opacity="0.3"/>
          <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.5"/>
        </svg>
      );
    case "ctt":
      return (
        <svg className="thumb-glyph" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.9">
          <path d="M20 62 A34 34 0 0 1 80 62" strokeWidth="1"/>
          <path d="M25 66 A29 29 0 0 1 75 66" strokeWidth="4" strokeLinecap="round" opacity="0.18" stroke="currentColor"/>
          <path d="M25 66 A29 29 0 0 1 58 38" strokeWidth="4" strokeLinecap="round" opacity="0.7" stroke="currentColor"/>
          <circle cx="50" cy="65" r="2.5" fill="currentColor"/>
          <line x1="50" y1="63" x2="50" y2="42" strokeWidth="0.8" opacity="0.5"/>
          <line x1="26" y1="64" x2="22" y2="60" strokeWidth="0.7" opacity="0.4"/>
          <line x1="74" y1="64" x2="78" y2="60" strokeWidth="0.7" opacity="0.4"/>
          <line x1="50" y1="36" x2="50" y2="32" strokeWidth="0.7" opacity="0.4"/>
          <text x="50" y="82" textAnchor="middle" fontSize="7" fill="currentColor" stroke="none" opacity="0.55" fontFamily="monospace">5h · 7d</text>
        </svg>
      );
    default:
      return null;
  }
};

/* ---------- carousel ---------- */
function Carousel({ slides }) {
  const [idx, setIdx] = useState(0);
  const len = slides.length;
  const prev = () => setIdx((idx - 1 + len) % len);
  const next = () => setIdx((idx + 1) % len);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx]);

  return (
    <div className="carousel">
      {slides[idx].scrollable ? (
        <div className="carousel-track carousel-composed">
          <div className="composed-left">
            <div className="composed-label">{slides[idx].label}</div>
            {slides[idx].title.map((line, i) => <div key={i} className="composed-title">{line}</div>)}
            <div className="composed-title composed-gold">{slides[idx].titleGold}</div>
            <div className="composed-subs">
              {slides[idx].subtitle.map((line, i) => <div key={i}>{line}</div>)}
            </div>
            <div className="composed-scroll-cue">↓ scroll to explore</div>
          </div>
          <div className="composed-right">
            <img src={slides[idx].src} alt="" className="composed-scroll-img" />
          </div>
          <div className="carousel-counter">{idx + 1} / {len}</div>
        </div>
      ) : slides[idx].interactive && slides[idx].label ? (
        <div className="carousel-track carousel-split">
          <div className="split-left">
            <div className="composed-label">{slides[idx].label}</div>
            {slides[idx].title && slides[idx].title.map((line, i) => <div key={i} className="composed-title">{line}</div>)}
            {slides[idx].titleGold && <div className="composed-title composed-gold">{slides[idx].titleGold}</div>}
            {slides[idx].subtitle && (
              <div className="composed-subs">
                {slides[idx].subtitle.map((line, i) => <div key={i}>{line}</div>)}
              </div>
            )}
          </div>
          <div className="split-right">
            <iframe
              key={slides[idx].src}
              src={slides[idx].src}
              title="interactive demo"
              className="carousel-iframe"
              scrolling="auto"
              frameBorder="0"
            />
          </div>
          <div className="carousel-counter">{idx + 1} / {len}</div>
        </div>
      ) : slides[idx].interactive && (slides[idx].split || slides[idx].label) ? (
        <div className="carousel-track carousel-split">
          <div className="split-left">
            {slides[idx].label && <div className="composed-label">{slides[idx].label}</div>}
            {slides[idx].title && slides[idx].title.map((line, i) => <div key={i} className="composed-title">{line}</div>)}
            {slides[idx].titleGold && <div className="composed-title composed-gold">{slides[idx].titleGold}</div>}
            {slides[idx].subtitle && (
              <div className="composed-subs">
                {slides[idx].subtitle.map((line, i) => <div key={i}>{line}</div>)}
              </div>
            )}
          </div>
          <div className="split-right">
            <iframe
              key={slides[idx].src}
              src={slides[idx].src}
              title="interactive demo"
              className="carousel-iframe"
              scrolling="auto"
              frameBorder="0"
            />
          </div>
          <div className="carousel-counter">{idx + 1} / {len}</div>
        </div>
      ) : slides[idx].interactive && (slides[idx].title || slides[idx].titleGold) ? (
        <div className="carousel-track carousel-overlay carousel-overlay-iframe">
          <iframe
            key={slides[idx].src}
            src={slides[idx].src}
            title="interactive demo"
            className="carousel-iframe"
            scrolling="auto"
            frameBorder="0"
          />
          <div className="overlay-panel" style={slides[idx].titleTop ? { top: slides[idx].titleTop } : undefined}>
            {slides[idx].title && slides[idx].title.map((line, i) => <div key={i} className="composed-title">{line}</div>)}
            {slides[idx].titleGold && <div className="composed-title composed-gold">{slides[idx].titleGold}</div>}
            {slides[idx].subtitle && (
              <div className="composed-subs">
                {slides[idx].subtitle.map((line, i) => <div key={i}>{line}</div>)}
              </div>
            )}
          </div>
          <div className="carousel-counter">{idx + 1} / {len}</div>
        </div>
      ) : slides[idx].interactive ? (
        <div className="carousel-track">
          <iframe
            key={slides[idx].src}
            src={slides[idx].src}
            title="interactive demo"
            className="carousel-iframe"
            scrolling="auto"
            frameBorder="0"
          />
          <div className="carousel-counter">{idx + 1} / {len}</div>
        </div>
      ) : slides[idx].label || slides[idx].title || slides[idx].titleGold ? (
        <div className="carousel-track carousel-overlay">
          <img src={slides[idx].src} alt="" className="carousel-img" />
          <div className="overlay-panel" style={slides[idx].titleTop ? { top: slides[idx].titleTop } : undefined}>
            {slides[idx].label && <div className="composed-label">{slides[idx].label}</div>}
            {slides[idx].title && slides[idx].title.map((line, i) => <div key={i} className="composed-title">{line}</div>)}
            {slides[idx].titleGold && <div className="composed-title composed-gold">{slides[idx].titleGold}</div>}
            {slides[idx].subtitle && (
              <div className="composed-subs">
                {slides[idx].subtitle.map((line, i) => <div key={i}>{line}</div>)}
              </div>
            )}
          </div>
          <div className="carousel-counter">{idx + 1} / {len}</div>
        </div>
      ) : (
        <div className="carousel-track">
          <img src={slides[idx].src} alt="" className="carousel-img" />
          <div className="carousel-counter">{idx + 1} / {len}</div>
        </div>
      )}
      <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Previous slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="15,4 7,12 15,20"/></svg>
      </button>
      <button className="carousel-btn carousel-next" onClick={next} aria-label="Next slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="9,4 17,12 9,20"/></svg>
      </button>
    </div>
  );
}

/* ---------- icons ---------- */
const Icon = ({ name, size = 16 }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 1.6,
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  if (name === "arrow") return (
    <svg {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13,6 19,12 13,18"/></svg>
  );
  if (name === "play") return (
    <svg {...props}><polygon points="8,5 19,12 8,19" fill="currentColor" stroke="none"/></svg>
  );
  if (name === "close") return (
    <svg {...props}><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>
  );
  if (name === "github") return (
    <svg {...props}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
  );
  if (name === "linkedin") return (
    <svg {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  );
  if (name === "mail") return (
    <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3,7 12,13 21,7"/></svg>
  );
  if (name === "twitter") return (
    <svg {...props}><path d="M22 4s-2 1-3 1c-1-1-3-1-4 0c-2 1-2 3-2 4c-5 0-9-4-9-4s-2 5 3 8c-2 0-3-1-3-1c0 3 2 4 4 5c-2 1-4 0-4 0c1 2 4 4 7 4c5 0 11-3 11-11c0 0 1-1 2-3l-2 0z"/></svg>
  );
  if (name === "calendar") return (
    <svg {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>
  );
  if (name === "copy") return (
    <svg {...props}><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
  );
  if (name === "check") return (
    <svg {...props}><polyline points="4,12 10,18 20,6"/></svg>
  );
  if (name === "doc") return (
    <svg {...props}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="14,3 14,9 20,9"/></svg>
  );
  return null;
};

/* ---------- nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#top" className="brand reveal-soft" style={{ '--d': '60ms' }} aria-label="Manuel Mesonero">
          <img src="assets/logo.png" alt="Manuel Mesonero" className="brand-mark" />
        </a>
        <div className="nav-links">
          <a href="#work" className="reveal-soft" style={{ '--d': '180ms' }}>Work</a>
          <span className="nav-sep">&middot;</span>
          <a href="#progress" className="reveal-soft" style={{ '--d': '240ms' }}>In Progress</a>
          <span className="nav-sep">&middot;</span>
          <a href="#contact" className="reveal-soft" style={{ '--d': '300ms' }}>Contact</a>
        </div>
      </div>
    </nav>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <header className="hero container" id="top">
      <div className="eyebrow reveal" style={{ '--d': '120ms' }}>
        Personal projects &middot; Built as a hobby
      </div>
      <h1>
        <span className="reveal" style={{ '--d': '180ms', display: 'inline-block' }}>Manuel</span>{' '}
        <span className="italic reveal" style={{ '--d': '260ms', display: 'inline-block' }}>Mesonero</span>
      </h1>
      <p className="subtitle reveal" style={{ '--d': '420ms' }}>
        Digital Transformation Consultant
      </p>
    </header>
  );
}

/* ---------- inline carousel (swipeable, strip-based) ---------- */
function InlineCarousel({ slides, cardNum }) {
  const len = slides.length;
  const [idx, setIdx] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);
  const touch = useRef({ x0: 0, y0: 0, dir: null });

  const goTo = useCallback((n) => setIdx(((n % len) + len) % len), [len]);

  /* Non-passive touchmove — needed to call preventDefault and intercept horizontal swipes */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e) => {
      const t = touch.current;
      if (t.dir === null) {
        const dx = Math.abs(e.touches[0].clientX - t.x0);
        const dy = Math.abs(e.touches[0].clientY - t.y0);
        if (dx > 5 || dy > 5) t.dir = dx >= dy ? 'h' : 'v';
      }
      if (t.dir === 'h') {
        e.preventDefault();
        setDragX(e.touches[0].clientX - t.x0);
        setDragging(true);
      }
    };
    el.addEventListener('touchmove', onMove, { passive: false });
    return () => el.removeEventListener('touchmove', onMove);
  }, []);

  const onTouchStart = (e) => {
    touch.current = { x0: e.touches[0].clientX, y0: e.touches[0].clientY, dir: null };
    setDragging(false);
    setDragX(0);
  };

  const onTouchEnd = (e) => {
    if (touch.current.dir === 'h') {
      const dx = e.changedTouches[0].clientX - touch.current.x0;
      if (dx < -50) goTo(idx + 1);
      else if (dx > 50) goTo(idx - 1);
    }
    touch.current.dir = null;
    setDragging(false);
    setDragX(0);
  };

  return (
    <div
      ref={containerRef}
      className="inline-carousel"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <span className="corner">{cardNum} &middot; {idx + 1}/{len}</span>
      <div
        className="inline-carousel-track"
        style={{
          transform: `translateX(calc(-${idx * 100}% + ${dragX}px))`,
          transition: dragging ? 'none' : 'transform 0.32s cubic-bezier(.2,.7,.2,1)',
        }}
      >
        {slides.map((slide, i) => (
          <div key={slide.src} className="inline-carousel-slide">
            {slide.interactive
              ? <iframe src={slide.src} className="inline-carousel-iframe" frameBorder="0" scrolling="auto" title={`Demo ${i + 1}`} />
              : <img src={slide.src} alt="" className="thumb-cover" />
            }
            {/* Transparent overlay — captures touch events that iframes would otherwise swallow */}
            <div className="slide-swipe-overlay" />
          </div>
        ))}
      </div>

      {len > 1 && (
        <>
          <button className="inline-nav inline-nav-prev" onClick={e => { e.stopPropagation(); goTo(idx - 1); }} aria-label="Previous">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,4 7,12 15,20"/></svg>
          </button>
          <button className="inline-nav inline-nav-next" onClick={e => { e.stopPropagation(); goTo(idx + 1); }} aria-label="Next">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9,4 17,12 9,20"/></svg>
          </button>
          <div className="thumb-dots">
            {slides.map((_, i) => (
              <span key={i} className={`thumb-dot ${i === idx ? 'active' : ''}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- project card ---------- */
function ProjectCard({ p, idx, onOpen }) {
  const hasSlides = p.slides && p.slides.length > 0;

  /* Inline card: <div> so <a> children are valid HTML, no modal */
  if (p.inline) {
    return (
      <div className="card card-inline reveal" style={{ '--d': `${600 + idx * 120}ms` }}>
        <div className={`thumb thumb-carousel ${hasSlides ? 'has-image' : ''}`}>
          {hasSlides
            ? <InlineCarousel slides={p.slides} cardNum={String(idx + 1).padStart(2, '0')} />
            : <div className="thumb-art">{p.cardImage
                ? <img src={p.cardImage} alt={p.name} className="thumb-cover" />
                : <Glyph kind={p.accent} />}
              </div>
          }
        </div>
        <div className="card-body">
          <div className="card-title-row">
            <div className="card-title">{p.name}</div>
          </div>
          <div className="card-tag">{p.tagline}</div>
          <div className="pills">
            {p.tags.map((t, i) => (
              <span className={`pill-sm ${i === 0 || t === 'AI' ? 'accent' : ''}`} key={t}>{t}</span>
            ))}
          </div>
          {p.githubUrl && (
            <div className="card-inline-link">
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn ghost">
                <Icon name="github" size={14} /> View on GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* Default card: button, opens modal */
  return (
    <button
      className="card reveal"
      style={{ '--d': `${600 + idx * 120}ms` }}
      onClick={() => onOpen(p)}
      aria-label={`Open ${p.name} details`}
    >
      <div className={`thumb ${p.cardImage ? 'has-image' : ''}`}>
        <span className="corner">{String(idx + 1).padStart(2, '0')} &middot; {p.tags[0]}</span>
        <div className="thumb-art">
          {p.cardImage ? <img src={p.cardImage} alt={p.name} className="thumb-cover" /> : <Glyph kind={p.accent} />}
        </div>
      </div>
      <div className="card-body">
        <div className="card-title-row">
          <div className="card-title">{p.name}</div>
        </div>
        <div className="card-tag">{p.tagline}</div>
        <div className="pills">
          {p.tags.map((t, i) => (
            <span className={`pill-sm ${i === 0 || t === 'AI' ? 'accent' : ''}`} key={t}>{t}</span>
          ))}
        </div>
      </div>
    </button>
  );
}

/* ---------- modal ---------- */
function Modal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={16} />
        </button>
        {project.slides ? (
          <div className="modal-carousel-wrap">
            <Carousel slides={project.slides} />
          </div>
        ) : (
          <div className="thumb">
            <span className="corner">Case study &middot; {project.tags[0]}</span>
            <div className="thumb-art"><Glyph kind={project.accent} /></div>
          </div>
        )}
        <div className="modal-body">
          <div className="modal-title-row">
            {project.logo && <img src={project.logo} alt="" className="modal-logo" />}
            <h3 className="modal-title">{project.name}</h3>
          </div>
          <p className="modal-tag">{project.tagline}</p>
          <p className="modal-desc">{project.description}</p>

          <div className="modal-section-label">Stack</div>
          <div className="pills" style={{ marginBottom: 8 }}>
            {project.tags.map((t, i) => (
              <span className={`pill-sm ${i === 0 || t === 'AI' ? 'accent' : ''}`} key={t}>{t}</span>
            ))}
          </div>

          {project.githubUrl && (
            <div className="modal-actions">
              <a className="btn ghost" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="github" size={15} /> View on GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- in-progress ---------- */
function InProgress() {
  return (
    <section className="section container" id="progress">
      <div className="section-head">
        <h2 className="reveal" style={{ '--d': '120ms' }}>
          What I'm <span className="italic">working on</span>
        </h2>
      </div>
      <div className="wip">
        {IN_PROGRESS.map((w, i) => (
          <div className="wip-card reveal" key={w.name} style={{ '--d': `${240 + i * 140}ms` }}>
            <div className="wip-head">
              <span className="wip-dot"></span>
              In progress &middot; {Math.round(w.progress * 100)}%
            </div>
            <div className="wip-title">{w.name}</div>
            <div className="wip-desc">{w.tagline}</div>
            <div className="pills">
              {w.tags.map((t) => <span className="pill-sm" key={t}>{t}</span>)}
            </div>
            <div className="wip-progress"><span style={{ '--p': w.progress }}></span></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- contact ---------- */
function Contact() {

  return (
    <section className="contact container" id="contact">
      <div className="panel">
        <div className="contact-label reveal" style={{ '--d': '60ms' }}>Contact</div>
        <p className="contact-copy reveal" style={{ '--d': '160ms' }}>
          Always up for a virtual coffee. Let's talk about AI work, ideas, or whatever you're brewing.
        </p>
        <div className="contact-buttons">
          <a className="btn primary reveal" style={{ '--d': '260ms' }} href="https://www.linkedin.com/in/mesonero/" target="_blank" rel="noopener noreferrer">
            <Icon name="linkedin" size={15} /> LinkedIn
          </a>
          <a className="btn ghost reveal" style={{ '--d': '320ms' }} href="https://github.com/mmesonero" target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={15} /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- main ---------- */
function App() {
  const [open, setOpen] = useState(null);

  return (
    <div className="app">
      <Nav />
      <Hero />
      <main>
        <section className="section container" id="work">
          <div className="section-head">
            <h2 className="reveal" style={{ '--d': '120ms' }}>
              What I've <span className="italic">built</span>
            </h2>
          </div>
          {(() => {
            const order = ["AI Agents", "Projects"];
            const ACCENTED_WORDS = ["AI"];
            const renderLabel = (cat) => {
              const parts = cat.split(/(\s+)/);
              return parts.map((p, i) =>
                ACCENTED_WORDS.includes(p)
                  ? <span key={i} className="cat-accent">{p}</span>
                  : p
              );
            };
            const grouped = {};
            PROJECTS.forEach((p) => {
              const cat = p.category || "Other";
              (grouped[cat] = grouped[cat] || []).push(p);
            });
            const cats = [...order.filter(c => grouped[c]), ...Object.keys(grouped).filter(c => !order.includes(c))];
            let idxOffset = 0;
            return cats.map((cat, ci) => {
              const items = grouped[cat];
              const startIdx = idxOffset;
              idxOffset += items.length;
              return (
                <div className="category" key={cat}>
                  <div className="category-head reveal-soft" style={{ '--d': `${120 + ci * 80}ms` }}>
                    <span className="category-label">{cat}</span>
                  </div>
                  <div className="projects">
                    {items.map((p, i) => (
                      <ProjectCard key={p.name} p={p} idx={startIdx + i} onOpen={setOpen} />
                    ))}
                  </div>
                </div>
              );
            });
          })()}
        </section>
        <InProgress />
        <Contact />
      </main>
      <footer className="foot container">
        <img src="assets/logo.png" alt="" className="foot-mark" />
        <span>&copy; 2026 &middot; Manuel Mesonero</span>
        <span>Madrid &middot; Vibe coded</span>
      </footer>
      {open && <Modal project={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
