import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   DJ CLASSIS & KESHARI GENERATOR — CONTACT PAGE (Tailwind CSS)
   Same theme: pink #ff4f8b · orange #ff8a3d · yellow #fbbf24
   coral #ee5a3b · red #e11d2e · black #0d0d0d · card #151515
══════════════════════════════════════════════════════════════ */

const PHONES = [
  { show: "84235 94775", tel: "+918423594775", wa: "918423594775" },
  { show: "92192 58306", tel: "+919219258306", wa: "919219258306" },
];

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Poppins:wght@400;500;600;700;800;900&display=swap');
    .dj-root { font-family: 'Poppins', sans-serif; }
    .font-script { font-family: 'Caveat', cursive; }
    @keyframes spinSlow { to { transform: rotate(360deg); } }
    @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
    @keyframes eq { from { transform: scaleY(.25); } to { transform: scaleY(1); } }
    @keyframes ping2 { 0% { transform: scale(1); opacity:.7; } 100% { transform: scale(2.2); opacity:0; } }
    @keyframes glowPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,79,139,.5); } 50% { box-shadow: 0 0 0 14px rgba(255,79,139,0); } }
    @media (prefers-reduced-motion: reduce) {
      .dj-root *, .dj-root *::before, .dj-root *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
    }
  `}</style>
);

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

const Eyebrow = ({ children }) => (
  <span className="font-script bg-gradient-to-r from-[#ff4f8b] to-[#ff8a3d] bg-clip-text text-[26px] leading-none text-transparent">{children}</span>
);

const ICONS = {
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  chat: "M4 5h16v11H9l-5 4V5Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3 2",
};
const Icon = ({ name, className = "h-6 w-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={ICONS[name]} />
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

/* ═══════════════════ 1. HERO ═══════════════════ */
const Hero = () => (
  <section className="relative overflow-hidden bg-[#0d0d0d] bg-[radial-gradient(circle_at_0%_100%,rgba(238,90,59,.22),transparent_45%)] pb-10 pt-32">
    <span className="absolute left-[6%] top-28 h-4 w-4 bg-[#e11d2e]" style={{ animation: "floaty 5s ease-in-out infinite" }} />
    <span className="absolute bottom-6 right-[10%] h-3 w-3 bg-[#e11d2e]" style={{ animation: "floaty 4s ease-in-out 1s infinite" }} />
    <div className="absolute -right-40 top-0 h-[380px] w-[380px] rounded-full bg-[#ff4f8b]/10 blur-[120px]" />
    <div className="relative mx-auto max-w-[1100px] px-6 text-center">
      <Reveal>
        <Eyebrow>Get In Touch</Eyebrow>
        <h1 className="mt-3 text-[clamp(34px,5.4vw,58px)] font-black leading-[1.1] text-white">
          Book{" "}
          <span className="underline decoration-[#fbbf24] decoration-[6px] underline-offset-[10px]">DJ Classis</span>{" "}
          &amp; Keshari Generator
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.9] text-white/60">Call, WhatsApp or send your event details. We reply fast.</p>
        <div className="mt-6 flex justify-center"><Equalizer bars={18} h={40} color="bg-gradient-to-t from-[#ff4f8b] to-[#fbbf24]" /></div>
      </Reveal>
    </div>
  </section>
);

/* ═══════════════════ 2. CONTACT CARDS ═══════════════════ */
const Cards = () => (
  <section className="bg-[#0d0d0d] pb-10 pt-6">
    <div className="mx-auto grid max-w-[1100px] gap-5 px-6 md:grid-cols-3">
      {PHONES.map((p, i) => (
        <Reveal key={p.tel} dir="up" delay={i * 100}>
          <div className="group h-full rounded-2xl border border-white/10 bg-[#151515] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#ff4f8b]">
            <div className="relative mb-5 grid h-16 w-16 place-items-center rounded-full border border-white/15 text-[#ff4f8b] transition-transform duration-500 group-hover:rotate-[360deg]">
              <span className="absolute inset-0 rounded-full border border-[#ff4f8b]" style={{ animation: "ping2 2.6s ease-out infinite", animationDelay: `${i * 0.4}s` }} />
              <Icon name="phone" className="h-7 w-7" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Contact {i + 1}</p>
            <a href={`tel:${p.tel}`} className="mt-1 block text-3xl font-black text-white transition-colors group-hover:text-[#fbbf24]">{p.show}</a>
            <div className="mt-5 flex gap-3">
              <a href={`tel:${p.tel}`} className="rounded-full bg-gradient-to-r from-[#ff4f8b] to-[#ff8a3d] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105">Call</a>
              <a href={`https://wa.me/${p.wa}`} target="_blank" rel="noreferrer"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#00b67a] hover:text-[#00b67a]">WhatsApp</a>
            </div>
          </div>
        </Reveal>
      ))}

      <Reveal dir="up" delay={200}>
        <div className="group h-full rounded-2xl border border-white/10 bg-[#151515] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#ff4f8b]">
          <div className="relative mb-5 grid h-16 w-16 place-items-center rounded-full border border-white/15 text-[#fbbf24] transition-transform duration-500 group-hover:rotate-[360deg]">
            <span className="absolute inset-0 rounded-full border border-[#fbbf24]" style={{ animation: "ping2 2.6s ease-out infinite", animationDelay: ".8s" }} />
            <Icon name="pin" className="h-7 w-7" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Location</p>
          <p className="mt-1 text-2xl font-black leading-tight text-white">Obra, Sonbhadra</p>
          <p className="text-lg font-semibold text-white/70">Uttar Pradesh</p>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ═══════════════════ 3. FORM + MAP ═══════════════════ */
