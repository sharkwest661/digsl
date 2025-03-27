import React, { useEffect } from "react";
import Desktop from "./components/desktop/Desktop/Desktop";
import StartPage from "./components/startPage";
import { useAppStore } from "./store";
import styles from "./App.module.scss";

// Global styles
import "./styles/index.scss";

const App = () => {
  const isInitialized = useAppStore((state) => state.isInitialized);

  return (
    <div className={styles.app}>
      {isInitialized ? <Desktop /> : <StartPage />}
    </div>
  );
};

export default App;
