// store/index.js
import { useAppStore } from "./appStore";
import {
  useThemeStore,
  CYBERPUNK_THEME,
  DARK_HACKER_THEME,
} from "./themeStore";
import { useWindowsStore, APP_TYPES } from "./windowsStore";
import { useNotepadStore } from "./notepadStore";
import { useAudioStore } from "./audioStore";
import { useDarkWebStore } from "./darkWebStore";

// Export all stores and constants
export {
  // Main application store
  useAppStore,

  // Theme store and constants
  useThemeStore,
  CYBERPUNK_THEME,
  DARK_HACKER_THEME,

  // Window management store and constants
  useWindowsStore,
  APP_TYPES,

  // Notepad store
  useNotepadStore,

  // Audio store
  useAudioStore,

  // Dark Web store
  useDarkWebStore,
};
