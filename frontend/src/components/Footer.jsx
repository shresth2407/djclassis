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

export default Footer;