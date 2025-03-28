// components/apps/database/DatabaseSearch.jsx
import React, { useState, useEffect } from "react";
import { useDatabaseStore } from "../../../store/databaseStore";
import { useThemeStore } from "../../../store";
import { Scanlines } from "../../effects/Scanlines";
import {
  Terminal,
  ShieldAlert,
  Database,
  Search,
  FileText,
  UserSearch,
  AlertCircle,
} from "lucide-react";
import SearchPanel from "./SearchPanel";
import ResultsList from "./ResultsList";
import DetailView from "./DetailView";
import AccessDeniedPanel from "./AccessDeniedPanel";
import styles from "./DatabaseSearch.module.scss";

const DatabaseSearch = () => {
  // Get global theme config
  const themeConfig = useThemeStore((state) => state.themeConfig);
  const effectsEnabled = useThemeStore((state) => state.effectsEnabled);

  // Get database state
  const selectedDatabase = useDatabaseStore((state) => state.selectedDatabase);
  const searchQuery = useDatabaseStore((state) => state.searchQuery);
  const searchResults = useDatabaseStore((state) => state.searchResults);
  const selectedRecord = useDatabaseStore((state) => state.selectedRecord);
  const isSearching = useDatabaseStore((state) => state.isSearching);
  const error = useDatabaseStore((state) => state.error);

  // Database actions
  const search = useDatabaseStore((state) => state.search);
  const selectDatabase = useDatabaseStore((state) => state.selectDatabase);
  const setSearchQuery = useDatabaseStore((state) => state.setSearchQuery);
  const selectRecord = useDatabaseStore((state) => state.selectRecord);
  const clearSearch = useDatabaseStore((state) => state.clearSearch);

  // Local state for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [accessCode, setAccessCode] = useState("");
  const [showAccessPanel, setShowAccessPanel] = useState(true);

  // Reset database store on unmount
  useEffect(() => {
    return () => {
      useDatabaseStore.getState().reset();
    };
  }, []);

  // Handle authentication
  const handleAuthenticate = (e) => {
    e.preventDefault();
    // Simple authentication - in a real game, this would be more complex
    if (
      accessCode === "SLEUTH" ||
      accessCode === "sleuth" ||
      accessCode === "4851"
    ) {
      setIsAuthenticated(true);
      setShowAccessPanel(false);
      setAuthError(null);
    } else {
      setAuthError("Invalid access code. Please try again.");
    }
  };

  // Handle access code change
  const handleAccessCodeChange = (e) => {
    setAccessCode(e.target.value);
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    search();
  };

  // Get the database icon
  const getDatabaseIcon = () => {
    switch (selectedDatabase) {
      case "police":
        return <ShieldAlert size={18} />;
      case "medical":
        return <AlertCircle size={18} />;
      case "immigration":
        return <UserSearch size={18} />;
      case "financial":
        return <Database size={18} />;
      case "employment":
        return <FileText size={18} />;
      case "criminal":
        return <ShieldAlert size={18} />;
      default:
        return <Database size={18} />;
    }
  };

  // Format database name for display
  const formatDatabaseName = (dbName) => {
    if (!dbName) return "";
    return dbName.charAt(0).toUpperCase() + dbName.slice(1) + " Database";
  };

  return (
    <div className={styles.container}>
      {/* Always show the header */}
      <div className={styles.header}>
        <div className={styles.connectionStatus}>
          <div className={styles.statusIndicator}></div>
          <span>SECURE CONNECTION</span>
        </div>
        <div className={styles.headerTitle}>
          <Terminal size={20} />
          <h1>AZERBAIJAN CENTRAL DATABASE SYSTEM</h1>
        </div>
        <div className={styles.accessLevel}>
          <span>ACCESS LEVEL:</span>
          <span className={styles.levelIndicator}>
            {isAuthenticated ? "INVESTIGATOR" : "RESTRICTED"}
          </span>
        </div>
      </div>

      {/* Show access panel if not authenticated */}
      {showAccessPanel && !isAuthenticated && (
        <AccessDeniedPanel
          onAuthenticate={handleAuthenticate}
          onAccessCodeChange={handleAccessCodeChange}
          accessCode={accessCode}
          error={authError}
        />
      )}

      {/* Show main database UI if authenticated */}
      {isAuthenticated && (
        <div className={styles.mainContent}>
          {/* Left panel - search controls */}
          <div className={styles.leftPanel}>
            <SearchPanel
              onSearch={handleSearch}
              onDatabaseChange={selectDatabase}
              onQueryChange={setSearchQuery}
              selectedDatabase={selectedDatabase}
              searchQuery={searchQuery}
              isSearching={isSearching}
            />

            {selectedDatabase && searchResults.length > 0 && (
              <ResultsList
                results={searchResults}
                onSelectRecord={selectRecord}
                selectedRecordId={selectedRecord?.id}
                isLoading={isSearching}
              />
            )}

            {error && (
              <div className={styles.errorMessage}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Right panel - record details */}
          {selectedRecord ? (
            <div className={styles.rightPanel}>
              <DetailView
                record={selectedRecord}
                databaseType={selectedDatabase}
              />
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.databaseIcon}>
                {selectedDatabase ? getDatabaseIcon() : <Database size={48} />}
              </div>
              <h2>
                {selectedDatabase
                  ? formatDatabaseName(selectedDatabase)
                  : "Select Database"}
              </h2>
              <p>
                {selectedDatabase
                  ? "Select a search result to view details"
                  : "Choose a database system and enter search terms to begin"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Scanline effect */}
      {effectsEnabled?.scanlines && <Scanlines opacity={0.15} />}
    </div>
  );
};

export default DatabaseSearch;
