// components/apps/darkWeb/VendorProfile/VendorProfile.jsx
import React from "react";
import {
  ArrowLeft,
  ShieldAlert,
  Lock,
  Star,
  ShoppingCart,
  User,
  Package,
} from "lucide-react";
import { useDarkWebStore } from "../../../../store/darkWebStore";
import styles from "./VendorProfile.module.scss";

const VendorProfile = () => {
  // Get vendor data from store
  const selectedVendor = useDarkWebStore((state) => state.selectedVendor);
  const vendors = useDarkWebStore((state) => state.vendors);
  const getVendorListings = useDarkWebStore((state) => state.getVendorListings);
  const viewMarket = useDarkWebStore((state) => state.viewMarket);
  const viewListing = useDarkWebStore((state) => state.viewListing);
  const isAuthenticated = useDarkWebStore((state) => state.isAuthenticated);
  const currentVendor = useDarkWebStore((state) => state.currentVendor);

  // Get vendor details and listings
  const vendor = vendors[selectedVendor];
  const vendorListings = getVendorListings(selectedVendor);

  // Check if this vendor is the authenticated one
  const isVendorAuthenticated =
    isAuthenticated && currentVendor === selectedVendor;

  // Handle back button
  const handleBack = () => {
    viewMarket();
  };

  if (!vendor) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <ShieldAlert size={48} className={styles.errorIcon} />
          <h2>Vendor Not Found</h2>
          <p>
            The vendor profile you are looking for does not exist or has been
            removed.
          </p>
          <button onClick={handleBack} className={styles.backButton}>
            <ArrowLeft size={16} />
            Return to Market
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          <ArrowLeft size={16} />
          Back to Market
        </button>

        {isVendorAuthenticated ? (
          <div className={styles.authBadge}>
            <User size={14} />
            <span>Logged in as {vendor.id}</span>
          </div>
        ) : (
          <div className={styles.lockBadge}>
            <Lock size={14} />
            <span>View Only Mode</span>
          </div>
        )}
      </div>

      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.vendorAvatar}>{vendor.id.charAt(0)}</div>

          <div className={styles.vendorInfo}>
            <h1 className={styles.vendorName}>
              {vendor.id}
              {vendor.accessUnlocked && (
                <span className={styles.accessUnlocked}>UNLOCKED</span>
              )}
            </h1>

            <div className={styles.vendorMeta}>
              <div className={styles.vendorRating}>
                <Star size={14} className={styles.ratingIcon} />
                <span>4.8 / 5.0</span>
              </div>

              <div className={styles.transactionCount}>
                <ShoppingCart size={14} className={styles.cartIcon} />
                <span>150+ Transactions</span>
              </div>

              <div className={styles.joinDate}>
                <span>Member since 2019</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.profileBody}>
          <div className={styles.vendorQuote}>"{vendor.profileQuote}"</div>

          {vendor.accessUnlocked || isVendorAuthenticated ? (
            <div className={styles.identityReveal}>
              <div className={styles.revealHeader}>
                <Lock size={16} />
                <h3>Identity Information (Restricted)</h3>
              </div>

              <div className={styles.revealContent}>
                <div className={styles.dataRow}>
                  <div className={styles.dataLabel}>Real Identity:</div>
                  <div className={styles.dataValue}>{vendor.realName}</div>
                </div>

                <div className={styles.dataRow}>
                  <div className={styles.dataLabel}>Specialty:</div>
                  <div className={styles.dataValue}>{vendor.specialty}</div>
                </div>

                <div className={styles.dataRow}>
                  <div className={styles.dataLabel}>Status:</div>
                  <div className={styles.dataValue}>{vendor.status}</div>
                </div>

                <div className={styles.dataRow}>
                  <div className={styles.dataLabel}>Last Seen:</div>
                  <div className={styles.dataValue}>{vendor.lastSeen}</div>
                </div>

                <div className={styles.dataRow}>
                  <div className={styles.dataLabel}>Evidence:</div>
                  <div className={styles.dataValue}>{vendor.clue}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.identityLocked}>
              <Lock size={24} />
              <h3>Identity Information Locked</h3>
              <p>Authentication required to view vendor's real identity.</p>
              <p className={styles.hackHint}>
                Hint: Use terminal to hack vendor credentials.
              </p>
            </div>
          )}

          <div className={styles.listingsSection}>
            <h2 className={styles.sectionTitle}>
              <Package size={18} />
              Vendor Listings
            </h2>

            {vendorListings.length > 0 ? (
              <div className={styles.vendorListings}>
                {vendorListings.map((listing) => (
                  <div
                    key={listing.id}
                    className={styles.listingItem}
                    onClick={() => viewListing(listing.id)}
                  >
                    <div className={styles.listingTitle}>{listing.title}</div>
                    <div className={styles.listingMeta}>
                      <div className={styles.listingId}>{listing.id}</div>
                      <div className={styles.listingPrice}>
                        ₡ {listing.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noListings}>
                No active listings found for this vendor.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
