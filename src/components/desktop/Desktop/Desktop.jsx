// components/desktop/Desktop/Desktop.jsx
import React, { useState, useEffect } from "react";
import {
  Music,
  Globe,
  Database,
  Mail,
  FileText,
  Folder,
  Terminal,
  Clipboard,
  Search,
} from "lucide-react";
import {
  useWindowsStore,
  useThemeStore,
  APP_TYPES,
  useAudioStore,
} from "../../../store";
import { Window } from "../../ui";
import { Scanlines, CRTEffect } from "../../effects/Scanlines";
import MusicPlayer from "../../apps/musicPlayer/MusicPlayer";
import Notepad from "../../apps/notepad/Notepad";
import TerminalApp from "../../apps/terminal";
import Taskbar from "../Taskbar";
import DarkWebBrowser from "../../apps/darkWeb";
import EvidenceBoard from "../../apps/evidenceBoard";
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
  [APP_TYPES.NOTEPAD]: Notepad,
  [APP_TYPES.HACKING_TOOL]: TerminalApp,
  [APP_TYPES.DARK_WEB]: DarkWebBrowser,
  [APP_TYPES.EVIDENCE_BOARD]: EvidenceBoard,
  // Other app types will be filled in later
};

// Desktop app definitions
const desktopApps = [
  {
    id: APP_TYPES.MUSIC_PLAYER,
    title: "Music",
    icon: <Music size={24} />,
  },
  {
    id: APP_TYPES.DARK_WEB,
    title: "Dark Web",
    icon: <Globe size={24} />,
  },
  {
    id: APP_TYPES.DATABASE,
    title: "Database",
    icon: <Database size={24} />,
  },
  {
    id: APP_TYPES.SEARCH_ENGINE,
    title: "Search",
    icon: <Search size={24} />,
  },
  {
    id: APP_TYPES.EMAIL,
    title: "Email",
    icon: <Mail size={24} />,
  },
  {
    id: APP_TYPES.NOTEPAD,
    title: "Notepad",
    icon: <FileText size={24} />,
  },
  {
    id: APP_TYPES.FILE_EXPLORER,
    title: "Files",
    icon: <Folder size={24} />,
  },
  {
    id: APP_TYPES.HACKING_TOOL,
    title: "Terminal",
    icon: <Terminal size={24} />,
  },
  {
    id: APP_TYPES.EVIDENCE_BOARD,
    title: "Evidence",
    icon: <Clipboard size={24} />,
  },
];

const Desktop = () => {
  // Get state from stores
  const allWindows = useWindowsStore((state) => state.windows);
  const activeWindowId = useWindowsStore((state) => state.activeWindowId);
  const closeWindow = useWindowsStore((state) => state.closeWindow);
  const setActiveWindow = useWindowsStore((state) => state.setActiveWindow);
  const openWindow = useWindowsStore((state) => state.openWindow);
  const toggleMinimize = useWindowsStore((state) => state.toggleMinimize);
  const shouldUseDarkHackerTheme = useWindowsStore(
    (state) => state.shouldUseDarkHackerTheme
  );
  const effectsEnabled = useThemeStore((state) => state.effectsEnabled);

  // Get audio controls
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const togglePlay = useAudioStore((state) => state.togglePlay);

  // Local state
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [previousWindows, setPreviousWindows] = useState([]);

  // Effect to track window changes and pause music if music player is closed
  useEffect(() => {
    // Check if music player window was closed
    const musicPlayerWasOpen = previousWindows.some(
      (window) => window.appType === APP_TYPES.MUSIC_PLAYER
    );

    const musicPlayerIsOpen = allWindows.some(
      (window) => window.appType === APP_TYPES.MUSIC_PLAYER
    );

    // If music player was open but is no longer open and music is playing, pause it
    if (musicPlayerWasOpen && !musicPlayerIsOpen && isPlaying) {
      togglePlay();
    }

    // Update previous windows
    setPreviousWindows(allWindows);
  }, [allWindows, previousWindows, isPlaying, togglePlay]);

  // Handle single click on icon (select)
  const handleIconClick = (appType) => {
    setSelectedIcon(selectedIcon === appType ? null : appType);
  };

  // Handle double click on icon (open)
  const handleIconDoubleClick = (appType, title) => {
    // Check if app is already open
    const existingWindow = allWindows.find(
      (window) => window.appType === appType
    );

    if (existingWindow) {
      // Focus existing window
      setActiveWindow(existingWindow.id);
    } else {
      // Open new window
      openWindow(appType, title);
    }
  };

  // Clear selected icon when clicking desktop background
  const handleDesktopClick = (e) => {
    // Check if clicking on the desktop background
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains(styles.backgroundOverlay)
    ) {
      setSelectedIcon(null);
    }
  };

  return (
    <div className={styles.desktop} onClick={handleDesktopClick}>
      {/* Desktop background */}
      <div className={styles.backgroundOverlay}></div>

      {/* Desktop icons */}
      <div className={styles.iconsContainer}>
        {desktopApps.map((app) => {
          // Check if this app has an open window
          const isActive = allWindows.some(
            (window) => window.appType === app.id
          );
          const isHovered = hoveredIcon === app.id;
          const isSelected = selectedIcon === app.id;

          return (
            <div
              key={app.id}
              className={`${styles.desktopIcon} 
                ${isActive ? styles.active : ""} 
                ${isHovered ? styles.hovered : ""} 
                ${isSelected ? styles.selected : ""}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent desktop click handler
                handleIconClick(app.id);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation(); // Prevent desktop click handler
                handleIconDoubleClick(app.id, app.title);
              }}
              onMouseEnter={() => setHoveredIcon(app.id)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div className={styles.iconWrapper}>{app.icon}</div>
              <div className={styles.iconLabel}>{app.title}</div>
            </div>
          );
        })}
      </div>

      {/* Scanlines effect if enabled */}
      {effectsEnabled.scanlines && <Scanlines opacity={0.1} />}

      {/* CRT effect if enabled */}
      {effectsEnabled.crt && <CRTEffect opacity={0.2} />}

      {/* Desktop content - windows */}
      <div className={styles.windows}>
        {allWindows.map((window) => {
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
              isMinimized={window.isMinimized}
              zIndex={window.zIndex}
              onClose={closeWindow}
              onMinimize={toggleMinimize}
              resizable={false}
              onFocus={setActiveWindow}
              darkHackerTheme={shouldUseDarkHackerTheme(window.appType)}
            >
              <AppComponent {...window.props} />
            </Window>
          );
        })}
      </div>

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};

export default Desktop;
