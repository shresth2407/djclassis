import { useState, useEffect, useRef, useMemo, memo } from "react";

/* ════════════════════════════════════════════════════════════
   🪔 SETTINGS — yahan apni Durga Maa ki photo ka path daalo
   - Photo ko apne project ke `public/` folder me rakho
     (jaise public/durga.jpg) aur neeche "/durga.jpg" likho.
   - Agar photo nahi mili to apne aap ek drawn Durga Maa dikhegi.
════════════════════════════════════════════════════════════ */
const DURGA_IMG = "/durga.jpg";

/* ════════════════════════════════════════════
   GLOBAL STYLES  (DJ Classis site)
════════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700;800&family=Noto+Serif+Devanagari:wght@600;800&family=Cinzel+Decorative:wght@700;900&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: 'Inter', sans-serif;
  background: #04040a;
  color: #fff;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::selection { background: rgba(59,130,246,0.35); color: #fff; }

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #04040a; }
::-webkit-scrollbar-thumb { background: #1e3a6e; border-radius: 99px; }

/* ── Keyframes ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; } to { opacity: 1; }
}
@keyframes eqBounce {
  0%   { transform: scaleY(0.2); }
  100% { transform: scaleY(1); }
}
@keyframes vinylSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes gradientShift {
  0%,100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}
@keyframes floatY {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-18px); }
}
@keyframes glowPulse {
  0%,100% { box-shadow: 0 0 30px rgba(59,130,246,0.3); }
  50%      { box-shadow: 0 0 70px rgba(139,92,246,0.55); }
}
@keyframes scanLine {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
@keyframes blink {
  0%,100% { opacity:1; } 50% { opacity:0; }
}
@keyframes slideInLeft {
  from { opacity:0; transform: translateX(-60px); }
  to   { opacity:1; transform: translateX(0); }
}
@keyframes slideInRight {
  from { opacity:0; transform: translateX(60px); }
  to   { opacity:1; transform: translateX(0); }
}
@keyframes countUp {
  from { opacity:0; transform: scale(0.5); }
  to   { opacity:1; transform: scale(1); }
}
@keyframes ripple {
  0%   { transform: scale(0.8); opacity:1; }
  100% { transform: scale(2.5); opacity:0; }
}
@keyframes particleFloat {
  0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity:0.8; }
  33%  { transform: translateY(-30px) translateX(15px) rotate(120deg); opacity:0.5; }
  66%  { transform: translateY(-15px) translateX(-10px) rotate(240deg); opacity:0.7; }
  100% { transform: translateY(0) translateX(0) rotate(360deg); opacity:0.8; }
}

/* ── Utility ── */
.font-orbitron { font-family: 'Orbitron', sans-serif; }

.grad-text {
  background: linear-gradient(135deg, #60a5fa, #a78bfa, #60a5fa);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease infinite;
}

.grad-text-gold {
  background: linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite;
}

/* ── Section titles ── */
.section-eyebrow {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: #60a5fa;
  margin-bottom: 10px;
  display: block;
}

.section-title {
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  font-size: clamp(28px, 5vw, 52px);
  line-height: 1.05;
  color: #fff;
  margin-bottom: 16px;
}

/* ── Cards ── */
.glass-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  transition: all 0.35s ease;
}
.glass-card:hover {
  background: rgba(59,130,246,0.06);
  border-color: rgba(59,130,246,0.25);
  transform: translateY(-6px);
}

/* ── Buttons ── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  box-shadow: 0 0 25px rgba(37,99,235,0.45);
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  opacity: 0;
  transition: opacity 0.3s;
}
.btn-primary:hover::after { opacity: 1; }
.btn-primary:hover {
  box-shadow: 0 0 45px rgba(124,58,237,0.6);
  transform: translateY(-2px);
}
.btn-primary > * { position: relative; z-index: 1; }

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #9ca3af;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.12);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-outline:hover {
  color: #fff;
  border-color: rgba(59,130,246,0.5);
  background: rgba(59,130,246,0.08);
  transform: translateY(-2px);
}

/* ── Responsive containers ── */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 640px) {
  .container { padding: 0 16px; }
}
`;

/* ════════════════════════════════════════════════════════════
   🛕 TEMPLE INTRO — STYLES (keyframes)
════════════════════════════════════════════════════════════ */
const INTRO_STYLES = `
@keyframes flicker {
  0%,100% { transform: scale(1,1) rotate(-1deg); opacity: 1; }
  25%     { transform: scale(.94,1.07) rotate(2deg); opacity: .92; }
  50%     { transform: scale(1.04,.95) rotate(-2deg); opacity: 1; }
  75%     { transform: scale(.96,1.05) rotate(1deg); opacity: .95; }
}
@keyframes glowFlick {
  0%,100% { opacity: .8;  transform: translate(-50%,-50%) scale(1); }
  50%     { opacity: 1;   transform: translate(-50%,-50%) scale(1.12); }
}
@keyframes bellSwing {
  from { transform: rotate(-7deg); }
  to   { transform: rotate(7deg); }
}
@keyframes haloGlow {
  0%,100% { box-shadow: 0 0 30px rgba(255,160,0,.45), 0 0 80px rgba(255,100,0,.25); }
  50%     { box-shadow: 0 0 55px rgba(255,200,60,.7), 0 0 140px rgba(255,120,0,.45); }
}
@keyframes spinSlow {
  from { transform: translate(-50%,-50%) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg); }
}
@keyframes emberRise {
  0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
  15%  { opacity: .9; }
  100% { transform: translateY(-75vh) translateX(var(--dx)) scale(.3); opacity: 0; }
}
@keyframes petalFall {
  0%   { transform: translate(0,0) rotate(0deg); opacity: 0; }
  10%  { opacity: 1; }
  100% { transform: translate(var(--dx), 108vh) rotate(var(--rot)); opacity: .9; }
}
@keyframes lightBurst {
  0%   { opacity: 0; transform: scale(.6); }
  30%  { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.4); }
}
@keyframes hintPulse {
  0%,100% { opacity: .72; }
  50%     { opacity: 1; }
}
@keyframes markerPulse {
  0%   { transform: translate(-50%,-50%) scale(.6); opacity: .9; }
  100% { transform: translate(-50%,-50%) scale(2.6); opacity: 0; }
}

.flame { transform-origin: 50px 64px; animation: flicker 1.3s ease-in-out infinite; }
.diya-glow { animation: glowFlick 1.6s ease-in-out infinite; }

