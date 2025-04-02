// src/components/apps/database/DatabaseActivityLog/DatabaseActivityLog.jsx
import React, { useState } from "react";
import {
  X,
  Download,
  Filter,
  RefreshCw,
  AlertTriangle,
  User,
  Search,
  Database,
  FileText,
  Shield,
} from "lucide-react";
import { useDatabaseStore } from "../../../../store/databaseStore";
import {
  ACTIVITY_LOG_TYPES,
  DATABASE_UI,
} from "../../../../constants/databaseConstants";
import styles from "./DatabaseActivityLog.module.scss";

const DatabaseActivityLog = ({ onClose }) => {
  const activityLog = useDatabaseStore((state) => state.activityLog);
  const [filterType, setFilterType] = useState("all");

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";

    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case ACTIVITY_LOG_TYPES.AUTH:
        return <User size={14} />;
      case ACTIVITY_LOG_TYPES.SEARCH:
        return <Search size={14} />;
      case ACTIVITY_LOG_TYPES.DATA:
        return <Database size={14} />;
      case ACTIVITY_LOG_TYPES.EVIDENCE:
        return <FileText size={14} />;
      case ACTIVITY_LOG_TYPES.EXPORT:
        return <Download size={14} />;
      case ACTIVITY_LOG_TYPES.SYSTEM:
        return <RefreshCw size={14} />;
      case ACTIVITY_LOG_TYPES.ERROR:
      case ACTIVITY_LOG_TYPES.SECURITY:
        return <AlertTriangle size={14} />;
      default:
        return <Database size={14} />;
    }
  };

  const getTypeColor = (type) => {
    return DATABASE_UI.LOG_COLORS[type.toUpperCase()] || "#95a5a6";
  };

  const filteredLogs =
    filterType === "all"
      ? activityLog
      : activityLog.filter((log) => log.type === filterType);

  return (
    <div className={styles.activityLogContainer}>
      <div className={styles.activityLogHeader}>
        <div className={styles.headerTitle}>
          <Shield size={16} />
          <h2>System Activity Log</h2>
        </div>
        <div className={styles.headerControls}>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      </div>

      <div className={styles.activityLogFilters}>
        <div className={styles.filterLabel}>
          <Filter size={14} />
          <span>Filter:</span>
        </div>
        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterButton} ${
              filterType === "all" ? styles.active : ""
            }`}
            onClick={() => setFilterType("all")}
          >
            All
          </button>
          <button
            className={`${styles.filterButton} ${
              filterType === "auth" ? styles.active : ""
            }`}
            onClick={() => setFilterType("auth")}
          >
            Auth
          </button>
          <button
            className={`${styles.filterButton} ${
              filterType === "search" ? styles.active : ""
            }`}
            onClick={() => setFilterType("search")}
          >
            Search
          </button>
          <button
            className={`${styles.filterButton} ${
              filterType === "data" ? styles.active : ""
            }`}
            onClick={() => setFilterType("data")}
          >
            Data
          </button>
          <button
            className={`${styles.filterButton} ${
              filterType === "evidence" ? styles.active : ""
            }`}
            onClick={() => setFilterType("evidence")}
          >
            Evidence
          </button>
          <button
            className={`${styles.filterButton} ${
              filterType === "error" ? styles.active : ""
            }`}
            onClick={() => setFilterType("error")}
          >
            Errors
          </button>
        </div>
      </div>

      <div className={styles.activityLogContent}>
        {filteredLogs.length > 0 ? (
          <div className={styles.logEntries}>
            {filteredLogs
              .map((log, index) => (
                <div key={index} className={styles.logEntry}>
                  <div
                    className={styles.logType}
                    style={{ backgroundColor: getTypeColor(log.type) }}
                  >
                    {getTypeIcon(log.type)}
                  </div>
                  <div className={styles.logTime}>
                    {formatTimestamp(log.timestamp)}
                  </div>
                  <div className={styles.logAction}>{log.action}</div>
                  <div className={styles.logDetails}>{log.details}</div>
                </div>
              ))
              .reverse()}
          </div>
        ) : (
          <div className={styles.noLogs}>
            <p>No activity logs to display.</p>
          </div>
        )}
      </div>

      <div className={styles.activityLogFooter}>
        <div className={styles.footerInfo}>
          Total entries: {filteredLogs.length}{" "}
          {filterType !== "all" ? `(filtered by: ${filterType})` : ""}
        </div>
        <div className={styles.footerControls}>
          <button className={styles.footerButton}>
            <Download size={14} />
            <span>Export Log</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatabaseActivityLog;
