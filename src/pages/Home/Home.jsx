import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CupMascot from "../../components/Mascot/CupMascot";
import IceCreamMascot from "../../components/Mascot/IceCreamMascot";

gsap.registerPlugin(ScrollTrigger);

export default function Home({ navigate }) {
  useEffect(() => {
    // Hero anims
    gsap.fromTo("#hero-title", { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "back.out(1.4)", delay: 0.2 });
    gsap.fromTo(".hero-mascot", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "bounce.out" });
    const bounceTween = gsap.to(".hero-mascot", { y: -10, duration: 2, repeat: -1, yoyo: true, ease: "power1.inOut", delay: 1.5 });

    // Section reveal animations
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
      bounceTween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const reviews = [
    { author: "REVA", text: "HVMAN Café offers the right amount of coffee and snacks. Perfectly matched by cheerful staff — it's a perfect spot for a satisfying culinary experience." },
    { author: "MILA", text: "The retro vibes are immaculate. Great matcha, comfy seats, and the checkerboard aesthetic just hits different." },
    { author: "FINN", text: "Best espresso in Magelang. The atmosphere is playful but the coffee is serious — exactly what a specialty café should be." },
  ];

  return (
    <div className="page-enter" style={{ background: "#f0ead6" }}>
      {/* ── Hero */}
      <section style={{ background: "#1a5c2a", padding: "48px 20px 32px", overflow: "hidden", position: "relative" }}>
        <div style={{
          position: "absolute", top: 56, right: "8%", background: "#f0ead6", borderRadius: "50%",
          width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(15deg)"
        }}>
          <span className="font-marker" style={{ color: "#1a5c2a", fontSize: ".62rem", textAlign: "center", lineHeight: 1.2 }}>Gourmet</span>
        </div>
        <div style={{ textAlign: "center", position: "relative" }}>
          {/* Hero Content Wrapper: Centered logo container with mascot positioned to the left on desktop. */}
          <div className="hero-container">
            <div className="hero-logo-wrapper">
              
              {/* Mascot Container: Sits absolutely to the left of the logo on desktop, stacks on mobile. */}
              <div className="hero-mascot-wrapper hero-mascot">
                <CupMascot size="clamp(50px, 18vw, 100px)" character="01" />
              </div>

              {/* Logo: Centered mathematically in the middle of the screen. */}
              <img 
                id="hero-title" 
                src="/images/hvman-logo.png" 
                alt="HVMAN Logo" 
                style={{ height: "clamp(50px, 20vw, 100px)", width: "auto", objectFit: "contain", maxWidth: "100%" }} 
              />

            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 360, margin: "8px auto 0", padding: "0 12px" }}>
            <span className="font-body" style={{ color: "#f0ead6", opacity: .6, fontSize: ".72rem", letterSpacing: ".2em" }}>MAGELANG</span>
            <span className="font-body" style={{ color: "#f0ead6", opacity: .6, fontSize: ".72rem", letterSpacing: ".2em" }}>EST. 2xxx</span>
          </div>
        </div>
      </section>
      <div className="checker-strip" />

      {/* ── Welcome */}
      <section className="section-reveal" style={{ padding: "60px 20px", textAlign: "center" }}>
        <p className="font-marker" style={{ color: "#1a5c2a", fontSize: "1rem", marginBottom: 12 }}>HVMAN Café Magelang:</p>
        <h2 className="font-display" style={{ color: "#1a5c2a", fontSize: "clamp(2.2rem,7vw,5rem)", lineHeight: .95, maxWidth: 640, margin: "0 auto 28px" }}>
          EAT,<br />KICK,<br />WIN.
        </h2>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="retro-btn" onClick={() => navigate("MENU")}>VIEW MENU</button>
          <button className="retro-btn-outline" onClick={() => navigate("LOCATION")}>FIND US</button>
        </div>
      </section>

      {/* ── Drinks card */}
      <section className="section-reveal" style={{ padding: "0 20px 60px" }}>
        <div style={{
          maxWidth: 900, margin: "0 auto", border: "2px solid #1a5c2a", borderRadius: 16, overflow: "hidden",
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))"
        }}>
          <div style={{ background: "#e8e0c8", padding: "40px 32px" }}>
            <h3 className="font-display" style={{ color: "#1a5c2a", fontSize: "clamp(1.8rem,4vw,2.8rem)", lineHeight: 1.1, marginBottom: 14 }}>Drinks<br />and burgers</h3>
            <p className="font-body" style={{ color: "#1a5c2a", opacity: .7, fontSize: ".85rem", lineHeight: 1.65, marginBottom: 24, maxWidth: 280 }}>
              Discover an espresso-drive thru in a retro atmosphere — distinguished service with homely vibe and comfort food.
            </p>
            <button className="retro-btn" onClick={() => navigate("LOCATION")}>LOCATION</button>
          </div>
          <div className="checker" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 240, padding: 20 }}>
            <div style={{
              background: "#f0ead6", borderRadius: "50%", width: 180, height: 180,
              border: "2px solid #1a5c2a", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden"
            }}>
              <CupMascot size={150} character="03" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Best Drinks */}
      <section className="section-reveal" style={{ padding: "0 20px 60px", textAlign: "center" }}>
        <h2 className="font-display" style={{ color: "#1a5c2a", fontSize: "clamp(1.8rem,5vw,3rem)", letterSpacing: ".06em", marginBottom: 36 }}>OUR BEST DRINKS</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(20px, 4vw, 48px)", flexWrap: "wrap" }}>
          {[
            { label: "HVMAN MATCHA", src: "/images/matcha.webp", size: 170, alt: "HVMAN Matcha Tea" },
            { label: "ICED ESPRESSO", src: "/images/espresso.webp", size: 145, alt: "Iced Espresso Coffee" },
            { label: "COLD BREW", src: "/images/cold-brew.webp", size: 145, alt: "Cold Brew Glass" },
          ].map((d, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{
                border: "2px solid #1a5c2a", borderRadius: "50%", width: d.size, height: d.size,
                display: "flex", alignItems: "center", justifyContent: "center", background: "#e8e0c8", overflow: "hidden"
              }}>
                <img
                  src={d.src}
                  alt={d.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = `<span style="font-size: ${d.size * 0.38}px">${i === 0 ? '🍵' : i === 1 ? '☕' : '🧋'}</span>`;
                  }}
                />
              </div>
              {i === 0 && <span className="tag">POPULAR</span>}
              <span className="font-body" style={{ color: "#1a5c2a", fontSize: ".78rem", letterSpacing: ".12em", fontWeight: 600 }}>{d.label}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <button className="retro-btn" onClick={() => navigate("MENU")}>SEE FULL MENU →</button>
        </div>
      </section>

      {/* ── Ice Cream */}
      <section className="section-reveal" style={{ textAlign: "center", padding: "0 20px 60px" }}>
        <h2 className="font-display" style={{ color: "#1a5c2a", fontSize: "clamp(3.5rem,11vw,8rem)", lineHeight: .9, marginBottom: 16 }}>ICE CREAM</h2>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <div style={{
            border: "2px solid #1a5c2a", borderRadius: "24px", width: "100%", maxWidth: 360, height: 220,
            background: "#e8e0c8", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <img
              src="/images/ice-cream.webp"
              alt="Artisan Ice Cream Swirl"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = `<div style="display:flex;justify-content:center;align-items:center;width:100%;height:100%"><span style="font-size: 80px">🍦</span></div>`;
              }}
            />
          </div>
          <IceCreamMascot size={150} />
        </div>
        <p className="font-body" style={{ color: "#1a5c2a", opacity: .65, fontSize: ".85rem", marginTop: 10, marginBottom: 20 }}>Seasonal scoops & sundaes daily from 12pm</p>
        <button className="retro-btn" onClick={() => navigate("MENU")}>MENU</button>
      </section>

      {/* ── Reviews */}
      <section style={{ background: "#1a5c2a" }}>
        <div className="checker-strip-cream" />
        <div style={{ padding: "56px 20px 60px", maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <span className="font-marker" style={{ color: "#f0ead6", fontSize: "1rem", display: "block", marginBottom: 20 }}>What people say</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {reviews.map((r, i) => (
              <div key={i} className="review-card" style={{ textAlign: "left", transform: `rotate(${[-1.5, .5, -.5][i]}deg)` }}>
                <p className="font-body" style={{ color: "#3a3228", fontSize: ".84rem", lineHeight: 1.65, marginBottom: 10 }}>{r.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="font-display" style={{ color: "#1a5c2a", fontSize: ".95rem", letterSpacing: ".1em" }}>{r.author}</span>
                  <span className="star-rating" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
