import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   DJ CLASSIS & KESHARI GENERATOR — SERVICES PAGE (Tailwind CSS)
   Same theme as LowerSection / AboutPage:
   pink #ff4f8b · orange #ff8a3d · yellow #fbbf24 · coral #ee5a3b
   red #e11d2e · teal #2dd4bf · black #0d0d0d · card #151515
   Optional card photos: put a path in a service's `img` (e.g. "/a.png").
══════════════════════════════════════════════════════════════ */

const PHONES = [
  { show: "84235 94775", tel: "+918423594775", wa: "918423594775" },
  { show: "92192 58306", tel: "+919219258306", wa: "919219258306" },
];

/* ───────────── styles ───────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Poppins:wght@400;500;600;700;800;900&display=swap');
    .dj-root { font-family: 'Poppins', sans-serif; }
    .font-script { font-family: 'Caveat', cursive; }
    @keyframes mqRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
    @keyframes mqLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes spinSlow { to { transform: rotate(360deg); } }
    @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
    @keyframes eq { from { transform: scaleY(.25); } to { transform: scaleY(1); } }
    @keyframes ping2 { 0% { transform: scale(1); opacity:.7; } 100% { transform: scale(2.2); opacity:0; } }
    @keyframes glowPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,79,139,.5); } 50% { box-shadow: 0 0 0 14px rgba(255,79,139,0); } }
    @keyframes cardIn { from { opacity:0; transform: translateY(36px) scale(.96); } to { opacity:1; transform: none; } }
    .mq-wrap:hover .mq-track { animation-play-state: paused !important; }
    .outline-text { -webkit-text-stroke: 1.5px rgba(255,255,255,.14); color: transparent; }
    @media (prefers-reduced-motion: reduce) {
      .dj-root *, .dj-root *::before, .dj-root *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
    }
  `}</style>
);

/* ───────────── helpers ───────────── */
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

const Reveal = ({ children, dir = "up", delay = 0, className = "" }) => {
  const [ref, shown] = useInView();
  const from = { up: "translate-y-12", left: "-translate-x-16", right: "translate-x-16", zoom: "scale-90" }[dir];
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-out ${shown ? "opacity-100 translate-x-0 translate-y-0 scale-100" : `opacity-0 ${from}`} ${className}`}>
      {children}
    </div>
  );
};

const Marquee = ({ children, dir = "right", speed = 28, className = "" }) => (
  <div className={`mq-wrap overflow-hidden ${className}`}>
    <div className="mq-track flex w-max" style={{ animation: `${dir === "right" ? "mqRight" : "mqLeft"} ${speed}s linear infinite` }}>
      <div className="flex shrink-0 items-center">{children}</div>
      <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
    </div>
  </div>
);

const Eyebrow = ({ children }) => (
  <span className="font-script bg-gradient-to-r from-[#ff4f8b] to-[#ff8a3d] bg-clip-text text-[26px] leading-none text-transparent">{children}</span>
);

const ICONS = {
  home: "M3 11l9-8 9 8v10H3V11Zm6 10v-6h6v6",
  road: "M8 3 4 21M16 3l4 18M12 4v3m0 4v3m0 4v3",
  rings: "M9 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm6 0a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
  mic: "M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0M12 17v4M8 21h8",
  disc: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  speaker: "M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm5 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  fire: "M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 2-2 3-3 3 0-3-1-6-4-8 0 4-4 6-4 12 0 4 3 7 7 7Z",
  crown: "M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8Z",
  party: "M4 20l5-14 9 9-14 5Zm9-13 1-3m3 6 3-1m-4-5 2-2",
  brief: "M3 8h18v12H3V8Zm6 0V5h6v3M3 13h18",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  check: "M5 12l5 5 9-10",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3 2",
  rupee: "M6 4h12M6 9h12M9 4c5 0 6 5 0 5l6 11",
  star: "M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9l3-7Z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
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
    <circle cx="60" cy="60" r="16" fill="url(#vgS)" />
    <circle cx="60" cy="60" r="3" fill="#0d0d0d" />
    <defs><linearGradient id="vgS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff4f8b" /><stop offset="1" stopColor="#fbbf24" /></linearGradient></defs>
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

const PillBtn = ({ children, href, target, className = "" }) => (
  <a href={href} target={target} rel={target ? "noreferrer" : undefined}
    className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#ff4f8b] to-[#ff8a3d] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(255,79,139,.7)] transition-all duration-300 hover:-translate-y-1 ${className}`}
    style={{ animation: "glowPulse 2.4s infinite" }}>
    <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
    <span className="relative inline-flex items-center gap-3">{children}</span>
  </a>
);

