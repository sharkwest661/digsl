import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppStore, useThemeStore } from "../../store";
import { Scanlines, CRTEffect } from "../effects";
import Button from "../ui/Button";
import {
  LOADING_SIMULATION_DELAY,
  ANIMATION_DURATION_FAST,
  ANIMATION_DURATION_STANDARD,
  ANIMATION_DURATION_SLOW,
  GLITCH_EFFECT_DURATION,
  GLITCH_EFFECT_INTERVAL,
  PROGRESS_UPDATE_INTERVAL,
} from "../../constants/app";
import styles from "./StartPage.module.scss";

const StartPage = () => {
  const { t, i18n } = useTranslation();
  const initializeApp = useAppStore((state) => state.initializeApp);
  const effectsEnabled = useThemeStore((state) => state.effectsEnabled);

  // Local state
  const [glitchTitle, setGlitchTitle] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Toggle language between English and Azerbaijani
  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  // Random glitch effect on title
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchTitle(true);
      setTimeout(() => setGlitchTitle(false), ANIMATION_DURATION_FAST);
    }, GLITCH_EFFECT_INTERVAL);

    return () => clearInterval(glitchInterval);
  }, []);

  // Handle start game click
  const handleStartGame = () => {
    setIsStarting(true);

    // Simulate loading progress
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => {
            initializeApp();
          }, ANIMATION_DURATION_SLOW);
          return 100;
        }
        return newProgress;
      });
    }, PROGRESS_UPDATE_INTERVAL);
  };

  return (
    <div className={styles.container}>
      {/* Background elements */}
      <div className={styles.backgroundGrid}></div>
      <div className={styles.backgroundShadow}></div>

      {/* Effects */}
      {effectsEnabled.scanlines && <Scanlines opacity={0.2} />}
      {effectsEnabled.crt && <CRTEffect opacity={0.3} />}

      {/* Main content */}
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h1 className={`${styles.title} ${glitchTitle ? styles.glitch : ""}`}>
            SHADOW MARKET
          </h1>
          <div className={styles.subtitle}>{t("tagline")}</div>
        </div>

        {/* Loading screen shown when starting game */}
        {isStarting ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingText}>{t("systemBoot")}</div>
            <div className={styles.terminalOutput}>
              <div>{t("initializingKernel")}</div>
              <div>{t("loadingDrivers")}</div>
              <div>{t("checkingMemory")}</div>
              <div>{t("startingInterface")}</div>
            </div>
            <div className={styles.loadingBarContainer}>
              <div
                className={styles.loadingBar}
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className={styles.loadingMessage}>{`${Math.floor(
              loadingProgress
            )}${t("percentComplete")}`}</div>
          </div>
        ) : (
          <div className={styles.controls}>
            <Button
              size="lg"
              variant="primary"
              onClick={handleStartGame}
              className={styles.startButton}
            >
              {t("startGame")}
            </Button>

            <div className={styles.optionsContainer}>
              <div className={styles.languageSelector}>
                <button
                  className={`${styles.languageOption} ${
                    i18n.language === "en" ? styles.active : ""
                  }`}
                  onClick={() => toggleLanguage("en")}
                  aria-pressed={i18n.language === "en"}
                >
                  EN
                </button>
                <button
                  className={`${styles.languageOption} ${
                    i18n.language === "az" ? styles.active : ""
                  }`}
                  onClick={() => toggleLanguage("az")}
                  aria-pressed={i18n.language === "az"}
                >
                  AZ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game info box */}
        <div className={styles.infoBox}>
          <h2 className={styles.infoTitle}>{t("gameDescription")}</h2>
          <p className={styles.infoText}>{t("gameDescriptionText1")}</p>
          <p className={styles.infoText}>{t("gameDescriptionText2")}</p>
        </div>

        {/* Attribution */}
        <div className={styles.footer}>
          <div className={styles.year}>2025</div>
          <div className={styles.separator}>|</div>
          <div className={styles.gameVersion}>v0.1</div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
