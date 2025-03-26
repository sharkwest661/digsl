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
  darkHackerTheme = false, // Use dark hacker theme instead of cyberpunk
}) => {
  const windowRef = useRef(null);

  // Get theme configuration
  const themeConfig = useThemeStore((state) =>
    darkHackerTheme ? state.darkHackerConfig : state.themeConfig
  );
  const effectsEnabled = useThemeStore((state) => state.effectsEnabled);

  // Track window position for non-managed windows
  const [position, setPosition] = useState(initialPosition);

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

  // Set position when dragging stops
  const handleDragStop = (e, d) => {
    setPosition((prev) => ({
      ...prev,
      x: d.x,
      y: d.y,
    }));
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

  // Set initial position
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

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
    transition: "box-shadow 0.3s ease, opacity 0.3s ease",
  };

  return (
    <Rnd
      ref={windowRef}
      style={{
        ...windowStyle,
        zIndex: zIndex,
      }}
      default={initialPosition}
      position={{ x: position.x, y: position.y }}
      size={{ width: position.width, height: position.height }}
      enableResizing={resizable}
      dragHandleClassName="window-drag-handle"
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onClick={handleWindowClick}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      className={className}
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
            textShadow: isActive ? "0 0 5px rgba(255,0,160,0.7)" : "none",
          }}
        >
          {title}
        </div>

        {!hideControls && (
          <button
            onClick={handleClose}
            className="w-4 h-4 rounded-full transition-transform duration-200 hover:scale-110"
            style={{ backgroundColor: themeConfig.warningRed }}
          />
        )}
      </div>

      {/* Window Content */}
      <div
        className="flex-1 overflow-auto relative"
        style={{
          backgroundColor: themeConfig.darkBg,
        }}
      >
        {children}

        {/* Apply scanlines effect if enabled */}
        {effectsEnabled.scanlines && <Scanlines opacity={0.15} />}
      </div>
    </Rnd>
  );
};

export default Window;
