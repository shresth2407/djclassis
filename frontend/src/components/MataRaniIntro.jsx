import { useState, useEffect, useRef, useMemo, memo } from "react";

/* ════════════════════════════════════════════════════════════
   🛕 MATA RANI INTRO  (ek hi file me sab kuch)
   Durga Maa + Diya Aarti + Darwaza khulna
   Flow: idle → opening → revealed → done

   🪔 Durga Maa ki photo: `frontend/public/durga.jpg` me rakho.
      Path badalna ho to neeche DURGA_IMG badlo.
      Photo na mile to apne aap drawn Durga Maa dikhegi.
════════════════════════════════════════════════════════════ */
const DURGA_IMG = "/durga.jpg";

/* Temple colors: kesar · gold · sindoor · maroon */
const T = { gold: "#ffd978", goldDeep: "#b8860b", kesar: "#ff9933", sindoor: "#c62828", maroon: "#4d0f0a" };

/* ── Keyframes + classes ── */
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

/* ── Helpers ── */
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

/* Temple bell sound (Web Audio, koi audio file nahi chahiye) */
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

/* ── Diya (mitti ka diya + jyot) ── */
const Diya = ({ size = 80 }) => (
  <svg width={size} height={size * 1.24} viewBox="0 0 100 124" style={{ overflow: "visible", display: "block" }}>
    <g className="flame">
      <path d="M50 4 C66 28 74 44 50 64 C26 44 34 28 50 4Z" fill="#ff9d00" />
      <path d="M50 28 C59 41 61 51 50 61 C39 51 41 41 50 28Z" fill="#fff1a8" />
    </g>
    <rect x="48.5" y="62" width="3" height="9" rx="1.5" fill="#3b1a08" />
    <path d="M8 72 Q50 66 92 72 Q88 108 50 110 Q12 108 8 72Z" fill="#b9541f" />
    <path d="M14 84 Q50 92 86 84" stroke="#ffd978" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <ellipse cx="50" cy="72" rx="42" ry="7" fill="#d9742c" />
    <ellipse cx="50" cy="72" rx="33" ry="4.2" fill="#5a2a0a" />
    <ellipse cx="50" cy="113" rx="47" ry="7" fill="#c8921a" />
    <ellipse cx="50" cy="111" rx="47" ry="6" fill="#ffd978" opacity=".85" />
  </svg>
);

/* Altar par rakha hua diya */
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

/* ── Durga Maa (photo na mile to ye drawn wali dikhegi) ── */
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

      {/* sher */}
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

/* Photo (agar load na ho to drawn Durga) */
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

/* ── Latakti hui ghanti ── */
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

/* ── Mandir ka poora scene (har darwaze ke aadhe hisse ke liye 2 baar render hota hai) ── */
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

      {/* ghoomti hui divya kirnein */}
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

      {/* Durga Maa ka frame */}
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

      {/* dono taraf diye */}
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

      {/* upar ki patti, genda phool ki mala, ghantiyan */}
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

/* ── Darwaze ka ek hissa (left / right) ── */
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
      {/* beech me sone ki patti */}
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

/* ── Intezaar ke time upar udte angare ── */
const emberColor = (i) => (i % 3 === 0 ? "#ffd978" : i % 3 === 1 ? "#ff9933" : "#ffb300");

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
          background: emberColor(e.id), boxShadow: "0 0 8px 2px rgba(255,160,0,.7)", opacity: 0,
          animation: `emberRise ${e.dur}s ease-out ${e.delay}s infinite`, "--dx": `${e.dx}px`,
        }} />
      ))}
    </>
  );
});

/* ── Darwaza khulte hi phoolon ki barish ── */
const PETAL_COLORS = ["#ff8f00", "#ffb300", "#ff6f00", "#ffca28", "#e53935"];

const PetalRain = memo(() => {
  const petals = useMemo(
    () => Array.from({ length: 48 }, (_, i) => ({
      id: i, left: Math.random() * 100, size: 10 + Math.random() * 14, dur: 3.5 + Math.random() * 3,
      delay: Math.random() * 1.4, dx: (Math.random() - 0.5) * 180, rot: Math.random() * 720,
      c: PETAL_COLORS[i % PETAL_COLORS.length],
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

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
const MataRaniIntro = ({ onOpening }) => {
  const { w, h } = useViewport();
  const [phase, setPhase] = useState("idle");
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

  /* intro ke time page scroll band */
  useEffect(() => {
    if (phase === "idle" || phase === "opening") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [phase]);

  /* diya mouse/ungli ke peeche smooth chalta hai */
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

  /* aarti poori → darwaza kholo */
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

  /* Esc / Enter = aarti skip */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" || e.key === "Enter") finish(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* AARTI: diya Maa ke chaaron taraf kitna ghooma */
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

      {/* darwaza khulte time divya roshni */}
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

        {/* aarti ka gol raasta + progress */}
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

        {/* ring ke upar start ka nishaan */}
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

        {/* hint text */}
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

        {/* jo diya aapke haath me hai */}
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

export default MataRaniIntro;