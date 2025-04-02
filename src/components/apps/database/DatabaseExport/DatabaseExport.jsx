// src/components/apps/database/DatabaseExport/DatabaseExport.jsx
import React, { useState } from "react";
import { Printer, FileText, Download, Copy, AlertTriangle } from "lucide-react";
import {
  DATABASE_MESSAGES,
  REPORT_TYPES,
} from "../../../../constants/databaseConstants";
import styles from "./DatabaseExport.module.scss";

const DatabaseExport = ({ record, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState("detailed");
  const [includeSensitive, setIncludeSensitive] = useState(false);
  const [includeAttachments, setIncludeAttachments] = useState(false);
  const [exportError, setExportError] = useState(null);
  const [exportSuccess, setExportSuccess] = useState(false);

  if (!record) {
    return null;
  }

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  const handleSensitiveChange = (e) => {
    setIncludeSensitive(e.target.checked);
  };

  const handleAttachmentsChange = (e) => {
    setIncludeAttachments(e.target.checked);
  };

  const handleExport = (type) => {
    // Simulate export success/failure
    if (includeSensitive && !record.status.includes("Missing")) {
      setExportError(DATABASE_MESSAGES.EXPORT_RESTRICTED);
      setExportSuccess(false);

      // Clear error after 3 seconds
      setTimeout(() => {
        setExportError(null);
      }, 3000);
      return;
    }

    // Simulate successful export
    setExportSuccess(true);
    setExportError(null);

    // Reset success message after 3 seconds
    setTimeout(() => {
      setExportSuccess(false);
    }, 3000);
  };

  return (
    <div className={styles.exportContainer}>
      <div className={styles.exportHeader}>
        <h2>Export Record: {record.id}</h2>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>

      <div className={styles.exportBody}>
        <div className={styles.recordInfo}>
          <div className={styles.recordName}>{record.name}</div>
          <div className={styles.recordStatus}>
            <span
              className={`${styles.statusIndicator} ${
                styles[record.status.toLowerCase().replace(" ", "")]
              }`}
            ></span>
            {record.status}
          </div>
        </div>

        <div className={styles.exportOptions}>
          <div className={styles.optionGroup}>
            <label className={styles.optionLabel}>Report Format</label>
            <select
              className={styles.formatSelect}
              value={selectedFormat}
              onChange={handleFormatChange}
            >
              <option value="preliminary">Preliminary Report</option>
              <option value="detailed">Detailed Report</option>
              <option value="summary">Summary Report</option>
              <option value="timeline">Timeline Report</option>
            </select>
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeSensitive}
                onChange={handleSensitiveChange}
              />
              Include sensitive information
            </label>
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeAttachments}
                onChange={handleAttachmentsChange}
              />
              Include attachments
            </label>
          </div>
        </div>

        {exportError && (
          <div className={styles.exportError}>
            <AlertTriangle size={16} />
            <span>{exportError}</span>
          </div>
        )}

        {exportSuccess && (
          <div className={styles.exportSuccess}>
            <span>Export successful</span>
          </div>
        )}

        <div className={styles.exportActions}>
          <button
            className={styles.exportButton}
            onClick={() => handleExport("print")}
          >
            <Printer size={16} />
            Print
          </button>
          <button
            className={styles.exportButton}
            onClick={() => handleExport("pdf")}
          >
            <FileText size={16} />
            Export PDF
          </button>
          <button
            className={styles.exportButton}
            onClick={() => handleExport("download")}
          >
            <Download size={16} />
            Download
          </button>
          <button
            className={styles.exportButton}
            onClick={() => handleExport("copy")}
          >
            <Copy size={16} />
            Copy to Evidence
          </button>
        </div>
      </div>

      <div className={styles.exportFooter}>
        <div className={styles.footerText}>
          CONFIDENTIAL - Authorized Access Only
        </div>
        <div className={styles.footerInfo}>
          Government Database System v1.03.24
        </div>
      </div>
    </div>
  );
};

export default DatabaseExport;
