// src/components/apps/terminal/PasswordCracker/PasswordFeedback.jsx
import React from "react";
import styles from "./PasswordCracker.module.scss";

/**
 * Component to display character-by-character feedback for password attempts
 *
 * @param {Object} props - Component props
 * @param {Array} props.feedback - Array of feedback items with char and status
 */
const PasswordFeedback = ({ feedback = [] }) => {
  if (!feedback || feedback.length === 0) {
    return null;
  }

  return (
    <div className={styles.feedbackContainer}>
      {feedback.map((item, index) => (
        <div
          key={index}
          className={`${styles.feedbackChar} ${styles[item.status]}`}
          title={getStatusDescription(item.status)}
        >
          {item.char}
        </div>
      ))}
    </div>
  );
};

// Helper function to get human-readable status description
const getStatusDescription = (status) => {
  switch (status) {
    case "correct":
      return "Correct character in correct position";
    case "partial":
      return "Correct character in wrong position";
    case "incorrect":
      return "Incorrect character";
    default:
      return "";
  }
};

export default PasswordFeedback;