.skip-btn {
  position: absolute; top: 14px; right: 14px; z-index: 7;
  padding: 8px 16px; border-radius: 99px;
  border: 1px solid rgba(255,200,90,.45);
  background: rgba(40,8,4,.55);
  color: #ffd978; font-family: 'Inter', sans-serif;
  font-size: 12px; font-weight: 600; letter-spacing: .08em;
  cursor: pointer; backdrop-filter: blur(6px);
  transition: all .25s ease;
}
.skip-btn:hover { background: rgba(255,170,40,.2); border-color: #ffd978; }
.skip-btn:focus-visible { outline: 2px solid #ffd978; outline-offset: 3px; }
`;

/* ════════════════════════════════════════════
   ANIMATED PARTICLES BACKGROUND
════════════════════════════════════════════ */
const Particles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.id % 3 === 0 ? "#3b82f6" : p.id % 3 === 1 ? "#8b5cf6" : "#fbbf24",
            opacity: 0.4,
            animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

/* ════════════════════════════════════════════
   EQUALIZER BARS
════════════════════════════════════════════ */
const Equalizer = ({ bars = 14, height = 40, color = "blue" }) => {
  const heights = useMemo(() => Array.from({ length: bars }, () => Math.random() * 60 + 30), [bars]);
  const grad =
    color === "gold"
      ? "linear-gradient(to top, #f59e0b, #fbbf24)"
      : "linear-gradient(to top, #2563eb, #8b5cf6)";

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height }}>
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            width: 4,
            borderRadius: 3,
            background: grad,
            height: `${h}%`,
            animation: `eqBounce ${0.5 + i * 0.07}s ease-in-out ${i * 0.05}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

/* ════════════════════════════════════════════
   VINYL RECORD
════════════════════════════════════════════ */
const VinylRecord = () => (
  <div style={{ position: "relative", width: "100%", maxWidth: 420, aspectRatio: "1/1" }}>
    {/* Outer ambient glow */}
    <div style={{
      position: "absolute", inset: "-15%",
      background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
      borderRadius: "50%",
      animation: "glowPulse 3s ease-in-out infinite",
    }} />

    {/* Float wrapper */}
    <div style={{ animation: "floatY 5s ease-in-out infinite", width: "100%", height: "100%" }}>
      {/* Spinning record */}
      <div style={{
        width: "100%", height: "100%",
        borderRadius: "50%",
        background: "linear-gradient(145deg, #111114, #1a1a1f)",
        animation: "vinylSpin 5s linear infinite",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 0 60px rgba(59,130,246,0.2), inset 0 0 40px rgba(0,0,0,0.8)",
      }}>
        {/* Groove rings */}
        {[88, 78, 68, 58, 48, 38].map((s, i) => (
          <div key={i} style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: `${s}%`, height: `${s}%`,
            borderRadius: "50%",
            border: `1px solid rgba(${i % 2 === 0 ? "59,130,246" : "139,92,246"},${0.06 + i * 0.02})`,
          }} />
        ))}

        {/* Sheen */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.04) 15%, transparent 30%, rgba(255,255,255,0.02) 50%, transparent 70%)",
        }} />

        {/* Center label */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "32%", height: "32%", borderRadius: "50%",
          background: "linear-gradient(135deg, #1e3a8a, #4c1d95)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 20px rgba(139,92,246,0.4)",
        }}>
          <span style={{
            fontFamily: "Orbitron, sans-serif", fontWeight: 900,
            fontSize: "clamp(5px, 1.5vw, 9px)", color: "#fff",
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}>DJ</span>
          <span style={{
            fontFamily: "Orbitron, sans-serif", fontWeight: 700,
            fontSize: "clamp(4px, 1.2vw, 7px)", color: "#93c5fd",
            letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 1,
          }}>CLASSIS</span>
        </div>

        {/* Center hole */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 10, height: 10, borderRadius: "50%",
          background: "#04040a", border: "1px solid #333",
        }} />
      </div>
    </div>

    {/* Tonearm */}
    <div style={{
      position: "absolute", top: "4%", right: "8%",
      width: "38%", height: 3,
      background: "linear-gradient(90deg, #9ca3af, #e5e7eb)",
      borderRadius: 99,
      transformOrigin: "100% 50%",
      transform: "rotate(-28deg)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
    }}>
      <div style={{
        position: "absolute", left: -4, top: "50%",
        transform: "translateY(-50%)",
        width: 10, height: 10, borderRadius: "50%",
        background: "#6b7280",
        boxShadow: "0 0 4px rgba(0,0,0,0.5)",
      }} />
    </div>
  </div>
);

/* ════════════════════════════════════════════
   HERO SECTION
════════════════════════════════════════════ */
const Hero = () => (
  <section id="home" style={{
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(180deg, #04040a 0%, #06060f 60%, #04040a 100%)",
    overflow: "hidden",
  }}>
    {/* Grid background */}
    <div style={{
      position: "absolute", inset: 0, opacity: 0.07,
      backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
      backgroundSize: "70px 70px",
    }} />

    {/* Radial spotlight */}
    <div style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)",
    }} />

    {/* Scan line effect */}
    <div style={{
      position: "absolute", left: 0, right: 0, height: 2,
      background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.15), transparent)",
      animation: "scanLine 8s linear infinite",
      pointerEvents: "none",
    }} />

    <Particles />

    <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: 100, paddingBottom: 60 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 60,
        alignItems: "center",
      }}
        className="hero-grid"
      >
        {/* ── Left ── */}
        <div style={{ animation: "slideInLeft 0.9s ease both" }}>
          {/* Live badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 16px", borderRadius: 99,
            border: "1px solid rgba(59,130,246,0.3)",
            background: "rgba(59,130,246,0.08)",
            marginBottom: 24,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#4ade80",
              animation: "blink 1.5s ease-in-out infinite",
            }} />
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.3em",
              textTransform: "uppercase", color: "#93c5fd",
            }}>Available for Events</span>
          </div>

          {/* Main headline */}
          <div style={{ marginBottom: 8 }}>
            <h1 className="font-orbitron" style={{
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 900,
              lineHeight: 0.9,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}>
              DJ
            </h1>
            <h1 className="font-orbitron grad-text" style={{
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
            }}>
              CLASSIS
            </h1>
          </div>

          <p style={{
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.42em", textTransform: "uppercase",
            color: "#f59e0b", marginBottom: 20,
          }}>
            &amp; Keshari Generator
          </p>

          {/* Equalizer */}
          <div style={{ marginBottom: 20 }}>
            <Equalizer bars={16} height={36} />
          </div>

          <p style={{
            color: "#6b7280", fontSize: "clamp(14px, 1.6vw, 17px)",
            lineHeight: 1.7, maxWidth: 460, marginBottom: 36,
          }}>
            Bass-driven. Beat-perfected. DJ Classis crafts sonic experiences that move crowds and turn ordinary nights into unforgettable memories.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
            <a href="#contact" className="btn-primary">
              <span>Book DJ Classis</span>
              <span style={{ fontSize: 14 }}>→</span>
            </a>
            <a href="#mixes" className="btn-outline">
              <span style={{
                width: 24, height: 24, borderRadius: "50%",
                border: "1.5px solid currentColor",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: 10,
              }}>▶</span>
              <span>Listen Now</span>
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
            {[["500+", "Events Done"], ["10+", "Years Active"], ["50K+", "Crowd Moved"]].map(([n, l]) => (
              <div key={l}>
                <p className="font-orbitron grad-text" style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 900, lineHeight: 1 }}>
                  {n}
                </p>
                <p style={{ fontSize: 10, color: "#4b5563", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: 4, fontWeight: 600 }}>
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Vinyl ── */}
        <div style={{ animation: "slideInRight 0.9s ease both", display: "flex", justifyContent: "center" }}>
          <VinylRecord />
        </div>
      </div>
    </div>

    {/* Bottom fade */}
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
      background: "linear-gradient(to top, #04040a, transparent)",
      pointerEvents: "none",
    }} />

    <style>{`
      @media (max-width: 768px) {
        .hero-grid {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
          text-align: center;
        }
        .hero-grid > div:last-child {
          order: -1;
          max-width: 280px;
          margin: 0 auto;
        }
        .hero-grid .btn-primary, .hero-grid .btn-outline {
          justify-content: center;
        }
      }
    `}</style>
  </section>
);

