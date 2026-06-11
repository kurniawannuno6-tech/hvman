import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import CupMascot from "../Mascot/CupMascot";

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const screenRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // loading ticker logic
    const duration = 1200; 
    const intervalTime = 12; 
    const totalSteps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const nextProgress = Math.min(Math.round((step / totalSteps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress === 100) {
        clearInterval(timer);
        
        // GSAP slide out timeline
        const tl = gsap.timeline({
          onComplete: onDone
        });

        tl.to(contentRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power2.in"
        })
        .to(screenRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.inOut"
        }, "-=0.2");
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div ref={screenRef} className="loader-screen">
      <div ref={contentRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        {/* Mascot */}
        <div style={{ marginBottom: 12 }}>
          <CupMascot size={130} character="01" />
        </div>

        {/* Brand logo */}
        <img 
          src="/images/hvman-logo.png" 
          alt="HVMAN logo" 
          style={{ height: "48px", width: "auto", objectFit: "contain", marginBottom: 16 }} 
        />

        {/* Progress Bar */}
        <div className="loader-bar-bg">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Percentage Counter */}
        <div className="font-display" style={{ fontSize: "1.8rem", marginTop: 16, color: "#f0ead6", letterSpacing: "0.15em" }}>
          LOADING {String(progress).padStart(2, "0")}%
        </div>
      </div>
    </div>
  );
}
