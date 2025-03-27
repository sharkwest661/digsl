import React, { useEffect } from "react";
import Desktop from "./components/desktop/Desktop/Desktop";
import { useAppStore } from "./store";
import { LOADING_SIMULATION_DELAY } from "./constants/app";
import styles from "./App.module.scss";

// Global styles
import "./styles/index.scss";

const App = () => {
  const initializeApp = useAppStore((state) => state.initializeApp);
  const isInitialized = useAppStore((state) => state.isInitialized);

  // Initialize the app on mount
  useEffect(() => {
    // Perform any initialization tasks
    const init = async () => {
      // Simulating loading delay
      await new Promise((resolve) =>
        setTimeout(resolve, LOADING_SIMULATION_DELAY)
      );
      initializeApp();
    };

    init();
  }, []);

  // Loading screen
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <div className={styles.app}>
      <Desktop />
    </div>
  );
};

// Cyberpunk-themed loading screen
const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingContent}>
        <h1 className={styles.loadingTitle}>Digital Sleuth</h1>

        <div className={styles.loadingBar}>
          <div className={styles.loadingProgress} />
        </div>

        <div className={styles.loadingText}>Initializing System...</div>
      </div>

      {/* Adding inline style tag for animation - for browser compatibility */}
      <style jsx>{`
        @keyframes loadingBarAnimation {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .${styles.loadingProgress} {
          animation: loadingBarAnimation 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
