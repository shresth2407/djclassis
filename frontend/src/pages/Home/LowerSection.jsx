import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   DJ CLASSIS & KESHARI GENERATOR — LOWER SECTION (Tailwind CSS)
   Palette (taken from the reference screenshots):
   pink    #ff4f8b   orange  #ff8a3d   yellow  #fbbf24
   coral   #ee5a3b   red     #e11d2e   teal    #2dd4bf
   black   #0d0d0d   card    #151515   green   #00b67a
   Fonts: Poppins (body/headings) + Caveat (script eyebrows)
   Sections: About → Marquee → Genres → Premium Services →
   How It Works → Common Types → Industry + Partners →
   Events → Book CTA → Contact
══════════════════════════════════════════════════════════════ */

/* ───────────── global CSS: fonts + keyframes ───────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Poppins:wght@400;500;600;700;800;900&display=swap');

    .dj-root { font-family: 'Poppins', sans-serif; }
    .font-script { font-family: 'Caveat', cursive; }

    @keyframes mqRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
    @keyframes mqLeft  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
    @keyframes spinSlow { to { transform: rotate(360deg); } }
    @keyframes spinRev  { to { transform: rotate(-360deg); } }
    @keyframes floaty   { 0%,100% { transform: translateY(0) rotate(var(--r,0deg)); } 50% { transform: translateY(-14px) rotate(var(--r,0deg)); } }
    @keyframes eq       { from { transform: scaleY(.25); } to { transform: scaleY(1); } }
    @keyframes ping2    { 0% { transform: scale(1); opacity:.7; } 100% { transform: scale(2.2); opacity:0; } }
    @keyframes shine    { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
    @keyframes glowPulse{ 0%,100% { box-shadow: 0 0 0 0 rgba(255,79,139,.5); } 50% { box-shadow: 0 0 0 14px rgba(255,79,139,0); } }
    @keyframes drawLine { from { stroke-dashoffset: 400; } to { stroke-dashoffset: 0; } }
    @keyframes blink    { 0%,100% { opacity:1; } 50% { opacity:.25; } }

    .mq-wrap:hover .mq-track { animation-play-state: paused !important; }
    .grad-text { background: linear-gradient(90deg,#ff4f8b,#ff8a3d,#fbbf24,#ff4f8b); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shine 4s linear infinite; }
    .outline-text { -webkit-text-stroke: 1.5px rgba(255,255,255,.14); color: transparent; }

    @media (prefers-reduced-motion: reduce) {
      .dj-root *, .dj-root *::before, .dj-root *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
    }
  `}</style>
);

/* ───────────── hooks ───────────── */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, shown];
};

