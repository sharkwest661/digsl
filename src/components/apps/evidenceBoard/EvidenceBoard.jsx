// components/apps/evidenceBoard/EvidenceBoard.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  Minus,
  Link2,
  Link2Off,
  Trash,
  X,
  PenTool,
  FileText,
  FilePlus,
} from "lucide-react";
import { useEvidenceBoardStore, useThemeStore } from "../../../store";
import EvidenceItem from "./EvidenceItem";
import Connections from "./Connections";
import EditEvidenceModal from "./EditEvidenceModal";
import ConfirmationModal from "../../common/ConfirmationModal";
import styles from "./EvidenceBoard.module.scss";

const EvidenceBoard = () => {
  // Get theme configuration
  const themeConfig = useThemeStore((state) => state.themeConfig);
  const effectsEnabled = useThemeStore((state) => state.effectsEnabled);

  // Get evidence store state and actions
  const evidence = useEvidenceBoardStore((state) => state.evidence);
  const connections = useEvidenceBoardStore((state) => state.connections);
  const selectedEvidenceId = useEvidenceBoardStore(
    (state) => state.selectedEvidenceId
  );
  const isConnectingMode = useEvidenceBoardStore(
    (state) => state.isConnectingMode
  );
  const connectingFrom = useEvidenceBoardStore((state) => state.connectingFrom);
  const zoomLevel = useEvidenceBoardStore((state) => state.zoomLevel);
  const panOffset = useEvidenceBoardStore((state) => state.panOffset);

  const selectEvidence = useEvidenceBoardStore((state) => state.selectEvidence);
  const moveEvidence = useEvidenceBoardStore((state) => state.moveEvidence);
  const startConnecting = useEvidenceBoardStore(
    (state) => state.startConnecting
  );
  const cancelConnecting = useEvidenceBoardStore(
    (state) => state.cancelConnecting
  );
  const removeEvidence = useEvidenceBoardStore((state) => state.removeEvidence);
  const addEvidence = useEvidenceBoardStore((state) => state.addEvidence);
  const updateEvidence = useEvidenceBoardStore((state) => state.updateEvidence);
  const setZoomLevel = useEvidenceBoardStore((state) => state.setZoomLevel);
  const setPanOffset = useEvidenceBoardStore((state) => state.setPanOffset);

  // Local state
  const [isDraggingBoard, setIsDraggingBoard] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [temporaryConnector, setTemporaryConnector] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // References
  const boardRef = useRef(null);

  // Selected evidence item
  const selectedEvidence = evidence.find(
    (item) => item.id === selectedEvidenceId
  );
  const connectingEvidence = evidence.find(
    (item) => item.id === connectingFrom
  );

  // Setup event cleanup
  useEffect(() => {
    // Clean up event listeners on unmount
    return () => {
      document.removeEventListener("mousemove", handleBoardDrag);
      document.removeEventListener("mouseup", handleBoardDragEnd);
    };
  }, []);

  // Setup event listeners
  useEffect(() => {
    const board = boardRef.current;
    if (board) {
      board.addEventListener("mousemove", handleBoardMouseMove);
    }

    // Cleanup
    return () => {
      if (board) {
        board.removeEventListener("mousemove", handleBoardMouseMove);
      }
      window.removeEventListener("mousemove", handleBoardDrag);
      window.removeEventListener("mouseup", handleBoardDragEnd);
    };
  }, [isConnectingMode, connectingEvidence, zoomLevel, panOffset]);

  // Handle board click (deselect evidence)
  const handleBoardClick = (e) => {
    if (e.target === boardRef.current) {
      // If in connecting mode, cancel it
      if (isConnectingMode) {
        cancelConnecting();
      } else {
        selectEvidence(null);
      }
    }
  };

  // Handle board mouse down (start dragging the board)
  const handleBoardMouseDown = (e) => {
    if (e.target === boardRef.current) {
      setIsDraggingBoard(true);
      setDragStartPosition({ x: e.clientX, y: e.clientY });

      // Add document-level event listeners for dragging
      document.addEventListener("mousemove", handleBoardDrag);
      document.addEventListener("mouseup", handleBoardDragEnd);
    }
  };

  // Handle board dragging
  const handleBoardDrag = (e) => {
    if (isDraggingBoard) {
      // Calculate new pan offset
      const dx = e.clientX - dragStartPosition.x;
      const dy = e.clientY - dragStartPosition.y;

      setPanOffset({
        x: panOffset.x + dx,
        y: panOffset.y + dy,
      });

      setDragStartPosition({ x: e.clientX, y: e.clientY });
    }
  };

  // Handle ending board drag
  const handleBoardDragEnd = () => {
    setIsDraggingBoard(false);

    // Remove document-level event listeners
    document.removeEventListener("mousemove", handleBoardDrag);
    document.removeEventListener("mouseup", handleBoardDragEnd);
  };

  // Handle mouse move on the board (for temporary connector)
  const handleBoardMouseMove = (e) => {
    // Only handle in connecting mode
    if (isConnectingMode && connectingEvidence) {
      const boardRect = boardRef.current.getBoundingClientRect();

      // Convert screen coordinates to board coordinates
      const toPoint = {
        x: (e.clientX - boardRect.left - panOffset.x) / zoomLevel,
        y: (e.clientY - boardRect.top - panOffset.y) / zoomLevel,
      };

      setTemporaryConnector({
        from: connectingEvidence.id,
        fromPosition: connectingEvidence.position,
        toPosition: toPoint,
      });
    }
  };

  // Handle mouse up (stop dragging)
  const handleMouseUp = () => {
    setIsDraggingBoard(false);
  };

  // Add new evidence
  const handleAddEvidence = (evidenceData) => {
    addEvidence(evidenceData);
    setShowAddModal(false);
  };

  // Update existing evidence
  const handleEditEvidence = (updates) => {
    if (selectedEvidenceId) {
      updateEvidence(selectedEvidenceId, updates);
      setShowEditModal(false);
    }
  };

  // Zoom in
  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  // Zoom out
  const handleZoomOut = () => {
    setZoomLevel(zoomLevel - 0.1);
  };

  // Delete selected evidence
  const handleDeleteEvidence = () => {
    if (selectedEvidenceId) {
      removeEvidence(selectedEvidenceId);
      setShowDeleteModal(false);
    }
  };

  // Toggle connection mode
  const handleToggleConnectMode = () => {
    if (isConnectingMode) {
      cancelConnecting();
    } else if (selectedEvidenceId) {
      startConnecting(selectedEvidenceId);
    }
  };

  // Setup document-wide event listeners
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Board transform style based on zoom and pan - optimized for performance
  const boardTransformStyle = {
    transform: `scale(${zoomLevel}) translate3d(${panOffset.x / zoomLevel}px, ${
      panOffset.y / zoomLevel
    }px, 0)`,
    willChange: "transform",
  };

  return (
    <div className={styles.container}>
      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlsLeft}>
          <button
            className={styles.controlButton}
            onClick={() => setShowAddModal(true)}
            title="Add Evidence"
          >
            <FilePlus size={16} />
          </button>

          <button
            className={styles.controlButton}
            onClick={handleZoomIn}
            disabled={zoomLevel >= 2}
            title="Zoom In"
          >
            <Plus size={16} />
          </button>

          <button
            className={styles.controlButton}
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.5}
            title="Zoom Out"
          >
            <Minus size={16} />
          </button>

          <div className={styles.zoomIndicator}>
            {Math.round(zoomLevel * 100)}%
          </div>
        </div>

        <div className={styles.controlsRight}>
          {selectedEvidenceId && (
            <>
              <button
                className={`${styles.controlButton} ${
                  isConnectingMode ? styles.active : ""
                }`}
                onClick={handleToggleConnectMode}
                title={
                  isConnectingMode ? "Cancel Connection" : "Connect Evidence"
                }
              >
                {isConnectingMode ? (
                  <Link2Off size={16} />
                ) : (
                  <Link2 size={16} />
                )}
              </button>

              <button
                className={styles.controlButton}
                onClick={() => setShowEditModal(true)}
                title="Edit Evidence"
              >
                <PenTool size={16} />
              </button>

              <button
                className={styles.controlButton}
                onClick={() => setShowDeleteModal(true)}
                title="Delete Evidence"
              >
                <Trash size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Evidence Board */}
      <div
        className={`${styles.board} ${isDraggingBoard ? styles.dragging : ""} ${
          isConnectingMode ? styles.connecting : ""
        }`}
        onClick={handleBoardClick}
        onMouseDown={handleBoardMouseDown}
        onMouseMove={isConnectingMode ? handleBoardMouseMove : undefined}
        ref={boardRef}
      >
        <div className={styles.boardContent} style={boardTransformStyle}>
          {/* Connection lines */}
          <Connections
            connections={connections}
            evidence={evidence}
            temporaryConnector={temporaryConnector}
          />

          {/* Evidence items */}
          {evidence.map((item) => (
            <EvidenceItem
              key={item.id}
              evidence={item}
              selected={item.id === selectedEvidenceId}
              connecting={isConnectingMode && item.id !== connectingFrom}
              isConnectingSource={item.id === connectingFrom}
              onSelect={() => selectEvidence(item.id)}
              onMove={(position) => moveEvidence(item.id, position)}
              zoomLevel={zoomLevel}
            />
          ))}
        </div>
      </div>

      {/* Connection mode indicator */}
      {isConnectingMode && (
        <div className={styles.connectionModeIndicator}>
          <Link2 size={16} />
          <span>Connecting from: {connectingEvidence?.title}</span>
          <button onClick={cancelConnecting} className={styles.cancelButton}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <EditEvidenceModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddEvidence}
          title="Add Evidence"
        />
      )}

      {showEditModal && selectedEvidence && (
        <EditEvidenceModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          evidence={selectedEvidence}
          onSave={handleEditEvidence}
          title="Edit Evidence"
        />
      )}

      {showDeleteModal && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteEvidence}
          title="Delete Evidence"
          message={`Are you sure you want to delete "${
            selectedEvidence?.title || "this evidence"
          }"? This action cannot be undone.`}
          confirmText="Delete"
        />
      )}
    </div>
  );
};

export default EvidenceBoard;
