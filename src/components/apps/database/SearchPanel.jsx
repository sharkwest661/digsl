// components/apps/database/SearchPanel.jsx
import React from "react";
import {
  Search,
  Database,
  ShieldAlert,
  FileText,
  RefreshCw,
} from "lucide-react";
import { useDatabaseStore, DATABASE_TYPES } from "../../../store/databaseStore";
import styles from "./SearchPanel.module.scss";

const SearchPanel = ({
  onSearch,
  onDatabaseChange,
  onQueryChange,
  selectedDatabase,
  searchQuery,
  isSearching,
}) => {
  // Format database name
  const formatDatabaseName = (dbType) => {
    switch (dbType) {
      case DATABASE_TYPES.POLICE:
        return "Police Records";
      case DATABASE_TYPES.MEDICAL:
        return "Medical Records";
      case DATABASE_TYPES.IMMIGRATION:
        return "Immigration Records";
      case DATABASE_TYPES.FINANCIAL:
        return "Financial Records";
      case DATABASE_TYPES.EMPLOYMENT:
        return "Employment Records";
      case DATABASE_TYPES.CRIMINAL:
        return "Criminal Records";
      default:
        return dbType.charAt(0).toUpperCase() + dbType.slice(1);
    }
  };

  // Get database icon
  const getDatabaseIcon = (dbType) => {
    switch (dbType) {
      case DATABASE_TYPES.POLICE:
      case DATABASE_TYPES.CRIMINAL:
        return <ShieldAlert size={16} />;
      case DATABASE_TYPES.EMPLOYMENT:
      case DATABASE_TYPES.MEDICAL:
        return <FileText size={16} />;
      default:
        return <Database size={16} />;
    }
  };

  // Handle database selection
  const handleDatabaseChange = (e) => {
    onDatabaseChange(e.target.value);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    onQueryChange(e.target.value);
  };

  return (
    <div className={styles.searchPanel}>
      <div className={styles.searchPanelHeader}>
        <Database size={16} />
        <span>DATABASE SEARCH</span>
      </div>

      <form onSubmit={onSearch} className={styles.searchForm}>
        <div className={styles.formGroup}>
          <label className={styles.label}>SELECT DATABASE</label>
          <div className={styles.selectWrapper}>
            <select
              value={selectedDatabase || ""}
              onChange={handleDatabaseChange}
              className={styles.databaseSelect}
            >
              <option value="">SELECT DATABASE</option>
              {Object.values(DATABASE_TYPES).map((dbType) => (
                <option key={dbType} value={dbType}>
                  {formatDatabaseName(dbType)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>SEARCH QUERY</label>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Enter search terms..."
              className={styles.searchInput}
              disabled={!selectedDatabase}
            />
            <button
              type="submit"
              className={styles.searchButton}
              disabled={!selectedDatabase || isSearching}
            >
              {isSearching ? (
                <RefreshCw size={16} className={styles.spinner} />
              ) : (
                <Search size={16} />
              )}
            </button>
          </div>
          <div className={styles.helpText}>
            Search by name, ID, or any identifying information
          </div>
        </div>

        {selectedDatabase && (
          <div className={styles.selectedDatabase}>
            <div className={styles.databaseDetails}>
              <div className={styles.databaseIcon}>
                {getDatabaseIcon(selectedDatabase)}
              </div>
              <div className={styles.databaseInfo}>
                <div className={styles.databaseName}>
                  {formatDatabaseName(selectedDatabase)}
                </div>
                <div className={styles.databaseStatus}>
                  <div className={styles.statusDot}></div>
                  <span>CONNECTED</span>
                </div>
              </div>
            </div>

            <div className={styles.databaseDescription}>
              {getDbDescription(selectedDatabase)}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

// Helper function to get database descriptions
const getDbDescription = (dbType) => {
  switch (dbType) {
    case DATABASE_TYPES.POLICE:
      return "Official police records including case files, reports, and missing persons.";
    case DATABASE_TYPES.MEDICAL:
      return "Patient records, medical history, and treatment information from Central Healthcare System.";
    case DATABASE_TYPES.IMMIGRATION:
      return "Travel history, passport data, and border crossing information.";
    case DATABASE_TYPES.FINANCIAL:
      return "Banking records, transactions, and financial history from Central Bank of Azerbaijan.";
    case DATABASE_TYPES.EMPLOYMENT:
      return "Employment history, job records, and professional credentials.";
    case DATABASE_TYPES.CRIMINAL:
      return "Criminal records, watchlists, and law enforcement alerts.";
    default:
      return "Select a database to begin your search.";
  }
};

export default SearchPanel;
