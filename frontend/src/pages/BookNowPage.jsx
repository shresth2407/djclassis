import { useState, useEffect, useRef, useMemo } from "react";

/* ══════════════════════════════════════════════════════════════
   DJ CLASSIS & KESHARI GENERATOR — BOOK NOW PAGE (Tailwind CSS)
   Same theme: pink #ff4f8b · orange #ff8a3d · yellow #fbbf24
   coral #ee5a3b · red #e11d2e · teal #2dd4bf · black #0d0d0d
   Flow: event type → date → time → your details → COD → confirm
   After confirming, the user sees "Your booking is successful &
   secure" with name, date, event type and all details.
══════════════════════════════════════════════════════════════ */

const PHONES = [
  { show: "84235 94775", tel: "+918423594775", wa: "918423594775" },
  { show: "92192 58306", tel: "+919219258306", wa: "919219258306" },
];

/* Dates that are already booked (YYYY-MM-DD). They show crossed out in the calendar. */
const BOOKED_DATES = ["2026-10-24", "2026-11-08"];

/* Optional: set your backend URL here to save every booking (POST JSON).
   Leave "" to skip — the booking is then confirmed on screen and can be sent on WhatsApp. */
const BOOKING_API = "";

const EVENTS = [
  { id: "Home DJ", icon: "home" },
  { id: "Road DJ / Baraat", icon: "road" },
  { id: "Wedding", icon: "rings" },
  { id: "Stage Program", icon: "mic" },
  { id: "Puja / Jagran", icon: "fire" },
  { id: "Birthday / Party", icon: "party" },
  { id: "Corporate Event", icon: "brief" },
  { id: "Other Event", icon: "disc" },
];

const SLOTS = [
  { id: "Morning", sub: "6 AM – 12 PM" },
  { id: "Afternoon", sub: "12 PM – 4 PM" },
  { id: "Evening", sub: "4 PM – 8 PM" },
  { id: "Night", sub: "8 PM onwards" },
];

/* ───────────── styles ───────────── */
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
    @keyframes popIn { 0% { opacity:0; transform: scale(.6); } 70% { transform: scale(1.08); } 100% { opacity:1; transform: scale(1); } }
    @keyframes drawCheck { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }
    @keyframes fall { 0% { transform: translateY(-20px) rotate(0); opacity:1; } 100% { transform: translateY(520px) rotate(540deg); opacity:0; } }
    @keyframes slideUp { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform: none; } }
    .no-scrollbar::-webkit-scrollbar { display: none; }
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
  home: "M3 11l9-8 9 8v10H3V11Zm6 10v-6h6v6",
  road: "M8 3 4 21M16 3l4 18M12 4v3m0 4v3m0 4v3",
  rings: "M9 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm6 0a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
  mic: "M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0M12 17v4M8 21h8",
  fire: "M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 2-2 3-3 3 0-3-1-6-4-8 0 4-4 6-4 12 0 4 3 7 7 7Z",
  party: "M4 20l5-14 9 9-14 5Zm9-13 1-3m3 6 3-1m-4-5 2-2",
  brief: "M3 8h18v12H3V8Zm6 0V5h6v3M3 13h18",
  disc: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  cash: "M3 7h18v10H3V7Zm9 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Zm-3 9 2 2 4-4",
  chat: "M4 5h16v11H9l-5 4V5Z",
  left: "M15 6l-6 6 6 6",
  right: "M9 6l6 6-6 6",
  check: "M5 12l5 5 9-10",
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

const pad = (n) => String(n).padStart(2, "0");
const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const prettyDate = (d) => d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const cleanPhone = (v) => {
  let d = v.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  return d;
};

