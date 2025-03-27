// components/desktop/Desktop/Desktop.jsx
import React, { useEffect } from "react";
import { useWindowsStore, useThemeStore, APP_TYPES } from "../../../store";
import { Window } from "../../ui";
import { Scanlines, CRTEffect } from "../../effects/Scanlines";
import MusicPlayer from "../../apps/musicPlayer/MusicPlayer";
import styles from "./Desktop.module.scss";

// Import app components - these will be loaded dynamically based on window type
// For now we're just including a placeholder for each app
const AppPlaceholder = ({ appType }) => (
  <div className={styles.appPlaceholder}>
    <h2 className={styles.appTitle}>App: {appType}</h2>
    <p>This is a placeholder for the {appType} application</p>
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

  // Get effects configuration
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
    <div className={styles.desktop}>
      {/* Desktop background */}
      <div className={styles.backgroundOverlay}></div>

      {/* Scanlines effect if enabled */}
      {effectsEnabled.scanlines && <Scanlines opacity={0.1} />}

      {/* CRT effect if enabled */}
      {effectsEnabled.crt && <CRTEffect opacity={0.2} />}

      {/* Desktop content */}
      <div className={styles.content}>
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
        <div className={styles.debugPanel}>
          <div className={styles.debugTitle}>DEBUG: Open Apps</div>
          <div className={styles.debugButtons}>
            {Object.values(APP_TYPES).map((appType) => (
              <button
                key={appType}
                className={styles.debugButton}
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
