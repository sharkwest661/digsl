// components/apps/evidenceBoard/EditEvidenceModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "../../common/Modal";
import Button from "../../ui/Button";
import styles from "./EditEvidenceModal.module.scss";

const EVIDENCE_TYPES = [
  { id: "document", label: "Document" },
  { id: "person", label: "Person" },
  { id: "location", label: "Location" },
  { id: "item", label: "Physical Item" },
  { id: "note", label: "Note" },
  { id: "connection", label: "Connection" },
];

const COLOR_OPTIONS = [
  { id: "pink", label: "Pink" },
  { id: "cyan", label: "Cyan" },
  { id: "orange", label: "Orange" },
  { id: "green", label: "Green" },
  { id: "red", label: "Red" },
  { id: "purple", label: "Purple" },
];

const EditEvidenceModal = ({
  isOpen,
  onClose,
  evidence,
  onSave,
  title = "Edit Evidence",
}) => {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "note",
    color: "cyan",
    imageUrl: "",
    pinned: false,
  });

  // Initialize form data from evidence (if editing)
  useEffect(() => {
    if (evidence) {
      setFormData({
        title: evidence.title || "",
        description: evidence.description || "",
        type: evidence.type || "note",
        color: evidence.color || "cyan",
        imageUrl: evidence.imageUrl || "",
        pinned: evidence.pinned || false,
      });
    } else {
      // Reset form to defaults when adding new evidence
      setFormData({
        title: "",
        description: "",
        type: "note",
        color: "cyan",
        imageUrl: "",
        pinned: false,
      });
    }
  }, [evidence, isOpen]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      // Could add validation error here
      return;
    }

    onSave(formData);
  };

  // Modal footer with action buttons
  const modalFooter = (
    <>
      <Button variant="outline" onClick={onClose} size="sm">
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit} size="sm">
        {evidence ? "Update" : "Add"}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={modalFooter}
      size="md"
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Evidence Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter evidence title"
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={styles.select}
            >
              {EVIDENCE_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Color</label>
            <div className={styles.colorOptions}>
              {COLOR_OPTIONS.map((color) => (
                <label
                  key={color.id}
                  className={`${styles.colorOption} ${
                    formData.color === color.id ? styles.selected : ""
                  } ${styles[color.id]}`}
                >
                  <input
                    type="radio"
                    name="color"
                    value={color.id}
                    checked={formData.color === color.id}
                    onChange={handleChange}
                    className={styles.colorInput}
                  />
                  <span className={styles.colorSwatch}></span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Enter evidence description"
            rows={5}
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Image URL (optional)</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter image URL"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="pinned"
              checked={formData.pinned}
              onChange={handleChange}
              className={styles.checkbox}
            />
            <span>Pin to board (prevent moving)</span>
          </label>
        </div>
      </form>
    </Modal>
  );
};

export default EditEvidenceModal;
