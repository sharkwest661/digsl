// components/ui/Window.jsx
import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { useThemeStore } from "../../store";
import { Scanlines } from "../effects/Scanlines";

const Window = ({
  id,
  title,
  children,
  initialPosition = { x: 100, y: 100, width: 600, height: 400 },
  isActive = false,
  zIndex = 10,
  resizable = false,
  onClose,
  onFocus,
  className = "",
  hideControls = false,
  darkHackerTheme = false,
}) => {
  const windowRef = useRef(null);
  const dragTimeoutRef = useRef(null);
  const rafRef = useRef(null);

  // Get theme configuration
  const themeConfig = useThemeStore((state) =>
    darkHackerTheme ? state.darkHackerConfig : state.themeConfig
  );
  const effectsEnabled = useThemeStore((state) => state.effectsEnabled);

  // Local state
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  // Handle window focus when clicked
  const handleWindowClick = () => {
    if (onFocus) {
      onFocus(id);
    }
  };

  // Close window
  const handleClose = (e) => {
    e.stopPropagation();
    if (onClose) {
      onClose(id);
    }
  };

  // Set position when dragging starts
  const handleDragStart = () => {
    setIsDragging(true);
    // Cancel any ongoing animations
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  };

  // Set position when dragging stops
  const handleDragStop = (e, d) => {
    // Clear any pending timeouts
    if (dragTimeoutRef.current) {
      clearTimeout(dragTimeoutRef.current);
      dragTimeoutRef.current = null;
    }

    // Use requestAnimationFrame for smooth updates
    rafRef.current = requestAnimationFrame(() => {
      setPosition((prev) => ({
        ...prev,
        x: d.x,
        y: d.y,
      }));
      setIsDragging(false);
      rafRef.current = null;
    });
  };

  // Set size when resizing stops
  const handleResizeStop = (e, direction, ref, delta, position) => {
    setPosition({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      x: position.x,
      y: position.y,
    });
  };

  // Clean up any pending animations on unmount
  useEffect(() => {
    return () => {
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Set initial position
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  // Performance-optimized window styles
  const windowStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: themeConfig.darkBg,
    border: `1px solid ${themeConfig.accentPrimary}`,
    borderRadius: "2px",
    boxShadow: isActive ? themeConfig.glowEffect : "none",
    color: themeConfig.textLight,
    opacity: isActive ? 1 : 0.85,
    overflow: "hidden",
    transition: isDragging ? "none" : "box-shadow 0.3s ease, opacity 0.3s ease",
    // Hardware acceleration
    transform: "translateZ(0)",
    willChange: isDragging ? "transform" : "transform, opacity, box-shadow",
    backfaceVisibility: "hidden",
  };

  return (
    <Rnd
      ref={windowRef}
      style={{
        ...windowStyle,
        zIndex: zIndex,
      }}
      position={{ x: position.x, y: position.y }}
      size={{ width: position.width, height: position.height }}
      enableResizing={resizable && !isDragging}
      disableDragging={false}
      dragHandleClassName="window-drag-handle"
      cancel=".window-no-drag"
      enableUserSelectHack={false} // Important performance fix
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onClick={handleWindowClick}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      className={`${className} ${isDragging ? "window-dragging" : ""}`}
    >
      {/* Window Title Bar */}
      <div
        className="window-drag-handle flex justify-between items-center"
        style={{
          backgroundColor: themeConfig.lightBg,
          borderBottom: `1px solid ${themeConfig.accentPrimary}`,
          cursor: "move",
          paddingInline: "0.5rem",
          paddingBlock: "0.2rem",
        }}
      >
        <div
          className="font-mono uppercase tracking-wider text-sm font-bold"
          style={{
            color: themeConfig.accentPrimary,
            textShadow:
              isActive && !isDragging ? "0 0 5px rgba(255,0,160,0.7)" : "none",
          }}
        >
          {title}
        </div>

        {!hideControls && (
          <button
            onClick={handleClose}
            className="w-4 h-4 rounded-full transition-transform duration-200 hover:scale-110 window-no-drag"
            style={{ backgroundColor: themeConfig.warningRed }}
          />
        )}
      </div>

      {/* Window Content - IMPORTANT: We keep the actual children render at all times */}
      <div
        className={`flex-1 overflow-auto relative window-no-drag ${
          isDragging ? "optimized-content" : ""
        }`}
        style={{
          backgroundColor: themeConfig.darkBg,
        }}
      >
        {/* The key is to keep children mounted but apply optimizations via CSS */}
        {children}

        {/* Apply scanlines effect if enabled and not dragging */}
        {effectsEnabled.scanlines && !isDragging && (
          <Scanlines opacity={0.15} />
        )}

        {/* Semi-transparent overlay during drag to indicate dragging state */}
        {isDragging && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center pointer-events-none z-50">
            <div className="text-white text-opacity-80 font-mono text-sm">
              Moving...
            </div>
          </div>
        )}
      </div>

      {/* Add global CSS for dragging optimization */}
      <style jsx global>{`
        /* Optimize content during drag */
        .window-dragging {
          pointer-events: none !important;
          cursor: grabbing !important;
          user-select: none !important;
        }

        /* Reduce animations during dragging but DON'T HIDE content */
        .optimized-content {
          transition: none !important;
        }

        /* This ensures media keeps playing but visuals are optimized */
        .optimized-content * {
          animation-play-state: paused !important;
          transition: none !important;
        }

        /* Ensure audio/video elements continue playback */
        .optimized-content audio,
        .optimized-content video,
        .optimized-content [data-playing="true"] {
          animation-play-state: running !important;
        }
      `}</style>
    </Rnd>
  );
};

export default Window;
