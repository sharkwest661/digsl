// src/components/apps/terminal/Terminal.jsx
import React, { useState, useEffect, useRef } from "react";
import { useThemeStore, useDarkWebStore } from "../../../store";
import PasswordCracker from "./PasswordCracker";
import styles from "./Terminal.module.scss";

const Terminal = () => {
  const themeConfig = useThemeStore((state) => state.themeConfig);
  const effectsEnabled = useThemeStore((state) => state.effectsEnabled);

  // Terminal state
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { text: "Shadow OS Terminal v1.3.37", type: "system" },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState("/home/investigator");

  // Cracking state
  const [crackingMode, setCrackingMode] = useState(false);
  const [targetSystem, setTargetSystem] = useState("");
  const [targetPassword, setTargetPassword] = useState("");
  const [maxAttempts, setMaxAttempts] = useState(5);
  const [passwordHint, setPasswordHint] = useState("");
  const [isCracked, setIsCracked] = useState(false);

  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom whenever history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal is clicked
  const focusInput = () => {
    if (inputRef.current && !crackingMode) {
      inputRef.current.focus();
    }
  };

  // Handle command submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add command to history
    const newLine = { text: `${currentDir}> ${input}`, type: "command" };
    setHistory([...history, newLine]);

    // Add to command history for up/down arrows
    setCommandHistory([...commandHistory, input]);
    setHistoryIndex(-1);

    processCommand(input);

    setInput("");
  };

  // Process commands
  const processCommand = (cmd) => {
    const args = cmd.trim().split(" ");
    const command = args[0].toLowerCase();

    switch (command) {
      case "help":
        addOutput([
          "Available commands:",
          "help        - Show this help message",
          "ls          - List files in current directory",
          "cd [dir]    - Change directory",
          "read [file] - Read file contents",
          "scan [url]  - Scan target for vulnerabilities",
          "crack [url] - Attempt to crack target password",
          "connect [url] - Connect to a system",
          "clear       - Clear the terminal",
          "exit        - Exit terminal",
        ]);
        break;

      case "clear":
        setHistory([{ text: "Terminal cleared.", type: "system" }]);
        break;

      case "ls":
        listFiles();
        break;

      case "cd":
        changeDirectory(args[1]);
        break;

      case "read":
        readFile(args[1]);
        break;

      case "scan":
        scanTarget(args[1]);
        break;

      case "crack":
        startCracking(args[1]);
        break;

      case "connect":
        connectToSystem(args[1]);
        break;

      case "exit":
        addOutput([
          "Exiting terminal is not permitted during active investigation.",
        ]);
        break;

      default:
        addOutput([
          `Command not found: ${command}. Type 'help' for available commands.`,
        ]);
    }
  };

  // List files in current directory
  const listFiles = () => {
    let files = [];

    if (currentDir === "/home/investigator") {
      files = [
        "documents/",
        "downloads/",
        "tools/",
        "notes.txt",
        "investigation.log",
      ];
    } else if (currentDir === "/home/investigator/documents") {
      files = [
        "case_files/",
        "evidence/",
        "vendors.txt",
        "shadowmarket_notes.txt",
      ];
    } else if (currentDir === "/home/investigator/tools") {
      files = ["crackers/", "scanners/", "forensic_tools/", "readme.txt"];
    } else {
      files = ["../", ".hidden/"];
    }

    addOutput([
      "Directory listing for " + currentDir,
      ...files.map((file) => `${file.endsWith("/") ? "dir" : "file"}  ${file}`),
    ]);
  };

  // Change directory
  const changeDirectory = (dir) => {
    if (!dir) {
      addOutput(["Usage: cd [directory]"]);
      return;
    }

    if (dir === "..") {
      const parts = currentDir.split("/");
      if (parts.length > 2) {
        parts.pop();
        setCurrentDir(parts.join("/"));
        addOutput([`Changed directory to ${parts.join("/")}`]);
      } else {
        addOutput(["Already at root directory"]);
      }
      return;
    }

    // Simulate directory navigation
    let newDir = dir.startsWith("/")
      ? dir
      : `${currentDir}/${dir.replace(/\/$/, "")}`;
    setCurrentDir(newDir);
    addOutput([`Changed directory to ${newDir}`]);
  };

  // Read file content
  const readFile = (file) => {
    if (!file) {
      addOutput(["Usage: read [filename]"]);
      return;
    }

    let content = [];

    // Simulate file content based on filename and current directory
    if (file === "notes.txt" && currentDir === "/home/investigator") {
      content = [
        "=== INVESTIGATION NOTES ===",
        "Possible Shadow Market vendor identities:",
        "- CobraSystems - Network security exploits",
        "- GhostDoc - Medical credentials",
        "- Prometheus_X - Industrial sabotage",
        "",
        "Need to check system access for each vendor.",
        "Product IDs found at crime scenes match listings.",
        "Possible passwords may relate to vendor descriptions or products.",
        "",
        "Informant mentioned Shadow Market can be accessed at shadow.market.onion",
        "Need to verify this address in the dark web browser.",
      ];
    } else if (file === "vendors.txt" && currentDir.includes("documents")) {
      content = [
        "=== VENDOR LIST ===",
        "vendor.id: CobraSystems",
        "access: cobra.shadowmarket.onion",
        "status: locked",
        "",
        "vendor.id: GhostDoc",
        "access: ghost.shadowmarket.onion",
        "status: locked",
        "",
        "vendor.id: Prometheus_X",
        "access: prometheus.shadowmarket.onion",
        "status: locked",
        "",
        "Note: Access requires special credentials. Check evidence for hints.",
      ];
    } else if (file === "readme.txt" && currentDir.includes("tools")) {
      content = [
        "=== HACKING TOOLS README ===",
        "To crack a system password:",
        "1. First run a scan on the target: scan [url]",
        "2. Then attempt to crack: crack [url]",
        "3. You will have limited attempts based on security level",
        "4. Each guess will provide feedback on correct characters",
        "",
        "Password hints may be found in evidence or vendor descriptions.",
        "Good luck and stay undetected.",
      ];
    } else {
      content = ["File not found or permission denied."];
    }

    addOutput([`=== ${file} ===`, ...content]);
  };

  // Scan target for vulnerabilities
  const scanTarget = (target) => {
    if (!target) {
      addOutput(["Usage: scan [target_url]"]);
      return;
    }

    addOutput([
      `Scanning target: ${target}`,
      "Initializing port scan...",
      "Checking for vulnerabilities...",
      "Analyzing security protocols...",
    ]);

    // Simulate scan delay
    setTimeout(() => {
      let results = [];

      if (target.includes("cobra")) {
        results = [
          "SCAN COMPLETE:",
          "Target: cobra.shadowmarket.onion",
          "Security Level: HIGH",
          "Open Ports: 80, 443, 22",
          "Vulnerabilities: Password authentication only",
          "Username identified: CobraSystems",
          "Password required for access.",
          "Hint: Vendor specializes in network penetration and uses snake imagery",
          "Password attempts allowed: 5",
        ];
      } else if (target.includes("ghost")) {
        results = [
          "SCAN COMPLETE:",
          "Target: ghost.shadowmarket.onion",
          "Security Level: MEDIUM",
          "Open Ports: 80, 443",
          "Vulnerabilities: Weak password policy",
          "Username identified: GhostDoc",
          "Password required for access.",
          "Hint: Vendor deals in medical credentials and uses vintage symbols",
          "Password attempts allowed: 6",
        ];
      } else if (target.includes("prometheus")) {
        results = [
          "SCAN COMPLETE:",
          "Target: prometheus.shadowmarket.onion",
          "Security Level: VERY HIGH",
          "Open Ports: 80, 443, 8080",
          "Vulnerabilities: Limited login attempts",
          "Username identified: Prometheus_X",
          "Password required for access.",
          'Hint: Vendor quote - "bringing forbidden knowledge to mankind"',
          "Password attempts allowed: 4",
        ];
      } else {
        results = [
          "SCAN COMPLETE:",
          `Target: ${target}`,
          "Connection failed or invalid target.",
          "No vulnerabilities identified.",
        ];
      }

      addOutput(results);
    }, 2000);
  };

  // Start password cracking
  const startCracking = (target) => {
    if (!target) {
      addOutput(["Usage: crack [target_url]"]);
      return;
    }

    let passwordToCrack = "";
    let attempts = 0;
    let hint = "";

    if (target.includes("cobra")) {
      passwordToCrack = "venom";
      attempts = 5;
      hint = "Associated with snake venom and network penetration";
    } else if (target.includes("ghost")) {
      passwordToCrack = "caduceus";
      attempts = 6;
      hint = "Ancient medical symbol involving snakes and a staff";
    } else if (target.includes("prometheus")) {
      passwordToCrack = "fire";
      attempts = 4;
      hint = "What did Prometheus steal from the gods in Greek mythology?";
    } else {
      addOutput([
        `Unknown target: ${target}`,
        `Run 'scan ${target}' first to identify vulnerabilities.`,
      ]);
      return;
    }

    // Set up cracking mode
    setTargetSystem(target);
    setTargetPassword(passwordToCrack);
    setMaxAttempts(attempts);
    setPasswordHint(hint);
    setCrackingMode(true);

    addOutput([
      `Initiating password cracker for: ${target}`,
      `You have ${attempts} attempts before lockout.`,
      "Starting password cracking tool...",
    ]);
  };

  // Handle successful password crack
  const handleCrackSuccess = (password) => {
    addOutput([
      "ACCESS GRANTED",
      `Successfully cracked ${targetSystem}!`,
      "Accessing vendor data...",
      "-------------------------",
      `Vendor account unlocked: ${targetSystem}`,
      "-------------------------",
    ]);
    setIsCracked(true);

    // Handle successful crack based on target
    let vendorId = null;

    if (targetSystem.includes("cobra")) {
      vendorId = "CobraSystems";
      addOutput([
        "=== VENDOR PROFILE: CobraSystems ===",
        "Real name: Alex Karimov",
        "Products: Network penetration tools",
        "Customers: 247 verified transactions",
        "Last login: 3 days before disappearance",
        "Notes: Tools compromise user data security",
        "Evidence item: Circuit board with snake emblem found at scene",
        "=====================================",
      ]);
    } else if (targetSystem.includes("ghost")) {
      vendorId = "GhostDoc";
      addOutput([
        "=== VENDOR PROFILE: GhostDoc ===",
        "Real name: Dr. Leyla Mahmudova",
        "Products: Medical credentials, prescription access",
        "Customers: 183 verified transactions",
        "Last login: Day of disappearance",
        "Notes: Sold fraudulent medical licenses",
        "Evidence item: Antique medical caduceus wrapped in gauze",
        "=====================================",
      ]);
    } else if (targetSystem.includes("prometheus")) {
      vendorId = "Prometheus_X";
      addOutput([
        "=== VENDOR PROFILE: Prometheus_X ===",
        "Real name: Ibrahim Nasirov",
        "Products: Industrial sabotage software",
        "Customers: 92 verified high-value transactions",
        "Last login: 5 hours before disappearance",
        'Notes: Quote - "bringing forbidden knowledge to mankind"',
        "Evidence item: Small metal lighter with Greek lettering",
        "=====================================",
      ]);
    }

    // If vendorId was identified, update the dark web store to unlock vendor
    if (vendorId) {
      try {
        // Use the dark web store to unlock the vendor
        const darkWebStore = useDarkWebStore.getState();

        // First update the vendor's access status
        darkWebStore.authenticateAsVendor(vendorId);

        addOutput([
          `Vendor profile for ${vendorId} has been unlocked in the Shadow Market browser.`,
          "You can now access their complete vendor profile and transaction history.",
          "Use 'connect " + targetSystem + "' to access the account directly.",
        ]);
      } catch (error) {
        console.error("Error updating dark web store:", error);
      }
    }

    // Exit cracking mode
    setCrackingMode(false);
  };

  // Handle password crack failure
  const handleCrackFailure = () => {
    addOutput([
      "ACCESS DENIED",
      "Maximum attempts reached.",
      "System locked - further attempts will trigger security alert.",
      "Try finding more information about the target before retrying.",
    ]);

    // Exit cracking mode
    setCrackingMode(false);
  };

  // Exit the cracking minigame
  const handleExitCracking = () => {
    setCrackingMode(false);
    addOutput(["Password cracking aborted."]);
  };

  // Connect to system
  const connectToSystem = (system) => {
    if (!system) {
      addOutput(["Usage: connect [system_url]"]);
      return;
    }

    addOutput([
      `Attempting connection to ${system}...`,
      "Routing through anonymizer...",
      "Establishing secure connection...",
    ]);

    setTimeout(() => {
      let result = [];

      if (
        (system.includes("cobra") &&
          isCracked &&
          targetSystem.includes("cobra")) ||
        (system.includes("ghost") &&
          isCracked &&
          targetSystem.includes("ghost")) ||
        (system.includes("prometheus") &&
          isCracked &&
          targetSystem.includes("prometheus"))
      ) {
        result = [
          "CONNECTION ESTABLISHED",
          `Successfully connected to ${system}`,
          "You now have access to this vendor account.",
          `Type 'ls' to see available files.`,
        ];
      } else {
        result = [
          "CONNECTION FAILED",
          "Authentication required.",
          `You need to successfully crack this system first.`,
          `Use 'crack ${system}' to attempt password cracking.`,
        ];
      }

      addOutput(result);
    }, 1500);
  };

  // Add output to terminal history
  const addOutput = (lines) => {
    const newLines = lines.map((line) => ({ text: line, type: "output" }));
    setHistory((prev) => [...prev, ...newLines]);
  };

  // Handle key press for command history navigation
  const handleKeyDown = (e) => {
    // Up arrow
    if (e.keyCode === 38) {
      e.preventDefault();

      if (
        commandHistory.length > 0 &&
        historyIndex < commandHistory.length - 1
      ) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    }
    // Down arrow
    else if (e.keyCode === 40) {
      e.preventDefault();

      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className={styles.terminal} onClick={focusInput}>
      <div className={styles.terminalHeader}>
        <div className={styles.headerText}>SHADOW OS TERMINAL</div>
        <div className={styles.statusIndicator}>SECURE</div>
      </div>

      {crackingMode ? (
        // Render password cracker minigame
        <PasswordCracker
          targetPassword={targetPassword}
          maxAttempts={maxAttempts}
          onSuccess={handleCrackSuccess}
          onFailure={handleCrackFailure}
          onExit={handleExitCracking}
          hint={passwordHint}
        />
      ) : (
        // Render normal terminal
        <>
          <div className={styles.terminalContent} ref={terminalRef}>
            {history.map((item, index) => (
              <div
                key={index}
                className={`${styles.terminalLine} ${styles[item.type]}`}
              >
                {item.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <span className={styles.prompt}>{`${currentDir}>`}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.terminalInput}
              autoFocus
            />
          </form>
        </>
      )}
    </div>
  );
};

export default Terminal;
