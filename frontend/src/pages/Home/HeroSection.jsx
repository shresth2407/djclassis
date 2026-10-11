import { useMemo } from "react";

/* ════════════════════════════════════════════
   PARTICLES
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
   EQUALIZER BARS  (LowerSection me bhi use hota hai)
════════════════════════════════════════════ */
export const Equalizer = ({ bars = 14, height = 40, color = "blue" }) => {
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
const HeroSection = () => (
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

export default HeroSection;