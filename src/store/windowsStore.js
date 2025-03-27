// store/windowsStore.js
import { create } from "zustand";

// Window app types
const APP_TYPES = {
  DARK_WEB: "darkWeb",
  SEARCH_ENGINE: "searchEngine",
  DATABASE: "database",
  EVIDENCE_BOARD: "evidenceBoard",
  EMAIL: "email",
  NOTEPAD: "notepad", // Make sure this is correctly defined
  FILE_EXPLORER: "fileExplorer",
  MUSIC_PLAYER: "musicPlayer",
  HACKING_TOOL: "hackingTool",
};

// Default positions for initial window placement
const DEFAULT_POSITIONS = {
  [APP_TYPES.DARK_WEB]: { x: 50, y: 50, width: 800, height: 600 },
  [APP_TYPES.SEARCH_ENGINE]: { x: 80, y: 80, width: 700, height: 500 },
  [APP_TYPES.DATABASE]: { x: 100, y: 100, width: 750, height: 550 },
  [APP_TYPES.EVIDENCE_BOARD]: { x: 120, y: 120, width: 900, height: 650 },
  [APP_TYPES.EMAIL]: { x: 140, y: 140, width: 650, height: 500 },
  [APP_TYPES.NOTEPAD]: { x: 160, y: 160, width: 750, height: 600 },
  [APP_TYPES.FILE_EXPLORER]: { x: 180, y: 180, width: 600, height: 450 },
  [APP_TYPES.MUSIC_PLAYER]: { x: 200, y: 200, width: 350, height: 500 },
  [APP_TYPES.HACKING_TOOL]: { x: 220, y: 220, width: 650, height: 500 },
};

// Create the windows store
const useWindowsStore = create((set, get) => ({
  // List of all open windows
  windows: [],

  // ID of the currently focused window
  activeWindowId: null,

  // Counter for generating unique window IDs
  windowIdCounter: 0,

  // Open a new window
  openWindow: (appType, title, props = {}) => {
    const { windows, windowIdCounter } = get();

    // Generate a unique ID for the window
    const id = `window-${windowIdCounter}`;

    // Get default position or use provided position
    const defaultPosition = DEFAULT_POSITIONS[appType] || {
      x: 100,
      y: 100,
      width: 600,
      height: 400,
    };
    const position = props.position || defaultPosition;

    // Create new window object
    const newWindow = {
      id,
      appType,
      title: title || `${appType} Window`,
      position,
      zIndex: windows.length + 1, // Place on top
      props: { ...props },
    };

    // Add to windows array and set as active
    set((state) => ({
      windows: [...state.windows, newWindow],
      activeWindowId: id,
      windowIdCounter: state.windowIdCounter + 1,
    }));

    return id; // Return window ID for reference
  },

  // Close a window
  closeWindow: (windowId) => {
    set((state) => {
      // Filter out the closed window
      const updatedWindows = state.windows.filter(
        (window) => window.id !== windowId
      );

      // If closing the active window, set the top-most remaining window as active
      let activeId = state.activeWindowId;
      if (activeId === windowId && updatedWindows.length > 0) {
        // Find window with highest zIndex
        const topWindow = updatedWindows.reduce(
          (top, window) => (window.zIndex > top.zIndex ? window : top),
          updatedWindows[0]
        );
        activeId = topWindow.id;
      } else if (updatedWindows.length === 0) {
        activeId = null;
      }

      return {
        windows: updatedWindows,
        activeWindowId: activeId,
      };
    });
  },

  // Set a window as active (bring to front)
  setActiveWindow: (windowId) => {
    set((state) => {
      // Nothing to do if already active or window doesn't exist
      if (
        state.activeWindowId === windowId ||
        !state.windows.find((w) => w.id === windowId)
      ) {
        return state;
      }

      // Find highest z-index
      const maxZIndex = Math.max(...state.windows.map((w) => w.zIndex));

      // Update windows z-indices
      const updatedWindows = state.windows.map((window) => {
        if (window.id === windowId) {
          return { ...window, zIndex: maxZIndex + 1 };
        }
        return window;
      });

      return {
        windows: updatedWindows,
        activeWindowId: windowId,
      };
    });
  },

  // Update window position and size
  updateWindowPosition: (windowId, position) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === windowId
          ? { ...window, position: { ...window.position, ...position } }
          : window
      ),
    }));
  },

  // Close all windows
  closeAllWindows: () => {
    set({
      windows: [],
      activeWindowId: null,
    });
  },
}));

// Export the store and constants
export { useWindowsStore, APP_TYPES };
