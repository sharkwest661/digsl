// src/components/apps/database/DatabaseRecord/DatabaseRecord.jsx
import React, { useState } from "react";
import { User, FileText, Clock } from "lucide-react";
import styles from "./DatabaseRecord.module.scss";

const DatabaseRecord = ({ record }) => {
  const [activeTab, setActiveTab] = useState("basic");

  if (!record) {
    return null;
  }

  return (
    <div className={styles.recordDetail}>
      <div className={styles.recordHeader}>
        <h2>{record.name}</h2>
        <div className={styles.recordStatus}>
          <span
            className={`${styles.statusIndicator} ${
              styles[record.status.toLowerCase().replace(" ", "")]
            }`}
          ></span>
          {record.status}
        </div>
      </div>

      <div className={styles.recordTabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "basic" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("basic")}
        >
          <User size={14} />
          Basic Information
        </button>

        <button
          className={`${styles.tabButton} ${
            activeTab === "details" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("details")}
        >
          <FileText size={14} />
          Detailed Records
        </button>

        <button
          className={`${styles.tabButton} ${
            activeTab === "timeline" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("timeline")}
        >
          <Clock size={14} />
          Timeline
        </button>
      </div>

      <div className={styles.recordContent}>
        {activeTab === "basic" && <BasicInfoTab record={record} />}
        {activeTab === "details" && <DetailedInfoTab record={record} />}
        {activeTab === "timeline" && <TimelineTab record={record} />}
      </div>
    </div>
  );
};

const BasicInfoTab = ({ record }) => {
  return (
    <div className={styles.basicInfo}>
      <div className={styles.infoGrid}>
        <div className={styles.infoGroup}>
          <div className={styles.infoLabel}>ID</div>
          <div className={styles.infoValue}>{record.id}</div>
        </div>

        <div className={styles.infoGroup}>
          <div className={styles.infoLabel}>National ID</div>
          <div className={styles.infoValue}>{record.nationalID}</div>
        </div>

        <div className={styles.infoGroup}>
          <div className={styles.infoLabel}>Date of Birth</div>
          <div className={styles.infoValue}>{record.dateOfBirth}</div>
        </div>

        <div className={styles.infoGroup}>
          <div className={styles.infoLabel}>Address</div>
          <div className={styles.infoValue}>{record.address}</div>
        </div>

        <div className={styles.infoGroup}>
          <div className={styles.infoLabel}>Occupation</div>
          <div className={styles.infoValue}>{record.occupation}</div>
        </div>

        <div className={styles.infoGroup}>
          <div className={styles.infoLabel}>Employer</div>
          <div className={styles.infoValue}>{record.employer}</div>
        </div>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.sectionLabel}>Description</div>
        <div className={styles.sectionContent}>{record.description}</div>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.sectionLabel}>Notes</div>
        <div className={styles.sectionContent}>{record.notes}</div>
      </div>
    </div>
  );
};

