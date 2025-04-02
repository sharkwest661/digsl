// store/databaseStore.js
import { create } from "zustand";
import { DB_RECORDS } from "../data/databaseRecords";
import { DATABASE_TYPES } from "../constants/app";

// Create store
const useDatabaseStore = create((set, get) => ({
  // Current state
  selectedDatabase: null,
  searchQuery: "",
  searchResults: [],
  selectedRecord: null,
  isSearching: false,
  error: null,

  // Available databases and records
  databases: Object.values(DATABASE_TYPES),
  allRecords: DB_RECORDS,

  // Set the active database
  selectDatabase: (database) => {
    set({
      selectedDatabase: database,
      searchResults: [],
      selectedRecord: null,
    });
  },

  // Update search query
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  // Perform a search
  search: (database = null, query = null) => {
    const activeDatabase = database || get().selectedDatabase;
    const activeQuery = query !== null ? query : get().searchQuery;

    if (!activeDatabase) {
      set({ error: "Please select a database to search" });
      return;
    }

    set({ isSearching: true, error: null });

    // Simulate network delay for realism
    setTimeout(() => {
      try {
        const dbRecords = get().allRecords[activeDatabase] || [];

        // If no query, return all records for the database
        if (!activeQuery.trim()) {
          set({
            searchResults: dbRecords,
            isSearching: false,
          });
          return;
        }

        // Normalize query for case-insensitive search
        const normalizedQuery = activeQuery.toLowerCase();

        // Filter records that match the query in any field
        const results = dbRecords.filter((record) => {
          // Check basic fields first
          const basicMatch = Object.values(record)
            .filter((val) => typeof val === "string")
            .some((val) => val.toLowerCase().includes(normalizedQuery));

          if (basicMatch) return true;

          // Check nested details if available
          if (record.details) {
            return Object.values(record.details)
              .flatMap((val) => {
                if (Array.isArray(val)) {
                  // Handle arrays of strings or objects
                  return val.flatMap((v) => {
                    if (typeof v === "string") return v;
                    if (typeof v === "object") return Object.values(v);
                    return [];
                  });
                }
                return [val];
              })
              .filter((val) => typeof val === "string")
              .some((val) => val.toLowerCase().includes(normalizedQuery));
          }

          return false;
        });

        set({
          searchResults: results,
          isSearching: false,
          error:
            results.length === 0
              ? "No records found matching your query"
              : null,
        });
      } catch (error) {
        set({
          error: `Search error: ${error.message}`,
          isSearching: false,
        });
      }
    }, 800); // Simulated delay
  },

  // Select a specific record for detailed view
  selectRecord: (recordId) => {
    const { searchResults } = get();
    const record = searchResults.find((r) => r.id === recordId);
    set({ selectedRecord: record });
  },

  // Clear the current search
  clearSearch: () => {
    set({
      searchQuery: "",
      searchResults: [],
      selectedRecord: null,
      error: null,
    });
  },

  // Reset everything
  reset: () => {
    set({
      selectedDatabase: null,
      searchQuery: "",
      searchResults: [],
      selectedRecord: null,
      isSearching: false,
      error: null,
    });
  },
}));

export { useDatabaseStore, DATABASE_TYPES };
