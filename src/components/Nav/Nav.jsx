import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export const NAV_ITEMS = ["HOME", "MENU", "GALLERY", "LOCATION", "CONTACT"];

export default function Nav({ current, navigate, transitioning }) {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);

  const toggle = () => setOpen(p => !p);
  const go = (page) => {
    navigate(page);
    setOpen(false);
  };

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      el.style.display = "flex";
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      const links = el.querySelectorAll(".mobile-nav-link");
      gsap.fromTo(
        links,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "back.out(1.6)", delay: 0.1 }
      );
    } else {
      if (!transitioning) {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
      gsap.to(el, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          el.style.display = "none";
        },
      });
    }
    return () => {
      if (!transitioning) {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    };
  }, [open, transitioning]);

  return (
    <>
      {/* NAVBAR CONTAINER: position "sticky" sticks it to the top. zIndex: 200 keeps it above sections. */}
      <nav style={{ background: "#1a5c2a", position: "sticky", top: 0, zIndex: 200, width: "100%" }}>
        {/* .nav-container (defined in index.css) is a 3-column grid that centers the logo. */}
        <div className="nav-container">
          {/* DESKTOP NAV LINKS (LEFT): Contains first 2 items. Will hide on screens <= 768px. */}
          <div className="desktop-nav-left">
            {NAV_ITEMS.slice(0, 2).map(l => (
              <button key={l} className={`nav-link ${current === l ? "active" : ""}`} onClick={() => go(l)}>{l}</button>
            ))}
          </div>

          {/* BRAND LOGO BUTTON: Centered in grid. */}
          <button onClick={() => go("HOME")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
            {/* Header logo size: Change height "30px" to adjust the size of the logo in the nav header. */}
            <img 
              src="/images/hvman-logo.png" 
              alt="HVMAN logo" 
              style={{ height: "30px", width: "auto", objectFit: "contain" }} 
            />
          </button>

          {/* DESKTOP NAV LINKS (RIGHT): Contains remaining items. Will hide on screens <= 768px. */}
          <div className="desktop-nav-right">
            {NAV_ITEMS.slice(2).map(l => (
              <button key={l} className={`nav-link ${current === l ? "active" : ""}`} onClick={() => go(l)}>{l}</button>
            ))}
          </div>

          {/* hamburger button (visible on mobile only) */}
          <button onClick={toggle} className="hamburger-btn" aria-label="Toggle menu">
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 2, background: "#f0ead6", borderRadius: 2,
                transition: "transform .3s,opacity .3s",
                transform: open ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none") : "none",
                opacity: open && i === 1 ? 0 : 1
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* mobile/full overlay menu */}
      <div ref={overlayRef} style={{
        display: "none", position: "fixed", inset: 0, background: "#1a5c2a", zIndex: 300,
        flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8
      }}>
        <button onClick={() => setOpen(false)} aria-label="Close"
          style={{ position: "absolute", top: 18, right: 20, background: "none", border: "none", cursor: "pointer" }}>
          <span style={{ color: "#f0ead6", fontSize: "2rem", lineHeight: 1 }}>✕</span>
        </button>
        <div className="checker-strip-cream" style={{ position: "absolute", top: 0 }} />
        <div className="font-display" style={{ color: "rgba(240,234,214,.12)", fontSize: "min(30vw,9rem)", position: "absolute", userSelect: "none", letterSpacing: ".1em" }}>HVMAN</div>
        {NAV_ITEMS.map(l => (
          <button key={l} className="mobile-nav-link" onClick={() => go(l)}>{l}</button>
        ))}
        <div className="checker-strip-cream" style={{ position: "absolute", bottom: 0 }} />
      </div>
    </>
  );
}