/* ───────────── DATA ───────────── */
const TABS = [
  { id: "all", label: "All Services" },
  { id: "dj", label: "DJ Services" },
  { id: "sound", label: "Sound & Stage" },
  { id: "event", label: "Events" },
];

const SERVICES = [
  { cat: "dj", icon: "home", c: "#ff4f8b", t: "Home DJ", d: "Full DJ sound at your doorstep for house parties and family functions.", f: ["Birthday & house party", "Griha pravesh", "Compact setup"], img: "" },
  { cat: "dj", icon: "road", c: "#ff8a3d", t: "Road DJ", d: "Powerful road sound for baraat and processions that keeps everyone dancing.", f: ["Baraat & juloos", "Heavy bass system", "Trained operator"], img: "" },
  { cat: "dj", icon: "rings", c: "#fbbf24", t: "Wedding DJ", d: "Sound for every wedding function, from sangeet to reception.", f: ["Sangeet & reception", "Song list planning", "Clean MC sound"], img: "" },
  { cat: "dj", icon: "mic", c: "#2dd4bf", t: "Live DJ Sets", d: "High-energy live performances with smooth transitions and crowd reading.", f: ["Live mixing", "Crowd reading", "Non-stop sets"], img: "" },
  { cat: "dj", icon: "fire", c: "#ee5a3b", t: "Bhojpuri Night", d: "Special nights with the hottest Bhojpuri tracks, a crowd favourite every time.", f: ["Superhit Bhojpuri", "Bollywood mix", "Dance floor energy"], img: "" },
  { cat: "dj", icon: "crown", c: "#e11d2e", t: "Club Residency", d: "Regular club nights that build loyal crowds and legendary energy.", f: ["Weekly nights", "EDM & house", "Hip-hop sets"], img: "" },
  { cat: "dj", icon: "disc", c: "#ff4f8b", t: "Studio Mixes", d: "Custom mixtapes and DJ sets made for your vibe, mood and occasion.", f: ["Custom mixtape", "Your song picks", "Ready to play"], img: "" },
  { cat: "sound", icon: "mic", c: "#fbbf24", t: "Stage Program", d: "Stage, sound and setup for functions, cultural programs and live shows.", f: ["Stage sound setup", "Mic & monitors", "On-site team"], img: "" },
  { cat: "sound", icon: "speaker", c: "#2dd4bf", t: "Sound Setup", d: "Professional sound system rental and full setup for events of any size.", f: ["Speakers & mixers", "Small to large events", "Setup & pickup"], img: "" },
  { cat: "event", icon: "fire", c: "#ee5a3b", t: "Puja & Jagran", d: "Clear devotional sound for puja, jagran, kirtan and religious events.", f: ["Jagran & kirtan", "Bhajan-ready sound", "Calm, clean volume"], img: "" },
  { cat: "event", icon: "brief", c: "#ff8a3d", t: "Corporate & Private", d: "Sound for office functions, school and college events, and private parties.", f: ["Annual days", "Launches & functions", "Private parties"], img: "" },
  { cat: "event", icon: "party", c: "#ff4f8b", t: "All Types Of Events", d: "Whatever the occasion, we plan the right DJ and sound setup for it.", f: ["Any event, any size", "Custom packages", "Call to discuss"], img: "" },
];

const WORDS = ["Home DJ", "Road DJ", "Wedding DJ", "Stage Program", "Sound Setup", "Puja & Jagran", "All Events"];

