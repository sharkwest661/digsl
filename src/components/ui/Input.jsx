import React, { useState, useRef } from "react";
import { useThemeStore } from "../../store";

/**
 * Cyberpunk-themed input component
 *
 * @param {Object} props - Component props
 * @param {string} props.type - Input type ('text', 'password', 'number', etc.)
 * @param {string} props.label - Input label
 * @param {string} props.placeholder - Input placeholder
 * @param {string} props.value - Input value
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {boolean} props.darkHacker - Use dark hacker theme instead of cyberpunk
 * @param {boolean} props.error - Whether there's an error
 * @param {string} props.errorMessage - Error message to display
 * @param {function} props.onChange - Change handler
 * @param {string} props.className - Additional CSS classes
 */
const Input = ({
  type = "text",
  label,
  placeholder,
  value = "",
  disabled = false,
  darkHacker = false,
  error = false,
  errorMessage = "",
  onChange,
  className = "",
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Get theme configuration
  const themeConfig = useThemeStore((state) =>
    darkHacker ? state.darkHackerConfig : state.themeConfig
  );
  const effectsEnabled = useThemeStore((state) => state.effectsEnabled);

  // Handle focus events
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Focus the input when the label is clicked
  const handleLabelClick = () => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  };

  // Determine input styles
  const getInputStyles = () => {
    // Base container style
    const containerStyle = {
      position: "relative",
    };

    // Label styles
    const labelStyle = {
      color: error ? themeConfig.warningRed : themeConfig.accentPrimary,
      transition: "all 0.3s ease",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.7 : 1,
      textShadow:
        isFocused && !disabled && !error
          ? `0 0 5px ${themeConfig.accentPrimary}`
          : "none",
    };

    // Input styles
    const inputStyle = {
      backgroundColor: themeConfig.darkBg,
      color: themeConfig.textLight,
      border: `1px solid ${
        error ? themeConfig.warningRed : themeConfig.accentPrimary
      }`,
      borderRadius: "0px",
      padding: "0.5rem 0.75rem",
      width: "100%",
      outline: "none",
      fontFamily: "monospace",
      boxShadow:
        isFocused && !disabled
          ? error
            ? "0 0 10px rgba(255, 34, 34, 0.4)"
            : themeConfig.glowEffect
          : "none",
      opacity: disabled ? 0.7 : 1,
      cursor: disabled ? "not-allowed" : "text",
    };

    // Effect line (underline)
    const effectLineStyle = {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: isFocused && !disabled ? "100%" : "0%",
      height: "2px",
      backgroundColor: error
        ? themeConfig.warningRed
        : themeConfig.accentPrimary,
      transition: "width 0.3s ease",
    };

    // Error message style
    const errorStyle = {
      color: themeConfig.warningRed,
      fontSize: "0.75rem",
      marginTop: "0.25rem",
    };

    return {
      containerStyle,
      labelStyle,
      inputStyle,
      effectLineStyle,
      errorStyle,
    };
  };

  const styles = getInputStyles();

  // Add scanline animation to the input when focused
  const renderScanlineEffect = () => {
    if (!effectsEnabled.scanlines || !isFocused || disabled) return null;

    return (
      <div
        className="absolute left-0 w-full h-1"
        style={{
          bottom: "-2px",
          overflow: "hidden",
        }}
      >
        <div
          className="h-full"
          style={{
            width: "30%",
            backgroundColor: error
              ? themeConfig.warningRed
              : themeConfig.accentPrimary,
            boxShadow: `0 0 10px ${
              error ? themeConfig.warningRed : themeConfig.accentPrimary
            }`,
            animation: "scanline 2s ease-in-out infinite",
          }}
        ></div>

        <style jsx>{`
          @keyframes scanline {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(400%);
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className={`mb-4 ${className}`} style={styles.containerStyle}>
      {label && (
        <label
          className="block text-sm font-mono uppercase tracking-wider mb-1"
          style={styles.labelStyle}
          onClick={handleLabelClick}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={styles.inputStyle}
          className={`w-full focus:outline-none ${error ? "error" : ""}`}
          {...rest}
        />

        {renderScanlineEffect()}

        <div className="effect-line" style={styles.effectLineStyle}></div>
      </div>

      {error && errorMessage && (
        <div className="error-message mt-1 text-xs" style={styles.errorStyle}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Input;
