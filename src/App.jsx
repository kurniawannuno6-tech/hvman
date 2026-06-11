import React, { useState, useCallback, useEffect, useRef } from "react";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Gallery from "./pages/Gallery/Gallery";
import Location from "./pages/Location/Location";
import Contact from "./pages/Contact/Contact";
import Loader from "./components/Loader/Loader";
import gsap from "gsap";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState("HOME");
  const [transitioning, setTransitioning] = useState(false);
  const curtainRef = useRef(null);

  const navigate = useCallback((p) => {
    if (transitioning || p === page) return;
    setTransitioning(true);
    document.body.style.overflow = "hidden"; // lock scroll during page transition
    document.documentElement.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setTransitioning(false);
        document.body.style.overflow = ""; // restore scroll when transition completes
        document.documentElement.style.overflow = "";
      }
    });

    // 1. Slide curtain down to cover viewport
    tl.to(curtainRef.current, {
      y: "0%",
      duration: 0.45,
      ease: "power3.inOut"
    });

    // 2. Change page and scroll to top instantly
    tl.add(() => {
      setPage(p);
      window.scrollTo({ top: 0, behavior: "instant" });
    });

    // 3. Slide curtain down and out
    tl.to(curtainRef.current, {
      y: "100%",
      duration: 0.45,
      ease: "power3.inOut"
    });

    // 4. Reset curtain position to top instantly
    tl.set(curtainRef.current, {
      y: "-100%"
    });

  }, [page, transitioning]);

  useEffect(() => {
    if (loaded) {
      // Fade in main site layout on load complete
      gsap.fromTo(".app-content-wrapper", 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.1, onComplete: () => {
          gsap.set(".app-content-wrapper", { clearProps: "transform" });
        }}
      );
    }
  }, [loaded]);

  const renderPage = () => {
    switch (page) {
      case "MENU":
        return <Menu />;
      case "GALLERY":
        return <Gallery />;
      case "LOCATION":
        return <Location />;
      case "CONTACT":
        return <Contact navigate={navigate} />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <div style={{ background: "#f0ead6", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>
      {/* Loading Screen Overlay */}
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      
      {/* Primary Site Content Container */}
      <div className="app-content-wrapper" style={{ opacity: loaded ? 1 : 0 }}>
        <Nav current={page} navigate={navigate} transitioning={transitioning} />
        {renderPage()}
        <Footer navigate={navigate} />
      </div>

      {/* Page Transition Curtain Sweep Overlay */}
      <div 
        ref={curtainRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#1a5c2a",
          zIndex: 9999, // sits above nav (zIndex 200) and site content
          transform: "translateY(-100%)", // sits above viewport initially
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          pointerEvents: "auto"
        }}
      >
        <div className="checker-strip-cream" style={{ position: "absolute", top: 0 }} />
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
          <img 
            src="/images/hvman-logo.png" 
            alt="HVMAN logo" 
            style={{ 
              maxHeight: "110px", 
              maxWidth: "85%", 
              width: "auto", 
              height: "auto", 
              objectFit: "contain" 
            }} 
          />
        </div>

        <div className="checker-strip-cream" style={{ position: "absolute", bottom: 0 }} />
      </div>
    </div>
  );
}