/* ═══════════════════ 1. HERO ═══════════════════ */
const Hero = () => (
  <section className="relative overflow-hidden bg-[#0d0d0d] bg-[radial-gradient(circle_at_0%_100%,rgba(238,90,59,.22),transparent_45%)] pb-20 pt-32">
    <span className="absolute left-[6%] top-28 h-4 w-4 bg-[#e11d2e]" style={{ animation: "floaty 5s ease-in-out infinite" }} />
    <span className="absolute bottom-14 right-[10%] h-3 w-3 bg-[#e11d2e]" style={{ animation: "floaty 4s ease-in-out 1s infinite" }} />
    <div className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-[#ff4f8b]/10 blur-[120px]" />
    <Vinyl className="absolute -right-24 top-16 hidden h-[420px] w-[420px] opacity-60 lg:block" style={{ animation: "spinSlow 22s linear infinite" }} />

    <div className="relative mx-auto max-w-[1200px] px-6">
      <Reveal>
        <Eyebrow>Our Services</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-[clamp(34px,5.6vw,64px)] font-black leading-[1.1] text-white">
          Everything For Your{" "}
          <span className="underline decoration-[#fbbf24] decoration-[6px] underline-offset-[10px]">Perfect Event</span>
        </h1>
        <p className="mt-8 max-w-xl text-base leading-[1.9] text-white/65">
          From home DJ and road DJ to stage programs, puja and every kind of event — DJ Classis &amp; Keshari Generator brings the sound, the setup and the energy.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <PillBtn href={`tel:${PHONES[0].tel}`}><Icon name="phone" className="h-5 w-5" />Call Now</PillBtn>
          <a href={`https://wa.me/${PHONES[0].wa}`} target="_blank" rel="noreferrer"
            className="rounded-full border border-white/20 px-8 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:border-[#fbbf24] hover:text-[#fbbf24]">
            WhatsApp Us
          </a>
          <div className="ml-2 hidden sm:block"><Equalizer bars={16} h={44} color="bg-gradient-to-t from-[#ff4f8b] to-[#fbbf24]" /></div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ═══════════════════ 2. BAND ═══════════════════ */
const Band = () => (
  <div className="overflow-hidden bg-[#0d0d0d] py-10">
    <div className="-rotate-1 scale-105 bg-gradient-to-r from-[#ff4f8b] via-[#ff8a3d] to-[#fbbf24] py-4 shadow-[0_0_60px_rgba(255,79,139,.35)]">
      <Marquee dir="right" speed={30}>
        {WORDS.map((w) => (
          <span key={w} className="flex items-center gap-8 pr-8 text-2xl font-extrabold uppercase tracking-wide text-black">
            {w}<Icon name="star" className="h-5 w-5" />
          </span>
        ))}
      </Marquee>
    </div>
  </div>
);

/* ═══════════════════ 3. ALL SERVICES (filterable) ═══════════════════ */
const ServiceCard = ({ s, i }) => {
  const msg = encodeURIComponent(`Hello, I want to book ${s.t}. Please share details.`);
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151515] transition-all duration-500 hover:-translate-y-3 hover:border-transparent"
      style={{ animation: `cardIn .6s ease ${i * 70}ms both` }}>
      {/* top visual */}
      <div className="relative h-40 overflow-hidden" style={{ background: `linear-gradient(135deg, ${s.c}33, #151515 70%)` }}>
        {s.img && (
          <img src={s.img} alt={s.t} loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110" />
        )}
        <Vinyl className="absolute -right-8 -top-8 h-36 w-36 opacity-70 transition-transform duration-[1500ms] group-hover:rotate-[180deg]" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#151515] to-transparent" />
        <span className="absolute left-6 top-5 text-5xl font-black text-white/[.12]">{String(i + 1).padStart(2, "0")}</span>
        <div className="absolute -bottom-7 left-6 grid h-[68px] w-[68px] place-items-center rounded-full border border-white/15 bg-[#151515] transition-all duration-500 group-hover:rotate-[360deg]" style={{ color: s.c }}>
          <span className="absolute inset-0 rounded-full border" style={{ borderColor: s.c, animation: "ping2 2.6s ease-out infinite", animationDelay: `${i * 0.25}s` }} />
          <Icon name={s.icon} className="h-7 w-7" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-12">
        <h3 className="text-xl font-bold text-white">{s.t}</h3>
        <p className="mt-2 text-sm leading-[1.8] text-white/55">{s.d}</p>
        <ul className="mt-5 space-y-2">
          {s.f.map((x) => (
            <li key={x} className="flex items-center gap-2 text-[13px] text-white/75">
              <Icon name="check" className="h-4 w-4 shrink-0" />
              <span>{x}</span>
            </li>
          ))}
        </ul>
        <a href={`https://wa.me/${PHONES[0].wa}?text=${msg}`} target="_blank" rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-4" style={{ color: s.c }}>
          Book this <Icon name="arrow" className="h-4 w-4" />
        </a>
      </div>

      <span className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-700 group-hover:w-full" style={{ background: `linear-gradient(90deg, ${s.c}, #fbbf24)` }} />
    </div>
  );
};

