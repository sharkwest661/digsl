// // components/apps/webContent/WebContent.jsx
// import React, { useState, useEffect } from "react";
// import {
//   X,
//   ExternalLink,
//   Bookmark,
//   BookmarkCheck,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { useWebContentStore } from "../../../store/webContentStore";
// import { Scanlines } from "../../effects/Scanlines";
// import { useThemeStore } from "../../../store";
// import styles from "./WebContent.module.scss";

// const WebContent = ({ url, onClose }) => {
//   // Get theme configuration
//   const themeConfig = useThemeStore((state) => state.themeConfig);
//   const effectsEnabled = useThemeStore((state) => state.effectsEnabled);

//   // Get content and bookmark functions from store
//   const getContent = useWebContentStore((state) => state.getContent);
//   const isBookmarked = useWebContentStore((state) => state.isBookmarked);
//   const addBookmark = useWebContentStore((state) => state.addBookmark);
//   const removeBookmark = useWebContentStore((state) => state.removeBookmark);
//   const browsingHistory = useWebContentStore((state) => state.browsingHistory);
//   const currentHistoryIndex = useWebContentStore(
//     (state) => state.currentHistoryIndex
//   );
//   const navigateHistory = useWebContentStore((state) => state.navigateHistory);

//   // Local state
//   const [content, setContent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [bookmarked, setBookmarked] = useState(false);

//   // Load content when URL changes
//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     try {
//       const pageContent = getContent(url);
//       if (pageContent) {
//         setContent(pageContent);
//         setBookmarked(isBookmarked(url));
//       } else {
//         setError(
//           "Content not found. The page might be unavailable or restricted."
//         );
//       }
//     } catch (err) {
//       setError("Error loading content: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [url, getContent, isBookmarked]);

//   // Toggle bookmark
//   const handleToggleBookmark = () => {
//     if (bookmarked) {
//       removeBookmark(url);
//     } else {
//       addBookmark(url, content.title);
//     }
//     setBookmarked(!bookmarked);
//   };

//   // Handle back/forward navigation
//   const handleBack = () => {
//     navigateHistory(-1);
//   };

//   const handleForward = () => {
//     navigateHistory(1);
//   };

//   // Format the date
//   const formatDate = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       return new Intl.DateTimeFormat("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }).format(date);
//     } catch {
//       return dateString; // Return as is if invalid
//     }
//   };

//   // Handle link clicks
//   const handleLinkClick = (e, targetUrl) => {
//     e.preventDefault();
//     // Just log the URL instead of navigating for this demo
//     console.log("Would navigate to:", targetUrl);
//   };

//   // Render loading state
//   if (loading) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <div className={styles.urlBar}>{url}</div>
//           <button className={styles.closeButton} onClick={onClose}>
//             <X size={18} />
//           </button>
//         </div>
//         <div className={styles.loadingContainer}>
//           <div className={styles.loadingText}>Loading content...</div>
//         </div>
//       </div>
//     );
//   }

//   // Render error state
//   if (error) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <div className={styles.urlBar}>{url}</div>
//           <button className={styles.closeButton} onClick={onClose}>
//             <X size={18} />
//           </button>
//         </div>
//         <div className={styles.errorContainer}>
//           <div className={styles.errorText}>{error}</div>
//         </div>
//       </div>
//     );
//   }

//   // If no content, show empty state
//   if (!content) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <div className={styles.urlBar}>{url}</div>
//           <button className={styles.closeButton} onClick={onClose}>
//             <X size={18} />
//           </button>
//         </div>
//         <div className={styles.emptyContainer}>
//           <div className={styles.emptyText}>No content available.</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       {/* Header with navigation */}
//       <div className={styles.header}>
//         <div className={styles.navigationControls}>
//           <button
//             className={styles.navButton}
//             onClick={handleBack}
//             disabled={currentHistoryIndex <= 0}
//           >
//             <ChevronLeft size={18} />
//           </button>
//           <button
//             className={styles.navButton}
//             onClick={handleForward}
//             disabled={currentHistoryIndex >= browsingHistory.length - 1}
//           >
//             <ChevronRight size={18} />
//           </button>
//         </div>

//         <div className={styles.urlBar}>{url}</div>

//         <div className={styles.headerControls}>
//           <button
//             className={styles.bookmarkButton}
//             onClick={handleToggleBookmark}
//             title={bookmarked ? "Remove bookmark" : "Add bookmark"}
//           >
//             {bookmarked ? (
//               <BookmarkCheck size={18} className={styles.bookmarkedIcon} />
//             ) : (
//               <Bookmark size={18} />
//             )}
//           </button>
//           <button className={styles.closeButton} onClick={onClose}>
//             <X size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className={styles.content}>
//         {/* Page title */}
//         <h1 className={styles.title}>{content.title}</h1>

//         {/* Metadata */}
//         <div className={styles.metadata}>
//           {content.source && (
//             <div className={styles.source}>
//               Source: <span>{content.source}</span>
//             </div>
//           )}
//           {content.date && (
//             <div className={styles.date}>{formatDate(content.date)}</div>
//           )}
//           {content.author && (
//             <div className={styles.author}>
//               By: <span>{content.author}</span>
//             </div>
//           )}
//         </div>

//         {/* Content sections */}
//         <div className={styles.textContent}>
//           {content.sections.map((section, index) => (
//             <div key={index} className={styles.section}>
//               {section.heading && (
//                 <h2 className={styles.sectionHeading}>{section.heading}</h2>
//               )}
//               {section.paragraphs.map((paragraph, pIndex) => (
//                 <p key={pIndex} className={styles.paragraph}>
//                   {paragraph}
//                 </p>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* Links section if available */}
//         {content.links && content.links.length > 0 && (
//           <div className={styles.linksSection}>
//             <h3 className={styles.linksHeading}>Related Links</h3>
//             <ul className={styles.linksList}>
//               {content.links.map((link, index) => (
//                 <li key={index} className={styles.linkItem}>
//                   <a
//                     href="#"
//                     className={styles.link}
//                     onClick={(e) => handleLinkClick(e, link.url)}
//                   >
//                     <ExternalLink size={14} className={styles.linkIcon} />
//                     <span>{link.title}</span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* Apply scanline effect if enabled */}
//       {effectsEnabled?.scanlines && <Scanlines opacity={0.1} />}
//     </div>
//   );
// };

// export default WebContent;
