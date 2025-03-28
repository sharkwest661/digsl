// components/apps/database/AccessDeniedPanel.jsx
import React, { useState, useEffect } from "react";
import { Lock, ShieldAlert, Terminal } from "lucide-react";
import styles from "./AccessDeniedPanel.module.scss";

const AccessDeniedPanel = ({
  onAuthenticate,
  onAccessCodeChange,
  accessCode,
  error,
}) => {
  const [typingEffect, setTypingEffect] = useState("");
  const welcomeText = "CENTRAL DATABASE ACCESS SYSTEM";
  const [typingIndex, setTypingIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Typing effect for welcome text
  useEffect(() => {
    if (typingIndex < welcomeText.length) {
      const timer = setTimeout(() => {
        setTypingEffect(welcomeText.substring(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [typingIndex]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className={styles.accessDeniedPanel}>
      <div className={styles.innerPanel}>
        <div className={styles.terminalHeader}>
          <Terminal size={20} />
          <div className={styles.typingText}>
            {typingEffect}
            {showCursor && <span className={styles.cursor}>_</span>}
          </div>
        </div>

        <div className={styles.lockIcon}>
          <div className={styles.iconWrapper}>
            <Lock size={48} />
          </div>
        </div>

        <div className={styles.statusMessage}>
          <ShieldAlert size={16} />
          <span>ACCESS RESTRICTED</span>
        </div>

        <div className={styles.instruction}>
          Please enter your investigator access code to proceed.
        </div>

        <form onSubmit={onAuthenticate} className={styles.accessForm}>
          <div className={styles.inputGroup}>
            <input
              type="password"
              value={accessCode}
              onChange={onAccessCodeChange}
              placeholder="Enter access code"
              className={styles.accessInput}
              autoFocus
            />
            <button type="submit" className={styles.accessButton}>
              AUTHENTICATE
            </button>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}
        </form>

        <div className={styles.securityNotice}>
          <div className={styles.noticeTitle}>SECURITY NOTICE</div>
          <p>
            All access attempts are logged and monitored. Unauthorized access is
            prohibited by law.
          </p>
          <p>
            This system contains classified information that is restricted to
            authorized personnel only.
          </p>
        </div>

        <div className={styles.helpMessage}>
          For investigative access, use your assigned code or contact your
          supervisor.
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPanel;
