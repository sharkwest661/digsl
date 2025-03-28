// components/apps/database/DetailView.jsx
import React, { useState } from "react";
import {
  User,
  File,
  ChevronRight,
  CalendarDays,
  MapPin,
  AlertCircle,
  FileText,
  ChevronDown,
  Clock,
  ShieldAlert,
} from "lucide-react";
import { DATABASE_TYPES } from "../../../store/databaseStore";
import styles from "./DetailView.module.scss";

const DetailView = ({ record, databaseType }) => {
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    // Add more sections as needed
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Format record type name
  const getRecordTypeName = () => {
    switch (databaseType) {
      case DATABASE_TYPES.POLICE:
        return "Police Record";
      case DATABASE_TYPES.MEDICAL:
        return "Medical Record";
      case DATABASE_TYPES.IMMIGRATION:
        return "Immigration Record";
      case DATABASE_TYPES.FINANCIAL:
        return "Financial Record";
      case DATABASE_TYPES.EMPLOYMENT:
        return "Employment Record";
      case DATABASE_TYPES.CRIMINAL:
        return "Criminal Record";
      default:
        return "Record";
    }
  };

  // Get person name from record based on database type
  const getPersonName = () => {
    return record.name || record.patientName || record.fullName || "Unknown";
  };

  // Get primary ID from record based on type
  const getPrimaryId = () => {
    if (record.patientID) return `Patient ID: ${record.patientID}`;
    if (record.caseNumbers) return `Case ID: ${record.caseNumbers[0]}`;
    if (record.passportNumber) return `Passport: ${record.passportNumber}`;
    if (record.nationalID) return `National ID: ${record.nationalID}`;
    if (record.accountNumbers) return `Account: ${record.accountNumbers[0]}`;
    if (record.taxID) return `Tax ID: ${record.taxID}`;
    return `Record ID: ${record.id}`;
  };

  return (
    <div className={styles.detailView}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.recordIcon}>
            <User size={18} />
          </div>
          <h2 className={styles.title}>{getPersonName()}</h2>
        </div>

        <div className={styles.recordType}>
          {getRecordTypeName()}
          <span className={styles.recordId}>{record.id}</span>
        </div>

        <div className={styles.infoChips}>
          <div className={styles.infoChip}>
            <File size={14} />
            <span>{getPrimaryId()}</span>
          </div>

          {record.status && (
            <div className={styles.infoChip}>
              <AlertCircle size={14} />
              <span>{record.status}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.content}>
        {/* Key Information Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FileText size={16} />
            <span>KEY INFORMATION</span>
          </div>

          <div className={styles.keyInfo}>
            {renderKeyInformation(record, databaseType)}
          </div>
        </div>

        {/* Details Section (expandable) */}
        <div className={styles.section}>
          <div
            className={styles.sectionHeader}
            onClick={() => toggleSection("details")}
          >
            <div className={styles.sectionTitle}>
              <File size={16} />
              <span>DETAILED INFORMATION</span>
            </div>
            {expandedSections.details ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>

          {expandedSections.details && (
            <div className={styles.detailedInfo}>
              {renderDetailedInformation(record, databaseType)}
            </div>
          )}
        </div>

        {/* Notes Section */}
        {record.notes && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FileText size={16} />
              <span>NOTES</span>
            </div>

            <div className={styles.notesContent}>{record.notes}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to render key information based on database type
const renderKeyInformation = (record, dbType) => {
  switch (dbType) {
    case DATABASE_TYPES.POLICE:
      return (
        <>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Status</div>
            <div className={styles.infoValue}>{record.status || "Unknown"}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Last Known</div>
            <div className={styles.infoValue}>
              {record.lastKnown || "Unknown"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Case Numbers</div>
            <div className={styles.infoValue}>
              {record.caseNumbers ? record.caseNumbers.join(", ") : "None"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Description</div>
            <div className={styles.infoValue}>
              {record.description || "None provided"}
            </div>
          </div>
        </>
      );

    case DATABASE_TYPES.MEDICAL:
      return (
        <>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Date of Birth</div>
            <div className={styles.infoValue}>
              {record.dateOfBirth || "Unknown"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Blood Type</div>
            <div className={styles.infoValue}>
              {record.bloodType || "Unknown"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Allergies</div>
            <div className={styles.infoValue}>{record.allergies || "None"}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Current Medications</div>
            <div className={styles.infoValue}>
              {record.medications || "None"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Last Visit</div>
            <div className={styles.infoValue}>
              {record.lastVisit || "Unknown"}
            </div>
          </div>
        </>
      );

    case DATABASE_TYPES.IMMIGRATION:
      return (
        <>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Nationality</div>
            <div className={styles.infoValue}>
              {record.nationality || "Unknown"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Date of Birth</div>
            <div className={styles.infoValue}>
              {record.dateOfBirth || "Unknown"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Passport</div>
            <div className={styles.infoValue}>
              {record.passportNumber || "Unknown"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Status</div>
            <div className={styles.infoValue}>{record.status || "Unknown"}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Travel History</div>
            <div className={styles.infoValue}>
              {record.travelHistory || "None"}
            </div>
          </div>
        </>
      );

    case DATABASE_TYPES.FINANCIAL:
      return (
        <>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Account Numbers</div>
            <div className={styles.infoValue}>
              {record.accountNumbers
                ? record.accountNumbers.join(", ")
                : "None"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Tax ID</div>
            <div className={styles.infoValue}>{record.taxID || "Unknown"}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Employment Status</div>
            <div className={styles.infoValue}>
              {record.employmentStatus || "Unknown"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Income Level</div>
            <div className={styles.infoValue}>
              {record.incomeLevel || "Unknown"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Flags</div>
            <div className={styles.infoValue}>
              {record.transactionFlags || "None"}
            </div>
          </div>
        </>
      );

    case DATABASE_TYPES.EMPLOYMENT:
      return (
        <>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Current Employer</div>
            <div className={styles.infoValue}>
              {record.currentEmployer || "Unknown"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Position</div>
            <div className={styles.infoValue}>
              {record.position || "Unknown"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Start Date</div>
            <div className={styles.infoValue}>
              {record.startDate || "Unknown"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Status</div>
            <div className={styles.infoValue}>
              {record.employmentStatus || "Unknown"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Clearance Level</div>
            <div className={styles.infoValue}>
              {record.clearanceLevel || "None"}
            </div>
          </div>
        </>
      );

    case DATABASE_TYPES.CRIMINAL:
      return (
        <>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Criminal Status</div>
            <div className={styles.infoValue}>
              {record.criminalStatus || "Unknown"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Watchlist Status</div>
            <div className={styles.infoValue}>
              {record.watchlistStatus || "Not listed"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Interpol</div>
            <div className={styles.infoValue}>
              {record.interpol || "No alerts"}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>National ID</div>
            <div className={styles.infoValue}>
              {record.nationalID || "Unknown"}
            </div>
          </div>
        </>
      );

    default:
      return (
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Details</div>
          <div className={styles.infoValue}>No details available</div>
        </div>
      );
  }
};

// Helper function to render detailed information
const renderDetailedInformation = (record, dbType) => {
  // If there's no details object, show placeholder
  if (!record.details) {
    return (
      <div className={styles.noDetails}>
        No detailed information available for this record.
      </div>
    );
  }

  // Render different details based on database type
  switch (dbType) {
    case DATABASE_TYPES.POLICE:
      return (
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Height</div>
            <div className={styles.detailValue}>
              {record.details.height || "Unknown"}
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Weight</div>
            <div className={styles.detailValue}>
              {record.details.weight || "Unknown"}
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Eye Color</div>
            <div className={styles.detailValue}>
              {record.details.eyeColor || "Unknown"}
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Hair Color</div>
            <div className={styles.detailValue}>
              {record.details.hairColor || "Unknown"}
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Distinguishing Features</div>
            <div className={styles.detailValue}>
              {record.details.distinguishingFeatures || "None"}
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Nationality</div>
            <div className={styles.detailValue}>
              {record.details.nationality || "Unknown"}
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Languages</div>
            <div className={styles.detailValue}>
              {record.details.languages || "Unknown"}
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Occupation</div>
            <div className={styles.detailValue}>
              {record.details.occupation || "Unknown"}
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Employer</div>
            <div className={styles.detailValue}>
              {record.details.employer || "Unknown"}
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Emergency Contact</div>
            <div className={styles.detailValue}>
              {record.details.emergencyContact || "None"}
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Last Seen</div>
            <div className={styles.detailValue}>
              {record.details.lastSeen || "Unknown"}
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Case Officer</div>
            <div className={styles.detailValue}>
              {record.details.caseOfficer || "Unassigned"}
            </div>
          </div>

          {/* Evidence section */}
          {record.details.evidenceItems &&
            record.details.evidenceItems.length > 0 && (
              <div className={styles.evidenceSection}>
                <div className={styles.evidenceLabel}>Evidence Items</div>
                <ul className={styles.evidenceList}>
                  {record.details.evidenceItems.map((item, index) => (
                    <li key={index} className={styles.evidenceItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      );

    // Add cases for other database types...
    default:
      // Generic details renderer for other database types
      return (
        <div className={styles.genericDetails}>
          {Object.entries(record.details).map(([key, value]) => {
            // Skip rendering arrays as simple values
            if (Array.isArray(value) && typeof value[0] === "object") {
              return (
                <div key={key} className={styles.arraySection}>
                  <div className={styles.arraySectionTitle}>
                    {formatLabel(key)}
                  </div>
                  <div className={styles.arrayItems}>
                    {value.map((item, i) => (
                      <div key={i} className={styles.arrayItem}>
                        {Object.entries(item).map(([itemKey, itemValue]) => (
                          <div key={itemKey} className={styles.arrayItemRow}>
                            <div className={styles.arrayItemLabel}>
                              {formatLabel(itemKey)}
                            </div>
                            <div className={styles.arrayItemValue}>
                              {itemValue}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            // Simple string/number values or simple arrays
            return (
              <div key={key} className={styles.detailItem}>
                <div className={styles.detailLabel}>{formatLabel(key)}</div>
                <div className={styles.detailValue}>
                  {Array.isArray(value) ? value.join(", ") : value.toString()}
                </div>
              </div>
            );
          })}
        </div>
      );
  }
};

// Helper to format camelCase or snake_case labels to Title Case
const formatLabel = (label) => {
  // Convert camelCase or snake_case to space-separated
  const spacedLabel = label
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .trim();

  // Convert to Title Case
  return spacedLabel
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default DetailView;
