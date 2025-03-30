// components/apps/evidenceBoard/EvidenceBoard.jsx
import React, { useState } from "react";
import {
  Clipboard,
  Edit,
  Save,
  FileText,
  X,
  ChevronRight,
  Check,
  RotateCcw,
  Send,
  Layers,
  CheckCircle,
} from "lucide-react";
import { useThemeStore, useEvidenceBoardStore } from "../../../store";
import { Scanlines } from "../../effects/Scanlines";
import styles from "./EvidenceBoard.module.scss";

const EvidenceBoard = () => {
  // Get theme configuration
  const themeConfig = useThemeStore((state) => state.themeConfig);
  const effectsEnabled = useThemeStore((state) => state.effectsEnabled);

  // Get evidence board state
  const caseCards = useEvidenceBoardStore((state) => state.caseCards);
  const updateCaseCard = useEvidenceBoardStore((state) => state.updateCaseCard);
  const submitInvestigation = useEvidenceBoardStore(
    (state) => state.submitInvestigation
  );
  const resetInvestigation = useEvidenceBoardStore(
    (state) => state.resetInvestigation
  );
  const investigationSubmitted = useEvidenceBoardStore(
    (state) => state.investigationSubmitted
  );
  const investigationResult = useEvidenceBoardStore(
    (state) => state.investigationResult
  );

  // Local UI state
  const [mainTab, setMainTab] = useState("cases"); // "cases" or "evidence" or "connections"
  const [selectedCase, setSelectedCase] = useState("snake"); // Default to first case
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);

  // Handle case card field update
  const handleFieldUpdate = (cardId, field, value) => {
    updateCaseCard(cardId, { [field]: value });
  };

  // Handle investigation submission
  const handleSubmitInvestigation = () => {
    // Check if all cards are filled
    const allCardsFilled = caseCards.every(
      (card) =>
        card.realName.trim() !== "" &&
        card.alias.trim() !== "" &&
        card.crime.trim() !== ""
    );

    if (!allCardsFilled) {
      setSubmitError(
        "All fields must be filled out for all case cards before submission."
      );
      return;
    }

    // Submit the investigation
    const result = submitInvestigation();

    if (result.success) {
      setShowSubmitModal(false);
      setShowResultModal(true);
    } else {
      setSubmitError(result.message);
    }
  };

  const handleResetInvestigation = () => {
    resetInvestigation();
    setShowResultModal(false);
  };

  // Check if a case is complete
  const isCaseComplete = (card) => {
    return card.realName && card.alias && card.crime;
  };

  // Count how many cases are complete
  const getCompleteCount = () => {
    return caseCards.filter((card) => isCaseComplete(card)).length;
  };

  // Render the cases tab with nested case tabs
  const renderCasesTab = () => (
    <div className={styles.casesContainer}>
      {/* Case Files Header */}
      <div className={styles.casesHeader}>
        <h2 className={styles.casesTitle}>
          <Clipboard size={18} />
          Case Files
        </h2>

        <div className={styles.caseStatus}>
          <span className={styles.caseCount}>
            <CheckCircle size={14} />
            {getCompleteCount()}/5 Complete
          </span>

          <button
            className={styles.submitButton}
            onClick={() => setShowSubmitModal(true)}
            disabled={investigationSubmitted}
          >
            <Send size={16} />
            Submit Investigation
          </button>
        </div>
      </div>

      {/* Case Tabs Navigation */}
      <div className={styles.caseTabs}>
        {caseCards.map((card) => (
          <button
            key={card.id}
            className={`${styles.caseTab} ${
              selectedCase === card.id ? styles.active : ""
            }`}
            onClick={() => setSelectedCase(card.id)}
          >
            <span className={styles.caseTabLabel}>{card.label}</span>
            {isCaseComplete(card) && (
              <Check size={12} className={styles.completeIcon} />
            )}
          </button>
        ))}
      </div>

      {/* Selected Case Card */}
      {caseCards.map((card) => (
        <div
          key={card.id}
          className={`${styles.caseCardDetail} ${
            selectedCase === card.id ? styles.visible : ""
          }`}
        >
          <div className={styles.caseImage}>
            {/* This would be where an image would go in a full implementation */}
            <div className={styles.caseImagePlaceholder}>
              <Layers size={40} />
              <span>{card.label}</span>
            </div>
          </div>

          <div className={styles.caseDetails}>
            <div className={styles.descriptionBox}>
              <div className={styles.descriptionLabel}>Evidence Found:</div>
              <div className={styles.description}>{card.description}</div>
            </div>

            <div className={styles.inputsContainer}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Real Name:</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={card.realName}
                  onChange={(e) =>
                    handleFieldUpdate(card.id, "realName", e.target.value)
                  }
                  placeholder="Enter victim's real name"
                  disabled={investigationSubmitted}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Dark Web Alias:</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={card.alias}
                  onChange={(e) =>
                    handleFieldUpdate(card.id, "alias", e.target.value)
                  }
                  placeholder="Enter dark web vendor name"
                  disabled={investigationSubmitted}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Criminal Activity:</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={card.crime}
                  onChange={(e) =>
                    handleFieldUpdate(card.id, "crime", e.target.value)
                  }
                  placeholder="Enter illegal activity/product"
                  disabled={investigationSubmitted}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Notes (optional):</label>
                <textarea
                  className={styles.notesField}
                  value={card.notes}
                  onChange={(e) =>
                    handleFieldUpdate(card.id, "notes", e.target.value)
                  }
                  placeholder="Additional case notes..."
                  disabled={investigationSubmitted}
                />
              </div>
            </div>

            <div className={styles.caseNav}>
              <button
                className={styles.caseNavButton}
                onClick={() => {
                  const currentIndex = caseCards.findIndex(
                    (c) => c.id === card.id
                  );
                  const prevIndex =
                    (currentIndex - 1 + caseCards.length) % caseCards.length;
                  setSelectedCase(caseCards[prevIndex].id);
                }}
              >
                Previous Case
              </button>

              <button
                className={styles.caseNavButton}
                onClick={() => {
                  const currentIndex = caseCards.findIndex(
                    (c) => c.id === card.id
                  );
                  const nextIndex = (currentIndex + 1) % caseCards.length;
                  setSelectedCase(caseCards[nextIndex].id);
                }}
              >
                Next Case
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Submit Investigation</h3>
              <button
                className={styles.closeButton}
                onClick={() => setShowSubmitModal(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <p>
                You are about to submit your complete investigation of all five
                victims. This action will lock in your deductions and cannot be
                undone.
              </p>

              <div className={styles.caseStatusList}>
                {caseCards.map((card) => (
                  <div key={card.id} className={styles.statusItem}>
                    <span className={styles.statusName}>{card.label}:</span>
                    <span
                      className={`${styles.statusIndicator} ${
                        isCaseComplete(card)
                          ? styles.complete
                          : styles.incomplete
                      }`}
                    >
                      {isCaseComplete(card) ? "Complete" : "Incomplete"}
                    </span>
                  </div>
                ))}
              </div>

              {submitError && (
                <div className={styles.errorMessage}>{submitError}</div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowSubmitModal(false)}
              >
                Cancel
              </button>

              <button
                className={styles.confirmButton}
                onClick={handleSubmitInvestigation}
              >
                Submit Investigation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Modal */}
      {showResultModal && investigationResult && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Investigation Results</h3>
              <button
                className={styles.closeButton}
                onClick={() => setShowResultModal(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.resultSummary}>
                <div className={styles.resultScore}>
                  {investigationResult.correctCards} /{" "}
                  {investigationResult.totalCards}
                </div>
                <div className={styles.resultLabel}>
                  Correct Identifications
                </div>
              </div>

              <div className={styles.resultMessage}>
                {investigationResult.message}
              </div>

              {investigationResult.correctCards === 5 && (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>🎮</div>
                  <div>You've completed the game! Congratulations!</div>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.resetButton}
                onClick={handleResetInvestigation}
              >
                <RotateCcw size={14} />
                Reset Investigation
              </button>

              <button
                className={styles.closeResultButton}
                onClick={() => setShowResultModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Render the evidence collection tab (placeholder for now)
  const renderEvidenceTab = () => (
    <div className={styles.evidenceContainer}>
      <div className={styles.comingSoon}>
        <h3>Evidence Collection</h3>
        <p>This feature is not yet implemented.</p>
        <p>Use the Case Files tab to track your investigation.</p>
      </div>
    </div>
  );

  // Render the connections tab (placeholder for now)
  const renderConnectionsTab = () => (
    <div className={styles.connectionsContainer}>
      <div className={styles.comingSoon}>
        <h3>Connection Mapping</h3>
        <p>This feature is not yet implemented.</p>
        <p>Use the Case Files tab to track your investigation.</p>
      </div>
    </div>
  );

  return (
    <div className={styles.evidenceBoardContainer}>
      {/* Main navigation tabs */}
      <div className={styles.mainTabs}>
        <button
          className={`${styles.mainTab} ${
            mainTab === "cases" ? styles.active : ""
          }`}
          onClick={() => setMainTab("cases")}
        >
          <Clipboard size={16} />
          Case Files
        </button>

        <button
          className={`${styles.mainTab} ${
            mainTab === "evidence" ? styles.active : ""
          }`}
          onClick={() => setMainTab("evidence")}
        >
          <FileText size={16} />
          Evidence
        </button>

        <button
          className={`${styles.mainTab} ${
            mainTab === "connections" ? styles.active : ""
          }`}
          onClick={() => setMainTab("connections")}
        >
          <ChevronRight size={16} />
          Connections
        </button>
      </div>

      {/* Content area */}
      <div className={styles.content}>
        {mainTab === "cases" && renderCasesTab()}
        {mainTab === "evidence" && renderEvidenceTab()}
        {mainTab === "connections" && renderConnectionsTab()}
      </div>

      {/* Scanline effect if enabled */}
      {effectsEnabled?.scanlines && <Scanlines opacity={0.1} />}
    </div>
  );
};

export default EvidenceBoard;