const field =
  "w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-5 py-4 text-sm text-white placeholder-white/35 outline-none transition-all duration-300 focus:border-[#ff4f8b] focus:shadow-[0_0_0_4px_rgba(255,79,139,.15)]";

const FormMap = () => {
  const [sent, setSent] = useState(false);

  /* No backend needed: the form opens WhatsApp with the details already typed */
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const text =
      `Hello, I want to book a DJ.\n` +
      `Name: ${f.get("name")}\n` +
      `Phone: ${f.get("phone")}\n` +
      `Event: ${f.get("event")}\n` +
      `Date & Place: ${f.get("when")}\n` +
      `Details: ${f.get("msg") || "-"}`;
    window.open(`https://wa.me/${PHONES[0].wa}?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    e.target.reset();
  };

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-20">
      <div className="mx-auto grid max-w-[1100px] gap-6 px-6 lg:grid-cols-[1.1fr_1fr]">
        <Reveal dir="left">
          <form onSubmit={submit} className="relative h-full rounded-3xl border border-white/10 bg-[#151515] p-8 sm:p-10">
            <span className="absolute -left-3 -top-3 h-6 w-6 bg-[#e11d2e]" />
            <h2 className="mb-6 text-2xl font-bold text-white">Send Booking Request</h2>
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <input name="name" className={field} type="text" placeholder="Your Name" required />
              <input name="phone" className={field} type="tel" placeholder="Phone Number" required />
            </div>
            <select name="event" defaultValue="" required className={`${field} mb-4 appearance-none`}>
              <option value="" disabled>Select Event Type</option>
              {["Home DJ", "Road DJ / Baraat", "Wedding", "Stage Program", "Puja / Jagran", "Other Event"].map((o) => (
                <option key={o} value={o} className="bg-[#151515]">{o}</option>
              ))}
            </select>
            <input name="when" className={`${field} mb-4`} type="text" placeholder="Event Date & Place" />
            <textarea name="msg" rows={3} className={`${field} mb-6 resize-none`} placeholder="Anything else we should know?" />
            <button type="submit"
              className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#ff4f8b] via-[#ff8a3d] to-[#fbbf24] py-4 text-[15px] font-bold text-white shadow-[0_12px_30px_-8px_rgba(255,79,139,.7)] transition-all duration-300 hover:-translate-y-1"
              style={{ animation: "glowPulse 2.4s infinite" }}>
              <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative inline-flex items-center justify-center gap-2">
                <Icon name="chat" className="h-5 w-5" />
                {sent ? "Opening WhatsApp..." : "Send On WhatsApp"}
              </span>
            </button>
          </form>
        </Reveal>

        <Reveal dir="right">
          <div className="flex h-full flex-col gap-6">
            <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-3xl border border-white/10 bg-[#151515]">
              <iframe title="Obra, Sonbhadra" loading="lazy" className="absolute inset-0 h-full w-full border-0 opacity-90 [filter:invert(.9)_hue-rotate(180deg)_saturate(.8)]"
                src="https://www.google.com/maps?q=Obra,Sonbhadra,Uttar+Pradesh&output=embed" />
              <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#0d0d0d]/90 px-4 py-2 text-xs font-semibold text-white">
                <Icon name="pin" className="h-4 w-4 text-[#ff4f8b]" /> Obra, Sonbhadra, UP
              </span>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-[#ee5a3b] p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#0d0d0d] text-[#fbbf24]"><Icon name="clock" className="h-6 w-6" /></span>
              <div>
                <p className="font-bold text-[#2b0a03]">Available for booking</p>
                <p className="text-sm text-white">Call early to lock your date.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ═══════════════════ EXPORT ═══════════════════ */
const ContactPage = () => (
  <div className="dj-root overflow-x-hidden bg-[#0d0d0d] text-white">
    <GlobalStyles />
    <Hero />
    <Cards />
    <FormMap />
  </div>
);

export default ContactPage;