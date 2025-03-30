// store/evidenceBoardStore.js
import { create } from "zustand";

// Define the correct answers for verification
const CORRECT_ANSWERS = {
  snake: {
    realName: "Alex Karimov",
    alias: "CobraSystems",
    crime: "Network penetration tools that compromise user data",
  },
  medical: {
    realName: "Dr. Leyla Mahmudova",
    alias: "GhostDoc",
    crime: "Medical credentials and prescription access",
  },
  lighter: {
    realName: "Ibrahim Nasirov",
    alias: "Prometheus_X",
    crime: "Industrial sabotage software and restricted technical documents",
  },
  usb: {
    realName: "Unknown", // Player won't be able to solve this yet
    alias: "QuantumHarvest",
    crime: "Mass data harvesting and selling personal information",
  },
  mirror: {
    realName: "Unknown", // Player won't be able to solve this yet
    alias: "MirrorMask",
    crime: "Identity theft and impersonation services",
  },
};

// Define the case cards
const INITIAL_CASE_CARDS = [
  {
    id: "snake",
    label: "Snake Body",
    description:
      "Body found with a small toy snake wrapped around a circuit board",
    realName: "",
    alias: "",
    crime: "",
    notes: "",
    isSubmitted: false,
  },
  {
    id: "medical",
    label: "Medical Symbol Body",
    description:
      "Body found with an antique medical caduceus with gauze wrapped around it",
    realName: "",
    alias: "",
    crime: "",
    notes: "",
    isSubmitted: false,
  },
  {
    id: "lighter",
    label: "Lighter Body",
    description: "Body found with a small metal lighter with Greek lettering",
    realName: "",
    alias: "",
    crime: "",
    notes: "",
    isSubmitted: false,
  },
  {
    id: "usb",
    label: "USB Body",
    description:
      "Body found with a USB drive embedded in a small sheaf of wheat",
    realName: "",
    alias: "",
    crime: "",
    notes: "",
    isSubmitted: false,
  },
  {
    id: "mirror",
    label: "Mirror Body",
    description: "Body found with a small mirror with text etched backward",
    realName: "",
    alias: "",
    crime: "",
    notes: "",
    isSubmitted: false,
  },
];

// Save state to localStorage
const saveToLocalStorage = (
  caseCards,
  evidence,
  connections,
  investigationSubmitted,
  investigationResult
) => {
  try {
    localStorage.setItem(
      "shadow_market_evidence_board",
      JSON.stringify({
        caseCards,
        evidence,
        connections,
        investigationSubmitted,
        investigationResult,
      })
    );
  } catch (error) {
    console.error("Error saving evidence board state to localStorage:", error);
  }
};

// Load state from localStorage
const loadFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem("shadow_market_evidence_board");
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error(
      "Error loading evidence board state from localStorage:",
      error
    );
  }
  return null;
};

