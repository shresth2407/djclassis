import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════
   GLOBAL STYLES
════════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700;800&display=swap');

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

/* ════════════════════════════════════════════
   ANIMATED PARTICLES BACKGROUND
════════════════════════════════════════════ */
const Particles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 4,
  }));

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
  const heights = Array.from({ length: bars }, () => Math.random() * 60 + 30);
  const grad = color === "gold"
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
      <div style={{ marginBottom: 12 }}>
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

/* ═══════════════════════
   HOME PAGE (default export)
════════════════════════════════════════════ */
const Home = () => (
  <>
    <style>{STYLES}</style>
    <Hero />
    <About />
    <Services />
    <Events />
    <CtaBanner />
    <Contact />
    <Footer />
  </>
);

export default Home;