// src/components/apps/terminal/PasswordCracker/PasswordCracker.jsx
import React, { useState, useEffect, useRef } from "react";
import PasswordFeedback from "./PasswordFeedback";
import styles from "./PasswordCracker.module.scss";

/**
 * Password cracking minigame component similar to Mastermind
 *
 * @param {Object} props - Component props
 * @param {string} props.targetPassword - The password to be cracked
 * @param {number} props.maxAttempts - Maximum number of attempts allowed
 * @param {function} props.onSuccess - Callback for successful crack
 * @param {function} props.onFailure - Callback for unsuccessful crack
 * @param {function} props.onExit - Callback to exit cracking mode
 * @param {string} props.hint - Optional hint about the password
 */
const PasswordCracker = ({
  targetPassword,
  maxAttempts = 5,
  onSuccess,
  onFailure,
  onExit,
  hint = "",
}) => {
  // State for user input and game state
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(maxAttempts);
  const [gameStatus, setGameStatus] = useState("in-progress"); // "in-progress", "success", "failure"
  const [errorMessage, setErrorMessage] = useState("");
  const [processingGuess, setProcessingGuess] = useState(false);
  const [passwordLength, setPasswordLength] = useState(targetPassword.length);

  // References
  const inputRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Generate feedback for a guess
  const generateFeedback = (guess) => {
    const feedback = [];
    const targetChars = targetPassword.split("");
    const guessChars = guess.split("");
    const targetCharCounts = {};

    // First pass - mark exact matches (correct position)
    for (let i = 0; i < targetChars.length; i++) {
      if (i >= guessChars.length) break;

      if (guessChars[i] === targetChars[i]) {
        feedback[i] = { char: guessChars[i], status: "correct" };
        // Mark as used
        guessChars[i] = null;
        targetChars[i] = null;
      }
    }

    // Count remaining characters in target
    for (const char of targetChars) {
      if (char !== null) {
        targetCharCounts[char] = (targetCharCounts[char] || 0) + 1;
      }
    }

    // Second pass - mark partial matches (wrong position)
    for (let i = 0; i < guessChars.length; i++) {
      if (feedback[i]) continue; // Skip already matched positions

      const guessChar = guessChars[i];
      if (guessChar !== null && targetCharCounts[guessChar] > 0) {
        feedback[i] = { char: guessChar, status: "partial" };
        targetCharCounts[guessChar]--;
      } else {
        feedback[i] = { char: guessChar, status: "incorrect" };
      }
    }

    return feedback;
  };

  // Check if the guess is correct
  const isCorrectGuess = (feedback) => {
    return (
      feedback.every((item) => item.status === "correct") &&
      feedback.length === targetPassword.length
    );
  };

  // Handle guess submission
  const handleSubmitGuess = async (e) => {
    e.preventDefault();

    // Validate input
    if (currentGuess.length === 0) {
      setErrorMessage("Please enter a guess");
      return;
    }

    if (currentGuess.length !== targetPassword.length) {
      setErrorMessage(`Password must be ${targetPassword.length} characters`);
      return;
    }

    setErrorMessage("");
    setProcessingGuess(true);

    // Simulate processing delay for effect
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Generate feedback
    const feedback = generateFeedback(currentGuess);
    const correct = isCorrectGuess(feedback);

    // Add to attempts history
    const newAttempt = {
      guess: currentGuess,
      feedback,
      timestamp: new Date(),
      isCorrect: correct,
    };

    setAttempts((prev) => [...prev, newAttempt]);
    setRemainingAttempts((prev) => prev - 1);
    setCurrentGuess("");
    setProcessingGuess(false);

    // Check for win/loss
    if (correct) {
      setGameStatus("success");
      if (onSuccess) onSuccess(currentGuess);
    } else if (remainingAttempts <= 1) {
      // This was the last attempt
      setGameStatus("failure");
      if (onFailure) onFailure();
    }
  };

  // Handle input change
  const handleGuessChange = (e) => {
    const value = e.target.value;
    // Only allow alphanumeric characters and common symbols
    const sanitized = value.replace(/[^a-zA-Z0-9!@#$%^&*()-_+=]/g, "");

    if (sanitized.length <= passwordLength) {
      setCurrentGuess(sanitized);
      setErrorMessage("");
    }
  };

  // Exit cracking mode
  const handleExit = () => {
    if (onExit) onExit();
  };

  // Render password placeholder boxes
  const renderPasswordBoxes = () => {
    const boxes = [];
    for (let i = 0; i < passwordLength; i++) {
      const char = currentGuess[i] || "";
      boxes.push(
        <div key={i} className={styles.passwordBox}>
          {char}
        </div>
      );
    }
    return boxes;
  };

  return (
    <div className={styles.passwordCracker}>
      <div className={styles.header}>
        <div className={styles.title}>PASSWORD CRACKING SYSTEM</div>
        <div className={styles.attempts}>
          Attempts Remaining: {remainingAttempts}/{maxAttempts}
        </div>
      </div>

      {/* Target info */}
      <div className={styles.targetInfo}>
        <div className={styles.targetLabel}>TARGET:</div>
        <div className={styles.targetValue}>
          {Array(passwordLength).fill("*").join("")}
        </div>
      </div>

      {hint && (
        <div className={styles.hintContainer}>
          <div className={styles.hintLabel}>HINT:</div>
          <div className={styles.hintValue}>{hint}</div>
        </div>
      )}

      {/* Input area */}
      {gameStatus === "in-progress" && (
        <form onSubmit={handleSubmitGuess} className={styles.inputForm}>
          <div className={styles.inputLabel}>ENTER PASSWORD:</div>

          <div className={styles.passwordBoxesContainer}>
            {renderPasswordBoxes()}
          </div>

          <div className={styles.visibleInput}>
            <input
              ref={inputRef}
              type="text"
              value={currentGuess}
              onChange={handleGuessChange}
              className={styles.passwordInput}
              disabled={processingGuess}
              maxLength={passwordLength}
              placeholder={`${passwordLength} characters`}
              autoFocus
            />

            <div className={styles.inputActions}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={
                  processingGuess || currentGuess.length !== passwordLength
                }
              >
                {processingGuess ? "PROCESSING..." : "ATTEMPT"}
              </button>

              <button
                type="button"
                onClick={handleExit}
                className={styles.exitButton}
              >
                EXIT
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}
        </form>
      )}

      {/* Attempt history */}
      <div className={styles.attemptsContainer}>
        <div className={styles.attemptsHeader}>
          <div className={styles.attemptsTitle}>ATTEMPT HISTORY</div>
        </div>

        <div className={styles.attemptsList}>
          {attempts.length === 0 ? (
            <div className={styles.noAttempts}>No attempts yet</div>
          ) : (
            attempts.map((attempt, index) => (
              <div key={index} className={styles.attemptItem}>
                <div className={styles.attemptNumber}>
                  {maxAttempts - (attempts.length - 1 - index)}
                </div>
                <div className={styles.attemptGuess}>
                  <PasswordFeedback feedback={attempt.feedback} />
                </div>
                <div className={styles.attemptResult}>
                  {attempt.isCorrect ? (
                    <span className={styles.correctResult}>ACCESS GRANTED</span>
                  ) : (
                    <span className={styles.incorrectResult}>INVALID</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Game over messages */}
      {gameStatus === "success" && (
        <div className={styles.successMessage}>
          <div className={styles.successTitle}>ACCESS GRANTED</div>
          <div className={styles.successDetails}>
            Password successfully cracked:{" "}
            <span className={styles.password}>{targetPassword}</span>
          </div>
          <button onClick={handleExit} className={styles.continueButton}>
            CONTINUE
          </button>
        </div>
      )}

      {gameStatus === "failure" && (
        <div className={styles.failureMessage}>
          <div className={styles.failureTitle}>ACCESS DENIED</div>
          <div className={styles.failureDetails}>
            Maximum attempts reached. System locked.
          </div>
          <div className={styles.failurePassword}>
            The password was:{" "}
            <span className={styles.password}>{targetPassword}</span>
          </div>
          <button onClick={handleExit} className={styles.continueButton}>
            EXIT
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordCracker;
