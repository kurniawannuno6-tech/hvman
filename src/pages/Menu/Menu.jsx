import React, { useState, useEffect } from "react";
import gsap from "gsap";

const menuData = {
  "Drinks": [
    { name: "HVMAN Matcha", price: "€4.20", desc: "Ceremonial grade, oat milk", badge: "FAN FAV", icon: "/images/matcha.webp" },
    { name: "Iced Espresso", price: "€2.80", desc: "Double shot, Italian blend", badge: "CLASSIC", icon: "/images/espresso.webp" },
    { name: "Cold Brew", price: "€4.00", desc: "18-hour steep, smooth finish", badge: "POPULAR", icon: "/images/cold-brew.webp" },
    { name: "Matcha Swirl Ice Cream", price: "€3.50", desc: "Matcha soft serve + ripple", badge: "MUST TRY", icon: "/images/ice-cream.webp" }
  ],
  "Kitchen Mains": [
    { name: "HVMAN Burger", price: "€12.90", desc: "Beef, aged cheddar, house sauce", badge: "BESTSELLER", icon: "/images/hvman-icon/BURGER.png" },
    { name: "Nasi Goreng Special", price: "€10.50", desc: "Fried rice, sunny side up, chicken satay", badge: "LOCAL FAVORITE", icon: "/images/hvman-icon/NASI GORENG.png" },
    { name: "Teriyaki Rice Bowl", price: "€11.90", desc: "Grilled beef, warm sushi rice, sesame", badge: "SIGNATURE", icon: "/images/hvman-icon/RICEBOWL.png" }
  ],
  "Greens & Sides": [
    { name: "Caesar Salad", price: "€9.50", desc: "Romaine, croutons, parmesan, caesar dressing", badge: "FRESH", icon: "/images/hvman-icon/SALAD.png" },
    { name: "Mushroom Soup", price: "€7.50", desc: "Creamy wild mushroom soup, garlic bread", badge: "WARM & COZY", icon: "/images/hvman-icon/SUP.png" }
  ]
};

export default function Menu() {
  const [cat, setCat] = useState("Drinks");

  useEffect(() => {
    const cards = document.querySelectorAll(".menu-card");
    if (cards.length > 0) {
      gsap.fromTo(cards, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" });
    }
  }, [cat]);

  return (
    <div className="page-enter" style={{ background: "#f0ead6", minHeight: "100vh" }}>
      <div style={{ background: "#1a5c2a", padding: "48px 20px 40px", textAlign: "center" }}>
        <span className="font-marker" style={{ color: "rgba(240,234,214,.6)", fontSize: "1rem" }}>HVMAN's Kitchen</span>
        <h1 className="font-display" style={{ color: "#f0ead6", fontSize: "clamp(3rem,10vw,7rem)", lineHeight: .9, marginTop: 4 }}>OUR MENU</h1>
      </div>
      <div className="checker-strip" />

      {/* category tabs */}
      <div style={{ padding: "24px 20px 8px", display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        {Object.keys(menuData).map(c => (
          <button key={c} onClick={() => setCat(c)}
            style={{
              padding: "8px 20px", borderRadius: 999, border: "2px solid #1a5c2a", cursor: "pointer",
              fontFamily: "'Bebas Neue',sans-serif", letterSpacing: ".1em", fontSize: ".9rem",
              background: cat === c ? "#1a5c2a" : "transparent",
              color: cat === c ? "#f0ead6" : "#1a5c2a",
              transition: "background .2s,color .2s"
            }}>
            {c}
          </button>
        ))}
      </div>

      {/* items */}
      <div style={{
        maxWidth: 900, margin: "0 auto", padding: "20px 20px 64px",
        display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,260px),1fr))", gap: 16
      }}>
        {menuData[cat].map((item, i) => (
          <div key={i} className="menu-card" style={{ background: "#f8f5ea" }}>
            <div style={{
              height: 120, background: "#e8e0c8", display: "flex", alignItems: "center",
              justifyContent: "center", overflow: "hidden", borderBottom: "2px solid #1a5c2a"
            }}>
              <img 
                src={item.icon} 
                alt={item.name} 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: item.icon.includes("hvman-icon") ? "contain" : "cover",
                  padding: item.icon.includes("hvman-icon") ? "14px" : "0"
                }} 
              />
            </div>
            <div style={{ padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                <span className="font-display" style={{ color: "#1a5c2a", fontSize: "1.15rem", letterSpacing: ".06em" }}>{item.name}</span>
                <span className="font-display" style={{ color: "#1a5c2a", fontSize: "1.1rem", whiteSpace: "nowrap" }}>{item.price}</span>
              </div>
              <p className="font-body" style={{ color: "#1a5c2a", opacity: .65, fontSize: ".8rem", lineHeight: 1.5, marginBottom: item.badge ? 10 : 0 }}>{item.desc}</p>
              {item.badge && <span className="tag">{item.badge}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
