import { useState, useEffect, useRef } from "react";




/* ════════════════════════════════════════════

   ABOUT

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

   SERVICES

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

   EVENTS

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

        {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 4,
                height: `${12 + (i % 4) * 5}px`,
                background: "#60a5fa",
                borderRadius: 4,
                animation: `equalizerPulse 0.8s ease-in-out ${i * 0.08}s infinite alternate`,
              }}
            />
          ))}

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

    <style>{`
      @keyframes equalizerPulse {
        from { transform: scaleY(0.55); opacity: 0.7; }
        to { transform: scaleY(1); opacity: 1; }
      }
    `}</style>
  </section>
);



/* ════════════════════════════════════════════

   CONTACT

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

   LOWER SECTION  (About → Services → Events → CTA → Contact)

════════════════════════════════════════════ */

const LowerSection = () => (

  <>

    <About />

    <Services />

    <Events />

    <CtaBanner />

    <Contact />

  </>

);



export default LowerSection;