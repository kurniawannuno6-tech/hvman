import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
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

  const photos = [
    { src: "/images/gallery-interior.webp", title: "Cozy Corners" },
    { src: "/images/gallery-croissant.webp", title: "Fresh Bakes" },
    { src: "/images/gallery-matcha-prep.webp", title: "Matcha Craft" },
    { src: "/images/gallery-drip-coffee.webp", title: "Slow Drip" },
    { src: "/images/gallery-barista.webp", title: "Our Crew" },
    { src: "/images/gallery-beans.webp", title: "Premium Roast" },
  ];

  return (
    <div className="page-enter" style={{ background: "#f0ead6", minHeight: "100vh" }}>
      <div style={{ background: "#1a5c2a", padding: "48px 20px 40px", textAlign: "center" }}>
        <span className="font-marker" style={{ color: "rgba(240,234,214,.6)", fontSize: "1rem" }}>HVMAN's Moments</span>
        <h1 className="font-display" style={{ color: "#f0ead6", fontSize: "clamp(3rem,10vw,7rem)", lineHeight: .9, marginTop: 4 }}>GALLERY</h1>
      </div>
      <div className="checker-strip" />

      <div className="gallery-grid">
        {photos.map((p, i) => (
          <div key={i} className="gallery-item section-reveal">
            <img src={p.src} alt={p.title} className="gallery-img" />
            <div className="gallery-overlay">
              <span className="gallery-caption">{p.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
