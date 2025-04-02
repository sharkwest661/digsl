// src/components/apps/database/DatabaseApp.jsx
import React, { useState, useEffect } from "react";
import {
  Search,
  Database as DatabaseIcon,
  User,
  FileText,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useDatabaseStore } from "../../../store/databaseStore";
import { Scanlines } from "../../effects/Scanlines";
import DatabaseRecord from "./DatabaseRecord";
import DatabaseActivityLog from "./DatabaseActivityLog";
import DatabaseExport from "./DatabaseExport";
import styles from "./DatabaseApp.module.scss";

const DatabaseApp = () => {
  // Get database state and actions
  const isAuthenticated = useDatabaseStore((state) => state.isAuthenticated);
  const authError = useDatabaseStore((state) => state.authError);
  const login = useDatabaseStore((state) => state.login);
  const searchQuery = useDatabaseStore((state) => state.searchQuery);
  const setSearchQuery = useDatabaseStore((state) => state.setSearchQuery);
  const search = useDatabaseStore((state) => state.search);
  const isSearching = useDatabaseStore((state) => state.isSearching);
  const searchResults = useDatabaseStore((state) => state.searchResults);
  const selectedRecord = useDatabaseStore((state) => state.selectedRecord);
  const selectRecord = useDatabaseStore((state) => state.selectRecord);
  const clearSearch = useDatabaseStore((state) => state.clearSearch);
  const error = useDatabaseStore((state) => state.error);
  const advancedSearch = useDatabaseStore((state) => state.advancedSearch);
  const setAdvancedSearchField = useDatabaseStore(
    (state) => state.setAdvancedSearchField
  );
  const clearAdvancedSearch = useDatabaseStore(
    (state) => state.clearAdvancedSearch
  );

  // Local state
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [showLoginError, setShowLoginError] = useState(false);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Update local search query when global one changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Check authentication status on mount
  useEffect(() => {
    // This effect runs when the component mounts
    // It helps ensure the component uses the current auth state
    // from the Zustand store, which persists between minimizes/maximizes
  }, []);

  // Show error message when auth error happens
  useEffect(() => {
    if (authError) {
      setShowLoginError(true);
      const timer = setTimeout(() => setShowLoginError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [authError]);

  // Handle search input
  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (isAuthenticated) {
      setSearchQuery(localSearchQuery);
      search(null, localSearchQuery);
    }
  };

  // Handle record selection
  const handleRecordSelect = (recordId) => {
    selectRecord(recordId);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setLocalSearchQuery("");
    clearSearch();
  };

  // Toggle advanced search panel
  const handleToggleAdvanced = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  // Handle login attempt
  const handleLogin = (e) => {
    e.preventDefault();

    // Get username and password from form
    const formElements = e.target.elements;
    const username = formElements[0].value;
    const password = formElements[1].value;

    // Use the Zustand store login function
    login(username, password);
  };

  // Handle advanced search field change
  const handleAdvancedFieldChange = (field, value) => {
    setAdvancedSearchField(field, value);
  };

  // Handle clear advanced search
  const handleClearAdvancedSearch = () => {
    clearAdvancedSearch();
    setLocalSearchQuery("");
  };

  // Render database login screen
  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.loginScreen}>
          <div className={styles.loginHeader}>
            <DatabaseIcon size={48} className={styles.databaseIcon} />
            <h1>GOVERNMENT UNIFIED DATABASE</h1>
            <div className={styles.loginVersion}>v1.03.24</div>
          </div>

          <div className={styles.loginBox}>
            <div className={styles.loginTitle}>SYSTEM LOGIN REQUIRED</div>

            <form onSubmit={handleLogin} className={styles.loginForm}>
              <div className={styles.inputGroup}>
                <label>USERNAME</label>
                <input type="text" placeholder="Enter username" />
              </div>

              <div className={styles.inputGroup}>
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter password" />
              </div>

              <div className={styles.loginActions}>
                <button type="submit" className={styles.loginButton}>
                  ACCESS SYSTEM
                </button>
              </div>

              {showLoginError && (
                <div className={styles.loginError}>
                  <AlertTriangle size={16} />
                  <span>ACCESS DENIED. INVALID CREDENTIALS.</span>
                </div>
              )}
            </form>

            <div className={styles.loginHint}>
              <div>Hint: Username = "admin", Password = "admin"</div>
            </div>

            <div className={styles.systemInfo}>
              <div>GOVERNMENT OF AZERBAIJAN</div>
              <div>RESTRICTED ACCESS - AUTHORIZED PERSONNEL ONLY</div>
              <div>©2003 NATIONAL INFORMATION SYSTEMS</div>
            </div>
          </div>

          <Scanlines opacity={0.2} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.appIdentity}>
          <DatabaseIcon size={20} className={styles.appIcon} />
          <h1>GOVERNMENT DATABASE</h1>
        </div>

        <div className={styles.searchContainer}>
          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search database..."
              value={localSearchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className={styles.searchButton}>
              <Search size={18} />
            </button>
          </form>

          <button
            className={styles.advancedButton}
            onClick={handleToggleAdvanced}
          >
            {showAdvancedSearch ? "Hide Advanced" : "Advanced Search"}
          </button>

          {localSearchQuery && (
            <button className={styles.clearButton} onClick={handleClearSearch}>
              Clear
            </button>
          )}

          <button
            className={styles.activityButton}
            onClick={() => setShowActivityLog(true)}
            title="View Activity Log"
          >
            <Clock size={16} />
          </button>
        </div>
      </div>

      {showAdvancedSearch && (
        <div className={styles.advancedSearch}>
          <div className={styles.advancedHeader}>Advanced Search Options</div>
          <form className={styles.advancedFields}>
            <div className={styles.fieldGroup}>
              <label>Name</label>
              <input
                type="text"
                placeholder="Full or partial name"
                value={advancedSearch.name}
                onChange={(e) =>
                  handleAdvancedFieldChange("name", e.target.value)
                }
              />
            </div>

            <div className={styles.fieldGroup}>
              <label>Status</label>
              <select
                value={advancedSearch.status}
                onChange={(e) =>
                  handleAdvancedFieldChange("status", e.target.value)
                }
              >
                <option value="">Any Status</option>
                <option value="active">Active</option>
                <option value="missing">Missing</option>
                <option value="deceased">Deceased</option>
                <option value="person of interest">Person of Interest</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label>ID Number</label>
              <input
                type="text"
                placeholder="National ID"
                value={advancedSearch.nationalId}
                onChange={(e) =>
                  handleAdvancedFieldChange("nationalId", e.target.value)
                }
              />
            </div>

            <div className={styles.fieldGroup}>
              <label>Occupation</label>
              <input
                type="text"
                placeholder="Full or partial occupation"
                value={advancedSearch.occupation}
                onChange={(e) =>
                  handleAdvancedFieldChange("occupation", e.target.value)
                }
              />
            </div>

            <div className={styles.fieldGroup}>
              <label>Date Range</label>
              <div className={styles.dateRange}>
                <input
                  type="text"
                  placeholder="From (MM/DD/YYYY)"
                  value={advancedSearch.dateFrom}
                  onChange={(e) =>
                    handleAdvancedFieldChange("dateFrom", e.target.value)
                  }
                />
                <span>to</span>
                <input
                  type="text"
                  placeholder="To (MM/DD/YYYY)"
                  value={advancedSearch.dateTo}
                  onChange={(e) =>
                    handleAdvancedFieldChange("dateTo", e.target.value)
                  }
                />
              </div>
            </div>

            <div className={styles.advancedActions}>
              <button
                type="button"
                className={styles.applyButton}
                onClick={handleSearchSubmit}
              >
                Apply Filters
              </button>
              <button
                type="button"
                className={styles.clearFiltersButton}
                onClick={handleClearAdvancedSearch}
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.contentContainer}>
        {isSearching ? (
          <div className={styles.searchingIndicator}>
            <div className={styles.searchingSpinner}></div>
            <div>Searching database...</div>
          </div>
        ) : (
          <>
            {error ? (
              <div className={styles.errorMessage}>
                <AlertTriangle size={24} />
                <span>{error}</span>
              </div>
            ) : (
              <div className={styles.resultsContainer}>
                {searchResults.length > 0 ? (
                  <>
                    <div className={styles.resultsList}>
                      <div className={styles.resultsHeader}>
                        <div className={styles.resultsCount}>
                          {searchResults.length} records found
                          {searchQuery && ` for "${searchQuery}"`}
                        </div>
                      </div>

                      <div className={styles.recordsList}>
                        {searchResults.map((record) => (
                          <div
                            key={record.id}
                            className={`${styles.recordItem} ${
                              selectedRecord?.id === record.id
                                ? styles.selected
                                : ""
                            }`}
                            onClick={() => handleRecordSelect(record.id)}
                          >
                            <div className={styles.recordName}>
                              {record.name}
                            </div>
                            <div className={styles.recordMeta}>
                              <div className={styles.recordId}>{record.id}</div>
                              <div className={styles.recordStatus}>
                                <span
                                  className={`${styles.statusIndicator} ${
                                    styles[
                                      record.status
                                        .toLowerCase()
                                        .replace(" ", "")
                                    ]
                                  }`}
                                ></span>
                                {record.status}
                              </div>
                            </div>
                            <div className={styles.recordSummary}>
                              {record.occupation}, {record.employer}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedRecord && (
                      <DatabaseRecord record={selectedRecord} />
                    )}
                  </>
                ) : (
                  <div className={styles.noResults}>
                    <DatabaseIcon size={48} className={styles.noResultsIcon} />
                    <h3>No Records Found</h3>
                    <p>Enter a search term to find records in the database.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          GOVERNMENT OF AZERBAIJAN - UNIFIED DATABASE
        </div>
        <div className={styles.footerRight}>
          v1.03.24 - AUTHORIZED ACCESS ONLY
        </div>
      </div>

      {/* Activity Log Modal */}
      {showActivityLog && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <DatabaseActivityLog onClose={() => setShowActivityLog(false)} />
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && selectedRecord && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <DatabaseExport
              record={selectedRecord}
              onClose={() => setShowExportModal(false)}
            />
          </div>
        </div>
      )}

      <Scanlines opacity={0.15} />
    </div>
  );
};

export default DatabaseApp;
