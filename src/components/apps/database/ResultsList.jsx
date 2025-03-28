// components/apps/database/ResultsList.jsx
import React from "react";
import { File, User, RefreshCw, ChevronRight } from "lucide-react";
import styles from "./ResultsList.module.scss";

const ResultsList = ({
  results,
  onSelectRecord,
  selectedRecordId,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <RefreshCw size={24} className={styles.spinner} />
        <div className={styles.loadingText}>Searching database...</div>
      </div>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsHeader}>
        <div className={styles.resultsCount}>
          {results.length} {results.length === 1 ? "RECORD" : "RECORDS"} FOUND
        </div>
      </div>

      <div className={styles.resultsList}>
        {results.map((record) => (
          <div
            key={record.id}
            className={`${styles.resultItem} ${
              record.id === selectedRecordId ? styles.selected : ""
            }`}
            onClick={() => onSelectRecord(record.id)}
          >
            <div className={styles.resultIcon}>
              {record.name ? <User size={16} /> : <File size={16} />}
            </div>

            <div className={styles.resultInfo}>
              <div className={styles.resultTitle}>
                {record.name ||
                  record.patientName ||
                  record.fullName ||
                  record.id}
              </div>
              <div className={styles.resultMeta}>
                {getRecordMetaInfo(record)}
              </div>
            </div>

            <ChevronRight size={16} className={styles.viewIcon} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to extract relevant metadata based on record type
const getRecordMetaInfo = (record) => {
  if (record.caseNumbers) {
    return `Case: ${record.caseNumbers[0]}`;
  } else if (record.patientID) {
    return `Patient ID: ${record.patientID}`;
  } else if (record.passportNumber) {
    return `Passport: ${record.passportNumber}`;
  } else if (record.accountNumbers) {
    return `Account: ${record.accountNumbers[0]}`;
  } else if (record.position) {
    return record.position;
  } else if (record.criminalStatus) {
    return record.criminalStatus;
  } else {
    return `ID: ${record.id}`;
  }
};

export default ResultsList;