// For evidence items
const generateId = () =>
  `evidence-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const useEvidenceBoardStore = create((set, get) => {
  // Load saved state or use initial state
  const savedState = loadFromLocalStorage();

  const initialState = {
    // Case cards for victim identification
    caseCards: savedState?.caseCards || INITIAL_CASE_CARDS,

    // Traditional evidence collection (kept for compatibility)
    evidence: savedState?.evidence || [],
    connections: savedState?.connections || [],

    // Investigation submission state
    investigationSubmitted: savedState?.investigationSubmitted || false,
    investigationResult: savedState?.investigationResult || null,

    // UI state
    selectedCardId: null,
    selectedEvidenceId: null,
    isConnectingMode: false,
    connectingFrom: null,
    zoomLevel: 1,
    panOffset: { x: 0, y: 0 },
  };

  return {
    ...initialState,

    // Update a case card field
    updateCaseCard: (cardId, updates) => {
      set((state) => {
        const updatedCards = state.caseCards.map((card) =>
          card.id === cardId ? { ...card, ...updates } : card
        );

        saveToLocalStorage(
          updatedCards,
          state.evidence,
          state.connections,
          state.investigationSubmitted,
          state.investigationResult
        );

        return { caseCards: updatedCards };
      });
    },

    // Select a card for editing
    selectCard: (cardId) => {
      set({ selectedCardId: cardId });
    },

    // Submit the entire investigation (all 5 cards)
    submitInvestigation: () => {
      const { caseCards } = get();

      // Check if all cards have been filled out
      const allCardsFilled = caseCards.every(
        (card) =>
          card.realName.trim() !== "" &&
          card.alias.trim() !== "" &&
          card.crime.trim() !== ""
      );

      if (!allCardsFilled) {
        return {
          success: false,
          message:
            "All case cards must be completely filled out before submission.",
        };
      }

      // Count correct answers
      let correctCount = 0;

      caseCards.forEach((card) => {
        const correctData = CORRECT_ANSWERS[card.id];

        // Case-insensitive matching for text fields
        const isRealNameCorrect =
          card.realName.toLowerCase() === correctData.realName.toLowerCase();
        const isAliasCorrect =
          card.alias.toLowerCase() === correctData.alias.toLowerCase();

        // More flexible matching for crime description
        const isCrimeCorrect =
          correctData.crime.toLowerCase().includes(card.crime.toLowerCase()) ||
          card.crime.toLowerCase().includes(correctData.crime.toLowerCase());

        if (isRealNameCorrect && isAliasCorrect && isCrimeCorrect) {
          correctCount++;
        }
      });

      // Determine result based on correct count
      let result = {
        totalCards: 5,
        correctCards: correctCount,
        message: "",
        success: false,
      };

      if (correctCount === 5) {
        result.success = true;
        result.message =
          "Excellent work, Detective! Your deductions are spot on. You've correctly identified all victims and their activities. Something terrible happened in Shadow Market, and you might be the only one who knows the full story now...";
      } else if (correctCount >= 3) {
        result.success = false;
        result.message =
          "You're on the right track. You've correctly identified some of the victims, but there are still errors in your deductions. Review the evidence again and look for overlooked connections.";
      } else {
        result.success = false;
        result.message =
          "Your investigation has stalled. Most of your deductions are incorrect. Return to the evidence and reconsider your approach. The connections are there if you look carefully.";
      }

      // Update state with results
      set((state) => {
        const updatedState = {
          investigationSubmitted: true,
          investigationResult: result,
        };

        saveToLocalStorage(
          state.caseCards,
          state.evidence,
          state.connections,
          true,
          result
        );

        return updatedState;
      });

      return {
        success: true,
        message: "Investigation submitted for review.",
      };
    },

    // Reset the investigation
    resetInvestigation: () => {
      set((state) => {
        const resetCards = INITIAL_CASE_CARDS;

        saveToLocalStorage(
          resetCards,
          state.evidence,
          state.connections,
          false,
          null
        );

        return {
          caseCards: resetCards,
          investigationSubmitted: false,
          investigationResult: null,
        };
      });
    },

    // --- Traditional evidence board functions ---

    // Add evidence item (kept for compatibility)
    addEvidence: (evidence) => {
      const newEvidence = {
        id: generateId(),
        position: { x: 200, y: 200 },
        color: "pink",
        pinned: false,
        ...evidence,
      };

      set((state) => {
        const updatedEvidence = [...state.evidence, newEvidence];

        saveToLocalStorage(
          state.caseCards,
          updatedEvidence,
          state.connections,
          state.investigationSubmitted,
          state.investigationResult
        );

        return { evidence: updatedEvidence };
      });

      return newEvidence.id;
    },

    // Update existing evidence
    updateEvidence: (id, updates) => {
      set((state) => {
        const updatedEvidence = state.evidence.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        );

        saveToLocalStorage(
          state.caseCards,
          updatedEvidence,
          state.connections,
          state.investigationSubmitted,
          state.investigationResult
        );

        return { evidence: updatedEvidence };
      });
    },

    // Remove evidence and its connections
    removeEvidence: (id) => {
      set((state) => {
        const updatedEvidence = state.evidence.filter((item) => item.id !== id);

        // Also remove connections involving this evidence
        const updatedConnections = state.connections.filter(
          (conn) => conn.from !== id && conn.to !== id
        );

        saveToLocalStorage(
          state.caseCards,
          updatedEvidence,
          updatedConnections,
          state.investigationSubmitted,
          state.investigationResult
        );

        return {
          evidence: updatedEvidence,
          connections: updatedConnections,
          selectedEvidenceId:
            state.selectedEvidenceId === id ? null : state.selectedEvidenceId,
        };
      });
    },

    // Set the selected evidence
    selectEvidence: (id) => {
      const { isConnectingMode, connectingFrom } = get();

      // If in connecting mode, create a connection
      if (isConnectingMode && connectingFrom && id !== connectingFrom) {
        get().addConnection(connectingFrom, id);
        set({ isConnectingMode: false, connectingFrom: null });
      } else {
        set({ selectedEvidenceId: id });
      }
    },

    // Move evidence to a new position
    moveEvidence: (id, position) => {
      set((state) => {
        const updatedEvidence = state.evidence.map((item) =>
          item.id === id ? { ...item, position } : item
        );

        saveToLocalStorage(
          state.caseCards,
          updatedEvidence,
          state.connections,
          state.investigationSubmitted,
          state.investigationResult
        );

        return { evidence: updatedEvidence };
      });
    },

    // Start connecting mode
    startConnecting: (fromId) => {
      set({ isConnectingMode: true, connectingFrom: fromId });
    },

    // Cancel connecting mode
    cancelConnecting: () => {
      set({ isConnectingMode: false, connectingFrom: null });
    },

    // Add a connection between two evidence items
    addConnection: (fromId, toId) => {
      // Prevent duplicate connections
      const exists = get().connections.some(
        (conn) =>
          (conn.from === fromId && conn.to === toId) ||
          (conn.from === toId && conn.to === fromId)
      );

      if (!exists && fromId !== toId) {
        set((state) => {
          const newConnection = {
            id: generateId(),
            from: fromId,
            to: toId,
            label: "",
            color: "cyan",
          };

          const updatedConnections = [...state.connections, newConnection];

          saveToLocalStorage(
            state.caseCards,
            state.evidence,
            updatedConnections,
            state.investigationSubmitted,
            state.investigationResult
          );

          return { connections: updatedConnections };
        });
      }
    },

    // Update connection properties
    updateConnection: (id, updates) => {
      set((state) => {
        const updatedConnections = state.connections.map((conn) =>
          conn.id === id ? { ...conn, ...updates } : conn
        );

        saveToLocalStorage(
          state.caseCards,
          state.evidence,
          updatedConnections,
          state.investigationSubmitted,
          state.investigationResult
        );

        return { connections: updatedConnections };
      });
    },

    // Remove a connection
    removeConnection: (id) => {
      set((state) => {
        const updatedConnections = state.connections.filter(
          (conn) => conn.id !== id
        );

        saveToLocalStorage(
          state.caseCards,
          state.evidence,
          updatedConnections,
          state.investigationSubmitted,
          state.investigationResult
        );

        return { connections: updatedConnections };
      });
    },

    // Set zoom level
    setZoomLevel: (level) => {
      // Constrain zoom level between 0.5 and 2
      const constrainedLevel = Math.max(0.5, Math.min(2, level));
      set({ zoomLevel: constrainedLevel });
    },

    // Set pan offset
    setPanOffset: (offset) => {
      set({ panOffset: offset });
    },

    // Reset evidence board to initial state
    resetEvidenceBoard: () => {
      const defaultState = {
        caseCards: INITIAL_CASE_CARDS,
        evidence: [],
        connections: [],
        investigationSubmitted: false,
        investigationResult: null,
      };

      saveToLocalStorage(
        defaultState.caseCards,
        defaultState.evidence,
        defaultState.connections,
        defaultState.investigationSubmitted,
        defaultState.investigationResult
      );

      set({
        ...defaultState,
        selectedCardId: null,
        selectedEvidenceId: null,
        connectingFrom: null,
        isConnectingMode: false,
        zoomLevel: 1,
        panOffset: { x: 0, y: 0 },
      });
    },
  };
});

export { useEvidenceBoardStore };
