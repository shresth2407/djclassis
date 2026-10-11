import { useState, useEffect } from "react";

const LINKS = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Services", "#mixes"],
  ["Events", "#events"],
  ["Contact", "#contact"],
];

/* ════════════════════════════════════════════
   NAVBAR
════════════════════════════════════════════ */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || open ? "rgba(4,4,10,0.85)" : "transparent",
        backdropFilter: scrolled || open ? "blur(14px)" : "none",
        borderBottom: scrolled || open ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}
      >
        {/* Logo */}
        <a href="#home" style={{ textDecoration: "none" }}>
          <span className="font-orbitron" style={{ fontWeight: 900, fontSize: 16, letterSpacing: "0.15em", color: "#fff" }}>
            DJ <span className="grad-text">CLASSIS</span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {LINKS.map(([label, href]) => (
            <a key={label} href={href} className="nav-link">{label}</a>
          ))}
          <a href="#contact" className="btn-primary" style={{ padding: "10px 22px" }}>
            <span>Book Now</span>
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          type="button"
          className="nav-burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span style={{ transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="nav-mobile">
          {LINKS.map(([label, href]) => (
            <a key={label} href={href} className="nav-link" onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a href="#contact" className="btn-primary" onClick={() => setOpen(false)} style={{ justifyContent: "center" }}>
            <span>Book Now</span>
          </a>
        </div>
      )}

      <style>{`
        .nav-link {
          font-size: 12px; font-weight: 600; letter-spacing: 0.15em;
          text-transform: uppercase; text-decoration: none; color: #9ca3af;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #60a5fa; }
        .nav-burger {
          display: none; flex-direction: column; gap: 5px; padding: 8px;
          background: none; border: none; cursor: pointer;
        }
        .nav-burger span {
          display: block; width: 22px; height: 2px; background: #fff;
          border-radius: 2px; transition: all 0.25s ease;
        }
        .nav-mobile {
          display: none; flex-direction: column; gap: 20px;
          padding: 20px 24px 28px;
        }
        @media (max-width: 820px) {
          .nav-links { display: none !important; }
          .nav-burger { display: flex; }
          .nav-mobile { display: flex; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;