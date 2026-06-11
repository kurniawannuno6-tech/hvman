import React from "react";

const IceCreamMascot = ({ size = 180 }) => (
  <img
    src="/images/hvman-mascot/HVMAN Character-04.png"
    alt="HVMAN Mascot"
    style={{ width: size, height: "auto", objectFit: "contain", display: "inline-block" }}
    onError={(e) => {
      e.target.src = "/images/hvman-mascot/HVMAN Character-01.png";
    }}
  />
);

export default IceCreamMascot;
