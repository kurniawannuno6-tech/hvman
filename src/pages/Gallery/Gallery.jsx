import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import galleryImages from "../../data/gallery-manifest.json";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [displayPhotos, setDisplayPhotos] = useState(galleryImages);
  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });

  // Dynamically extract unique categories present in the manifest
  const categories = ["All", ...new Set(galleryImages.map((img) => img.category))];

  // Handle Category Change (Smooth Stagger Out-In Transition)
  const handleCategoryChange = (newCat) => {
    if (newCat === activeCategory) return;

    const items = gsap.utils.toArray(".gallery-item");
    if (items.length > 0) {
      // 1. Stagger animate out the current active grid items
      gsap.to(items, {
        opacity: 0,
        y: -15,
        scale: 0.95,
        duration: 0.22,
        stagger: 0.012,
        ease: "power2.in",
        overwrite: "auto",
        onComplete: () => {
          // 2. Perform DOM update inside the transparency window
          setActiveCategory(newCat);
          const nextPhotos = newCat === "All" 
            ? galleryImages 
            : galleryImages.filter((p) => p.category === newCat);
          setDisplayPhotos(nextPhotos);
        }
      });
    } else {
      setActiveCategory(newCat);
      const nextPhotos = newCat === "All" 
        ? galleryImages 
        : galleryImages.filter((p) => p.category === newCat);
      setDisplayPhotos(nextPhotos);
    }
  };

  // Re-run stagger entry whenever displayPhotos changes
  useEffect(() => {
    // Kill existing ScrollTriggers to prevent memory leaks
    ScrollTrigger.getAll().forEach(t => t.kill());

    const items = gsap.utils.toArray(".gallery-item");
    if (items.length > 0) {
      // 3. Lock elements to hidden before starting the fade-in, avoiding visual flickers
      gsap.set(items, { opacity: 0, scale: 0.95, y: 15 });

      // 4. Stagger animate in the new active grid items
      gsap.to(items, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.018,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  }, [displayPhotos]);

  const openLightbox = (index) => {
    setLightbox({ isOpen: true, index });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, index: 0 });
    document.body.style.overflow = "";
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % displayPhotos.length,
    }));
  };

  const prevPhoto = (e) => {
    e?.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + displayPhotos.length) % displayPhotos.length,
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.isOpen) return;
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox.isOpen, displayPhotos.length]);

  return (
    <div className="page-enter" style={{ background: "#f0ead6", minHeight: "100vh" }}>
      {/* Header Banner */}
      <div style={{ background: "#1a5c2a", padding: "48px 20px 40px", textAlign: "center" }}>
        <span className="font-marker" style={{ color: "rgba(240,234,214,.6)", fontSize: "1rem" }}>HVMAN's Moments</span>
        <h1 className="font-display" style={{ color: "#f0ead6", fontSize: "clamp(3rem,10vw,7rem)", lineHeight: .9, marginTop: 4 }}>GALLERY</h1>
      </div>
      <div className="checker-strip" />

      {/* Categories Filter Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, padding: "32px 20px 12px", flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            style={{
              padding: "8px 22px",
              borderRadius: "999px",
              border: "2px solid #1a5c2a",
              cursor: "pointer",
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: ".1em",
              fontSize: ".9rem",
              background: activeCategory === cat ? "#1a5c2a" : "transparent",
              color: activeCategory === cat ? "#f0ead6" : "#1a5c2a",
              transition: "background 0.2s, color 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.04)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Gallery Photo Grid */}
      <div className="gallery-grid" style={{ minHeight: "400px" }}>
        {displayPhotos.map((p, i) => (
          <div 
            key={p.src + i} 
            className="gallery-item"
            onClick={() => openLightbox(i)}
          >
            <img src={p.src} alt={p.title} className="gallery-img" loading="lazy" />
            <div className="gallery-overlay">
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span className="tag" style={{ alignSelf: "flex-start", fontSize: "0.6rem", padding: "1px 8px" }}>
                  {p.category.toUpperCase()}
                </span>
                <span className="gallery-caption">{p.title}</span>
              </div>
            </div>
          </div>
        ))}

        {displayPhotos.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "64px 20px" }}>
            <p className="font-body" style={{ color: "#1a5c2a", opacity: 0.6 }}>No photos found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal overlay */}
      {lightbox.isOpen && displayPhotos[lightbox.index] && createPortal(
        <div 
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(26, 92, 42, 0.92)",
            backdropFilter: "blur(8px)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.25s ease forwards"
          }}
        >
          {/* Close Button overlay */}
          <button 
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "transparent",
              border: "none",
              color: "#f0ead6",
              fontSize: "2.5rem",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              zIndex: 10002,
              lineHeight: 1
            }}
            onMouseEnter={(e) => e.target.style.transform = "rotate(90deg) scale(1.1)"}
            onMouseLeave={(e) => e.target.style.transform = "rotate(0deg) scale(1)"}
          >
            ×
          </button>

          {/* Previous Arrow Button */}
          <button
            className="lightbox-btn-prev"
            onClick={prevPhoto}
          >
            ←
          </button>

          {/* Lightbox Main Content Frame */}
          <div 
            className="lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Wrapper */}
            <div className="lightbox-img-wrapper">
              <img 
                src={displayPhotos[lightbox.index].src} 
                alt={displayPhotos[lightbox.index].title} 
                className="lightbox-img"
              />
            </div>

            {/* Footer with Title and Counter */}
            <div style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8f5ea" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span className="tag" style={{ alignSelf: "flex-start", marginBottom: 2 }}>
                  {displayPhotos[lightbox.index].category.toUpperCase()}
                </span>
                <h3 className="font-display" style={{ color: "#1a5c2a", fontSize: "1.75rem", letterSpacing: "0.06em", margin: 0 }}>
                  {displayPhotos[lightbox.index].title}
                </h3>
              </div>
              <div className="font-body" style={{ color: "#1a5c2a", opacity: 0.7, fontSize: "0.9rem", fontWeight: 600 }}>
                {lightbox.index + 1} / {displayPhotos.length}
              </div>
            </div>
          </div>

          {/* Next Arrow Button */}
          <button
            className="lightbox-btn-next"
            onClick={nextPhoto}
          >
            →
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
