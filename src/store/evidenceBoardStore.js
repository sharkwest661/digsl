// store/evidenceBoardStore.js
import { create } from "zustand";

const generateId = () =>
  `evidence-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

// Save evidence to localStorage
const saveEvidenceToLocalStorage = (evidence, connections) => {
  try {
    localStorage.setItem(
      "shadow_market_evidence",
      JSON.stringify({ evidence, connections })
    );
  } catch (error) {
    console.error("Error saving evidence to localStorage:", error);
  }
};

// Load evidence from localStorage
const loadEvidenceFromLocalStorage = () => {
  try {
    const savedEvidence = localStorage.getItem("shadow_market_evidence");
    if (savedEvidence) {
      return JSON.parse(savedEvidence);
    }
  } catch (error) {
    console.error("Error loading evidence from localStorage:", error);
  }

  // Return default evidence if nothing is saved
  return {
    evidence: [
      {
        id: "evidence-welcome",
        title: "Investigation Start",
        description:
          "Begin your investigation by collecting evidence and connecting related items. Use the add button to create new evidence cards.",
        type: "note",
        position: { x: 100, y: 100 },
        color: "cyan",
        pinned: true,
      },
      {
        id: "evidence-objects",
        title: "Objects Left at Crime Scenes",
        description:
          "Each victim was found with a distinctive object - these might relate to their online identity.",
        type: "document",
        position: { x: 400, y: 150 },
        color: "pink",
        pinned: false,
      },
      {
        id: "evidence-cobra",
        title: "Toy snake on circuit board",
        description:
          "Found with the first victim. Matches CobraSystems' avatar icon on Shadow Market.",
        type: "item",
        position: { x: 350, y: 300 },
        color: "orange",
        pinned: false,
      },
    ],
    connections: [
      {
        id: "conn-1",
        from: "evidence-objects",
        to: "evidence-cobra",
        label: "Example",
        color: "cyan",
      },
    ],
  };
};

const useEvidenceBoardStore = create((set, get) => {
  // Load initial state from localStorage
  const { evidence: initialEvidence, connections: initialConnections } =
    loadEvidenceFromLocalStorage();

  return {
    // Evidence items
    evidence: initialEvidence,

    // Connections between evidence items
    connections: initialConnections,

    // Currently selected evidence for editing or connecting
    selectedEvidenceId: null,

    // Connection mode (when creating connections between evidence)
    connectingFrom: null,
    isConnectingMode: false,

    // Current view settings
    zoomLevel: 1,
    panOffset: { x: 0, y: 0 },

    // Add new evidence item
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
        saveEvidenceToLocalStorage(updatedEvidence, state.connections);
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
        saveEvidenceToLocalStorage(updatedEvidence, state.connections);
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

        saveEvidenceToLocalStorage(updatedEvidence, updatedConnections);

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
        saveEvidenceToLocalStorage(updatedEvidence, state.connections);
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
          saveEvidenceToLocalStorage(state.evidence, updatedConnections);

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
        saveEvidenceToLocalStorage(state.evidence, updatedConnections);
        return { connections: updatedConnections };
      });
    },

    // Remove a connection
    removeConnection: (id) => {
      set((state) => {
        const updatedConnections = state.connections.filter(
          (conn) => conn.id !== id
        );
        saveEvidenceToLocalStorage(state.evidence, updatedConnections);
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
      const defaultState = loadEvidenceFromLocalStorage();
      set({
        evidence: defaultState.evidence,
        connections: defaultState.connections,
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
