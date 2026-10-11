import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   DJ CLASSIS & KESHARI GENERATOR — ABOUT PAGE (Tailwind CSS)
   Same theme as LowerSection:
   pink #ff4f8b · orange #ff8a3d · yellow #fbbf24 · coral #ee5a3b
   red #e11d2e · teal #2dd4bf · black #0d0d0d · card #151515
   Hero photo: put any image at /public/a.png (gradient shows if missing)
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
    @keyframes spinSlow { to { transform: rotate(360deg); } }
    @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
    @keyframes eq { from { transform: scaleY(.25); } to { transform: scaleY(1); } }
    @keyframes ping2 { 0% { transform: scale(1); opacity:.7; } 100% { transform: scale(2.2); opacity:0; } }
    @keyframes glowPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,79,139,.5); } 50% { box-shadow: 0 0 0 14px rgba(255,79,139,0); } }
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

const Marquee = ({ children, speed = 28, className = "" }) => (
  <div className={`mq-wrap overflow-hidden ${className}`}>
    <div className="mq-track flex w-max" style={{ animation: `mqRight ${speed}s linear infinite` }}>
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
  mic: "M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0M12 17v4M8 21h8",
  fire: "M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 2-2 3-3 3 0-3-1-6-4-8 0 4-4 6-4 12 0 4 3 7 7 7Z",
  party: "M4 20l5-14 9 9-14 5Zm9-13 1-3m3 6 3-1m-4-5 2-2",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
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
    <circle cx="60" cy="60" r="16" fill="url(#vgA)" />
    <circle cx="60" cy="60" r="3" fill="#0d0d0d" />
    <defs><linearGradient id="vgA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff4f8b" /><stop offset="1" stopColor="#fbbf24" /></linearGradient></defs>
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

const PillBtn = ({ children, href, className = "" }) => (
  <a href={href}
    className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#ff4f8b] to-[#ff8a3d] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(255,79,139,.7)] transition-all duration-300 hover:-translate-y-1 ${className}`}
    style={{ animation: "glowPulse 2.4s infinite" }}>
    <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
    <span className="relative inline-flex items-center gap-3">{children}</span>
  </a>
);

/* ═══════════════════ 1. HERO / ABOUT ═══════════════════ */
const Hero = () => (
  <section className="relative overflow-hidden bg-[#0d0d0d] bg-[radial-gradient(circle_at_0%_100%,rgba(238,90,59,.22),transparent_45%)] pb-24 pt-32">
    <span className="absolute left-[6%] top-28 h-4 w-4 bg-[#e11d2e]" style={{ animation: "floaty 5s ease-in-out infinite" }} />
    <span className="absolute bottom-16 right-[8%] h-3 w-3 bg-[#e11d2e]" style={{ animation: "floaty 4s ease-in-out 1s infinite" }} />
    <div className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-[#ff4f8b]/10 blur-[120px]" />

    <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-6 lg:grid-cols-2">
      <Reveal dir="left">
        <Eyebrow>About Us</Eyebrow>
        <h1 className="mt-3 text-[clamp(34px,5.4vw,60px)] font-black leading-[1.1] text-white">
          DJ Classis &amp;{" "}
          <span className="underline decoration-[#fbbf24] decoration-[6px] underline-offset-[10px]">Keshari Generator</span>
        </h1>
        <p className="mt-8 max-w-lg text-base leading-[1.9] text-white/65">
          We give the best DJ setup for every occasion — home DJ, road DJ and stage programs, puja, and all types of events. Loud, clean sound and a crowd that never stops dancing.
        </p>

        <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm text-white/80">
          <Icon name="pin" className="h-5 w-5 text-[#ff4f8b]" />
          Obra, Sonbhadra, UP
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <PillBtn href={`tel:${PHONES[0].tel}`}><Icon name="phone" className="h-5 w-5" />Call Now</PillBtn>
          <a href={`https://wa.me/${PHONES[0].wa}`} target="_blank" rel="noreferrer"
            className="rounded-full border border-white/20 px-8 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:border-[#fbbf24] hover:text-[#fbbf24]">
            WhatsApp Us
          </a>
        </div>
      </Reveal>

      {/* image card */}
      <Reveal dir="right">
        <div className="relative mx-auto max-w-[480px]">
          <div className="absolute -inset-4 rounded-full border border-[#fbbf24]/40" style={{ animation: "spinSlow 30s linear infinite" }}>
            <span className="absolute -right-[6px] top-1/3 h-3 w-3 rounded-full bg-[#fbbf24]" />
          </div>
          <div className="relative h-[520px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#7a1fa2] via-[#ff4f8b] to-[#ff8a3d]">
            <Vinyl className="absolute -right-10 top-24 h-64 w-64" style={{ animation: "spinSlow 14s linear infinite" }} />
            <div className="absolute bottom-24 left-6"><Equalizer bars={14} h={70} color="bg-white/85" /></div>
            <img src="/a.png" alt="DJ Classis & Keshari Generator" onError={(e) => { e.currentTarget.style.display = "none"; }}
              className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-6 -left-4 rounded-lg bg-white px-5 py-4 shadow-2xl sm:-left-8" style={{ animation: "floaty 5s ease-in-out infinite" }}>
            <p className="text-sm font-semibold text-[#ff4f8b]">Book Your Date</p>
            <p className="text-sm font-medium text-black">Home · Road · Stage · Puja</p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ═══════════════════ 2. MARQUEE BAND ═══════════════════ */
const WORDS = ["Home DJ", "Road DJ", "Stage Program", "Puja", "All Types Of Events"];
const Band = () => (
  <div className="overflow-hidden bg-[#0d0d0d] py-10">
    <div className="-rotate-1 scale-105 bg-gradient-to-r from-[#ff4f8b] via-[#ff8a3d] to-[#fbbf24] py-4 shadow-[0_0_60px_rgba(255,79,139,.35)]">
      <Marquee>
        {WORDS.concat(WORDS).map((w, i) => (
          <span key={i} className="flex items-center gap-8 pr-8 text-2xl font-extrabold uppercase tracking-wide text-black">
            {w}<Icon name="star" className="h-5 w-5" />
          </span>
        ))}
      </Marquee>
    </div>
  </div>
);

/* ═══════════════════ 3. WHAT WE DO ═══════════════════ */
const services = [
  { icon: "home", t: "Home DJ", d: "Birthday, house party, griha pravesh — full sound at your doorstep.", c: "#ff4f8b" },
  { icon: "road", t: "Road DJ", d: "Baraat and processions with powerful road sound systems.", c: "#ff8a3d" },
  { icon: "mic", t: "Stage Program", d: "Stage, lights and sound setup for functions and live shows.", c: "#fbbf24" },
  { icon: "fire", t: "Puja & Jagran", d: "Devotional sound for puja, jagran, kirtan and religious events.", c: "#ee5a3b" },
  { icon: "party", t: "All Types Of Events", d: "Wedding, corporate, school and club — we handle every event.", c: "#2dd4bf" },
];

const Services = () => (
  <section className="relative overflow-hidden bg-[#0a0a0a] py-24">
    <p className="outline-text pointer-events-none absolute -top-4 left-0 whitespace-nowrap text-[200px] font-black leading-none opacity-70"
      style={{ animation: "mqRight 60s linear infinite", width: "max-content" }}>
      DJ SETUP DJ SETUP DJ SETUP DJ SETUP
    </p>
    <div className="relative mx-auto max-w-[1200px] px-6">
      <Reveal className="mb-14 text-center">
        <Eyebrow>What We Do</Eyebrow>
        <h2 className="mt-2 text-[clamp(28px,4.2vw,44px)] font-bold text-white">
          Best DJ Setup For{" "}
          <span className="underline decoration-[#fbbf24] decoration-[5px] underline-offset-[8px]">Every Event</span>
        </h2>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {services.map(({ icon, t, d, c }, i) => (
          <Reveal key={t} dir="up" delay={i * 90}
            className={`${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#151515] p-7 transition-all duration-500 hover:-translate-y-3 hover:border-transparent">
              <span className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-all duration-700 group-hover:scale-[3] group-hover:opacity-[.12]" style={{ background: c }} />
              <span className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-700 group-hover:w-full" style={{ background: `linear-gradient(90deg, ${c}, #fbbf24)` }} />
              <div className="relative mb-5 grid h-[68px] w-[68px] place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-[360deg]" style={{ color: c }}>
                <span className="absolute inset-0 rounded-full border" style={{ borderColor: c, animation: "ping2 2.6s ease-out infinite", animationDelay: `${i * 0.3}s` }} />
                <Icon name={icon} className="h-7 w-7" />
              </div>
              <h3 className="relative mb-2 text-xl font-bold text-white">{t}</h3>
              <p className="relative text-sm leading-[1.8] text-white/55">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════ 4. CONTACT ═══════════════════ */
const Contact = () => (
  <section className="relative overflow-hidden bg-[#ee5a3b] py-20">
    <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#ff8a3d]/50 blur-3xl" />
    <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[#e11d2e]/40 blur-3xl" />

    <div className="relative mx-auto max-w-[1000px] px-6 text-center">
      <Reveal>
        <p className="font-script text-3xl text-[#2b0a03]">Book Now</p>
        <h2 className="mt-2 text-[clamp(28px,4.4vw,48px)] font-black leading-tight text-[#2b0a03]">DJ Classis &amp; Keshari Generator</h2>
        <p className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-white">
          <Icon name="pin" className="h-5 w-5" /> Obra, Sonbhadra, UP
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {PHONES.map((p, i) => (
          <Reveal key={p.tel} dir={i ? "right" : "left"}>
            <div className="group rounded-2xl bg-[#0d0d0d] p-7 text-left transition-all duration-500 hover:-translate-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Contact {i + 1}</p>
              <a href={`tel:${p.tel}`} className="mt-2 block text-3xl font-black text-white transition-colors group-hover:text-[#fbbf24]">{p.show}</a>
              <div className="mt-5 flex gap-3">
                <a href={`tel:${p.tel}`} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff4f8b] to-[#ff8a3d] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105">
                  <Icon name="phone" className="h-4 w-4" /> Call
                </a>
                <a href={`https://wa.me/${p.wa}`} target="_blank" rel="noreferrer"
                  className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#00b67a] hover:text-[#00b67a]">
                  WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════ EXPORT ═══════════════════ */
const AboutPage = () => (
  <div className="dj-root overflow-x-hidden bg-[#0d0d0d] text-white">
    <GlobalStyles />
    <Hero />
    <Band />
    <Services />
    <Contact />
  </div>
);

export default AboutPage;