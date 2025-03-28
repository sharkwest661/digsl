// components/apps/darkWeb/Browser/Browser.jsx
import React, { useState, useEffect } from "react";
import { useDarkWebStore } from "../../../../store/darkWebStore";
import {
  Search,
  Shield,
  Lock,
  Globe,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { Scanlines } from "../../../effects/Scanlines";
import ConnectionScreen from "../ConnectionScreen/ConnectionScreen";
import MarketplaceBrowser from "../Marketplace/MarketplaceBrowser";
import VendorProfile from "../VendorProfile/VendorProfile";
import ItemDetail from "../ItemDetail/ItemDetail";
import Modal from "../../../common/Modal/Modal";
import styles from "./Browser.module.scss";

const Browser = () => {
  // Get state from the dark web store
  const isConnected = useDarkWebStore((state) => state.isConnected);
  const isConnecting = useDarkWebStore((state) => state.isConnecting);
  const connectionError = useDarkWebStore((state) => state.connectionError);
  const currentPage = useDarkWebStore((state) => state.currentPage);
  const formattedTime = useDarkWebStore((state) =>
    state.getFormattedConnectionTime()
  );
  const connect = useDarkWebStore((state) => state.connect);
  const disconnect = useDarkWebStore((state) => state.disconnect);

  // Local state
  const [address, setAddress] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [showInvalidUrlMessage, setShowInvalidUrlMessage] = useState(false);
  const [showNavigateAwayModal, setShowNavigateAwayModal] = useState(false);
  const [pendingUrl, setPendingUrl] = useState("");

  // Handle URL input change
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // Handle URL form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isConnected && !isConnecting) {
      if (address.toLowerCase().includes("shadow.market")) {
        connect();
        setShowInvalidUrlMessage(false);
      } else {
        setIsSecure(false);
        setShowInvalidUrlMessage(true);
      }
    } else if (isConnected) {
      // Handle navigation within the dark web
      if (address.toLowerCase().includes("shadow.market")) {
        // This would implement more sophisticated URL navigation
        // For now we're keeping it simple
        setShowInvalidUrlMessage(false);
      } else {
        // Show custom modal instead of window.confirm
        setPendingUrl(address);
        setShowNavigateAwayModal(true);
      }
    }
  };

  // Handle navigation away confirmation
  const handleNavigateAway = () => {
    disconnect();
    setShowNavigateAwayModal(false);
  };

  // Handle canceling navigation away
  const handleCancelNavigation = () => {
    setAddress("shadow.market/browse");
    setShowNavigateAwayModal(false);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      useDarkWebStore.getState().cleanup();
    };
  }, []);

  // Change address based on current page
  useEffect(() => {
    if (isConnected) {
      if (currentPage === "market") {
        setAddress("shadow.market/browse");
      } else if (currentPage === "vendor") {
        const vendorId = useDarkWebStore.getState().selectedVendor;
        setAddress(`shadow.market/vendor/${vendorId}`);
      } else if (currentPage === "item") {
        const itemId = useDarkWebStore.getState().selectedListing?.id;
        setAddress(`shadow.market/item/${itemId}`);
      }
    }
  }, [isConnected, currentPage]);

  return (
    <div className={styles.browser}>
      {/* Browser header with address bar */}
      <div className={styles.header}>
        <form onSubmit={handleSubmit} className={styles.addressBar}>
          <div className={styles.addressPrefix}>
            {isSecure ? (
              <Lock size={16} className={styles.secureIcon} />
            ) : (
              <Globe size={16} className={styles.insecureIcon} />
            )}
          </div>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            className={styles.addressInput}
          />
          <button type="submit" className={styles.goButton}>
            <Search size={16} />
          </button>
        </form>
      </div>

      {/* Browser content area */}
      <div className={styles.content}>
        {!isConnected && !isConnecting && (
          <div className={styles.connectPrompt}>
            <Shield size={48} className={styles.shieldIcon} />
            <h2>Dark Web Browser</h2>
            <p>Enter a .onion address to connect to a dark web site.</p>
            {showInvalidUrlMessage && (
              <div className={styles.invalidUrl}>
                Invalid dark web address. Try finding a valid .onion address
                through your investigation.
              </div>
            )}
            <p className={styles.warning}>
              WARNING: Unauthorized access to restricted networks is a federal
              crime.
            </p>
          </div>
        )}

        {isConnecting && <ConnectionScreen />}

        {isConnected && (
          <>
            {currentPage === "market" && <MarketplaceBrowser />}
            {currentPage === "vendor" && <VendorProfile />}
            {currentPage === "item" && <ItemDetail />}
          </>
        )}

        {/* Scanline effect for the cyberpunk look */}
        <Scanlines opacity={0.2} />
      </div>

      {/* Browser status bar */}
      {isConnected && (
        <div className={styles.statusBar}>
          <div className={styles.statusItem}>
            <div className={styles.statusDot}></div>
            <span>TOR NODE: 32.187.xx.xx</span>
            <span className={styles.encryptionBadge}>ENCRYPTED</span>
          </div>
          <div className={styles.statusItem}>
            <RefreshCw size={12} className={styles.refreshIcon} />
            <span>Connected: {formattedTime}</span>
          </div>
        </div>
      )}

      {/* Navigation away confirmation modal */}
      <Modal
        isOpen={showNavigateAwayModal}
        onClose={handleCancelNavigation}
        title="Security Warning"
        showCloseButton={true}
        size="sm"
        darkHacker={true}
        footer={
          <>
            <button
              onClick={handleCancelNavigation}
              className={styles.modalCancelButton}
            >
              Stay Connected
            </button>
            <button
              onClick={handleNavigateAway}
              className={styles.modalConfirmButton}
            >
              Disconnect
            </button>
          </>
        }
      >
        <div className={styles.modalContent}>
          <div className={styles.modalIcon}>
            <AlertTriangle size={24} />
          </div>
          <p>
            Navigating to{" "}
            <span className={styles.emphasizedUrl}>{pendingUrl}</span> will
            disconnect your secure Shadow Market session.
          </p>
          <p>
            All encryption will be terminated and your current investigation
            progress may be lost.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Browser;
