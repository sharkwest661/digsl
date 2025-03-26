import React from "react";

/**
 * Scanlines component - Creates a CRT scanline effect overlay
 * @param {Object} props - Component props
 * @param {number} props.opacity - Opacity of the scanlines (0-1)
 * @param {string} props.className - Additional CSS classes
 */
export const Scanlines = ({ opacity = 0.3, className = "" }) => {
  return (
    <div
      className={`scanlines absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden pointer-events-none z-10 ${className}`}
      style={{ opacity }}
    >
      <style jsx>{`
        .scanlines::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 50%
          );
          background-size: 100% 4px;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

/**
 * CRT effect component - Creates a more advanced CRT screen effect
 * Includes both scanlines and a subtle curvature/vignette
 */
export const CRTEffect = ({ opacity = 0.3, className = "" }) => {
  return (
    <>
      <div
        className={`scanlines absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden pointer-events-none z-10 ${className}`}
        style={{ opacity }}
      />
      <div
        className="crt-effect absolute top-0 left-0 right-0 bottom-0 w-full h-full pointer-events-none overflow-hidden z-11"
        style={{ opacity: 0.1 }}
      />

      <style jsx>{`
        .scanlines::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 50%
          );
          background-size: 100% 4px;
          pointer-events: none;
        }

        .crt-effect {
          background: radial-gradient(
            ellipse at center,
            transparent 0%,
            rgba(0, 0, 0, 0.2) 80%,
            rgba(0, 0, 0, 0.4) 100%
          );
        }
      `}</style>
    </>
  );
};
