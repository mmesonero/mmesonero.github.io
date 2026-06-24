/* =========================================================
   Manuel Mesonero, Personal Portfolio
   React app. Single file. Soft luxury, warm + gold.
   ========================================================= */

const { useState, useEffect, useRef } = React;

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
    logo: "assets/aio-logo.png",
    slides: [
      { src: "assets/aio-cover.png" },
      {
        src: "assets/aio-bubble-demo.html",
        interactive: true,
        titleHtml: 'Bubble with <span class="gold-word">metric</span> and <span class="gold-word">scenes</span>',
        titleAccent: "#fad34a",
      },
      { src: "assets/aio-3.png" },
      { src: "assets/aio-4.png" },
      { src: "assets/aio-5.png" },
      { src: "assets/aio-6.png" },
      { src: "assets/aio-7.png" },
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
    cardImage: "assets/cf-1.png",
    logo: "assets/cf-logo.png",
    slides: [
      { src: "assets/cf-1.png" },
      { src: "assets/cf-2.png" },
      { src: "assets/cf-3.png" },
      { src: "assets/cf-4.png" },
      { src: "assets/cf-5.png" },
      { src: "assets/cf-6.png" },
    ],
  },
  {
    name: "Apple Health Logger",
    category: "Projects",
    tagline: "iOS Shortcut, GitHub Action, Google Sheet. My step count is logged on autopilot.",
    inline: true,
    tags: ["iOS Shortcut", "GitHub Actions", "Google Sheets"],
    description:
      "An iOS Shortcut reads HealthKit step counts on a timer, fires a repository_dispatch event to a GitHub Action, and the action appends the row to a Google Sheet. No app, no laptop, no manual export. Just a quiet pipeline that keeps a daily record without me thinking about it.",
    status: "complete",
    githubUrl: "https://github.com/mmesonero/apple-health",
    accent: "pampano",
    slides: [
      { src: "assets/health-1.png" },
      { src: "assets/health-2.png" },
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
    cardImage: "assets/ctt-1.png",
    logo: "assets/ctt-icon-large.png",
    slides: [
      { src: "assets/ctt-1.png" },
      { src: "assets/ctt-2.png" },
      { src: "assets/ctt-3.png" },
      { src: "assets/ctt-4.png" },
    ],
  },
  {
    name: "AI News",
    category: "AI Projects",
    tagline: "Daily AI news briefing — deduplicated by meaning, AI-classified and published twice a day.",
    tags: ["AI", "Python", "Postgres"],
    description: "Daily AI news briefing — deduplicated by meaning, AI-classified and published twice a day.",
    status: "complete",
    accent: "labeler",
    inline: true,
    liveUrl: "ai-news/",
    cardImage: "assets/ai-news-hero.png",
    slides: [
      { src: "assets/ai-news-hero.png", caption: "" },
      { src: "assets/ai-news-features-hero.png", caption: "" },
      { src: "assets/ai-news-slide3.png", caption: "" },
    ],
  },
  {
    name: "3 Agents",
    category: "AI Projects",
    tagline: <span>Three AI agents, each with its own avatar, connected to GPT-4o mini. Done with <strong>Rafael Moreno Escamilla</strong>.</span>,
    tags: ["AI", "Agents", "Avatars"],
    description:
      "3 agents with its own avatar connected to GPT-4o mini. Done with Rafael Moreno Escamilla.",
    status: "complete",
    accent: "labeler",
    inline: true,
    cardImage: "assets/agent-1.png",
    slides: [
      { src: "assets/agent-1.png" },
      { src: "assets/agent-2.mp4", poster: "assets/agent-2-poster.png" },
    ],
  },
  {
    name: "Gmail Auto-Labeler",
    category: "AI Projects",
    tagline: "A GitHub Action that reads my inbox every hour and files every email under one of the labels.",
    tags: ["AI", "Python", "Automation"],
    description:
      "Runs every hour on GitHub Actions, hands each new email to a small language model, and files it under one of the labels, no server, no laptop, no manual sorting.",
    status: "complete",
    githubUrl: "https://github.com/mmesonero/gmail-labeler",
    accent: "labeler",
    inline: true,
    cardImage: "assets/gmail-hero.png",
    slides: [
      { src: "assets/gmail-hero.png" },
      { src: "assets/gmail-features-hero.png" },
    ],
  },
];

