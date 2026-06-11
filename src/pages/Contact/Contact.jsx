import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ navigate }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const reveals = gsap.utils.toArray(".section-reveal");
    reveals.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        }
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-enter" style={{ background: "#f0ead6", minHeight: "100vh" }}>
      <div style={{ background: "#1a5c2a", padding: "48px 20px 40px", textAlign: "center" }}>
        <span className="font-marker" style={{ color: "rgba(240,234,214,.6)", fontSize: "1rem" }}>Get in touch</span>
        <h1 className="font-display" style={{ color: "#f0ead6", fontSize: "clamp(3rem,10vw,7rem)", lineHeight: .9, marginTop: 4 }}>CONTACT</h1>
      </div>
      <div className="checker-strip" />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 20px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
          {/* contact form */}
          <div className="section-reveal" style={{ border: "2px solid #1a5c2a", borderRadius: 16, padding: 28, background: "#f8f5ea" }}>
            <h2 className="font-display" style={{ color: "#1a5c2a", fontSize: "1.8rem", letterSpacing: "0.06em", marginBottom: 20 }}>SEND A MESSAGE</h2>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <span style={{ fontSize: "3rem" }}>✉️</span>
                <h3 className="font-display" style={{ color: "#1a5c2a", fontSize: "1.5rem", marginTop: 12, marginBottom: 8 }}>THANK YOU!</h3>
                <p className="font-body" style={{ color: "#1a5c2a", opacity: 0.8, fontSize: "0.85rem" }}>We've received your message and will get back to you shortly.</p>
                <button className="retro-btn" style={{ marginTop: 20 }} onClick={() => setSubmitted(false)}>SEND ANOTHER</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label className="font-body" style={{ display: "block", color: "#1a5c2a", fontWeight: 600, fontSize: "0.78rem", marginBottom: 6, letterSpacing: "0.05em" }}>YOUR NAME</label>
                  <input type="text" required className="contact-input" placeholder="Alex Kern" />
                </div>
                <div>
                  <label className="font-body" style={{ display: "block", color: "#1a5c2a", fontWeight: 600, fontSize: "0.78rem", marginBottom: 6, letterSpacing: "0.05em" }}>EMAIL ADDRESS</label>
                  <input type="email" required className="contact-input" placeholder="alex@cody.coffee" />
                </div>
                <div>
                  <label className="font-body" style={{ display: "block", color: "#1a5c2a", fontWeight: 600, fontSize: "0.78rem", marginBottom: 6, letterSpacing: "0.05em" }}>MESSAGE</label>
                  <textarea required rows={4} className="contact-input" placeholder="Tell us how we can help..." style={{ resize: "vertical" }}></textarea>
                </div>
                <button type="submit" className="retro-btn" style={{ alignSelf: "flex-start", marginTop: 6 }}>SEND MESSAGE</button>
              </form>
            )}
          </div>

          {/* info block */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="section-reveal" style={{ border: "2px solid #1a5c2a", borderRadius: 16, padding: 24, background: "#f8f5ea" }}>
              <h2 className="font-display" style={{ color: "#1a5c2a", fontSize: "1.5rem", letterSpacing: "0.06em", marginBottom: 16 }}>CONTACT DETAILS</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "📞", title: "General Inquiries", text: "+62 811-2992-451" },
                  { icon: "✉️", title: "Email Address", text: "Ahvman5@gmail.com" },
                  { icon: "📍", title: "Main Branch", text: "Jl. Soekarno Hatta No.5, Tidar Sel., Kec. Magelang Sel., Kota Magelang, Jawa Tengah 56125" }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>{item.icon}</span>
                    <div>
                      <h4 className="font-display" style={{ color: "#1a5c2a", fontSize: "0.9rem", letterSpacing: "0.04em", lineHeight: 1.1 }}>{item.title}</h4>
                      <p className="font-body" style={{ color: "#1a5c2a", opacity: 0.75, fontSize: "0.82rem", marginTop: 2 }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-reveal" style={{ border: "2px solid #1a5c2a", borderRadius: 16, padding: 24, background: "#1a5c2a" }}>
              <h2 className="font-display" style={{ color: "#f0ead6", fontSize: "1.5rem", letterSpacing: "0.06em", marginBottom: 12 }}>VISIT US</h2>
              <p className="font-body" style={{ color: "#f0ead6", opacity: 0.8, fontSize: "0.82rem", lineHeight: 1.6, marginBottom: 16 }}>
                Stop by our café in Magelang for fresh brews, local mains, soccer, and a cozy atmosphere.
              </p>
              <button className="retro-btn" style={{ background: "#f0ead6", color: "#1a5c2a" }} onClick={() => navigate("LOCATION")}>
                VIEW LOCATION
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