/* ════════════════════════════════════════════
   ABOUT SECTION
════════════════════════════════════════════ */
const About = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const genres = [
    ["Bollywood", 95, "#3b82f6"],
    ["EDM / House", 88, "#8b5cf6"],
    ["Bhojpuri", 92, "#f59e0b"],
    ["Hip-Hop", 80, "#10b981"],
  ];

  return (
    <section id="about" ref={ref} style={{ padding: "100px 0", background: "#04040a" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="section-eyebrow">Who We Are</span>
          <h2 className="section-title">
            The Sound Behind{" "}
            <span className="grad-text">Every Party</span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
        }} className="about-grid">
          {/* Left */}
          <div style={{
            animation: visible ? "slideInLeft 0.8s ease both" : "none",
          }}>
            <p style={{ color: "#9ca3af", fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
              DJ Classis & Keshari Generator brings raw energy and precision mixing to every stage. With over a decade of experience across weddings, corporate events, and club nights — we deliver a sound that hits deep.
            </p>
            <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
              From Bhojpuri bangers to Bollywood anthems and international EDM — we read the crowd and keep the floor moving all night long.
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Weddings", "Club Nights", "Corporate", "Private Events", "Open Air", "VIP Parties"].map((t) => (
                <span key={t} style={{
                  padding: "8px 16px",
                  borderRadius: 99,
                  border: "1px solid rgba(59,130,246,0.2)",
                  background: "rgba(59,130,246,0.06)",
                  fontSize: 12, fontWeight: 600,
                  color: "#93c5fd", letterSpacing: "0.05em",
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right: skill bars */}
          <div className="glass-card" style={{
            padding: 32,
            animation: visible ? "slideInRight 0.8s ease both" : "none",
          }}>
            <p className="font-orbitron" style={{
              fontSize: 13, fontWeight: 700, color: "#fff",
              letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 28,
            }}>Genre Expertise</p>
            {genres.map(([name, pct, clr]) => (
              <div key={name} style={{ marginBottom: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db" }}>{name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: clr }}>{pct}%</span>
                </div>
                <div style={{
                  height: 5, background: "#111827", borderRadius: 99, overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: visible ? `${pct}%` : "0%",
                    background: `linear-gradient(90deg, ${clr}99, ${clr})`,
                    borderRadius: 99,
                    transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${genres.findIndex(([n]) => n === name) * 0.15}s`,
                    boxShadow: `0 0 10px ${clr}55`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
};

/* ════════════════════════════════════════════
   SERVICES SECTION
════════════════════════════════════════════ */
const Services = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const services = [
    { icon: "◈", title: "Live DJ Sets", desc: "High-energy live performances with seamless transitions and precision crowd reading." },
    { icon: "◇", title: "Wedding DJ", desc: "Elegant sound for your special day — from ceremony to reception, we set the perfect tone." },
    { icon: "◉", title: "Studio Mixes", desc: "Custom mixtapes and DJ sets crafted to your vibe, mood, and occasion." },
    { icon: "◫", title: "Sound Setup", desc: "Professional-grade sound system rental and full setup for events of any scale." },
    { icon: "◐", title: "Bhojpuri Night", desc: "Specialty nights with the hottest Bhojpuri tracks — a crowd favourite every time." },
    { icon: "◑", title: "Club Residency", desc: "Regular club nights that build loyal crowds and legendary energy on the floor." },
  ];

  return (
    <section id="mixes" ref={ref} style={{
      padding: "100px 0",
      background: "linear-gradient(180deg, #04040a 0%, #060614 50%, #04040a 100%)",
    }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="section-eyebrow" style={{ color: "#a78bfa" }}>What We Offer</span>
          <h2 className="section-title">
            Premium{" "}
            <span className="grad-text">Services</span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }} className="services-grid">
          {services.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              className="glass-card"
              style={{
                padding: "28px 24px",
                animation: visible ? `fadeUp 0.6s ease ${i * 0.1}s both` : "none",
                cursor: "default",
              }}
            >
              <div style={{
                width: 44, height: 44,
                borderRadius: 12,
                background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2))",
                border: "1px solid rgba(59,130,246,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, color: "#60a5fa",
                marginBottom: 18,
              }}>{icon}</div>
              <div style={{
                width: 36, height: 2,
                background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                borderRadius: 99, marginBottom: 16,
              }} />
              <h3 className="font-orbitron" style={{
                fontSize: 12, fontWeight: 700, color: "#fff",
                letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10,
              }}>{title}</h3>
              <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .services-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

/* ════════════════════════════════════════════
   EVENTS SECTION
════════════════════════════════════════════ */
const Events = () => {
  const events = [
    { date: "JUL 12", day: "Saturday", venue: "Pulse Club", city: "Kanpur, UP", type: "Club Night", hot: true },
    { date: "JUL 20", day: "Sunday", venue: "Grand Banquet Hall", city: "Lucknow, UP", type: "Wedding", hot: false },
    { date: "AUG 02", day: "Sunday", venue: "Open Sky Arena", city: "Prayagraj, UP", type: "Festival", hot: true },
    { date: "AUG 15", day: "Saturday", venue: "Sky Lounge Rooftop", city: "Varanasi, UP", type: "Private", hot: false },
    { date: "SEP 05", day: "Friday", venue: "Club Elevate", city: "Agra, UP", type: "Club Night", hot: false },
  ];

  return (
    <section id="events" style={{ padding: "100px 0", background: "#04040a" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="section-eyebrow" style={{ color: "#fbbf24" }}>Live Calendar</span>
          <h2 className="section-title">
            Upcoming{" "}
            <span className="grad-text-gold">Events</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {events.map(({ date, day, venue, city, type, hot }, i) => (
            <div
              key={date}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "20px 28px",
                borderRadius: 14,
                border: `1px solid ${hot ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.06)"}`,
                background: hot ? "rgba(245,158,11,0.04)" : "rgba(255,255,255,0.02)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                animation: `fadeUp 0.5s ease ${i * 0.08}s both`,
                flexWrap: "wrap",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
                e.currentTarget.style.background = "rgba(59,130,246,0.05)";
                e.currentTarget.style.transform = "translateX(6px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = hot ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.06)";
                e.currentTarget.style.background = hot ? "rgba(245,158,11,0.04)" : "rgba(255,255,255,0.02)";
                e.currentTarget.style.transform = "none";
              }}
            >
              {/* Date */}
              <div style={{ minWidth: 70, textAlign: "center" }}>
                <p className="font-orbitron" style={{ fontSize: 15, fontWeight: 900, color: "#fbbf24" }}>{date}</p>
                <p style={{ fontSize: 9, color: "#4b5563", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 2 }}>{day}</p>
              </div>

              {/* Divider */}
              <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.07)", flexShrink: 0 }} />

              {/* Info */}
              <div style={{ flex: 1, minWidth: 140 }}>
                <p style={{ fontWeight: 700, color: "#fff", fontSize: 15, marginBottom: 3 }}>{venue}</p>
                <p style={{ color: "#6b7280", fontSize: 12 }}>{city}</p>
              </div>

              {/* Type badge */}
              <span style={{
                padding: "5px 14px", borderRadius: 99,
                fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase",
                border: "1px solid rgba(59,130,246,0.25)",
                color: "#60a5fa", background: "rgba(59,130,246,0.1)",
              }}>{type}</span>

              {hot && (
                <span style={{
                  padding: "4px 10px", borderRadius: 99,
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#f87171",
                }}>HOT</span>
              )}

              {/* Arrow */}
              <span style={{ color: "#374151", fontSize: 18, transition: "color 0.2s" }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════
   CTA BANNER
════════════════════════════════════════════ */
const CtaBanner = () => (
  <section style={{
    padding: "80px 0",
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
    position: "relative", overflow: "hidden",
  }}>
    {/* Noise texture */}
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: "radial-gradient(circle at 20% 50%, rgba(59,130,246,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(139,92,246,0.15) 0%, transparent 50%)",
    }} />

    <div className="container" style={{ position: "relative", textAlign: "center" }}>
      <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
        <Equalizer bars={10} height={28} />
      </div>
      <h2 className="font-orbitron" style={{
        fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900,
        color: "#fff", lineHeight: 1.1, marginBottom: 16,
      }}>
        Ready to Drop the Beat?
      </h2>
      <p style={{ color: "#94a3b8", fontSize: 16, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
        Book DJ Classis for your next event and give your crowd a night they will never forget.
      </p>
      <a href="#contact" className="btn-primary" style={{ fontSize: 12, padding: "16px 40px" }}>
        <span>Get a Free Quote</span>
        <span>→</span>
      </a>
    </div>
  </section>
);

/* ════════════════════════════════════════════
   CONTACT SECTION
════════════════════════════════════════════ */
const Contact = () => (
  <section id="contact" style={{ padding: "100px 0", background: "#04040a" }}>
    <div className="container">
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <span className="section-eyebrow">Get in Touch</span>
        <h2 className="section-title">
          Book <span className="grad-text">DJ Classis</span>
        </h2>
        <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 440, margin: "0 auto" }}>
          Fill the form and we will get back within 24 hours with pricing and availability.
        </p>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div className="glass-card" style={{ padding: "44px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
            {["Your Name", "Phone Number"].map((ph) => (
              <input key={ph} type="text" placeholder={ph} style={{
                width: "100%", background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
                padding: "14px 18px", fontSize: 13, color: "#d1d5db",
                outline: "none", fontFamily: "Inter, sans-serif",
                transition: "border-color 0.25s",
              }}
                onFocus={e => e.target.style.borderColor = "rgba(59,130,246,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            ))}
          </div>

          <input type="text" placeholder="Event Type (Wedding / Club / Corporate)" style={{
            width: "100%", background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
            padding: "14px 18px", fontSize: 13, color: "#d1d5db",
            outline: "none", fontFamily: "Inter, sans-serif",
            marginBottom: 16, display: "block",
          }}
            onFocus={e => e.target.style.borderColor = "rgba(59,130,246,0.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
          />

          <input type="text" placeholder="Event Date & Venue" style={{
            width: "100%", background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
            padding: "14px 18px", fontSize: 13, color: "#d1d5db",
            outline: "none", fontFamily: "Inter, sans-serif",
            marginBottom: 16, display: "block",
          }}
            onFocus={e => e.target.style.borderColor = "rgba(59,130,246,0.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
          />

          <textarea rows={4} placeholder="Tell us more about your event — expected crowd size, vibe, special requests..." style={{
            width: "100%", background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
            padding: "14px 18px", fontSize: 13, color: "#d1d5db",
            outline: "none", fontFamily: "Inter, sans-serif",
            marginBottom: 24, display: "block", resize: "none",
          }}
            onFocus={e => e.target.style.borderColor = "rgba(59,130,246,0.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
          />

          <button className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "16px 24px", fontSize: 12 }}>
            <span>Send Booking Request</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>

    <style>{`
      @media (max-width: 560px) {
        .form-row { grid-template-columns: 1fr !important; }
        .glass-card { padding: 28px 20px !important; }
      }
    `}</style>
  </section>
);

/* ════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════ */
const Footer = () => (
  <footer style={{
    borderTop: "1px solid rgba(255,255,255,0.05)",
    background: "#04040a",
    padding: "36px 0",
  }}>
    <div className="container" style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20,
    }}>
      <div>
        <p className="font-orbitron" style={{ fontWeight: 900, fontSize: 16, letterSpacing: "0.15em", color: "#fff" }}>
          DJ <span className="grad-text">CLASSIS</span>
        </p>
        <p style={{ fontSize: 10, color: "#374151", letterSpacing: "0.3em", textTransform: "uppercase", marginTop: 4 }}>
          &amp; Keshari Generator
        </p>
      </div>

      <p style={{ color: "#374151", fontSize: 12 }}>
        &copy; {new Date().getFullYear()} DJ Classis. All rights reserved.
      </p>

      <div style={{ display: "flex", gap: 24 }}>
        {["Instagram", "YouTube", "Facebook"].map((s) => (
          <a key={s} href="#" style={{
            fontSize: 12, fontWeight: 600,
            color: "#4b5563", textDecoration: "none",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = "#60a5fa"}
            onMouseLeave={e => e.target.style.color = "#4b5563"}
          >{s}</a>
        ))}
      </div>
    </div>
  </footer>
);

/* ════════════════════════════════════════════════════════════
   🛕 TEMPLE INTRO  — Durga Maa · Diya Aarti · Opening Doors
════════════════════════════════════════════════════════════ */

/* Temple palette: kesar · gold · sindoor · maroon */
const T = {
  gold: "#ffd978",
  goldDeep: "#b8860b",
  kesar: "#ff9933",
  sindoor: "#c62828",
  maroon: "#4d0f0a",
};

const viewportNow = () => ({
  w: typeof window === "undefined" ? 1280 : window.innerWidth,
  h: typeof window === "undefined" ? 800 : window.innerHeight,
});

const useViewport = () => {
  const [vp, setVp] = useState(viewportNow);
  useEffect(() => {
    const onResize = () => setVp(viewportNow());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return vp;
};

/* Temple bell sound (Web Audio, no file needed) */
const playBell = () => {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    [523.25, 1046.5, 1568, 2093].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.28 / (i + 1), now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(now);
      o.stop(now + 2.9);
    });
    setTimeout(() => ctx.close(), 3200);
  } catch (e) {
    /* audio blocked — ignore */
  }
};

/* ── Diya (clay lamp with flame) ── */
const Diya = ({ size = 80 }) => (
  <svg width={size} height={size * 1.24} viewBox="0 0 100 124" style={{ overflow: "visible", display: "block" }}>
    {/* flame */}
    <g className="flame">
      <path d="M50 4 C66 28 74 44 50 64 C26 44 34 28 50 4Z" fill="#ff9d00" />
      <path d="M50 28 C59 41 61 51 50 61 C39 51 41 41 50 28Z" fill="#fff1a8" />
    </g>
    {/* wick */}
    <rect x="48.5" y="62" width="3" height="9" rx="1.5" fill="#3b1a08" />
    {/* bowl */}
    <path d="M8 72 Q50 66 92 72 Q88 108 50 110 Q12 108 8 72Z" fill="#b9541f" />
    <path d="M14 84 Q50 92 86 84" stroke="#ffd978" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <ellipse cx="50" cy="72" rx="42" ry="7" fill="#d9742c" />
    <ellipse cx="50" cy="72" rx="33" ry="4.2" fill="#5a2a0a" />
    {/* plate */}
    <ellipse cx="50" cy="113" rx="47" ry="7" fill="#c8921a" />
    <ellipse cx="50" cy="111" rx="47" ry="6" fill="#ffd978" opacity=".85" />
  </svg>
);

/* ── Durga Maa (drawn fallback if photo is missing) ── */
const DurgaSVG = () => {
  const SX = 150, SY = 185, R = 105;
  const arms = [
    { a: 200, t: "trishul" }, { a: 220, t: "chakra" }, { a: 240, t: "sword" },
    { a: 260, t: "lotus" }, { a: 280, t: "conch" }, { a: 300, t: "bow" },
    { a: 320, t: "mace" }, { a: 340, t: "bless" },
  ];
  const rad = (d) => (d * Math.PI) / 180;
  const gold = "#e8b923";
  const skin = "#f3b98c";

  const item = (t) => {
    switch (t) {
      case "trishul":
        return (<g stroke={gold} strokeWidth="3" fill="none" strokeLinecap="round">
          <line x1="0" y1="10" x2="0" y2="-40" />
          <path d="M-9 -36 L-9 -50 M9 -36 L9 -50 M0 -40 L0 -56 M-9 -36 Q0 -30 9 -36" />
        </g>);
      case "chakra":
        return (<g fill="none" stroke={gold} strokeWidth="3">
          <circle cx="0" cy="-20" r="14" strokeDasharray="5 3" />
          <circle cx="0" cy="-20" r="9" />
          <circle cx="0" cy="-20" r="3" fill={gold} />
        </g>);
      case "sword":
        return (<g strokeLinecap="round">
          <line x1="0" y1="8" x2="0" y2="-50" stroke="#e5e7eb" strokeWidth="4" />
          <line x1="-8" y1="-2" x2="8" y2="-2" stroke={gold} strokeWidth="3" />
        </g>);
      case "lotus":
        return (<g>
          <circle cx="0" cy="-12" r="9" fill="#f48fb1" />
          <circle cx="0" cy="-12" r="5" fill="#f8bbd0" />
        </g>);
      case "conch":
        return <ellipse cx="0" cy="-16" rx="8" ry="12" fill="#fff8e1" stroke={gold} strokeWidth="2" />;
      case "bow":
        return (<g fill="none" strokeLinecap="round">
          <path d="M-4 -42 Q-28 -14 -4 14" stroke="#8d5524" strokeWidth="3.5" />
          <line x1="-4" y1="-42" x2="-4" y2="14" stroke="#fff" strokeWidth="1" />
        </g>);
      case "mace":
        return (<g>
          <line x1="0" y1="8" x2="0" y2="-34" stroke={gold} strokeWidth="4" strokeLinecap="round" />
          <circle cx="0" cy="-42" r="10" fill={gold} />
        </g>);
      default:
        return <circle cx="0" cy="-8" r="8" fill={skin} />;
    }
  };

  return (
    <svg viewBox="0 0 300 380" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block", background: "linear-gradient(#5a0f0a,#2a0606)" }}>
      {/* halo */}
      <circle cx="150" cy="170" r="140" fill="rgba(255,193,7,.10)" />
      <circle cx="150" cy="170" r="118" fill="rgba(255,193,7,.16)" />
      <circle cx="150" cy="170" r="96" fill="rgba(255,213,79,.22)" />
      {Array.from({ length: 24 }, (_, i) => (
        <line key={i} x1={150 + 100 * Math.cos(rad(i * 15))} y1={170 + 100 * Math.sin(rad(i * 15))}
          x2={150 + 145 * Math.cos(rad(i * 15))} y2={170 + 145 * Math.sin(rad(i * 15))}
          stroke="rgba(255,213,79,.35)" strokeWidth="2" />
      ))}

      {/* lion */}
      <ellipse cx="160" cy="348" rx="112" ry="28" fill="#e69a28" />
      <circle cx="58" cy="322" r="36" fill="#b35a12" />
      <circle cx="58" cy="325" r="23" fill="#f0b04a" />
      <circle cx="50" cy="320" r="3" fill="#2b1206" /><circle cx="66" cy="320" r="3" fill="#2b1206" />
      <path d="M52 334 Q58 340 64 334" stroke="#7a2c0a" strokeWidth="2.5" fill="none" />
      <path d="M270 340 Q292 318 284 296" stroke="#e69a28" strokeWidth="7" fill="none" strokeLinecap="round" />

      {/* arms */}
      {arms.map(({ a, t }) => {
        const hx = SX + R * Math.cos(rad(a)), hy = SY + R * Math.sin(rad(a));
        const cx = SX + 62 * Math.cos(rad(a + 10)), cy = SY + 62 * Math.sin(rad(a + 10));
        return (
          <g key={a}>
            <path d={`M${SX} ${SY} Q${cx} ${cy} ${hx} ${hy}`} stroke={skin} strokeWidth="9" fill="none" strokeLinecap="round" />
            <circle cx={(SX + hx) / 2 + (cx - (SX + hx) / 2) * 0.5} cy={(SY + hy) / 2 + (cy - (SY + hy) / 2) * 0.5} r="4" fill={gold} />
            <g transform={`translate(${hx} ${hy}) rotate(${a + 90})`}>{item(t)}</g>
            <circle cx={hx} cy={hy} r="6" fill={skin} />
          </g>
        );
      })}

      {/* saree */}
      <path d="M116 178 Q150 166 184 178 L216 324 Q150 340 84 324 Z" fill="#c62828" />
      <path d="M116 178 Q150 166 184 178 L216 324 Q150 340 84 324 Z" fill="none" stroke="#ffd54f" strokeWidth="3" />
      {[-40, -20, 0, 20, 40].map((d) => (
        <line key={d} x1={150 + d * 0.3} y1="210" x2={150 + d * 1.5} y2="330" stroke="#8e0000" strokeWidth="2" opacity=".7" />
      ))}
      <path d="M122 178 Q150 170 178 178 L172 206 Q150 216 128 206Z" fill="#f9a825" />
      <path d="M128 186 Q150 216 172 186" stroke="#ffd54f" strokeWidth="3" fill="none" />
      <circle cx="150" cy="206" r="4.5" fill="#c62828" stroke="#ffd54f" strokeWidth="1.5" />

      {/* head */}
      <rect x="143" y="160" width="14" height="22" fill={skin} />
      <ellipse cx="150" cy="140" rx="21" ry="26" fill={skin} />
      <path d="M129 138 Q128 108 150 106 Q172 108 171 138 Q160 120 150 120 Q140 120 129 138Z" fill="#1b0b05" />
      <path d="M126 112 L132 88 L141 104 L150 78 L159 104 L168 88 L174 112 Z" fill="#ffd54f" stroke={T.goldDeep} strokeWidth="1.5" />
      <circle cx="150" cy="96" r="3.5" fill="#c62828" />
      <path d="M138 139 Q143 135 147 139 M153 139 Q157 135 162 139" stroke="#1b0b05" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="150" cy="127" r="2.8" fill="#c62828" />
      <path d="M150 140 L148 148 L152 148" stroke="#c98d62" strokeWidth="1.4" fill="none" />
      <path d="M144 153 Q150 158 156 153" stroke="#b71c1c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="129" cy="149" r="3.6" fill={gold} /><circle cx="171" cy="149" r="3.6" fill={gold} />
    </svg>
  );
};

/* Photo with automatic fallback to the drawn Durga */
const DurgaPhoto = () => {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img
      src={DURGA_IMG}
      alt="Maa Durga"
      draggable={false}
      onError={() => setOk(false)}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  ) : (
    <DurgaSVG />
  );
};

/* ── Hanging bell ── */
const Bell = ({ x, delay }) => (
  <div style={{
    position: "absolute", left: x - 18, top: 0, width: 36,
    transformOrigin: "50% 0",
    animation: `bellSwing 3.2s ease-in-out ${delay}s infinite alternate`,
  }}>
    <div style={{ width: 2, height: 78, margin: "0 auto", background: `linear-gradient(#8a5a0c, ${T.gold})` }} />
    <svg width="36" height="42" viewBox="0 0 36 42" style={{ display: "block" }}>
      <path d="M18 2 C28 2 30 16 32 28 L35 33 L1 33 L4 28 C6 16 8 2 18 2Z" fill="#f5b942" stroke={T.goldDeep} strokeWidth="1.2" />
      <path d="M9 24 Q18 28 27 24" stroke="#fff3b0" strokeWidth="1.5" fill="none" opacity=".7" />
      <circle cx="18" cy="37" r="4" fill="#d99a1c" />
    </svg>
  </div>
);

/* ── Static diya placed on the temple altar ── */
const AltarDiya = ({ x, top, size = 52 }) => (
  <div style={{ position: "absolute", left: x - size / 2, top, width: size }}>
    <div className="diya-glow" style={{
      position: "absolute", left: "50%", top: "30%", width: size * 4, height: size * 4,
      background: "radial-gradient(circle, rgba(255,170,40,.5), rgba(255,120,0,.14) 42%, transparent 70%)",
      pointerEvents: "none",
    }} />
    <div style={{ position: "relative" }}><Diya size={size} /></div>
  </div>
);

/* ── The whole temple scene (rendered twice: once per door half) ── */
const TempleScene = memo(({ w, h, fw, fh, cy }) => {
  const cx = w / 2;
  const frameTop = cy - fh / 2;
  const frameBottom = cy + fh / 2;
  const pillarW = Math.max(30, Math.min(w * 0.07, 80));
  const dot = Math.max(12, Math.min(w / 55, 22));
  const swags = Math.max(2, Math.round(w / 420));
  const perSwag = 15;
  const marigold = ["#ff8f00", "#ffb300", "#e65100", "#ffca28"];

  const garland = [];
  for (let s = 0; s < swags; s++) {
    for (let i = 0; i <= perSwag; i++) {
      const t = i / perSwag;
      garland.push({
        k: `${s}-${i}`,
        x: (s + t) * (w / swags),
        y: 40 + 46 * Math.sin(Math.PI * t),
        c: marigold[(i + s) % 4],
      });
    }
  }

  const sideOffset = Math.min(fw / 2 + 46, w / 2 - 34);
  const textSize = Math.max(22, Math.min(w * 0.035, 42));
  const framePad = 6;
  const outerW = fw + framePad * 2;

  const pillar = (side) => (
    <div key={side} style={{
      position: "absolute", top: 0, bottom: 0, [side]: 0, width: pillarW,
      background: "linear-gradient(90deg,#3a0d04 0%,#c8921a 22%,#f6d36b 40%,#8a5a0c 70%,#3a0d04 100%)",
      boxShadow: side === "left" ? "6px 0 22px rgba(0,0,0,.65)" : "-6px 0 22px rgba(0,0,0,.65)",
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(180deg, rgba(0,0,0,.38) 0 3px, transparent 3px 70px)" }} />
      <div style={{ position: "absolute", left: -6, right: -6, top: 0, height: 28, borderRadius: 4, background: "linear-gradient(#ffe08a,#9a6a10)" }} />
      <div style={{ position: "absolute", left: -6, right: -6, bottom: 0, height: 24, borderRadius: 4, background: "linear-gradient(#9a6a10,#ffe08a)" }} />
    </div>
  );

  return (
    <div style={{
      position: "absolute", inset: 0, overflow: "hidden",
      background: "radial-gradient(ellipse at 50% 46%, #8a2410 0%, #4d0f0a 38%, #1d0505 78%, #0c0202 100%)",
      fontFamily: "'Noto Serif Devanagari', serif",
    }}>
      {/* carved dot pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.55,
        backgroundImage: "radial-gradient(circle at center, rgba(255,200,80,.16) 1.6px, transparent 2.4px)",
        backgroundSize: "34px 34px",
      }} />

      {/* rotating divine rays */}
      <div style={{
        position: "absolute", left: cx, top: cy, width: fh * 1.5, height: fh * 1.5,
        borderRadius: "50%",
        background: "repeating-conic-gradient(from 0deg, rgba(255,200,60,.26) 0deg 5deg, transparent 5deg 15deg)",
        WebkitMaskImage: "radial-gradient(circle, #000 32%, transparent 68%)",
        maskImage: "radial-gradient(circle, #000 32%, transparent 68%)",
        animation: "spinSlow 50s linear infinite",
      }} />

      {/* floor */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: frameBottom + 30, bottom: 0,
        background: "linear-gradient(#2a0707, #0e0303)",
        backgroundImage: "linear-gradient(#2a0707, #0e0303), repeating-linear-gradient(90deg, rgba(255,200,80,.07) 0 1px, transparent 1px 90px)",
        backgroundBlendMode: "screen",
      }} />

      {pillar("left")}
      {pillar("right")}

      {/* altar steps */}
      <div style={{ position: "absolute", left: cx - (fw + 70) / 2, top: frameBottom + 6, width: fw + 70, height: 20, borderRadius: 6, background: "linear-gradient(#ffe08a,#9a6a10)", boxShadow: "0 6px 18px rgba(0,0,0,.6)" }} />
      <div style={{ position: "absolute", left: cx - (fw + 130) / 2, top: frameBottom + 26, width: fw + 130, height: 18, borderRadius: 6, background: "linear-gradient(#e0ae3c,#6e4608)", boxShadow: "0 8px 22px rgba(0,0,0,.65)" }} />

      {/* Om */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: Math.max(66, frameTop - 66),
        textAlign: "center", fontSize: Math.max(30, Math.min(w * 0.04, 50)), lineHeight: 1,
        color: T.gold, fontWeight: 800,
        textShadow: "0 0 18px rgba(255,160,0,.9), 0 0 40px rgba(255,100,0,.6)",
      }}>ॐ</div>

      {/* Durga Maa frame */}
      <div style={{
        position: "absolute", left: cx - outerW / 2, top: frameTop - framePad,
        width: outerW, height: fh + framePad * 2, padding: framePad,
        borderRadius: `${outerW / 2}px ${outerW / 2}px 14px 14px`,
        background: "linear-gradient(135deg,#ffe08a,#c68a12 40%,#ffd966 60%,#8a5a0c)",
        animation: "haloGlow 3s ease-in-out infinite",
      }}>
        <div style={{
          width: "100%", height: "100%", overflow: "hidden", background: "#2b0a0a",
          borderRadius: `${fw / 2}px ${fw / 2}px 10px 10px`,
        }}>
          <DurgaPhoto />
        </div>
      </div>

      {/* side diyas */}
      <AltarDiya x={cx - sideOffset} top={frameBottom - 52} />
      <AltarDiya x={cx + sideOffset} top={frameBottom - 52} />

      {/* jai mata di */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: frameBottom + 56, textAlign: "center",
        fontSize: textSize, fontWeight: 800, color: T.gold, letterSpacing: ".04em",
        textShadow: "0 0 16px rgba(255,150,0,.7)",
      }}>जय माता दी</div>
      <div style={{
        position: "absolute", left: 0, right: 0, top: frameBottom + 56 + textSize * 1.7, textAlign: "center",
        fontSize: Math.max(12, textSize * 0.42), fontWeight: 600, color: "rgba(255,217,120,.7)", letterSpacing: ".12em",
      }}>॥ ॐ दुर्गायै नमः ॥</div>

      {/* top beam, garlands, bells */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 14, background: "linear-gradient(#ffe08a,#9a6a10)", boxShadow: "0 4px 14px rgba(0,0,0,.6)" }} />
      {garland.map((g) => (
        <span key={g.k} style={{
          position: "absolute", left: g.x - dot / 2, top: g.y - dot / 2, width: dot, height: dot, borderRadius: "50%",
          background: `radial-gradient(circle at 35% 30%, #fff6c8, ${g.c} 55%, #8a3b00)`,
          boxShadow: "0 2px 4px rgba(0,0,0,.5)",
        }} />
      ))}
      <Bell x={pillarW + 38} delay={0} />
      <Bell x={w - pillarW - 38} delay={0.5} />
    </div>
  );
});

/* ── One door half ── */
const Door = ({ side, open, sceneProps }) => {
  const left = side === "left";
  return (
    <div style={{
      position: "absolute", top: 0, bottom: 0, [left ? "left" : "right"]: 0, width: "50%",
      overflow: "hidden", zIndex: 2,
      transformOrigin: left ? "left center" : "right center",
      transform: open ? `rotateY(${left ? 100 : -100}deg)` : "rotateY(0deg)",
      opacity: open ? 0 : 1,
      transition: "transform 2.1s cubic-bezier(.65,.02,.25,1), opacity .5s ease 1.6s",
      backfaceVisibility: "hidden",
      willChange: "transform",
    }}>
      <div style={{ position: "absolute", top: 0, left: left ? 0 : "-100%", width: "200%", height: "100%" }}>
        <TempleScene {...sceneProps} />
      </div>
      {/* shading + gold seam where the doors meet */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, [left ? "right" : "left"]: 0, width: 26, pointerEvents: "none",
        background: `linear-gradient(${left ? "90deg" : "270deg"}, transparent, rgba(0,0,0,.5))`,
      }} />
      <div style={{
        position: "absolute", top: 0, bottom: 0, [left ? "right" : "left"]: 0, width: 4, pointerEvents: "none",
        background: "linear-gradient(#ffe08a,#b8860b 50%,#ffe08a)",
      }} />
    </div>
  );
};

/* ── Rising embers while waiting ── */
const Embers = memo(() => {
  const items = useMemo(
    () => Array.from({ length: 24 }, (_, i) => ({
      id: i, left: Math.random() * 100, size: 2 + Math.random() * 3,
      dur: 6 + Math.random() * 6, delay: Math.random() * 8, dx: (Math.random() - 0.5) * 120,
    })), []);
  return (
    <>
      {items.map((e) => (
        <span key={e.id} style={{
          position: "absolute", bottom: -10, left: `${e.left}%`, width: e.size, height: e.size, borderRadius: "50%",
          background: i3(e.id), boxShadow: "0 0 8px 2px rgba(255,160,0,.7)", opacity: 0,
          animation: `emberRise ${e.dur}s ease-out ${e.delay}s infinite`, "--dx": `${e.dx}px`,
        }} />
      ))}
    </>
  );
});
const i3 = (i) => (i % 3 === 0 ? "#ffd978" : i % 3 === 1 ? "#ff9933" : "#ffb300");

/* ── Flower petals (pushp varsha) when the doors open ── */
const PetalRain = memo(() => {
  const colors = ["#ff8f00", "#ffb300", "#ff6f00", "#ffca28", "#e53935"];
  const petals = useMemo(
    () => Array.from({ length: 48 }, (_, i) => ({
      id: i, left: Math.random() * 100, size: 10 + Math.random() * 14, dur: 3.5 + Math.random() * 3,
      delay: Math.random() * 1.4, dx: (Math.random() - 0.5) * 180, rot: Math.random() * 720,
      c: colors[i % colors.length],
    })), []);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 4 }}>
      {petals.map((p) => (
        <span key={p.id} style={{
          position: "absolute", top: -30, left: `${p.left}%`, width: p.size, height: p.size * 1.3,
          borderRadius: "60% 40% 60% 40%", opacity: 0,
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,.55), ${p.c})`,
          animation: `petalFall ${p.dur}s ease-in ${p.delay}s forwards`,
          "--dx": `${p.dx}px`, "--rot": `${p.rot}deg`,
        }} />
      ))}
    </div>
  );
});

/* ── MAIN INTRO COMPONENT ── */
const TempleIntro = ({ onOpening }) => {
  const { w, h } = useViewport();
  const [phase, setPhase] = useState("idle"); // idle → opening → revealed → done
  const [progress, setProgress] = useState(0);

  const phaseRef = useRef("idle");
  const timers = useRef([]);
  const sum = useRef(0);
  const lastAngle = useRef(null);
  const lastPct = useRef(0);
  const diyaRef = useRef(null);
  const start = viewportNow();
  const target = useRef({ x: start.w / 2, y: start.h * 0.82 });
  const pos = useRef({ x: start.w / 2, y: start.h * 0.82 });

  /* geometry */
  const fw = Math.min(w * 0.56, h * 0.4);
  const fh = fw * 1.25;
  const cx = w / 2;
  const cy = h * 0.46;
  const ringR = Math.max(60, Math.min(Math.hypot(fw / 2, fh / 2) + 26, w / 2 - 8, cy - 8, h - cy - 8));
  const geo = useRef({});
  geo.current = { cx, cy, ringR };

  /* lock page scroll while the temple is shown */
  useEffect(() => {
    if (phase === "idle" || phase === "opening") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [phase]);

  /* smooth diya following the pointer */
  useEffect(() => {
    if (phase === "done") return;
    let raf;
    const tick = () => {
      const p = pos.current, t = target.current;
      const nx = p.x + (t.x - p.x) * 0.22;
      const ny = p.y + (t.y - p.y) * 0.22;
      const vx = nx - p.x;
      p.x = nx; p.y = ny;
      if (diyaRef.current) {
        const tilt = Math.max(-25, Math.min(25, vx * 2.2));
        diyaRef.current.style.transform =
          `translate3d(${nx}px, ${ny}px, 0) translate(-50%, -62%) rotate(${tilt}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const finish = () => {
    if (phaseRef.current !== "idle") return;
    phaseRef.current = "opening";
    setPhase("opening");
    setProgress(1);
    playBell();
    if (onOpening) onOpening();
    timers.current.push(
      setTimeout(() => { phaseRef.current = "revealed"; setPhase("revealed"); }, 2400),
      setTimeout(() => { phaseRef.current = "done"; setPhase("done"); }, 7800)
    );
  };

  /* Escape / Enter = skip aarti */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" || e.key === "Enter") finish(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* AARTI: count how far the diya has circled around Maa */
  const handleMove = (e) => {
    if (phaseRef.current !== "idle") return;
    const { cx: gx, cy: gy, ringR: gr } = geo.current;
    const x = e.clientX, y = e.clientY;
    target.current = { x, y };

    const dx = x - gx, dy = y - gy;
    if (Math.hypot(dx, dy) < Math.max(50, gr * 0.35)) { lastAngle.current = null; return; }

    const a = Math.atan2(dy, dx);
    if (lastAngle.current !== null) {
      let d = a - lastAngle.current;
      if (d > Math.PI) d -= 2 * Math.PI;
      else if (d < -Math.PI) d += 2 * Math.PI;
      if (Math.abs(d) < 1.2) {
        sum.current += d;
        const p = Math.min(1, Math.abs(sum.current) / (2 * Math.PI * 0.97));
        if (Math.abs(p - lastPct.current) > 0.004 || p >= 1) {
          lastPct.current = p;
          setProgress(p);
        }
        if (p >= 1) finish();
      }
    }
    lastAngle.current = a;
  };

  if (phase === "done") return null;

  const opening = phase !== "idle";
  const C = 2 * Math.PI * ringR;
  const sceneProps = { w, h, fw, fh, cy };
  const pct = Math.round(progress * 100);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999, perspective: 2200, overflow: "hidden",
      pointerEvents: phase === "idle" || phase === "opening" ? "auto" : "none",
    }}>
      <style>{INTRO_STYLES}</style>

      {/* divine light that shines through the opening doors */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0,
        background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(255,226,140,.95), rgba(255,160,40,.55) 40%, transparent 75%)",
        animation: opening ? "lightBurst 2.6s ease-out forwards" : "none",
      }} />

      <Door side="left" open={opening} sceneProps={sceneProps} />
      <Door side="right" open={opening} sceneProps={sceneProps} />

      {/* interaction layer */}
      <div
        onPointerMove={handleMove}
        onPointerDown={handleMove}
        style={{
          position: "absolute", inset: 0, zIndex: 3, cursor: "none", touchAction: "none",
          userSelect: "none", WebkitUserSelect: "none",
          opacity: opening ? 0 : 1, transition: "opacity .7s ease",
          pointerEvents: opening ? "none" : "auto",
        }}
      >
        <Embers />

        {/* aarti path + progress */}
        <svg width={w} height={h} style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}>
          <circle cx={cx} cy={cy} r={ringR} fill="none" stroke="rgba(255,217,120,.35)" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
          <circle
            cx={cx} cy={cy} r={ringR} fill="none" stroke="url(#aartiGrad)" strokeWidth="5" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C * (1 - progress)}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ filter: "drop-shadow(0 0 8px #ffb300)" }}
          />
          <defs>
            <linearGradient id="aartiGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffe08a" />
              <stop offset="100%" stopColor="#ff9933" />
            </linearGradient>
          </defs>
        </svg>

        {/* start marker at the top of the ring */}
        <div style={{ position: "absolute", left: cx, top: cy - ringR, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", left: 0, top: 0, width: 22, height: 22, borderRadius: "50%",
            border: "2px solid #ffd978", animation: "markerPulse 1.8s ease-out infinite",
          }} />
          <div style={{
            position: "absolute", left: 0, top: 0, width: 10, height: 10, borderRadius: "50%",
            transform: "translate(-50%,-50%)", background: "#ffd978", boxShadow: "0 0 12px #ffb300",
          }} />
        </div>

        {/* hint */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: "max(18px, env(safe-area-inset-bottom))",
          textAlign: "center", padding: "0 16px", pointerEvents: "none", zIndex: 5,
        }}>
          <p style={{
            fontFamily: "'Noto Serif Devanagari', serif", color: T.gold, fontWeight: 800,
            fontSize: "clamp(15px, 2.4vw, 22px)", textShadow: "0 0 14px rgba(255,150,0,.7)",
            animation: "hintPulse 2s ease-in-out infinite",
          }}>दीपक घुमाकर माँ की आरती करें</p>
          <p style={{
            fontFamily: "Inter, sans-serif", color: "rgba(245,194,107,.75)", fontSize: 11,
            letterSpacing: ".14em", marginTop: 6,
          }}>
            Move the diya in one full circle around Maa · {pct}%
          </p>
        </div>

        <button
          type="button"
          className="skip-btn"
          aria-label="Skip aarti and open the website"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={finish}
        >
          Skip ›
        </button>

        {/* the diya you hold */}
        <div ref={diyaRef} style={{
          position: "absolute", left: 0, top: 0, width: 84, height: 104, zIndex: 6,
          pointerEvents: "none", transformOrigin: "50% 85%", willChange: "transform",
          transform: `translate3d(${start.w / 2}px, ${start.h * 0.82}px, 0) translate(-50%, -62%)`,
        }}>
          <div className="diya-glow" style={{
            position: "absolute", left: "50%", top: "34%", width: 280, height: 280,
            background: "radial-gradient(circle, rgba(255,170,40,.55), rgba(255,120,0,.18) 40%, transparent 70%)",
          }} />
          <div style={{ position: "relative" }}><Diya size={84} /></div>
        </div>
      </div>

      {opening && <PetalRain />}
    </div>
  );
};

/* ════════════════════════════════════════════
   DJ CLASSIS SITE (unchanged content)
════════════════════════════════════════════ */
const Site = () => (
  <>
    <Hero />
    <About />
    <Services />
    <Events />
    <CtaBanner />
    <Contact />
    <Footer />
  </>
);

/* ════════════════════════════════════════════
   HOME PAGE (default export)
   Temple intro first → doors open → DJ site
════════════════════════════════════════════ */
const Home = () => {
  const [started, setStarted] = useState(false);

  return (
    <>
      <style>{STYLES}</style>
      <TempleIntro
        onOpening={() => {
          window.scrollTo(0, 0);
          setStarted(true);
        }}
      />
      {started && <Site />}
    </>
  );
};

export default Home;