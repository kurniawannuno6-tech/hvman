import React from "react";
import { NAV_ITEMS } from "../Nav/Nav";

export default function Footer({ navigate }) {
  return (
    <footer style={{ background: "#1a5c2a" }}>
      <div className="checker-strip-cream" />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <img 
            src="/images/hvman-logo.png" 
            alt="HVMAN logo" 
            style={{ height: "36px", width: "auto", objectFit: "contain" }} 
          />
          <span className="font-display" style={{ color: "#f0ead6", fontSize: "2rem", letterSpacing: ".12em" }}>café & mini soccer</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px", paddingTop: 18, borderTop: "1px solid rgba(240,234,214,.2)", marginBottom: 16 }}>
          {NAV_ITEMS.map(l => (
            <button key={l} className="nav-link" onClick={() => navigate(l)}>{l}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, paddingTop: 14, borderTop: "1px solid rgba(240,234,214,.12)" }}>
          <span className="font-body" style={{ color: "#f0ead6", opacity: .4, fontSize: ".68rem" }}>© 2026 HVMAN · ALL RIGHTS RESERVED</span>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {["COOKIES", "PRIVACY", "TERMS"].map(l => (
              <span key={l} className="font-body" style={{ color: "#f0ead6", opacity: .45, fontSize: ".68rem", cursor: "pointer" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
