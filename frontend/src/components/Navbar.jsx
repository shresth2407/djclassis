import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Mixes", href: "#mixes" },
    { name: "Events", href: "#events" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');

        .nav-root {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Inter', sans-serif;
        }

        .nav-root.scrolled {
          background: rgba(4, 4, 8, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 102, 255, 0.12);
          box-shadow: 0 4px 40px rgba(0, 102, 255, 0.08);
        }

        .nav-root.top {
          background: linear-gradient(to bottom, rgba(4, 4, 8, 0.7), transparent);
        }

        /* ── Inner container ── */
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── Logo ── */
        .nav-logo {
          display: flex;
          flex-direction: column;
          line-height: 1;
          text-decoration: none;
          cursor: pointer;
        }

        .nav-logo-main {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: 20px;
          letter-spacing: 0.12em;
          color: #fff;
          text-transform: uppercase;
        }

        .nav-logo-main span {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-logo-sub {
          font-size: 9px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #f59e0b;
          font-weight: 700;
          margin-top: 3px;
          margin-left: 2px;
        }

        /* ── Equalizer (logo decoration) ── */
        .eq-bars {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 14px;
          margin-left: 8px;
        }

        .eq-bar {
          width: 3px;
          border-radius: 2px;
          background: linear-gradient(to top, #3b82f6, #8b5cf6);
          animation: eqAnim 0.7s ease-in-out infinite alternate;
        }

        .eq-bar:nth-child(1) { height: 40%; animation-delay: 0s; }
        .eq-bar:nth-child(2) { height: 80%; animation-delay: 0.12s; }
        .eq-bar:nth-child(3) { height: 55%; animation-delay: 0.24s; }
        .eq-bar:nth-child(4) { height: 100%; animation-delay: 0.08s; }
        .eq-bar:nth-child(5) { height: 65%; animation-delay: 0.18s; }

        @keyframes eqAnim {
          0%   { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }

        /* ── Desktop Links ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 36px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          position: relative;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9ca3af;
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          border-radius: 99px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover,
        .nav-link.active {
          color: #fff;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        /* ── CTA Button ── */
        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          color: #fff;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .nav-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .nav-cta:hover::before {
          opacity: 1;
        }

        .nav-cta:hover {
          box-shadow: 0 0 35px rgba(124, 58, 237, 0.55);
          transform: translateY(-1px);
        }

        .nav-cta span {
          position: relative;
          z-index: 1;
        }

        .nav-cta-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse 2s ease-in-out infinite;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.8); }
        }

        /* ── Hamburger ── */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 6px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 10001;
        }

        .hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #fff;
          border-radius: 99px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* ── Mobile Menu ── */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(4, 4, 8, 0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
          z-index: 9998;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          border-left: 1px solid rgba(0, 102, 255, 0.1);
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu-link {
          font-family: 'Orbitron', sans-serif;
          font-size: 28px;
          font-weight: 900;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #374151;
          text-decoration: none;
          padding: 16px 40px;
          width: 100%;
          text-align: center;
          transition: all 0.25s ease;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          position: relative;
          overflow: hidden;
        }

        .mobile-menu-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          transform: scaleY(0);
          transition: transform 0.25s ease;
        }

        .mobile-menu-link:hover {
          color: #fff;
          background: rgba(59, 130, 246, 0.05);
        }

        .mobile-menu-link:hover::before {
          transform: scaleY(1);
        }

        .mobile-cta {
          margin-top: 32px;
          padding: 14px 40px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          color: #fff;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          box-shadow: 0 0 30px rgba(37, 99, 235, 0.4);
          transition: all 0.3s ease;
        }

        .mobile-cta:hover {
          box-shadow: 0 0 50px rgba(124, 58, 237, 0.6);
          transform: scale(1.03);
        }

        /* ── Top border glow line ── */
        .nav-glow-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, transparent);
          transition: width 1.2s ease;
        }

        .scrolled .nav-glow-line {
          width: 100%;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .nav-links,
          .nav-cta {
            display: none;
          }
          .hamburger {
            display: flex;
          }
          .nav-logo-main {
            font-size: 17px;
          }
        }

        @media (max-width: 480px) {
          .nav-inner {
            padding: 0 16px;
          }
          .mobile-menu-link {
            font-size: 22px;
            padding: 14px 24px;
          }
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav className={`nav-root ${scrolled ? "scrolled" : "top"}`}>
        <div className="nav-inner">
          {/* Logo */}
          <a className="nav-logo" href="#home">
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="nav-logo-main">
                DJ <span>CLASSIS</span>
              </span>
              <div className="eq-bars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="eq-bar" />
                ))}
              </div>
            </div>
            <span className="nav-logo-sub">&amp; Keshari Generator</span>
          </a>

          {/* Desktop nav links */}
          <ul className="nav-links">
            {navLinks.map(({ name, href }) => (
              <li key={name}>
                <a
                  href={href}
                  className={`nav-link ${activeLink === name ? "active" : ""}`}
                  onClick={() => setActiveLink(name)}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a href="#contact" className="nav-cta">
            <div className="nav-cta-dot" />
            <span>Book Now</span>
          </a>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Glow line on scroll */}
        <div className="nav-glow-line" />
      </nav>

      {/* ── Mobile Full-Screen Menu ── */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map(({ name, href }) => (
          <a
            key={name}
            href={href}
            className="mobile-menu-link"
            onClick={() => {
              setMenuOpen(false);
              setActiveLink(name);
            }}
          >
            {name}
          </a>
        ))}
        <a
          href="#contact"
          className="mobile-cta"
          onClick={() => setMenuOpen(false)}
        >
          Book DJ Classis
        </a>
      </div>
    </>
  );
};

export default Navbar;