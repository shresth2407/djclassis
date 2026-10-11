
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`dj-navbar ${
          scrolled || open ? "dj-navbar-scrolled" : ""
        }`}
      >
        <div className="dj-navbar-inner">
          {/* Logo */}
          <Link to="/" className="dj-logo">
            <span>DJ</span>{" "}
            <span className="dj-logo-gradient">CLASSIS</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="dj-desktop-nav">
            {LINKS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`dj-nav-link ${
                  isActive(path) ? "dj-nav-active" : ""
                }`}
              >
                {label}
              </Link>
            ))}

            <Link to="/book-now" className="dj-book-button">
              Book Now <span>→</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="dj-menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((previous) => !previous)}
          >
            <span className={open ? "line-one open" : "line-one"} />
            <span className={open ? "line-two open" : "line-two"} />
            <span className={open ? "line-three open" : "line-three"} />
          </button>
        </div>

        {/* Mobile navigation */}
        {open && (
          <nav className="dj-mobile-nav">
            {LINKS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`dj-nav-link ${
                  isActive(path) ? "dj-nav-active" : ""
                }`}
              >
                {label}
              </Link>
            ))}

            <Link to="/book-now" className="dj-book-button">
              Book Now <span>→</span>
            </Link>
          </nav>
        )}
      </header>

      <style>{`
        .dj-navbar,
        .dj-navbar * {
          box-sizing: border-box;
        }

        .dj-navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
          background: rgba(4, 4, 10, 0.18);
          border-bottom: 1px solid transparent;
          transition: background 0.3s ease,
                      border-color 0.3s ease,
                      backdrop-filter 0.3s ease;
        }

        .dj-navbar-scrolled {
          background: rgba(4, 4, 10, 0.92);
          border-bottom-color: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .dj-navbar-inner {
          width: 100%;
          max-width: 1240px;
          min-height: 72px;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .dj-logo {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          text-decoration: none;
          color: #ffffff !important;
          font-family: 'Orbitron', sans-serif;
          font-size: 17px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .dj-logo-gradient {
          background: linear-gradient(
            100deg,
            #60a5fa,
            #a78bfa,
            #e879f9
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .dj-desktop-nav {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: clamp(16px, 2.5vw, 32px);
        }

        .dj-nav-link {
          position: relative;
          display: inline-block;
          padding: 8px 0;
          color: #a1a1aa !important;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .dj-nav-link:hover,
        .dj-nav-active {
          color: #ffffff !important;
        }

        .dj-nav-active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          border-radius: 4px;
          background: linear-gradient(90deg, #38bdf8, #a78bfa);
        }

        .dj-book-button {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 12px 22px;
          border: 1px solid rgba(96, 165, 250, 0.5);
          border-radius: 999px;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: #ffffff !important;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .dj-book-button span {
          color: #ffffff !important;
        }

        .dj-book-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 28px rgba(96, 165, 250, 0.4);
        }

        .dj-menu-toggle {
          display: none;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
          cursor: pointer;
        }

        .dj-menu-toggle span {
          display: block;
          width: 20px;
          height: 2px;
          border-radius: 3px;
          background: #ffffff;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .dj-menu-toggle .line-one.open {
          transform: translateY(7px) rotate(45deg);
        }

        .dj-menu-toggle .line-two.open {
          opacity: 0;
        }

        .dj-menu-toggle .line-three.open {
          transform: translateY(-7px) rotate(-45deg);
        }

        .dj-mobile-nav {
          display: none;
        }

        @media (max-width: 820px) {
          .dj-navbar-inner {
            min-height: 66px;
            padding: 0 18px;
          }

          .dj-logo {
            font-size: 15px;
          }

          .dj-desktop-nav {
            display: none;
          }

          .dj-menu-toggle {
            display: flex;
          }

          .dj-mobile-nav {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding: 18px 22px 24px;
            background: rgba(4, 4, 10, 0.98);
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }

          .dj-mobile-nav .dj-nav-link {
            padding: 12px 0;
          }

          .dj-mobile-nav .dj-book-button {
            margin-top: 6px;
          }
        }

        @media (max-width: 360px) {
          .dj-navbar-inner {
            padding: 0 12px;
          }

          .dj-logo {
            font-size: 13px;
            letter-spacing: 0.07em;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
