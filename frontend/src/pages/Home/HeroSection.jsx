import { useEffect, useMemo, useRef, useState } from "react";

/* ════════════════════════════════════════════════════════════
   SETTINGS
   - VIDEO_SRC : video `frontend/public/Djclassis.mp4` me rakho
                 (naam ka capital/small letter ekdum same rakhna)
   - CHARACTER_IMG : apni transparent PNG lagani ho to "/dj.png"
                 likh do (public me rakho). Khali chhodo to
                 neeche wala drawn DJ character dikhega.

   THEME COLORS (website jaisa):
   pink #ff4f8b · orange #ff8a3d · yellow #fbbf24
   coral #ee5a3b · red #e11d2e · black #0d0d0d
════════════════════════════════════════════════════════════ */
const VIDEO_SRC = "/Djclassis.mp4";
const CHARACTER_IMG = "";

/* ════════════════════════════════════════════
   EQUALIZER BARS  (LowerSection me bhi use hota hai)
════════════════════════════════════════════ */
export const Equalizer = ({ bars = 14, height = 40, color = "blue" }) => {
  const heights = useMemo(() => Array.from({ length: bars }, () => Math.random() * 60 + 30), [bars]);
  const grad =
    color === "gold"
      ? "linear-gradient(to top, #ff8a3d, #fbbf24)"
      : "linear-gradient(to top, #ff4f8b, #ff8a3d)";

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
   Keyframes (Tailwind ke arbitrary animate-[...] ke saath chalte hain)
   Beat = 0.5s (120 BPM) — sab movement isi par sync hai
════════════════════════════════════════════ */
const HERO_KEYFRAMES = `
@keyframes djDance {
  0%,100% { transform: translateY(0) rotate(-2deg); }
  50%     { transform: translateY(9px) rotate(2deg); }
}
@keyframes djNod {
  0%,100% { transform: rotate(-6deg) translateY(0); }
  50%     { transform: rotate(6deg) translateY(7px); }
}
@keyframes djHand {
  0%,100% { transform: rotate(0deg); }
  50%     { transform: rotate(-7deg); }
}
@keyframes djMouth {
  from { transform: scaleY(.55); }
  to   { transform: scaleY(1.1); }
}
@keyframes djRing {
  0%   { transform: scale(.6); opacity: .9; }
  100% { transform: scale(2.8); opacity: 0; }
}
@keyframes djPulse {
  from { transform: scale(1);   opacity: .25; }
  to   { transform: scale(1.25); opacity: .75; }
}
@keyframes djFloat {
  0%,100% { transform: translateY(0) rotate(var(--r)); }
  50%     { transform: translateY(-16px) rotate(calc(var(--r) + 4deg)); }
}
@keyframes djNote {
  0%   { transform: translateY(0) scale(.6); opacity: 0; }
  15%  { opacity: .95; }
  100% { transform: translateY(-170px) translateX(26px) scale(1.15); opacity: 0; }
}
@keyframes djEq {
  from { transform: scaleY(.15); }
  to   { transform: scaleY(1); }
}
@keyframes djLetter {
  from { opacity: 0; transform: translateY(46px) scale(.9); filter: blur(10px); }
  to   { opacity: 1; transform: none; filter: none; }
}
@keyframes djFadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: none; }
}
@keyframes djDot {
  0%,100% { opacity: .35; } 50% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .dj-hero *, .dj-hero *::before, .dj-hero *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
  }
}
`;

/* ════════════════════════════════════════════
   Small icons (floating glass tiles ke liye)
════════════════════════════════════════════ */
const IconHeadphones = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M4 15v-3a8 8 0 0 1 16 0v3" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" />
  </svg>
);
const IconVinyl = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" />
  </svg>
);
const IconMic = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);
const IconNote = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V6l10-2v12" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="16.5" cy="16" r="2.5" />
  </svg>
);

