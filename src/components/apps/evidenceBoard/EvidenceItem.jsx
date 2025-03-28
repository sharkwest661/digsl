// components/apps/evidenceBoard/EvidenceItem.jsx
import React, { useState, useRef, useEffect } from "react";
import { Paperclip, Link, User, MapPin, FileText, Package } from "lucide-react";
import styles from "./EvidenceItem.module.scss";

const EvidenceItem = ({
  evidence,
  selected,
  connecting,
  isConnectingSource,
  onSelect,
  onMove,
  zoomLevel,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const itemRef = useRef(null);
  const currentPositionRef = useRef({ ...evidence.position });

  // Update current position reference when evidence changes
  useEffect(() => {
    currentPositionRef.current = { ...evidence.position };
  }, [evidence.position]);

  // Handle mouse down (start dragging)
  const handleMouseDown = (e) => {
    e.stopPropagation();

    // Select this evidence item
    onSelect();

    // Only allow dragging if not pinned
    if (!evidence.pinned) {
      setIsDragging(true);

      // Calculate offset from the element's top-left corner
      const rect = itemRef.current.getBoundingClientRect();
      setDragOffset({
        x: (e.clientX - rect.left) / zoomLevel,
        y: (e.clientY - rect.top) / zoomLevel,
      });

      // Add document-level event listeners for dragging
      document.addEventListener("mousemove", handleDocumentMouseMove);
      document.addEventListener("mouseup", handleDocumentMouseUp);
    }
  };

  // Handle document mouse move (for dragging)
  const handleDocumentMouseMove = (e) => {
    if (isDragging && itemRef.current) {
      e.preventDefault();

      const boardRect =
        itemRef.current.parentElement.parentElement.getBoundingClientRect();

      // Calculate new position, accounting for zoom and drag offset
      const newX = (e.clientX - boardRect.left) / zoomLevel - dragOffset.x;
      const newY = (e.clientY - boardRect.top) / zoomLevel - dragOffset.y;

      // Update position in the store
      onMove({ x: newX, y: newY });
    }
  };

  // Handle document mouse up (stop dragging)
  const handleDocumentMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);

      // Remove document-level event listeners
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
    }
  };

  // Clean up event listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
    };
  }, []);

  // Type-specific styling
  const getTypeIcon = () => {
    switch (evidence.type) {
      case "document":
        return <FileText size={14} />;
      case "person":
        return <User size={14} />;
      case "location":
        return <MapPin size={14} />;
      case "item":
        return <Package size={14} />;
      case "connection":
        return <Link size={14} />;
      default:
        return <Paperclip size={14} />;
    }
  };

  // Evidence position style
  const positionStyle = {
    left: `${evidence.position.x}px`,
    top: `${evidence.position.y}px`,
    transition: isDragging
      ? "none"
      : "box-shadow 0.3s ease, transform 0.3s ease",
  };

  // Combine class names
  const itemClass = [
    styles.item,
    styles[evidence.color] || styles.cyan,
    selected ? styles.selected : "",
    connecting ? styles.connectingTarget : "",
    isConnectingSource ? styles.connectingSource : "",
    isDragging ? styles.dragging : "",
    evidence.pinned ? styles.pinned : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={itemRef}
      className={itemClass}
      style={positionStyle}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.header}>
        <div className={styles.typeIcon}>{getTypeIcon()}</div>
        <div className={styles.title}>{evidence.title}</div>
      </div>

      <div className={styles.content}>
        <p className={styles.description}>{evidence.description}</p>

        {evidence.imageUrl && (
          <div className={styles.imageContainer}>
            <img
              src={evidence.imageUrl}
              alt={evidence.title}
              className={styles.image}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EvidenceItem;
