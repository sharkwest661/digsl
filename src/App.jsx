import React, { useEffect } from "react";
import Desktop from "./components/desktop/Desktop";
import { useAppStore } from "./store";

// Global styles
import "./styles/index.css";

const App = () => {
  const initializeApp = useAppStore((state) => state.initializeApp);
  const isInitialized = useAppStore((state) => state.isInitialized);

  // Initialize the app on mount
  useEffect(() => {
    // Perform any initialization tasks
    const init = async () => {
      // Simulating loading delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      initializeApp();
    };

    init();
  }, []);

  // Loading screen
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <div className="app">
      <Desktop />
    </div>
  );
};

// Cyberpunk-themed loading screen
const LoadingScreen = () => {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#120458",
        color: "#f5f5f5",
      }}
    >
      <div className="text-center">
        <h1
          className="text-4xl font-bold mb-4 font-mono uppercase tracking-wider"
          style={{
            color: "#ff00a0",
            textShadow: "0 0 10px rgba(255, 0, 160, 0.7)",
          }}
        >
          Digital Sleuth
        </h1>

        <div className="relative w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-8">
          <div
            className="absolute top-0 left-0 h-full animate-pulse"
            style={{
              width: "50%",
              background: "linear-gradient(to right, #ff00a0, #00ffd5)",
              boxShadow: "0 0 10px rgba(0, 255, 213, 0.7)",
              animation: "loadingBar 1.5s infinite",
            }}
          />
        </div>

        <div
          className="text-sm font-mono uppercase"
          style={{ color: "#00ffd5" }}
        >
          Initializing System...
        </div>

        <style jsx>{`
          @keyframes loadingBar {
            0% {
              left: -50%;
            }
            100% {
              left: 100%;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default App;
