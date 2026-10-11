import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   DJ CLASSIS & KESHARI GENERATOR — FOOTER (Tailwind CSS)
   Same theme: pink #ff4f8b · orange #ff8a3d · yellow #fbbf24
   coral #ee5a3b · red #e11d2e · black #0d0d0d · card #151515

   Everything is connected from the CONFIG block below:
   pages, home-page sections, services, phones, WhatsApp, map.
   Using react-router? Change only the <A> component (see below).
══════════════════════════════════════════════════════════════ */

/* ───────────── CONFIG: edit paths here ───────────── */
const BRAND = "DJ Classis & Keshari Generator";

const PHONES = [
  { show: "84235 94775", tel: "+918423594775", wa: "918423594775" },
  { show: "92192 58306", tel: "+919219258306", wa: "919219258306" },
];

const PAGES = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
  { label: "Book Now", to: "/book-now" },
];

/* Sections of the home page (ids used in LowerSection) */
const SECTIONS = [
  { label: "Who We Are", to: "/#about" },
  { label: "Trending Genres", to: "/#genres" },
  { label: "Premium Services", to: "/#mixes" },
  { label: "How It Works", to: "/#how" },
  { label: "Get A Free Quote", to: "/#contact" },
];

const SERVICES = [
  "Home DJ", "Road DJ", "Wedding DJ", "Live DJ Sets", "Bhojpuri Night",
  "Stage Program", "Sound Setup", "Puja & Jagran", "All Types Of Events",
];

/* Add your real links; empty ones are hidden automatically */
const SOCIAL = {
  instagram: "",
  facebook: "",
  youtube: "",
};

const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=Obra,Sonbhadra,Uttar+Pradesh";

/* ───────────── swap this for react-router's <Link to=...> if you use it ───────────── */
const A = ({ to, children, className = "", ...rest }) => (
  <a href={to} className={className} {...rest}>{children}</a>
);

