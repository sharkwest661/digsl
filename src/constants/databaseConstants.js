// src/constants/databaseConstants.js

// Database system messages
export const DATABASE_MESSAGES = {
  LOGIN_REQUIRED: "SYSTEM LOGIN REQUIRED",
  ACCESS_DENIED: "ACCESS DENIED",
  UNAUTHORIZED: "UNAUTHORIZED ACCESS ATTEMPT DETECTED",
  LOGIN_SUCCESS: "ACCESS GRANTED",
  TIMEOUT_WARNING: "SESSION TIMEOUT WARNING",
  CONNECTION_ERROR: "CONNECTION ERROR",
  SEARCH_NO_RESULTS: "NO RECORDS FOUND MATCHING QUERY",
  SYSTEM_ERROR: "SYSTEM ERROR - CONTACT ADMINISTRATOR",
  EXPORT_RESTRICTED: "EXPORT RESTRICTED - AUTHORIZATION REQUIRED",
  SESSION_ACTIVE: "ACTIVE DATABASE SESSION",
  EVIDENCE_ADDED: "ITEM ADDED TO EVIDENCE BOARD",
  INVALID_CREDENTIALS: "INVALID USERNAME OR PASSWORD",
  SESSION_EXPIRED: "SESSION EXPIRED - PLEASE LOGIN AGAIN",
  DATA_CLASSIFIED: "DATA CLASSIFIED - CLEARANCE LEVEL INSUFFICIENT",
};

// Record status types
export const RECORD_STATUS = {
  ACTIVE: "Active",
  MISSING: "Missing",
  DECEASED: "Deceased",
  PERSON_OF_INTEREST: "Person of Interest",
  RESTRICTED: "Restricted",
  CLASSIFIED: "Classified",
};

// Database search fields
export const SEARCH_FIELDS = {
  NAME: "name",
  ID: "id",
  NATIONAL_ID: "nationalId",
  STATUS: "status",
  OCCUPATION: "occupation",
  EMPLOYER: "employer",
  DATE_FROM: "dateFrom",
  DATE_TO: "dateTo",
  LOCATION: "location",
  CASE_NUMBER: "caseNumber",
};

// User access levels
export const USER_LEVELS = {
  GUEST: "guest",
  STANDARD: "standard",
  INVESTIGATOR: "investigator",
  ADMINISTRATOR: "administrator",
  SYSTEM: "system",
};

// Evidence classification
export const EVIDENCE_CLASSIFICATION = {
  PHYSICAL: "Physical",
  DIGITAL: "Digital",
  TESTIMONIAL: "Testimonial",
  DOCUMENTARY: "Documentary",
  CIRCUMSTANTIAL: "Circumstantial",
};

// Report types
export const REPORT_TYPES = {
  PRELIMINARY: "preliminary",
  DETAILED: "detailed",
  SUMMARY: "summary",
  TIMELINE: "timeline",
  CONNECTIONS: "connections",
};

// Activity log types
export const ACTIVITY_LOG_TYPES = {
  AUTH: "auth",
  SEARCH: "search",
  DATA: "data",
  EVIDENCE: "evidence",
  EXPORT: "export",
  SYSTEM: "system",
  ERROR: "error",
  SECURITY: "security",
};

// Activity log actions
export const ACTIVITY_LOG_ACTIONS = {
  LOGIN: "login",
  LOGOUT: "logout",
  LOGIN_FAILED: "login_failed",
  SEARCH: "execute_search",
  SEARCH_RESULTS: "search_results",
  CLEAR_SEARCH: "clear_search",
  VIEW_RECORD: "view_record",
  ADD_EVIDENCE: "add_evidence",
  EXPORT_RECORD: "export_record",
  EXPORT_RESTRICTED: "export_restricted",
  SESSION_TIMEOUT: "session_timeout",
  SELECT_DATABASE: "select_database",
  SYSTEM_ERROR: "system_error",
};

// Styling constants for database UI
export const DATABASE_UI = {
  STATUS_COLORS: {
    ACTIVE: "#2ecc71",
    MISSING: "#ff2222",
    DECEASED: "#7f8c8d",
    PERSON_OF_INTEREST: "#f39c12",
    RESTRICTED: "#9b59b6",
    CLASSIFIED: "#e74c3c",
  },
  LOG_COLORS: {
    AUTH: "#3498db",
    SEARCH: "#2ecc71",
    DATA: "#9b59b6",
    EVIDENCE: "#f39c12",
    EXPORT: "#1abc9c",
    SYSTEM: "#95a5a6",
    ERROR: "#e74c3c",
    SECURITY: "#e74c3c",
  },
};

// Early 2000s database version
export const DATABASE_VERSION = "v1.03.24";

// Database date format
export const DATABASE_DATE_FORMAT = "MM/DD/YYYY";

// Database system name
export const DATABASE_SYSTEM_NAME = "GOVERNMENT UNIFIED DATABASE";