const DetailedInfoTab = ({ record }) => {
  if (!record.details) {
    return (
      <div className={styles.noDetails}>
        No detailed information available for this record.
      </div>
    );
  }

  return (
    <div className={styles.detailedInfo}>
      {/* Physical */}
      {record.details.physical && (
        <div className={styles.detailSection}>
          <div className={styles.detailSectionHeader}>Physical Description</div>
          <div className={styles.detailGrid}>
            {Object.entries(record.details.physical).map(([key, value]) => (
              <div key={key} className={styles.detailItem}>
                <div className={styles.detailLabel}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
                <div className={styles.detailValue}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Background */}
      {record.details.background && (
        <div className={styles.detailSection}>
          <div className={styles.detailSectionHeader}>Background</div>
          <div className={styles.detailGrid}>
            {Object.entries(record.details.background).map(([key, value]) => (
              <div key={key} className={styles.detailItem}>
                <div className={styles.detailLabel}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
                <div className={styles.detailValue}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Employment */}
      {record.details.employment && (
        <div className={styles.detailSection}>
          <div className={styles.detailSectionHeader}>Employment</div>
          <div className={styles.detailGrid}>
            {Object.entries(record.details.employment)
              .filter(([key]) => !Array.isArray(record.details.employment[key]))
              .map(([key, value]) => (
                <div key={key} className={styles.detailItem}>
                  <div className={styles.detailLabel}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                  <div className={styles.detailValue}>{value}</div>
                </div>
              ))}
          </div>

          {record.details.employment.workHistory && (
            <div className={styles.subSection}>
              <div className={styles.subSectionHeader}>Work History</div>
              <div className={styles.workHistory}>
                {record.details.employment.workHistory.map((job, index) => (
                  <div key={index} className={styles.workItem}>
                    <div className={styles.workPosition}>{job.position}</div>
                    <div className={styles.workEmployer}>{job.employer}</div>
                    <div className={styles.workDates}>{job.dates}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {record.details.employment.certifications && (
            <div className={styles.subSection}>
              <div className={styles.subSectionHeader}>Certifications</div>
              <div className={styles.certList}>
                {record.details.employment.certifications.map((cert, index) => (
                  <div key={index} className={styles.certItem}>
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Financial */}
      {record.details.financial && (
        <div className={styles.detailSection}>
          <div className={styles.detailSectionHeader}>Financial</div>
          <div className={styles.detailGrid}>
            {Object.entries(record.details.financial)
              .filter(([key]) => !Array.isArray(record.details.financial[key]))
              .map(([key, value]) => (
                <div key={key} className={styles.detailItem}>
                  <div className={styles.detailLabel}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                  <div className={styles.detailValue}>{value}</div>
                </div>
              ))}
          </div>

          {record.details.financial.transactionHistory && (
            <div className={styles.subSection}>
              <div className={styles.subSectionHeader}>Recent Transactions</div>
              <div className={styles.transactionList}>
                {record.details.financial.transactionHistory.map(
                  (transaction, index) => (
                    <div key={index} className={styles.transactionItem}>
                      <div className={styles.transactionDate}>
                        {transaction.date}
                      </div>
                      <div className={styles.transactionType}>
                        {transaction.type}
                      </div>
                      <div className={styles.transactionAmount}>
                        {transaction.amount}
                      </div>
                      <div className={styles.transactionDesc}>
                        {transaction.description}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Medical */}
      {record.details.medical && (
        <div className={styles.detailSection}>
          <div className={styles.detailSectionHeader}>Medical</div>
          <div className={styles.detailGrid}>
            {Object.entries(record.details.medical).map(([key, value]) => (
              <div key={key} className={styles.detailItem}>
                <div className={styles.detailLabel}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
                <div className={styles.detailValue}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Police */}
      {record.details.police && (
        <div className={styles.detailSection}>
          <div className={styles.detailSectionHeader}>Police Records</div>
          <div className={styles.detailGrid}>
            {Object.entries(record.details.police)
              .filter(([key]) => !Array.isArray(record.details.police[key]))
              .map(([key, value]) => (
                <div key={key} className={styles.detailItem}>
                  <div className={styles.detailLabel}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                  <div className={styles.detailValue}>{value}</div>
                </div>
              ))}
          </div>

          {record.details.police.evidenceItems && (
            <div className={styles.subSection}>
              <div className={styles.subSectionHeader}>Evidence Items</div>
              <div className={styles.evidenceList}>
                {record.details.police.evidenceItems.map((item, index) => (
                  <div key={index} className={styles.evidenceItem}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Travel */}
      {record.details.travel && (
        <div className={styles.detailSection}>
          <div className={styles.detailSectionHeader}>Travel Records</div>
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>Passport</div>
              <div className={styles.detailValue}>
                {record.details.travel.passportNumber}
              </div>
            </div>
          </div>

          {record.details.travel.travelHistory && (
            <div className={styles.subSection}>
              <div className={styles.subSectionHeader}>Travel History</div>
              <div className={styles.travelList}>
                {record.details.travel.travelHistory.map((trip, index) => (
                  <div key={index} className={styles.travelItem}>
                    <div className={styles.travelDate}>{trip.date}</div>
                    <div className={styles.travelDestination}>
                      {trip.destination}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const TimelineTab = ({ record }) => {
  return (
    <div className={styles.timelineView}>
      <div className={styles.timelineHeader}>Case Timeline</div>

      {record.status === "Missing" ? (
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDate}>{record.lastSeen}</div>
            <div className={styles.timelineContent}>
              <div className={styles.timelineTitle}>Last Seen</div>
              <div className={styles.timelineDesc}>
                Subject was last seen at their workplace.
              </div>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDate}>
              {record.lastSeen.split("/")[0]}/
              {parseInt(record.lastSeen.split("/")[1]) + 1}/
              {record.lastSeen.split("/")[2]}
            </div>
            <div className={styles.timelineContent}>
              <div className={styles.timelineTitle}>
                Missing Persons Report Filed
              </div>
              <div className={styles.timelineDesc}>
                Report filed by {record.employer}.
              </div>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDate}>
              {record.lastSeen.split("/")[0]}/
              {parseInt(record.lastSeen.split("/")[1]) + 2}/
              {record.lastSeen.split("/")[2]}
            </div>
            <div className={styles.timelineContent}>
              <div className={styles.timelineTitle}>Initial Investigation</div>
              <div className={styles.timelineDesc}>
                Initial investigation of residence and workplace.
              </div>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDate}>ONGOING</div>
            <div className={styles.timelineContent}>
              <div className={styles.timelineTitle}>Case Active</div>
              <div className={styles.timelineDesc}>
                Investigation continues. Case officer:{" "}
                {record.details?.police?.caseOfficer || "Unassigned"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.noTimeline}>
          No timeline available for this record type.
        </div>
      )}
    </div>
  );
};

export default DatabaseRecord;
