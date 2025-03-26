// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Cyberpunk theme
        "cyber-dark-blue": "#120458",
        "cyber-dark-purple": "#1f0b47",
        "cyber-neon-pink": "#ff00a0",
        "cyber-cyan": "#00ffd5",
        "cyber-electric-blue": "#0984e3",
        "cyber-dark-teal": "#005577",
        "cyber-warning-red": "#ff2222",

        // Dark hacker theme
        "hacker-bg": "#000000",
        "hacker-panel": "#111111",
        "hacker-green": "#33ff00",
        "hacker-dim-green": "#1a8000",
        "hacker-blue": "#0088ff",
        "hacker-red": "#ff3300",
      },
      boxShadow: {
        "neon-pink": "0 0 10px rgba(255, 0, 160, 0.7)",
        "neon-cyan": "0 0 10px rgba(0, 255, 213, 0.7)",
        "neon-green": "0 0 10px rgba(51, 255, 0, 0.7)",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Ubuntu Mono", "monospace"],
        display: ["Exo 2", "sans-serif"],
        content: ["Open Sans", "sans-serif"],
      },
      animation: {
        scanline: "scanline 2s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glitch:
          "glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
      },
    },
  },
  plugins: [],
};
