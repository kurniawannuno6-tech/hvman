import React from "react";

const CupMascot = ({ size = 120, character = "01" }) => {
  const charIndex = typeof character === "number" 
    ? String(character).padStart(2, "0") 
    : character;
    
  return (
    <img
      src={`/images/hvman-mascot/HVMAN Character-${charIndex}.png`}
      alt={`HVMAN Character ${charIndex}`}
      style={{ width: size, height: "auto", objectFit: "contain", display: "inline-block" }}
      onError={(e) => {
        e.target.src = "/images/hvman-mascot/HVMAN Character-01.png";
      }}
    />
  );
};

export default CupMascot;
