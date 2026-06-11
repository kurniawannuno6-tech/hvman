import React, { useState, useCallback, useEffect } from "react";
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

  const navigate = useCallback((p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (loaded) {
      // Fade in main site layout on load complete
      gsap.fromTo(".app-content-wrapper", 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.1 }
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
        <Nav current={page} navigate={navigate} />
        {renderPage()}
        <Footer navigate={navigate} />
      </div>
    </div>
  );
}