/* ───────────── styles ───────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Poppins:wght@400;500;600;700;800;900&display=swap');
    .dj-root { font-family: 'Poppins', sans-serif; }
    .font-script { font-family: 'Caveat', cursive; }
    @keyframes mqRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
    @keyframes eq { from { transform: scaleY(.25); } to { transform: scaleY(1); } }
    @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
    @keyframes glowPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,79,139,.5); } 50% { box-shadow: 0 0 0 14px rgba(255,79,139,0); } }
    @keyframes lineFlow { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
    .mq-wrap:hover .mq-track { animation-play-state: paused !important; }
    .outline-text { -webkit-text-stroke: 1.5px rgba(255,255,255,.12); color: transparent; }
    @media (prefers-reduced-motion: reduce) {
      .dj-root *, .dj-root *::before, .dj-root *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
    }
  `}</style>
);

/* ───────────── helpers ───────────── */
const useInView = (threshold = 0.1) => {
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

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, shown] = useInView();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-out ${shown ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} ${className}`}>
      {children}
    </div>
  );
};

const Marquee = ({ children, speed = 40, className = "" }) => (
  <div className={`mq-wrap overflow-hidden ${className}`}>
    <div className="mq-track flex w-max" style={{ animation: `mqRight ${speed}s linear infinite` }}>
      <div className="flex shrink-0 items-center">{children}</div>
      <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
    </div>
  </div>
);

const ICONS = {
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  chat: "M4 5h16v11H9l-5 4V5Z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  up: "M12 19V5m-7 7 7-7 7 7",
  star: "M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9l3-7Z",
  insta: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5h.01",
  fb: "M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5A.5.5 0 0 1 14 8Z",
  yt: "M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8Zm7 1.5v5l5-2.5-5-2.5Z",
};
const Icon = ({ name, className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={ICONS[name]} />
  </svg>
);

const Equalizer = ({ bars = 14, h = 36 }) => (
  <div className="flex items-end gap-[3px]" style={{ height: h }}>
    {Array.from({ length: bars }).map((_, i) => (
      <span key={i} className="block w-[4px] origin-bottom rounded-full bg-gradient-to-t from-[#ff4f8b] to-[#fbbf24]"
        style={{ height: `${40 + ((i * 37) % 60)}%`, animation: `eq ${0.5 + (i % 5) * 0.12}s ease-in-out ${i * 0.07}s infinite alternate` }} />
    ))}
  </div>
);

/* link with a sliding dot + colour on hover */
const FooterLink = ({ to, children, ...rest }) => (
  <li>
    <A to={to} {...rest}
      className="group inline-flex items-center gap-2 text-[15px] text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-white">
      <span className="h-[6px] w-0 rounded-full bg-gradient-to-r from-[#ff4f8b] to-[#fbbf24] transition-all duration-300 group-hover:w-3" />
      {children}
    </A>
  </li>
);

const Heading = ({ children }) => (
  <h4 className="mb-6 inline-block text-lg font-bold text-white">
    {children}
    <span className="mt-2 block h-[3px] w-10 rounded-full bg-gradient-to-r from-[#ff4f8b] to-[#fbbf24]" />
  </h4>
);

/* ═══════════════════ FOOTER ═══════════════════ */
const Footer = () => {
  const year = new Date().getFullYear();
  const socials = [
    { k: "instagram", icon: "insta", label: "Instagram" },
    { k: "facebook", icon: "fb", label: "Facebook" },
    { k: "youtube", icon: "yt", label: "YouTube" },
  ].filter((s) => SOCIAL[s.k]);

  return (
    <footer className="dj-root relative overflow-hidden bg-[#0a0a0a] text-white">
      <GlobalStyles />

      {/* 1. flowing coral brand strip */}
      <div className="relative overflow-hidden bg-[#ee5a3b] py-6">
        <Marquee speed={36}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10 pr-10 text-2xl font-black uppercase tracking-wide text-[#2b0a03] sm:text-4xl">
              {BRAND}<Icon name="star" className="h-6 w-6" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* 2. booking CTA */}
      <div className="relative overflow-hidden bg-[#0d0d0d] bg-[radial-gradient(circle_at_0%_100%,rgba(238,90,59,.2),transparent_45%)]">
        <span className="absolute left-[5%] top-10 h-4 w-4 bg-[#e11d2e]" style={{ animation: "floaty 5s ease-in-out infinite" }} />
        <span className="absolute bottom-10 right-[6%] h-3 w-3 bg-[#e11d2e]" style={{ animation: "floaty 4s ease-in-out 1s infinite" }} />
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-8 px-6 py-16">
          <Reveal>
            <p className="font-script bg-gradient-to-r from-[#ff4f8b] to-[#ff8a3d] bg-clip-text text-[28px] leading-none text-transparent">Ready To Drop The Beat?</p>
            <h3 className="mt-3 max-w-xl text-[clamp(26px,4vw,42px)] font-bold leading-[1.15] text-white">
              Book Your Date With{" "}
              <span className="underline decoration-[#fbbf24] decoration-[5px] underline-offset-[8px]">DJ Classis</span>
            </h3>
            <div className="mt-5"><Equalizer bars={20} h={34} /></div>
          </Reveal>

          <Reveal delay={150} className="flex flex-wrap gap-4">
            <A to="/book-now"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#ff4f8b] to-[#ff8a3d] px-9 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(255,79,139,.7)] transition-all duration-300 hover:-translate-y-1"
              style={{ animation: "glowPulse 2.4s infinite" }}>
              <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Book Now</span>
              <Icon name="arrow" className="relative h-5 w-5" />
            </A>
            <a href={`tel:${PHONES[0].tel}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:border-[#fbbf24] hover:text-[#fbbf24]">
              <Icon name="phone" /> Call Now
            </a>
          </Reveal>
        </div>
      </div>

      {/* animated divider */}
      <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg,#ff4f8b,#ff8a3d,#fbbf24,#ff4f8b)", backgroundSize: "200% 100%", animation: "lineFlow 5s linear infinite" }} />

      {/* 3. main columns */}
      <div className="relative">
        <p className="outline-text pointer-events-none absolute -bottom-10 left-0 whitespace-nowrap text-[200px] font-black leading-none"
          style={{ animation: "mqRight 80s linear infinite", width: "max-content" }}>
          DJ CLASSIS KESHARI GENERATOR DJ CLASSIS KESHARI GENERATOR
        </p>

        <div className="relative mx-auto grid max-w-[1200px] gap-12 px-6 py-20 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.9fr_1.2fr]">
          {/* brand */}
          <Reveal>
            <A to="/" className="inline-block">
              <p className="text-2xl font-black leading-tight text-white">DJ Classis <span className="text-[#fbbf24]">&amp;</span><br />Keshari Generator</p>
            </A>
            <p className="mt-5 max-w-sm text-[15px] leading-[1.9] text-white/55">
              The best DJ setup for home DJ, road DJ, stage programs, puja and every kind of event. Loud, clean sound and a crowd that never stops dancing.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`https://wa.me/${PHONES[0].wa}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#00b67a] hover:bg-[#00b67a] hover:text-white">
                <Icon name="chat" />
              </a>
              {socials.map((s) => (
                <a key={s.k} href={SOCIAL[s.k]} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff4f8b] hover:bg-[#ff4f8b] hover:text-white">
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </Reveal>

          {/* quick links */}
          <Reveal delay={100}>
            <Heading>Quick Links</Heading>
            <ul className="space-y-3">
              {PAGES.map((p) => <FooterLink key={p.to} to={p.to}>{p.label}</FooterLink>)}
            </ul>
            <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
              {SECTIONS.map((s) => <FooterLink key={s.to} to={s.to}>{s.label}</FooterLink>)}
            </ul>
          </Reveal>

          {/* services */}
          <Reveal delay={200}>
            <Heading>Our Services</Heading>
            <ul className="space-y-3">
              {SERVICES.map((s) => <FooterLink key={s} to="/services">{s}</FooterLink>)}
            </ul>
          </Reveal>

          {/* contact */}
          <Reveal delay={300}>
            <Heading>Contact Us</Heading>
            <ul className="space-y-5">
              {PHONES.map((p, i) => (
                <li key={p.tel} className="group flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-[#ff4f8b] transition-all duration-300 group-hover:rotate-[360deg] group-hover:border-[#ff4f8b] group-hover:bg-[#ff4f8b] group-hover:text-white">
                    <Icon name="phone" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/35">Call / WhatsApp {i + 1}</p>
                    <a href={`tel:${p.tel}`} className="text-lg font-bold text-white transition-colors hover:text-[#fbbf24]">{p.show}</a>
                  </div>
                </li>
              ))}
              <li className="group flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-[#fbbf24] transition-all duration-300 group-hover:rotate-[360deg] group-hover:border-[#fbbf24] group-hover:bg-[#fbbf24] group-hover:text-black">
                  <Icon name="pin" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/35">Location</p>
                  <a href={MAP_LINK} target="_blank" rel="noreferrer" className="font-semibold leading-snug text-white transition-colors hover:text-[#fbbf24]">
                    Obra, Sonbhadra,<br />Uttar Pradesh
                  </a>
                </div>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>

      {/* 4. bottom bar */}
      <div className="relative border-t border-white/10 bg-[#0d0d0d]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-6">
          <p className="text-sm text-white/45">© {year} {BRAND}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/45">
            <A to="/about" className="transition-colors hover:text-[#ff4f8b]">About</A>
            <A to="/services" className="transition-colors hover:text-[#ff4f8b]">Services</A>
            <A to="/contact" className="transition-colors hover:text-[#ff4f8b]">Contact</A>
            <A to="/book-now" className="transition-colors hover:text-[#ff4f8b]">Book Now</A>
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/70 transition-all duration-300 hover:border-[#ff4f8b] hover:text-white">
            Back To Top
            <Icon name="up" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>

      {/* 5. developer credit (very bottom) */}
      <div className="relative border-t border-white/5 bg-[#050505]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 py-4 text-center text-[13px] text-white/45">
          <span>
            Developed by{" "}
            <span className="font-bold bg-gradient-to-r from-[#ff4f8b] via-[#ff8a3d] to-[#fbbf24] bg-clip-text text-transparent">Shresth Gupta</span>
          </span>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <a href="tel:+918423594775" className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-[#fbbf24]">
            <Icon name="phone" className="h-4 w-4 text-[#ff4f8b]" />
            Contact: 84235 94775
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;