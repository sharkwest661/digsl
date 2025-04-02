// src/store/databaseStore.js
import { create } from "zustand";
import { DB_RECORDS } from "../data/databaseRecords";
import { DATABASE_TYPES } from "../data/databaseRecords";
import { DATABASE_MESSAGES } from "../constants/databaseConstants";

// Create store
const useDatabaseStore = create((set, get) => ({
  // Authentication state
  isAuthenticated: false,
  authUser: null,
  authLevel: "guest",
  loginAttempts: 0,
  authError: null,
  sessionStartTime: null,

  // Current state
  selectedDatabase: DATABASE_TYPES.GOVERNMENT,
  searchQuery: "",
  searchResults: [],
  selectedRecord: null,
  isSearching: false,
  error: null,

  // Advanced search state
  advancedSearch: {
    name: "",
    status: "",
    nationalId: "",
    dateFrom: "",
    dateTo: "",
    location: "",
    occupation: "",
  },

  // Export state
  exportFormat: "detailed",
  exportIncludeSensitive: false,
  exportHistory: [],

  // Activity logging
  activityLog: [],
  showActivityLog: false,

  // Evidence collection
  collectedEvidence: [],

  // Available databases and records
  databases: Object.values(DATABASE_TYPES),
  allRecords: DB_RECORDS,

  // Authentication functions
  login: (username, password) => {
    // Only allow login with correct credentials
    if (username === "admin" && password === "admin") {
      set({
        isAuthenticated: true,
        authUser: username,
        authLevel: "administrator",
        authError: null,
        sessionStartTime: new Date(),
        loginAttempts: 0,
      });

      // Log the successful login
      get().addActivityLog({
        type: "auth",
        action: "login",
        details: `User ${username} logged in`,
        timestamp: new Date(),
      });

      return true;
    } else {
      set({
        authError: DATABASE_MESSAGES.ACCESS_DENIED,
        loginAttempts: get().loginAttempts + 1,
      });

      // Log the failed attempt
      get().addActivityLog({
        type: "auth",
        action: "login_failed",
        details: `Failed login attempt`,
        timestamp: new Date(),
      });

      return false;
    }
  },

  logout: () => {
    // Log the logout
    if (get().isAuthenticated) {
      get().addActivityLog({
        type: "auth",
        action: "logout",
        details: `User ${get().authUser} logged out`,
        timestamp: new Date(),
      });
    }

    set({
      isAuthenticated: false,
      authUser: null,
      authLevel: "guest",
      sessionStartTime: null,
    });
  },

  // Set the active database
  selectDatabase: (database) => {
    set({
      selectedDatabase: database,
      searchResults: [],
      selectedRecord: null,
    });

    // Log database selection
    get().addActivityLog({
      type: "system",
      action: "select_database",
      details: `Selected database: ${database}`,
      timestamp: new Date(),
    });
  },

  // Update search query
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  // Update advanced search fields
  setAdvancedSearchField: (field, value) => {
    set((state) => ({
      advancedSearch: {
        ...state.advancedSearch,
        [field]: value,
      },
    }));
  },

  // Clear advanced search fields
  clearAdvancedSearch: () => {
    set({
      advancedSearch: {
        name: "",
        status: "",
        nationalId: "",
        dateFrom: "",
        dateTo: "",
        location: "",
        occupation: "",
      },
    });
  },

  // Perform a search
  search: (database = null, query = null) => {
    const activeDatabase = database || get().selectedDatabase;
    const activeQuery = query !== null ? query : get().searchQuery;

    if (!get().isAuthenticated) {
      set({ error: DATABASE_MESSAGES.UNAUTHORIZED });
      return;
    }

    if (!activeDatabase) {
      set({ error: "Please select a database to search" });
      return;
    }

    set({ isSearching: true, error: null });

    // Log the search
    get().addActivityLog({
      type: "search",
      action: "execute_search",
      details: `Search query: "${activeQuery}" in ${activeDatabase}`,
      timestamp: new Date(),
    });

    // Simulate network delay for realism - early 2000s databases were slow!
    setTimeout(() => {
      try {
        const dbRecords = get().allRecords[activeDatabase] || [];
        const advancedSearchParams = get().advancedSearch;
        const hasAdvancedParams = Object.values(advancedSearchParams).some(
          (val) => val && val.trim() !== ""
        );

        // If no query and no advanced params, return all records for the database
        if (!activeQuery.trim() && !hasAdvancedParams) {
          set({
            searchResults: dbRecords,
            isSearching: false,
          });
          return;
        }

        // Helper function to recursively search object values
        const searchInObject = (obj, query) => {
          if (!obj || typeof obj !== "object") return false;

          return Object.values(obj).some((value) => {
            // If value is string, check if it contains the query
            if (typeof value === "string") {
              return value.toLowerCase().includes(query);
            }

            // If value is array, check each element
            if (Array.isArray(value)) {
              return value.some((item) => {
                if (typeof item === "string") {
                  return item.toLowerCase().includes(query);
                }
                return searchInObject(item, query);
              });
            }

            // If value is object, search recursively
            if (typeof value === "object" && value !== null) {
              return searchInObject(value, query);
            }

            return false;
          });
        };

        // Filter records based on the query and advanced search params
        const filteredRecords = dbRecords.filter((record) => {
          // Basic search query check
          const normalizedQuery = activeQuery.toLowerCase();
          const matchesBasicSearch =
            !activeQuery.trim() ||
            Object.entries(record)
              .filter(
                ([key]) => key !== "details" && typeof record[key] === "string"
              )
              .some(([_, val]) =>
                val.toLowerCase().includes(normalizedQuery)
              ) ||
            (record.details && searchInObject(record.details, normalizedQuery));

          // Advanced search parameters check
          const matchesAdvanced =
            !hasAdvancedParams ||
            ((!advancedSearchParams.name ||
              record.name
                .toLowerCase()
                .includes(advancedSearchParams.name.toLowerCase())) &&
              (!advancedSearchParams.status ||
                record.status.toLowerCase() ===
                  advancedSearchParams.status.toLowerCase()) &&
              (!advancedSearchParams.nationalId ||
                record.nationalID.includes(advancedSearchParams.nationalId)) &&
              (!advancedSearchParams.occupation ||
                record.occupation
                  .toLowerCase()
                  .includes(advancedSearchParams.occupation.toLowerCase())));
          // Additional fields could be checked here

          return matchesBasicSearch && matchesAdvanced;
        });

        set({
          searchResults: filteredRecords,
          isSearching: false,
          error:
            filteredRecords.length === 0
              ? DATABASE_MESSAGES.SEARCH_NO_RESULTS
              : null,
        });

        // Log search results
        get().addActivityLog({
          type: "search",
          action: "search_results",
          details: `Found ${filteredRecords.length} records`,
          timestamp: new Date(),
        });
      } catch (error) {
        set({
          error: `Search error: ${error.message}`,
          isSearching: false,
        });

        // Log error
        get().addActivityLog({
          type: "error",
          action: "search_error",
          details: error.message,
          timestamp: new Date(),
        });
      }
    }, 1500); // Longer simulated delay for 2003-era database
  },

  // Select a specific record for detailed view
  selectRecord: (recordId) => {
    const { searchResults } = get();
    const record = searchResults.find((r) => r.id === recordId);

    set({ selectedRecord: record });

    if (record) {
      // Log record selection
      get().addActivityLog({
        type: "data",
        action: "view_record",
        details: `Viewed record: ${record.id} (${record.name})`,
        timestamp: new Date(),
      });
    }
  },

  // Clear the current search
  clearSearch: () => {
    set({
      searchQuery: "",
      searchResults: [],
      selectedRecord: null,
      error: null,
    });

    // Log clear search
    get().addActivityLog({
      type: "search",
      action: "clear_search",
      details: "Search cleared",
      timestamp: new Date(),
    });
  },

  // Add record to evidence collection
  addToEvidence: (recordId, notes = "") => {
    const { searchResults, collectedEvidence } = get();
    const record = searchResults.find((r) => r.id === recordId);

    if (record && !collectedEvidence.some((e) => e.id === recordId)) {
      const evidenceItem = {
        id: recordId,
        name: record.name,
        source: "Government Database",
        dateCollected: new Date(),
        notes: notes,
        recordData: record,
      };

      set((state) => ({
        collectedEvidence: [...state.collectedEvidence, evidenceItem],
      }));

      // Log evidence collection
      get().addActivityLog({
        type: "evidence",
        action: "add_evidence",
        details: `Added record to evidence: ${record.id} (${record.name})`,
        timestamp: new Date(),
      });

      return true;
    }

    return false;
  },

  // Export record functionality
  exportRecord: (recordId, format = "detailed", includeSensitive = false) => {
    const { searchResults } = get();
    const record =
      searchResults.find((r) => r.id === recordId) || get().selectedRecord;

    if (!record) return false;

    // Check if export is allowed (for demo purposes)
    if (
      includeSensitive &&
      record.status !== "Missing" &&
      get().authLevel !== "administrator"
    ) {
      // Log export restriction
      get().addActivityLog({
        type: "security",
        action: "export_restricted",
        details: `Export with sensitive data attempted for record: ${record.id}`,
        timestamp: new Date(),
      });

      return {
        success: false,
        error: DATABASE_MESSAGES.EXPORT_RESTRICTED,
      };
    }

    // Add to export history
    const exportEntry = {
      recordId: record.id,
      recordName: record.name,
      format: format,
      timestamp: new Date(),
      exportedBy: get().authUser,
    };

    set((state) => ({
      exportHistory: [...state.exportHistory, exportEntry],
    }));

    // Log export
    get().addActivityLog({
      type: "data",
      action: "export_record",
      details: `Exported record: ${record.id} (${format} format)`,
      timestamp: new Date(),
    });

    return {
      success: true,
      data: record,
      format: format,
      exportTime: new Date(),
    };
  },

  // Add entry to activity log
  addActivityLog: (entry) => {
    set((state) => ({
      activityLog: [...state.activityLog, entry],
    }));
  },

  // Toggle activity log visibility
  toggleActivityLog: () => {
    set((state) => ({
      showActivityLog: !state.showActivityLog,
    }));
  },

  // Get formatted session time
  getFormattedSessionTime: () => {
    const { sessionStartTime } = get();
    if (!sessionStartTime) return "00:00:00";

    const diff = new Date() - sessionStartTime;
    const hours = Math.floor(diff / 3600000)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((diff % 3600000) / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((diff % 60000) / 1000)
      .toString()
      .padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  },

  // Reset everything
  reset: () => {
    set({
      isAuthenticated: false,
      authUser: null,
      authLevel: "guest",
      loginAttempts: 0,
      authError: null,
      sessionStartTime: null,
      selectedDatabase: DATABASE_TYPES.GOVERNMENT,
      searchQuery: "",
      searchResults: [],
      selectedRecord: null,
      isSearching: false,
      error: null,
      advancedSearch: {
        name: "",
        status: "",
        nationalId: "",
        dateFrom: "",
        dateTo: "",
        location: "",
        occupation: "",
      },
      exportFormat: "detailed",
      exportIncludeSensitive: false,
    });
  },
}));

export { useDatabaseStore };
