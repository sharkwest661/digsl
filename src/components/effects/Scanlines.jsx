// components/effects/Scanlines.jsx
import React from "react";

/**
 * Scanlines component - Creates a CRT scanline effect overlay
 * Performance optimized version
 */
export const Scanlines = ({ opacity = 0.3, className = "" }) => {
  return (
    <div
      className={`scanlines absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-10 ${className}`}
      style={{
        opacity,
        backgroundImage: `linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.3) 50%)`,
        backgroundSize: "100% 4px",
        backgroundRepeat: "repeat",
        willChange: "opacity", // Hardware acceleration hint
        transform: "translateZ(0)", // Force GPU rendering
      }}
    />
  );
};

/**
 * CRT effect component - More efficient implementation
 */
export const CRTEffect = ({ opacity = 0.3, className = "" }) => {
  return (
    <div
      className={`crt-effect absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-11 ${className}`}
      style={{
        opacity: opacity,
        background:
          "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.4) 100%)",
        transform: "translateZ(0)", // Force GPU rendering
        willChange: "opacity", // Hardware acceleration hint
        backfaceVisibility: "hidden",
      }}
    />
  );
};
