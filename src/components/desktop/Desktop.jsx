// components/desktop/Desktop.jsx
import React, { useEffect, useState } from "react";
import { useWindowsStore, useThemeStore, APP_TYPES } from "../../store";
import { Window } from "../ui";
import { Scanlines, CRTEffect } from "../effects";
import MusicPlayer from "../apps/musicPlayer/MusicPlayer";

// Import app components - these will be loaded dynamically based on window type
// For now we're just including a placeholder for each app
const AppPlaceholder = ({ appType }) => (
  <div className="p-4 h-full flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-xl font-mono mb-2">App: {appType}</h2>
      <p>This is a placeholder for the {appType} application</p>
    </div>
  </div>
);

// Map of app types to components
const APP_COMPONENTS = {
  [APP_TYPES.MUSIC_PLAYER]: MusicPlayer,
  // Other app types will be filled in later
};

const Desktop = () => {
  // Get windows from store
  const windows = useWindowsStore((state) => state.windows);
  const activeWindowId = useWindowsStore((state) => state.activeWindowId);
  const closeWindow = useWindowsStore((state) => state.closeWindow);

  const setActiveWindow = useWindowsStore((state) => state.setActiveWindow);
  const openWindow = useWindowsStore((state) => state.openWindow);

  // Get theme configuration
  const themeConfig = useThemeStore((state) => state.themeConfig);
  const effectsEnabled = useThemeStore((state) => state.effectsEnabled);

  // Handle opening windows for testing
  const handleOpenWindow = (appType) => {
    openWindow(
      appType,
      `${appType.charAt(0).toUpperCase() + appType.slice(1)} Window`
    );
  };

  // Initialize desktop with a music player window
  useEffect(() => {
    if (windows.length === 0) {
      openWindow(APP_TYPES.MUSIC_PLAYER, "Music Player");
    }
  }, []);

  return (
    <div
      className="desktop relative w-full h-screen overflow-hidden"
      style={{
        backgroundColor: themeConfig.darkBg,
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Desktop background */}
      <div className="absolute inset-0">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 0, 160, 0.03) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(255, 0, 160, 0.03) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        ></div>

        {/* Scanlines effect if enabled */}
        {effectsEnabled.scanlines && <Scanlines opacity={0.1} />}

        {/* CRT effect if enabled */}
        {effectsEnabled.crt && <CRTEffect opacity={0.2} />}
      </div>

      {/* Desktop content */}
      <div className="relative z-10 w-full h-full p-4">
        {/* Windows */}
        {windows.map((window) => {
          // Determine which component to render
          const AppComponent =
            APP_COMPONENTS[window.appType] ||
            (() => <AppPlaceholder appType={window.appType} />);

          return (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              initialPosition={window.position}
              isActive={window.id === activeWindowId}
              zIndex={window.zIndex}
              onClose={closeWindow}
              resizable={false}
              onFocus={setActiveWindow}
              darkHackerTheme={window.appType === APP_TYPES.DARK_WEB}
            >
              <AppComponent {...window.props} />
            </Window>
          );
        })}

        {/* Testing controls - to be removed later */}
        <div className="absolute bottom-4 left-4 p-3 bg-black bg-opacity-50 rounded border border-cyan-500 z-50">
          <div className="text-white text-sm mb-2 font-mono">
            DEBUG: Open Apps
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.values(APP_TYPES).map((appType) => (
              <button
                key={appType}
                className="px-2 py-1 text-xs font-mono bg-gray-800 text-cyan-400 hover:bg-gray-700 border border-cyan-500 rounded"
                onClick={() => handleOpenWindow(appType)}
              >
                {appType}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
