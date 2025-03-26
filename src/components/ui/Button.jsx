import React, { useState } from "react";
import { useThemeStore } from "../../store";

/**
 * Cyberpunk-themed button component
 *
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant ('primary', 'secondary', 'outline', 'danger')
 * @param {string} props.size - Button size ('sm', 'md', 'lg')
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {boolean} props.fullWidth - Whether the button should take full width
 * @param {boolean} props.darkHacker - Use dark hacker theme instead of cyberpunk
 * @param {function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 */
const Button = ({
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  darkHacker = false,
  onClick,
  children,
  className = "",
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Get theme configuration
  const themeConfig = useThemeStore((state) =>
    darkHacker ? state.darkHackerConfig : state.themeConfig
  );

  // Handle mouse events for visual effects
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  // Determine button style based on variant
  const getButtonStyles = () => {
    // Base styles
    const baseStyle = {
      transition: "all 0.2s ease",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
    };

    // Size styles
    const sizeStyles = {
      sm: "px-3 py-1 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    // Glow effect
    const glowEffect = isHovered && !disabled ? themeConfig.glowEffect : "none";

    // Width
    const widthStyle = fullWidth ? "w-full" : "";

    // Font
    const fontStyle = "font-mono uppercase tracking-wider font-medium";

    // Variant-specific styles
    let variantClasses = "";
    let variantStyle = {};

    switch (variant) {
      case "primary":
        variantStyle = {
          backgroundColor: isPressed ? themeConfig.darkBg : themeConfig.lightBg,
          color: themeConfig.accentPrimary,
          border: `1px solid ${themeConfig.accentPrimary}`,
          boxShadow: glowEffect,
          transform: isPressed ? "scale(0.98)" : "scale(1)",
        };
        break;

      case "secondary":
        variantStyle = {
          backgroundColor: isPressed ? themeConfig.darkBg : themeConfig.lightBg,
          color: themeConfig.accentSecondary,
          border: `1px solid ${themeConfig.accentSecondary}`,
          boxShadow:
            isHovered && !disabled
              ? `0 0 10px ${themeConfig.accentSecondary}`
              : "none",
          transform: isPressed ? "scale(0.98)" : "scale(1)",
        };
        break;

      case "outline":
        variantStyle = {
          backgroundColor: "transparent",
          color: themeConfig.textLight,
          border: `1px solid ${themeConfig.textLight}`,
          boxShadow: "none",
          transform: isPressed ? "scale(0.98)" : "scale(1)",
        };
        break;

      case "danger":
        variantStyle = {
          backgroundColor: isPressed ? themeConfig.darkBg : themeConfig.lightBg,
          color: themeConfig.warningRed,
          border: `1px solid ${themeConfig.warningRed}`,
          boxShadow:
            isHovered && !disabled ? "0 0 10px rgba(255, 34, 34, 0.7)" : "none",
          transform: isPressed ? "scale(0.98)" : "scale(1)",
        };
        break;

      default:
        variantStyle = {
          backgroundColor: isPressed ? themeConfig.darkBg : themeConfig.lightBg,
          color: themeConfig.accentPrimary,
          border: `1px solid ${themeConfig.accentPrimary}`,
          boxShadow: glowEffect,
          transform: isPressed ? "scale(0.98)" : "scale(1)",
        };
    }

    return {
      className: `${sizeStyles[size]} ${fontStyle} ${widthStyle} ${className} ${variantClasses}`,
      style: { ...baseStyle, ...variantStyle },
    };
  };

  const { className: computedClassName, style } = getButtonStyles();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={computedClassName}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