/* Floating glass tile (parallax wrapper + float animation) */
const Tile = ({ pos, rot, delay, label, icon, hideOnMobile, depth = 1 }) => (
  <div
    className={`absolute z-20 ${pos} ${hideOnMobile ? "hidden sm:block" : ""} transition-transform duration-200 ease-out`}
    style={{ transform: `translate3d(calc(var(--mx) * ${-22 * depth}px), calc(var(--my) * ${-14 * depth}px), 0)` }}
  >
    <div
      className="flex h-[84px] w-[68px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/25 bg-white/10 text-[#ffc2d6] shadow-[0_10px_40px_rgba(255,79,139,0.35)] backdrop-blur-xl animate-[djFloat_5s_ease-in-out_infinite] sm:h-[104px] sm:w-[84px] sm:gap-2"
      style={{ "--r": `${rot}deg`, animationDelay: `${delay}s` }}
    >
      {icon}
      <span className="text-[9px] font-bold tracking-[0.25em] text-white/80">{label}</span>
    </div>
  </div>
);

/* ════════════════════════════════════════════
   DJ CHARACTER (SVG) — headphones lagaye, gaana sunte hue jhoomta hai
════════════════════════════════════════════ */
const DjCharacter = () => (
  <svg
    viewBox="0 0 400 480"
    className="h-full w-auto overflow-visible drop-shadow-[0_0_45px_rgba(255,79,139,0.5)]"
    role="img"
    aria-label="DJ enjoying music with headphones"
  >
    <defs>
      <linearGradient id="djSkin" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffa27a" />
        <stop offset="1" stopColor="#ff4f8b" />
      </linearGradient>
      <linearGradient id="djBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ff8a3d" />
        <stop offset="1" stopColor="#e11d2e" />
      </linearGradient>
      <linearGradient id="djCup" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff3d6" />
        <stop offset="1" stopColor="#fbbf24" />
      </linearGradient>
    </defs>

    {/* poora body jhoomta hai */}
    <g className="origin-[200px_480px] animate-[djDance_1s_ease-in-out_infinite]">
      {/* neck + torso */}
      <path d="M172 250 L228 250 L238 345 L162 345 Z" fill="#d6336c" />
      <path d="M40 480 C50 380 110 345 170 335 L230 335 C290 345 350 380 360 480 Z" fill="url(#djBody)" />
      <path d="M230 335 C290 345 350 380 360 480" stroke="#fbbf24" strokeWidth="5" fill="none" opacity=".85" />
      <path d="M170 335 Q200 372 230 335" stroke="#7a0f1d" strokeWidth="4" fill="none" />
      <path d="M100 410 Q135 372 172 360" stroke="#ffd0a6" strokeWidth="4" fill="none" opacity=".55" strokeLinecap="round" />
      <path d="M120 450 Q150 420 185 410" stroke="#ffd0a6" strokeWidth="3" fill="none" opacity=".35" strokeLinecap="round" />

      {/* headphone cable */}
      <path d="M128 228 C98 300 142 385 108 470" stroke="#ffd9b8" strokeWidth="3" fill="none" opacity=".85" strokeLinecap="round" />

      {/* haath headphone par */}
      <g>
        <path d="M335 430 C352 335 322 272 292 226" stroke="#fbbf24" strokeWidth="35" strokeLinecap="round" fill="none" opacity=".45" />
        <path d="M335 430 C352 335 322 272 292 226" stroke="url(#djSkin)" strokeWidth="30" strokeLinecap="round" fill="none" />
        <g className="origin-[290px_230px] animate-[djHand_.5s_ease-in-out_infinite]">
          <circle cx="284" cy="214" r="19" fill="url(#djSkin)" />
          <g stroke="#ff8a3d" strokeWidth="8" strokeLinecap="round" fill="none">
            <path d="M268 205 L258 178" />
            <path d="M277 199 L270 168" />
            <path d="M288 198 L286 166" />
            <path d="M298 205 L300 177" />
          </g>
        </g>
      </g>

      {/* HEAD — beat par sir hilta hai */}
      <g className="origin-[200px_300px] animate-[djNod_1s_ease-in-out_infinite]">
        {/* afro hair */}
        <g fill="#1b0a12">
          <circle cx="200" cy="95" r="72" />
          <circle cx="138" cy="122" r="46" />
          <circle cx="262" cy="122" r="46" />
          <circle cx="168" cy="68" r="46" />
          <circle cx="236" cy="68" r="46" />
          <circle cx="118" cy="170" r="34" />
          <circle cx="282" cy="170" r="34" />
        </g>
        <g fill="#ff4f8b" opacity=".55">
          <circle cx="170" cy="48" r="5" /><circle cx="222" cy="40" r="4" /><circle cx="130" cy="110" r="4" />
          <circle cx="272" cy="105" r="5" /><circle cx="200" cy="70" r="3" /><circle cx="150" cy="80" r="3" />
        </g>

        {/* face */}
        <path d="M138 160 C138 100 262 100 262 160 L262 205 C262 260 232 284 200 284 C168 284 138 260 138 205 Z" fill="url(#djSkin)" />
        <path d="M262 160 L262 205 C262 260 232 284 200 284" stroke="#fbbf24" strokeWidth="4" fill="none" opacity=".75" />
        <path d="M144 170 Q146 220 170 262" stroke="#ffd0a6" strokeWidth="3" fill="none" opacity=".45" strokeLinecap="round" />

        {/* sunglasses */}
        <path d="M150 158 H198 V170 Q198 192 174 192 Q150 192 150 170 Z" fill="#0d0d0d" />
        <path d="M202 158 H250 V170 Q250 192 226 192 Q202 192 202 170 Z" fill="#0d0d0d" />
        <rect x="196" y="160" width="8" height="5" fill="#0d0d0d" />
        <path d="M158 164 L176 164" stroke="#fff" strokeWidth="2.5" opacity=".55" strokeLinecap="round" />
        <path d="M210 164 L228 164" stroke="#fff" strokeWidth="2.5" opacity=".55" strokeLinecap="round" />

        {/* nose */}
        <path d="M200 186 Q192 212 203 215" stroke="#c93a5f" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* gaata hua mouth */}
        <g className="origin-[200px_228px] animate-[djMouth_.5s_ease-in-out_infinite_alternate]">
          <path d="M168 227 Q200 280 232 227 Q200 235 168 227 Z" fill="#1a0510" />
          <path d="M172 229 Q200 241 228 229 L225 236 Q200 247 175 236 Z" fill="#fff" />
          <ellipse cx="200" cy="257" rx="14" ry="7" fill="#ff4f8b" />
        </g>

        {/* headphones: band + cups */}
        <path d="M140 172 C140 40 260 40 260 172" stroke="url(#djCup)" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M148 168 C148 56 252 56 252 168" stroke="#e11d2e" strokeWidth="3" strokeDasharray="2 7" fill="none" strokeLinecap="round" opacity=".9" />

        {[138, 262].map((x, i) => (
          <g key={x}>
            <ellipse cx={x} cy="192" rx="36" ry="52" fill="#ff4f8b" className="[transform-box:fill-box] origin-center animate-[djPulse_.5s_ease-in-out_infinite_alternate]" />
            <ellipse cx={x} cy="192" rx="22" ry="38" fill="url(#djCup)" stroke="#fff" strokeWidth="2" />
            <ellipse cx={x} cy="192" rx="13" ry="26" fill="#e11d2e" />
            <circle cx={x} cy="192" r="5" fill="#fff3d6" />
            <circle
              cx={x} cy="192" r="30" fill="none" stroke="#fbbf24" strokeWidth="3"
              className="[transform-box:fill-box] origin-center animate-[djRing_1s_ease-out_infinite]"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          </g>
        ))}
      </g>
    </g>
  </svg>
);

