// components/apps/darkWeb/ItemDetail/ItemDetail.jsx
import React, { useState } from "react";
import {
  ArrowLeft,
  AlertTriangle,
  ShieldAlert,
  Package,
  Tag,
  Star,
  ShoppingCart,
  User,
  Clock,
  ChevronUp,
  ChevronDown,
  Eye,
} from "lucide-react";
import { useDarkWebStore } from "../../../../store/darkWebStore";
import styles from "./ItemDetail.module.scss";

const ItemDetail = () => {
  // Get item data from store
  const selectedListing = useDarkWebStore((state) => state.selectedListing);
  const vendors = useDarkWebStore((state) => state.vendors);
  const viewMarket = useDarkWebStore((state) => state.viewMarket);
  const viewVendor = useDarkWebStore((state) => state.viewVendor);
  const isAuthenticated = useDarkWebStore((state) => state.isAuthenticated);
  const currentVendor = useDarkWebStore((state) => state.currentVendor);

  // Local state
  const [expandedSection, setExpandedSection] = useState("details");

  // Check if authenticated as the vendor of this item
  const isVendorAuthenticated =
    isAuthenticated &&
    selectedListing &&
    currentVendor === selectedListing.vendor;

  // Handle back button
  const handleBack = () => {
    viewMarket();
  };

  // Handle vendor profile click
  const handleVendorClick = () => {
    if (selectedListing) {
      viewVendor(selectedListing.vendor);
    }
  };

  // Toggle expanded section
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!selectedListing) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <ShieldAlert size={48} className={styles.errorIcon} />
          <h2>Item Not Found</h2>
          <p>
            The item you are looking for does not exist or has been removed from
            the marketplace.
          </p>
          <button onClick={handleBack} className={styles.backButton}>
            <ArrowLeft size={16} />
            Return to Market
          </button>
        </div>
      </div>
    );
  }

  const vendor = vendors[selectedListing.vendor];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          <ArrowLeft size={16} />
          Back to Market
        </button>
      </div>

      <div className={styles.itemContainer}>
        <div className={styles.itemHeader}>
          <div className={styles.itemTitleSection}>
            <h1 className={styles.itemTitle}>{selectedListing.title}</h1>
            <div className={styles.itemId}>{selectedListing.id}</div>
          </div>

          <div className={styles.itemPrice}>
            <div className={styles.priceLabel}>PRICE</div>
            <div className={styles.priceValue}>
              ₡ {selectedListing.price.toLocaleString()}
            </div>
          </div>
        </div>

        <div className={styles.itemDetails}>
          <div className={styles.mainInfo}>
            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>
                <User size={14} />
                <span>Vendor</span>
              </div>
              <div className={styles.infoValue}>
                <button
                  className={styles.vendorLink}
                  onClick={handleVendorClick}
                >
                  {selectedListing.vendor}
                  {vendor?.accessUnlocked && (
                    <span className={styles.unlockedBadge}>UNLOCKED</span>
                  )}
                </button>
              </div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>
                <Tag size={14} />
                <span>Category</span>
              </div>
              <div className={styles.infoValue}>{selectedListing.category}</div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>
                <Star size={14} />
                <span>Rating</span>
              </div>
              <div className={styles.infoValue}>
                {selectedListing.ratings.toFixed(1)} / 5.0
              </div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>
                <ShoppingCart size={14} />
                <span>Transactions</span>
              </div>
              <div className={styles.infoValue}>
                {selectedListing.transactions}
              </div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoLabel}>
                <Clock size={14} />
                <span>Listed</span>
              </div>
              <div className={styles.infoValue}>2 weeks ago</div>
            </div>
          </div>

          <div
            className={`${styles.collapseSection} ${
              expandedSection === "details" ? styles.expanded : ""
            }`}
            onClick={() => toggleSection("details")}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                <Package size={16} />
                <span>Item Description</span>
              </div>
              {expandedSection === "details" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>

            {expandedSection === "details" && (
              <div className={styles.sectionContent}>
                <p className={styles.description}>
                  {selectedListing.description}
                </p>
              </div>
            )}
          </div>

          <div
            className={`${styles.collapseSection} ${
              expandedSection === "reviews" ? styles.expanded : ""
            }`}
            onClick={() => toggleSection("reviews")}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                <Star size={16} />
                <span>Customer Reviews</span>
              </div>
              {expandedSection === "reviews" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>

            {expandedSection === "reviews" && (
              <div className={styles.sectionContent}>
                <div className={styles.reviewsList}>
                  <div className={styles.review}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewerName}>Anonymous</div>
                      <div className={styles.reviewRating}>★★★★★</div>
                    </div>
                    <div className={styles.reviewContent}>
                      Exactly as described. Fast delivery and excellent quality.
                      Would purchase again.
                    </div>
                    <div className={styles.reviewDate}>3 days ago</div>
                  </div>

                  <div className={styles.review}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewerName}>Anonymous</div>
                      <div className={styles.reviewRating}>★★★★☆</div>
                    </div>
                    <div className={styles.reviewContent}>
                      Good product but took longer than expected to arrive.
                      Works as intended.
                    </div>
                    <div className={styles.reviewDate}>1 week ago</div>
                  </div>

                  <div className={styles.review}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewerName}>Anonymous</div>
                      <div className={styles.reviewRating}>★★★★★</div>
                    </div>
                    <div className={styles.reviewContent}>
                      Premium quality. Zero issues with implementation. Seller
                      was responsive and professional.
                    </div>
                    <div className={styles.reviewDate}>2 weeks ago</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.warningBox}>
            <AlertTriangle size={16} className={styles.warningIcon} />
            <div className={styles.warningContent}>
              <div className={styles.warningTitle}>Shadow Market Warning</div>
              <div className={styles.warningText}>
                This transaction will be recorded on the Shadow Market ledger.
                The marketplace takes no responsibility for the product or any
                consequences of its use.
              </div>
            </div>
          </div>

          <div className={styles.itemActions}>
            <button
              className={styles.actionButton}
              disabled={!isVendorAuthenticated}
            >
              <Eye size={16} />
              {isVendorAuthenticated
                ? "View Buyer Records"
                : "Buyer Records Locked"}
            </button>

            <button className={styles.purchaseButton} disabled>
              <ShoppingCart size={16} />
              Purchase Item
            </button>
          </div>

          {isVendorAuthenticated && (
            <div className={styles.adminPanel}>
              <div className={styles.adminHeader}>
                <User size={14} />
                <span>Vendor Controls</span>
              </div>
              <div className={styles.adminContent}>
                <p>
                  As the authenticated vendor, you have access to edit this
                  listing or view purchase records.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
