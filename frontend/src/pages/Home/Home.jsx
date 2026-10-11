import { useState } from "react";
import MataRaniIntro from "../../components/MataRaniIntro";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "./HeroSection";
import LowerSection from "./LowerSection";

/* ════════════════════════════════════════════
   GLOBAL STYLES (poori site ka CSS)
════════════════════════════════════════════ */
const GLOBAL_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700;800&family=Noto+Serif+Devanagari:wght@600;800&display=swap');

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
   HOME PAGE
   Mata Rani intro → darwaza khulta hai → DJ site
════════════════════════════════════════════ */
const Home = () => {
  const [started, setStarted] = useState(false);

  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      <MataRaniIntro
        onOpening={() => {
          window.scrollTo(0, 0);
          setStarted(true);
        }}
      />

      {started && (
        <>
          <Navbar />
          <HeroSection />
          <LowerSection />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;