/* ════════════════════════════════════════════
   HERO SECTION
════════════════════════════════════════════ */
const TITLE = "DJ CLASSIS";
const NOTES = [
  { l: "14%", b: "34%", d: 0, c: "♪" },
  { l: "26%", b: "52%", d: 1.2, c: "♫" },
  { l: "40%", b: "62%", d: 2.1, c: "♪" },
  { l: "60%", b: "64%", d: 0.7, c: "♫" },
  { l: "74%", b: "50%", d: 1.8, c: "♪" },
  { l: "86%", b: "34%", d: 2.8, c: "♫" },
];
const SOCIALS = ["IN", "YO", "LN", "TW", "FB"];
const STATS = [["500+", "Events Done"], ["10+", "Years Active"], ["50K+", "Crowd Moved"]];

const HeroSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [videoOk, setVideoOk] = useState(true);

  /* mouse parallax */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
      el.style.setProperty("--my", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  /* video sound toggle */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    v.play().catch(() => {});
  }, [muted]);

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{ "--mx": 0, "--my": 0 }}
      className="dj-hero relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#0d0d0d] pt-24 text-white"
    >
      <style>{HERO_KEYFRAMES}</style>

      {/* ───────── FULL SCREEN BLURRED VIDEO (sabse peeche) ───────── */}
      <div className="absolute inset-0 z-0">
        {videoOk ? (
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={() => setVideoOk(false)}
            className="h-full w-full scale-110 object-cover blur-md brightness-[0.6] saturate-125"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_30%_20%,#ee5a3b_0%,transparent_55%),radial-gradient(ellipse_at_80%_70%,#ff4f8b_0%,transparent_55%)] bg-[#0d0d0d]" />
        )}
        {/* glass layer */}
        <div className="absolute inset-0 bg-[#0d0d0d]/45 backdrop-blur-[6px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/80 via-transparent to-[#0d0d0d]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,79,139,0.2),transparent_60%)]" />
      </div>

      {/* ───────── beat equalizer (neeche) ───────── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex h-28 items-end gap-[3px] px-2 opacity-50">
        {Array.from({ length: 64 }, (_, i) => (
          <div
            key={i}
            className="flex-1 origin-bottom rounded-t bg-gradient-to-t from-[#ff4f8b] via-[#ff8a3d] to-[#fbbf24] animate-[djEq_.6s_ease-in-out_infinite_alternate]"
            style={{
              height: `${30 + ((i * 37) % 70)}%`,
              animationDuration: `${0.45 + (i % 7) * 0.09}s`,
              animationDelay: `${(i % 5) * 0.07}s`,
            }}
          />
        ))}
      </div>

      {/* ───────── social links (right side) ───────── */}
      <div className="absolute right-3 top-28 z-30 hidden flex-col items-center gap-5 rounded-full border border-white/15 bg-white/10 px-2.5 py-5 backdrop-blur-xl md:flex">
        {SOCIALS.map((s) => (
          <a
            key={s}
            href="#"
            className="text-[11px] font-black tracking-[0.2em] text-white/80 transition hover:text-[#fbbf24] [writing-mode:vertical-rl]"
          >
            {s}
          </a>
        ))}
      </div>

      {/* ───────── sound button ───────── */}
      {videoOk && (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-6 left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,79,139,0.6)] sm:left-8"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H3v6h3l5 4V5z" />
            {muted ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
          </svg>
        </button>
      )}

      {/* ───────── STAGE: orbits + character + floating tiles ───────── */}
      <div className="relative z-10 mt-2 flex h-[40vh] min-h-[270px] max-h-[440px] w-full max-w-[1100px] items-end justify-center">
        {/* orbit ellipses */}
        <div
          className="pointer-events-none absolute inset-0 transition-transform duration-200 ease-out"
          style={{ transform: "translate3d(calc(var(--mx) * 10px), calc(var(--my) * 6px), 0)" }}
        >
          <svg viewBox="0 0 1100 440" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
            {[22, -22].map((deg, i) => (
              <g key={deg} transform={`rotate(${deg} 550 220)`}>
                <ellipse cx="550" cy="220" rx="440" ry="150" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="4" />
                <circle r="7" fill={i ? "#fbbf24" : "#ff4f8b"} style={{ filter: `drop-shadow(0 0 10px ${i ? "#fbbf24" : "#ff4f8b"})` }}>
                  <animateMotion
                    dur={i ? "16s" : "13s"}
                    repeatCount="indefinite"
                    path="M110 220 a440 150 0 1 0 880 0 a440 150 0 1 0 -880 0"
                  />
                </circle>
              </g>
            ))}
          </svg>
        </div>

        {/* floating music notes */}
        {NOTES.map((n, i) => (
          <span
            key={i}
            className="pointer-events-none absolute z-20 text-2xl text-[#fbbf24] opacity-0 drop-shadow-[0_0_10px_rgba(255,79,139,0.9)] animate-[djNote_4.5s_ease-in_infinite]"
            style={{ left: n.l, bottom: n.b, animationDelay: `${n.d}s` }}
          >
            {n.c}
          </span>
        ))}

        {/* glass tiles */}
        <Tile pos="left-[4%] top-[14%] sm:left-[18%] sm:top-[10%]" rot={8} delay={0} label="LIVE" icon={<IconHeadphones />} depth={1.2} />
        <Tile pos="left-[1%] top-[56%] sm:left-[5%] sm:top-[52%]" rot={-10} delay={0.8} label="MIX" icon={<IconVinyl />} hideOnMobile depth={0.8} />
        <Tile pos="right-[4%] top-[12%] sm:right-[18%] sm:top-[8%]" rot={-8} delay={0.4} label="VIBE" icon={<IconNote />} depth={1.2} />
        <Tile pos="right-[1%] top-[56%] sm:right-[6%] sm:top-[50%]" rot={10} delay={1.2} label="BASS" icon={<IconMic />} hideOnMobile depth={0.8} />

        {/* character (parallax + dance) */}
        <div
          className="relative z-10 h-full transition-transform duration-200 ease-out"
          style={{ transform: "translate3d(calc(var(--mx) * -14px), calc(var(--my) * -8px), 0)" }}
        >
          {CHARACTER_IMG ? (
            <img
              src={CHARACTER_IMG}
              alt="DJ Classis"
              draggable={false}
              className="h-full w-auto origin-bottom object-contain drop-shadow-[0_0_45px_rgba(255,79,139,0.5)] animate-[djDance_1s_ease-in-out_infinite]"
            />
          ) : (
            <DjCharacter />
          )}
        </div>

        {/* bottom fade so the bust blends into the page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-[#0d0d0d]/80 to-transparent" />
      </div>

      {/* ───────── TITLE + CTA + STATS ───────── */}
      <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-14 text-center">
        <h1
          className="font-['Orbitron',sans-serif] text-[clamp(44px,9vw,112px)] font-black leading-none tracking-tight text-white [text-shadow:0_0_40px_rgba(255,79,139,0.55),0_0_90px_rgba(255,138,61,0.3)]"
          aria-label={TITLE}
        >
          {TITLE.split("").map((ch, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="inline-block opacity-0 animate-[djLetter_.8s_cubic-bezier(.2,.8,.2,1)_forwards]"
              style={{ animationDelay: `${0.15 + i * 0.07}s` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>

        <p
          className="mt-3 text-[11px] font-bold uppercase tracking-[0.42em] text-[#fbbf24] opacity-0 animate-[djFadeUp_.8s_ease_forwards] sm:text-xs"
          style={{ animationDelay: "1s" }}
        >
          &amp; Keshari Generator
        </p>

        <p
          className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 opacity-0 animate-[djFadeUp_.8s_ease_forwards] sm:text-base"
          style={{ animationDelay: "1.15s" }}
        >
          Bass-driven. Beat-perfected. DJ Classis crafts sonic experiences that move crowds and turn ordinary nights into unforgettable memories.
        </p>

        <div
          className="mt-7 flex flex-wrap items-center justify-center gap-3 opacity-0 animate-[djFadeUp_.8s_ease_forwards]"
          style={{ animationDelay: "1.3s" }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff4f8b] via-[#ff8a3d] to-[#fbbf24] px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_30px_rgba(255,79,139,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(255,138,61,0.6)]"
          >
            Book DJ Classis <span>→</span>
          </a>
          <a
            href="#mixes"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#fbbf24]/60 hover:bg-white/20"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-[9px]">▶</span>
            Listen Now
          </a>
        </div>

        {/* glass stats */}
        <div
          className="mt-8 grid w-full max-w-xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/15 bg-white/[0.07] py-4 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl opacity-0 animate-[djFadeUp_.8s_ease_forwards]"
          style={{ animationDelay: "1.45s" }}
        >
          {STATS.map(([n, l]) => (
            <div key={l} className="px-2">
              <p className="bg-gradient-to-r from-[#ff4f8b] to-[#fbbf24] bg-clip-text font-['Orbitron',sans-serif] text-2xl font-black text-transparent sm:text-3xl">
                {n}
              </p>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/50 sm:text-[10px]">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;