const IN_PROGRESS = [
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

/* ---------- slide media (img or autoplay-loop video w/ mute toggle) ---------- */
const isVideoSrc = (s) => typeof s === 'string' && /\.(mp4|webm|mov)(\?.*)?$/i.test(s);
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SlideImage = ({ src, className, alt = "", eager = false }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading={eager ? "eager" : "lazy"}
    decoding="async"
    fetchpriority={eager ? "high" : undefined}
  />
);

const SlideVideo = ({ src, className, poster, alt = "", isActive = true }) => {
  const ref = useRef(null);
  const wrapRef = useRef(null);
  const barRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (isActive && playing && !prefersReducedMotion()) {
      v.play().catch(() => {});
    }
  }, [isActive]);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onTime = () => {
      if (v.duration > 0) setProgress((v.currentTime / v.duration) * 100);
    };
    v.addEventListener('timeupdate', onTime);
    return () => v.removeEventListener('timeupdate', onTime);
  }, []);
  const toggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) { v.play().catch(() => {}); setPlaying(true); }
  };
  const togglePlay = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };
  const seek = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const v = ref.current;
    const bar = barRef.current;
    if (!v || !bar || !v.duration) return;
    const r = bar.getBoundingClientRect();
    const x = (e.clientX ?? e.touches?.[0]?.clientX ?? 0) - r.left;
    const pct = Math.max(0, Math.min(1, x / r.width));
    v.currentTime = pct * v.duration;
    if (v.paused) v.play().catch(() => {});
  };
  return (
    <div className="slide-video-wrap" ref={wrapRef}>
      <video
        ref={ref}
        src={src}
        className={className}
        poster={poster}
        aria-label={alt}
        autoPlay={!prefersReducedMotion()}
        muted
        loop
        playsInline
        preload={isActive ? "auto" : "metadata"}
        onClick={togglePlay}
        style={{cursor:'pointer'}}
      />
      {!playing && (
        <div className="slide-play-icon" aria-hidden="true">
          <div className="slide-play-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <polygon points="6 3 20 12 6 21 6 3"/>
            </svg>
          </div>
        </div>
      )}
      <button
        type="button"
        className="slide-audio-btn"
        onClick={toggle}
        aria-label={muted ? "Unmute" : "Mute"}
        title={muted ? "Unmute" : "Mute"}
      >
        {muted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        )}
      </button>
      <div
        className="slide-progress"
        ref={barRef}
        onClick={seek}
        onTouchStart={seek}
        role="slider"
        aria-label="Video progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div className="slide-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

const SlideMedia = (props) =>
  isVideoSrc(props.src) ? <SlideVideo {...props} /> : <SlideImage {...props} />;

/* ---------- carousel ---------- */
function Carousel({ slides, projectName = "" }) {
  const [idx, setIdx] = useState(0);
  const len = slides.length;
  const prev = () => setIdx(i => (i - 1 + len) % len);
  const next = () => setIdx(i => (i + 1) % len);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target?.tagName === 'INPUT' || e.target?.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [len]);

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
            <img src={slides[idx].src} alt="" loading="lazy" decoding="async" className="composed-scroll-img" />
          </div>
          <div className="carousel-counter" aria-live="polite" aria-atomic="true">{idx + 1}/{len}</div>
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
          <div className="carousel-counter" aria-live="polite" aria-atomic="true">{idx + 1}/{len}</div>
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
          <div className="carousel-counter" aria-live="polite" aria-atomic="true">{idx + 1}/{len}</div>
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
          <div className="carousel-counter" aria-live="polite" aria-atomic="true">{idx + 1}/{len}</div>
        </div>
      ) : slides[idx].label || slides[idx].title || slides[idx].titleGold ? (
        <div className="carousel-track carousel-overlay">
          <SlideMedia src={slides[idx].src} poster={slides[idx].poster} className="carousel-img" alt={slides[idx].alt || `${projectName} screenshot ${idx + 1}`} eager={idx === 0} />
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
          <div className="carousel-counter" aria-live="polite" aria-atomic="true">{idx + 1}/{len}</div>
        </div>
      ) : (
        <div className="carousel-track">
          <SlideMedia src={slides[idx].src} poster={slides[idx].poster} className="carousel-img" alt={slides[idx].alt || `${projectName} screenshot ${idx + 1}`} eager={idx === 0} />
          <div className="carousel-counter" aria-live="polite" aria-atomic="true">{idx + 1}/{len}</div>
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
          <img src="assets/logo.png" alt="" className="brand-mark" />
        </a>
        <div className="nav-links">
          <a href="#work" className="reveal-soft" style={{ '--d': '180ms' }}>Work</a>
          <span className="nav-sep">&middot;</span>
          <a href="#progress" className="reveal-soft" style={{ '--d': '240ms' }}>In Progress</a>
          <span className="nav-sep">&middot;</span>
          <a href="#about" className="reveal-soft" style={{ '--d': '300ms' }}>About Me</a>
          <span className="nav-sep">&middot;</span>
          <a href="ai-news/" className="reveal-soft nav-accent" style={{ '--d': '360ms' }}>AI News</a>
        </div>
      </div>
    </nav>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <header className="hero container hero--compact" id="top">
      <h1>
        <span className="reveal" style={{ '--d': '180ms', display: 'inline-block' }}>Manuel</span>{' '}
        <span className="italic reveal" style={{ '--d': '260ms', display: 'inline-block' }}>Mesonero</span>
      </h1>
      <p className="subtitle reveal-soft" style={{ '--d': '380ms' }}>Digital Transformation Consultant · Vibecoding</p>
    </header>
  );
}