/* ───────────── Calendar ───────────── */
const Calendar = ({ value, onChange }) => {
  const today = useMemo(() => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; }, []);
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const blanks = new Date(view.getFullYear(), view.getMonth(), 1).getDay();
  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNext = view < new Date(today.getFullYear(), today.getMonth() + 11, 1);
  const move = (n) => setView(new Date(view.getFullYear(), view.getMonth() + n, 1));

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5">
      <div className="mb-4 flex items-center justify-between">
        <button type="button" onClick={() => move(-1)} disabled={!canPrev} aria-label="Previous month"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition hover:border-[#ff4f8b] hover:text-[#ff4f8b] disabled:opacity-25 disabled:hover:border-white/15 disabled:hover:text-white">
          <Icon name="left" className="h-5 w-5" />
        </button>
        <p className="text-base font-bold text-white">{view.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>
        <button type="button" onClick={() => move(1)} disabled={!canNext} aria-label="Next month"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition hover:border-[#ff4f8b] hover:text-[#ff4f8b] disabled:opacity-25 disabled:hover:border-white/15 disabled:hover:text-white">
          <Icon name="right" className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 text-center text-[11px] font-semibold uppercase tracking-wider text-white/35">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => <span key={d}>{d}</span>)}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: blanks }).map((_, i) => <span key={`b${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = new Date(view.getFullYear(), view.getMonth(), i + 1);
          const key = toKey(d);
          const past = d < today;
          const booked = BOOKED_DATES.includes(key);
          const selected = value && toKey(value) === key;
          const isToday = toKey(today) === key;
          const off = past || booked;
          return (
            <button key={key} type="button" disabled={off} onClick={() => onChange(d)}
              title={booked ? "Already booked" : undefined}
              className={`aspect-square rounded-xl text-sm font-semibold transition-all duration-300
                ${selected ? "scale-105 bg-gradient-to-br from-[#ff4f8b] to-[#ff8a3d] text-white shadow-[0_8px_20px_-6px_rgba(255,79,139,.8)]"
                  : off ? `cursor-not-allowed text-white/20 ${booked ? "line-through decoration-[#e11d2e]" : ""}`
                  : "text-white/80 hover:bg-[#ff4f8b]/15 hover:text-[#ff8fb3]"}
                ${isToday && !selected ? "ring-1 ring-[#fbbf24]" : ""}`}>
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-white/45">
        <span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-gradient-to-br from-[#ff4f8b] to-[#ff8a3d]" />Selected</span>
        <span className="flex items-center gap-2"><i className="h-3 w-3 rounded ring-1 ring-[#fbbf24]" />Today</span>
        <span className="flex items-center gap-2"><i className="h-[2px] w-3 bg-[#e11d2e]" />Booked</span>
      </div>
    </div>
  );
};

/* ───────────── Step wrapper ───────────── */
const Step = ({ n, title, error, children }) => (
  <div className="relative rounded-3xl border border-white/10 bg-[#151515] p-6 sm:p-8">
    <div className="mb-6 flex items-center gap-4">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#ff4f8b] to-[#ff8a3d] text-sm font-black text-white">{n}</span>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    {children}
    {error && <p className="mt-4 text-sm font-medium text-[#ff6b7a]">{error}</p>}
  </div>
);

const field =
  "w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-5 py-4 text-sm text-white placeholder-white/35 outline-none transition-all duration-300 focus:border-[#ff4f8b] focus:shadow-[0_0_0_4px_rgba(255,79,139,.15)]";

/* ───────────── Success screen ───────────── */
const Success = ({ b, onReset }) => {
  const confetti = useMemo(
    () => Array.from({ length: 26 }).map((_, i) => ({
      left: (i * 37) % 100, delay: (i % 9) * 0.12, dur: 2.2 + (i % 5) * 0.4,
      color: ["#ff4f8b", "#ff8a3d", "#fbbf24", "#2dd4bf", "#ee5a3b"][i % 5], size: 6 + (i % 4) * 3,
    })), []
  );
  const rows = [
    ["Booking ID", b.id],
    ["Name", b.name],
    ["Phone", b.phone],
    ["Event Type", b.event],
    ["Date", b.dateText],
    ["Time", `${b.slot.id} (${b.slot.sub})`],
    ["Venue", b.venue || "To be confirmed on call"],
    ["Payment", "Cash On Delivery (pay at the event)"],
  ];
  const text =
    `Hello, my booking is confirmed.\nBooking ID: ${b.id}\nName: ${b.name}\nPhone: ${b.phone}\n` +
    `Event: ${b.event}\nDate: ${b.dateText}\nTime: ${b.slot.id}\nVenue: ${b.venue || "-"}\nPayment: Cash On Delivery` +
    (b.msg ? `\nNote: ${b.msg}` : "");

  return (
    <div className="relative mx-auto max-w-[720px] overflow-hidden rounded-3xl border border-white/10 bg-[#151515] p-8 text-center sm:p-12" style={{ animation: "slideUp .7s ease both" }}>
      {/* confetti */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        {confetti.map((c, i) => (
          <span key={i} className="absolute top-0 block rounded-[2px]"
            style={{ left: `${c.left}%`, width: c.size, height: c.size * 1.6, background: c.color, animation: `fall ${c.dur}s ease-in ${c.delay}s both` }} />
        ))}
      </div>

      <div className="relative mx-auto mb-6 grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-[#ff4f8b] to-[#ff8a3d]" style={{ animation: "popIn .8s ease both" }}>
        <span className="absolute inset-0 rounded-full border-2 border-[#ff4f8b]" style={{ animation: "ping2 2s ease-out infinite" }} />
        <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l5 5 9-10" strokeDasharray="40" style={{ animation: "drawCheck .7s ease .5s both" }} />
        </svg>
      </div>

      <p className="font-script text-3xl text-[#fbbf24]">Thank You, {b.name.split(" ")[0]}!</p>
      <h2 className="mt-1 text-[clamp(26px,4vw,38px)] font-black leading-tight text-white">Your booking is successful &amp; secure</h2>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/60">
        Your {b.event} is booked for <span className="font-semibold text-white">{b.dateText}</span>. Our team will call you shortly to confirm the details.
      </p>

      <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] text-left">
        {rows.map(([k, v], i) => (
          <div key={k} className={`flex flex-wrap items-start justify-between gap-x-6 gap-y-1 px-5 py-4 ${i ? "border-t border-white/10" : ""}`}>
            <span className="text-sm text-white/45">{k}</span>
            <span className={`text-right text-sm font-semibold ${k === "Booking ID" ? "text-[#fbbf24]" : "text-white"}`}>{v}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-[#ee5a3b] px-5 py-4 text-left">
        <Icon name="cash" className="h-6 w-6 shrink-0 text-[#2b0a03]" />
        <p className="text-sm font-semibold text-[#2b0a03]">Nothing to pay now. Pay in cash at the event (Cash On Delivery).</p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a href={`https://wa.me/${PHONES[0].wa}?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff4f8b] to-[#ff8a3d] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(255,79,139,.7)] transition-all hover:-translate-y-1">
          <Icon name="chat" className="h-5 w-5" /> Send Details On WhatsApp
        </a>
        <a href={`tel:${PHONES[0].tel}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white transition-all hover:border-[#fbbf24] hover:text-[#fbbf24]">
          <Icon name="phone" className="h-5 w-5" /> Call Us
        </a>
        <button onClick={onReset} className="rounded-full px-5 py-3.5 text-sm font-medium text-white/50 transition-colors hover:text-white">Book Another</button>
      </div>
    </div>
  );
};

/* ═══════════════════ MAIN ═══════════════════ */
const initial = { event: "", date: null, slot: null, name: "", phone: "", venue: "", msg: "" };

const BookNowPage = () => {
  const [f, setF] = useState(initial);
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [done, setDone] = useState(null);
  const topRef = useRef(null);

  const set = (k, v) => { setF((p) => ({ ...p, [k]: v })); setErr((p) => ({ ...p, [k]: undefined })); };

  const validate = () => {
    const e = {};
    if (!f.event) e.event = "Please choose an event type.";
    if (!f.date) e.date = "Please pick your event date.";
    if (!f.slot) e.slot = "Please choose a time slot.";
    if (f.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(cleanPhone(f.phone))) e.phone = "Enter a valid 10-digit mobile number.";
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setApiError("");
    if (!validate()) {
      document.getElementById("book-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setLoading(true);
    const d = f.date;
    const booking = {
      id: `DJC-${String(d.getFullYear()).slice(2)}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: f.name.trim(),
      phone: cleanPhone(f.phone),
      event: f.event,
      date: toKey(d),
      dateText: prettyDate(d),
      slot: f.slot,
      venue: f.venue.trim(),
      msg: f.msg.trim(),
      payment: "COD",
      createdAt: new Date().toISOString(),
    };
    try {
      if (BOOKING_API) {
        const res = await fetch(BOOKING_API, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...booking, slot: booking.slot.id }),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        await new Promise((r) => setTimeout(r, 900));
      }
      setDone(booking);
      setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch {
      setApiError("Could not confirm the booking right now. Please try again or call us.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setF(initial); setErr({}); setDone(null); topRef.current?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div className="dj-root overflow-x-hidden bg-[#0d0d0d] text-white">
      <GlobalStyles />

      {/* hero */}
      <section ref={topRef} className="relative overflow-hidden bg-[#0d0d0d] bg-[radial-gradient(circle_at_0%_100%,rgba(238,90,59,.22),transparent_45%)] pb-10 pt-32">
        <span className="absolute left-[6%] top-28 h-4 w-4 bg-[#e11d2e]" style={{ animation: "floaty 5s ease-in-out infinite" }} />
        <span className="absolute bottom-6 right-[10%] h-3 w-3 bg-[#e11d2e]" style={{ animation: "floaty 4s ease-in-out 1s infinite" }} />
        <div className="absolute -right-40 top-0 h-[380px] w-[380px] rounded-full bg-[#ff4f8b]/10 blur-[120px]" />
        <div className="relative mx-auto max-w-[1100px] px-6 text-center">
          <Reveal>
            <Eyebrow>Book Now</Eyebrow>
            <h1 className="mt-3 text-[clamp(32px,5.2vw,56px)] font-black leading-[1.1] text-white">
              Lock Your Date With{" "}
              <span className="underline decoration-[#fbbf24] decoration-[6px] underline-offset-[10px]">DJ Classis</span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.9] text-white/60">Pick your event and date, and pay in cash at the event. No online payment needed.</p>
            <div className="mt-6 flex justify-center"><Equalizer bars={18} h={40} color="bg-gradient-to-t from-[#ff4f8b] to-[#fbbf24]" /></div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-16">
        <div className="mx-auto max-w-[1150px] px-6">
          {done ? (
            <Success b={done} onReset={reset} />
          ) : (
            <form id="book-form" onSubmit={submit} noValidate className="grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
              <div className="space-y-6">
                <Step n="1" title="Choose Event Type" error={err.event}>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {EVENTS.map(({ id, icon }) => {
                      const on = f.event === id;
                      return (
                        <button key={id} type="button" onClick={() => set("event", id)}
                          className={`group flex flex-col items-center gap-3 rounded-2xl border p-4 text-center transition-all duration-300 hover:-translate-y-1
                            ${on ? "border-transparent bg-gradient-to-br from-[#ff4f8b] to-[#ff8a3d] text-white shadow-[0_12px_30px_-10px_rgba(255,79,139,.8)]"
                              : "border-white/10 bg-[#0d0d0d] text-white/70 hover:border-[#ff4f8b]"}`}>
                          <Icon name={icon} className="h-7 w-7" />
                          <span className="text-[13px] font-semibold leading-tight">{id}</span>
                        </button>
                      );
                    })}
                  </div>
                </Step>

                <Step n="2" title="Pick Your Date" error={err.date}>
                  <Calendar value={f.date} onChange={(d) => set("date", d)} />
                </Step>

                <Step n="3" title="Select Time" error={err.slot}>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {SLOTS.map((s) => {
                      const on = f.slot?.id === s.id;
                      return (
                        <button key={s.id} type="button" onClick={() => set("slot", s)}
                          className={`rounded-2xl border p-4 text-center transition-all duration-300 hover:-translate-y-1
                            ${on ? "border-transparent bg-gradient-to-br from-[#ff4f8b] to-[#ff8a3d] text-white" : "border-white/10 bg-[#0d0d0d] text-white/70 hover:border-[#ff4f8b]"}`}>
                          <p className="text-sm font-bold">{s.id}</p>
                          <p className={`mt-1 text-[11px] ${on ? "text-white/90" : "text-white/40"}`}>{s.sub}</p>
                        </button>
                      );
                    })}
                  </div>
                </Step>

                <Step n="4" title="Your Details">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <input className={field} type="text" placeholder="Your Name" value={f.name} onChange={(e) => set("name", e.target.value)} />
                      {err.name && <p className="mt-2 text-sm text-[#ff6b7a]">{err.name}</p>}
                    </div>
                    <div>
                      <input className={field} type="tel" inputMode="numeric" placeholder="Mobile Number" value={f.phone} onChange={(e) => set("phone", e.target.value)} />
                      {err.phone && <p className="mt-2 text-sm text-[#ff6b7a]">{err.phone}</p>}
                    </div>
                  </div>
                  <input className={`${field} mt-4`} type="text" placeholder="Event Venue / Address" value={f.venue} onChange={(e) => set("venue", e.target.value)} />
                  <textarea rows={3} className={`${field} mt-4 resize-none`} placeholder="Anything else? (guests, songs, special requests)" value={f.msg} onChange={(e) => set("msg", e.target.value)} />
                </Step>

                <Step n="5" title="Payment">
                  <div className="flex items-center gap-4 rounded-2xl border border-[#fbbf24]/60 bg-[#fbbf24]/[.06] p-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#fbbf24] text-black"><Icon name="cash" className="h-6 w-6" /></span>
                    <div className="flex-1">
                      <p className="font-bold text-white">Cash On Delivery</p>
                      <p className="text-sm text-white/55">Pay in cash at the event. No advance needed.</p>
                    </div>
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#fbbf24] text-black"><Icon name="check" className="h-4 w-4" /></span>
                  </div>
                </Step>
              </div>

              {/* live summary */}
              <aside className="lg:sticky lg:top-6">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#151515] p-7">
                  <span className="absolute -right-3 -top-3 h-6 w-6 bg-[#e11d2e]" />
                  <h3 className="mb-5 text-xl font-bold text-white">Booking Summary</h3>
                  <dl className="space-y-4 text-sm">
                    {[
                      ["Event", f.event || "—"],
                      ["Date", f.date ? prettyDate(f.date) : "—"],
                      ["Time", f.slot ? f.slot.id : "—"],
                      ["Name", f.name.trim() || "—"],
                      ["Mobile", f.phone.trim() || "—"],
                      ["Payment", "Cash On Delivery"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 border-b border-white/10 pb-3 last:border-0">
                        <dt className="text-white/45">{k}</dt>
                        <dd className="text-right font-semibold text-white">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-5 flex items-center justify-between rounded-xl bg-[#0d0d0d] px-4 py-3">
                    <span className="text-sm text-white/55">Pay now</span>
                    <span className="text-xl font-black text-[#fbbf24]">₹0</span>
                  </div>

                  {apiError && <p className="mt-4 text-sm font-medium text-[#ff6b7a]">{apiError}</p>}

                  <button type="submit" disabled={loading}
                    className="group relative mt-6 w-full overflow-hidden rounded-full bg-gradient-to-r from-[#ff4f8b] via-[#ff8a3d] to-[#fbbf24] py-4 text-[15px] font-bold text-white shadow-[0_12px_30px_-8px_rgba(255,79,139,.7)] transition-all duration-300 hover:-translate-y-1 disabled:opacity-70"
                    style={{ animation: loading ? "none" : "glowPulse 2.4s infinite" }}>
                    <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative inline-flex items-center justify-center gap-2">
                      {loading ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />Confirming...</>) : (<><Icon name="shield" className="h-5 w-5" />Confirm Booking</>)}
                    </span>
                  </button>
                  <p className="mt-4 text-center text-xs text-white/40">By booking you agree to be contacted on this number.</p>
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#ee5a3b] p-5">
                  <Icon name="phone" className="h-6 w-6 shrink-0 text-[#2b0a03]" />
                  <div>
                    <p className="text-sm font-bold text-[#2b0a03]">Need help booking?</p>
                    <p className="text-sm text-white">{PHONES[0].show} · {PHONES[1].show}</p>
                  </div>
                </div>
                <p className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40"><Icon name="pin" className="h-4 w-4" /> Obra, Sonbhadra, UP</p>
              </aside>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default BookNowPage;