// components/apps/darkWeb/ConnectionScreen/ConnectionScreen.jsx
import React, { useState, useEffect } from "react";
import { Shield, AlertTriangle } from "lucide-react";
import styles from "./ConnectionScreen.module.scss";

const ConnectionScreen = () => {
  const [stage, setStage] = useState(0);
  const [dots, setDots] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const connectionStages = [
    "Initializing secure connection",
    "Routing through proxy network",
    "Establishing encrypted channel",
    "Bypassing network restrictions",
    "Verifying Shadow Market credentials",
    "Connection successful",
  ];

  // Animate loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Progress through connection stages
  useEffect(() => {
    const stageInterval = setInterval(() => {
      setStage((prev) => {
        if (prev >= connectionStages.length - 1) {
          clearInterval(stageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(stageInterval);
  }, []);

  // Show security warning
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWarning(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.connectionBox}>
        <div className={styles.iconContainer}>
          {stage < connectionStages.length - 1 ? (
            <div className={styles.shieldAnimated}>
              <Shield size={48} className={styles.shieldIcon} />
            </div>
          ) : (
            <div className={styles.shieldSuccess}>
              <Shield size={48} className={styles.shieldIcon} />
            </div>
          )}
        </div>

        <h2 className={styles.title}>
          {stage < connectionStages.length - 1
            ? "ESTABLISHING SECURE CONNECTION"
            : "CONNECTION ESTABLISHED"}
        </h2>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${(stage / (connectionStages.length - 1)) * 100}%`,
            }}
          ></div>
        </div>

        <div className={styles.currentStage}>
          {connectionStages[stage]}
          {stage < connectionStages.length - 1 ? dots : ""}
        </div>

        <div className={styles.logContainer}>
          {connectionStages.slice(0, stage + 1).map((text, i) => (
            <div
              key={i}
              className={`${styles.logEntry} ${
                i === stage ? styles.active : ""
              }`}
            >
              {i === connectionStages.length - 1 ? "✓" : ">"} {text}
            </div>
          ))}
        </div>

        {showWarning && (
          <div className={styles.warningBox}>
            <AlertTriangle size={16} className={styles.warningIcon} />
            <div className={styles.warningText}>
              Warning: All activities on Shadow Market are being logged. Secure
              your identity.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionScreen;
