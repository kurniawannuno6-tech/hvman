import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Location() {
  useEffect(() => {
    let mapInstance = null;

    const initMap = (L) => {
      const coords = [-7.5022589, 110.2241547];
      
      // Initialize Leaflet map
      mapInstance = L.map("interactive-map", {
        center: coords,
        zoom: 16,
        scrollWheelZoom: false, // Prevent zoom on page scroll
      });

      // Use CartoDB Voyager tiles for a clean, premium light-cream style
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapInstance);

      // Custom marker icon using the HVMAN icon/logo style
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background: #1a5c2a; 
            border: 2px solid #f0ead6; 
            border-radius: 50%; 
            width: 42px; 
            height: 42px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            transform: translate(-1px, -1px);
          ">
            <img src="/images/hvman-icon.png" style="width: 26px; height: 26px; object-fit: contain;" alt="HVMAN" />
          </div>
        `,
        iconSize: [42, 42],
        iconAnchor: [21, 42],
        popupAnchor: [0, -42]
      });

      const marker = L.marker(coords, { icon: customIcon }).addTo(mapInstance);

      // Bind beautifully styled popup to matching theme colors
      marker.bindPopup(`
        <div style="font-family: 'Inter', sans-serif; color: #1a5c2a; min-width: 220px; padding: 2px;">
          <h4 style="font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem; margin: 0 0 6px 0; font-weight: 400; letter-spacing: 0.06em; line-height: 1.1;">HVMAN CAFE</h4>
          <p style="font-size: 0.8rem; margin: 0 0 10px 0; opacity: 0.8; line-height: 1.45;">Jl. Soekarno Hatta No.5, Tidar Selatan, Magelang Selatan, Kota Magelang</p>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(26,92,42,0.15); padding-top: 8px; margin-top: 4px;">
            <a href="https://maps.app.goo.gl/rU8WnvmcfA1TgJ3x8" target="_blank" style="
              background: #1a5c2a; 
              color: #f0ead6; 
              text-decoration: none; 
              font-size: 0.72rem; 
              padding: 4px 10px; 
              border-radius: 999px; 
              font-family: 'Bebas Neue', sans-serif;
              letter-spacing: 0.05em;
              display: inline-block;
            ">OPEN IN MAPS</a>
            <span style="font-size: 0.75rem; color: #1a5c2a; font-weight: 600;">⚽ MINI SOCCER</span>
          </div>
        </div>
      `);

      // Auto-open popup on map mount
      marker.openPopup();

      // Trigger redraw to fix height issues on initialization inside container animations
      setTimeout(() => {
        if (mapInstance) {
          mapInstance.invalidateSize();
        }
      }, 300);
    };

    const loadLeaflet = () => {
      if (window.L) {
        initMap(window.L);
        return;
      }

      // Dynamic css injection
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.crossOrigin = "";
      document.head.appendChild(link);

      // Dynamic js injection
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.crossOrigin = "";
      script.onload = () => {
        initMap(window.L);
      };
      document.head.appendChild(script);
    };

    loadLeaflet();

    // GSAP Scroll reveals
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
      if (mapInstance) {
        mapInstance.remove();
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const loc = {
    name: "HVMAN Cafe & Mini Soccer Magelang",
    address: "Jl. Soekarno Hatta No.5, Tidar Sel., Magelang",
    hours: "08:00 – 23:00 daily",
    phone: "+62 811-2992-451",
    directionsUrl: "https://maps.app.goo.gl/rU8WnvmcfA1TgJ3x8"
  };

  return (
    <div className="page-enter" style={{ background: "#f0ead6", minHeight: "100vh" }}>
      <div style={{ background: "#1a5c2a", padding: "48px 20px 40px", textAlign: "center" }}>
        <span className="font-marker" style={{ color: "rgba(240,234,214,.6)", fontSize: "1rem" }}>Find us in the city</span>
        <h1 className="font-display" style={{ color: "#f0ead6", fontSize: "clamp(3rem,10vw,7rem)", lineHeight: .9, marginTop: 4 }}>LOCATION</h1>
      </div>
      <div className="checker-strip" />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 20px 64px" }}>
        <div className="location-card section-reveal" style={{ marginBottom: 24 }}>
          {/* Interactive Dynamic Map Div */}
          <div style={{ height: 400, borderBottom: "2px solid #1a5c2a", position: "relative", overflow: "hidden" }}>
            <div id="interactive-map" style={{ width: "100%", height: "100%", background: "#e8e0c8" }}></div>
            <span className="tag" style={{ position: "absolute", top: 12, left: 12, zIndex: 1000 }}>MAIN CAFE & ARENA</span>
          </div>

          <div style={{ padding: "22px 24px" }}>
            <h3 className="font-display" style={{ color: "#1a5c2a", fontSize: "1.3rem", letterSpacing: ".06em", marginBottom: 12 }}>{loc.name}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { icon: "📍", text: loc.address },
                { icon: "🕐", text: loc.hours },
                { icon: "📞", text: loc.phone },
              ].map((r, j) => (
                <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1rem", flexShrink: 0, lineHeight: 1.5 }}>{r.icon}</span>
                  <span className="font-body" style={{ color: "#1a5c2a", opacity: .75, fontSize: ".85rem", lineHeight: 1.5 }}>{r.text}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button 
                className="retro-btn" 
                onClick={() => window.open(loc.directionsUrl, "_blank")}
              >
                GET DIRECTIONS
              </button>
              <a 
                href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                className="retro-btn-outline"
                style={{ textDecoration: "none" }}
              >
                CALL NOW
              </a>
            </div>
          </div>
        </div>

        {/* Transport & Access info */}
        <div className="section-reveal" style={{ border: "2px solid #1a5c2a", borderRadius: 14, padding: "24px", background: "#f8f5ea", marginTop: 8 }}>
          <h3 className="font-display" style={{ color: "#1a5c2a", fontSize: "1.3rem", letterSpacing: ".06em", marginBottom: 16 }}>GETTING HERE</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
            {[
              { icon: "🚗", label: "Car & Bike", sub: "Access via Jl. Soekarno-Hatta main road. Free parking on site." },
              { icon: "🛵", label: "Ride-Hailing", sub: "Gojek / Grab drop-off right outside the mini soccer gate." },
              { icon: "🚌", label: "Public Bus", sub: "Tidar Terminal stop within a short walking distance." },
              { icon: "⚽", label: "Soccer Pitch", sub: "Direct walkway access to the mini soccer arena behind the cafe." },
            ].map((t, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 6 }}>{t.icon}</div>
                <div className="font-display" style={{ color: "#1a5c2a", fontSize: "1rem", letterSpacing: ".06em", marginBottom: 3 }}>{t.label}</div>
                <div className="font-body" style={{ color: "#1a5c2a", opacity: .65, fontSize: ".75rem", lineHeight: 1.5 }}>{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