/* ---------- inline carousel (swipeable, infinite loop) ---------- */
function InlineCarousel({ slides, projectName = "" }) {
  const len = slides.length;
  const ext = [slides[len - 1], ...slides, slides[0]];
  const extLen = ext.length;
  const [pos, setPos] = useState(1);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [jump, setJump] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!jump) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setJump(false)));
    return () => cancelAnimationFrame(id);
  }, [jump]);

  const onTransitionEnd = () => {
    if (pos >= extLen - 1) { setJump(true); setPos(1); }
    else if (pos <= 0)     { setJump(true); setPos(len); }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let x0 = 0, y0 = 0, dir = null;
    const onStart = (e) => {
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
      dir = null; setDragX(0); setDragging(false);
    };
    const onMove = (e) => {
      if (dir === null) {
        const dx = Math.abs(e.touches[0].clientX - x0);
        const dy = Math.abs(e.touches[0].clientY - y0);
        if (dx > 5 || dy > 5) dir = dx >= dy ? 'h' : 'v';
      }
      if (dir === 'h') { e.preventDefault(); setDragX(e.touches[0].clientX - x0); setDragging(true); }
    };
    const onEnd = (e) => {
      if (dir === 'h') {
        const dx = e.changedTouches[0].clientX - x0;
        if (dx < -50) setPos(p => p + 1);
        else if (dx > 50) setPos(p => p - 1);
      }
      dir = null; setDragging(false); setDragX(0);
    };
    el.addEventListener('touchstart', onStart, { passive: true,  capture: true });
    el.addEventListener('touchmove',  onMove,  { passive: false, capture: true });
    el.addEventListener('touchend',   onEnd,   { passive: true,  capture: true });
    return () => {
      el.removeEventListener('touchstart', onStart, { capture: true });
      el.removeEventListener('touchmove',  onMove,  { capture: true });
      el.removeEventListener('touchend',   onEnd,   { capture: true });
    };
  }, [len]);

  const dotIdx = Math.max(0, Math.min(len - 1, pos - 1));
  const slideW = 100 / extLen;

  const go = (dir) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    setPos(p => p + dir);
  };

  return (
    <div ref={containerRef} className="inline-carousel">
      {len > 1 && <span className="corner" aria-live="polite" aria-atomic="true">{dotIdx + 1}/{len}</span>}
      <div
        className="inline-carousel-track"
        style={{
          width: `${extLen * 100}%`,
          transform: `translateX(calc(-${pos * slideW}% + ${dragX}px))`,
          transition: (dragging || jump) ? 'none' : 'transform 0.32s cubic-bezier(.2,.7,.2,1)',
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {ext.map((slide, i) => (
          <div key={`${slide.src}-${i}`} className="inline-carousel-slide" style={{ width: `${slideW}%` }}>
            {slide.thumb
              ? <img src={slide.thumb} alt="" loading="lazy" decoding="async" className="thumb-cover" />
              : slide.interactive
                ? <iframe src={slide.src} className="inline-carousel-iframe" frameBorder="0" scrolling="no" loading="lazy" title={`${projectName || 'Project'} demo ${i}`} />
                : <SlideMedia
                    src={slide.src}
                    poster={slide.poster}
                    className="thumb-cover"
                    isActive={i === pos}
                    alt={slide.alt || `${projectName} screenshot ${i}`}
                  />
            }
            {(slide.title || slide.titleGold || slide.titleHtml) && (
              <div className={`inline-overlay-panel ${slide.split ? 'inline-overlay-panel--left' : ''}`} style={slide.titleAccent ? { '--slide-accent': slide.titleAccent } : undefined}>
                {slide.titleHtml
                  ? <div className="composed-title inline-composed-title" dangerouslySetInnerHTML={{ __html: slide.titleHtml }} />
                  : (
                    <>
                      {slide.title && slide.title.map((line, j) => <div key={j} className="composed-title inline-composed-title">{line}</div>)}
                      {slide.titleGold && <div className="composed-title composed-gold inline-composed-title">{slide.titleGold}</div>}
                    </>
                  )
                }
              </div>
            )}
            <div className="slide-swipe-overlay" />
          </div>
        ))}
      </div>

      {len > 1 && (
        <>
          <button type="button" className="inline-carousel-btn inline-carousel-prev" onClick={go(-1)} aria-label="Previous slide">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button type="button" className="inline-carousel-btn inline-carousel-next" onClick={go(1)} aria-label="Next slide">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
          <div className="thumb-dots">
            {slides.map((_, i) => (
              <span key={i} className={`thumb-dot ${i === dotIdx ? 'active' : ''}`} />
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
            ? <InlineCarousel slides={p.slides} projectName={p.name} />
            : <div className="thumb-art">{p.cardImage
                ? <img src={p.cardImage} alt={p.name} loading="lazy" decoding="async" className="thumb-cover" />
                : <Glyph kind={p.accent} />}
              </div>
          }
          {p.liveUrl && (
            <a href={p.liveUrl} className="card-live-btn" aria-label={`Open ${p.name}`}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 2H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9"/>
                <path d="M8 1h5v5"/>
                <line x1="13" y1="1" x2="6" y2="8"/>
              </svg>
              Open
            </a>
          )}
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
          {p.credit && <div className="card-credit">{p.credit}</div>}
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
          {p.cardImage ? <img src={p.cardImage} alt={p.name} loading="lazy" decoding="async" className="thumb-cover" /> : <Glyph kind={p.accent} />}
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
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const titleId = `modal-title-${(project?.name || '').replace(/\s+/g, '-').toLowerCase()}`;
  useEffect(() => {
    const prevActive = document.activeElement;
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, textarea, select'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      if (prevActive && typeof prevActive.focus === 'function') prevActive.focus();
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div
        className="modal"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={16} />
        </button>
        {project.slides ? (
          <div className="modal-carousel-wrap">
            <Carousel slides={project.slides} projectName={project.name} />
          </div>
        ) : (
          <div className="thumb">
            <span className="corner">Case study &middot; {project.tags[0]}</span>
            <div className="thumb-art"><Glyph kind={project.accent} /></div>
          </div>
        )}
        <div className="modal-body">
          <div className="modal-title-row">
            {project.logo && <img src={project.logo} alt="" loading="lazy" decoding="async" className="modal-logo" />}
            <h3 id={titleId} className="modal-title">{project.name}</h3>
          </div>
          <p className="modal-tag">{project.tagline}</p>
          <p className="modal-desc">{project.description}</p>

          <div className="modal-section-label">Stack</div>
          <div className="pills" style={{ marginBottom: 8 }}>
            {project.tags.map((t, i) => (
              <span className={`pill-sm ${i === 0 || t === 'AI' ? 'accent' : ''}`} key={t}>{t}</span>
            ))}
          </div>


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
          <span className="italic">What I'm working on</span>
        </h2>
      </div>
      <div className="wip">
        {IN_PROGRESS.map((w, i) => (
          <div className="wip-card reveal" key={w.name} style={{ '--d': `${240 + i * 140}ms` }}>
            <div className="wip-head">
              <span className="wip-dot"></span>
              In progress
            </div>
            <div className="wip-title">{w.name}</div>
            <div className="wip-desc">{w.tagline}</div>
            <div className="wip-progress" style={{ '--p': w.progress }}>
              <span className="wip-marker">{Math.round(w.progress * 100)}%</span>
              <div className="wip-progress-track"><div className="wip-progress-fill"></div></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- about ---------- */
function About() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section className="about container" id="about">
      <div className="category-head reveal-soft" style={{ '--d': '60ms' }}>
        <span className="category-label">About Me</span>
      </div>
      <div className="about-grid">
        <div className="about-copy">
          <p className="about-bio reveal-soft" style={{ '--d': '160ms' }}>
            <span className="gold-word">Digital Transformation Consultant</span> in a Big4 &amp;{' '}
            <span className="gold-word">Business Advisor</span> in the family business.
            In love with tech, and since January 2026 I stopped using <span className="gold-word">AI</span> as
            a standard user and started producing with it. Almost everything I have done has been in my{' '}
            free time, as a <span className="gold-word">hobby</span>.
          </p>
          <div className="about-buttons">
            <a className="btn btn-linkedin reveal-soft" style={{ '--d': '260ms' }} href="https://www.linkedin.com/in/mesonero/" target="_blank" rel="noopener noreferrer">
              <Icon name="linkedin" size={15} /> LinkedIn
            </a>
            <a className="btn btn-telegram reveal-soft" style={{ '--d': '320ms' }} href="https://t.me/+ImA4ksuUUbMzMzFk" target="_blank" rel="noopener noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21.2 4.4L2.4 10.8c-.6.2-.6.6 0 .8l4.6 1.4 1.8 5.6c.2.4.6.4.8.2l2.6-2.2 4.8 3.6c.4.2.8 0 1-.4L21.8 5.2c.2-.6-.2-1-.6-.8z"/></svg>
              {' '}Telegram
            </a>
          </div>
          <form className="about-subscribe reveal-soft" style={{ '--d': '380ms' }} onSubmit={onSubmit}>
            <input type="email" pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}" placeholder="Weekly AI briefing · your@email.com" required disabled={sent} title="Enter a valid email" />
            <button type="submit">{sent ? '✓' : 'Subscribe'}</button>
          </form>
        </div>
        <div className="about-photos">
          <img src="assets/manuel-1.png" alt="" loading="lazy" decoding="async" className="about-photo reveal-soft" style={{ '--d': '180ms' }} />
          <img src="assets/manuel-2.png" alt="" loading="lazy" decoding="async" className="about-photo reveal-soft" style={{ '--d': '260ms' }} />
        </div>
      </div>
    </section>
  );
}

/* ---------- subscribe ---------- */
function Subscribe() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section className="subscribe container">
      <div className="sub-panel">
        <div className="sub-label">Stay up to date</div>
        <p className="sub-copy">Get the briefing in your inbox, once a week.</p>
        <form className="sub-form" onSubmit={onSubmit}>
          <input type="email" placeholder="your@email.com" required disabled={sent} />
          <button type="submit">{sent ? '✓ Subscribed' : 'Subscribe'}</button>
        </form>
        <div className="sub-divider">or</div>
        <a className="sub-tg" href="https://t.me/+ImA4ksuUUbMzMzFk" target="_blank" rel="noopener noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 4.4L2.4 10.8c-.6.2-.6.6 0 .8l4.6 1.4 1.8 5.6c.2.4.6.4.8.2l2.6-2.2 4.8 3.6c.4.2.8 0 1-.4L21.8 5.2c.2-.6-.2-1-.6-.8z"/><path d="M9 13.6l8.4-6.4"/></svg>
          Join the Telegram channel
        </a>
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
          {(() => {
            const order = ["AI Projects", "Projects"];
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
        <About />
      </main>
      <footer className="foot container">
        <img src="assets/logo.png" alt="" className="foot-mark" />
        <span>&copy; 2026 &middot; Manuel Mesonero &middot; <a href="ai-news/">AI News</a> &middot; <a className="foot-li" href="https://www.linkedin.com/in/mesonero/" target="_blank" rel="noopener noreferrer">LinkedIn</a> &middot; <a className="foot-tg" href="https://t.me/+ImA4ksuUUbMzMzFk" target="_blank" rel="noopener noreferrer">Telegram</a></span>
        <span>Madrid &middot; Vibe coded</span>
      </footer>
      {open && <Modal project={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