const useCount = (target, active, duration = 1600) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf, start;
    const tick = (t) => {
      start = start ?? t;
      const p = Math.min((t - start) / duration, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return n;
};

/* ───────────── small building blocks ───────────── */
const Reveal = ({ children, dir = "up", delay = 0, className = "" }) => {
  const [ref, shown] = useInView();
  const from = { up: "translate-y-12", left: "-translate-x-16", right: "translate-x-16", zoom: "scale-90" }[dir];
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-out ${shown ? "opacity-100 translate-x-0 translate-y-0 scale-100" : `opacity-0 ${from}`} ${className}`}
    >
      {children}
    </div>
  );
};

/* Marquee: dir="right" moves left → right (water flow), dir="left" moves right → left */
const Marquee = ({ children, dir = "right", speed = 30, className = "" }) => (
  <div className={`mq-wrap overflow-hidden ${className}`}>
    <div
      className="mq-track flex w-max"
      style={{ animation: `${dir === "right" ? "mqRight" : "mqLeft"} ${speed}s linear infinite` }}
    >
      <div className="flex shrink-0 items-center">{children}</div>
      <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
    </div>
  </div>
);

const Eyebrow = ({ children, className = "" }) => (
  <span className={`font-script text-[26px] leading-none bg-gradient-to-r from-[#ff4f8b] to-[#ff8a3d] bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

const Title = ({ pre, hl, post, className = "" }) => (
  <h2 className={`mt-2 text-[clamp(28px,4.2vw,46px)] font-bold leading-[1.15] text-white ${className}`}>
    {pre}{" "}
    <span className="underline decoration-[#fbbf24] decoration-[5px] underline-offset-[8px]">{hl}</span>
    {post ? ` ${post}` : ""}
  </h2>
);

const PillBtn = ({ children, href = "#contact", className = "" }) => (
  <a
    href={href}
    className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#ff4f8b] to-[#ff8a3d] px-9 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(255,79,139,.7)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-8px_rgba(255,138,61,.8)] ${className}`}
    style={{ animation: "glowPulse 2.4s infinite" }}
  >
    <span className="absolute inset-0 -translate-x-full bg-white/25 skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-full" />
    <span className="relative">{children}</span>
  </a>
);

const OutlineBtn = ({ children, href = "#" }) => (
  <a href={href} className="inline-block rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-[#ff4f8b] hover:bg-[#ff4f8b] hover:text-white">
    {children}
  </a>
);

/* tiny stroke-icon set */
const ICONS = {
  mic: "M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0M12 17v4M8 21h8",
  rings: "M9 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm6 0a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
  disc: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  speaker: "M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm5 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  fire: "M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 2-2 3-3 3 0-3-1-6-4-8 0 4-4 6-4 12 0 4 3 7 7 7Z",
  crown: "M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8Z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.3-4.3",
  card: "M3 6h18v12H3V6Zm0 4h18M7 15h4",
  party: "M4 20l5-14 9 9-14 5Zm9-13 1-3m3 6 3-1m-4-5 2-2",
  music: "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  arrowUp: "M12 19V5m-7 7 7-7 7 7",
  star: "M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9l3-7Z",
};
const Icon = ({ name, className = "h-6 w-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={ICONS[name]} />
  </svg>
);

const Vinyl = ({ className = "", style }) => (
  <svg viewBox="0 0 120 120" className={className} style={style}>
    <circle cx="60" cy="60" r="58" fill="#0b0b0b" stroke="#2a2a2a" />
    {[48, 40, 32, 24].map((r) => <circle key={r} cx="60" cy="60" r={r} fill="none" stroke="#242424" />)}
    <circle cx="60" cy="60" r="16" fill="url(#vg)" />
    <circle cx="60" cy="60" r="3" fill="#0d0d0d" />
    <defs>
      <linearGradient id="vg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff4f8b" /><stop offset="1" stopColor="#fbbf24" /></linearGradient>
    </defs>
  </svg>
);

const Equalizer = ({ bars = 12, h = 40, color = "bg-[#ff4f8b]" }) => (
  <div className="flex items-end gap-[3px]" style={{ height: h }}>
    {Array.from({ length: bars }).map((_, i) => (
      <span key={i} className={`block w-[4px] origin-bottom rounded-full ${color}`}
        style={{ height: `${40 + ((i * 37) % 60)}%`, animation: `eq ${0.5 + (i % 5) * 0.12}s ease-in-out ${i * 0.07}s infinite alternate` }} />
    ))}
  </div>
);

/* ═══════════════════ 0. FLOATING UI (scroll progress, back-to-top, RTL) ═══════════════════ */
const FloatingUI = () => {
  const [p, setP] = useState(0);
  const [rtl, setRtl] = useState(false);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.documentElement.dir = rtl ? "rtl" : "ltr"; }, [rtl]);
  const C = 2 * Math.PI * 22;
  return (
    <>
      {/* top progress bar */}
      <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
        <div className="h-full bg-gradient-to-r from-[#ff4f8b] via-[#ff8a3d] to-[#fbbf24]" style={{ width: `${p * 100}%` }} />
      </div>

      {/* RTL toggle */}
      <button onClick={() => setRtl((v) => !v)}
        className="fixed right-0 top-1/2 z-50 -translate-y-1/2 rounded-l-md bg-[#e11d2e] px-4 py-3 text-[13px] font-medium text-white transition hover:bg-[#ff4f8b]">
        {rtl ? "Click To LTR" : "Click To RTL"}
      </button>

      {/* back to top with progress ring */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
        className={`fixed bottom-8 right-8 z-50 grid h-[52px] w-[52px] place-items-center rounded-full bg-[#0d0d0d] text-[#ff4f8b] transition-all duration-500 hover:-translate-y-1 ${p > 0.04 ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="2" />
          <circle cx="26" cy="26" r="22" fill="none" stroke="#ff4f8b" strokeWidth="2" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - p)} />
        </svg>
        <Icon name="arrowUp" className="relative h-5 w-5" />
      </button>
    </>
  );
};

/* ═══════════════════ 1. ABOUT ═══════════════════ */
const Stat = ({ target, suffix, label, active }) => {
  const n = useCount(target, active);
  return (
    <div className="text-center">
      <p className="text-4xl font-extrabold text-white">{n}<span className="text-[#fbbf24]">{suffix}</span></p>
      <p className="mt-1 text-xs text-white/50">{label}</p>
    </div>
  );
};

const About = () => {
  const [ref, visible] = useInView(0.2);
  const genres = [
    ["Bollywood", 95, "#ff4f8b"],
    ["EDM / House", 88, "#ff8a3d"],
    ["Bhojpuri", 92, "#fbbf24"],
    ["Hip-Hop", 80, "#2dd4bf"],
  ];
  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-[#0d0d0d] py-28">
      {/* floating red squares (like the hero accents) */}
      <span className="absolute left-[6%] top-24 h-4 w-4 bg-[#e11d2e]" style={{ animation: "floaty 5s ease-in-out infinite" }} />
      <span className="absolute bottom-20 right-[8%] h-3 w-3 bg-[#e11d2e]" style={{ animation: "floaty 4s ease-in-out 1s infinite" }} />
      <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#ff4f8b]/10 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#fbbf24]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1300px] px-6">
        <Reveal className="mb-16">
          <Eyebrow>Who We Are</Eyebrow>
          <Title pre="The Sound Behind" hl="Every Party" />
        </Reveal>

        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal dir="left">
            <p className="mb-5 text-base leading-[1.9] text-white/70">
              DJ Classis &amp; Keshari Generator brings raw energy and precision mixing to every stage. With over a decade of experience across weddings, corporate events, and club nights — we deliver a sound that hits deep.
            </p>
            <p className="mb-9 text-[15px] leading-[1.8] text-white/45">
              From Bhojpuri bangers to Bollywood anthems and international EDM — we read the crowd and keep the floor moving all night long.
            </p>

            <div className="mb-10 flex flex-wrap gap-3">
              {["Weddings", "Club Nights", "Corporate", "Private Events", "Open Air", "VIP Parties"].map((t, i) => (
                <span key={t}
                  className="cursor-default rounded-full border border-[#ff4f8b]/30 bg-[#ff4f8b]/10 px-4 py-2 text-xs font-semibold tracking-wide text-[#ff8fb3] transition-all duration-300 hover:-translate-y-1 hover:border-[#fbbf24] hover:bg-[#fbbf24] hover:text-black"
                  style={{ transitionDelay: `${i * 20}ms` }}>
                  {t}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-[#151515] p-6">
              <Stat target={10} suffix="+" label="Years Experience" active={visible} />
              <Stat target={850} suffix="+" label="Events Played" active={visible} />
              <Stat target={4} suffix="" label="Genres Mastered" active={visible} />
            </div>
          </Reveal>

          <Reveal dir="right">
            <div className="relative rounded-2xl border border-white/10 bg-[#151515] p-8">
              <div className="absolute -right-3 -top-3 h-6 w-6 bg-[#e11d2e]" />
              <div className="mb-8 flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-white">Genre Expertise</p>
                <Equalizer bars={8} h={24} color="bg-[#fbbf24]" />
              </div>
              {genres.map(([name, pct, clr], i) => (
                <div key={name} className="mb-6 last:mb-0">
                  <div className="mb-2 flex justify-between">
                    <span className="text-[13px] font-semibold text-white/80">{name}</span>
                    <span className="text-xs font-bold" style={{ color: clr }}>{pct}%</span>
                  </div>
                  <div className="h-[6px] overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full"
                      style={{
                        width: visible ? `${pct}%` : "0%",
                        background: `linear-gradient(90deg, ${clr}88, ${clr})`,
                        boxShadow: `0 0 12px ${clr}88`,
                        transition: `width 1.4s cubic-bezier(.4,0,.2,1) ${i * 0.18}s`,
                      }} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════ 2. TILTED MARQUEE BAND ═══════════════════ */
const WORDS = ["Hire Your DJ", "Wedding", "Club Night", "Bhojpuri Beats", "Bollywood", "EDM", "Hip-Hop", "Private Party"];
const MarqueeBand = () => (
  <div className="relative overflow-hidden bg-[#0d0d0d] py-14">
    <div className="-rotate-2 scale-105 bg-gradient-to-r from-[#ff4f8b] via-[#ff8a3d] to-[#fbbf24] py-4 shadow-[0_0_60px_rgba(255,79,139,.35)]">
      <Marquee dir="right" speed={28}>
        {WORDS.map((w) => (
          <span key={w} className="flex items-center gap-8 pr-8 text-2xl font-extrabold uppercase tracking-wide text-black">
            {w}<Icon name="star" className="h-5 w-5" />
          </span>
        ))}
      </Marquee>
    </div>
    <div className="mt-[-18px] rotate-1 scale-105 bg-[#151515] py-3">
      <Marquee dir="left" speed={36}>
        {WORDS.map((w) => (
          <span key={w} className="flex items-center gap-8 pr-8 text-lg font-semibold uppercase tracking-widest text-white/60">
            {w}<span className="h-2 w-2 rounded-full bg-[#2dd4bf]" />
          </span>
        ))}
      </Marquee>
    </div>
  </div>
);

/* ═══════════════════ 3. TRENDING GENRES ═══════════════════ */
/* Put image URLs in `img` (e.g. "/images/wedding.jpg") to show real photos. Gradients are the fallback. */
const trending = [
  { n: "01", t: "Wedding DJ", s: "Sangeet · Baraat · Reception", g: "from-[#7a1fa2] via-[#ff4f8b] to-[#ff8a3d]", img: "" },
  { n: "02", t: "Bollywood Night", s: "Chartbusters & retro", g: "from-[#3a0a1f] via-[#e11d2e] to-[#ff4f8b]", img: "" },
  { n: "03", t: "Club & EDM", s: "House · Techno · Big room", g: "from-[#0b1b4a] via-[#6a1fd0] to-[#ff4f8b]", img: "" },
  { n: "04", t: "Bhojpuri Special", s: "Superhit dance floor", g: "from-[#6b2a00] via-[#ff8a3d] to-[#fbbf24]", img: "" },
  { n: "05", t: "Hip-Hop Session", s: "Trap · Drill · Desi hip-hop", g: "from-[#06322f] via-[#12908a] to-[#2dd4bf]", img: "" },
  { n: "06", t: "Corporate Event", s: "Launches & annual days", g: "from-[#2a2a2a] via-[#8a3a1f] to-[#ee5a3b]", img: "" },
];

const GenreCard = ({ n, t, s, g, img, i }) => (
  <Reveal dir="up" delay={(i % 3) * 120}>
    <div className="group relative h-[440px] cursor-pointer overflow-hidden rounded-2xl">
      <div className={`absolute inset-0 bg-gradient-to-br ${g} transition-transform duration-700 group-hover:scale-110`}
        style={img ? { backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" } : {}} />
      {!img && (
        <>
          <Vinyl className="absolute -right-10 top-16 h-60 w-60 opacity-90 transition-transform duration-[1500ms] group-hover:rotate-[200deg]" />
          <div className="absolute bottom-40 left-6"><Equalizer bars={10} h={46} color="bg-white/80" /></div>
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <span className="absolute left-5 top-5 grid h-14 w-14 place-items-center rounded-full bg-white text-lg font-semibold text-[#ff4f8b] transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-[#fbbf24] group-hover:text-black">{n}</span>
      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 transition-transform duration-500 group-hover:translate-y-0">
        <h3 className="text-2xl font-bold text-white">{t}</h3>
        <p className="mt-1 text-sm text-white/70">{s}</p>
        <span className="mt-4 block h-[3px] w-0 bg-gradient-to-r from-[#ff4f8b] to-[#fbbf24] transition-all duration-500 group-hover:w-24" />
      </div>
    </div>
  </Reveal>
);

const Genres = () => (
  <section id="genres" className="relative bg-[#0d0d0d] bg-[radial-gradient(circle_at_0%_100%,rgba(238,90,59,.22),transparent_45%)] py-28">
    <div className="mx-auto max-w-[1300px] px-6">
      <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Trending Genres</Eyebrow>
          <Title pre="Most Trending" hl="Genres" className="!mt-3" />
        </div>
        <OutlineBtn href="#mixes">View All Genres</OutlineBtn>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {trending.map((c, i) => <GenreCard key={c.n} {...c} i={i} />)}
      </div>
    </div>
  </section>
);

/* ═══════════════════ 4. PREMIUM SERVICES ═══════════════════ */
const services = [
  { icon: "mic", title: "Live DJ Sets", desc: "High-energy live performances with seamless transitions and precision crowd reading.", c: "#ff4f8b" },
  { icon: "rings", title: "Wedding DJ", desc: "Elegant sound for your special day — from ceremony to reception, we set the perfect tone.", c: "#ff8a3d" },
  { icon: "disc", title: "Studio Mixes", desc: "Custom mixtapes and DJ sets crafted to your vibe, mood, and occasion.", c: "#fbbf24" },
  { icon: "speaker", title: "Sound Setup", desc: "Professional-grade sound system rental and full setup for events of any scale.", c: "#2dd4bf" },
  { icon: "fire", title: "Bhojpuri Night", desc: "Specialty nights with the hottest Bhojpuri tracks — a crowd favourite every time.", c: "#ee5a3b" },
  { icon: "crown", title: "Club Residency", desc: "Regular club nights that build loyal crowds and legendary energy on the floor.", c: "#e11d2e" },
];

const Services = () => (
  <section id="mixes" className="relative overflow-hidden bg-[#0a0a0a] py-28">
    {/* huge outline word in the background */}
    <p className="outline-text pointer-events-none absolute -top-6 left-0 whitespace-nowrap text-[220px] font-black leading-none opacity-70" style={{ animation: "mqLeft 60s linear infinite" }}>
      PREMIUM SERVICES PREMIUM SERVICES
    </p>

    <div className="relative mx-auto max-w-[1300px] px-6">
      <Reveal className="mb-16 text-center">
        <Eyebrow>What We Offer</Eyebrow>
        <Title pre="Premium" hl="Services" />
        <p className="mx-auto mt-4 max-w-lg text-[15px] text-white/50">Everything you need for an unforgettable night — sound, lights, music and a DJ who knows the crowd.</p>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon, title, desc, c }, i) => (
          <Reveal key={title} dir="up" delay={i * 90}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#151515] p-8 transition-all duration-500 hover:-translate-y-3 hover:border-transparent"
              style={{ "--c": c }}>
              {/* animated corner fill on hover */}
              <span className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-all duration-700 group-hover:scale-[3] group-hover:opacity-[.12]" style={{ background: c }} />
              <span className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-700 group-hover:w-full" style={{ background: `linear-gradient(90deg, ${c}, #fbbf24)` }} />

              <div className="relative mb-6 grid h-[72px] w-[72px] place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-[360deg]"
                style={{ color: c }}>
                <span className="absolute inset-0 rounded-full border" style={{ borderColor: c, animation: "ping2 2.6s ease-out infinite", animationDelay: `${i * 0.3}s` }} />
                <Icon name={icon} className="h-8 w-8" />
              </div>
              <span className="absolute right-6 top-6 text-5xl font-black text-white/[.05] transition-colors duration-500 group-hover:text-white/[.12]">0{i + 1}</span>
              <h3 className="relative mb-3 text-xl font-bold text-white">{title}</h3>
              <p className="relative text-sm leading-[1.8] text-white/55">{desc}</p>
              <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-4" style={{ color: c }}>
                Book this <span>→</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════ 5. HOW IT WORKS ═══════════════════ */
const steps = [
  { icon: "search", t: "Browse And Compare.", d: "Compare rates and availability of DJs, sound and light packages for your date." },
  { icon: "card", t: "Book Securely.", d: "Confirm with a small advance — your date is locked and your booking is protected." },
  { icon: "party", t: "Enjoy Your Event.", d: "Sit back, relax, and watch your party come to life." },
];

const HowItWorks = () => (
  <section id="how" className="relative overflow-hidden bg-[#0d0d0d] bg-[radial-gradient(circle_at_85%_20%,rgba(255,79,139,.12),transparent_40%)] py-28">
    <svg className="pointer-events-none absolute left-10 top-0 h-full w-[300px] opacity-40" viewBox="0 0 200 800" fill="none">
      <path d="M100 0C20 120 180 240 90 360S40 600 110 800" stroke="#ff4f8b" strokeWidth="1" strokeDasharray="400" style={{ animation: "drawLine 5s ease-in-out infinite alternate" }} />
    </svg>

    <div className="relative mx-auto grid max-w-[1300px] items-center gap-16 px-6 lg:grid-cols-2">
      {/* collage */}
      <Reveal dir="left">
        <div className="relative grid grid-cols-[1.1fr_1fr] gap-4">
          <div className="relative row-span-2 h-[460px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#6a1fd0] via-[#ff4f8b] to-[#ee5a3b]">
            <Vinyl className="absolute -left-10 top-10 h-64 w-64" style={{ animation: "spinSlow 12s linear infinite" }} />
            <div className="absolute inset-x-6 bottom-10"><Equalizer bars={14} h={70} color="bg-white/90" /></div>
          </div>
          <div className="relative h-[220px] overflow-hidden rounded-xl bg-gradient-to-br from-[#fbbf24] to-[#ff4f8b]" style={{ animation: "floaty 6s ease-in-out infinite" }}>
            <Icon name="rings" className="absolute inset-0 m-auto h-24 w-24 text-white/90" />
          </div>
          <div className="relative h-[220px] overflow-hidden rounded-xl bg-gradient-to-br from-[#2dd4bf] to-[#6a1fd0]" style={{ animation: "floaty 7s ease-in-out 1s infinite" }}>
            <Icon name="music" className="absolute inset-0 m-auto h-24 w-24 text-white/90" />
          </div>

          {/* review badge */}
          <div className="absolute -bottom-6 left-[24%] flex items-center gap-4 rounded-lg bg-white px-5 py-4 shadow-2xl" style={{ animation: "floaty 5s ease-in-out infinite" }}>
            <div>
              <p className="text-sm font-semibold text-[#ff4f8b]">Excellent :</p>
              <p className="text-sm font-medium text-black">1050 Reviews On</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-[#0d0d0d] px-4 py-2 text-sm text-white/80">
              <Icon name="star" className="h-4 w-4 fill-[#00b67a] text-[#00b67a]" /> Trustpilot
            </span>
          </div>
        </div>
      </Reveal>

      {/* steps */}
      <Reveal dir="right">
        <Eyebrow>How It Works</Eyebrow>
        <Title pre="Welcome To The Region's Leading Live" hl="DJ Booking Agency" />
        <div className="mt-10 space-y-8">
          {steps.map(({ icon, t, d }, i) => (
            <div key={t} className="group flex items-center gap-6">
              <div className="grid h-[80px] w-[80px] shrink-0 place-items-center rounded-full border border-white/15 text-white transition-all duration-500 group-hover:border-[#ff4f8b] group-hover:bg-[#ff4f8b] group-hover:shadow-[0_0_30px_rgba(255,79,139,.6)]">
                <Icon name={icon} className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{t}</h3>
                <p className="mt-1 max-w-sm text-[15px] leading-relaxed text-white/55">{d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <PillBtn>Get Started</PillBtn>
          <p className="text-[15px] leading-relaxed text-white/45">Book Something<br />Awesome !</p>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ═══════════════════ 6. COMMON TYPES (water-flow carousel, left → right) ═══════════════════ */
const types = [
  { t: "Bollywood", g: "from-[#3a0a1f] via-[#e11d2e] to-[#ff4f8b]" },
  { t: "Bhojpuri", g: "from-[#6b2a00] via-[#ff8a3d] to-[#fbbf24]" },
  { t: "EDM / House", g: "from-[#0b1b4a] via-[#6a1fd0] to-[#ff4f8b]" },
  { t: "Hip-Hop", g: "from-[#06322f] via-[#12908a] to-[#2dd4bf]" },
  { t: "Punjabi", g: "from-[#4a0d2e] via-[#ff4f8b] to-[#fbbf24]" },
  { t: "Retro Classics", g: "from-[#2a2a2a] via-[#8a3a1f] to-[#ee5a3b]" },
  { t: "Sufi Night", g: "from-[#1d0b3b] via-[#7a1fa2] to-[#ff8a3d]" },
];

const CommonTypes = () => (
  <section className="relative overflow-hidden bg-[#0d0d0d] py-28">
    <p className="outline-text pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-[260px] font-black leading-none" style={{ animation: "mqRight 70s linear infinite", width: "max-content" }}>
      DISCO RAVE TRANCE BHANGRA DISCO RAVE TRANCE BHANGRA
    </p>
    <div className="relative mx-auto mb-14 flex max-w-[1300px] flex-wrap items-end justify-between gap-6 px-6">
      <OutlineBtn href="#mixes">View All Genres</OutlineBtn>
      <Reveal className="text-right">
        <Eyebrow>Common Types</Eyebrow>
        <Title pre="Most Common" hl="Types" className="!mt-3" />
      </Reveal>
    </div>

    <Marquee dir="right" speed={45} className="relative">
      {types.map(({ t, g }) => (
        <div key={t} className="group relative mr-5 h-[440px] w-[330px] shrink-0 overflow-hidden rounded-2xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${g} transition-transform duration-700 group-hover:scale-110`} />
          <Vinyl className="absolute -bottom-10 -left-10 h-56 w-56 opacity-80 transition-transform duration-[1500ms] group-hover:rotate-180" />
          <div className="absolute right-6 top-6"><Equalizer bars={7} h={34} color="bg-white/80" /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 p-6">
            <p className="text-2xl font-bold text-white">{t}</p>
            <p className="text-sm text-white/65">DJ Classis · Live Mix</p>
          </div>
        </div>
      ))}
    </Marquee>
  </section>
);

/* ═══════════════════ 7. INDUSTRY CARDS + COAL-CORAL PARTNER STRIP ═══════════════════ */
const industry = [
  { t: "Bollywood", s: "DJ Classis", g: "from-[#e11d2e] to-[#3a0a1f]" },
  { t: "Bhojpuri", s: "DJ Classis", g: "from-[#ff8a3d] to-[#6b2a00]" },
  { t: "EDM", s: "DJ Classis", g: "from-[#6a1fd0] to-[#0b1b4a]" },
  { t: "Hip-Hop", s: "DJ Classis", g: "from-[#12908a] to-[#06322f]" },
  { t: "Retro", s: "DJ Classis", g: "from-[#ff4f8b] to-[#4a0d2e]" },
];

const partners = [
  <span key="a" className="flex items-center gap-3 text-3xl font-semibold tracking-[0.2em] text-[#2b0a03]"><span className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#2b0a03]"><Icon name="disc" className="h-6 w-6" /></span>Pulse</span>,
  <span key="b" className="flex items-center border-[3px] border-[#2b0a03] text-2xl font-bold tracking-[0.25em] text-[#2b0a03]"><span className="bg-[#2b0a03] px-3 py-2 text-[#ee5a3b]">♥</span><span className="px-4 py-2">VINTAGE</span></span>,
  <span key="c" className="text-3xl font-light tracking-[0.15em] text-[#2b0a03]">GRAND<span className="mx-2 font-black">×</span>BANQUET</span>,
  <span key="d" className="border-l-[3px] border-[#2b0a03] pl-4 text-3xl font-light tracking-[0.2em] text-[#2b0a03]">ELEVATE<br /><span className="text-[10px] tracking-[0.5em]">NIGHT CLUB</span></span>,
  <span key="e" className="text-3xl font-black italic tracking-tight text-[#2b0a03]">OpenSky<span className="text-white">.</span></span>,
  <span key="f" className="flex items-center gap-3 text-3xl font-semibold tracking-[0.2em] text-[#2b0a03]"><Icon name="crown" className="h-8 w-8" />SKY LOUNGE</span>,
];

const Industry = () => (
  <>
    <section className="bg-[#030816] bg-[linear-gradient(180deg,#02040f,#050a1c)] py-24">
      <div className="mx-auto max-w-[1300px] px-6">
        <Reveal className="mb-14">
          <Eyebrow>Our Specialties</Eyebrow>
          <h2 className="mt-2 text-[clamp(40px,7vw,84px)] font-black uppercase leading-none text-white">Built For The<br /><span className="text-[#ee5a3b]">Party Industry.</span></h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {industry.map(({ t, s, g }, i) => (
            <Reveal key={t} dir="up" delay={i * 100}>
              <div className="group relative h-[280px] cursor-pointer overflow-hidden rounded-2xl">
                <div className={`absolute inset-0 bg-gradient-to-b ${g} transition-transform duration-700 group-hover:scale-110`} />
                <div className="absolute inset-x-0 top-10 flex justify-center">
                  <div className="grid h-28 w-28 place-items-center rounded-full bg-black/30 transition-transform duration-700 group-hover:rotate-[360deg]"><Vinyl className="h-24 w-24" /></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-6 text-center transition-transform duration-500 group-hover:-translate-y-2">
                  <p className="text-lg font-bold text-white">{t}</p>
                  <p className="text-sm text-white/65">{s}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* coral partner strip */}
    <section className="relative overflow-hidden bg-[#ee5a3b] py-20">
      <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[#ff8a3d]/50 blur-3xl" />
      <p className="relative mb-12 text-center text-sm font-semibold text-[#2b0a03]">
        Trusted Partner: <span className="font-bold text-white">Venues &amp; Event Houses We Play At</span>
      </p>
      <Marquee dir="right" speed={32} className="relative">
        {partners.map((p, i) => <div key={i} className="mx-14 shrink-0">{p}</div>)}
      </Marquee>
    </section>
  </>
);

/* ═══════════════════ 8. EVENTS ═══════════════════ */
const events = [
  { date: "OCT 24", day: "Saturday", venue: "Pulse Club", city: "Kanpur, UP", type: "Club Night", hot: true },
  { date: "NOV 08", day: "Sunday", venue: "Grand Banquet Hall", city: "Lucknow, UP", type: "Wedding", hot: false },
  { date: "NOV 22", day: "Sunday", venue: "Open Sky Arena", city: "Prayagraj, UP", type: "Festival", hot: true },
  { date: "DEC 06", day: "Sunday", venue: "Sky Lounge Rooftop", city: "Varanasi, UP", type: "Private", hot: false },
  { date: "DEC 25", day: "Friday", venue: "Club Elevate", city: "Agra, UP", type: "Club Night", hot: false },
];

const Events = () => (
  <section id="events" className="relative bg-[#0d0d0d] py-28">
    <div className="mx-auto max-w-[1100px] px-6">
      <Reveal className="mb-14 text-center">
        <Eyebrow>Live Calendar</Eyebrow>
        <Title pre="Upcoming" hl="Events" />
      </Reveal>

      <div className="flex flex-col gap-4">
        {events.map(({ date, day, venue, city, type, hot }, i) => (
          <Reveal key={date} dir={i % 2 ? "right" : "left"} delay={i * 80}>
            <div className={`group relative flex flex-wrap items-center gap-6 overflow-hidden rounded-2xl border px-7 py-5 transition-all duration-500 hover:translate-x-2 hover:border-[#ff4f8b] ${hot ? "border-[#ff8a3d]/40 bg-[#ff8a3d]/[.06]" : "border-white/10 bg-[#151515]"}`}>
              <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#ff4f8b] to-[#fbbf24] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="min-w-[84px] text-center">
                <p className="text-2xl font-black text-[#fbbf24]">{date}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/40">{day}</p>
              </div>
              <span className="hidden h-10 w-px bg-white/10 sm:block" />
              <div className="min-w-[160px] flex-1">
                <p className="text-lg font-bold text-white">{venue}</p>
                <p className="text-sm text-white/50">{city}</p>
              </div>
              <span className="rounded-full border border-[#ff4f8b]/40 bg-[#ff4f8b]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#ff8fb3]">{type}</span>
              {hot && <span className="rounded-full bg-[#e11d2e] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white" style={{ animation: "blink 1.4s infinite" }}>Hot</span>}
              <span className="text-2xl text-white/30 transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#ff4f8b]">›</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════ 9. BOOK CTA (orbit + tilted devices) ═══════════════════ */
const Device = ({ className = "", style = {}, children }) => (
  <div className={`absolute overflow-hidden rounded-[22px] border-[6px] border-[#2a2a2a] bg-[#0b0b0b] shadow-[0_30px_60px_rgba(0,0,0,.7)] ${className}`} style={style}>{children}</div>
);

const CtaBanner = () => (
  <section className="relative overflow-hidden bg-[#0d0d0d] py-28">
    <div className="mx-auto grid max-w-[1300px] items-center gap-10 px-6 lg:grid-cols-2">
      {/* orbit visual */}
      <Reveal dir="left">
        <div className="relative mx-auto h-[460px] w-full max-w-[560px]">
          <div className="absolute inset-4 rounded-full border border-[#ff4f8b]/50" style={{ animation: "spinSlow 24s linear infinite" }}>
            <span className="absolute -left-[6px] top-1/2 h-3 w-3 rounded-full bg-[#ff4f8b]" />
          </div>
          <div className="absolute inset-12 rounded-full border border-[#fbbf24]/50" style={{ animation: "spinRev 30s linear infinite" }}>
            <span className="absolute -right-[6px] top-1/3 h-3 w-3 rounded-full bg-[#fbbf24]" />
            <span className="absolute bottom-6 right-10 h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
          </div>
          <div className="absolute inset-24 rounded-full border border-white/10" style={{ animation: "spinSlow 40s linear infinite" }}>
            <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 rounded-full bg-[#2dd4bf]" />
          </div>

          <Device className="left-[4%] top-[48%] h-[190px] w-[270px] -rotate-[14deg]" style={{ "--r": "-14deg", animation: "floaty 6s ease-in-out infinite" }}>
            <div className="h-full w-full bg-gradient-to-br from-[#0b1b4a] via-[#6a1fd0] to-[#ff4f8b] p-4">
              <p className="text-sm font-bold text-white">Hire A Live DJ <span className="text-[#fbbf24]">For</span> Your Wedding Or Party</p>
              <div className="mt-6"><Equalizer bars={18} h={50} color="bg-white/80" /></div>
            </div>
          </Device>
          <Device className="right-[2%] top-[8%] h-[240px] w-[330px] -rotate-[8deg]" style={{ "--r": "-8deg", animation: "floaty 7s ease-in-out 1s infinite" }}>
            <div className="relative h-full w-full bg-gradient-to-br from-[#ee5a3b] via-[#ff4f8b] to-[#6a1fd0] p-5">
              <p className="font-script text-5xl text-white">DJ Classis</p>
              <Vinyl className="absolute -bottom-6 -right-6 h-40 w-40" />
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.25em] text-white/90">Your Party · Your Wedding · Your Event</p>
            </div>
          </Device>
        </div>
      </Reveal>

      <Reveal dir="right" className="lg:text-right">
        <Eyebrow>Book DJ Classis</Eyebrow>
        <Title pre="The Best Way To" hl="Book Your Night's DJ" />
        <p className="mt-6 text-[15px] leading-[1.9] text-white/55 lg:ml-auto lg:max-w-lg">
          Our carefully curated selection of services will ensure you have a wonderful experience in every aspect. We provide assistance and support 24 hours a day, 7 days a week, until the last song plays.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 lg:justify-end">
          <PillBtn href="#contact">Get a Free Quote</PillBtn>
          <a href="tel:+910000000000" className="rounded-full border border-white/20 px-8 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:border-[#fbbf24] hover:text-[#fbbf24]">Call Now</a>
        </div>
        <div className="mt-10 flex lg:justify-end"><Equalizer bars={20} h={44} color="bg-gradient-to-t from-[#ff4f8b] to-[#fbbf24]" /></div>
      </Reveal>
    </div>
  </section>
);

/* ═══════════════════ 10. CONTACT ═══════════════════ */
const fieldCls =
  "w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-5 py-4 text-sm text-white placeholder-white/35 outline-none transition-all duration-300 focus:border-[#ff4f8b] focus:shadow-[0_0_0_4px_rgba(255,79,139,.15)]";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); e.target.reset(); };
  return (
    <section id="contact" className="relative overflow-hidden bg-[#0a0a0a] bg-[radial-gradient(circle_at_50%_0%,rgba(238,90,59,.18),transparent_55%)] py-28">
      <div className="mx-auto max-w-[760px] px-6">
        <Reveal className="mb-12 text-center">
          <Eyebrow>Get in Touch</Eyebrow>
          <Title pre="Book" hl="DJ Classis" />
          <p className="mx-auto mt-4 max-w-md text-[15px] text-white/50">Fill the form and we will get back within 24 hours with pricing and availability.</p>
        </Reveal>

        <Reveal dir="zoom">
          <form onSubmit={submit} className="relative rounded-3xl border border-white/10 bg-[#151515] p-8 sm:p-11">
            <span className="absolute -left-3 -top-3 h-6 w-6 bg-[#e11d2e]" />
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <input className={fieldCls} type="text" placeholder="Your Name" required />
              <input className={fieldCls} type="tel" placeholder="Phone Number" required />
            </div>
            <input className={`${fieldCls} mb-4`} type="text" placeholder="Event Type (Wedding / Club / Corporate)" />
            <input className={`${fieldCls} mb-4`} type="text" placeholder="Event Date & Venue" />
            <textarea rows={4} className={`${fieldCls} mb-6 resize-none`} placeholder="Tell us more about your event — expected crowd size, vibe, special requests..." />
            <button type="submit" className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#ff4f8b] via-[#ff8a3d] to-[#fbbf24] py-4 text-[15px] font-bold text-white shadow-[0_12px_30px_-8px_rgba(255,79,139,.7)] transition-all duration-300 hover:-translate-y-1">
              <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">{sent ? "Request Sent ✓ — We'll call you soon" : "Send Booking Request →"}</span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

/* ═══════════════════ EXPORT ═══════════════════ */
const LowerSection = () => (
  <div className="dj-root overflow-x-hidden bg-[#0d0d0d] text-white">
    <GlobalStyles />
    <FloatingUI />
    <About />
    <MarqueeBand />
    <Genres />
    <Services />
    <HowItWorks />
    <CommonTypes />
    <Industry />
    <Events />
    <CtaBanner />
    <Contact />
  </div>
);

export default LowerSection;