const AllServices = () => {
  const [tab, setTab] = useState("all");
  const list = tab === "all" ? SERVICES : SERVICES.filter((s) => s.cat === tab);
  return (
    <section id="services" className="relative overflow-hidden bg-[#0a0a0a] py-24">
      <p className="outline-text pointer-events-none absolute -top-4 left-0 whitespace-nowrap text-[200px] font-black leading-none opacity-70"
        style={{ animation: "mqRight 60s linear infinite", width: "max-content" }}>
        PREMIUM SERVICES PREMIUM SERVICES PREMIUM SERVICES
      </p>
      <div className="relative mx-auto max-w-[1200px] px-6">
        <Reveal className="mb-12 text-center">
          <Eyebrow>What We Offer</Eyebrow>
          <h2 className="mt-2 text-[clamp(28px,4.2vw,46px)] font-bold text-white">
            Premium{" "}
            <span className="underline decoration-[#fbbf24] decoration-[5px] underline-offset-[8px]">Services</span>
          </h2>
        </Reveal>

        {/* filter tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${tab === t.id
                ? "bg-gradient-to-r from-[#ff4f8b] to-[#ff8a3d] text-white shadow-[0_10px_30px_-8px_rgba(255,79,139,.7)]"
                : "border border-white/15 text-white/65 hover:border-[#ff4f8b] hover:text-white"}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div key={tab} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => <ServiceCard key={s.t} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════ 4. HOW TO BOOK ═══════════════════ */
const STEPS = [
  { icon: "phone", t: "Call Or WhatsApp", d: "Tell us your event, date and place." },
  { icon: "check", t: "Confirm Your Date", d: "We share the setup and price, and lock your date." },
  { icon: "party", t: "Enjoy Your Event", d: "Our team sets up on time. You enjoy the party." },
];

const HowToBook = () => (
  <section className="relative overflow-hidden bg-[#0d0d0d] bg-[radial-gradient(circle_at_85%_20%,rgba(255,79,139,.12),transparent_40%)] py-24">
    <div className="mx-auto max-w-[1200px] px-6">
      <Reveal className="mb-14">
        <Eyebrow>How It Works</Eyebrow>
        <h2 className="mt-2 text-[clamp(28px,4.2vw,44px)] font-bold text-white">
          Book In{" "}
          <span className="underline decoration-[#fbbf24] decoration-[5px] underline-offset-[8px]">3 Easy Steps</span>
        </h2>
      </Reveal>
      <div className="grid gap-10 md:grid-cols-3">
        {STEPS.map(({ icon, t, d }, i) => (
          <Reveal key={t} dir="up" delay={i * 120}>
            <div className="group flex items-center gap-6">
              <div className="grid h-[84px] w-[84px] shrink-0 place-items-center rounded-full border border-white/15 text-white transition-all duration-500 group-hover:border-[#ff4f8b] group-hover:bg-[#ff4f8b] group-hover:shadow-[0_0_30px_rgba(255,79,139,.6)]">
                <Icon name={icon} className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{t}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-white/55">{d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════ 5. WHY US ═══════════════════ */
const WHY = [
  { icon: "speaker", t: "Powerful Sound", d: "Clear, loud and clean — no distortion.", c: "#ff4f8b" },
  { icon: "clock", t: "On-Time Setup", d: "We arrive early and are ready before you are.", c: "#fbbf24" },
  { icon: "rupee", t: "Fair Pricing", d: "Honest packages that fit your budget.", c: "#2dd4bf" },
  { icon: "party", t: "Every Event", d: "Home, road, stage, puja or party.", c: "#ee5a3b" },
];

const Why = () => (
  <section className="bg-[#0a0a0a] py-20">
    <div className="mx-auto grid max-w-[1200px] gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4">
      {WHY.map(({ icon, t, d, c }, i) => (
        <Reveal key={t} dir="zoom" delay={i * 100}>
          <div className="group h-full rounded-2xl border border-white/10 bg-[#151515] p-7 text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#ff4f8b]">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-white/15 transition-transform duration-500 group-hover:rotate-[360deg]" style={{ color: c }}>
              <Icon name={icon} className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-white">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ═══════════════════ 6. CTA STRIP ═══════════════════ */
const Cta = () => (
  <section className="relative overflow-hidden bg-[#ee5a3b] py-20">
    <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#ff8a3d]/50 blur-3xl" />
    <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[#e11d2e]/40 blur-3xl" />
    <div className="relative mx-auto max-w-[1000px] px-6 text-center">
      <Reveal>
        <p className="font-script text-3xl text-[#2b0a03]">Ready To Book?</p>
        <h2 className="mt-2 text-[clamp(28px,4.4vw,48px)] font-black leading-tight text-[#2b0a03]">DJ Classis &amp; Keshari Generator</h2>
        <p className="mt-3 inline-flex items-center gap-2 font-semibold text-white"><Icon name="pin" className="h-5 w-5" /> Obra, Sonbhadra, UP</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {PHONES.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`}
              className="group inline-flex items-center gap-3 rounded-full bg-[#0d0d0d] px-8 py-4 text-xl font-black text-white transition-all duration-300 hover:-translate-y-1 hover:text-[#fbbf24]">
              <Icon name="phone" className="h-5 w-5 text-[#ff4f8b]" />{p.show}
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

/* ═══════════════════ EXPORT ═══════════════════ */
const ServicesPage = () => (
  <div className="dj-root overflow-x-hidden bg-[#0d0d0d] text-white">
    <GlobalStyles />
    <Hero />
    <Band />
    <AllServices />
    <HowToBook />
    <Why />
    <Cta />
  </div>
);

export default ServicesPage;