// components/apps/notepad/Notepad.jsx
// Used by the Desktop component - referenced in APP_COMPONENTS
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Save,
  Plus,
  Trash,
  List,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNotepadStore, useThemeStore } from "../../../store";
import { formatDate } from "../../../utils/formatters";
import styles from "./Notepad.module.scss";

const Notepad = () => {
  // Get theme configuration
  const themeConfig = useThemeStore((state) => state.themeConfig);

  // Get notepad state from the store
  const {
    notes,
    activeNoteId,
    createNote,
    updateNote,
    deleteNote,
    setActiveNote,
  } = useNotepadStore((state) => ({
    notes: state.notes,
    activeNoteId: state.activeNoteId,
    createNote: state.createNote,
    updateNote: state.updateNote,
    deleteNote: state.deleteNote,
    setActiveNote: state.setActiveNote,
  }));

  // Local state
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const textAreaRef = useRef(null);
  const titleInputRef = useRef(null);

  // Find active note
  const activeNote = notes.find((note) => note.id === activeNoteId) || null;

  // Filter notes based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredNotes(notes);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, notes]);

  // Update local state when active note changes
  useEffect(() => {
    if (activeNote) {
      setContent(activeNote.content);
      setTitle(activeNote.title);
      updateCounts(activeNote.content);
    } else {
      setContent("");
      setTitle("");
      updateCounts("");
    }
  }, [activeNote]);

  // Focus on title when creating a new note
  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditing]);

  // Update word and character counts
  const updateCounts = (text) => {
    setCharCount(text.length);
    setWordCount(text.trim() === "" ? 0 : text.trim().split(/\s+/).length);
  };

  // Handle content changes
  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    updateCounts(newContent);

    // Auto-save after typing stops (debounce)
    if (activeNote) {
      saveChanges(activeNote.id, title, newContent);
    }
  };

  // Handle title changes
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Save changes to a note
  const saveChanges = (id, noteTitle, noteContent) => {
    updateNote(id, {
      title: noteTitle,
      content: noteContent,
      lastModified: new Date(),
    });
  };

  // Create a new note
  const handleCreateNote = () => {
    const newNote = createNote();
    setActiveNote(newNote.id);
    setIsEditing(true);
  };

  // Delete the active note
  const handleDeleteNote = () => {
    if (
      activeNote &&
      window.confirm("Are you sure you want to delete this note?")
    ) {
      deleteNote(activeNote.id);
    }
  };

  // Toggle title editing mode
  const toggleEditing = () => {
    if (isEditing && activeNote) {
      // Save the title when exiting edit mode
      saveChanges(activeNote.id, title, content);
    }
    setIsEditing(!isEditing);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={styles.container}>
      {/* Sidebar with notes list */}
      <div className={`${styles.sidebar} ${!showSidebar ? styles.hidden : ""}`}>
        <div className={styles.sidebarHeader}>
          <h3 className={styles.sidebarTitle}>NOTES</h3>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            <Search size={16} className={styles.searchIcon} />
          </div>
        </div>

        <div className={styles.notesList}>
          {filteredNotes.length === 0 ? (
            <div className={styles.emptyMessage}>No notes found</div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setActiveNote(note.id)}
                className={`${styles.noteItem} ${
                  note.id === activeNoteId ? styles.active : ""
                }`}
              >
                <div className={styles.noteTitle}>
                  {note.title || "Untitled Note"}
                </div>
                <div className={styles.noteDate}>
                  {formatDate(note.lastModified)}
                </div>
                <div className={styles.notePreview}>
                  {note.content.substring(0, 60)}
                  {note.content.length > 60 ? "..." : ""}
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.sidebarFooter}>
          <button onClick={handleCreateNote} className={styles.newNoteButton}>
            <Plus size={16} />
            New Note
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className={styles.contentArea}>
        {/* Main toolbar */}
        <div className={styles.toolbar}>
          <button
            onClick={toggleSidebar}
            className={styles.toolbarButton}
            title={showSidebar ? "Hide Sidebar" : "Show Sidebar"}
          >
            {showSidebar ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          {activeNote && (
            <>
              <button
                onClick={toggleEditing}
                className={styles.toolbarButton}
                title={isEditing ? "Save Title" : "Edit Title"}
              >
                {isEditing ? <Save size={18} /> : <Edit size={18} />}
              </button>

              <button
                onClick={handleDeleteNote}
                className={styles.toolbarButton}
                title="Delete Note"
              >
                <Trash size={18} />
              </button>
            </>
          )}
        </div>

        {/* Note editor */}
        {activeNote ? (
          <div className={styles.editor}>
            <div className={styles.titleBar}>
              {isEditing ? (
                <input
                  ref={titleInputRef}
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={() => {
                    toggleEditing();
                  }}
                  className={styles.titleInput}
                  placeholder="Enter note title..."
                />
              ) : (
                <h2 className={styles.editorTitle} onClick={toggleEditing}>
                  {title || "Untitled Note"}
                </h2>
              )}
            </div>

            <textarea
              ref={textAreaRef}
              value={content}
              onChange={handleContentChange}
              className={styles.contentEditor}
              placeholder="Type your notes here..."
            />
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateContent}>
              <h3>No Note Selected</h3>
              <p>Create a new note or select an existing one.</p>
              <button
                onClick={handleCreateNote}
                className={styles.createButton}
              >
                <Plus size={16} />
                Create Note
              </button>
            </div>
          </div>
        )}

        {/* Status bar */}
        <div className={styles.statusBar}>
          {activeNote && (
            <>
              <div className={styles.statusItem}>Chars: {charCount}</div>
              <div className={styles.statusItem}>Words: {wordCount}</div>
              <div className={styles.statusItem}>
                Last Modified: {formatDate(activeNote.lastModified)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notepad;
