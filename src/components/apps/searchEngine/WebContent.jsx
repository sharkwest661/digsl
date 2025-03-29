// components/apps/searchEngine/WebContent.jsx
// This component displays a text-only version of web content
// It's designed for the cyberpunk aesthetic with minimal visuals
import React, { useState, useEffect } from "react";
import {
  X,
  ExternalLink,
  BookmarkPlus,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Clock,
  Globe,
  Search,
} from "lucide-react";
import { useThemeStore, useSearchEngineStore } from "../../../store";
import { Scanlines } from "../../effects/Scanlines";
import styles from "./WebContent.module.scss";

// Mock web content data - in a real app, this would come from a store or API
export const WEB_CONTENT = {
  "https://economicreview.az/markets/black-markets-post-soviet": {
    title: "Black Markets in Post-Soviet States - Economic Analysis",
    content: [
      {
        heading: "Evolution of Shadow Markets in Azerbaijan",
        paragraphs: [
          "The term 'shadow market' is often used to describe unofficial economic activity operating outside regulatory frameworks. In Azerbaijan, these markets evolved significantly during the early 2000s, transforming from physical locations to more sophisticated digital networks.",
          "Following the collapse of the Soviet Union, unregulated markets emerged as a response to economic instability. By 2003, these had developed complex structures with digital components, particularly in urban centers like Baku.",
          "Economic analysts have noted the correlation between regulatory changes and shadow market adaptations, with each new enforcement measure triggering innovative evasion techniques among market participants.",
        ],
      },
      {
        heading: "Digital Transformation",
        paragraphs: [
          "The introduction of early internet infrastructure in Azerbaijan created new opportunities for shadow markets to operate with increased anonymity. Message boards and primitive encrypted communications began replacing face-to-face transactions for illegal goods and services.",
          "Cybercafés became important nodes in these networks, offering relative anonymity and access to digital platforms that authorities struggled to monitor effectively.",
        ],
      },
      {
        heading: "Economic Impact",
        paragraphs: [
          "Conservative estimates suggest shadow market activities represented between 18-24% of Azerbaijan's GDP during the early 2000s, though the increasing digitization made accurate measurement more challenging.",
          "The shadow economy created parallel systems of value and exchange, with informal credit systems operating alongside official banking channels.",
          "The emergence of early cryptocurrency precursors was observed in some sophisticated shadow market operations by late 2002, though these remained limited to technical specialists.",
        ],
      },
    ],
    source: "Economic Review Journal",
    date: "2002-11-25",
    url: "https://economicreview.az/markets/black-markets-post-soviet",
  },

  "https://bakutoday.az/news/cybercrime-rise-2003": {
    title: "Rise in Cybercrime Concerns Authorities",
    content: [
      {
        heading: "Digital Underground Growing in Baku",
        paragraphs: [
          "Azerbaijani authorities have expressed concern over what they call a 'shadow market' of digital transactions occurring outside regulated channels. According to a spokesman from the Ministry of Communications, these activities have increased by approximately 200% since 2001.",
          '"We are witnessing a troubling trend where sophisticated actors are exploiting technological gaps faster than we can address them," said Deputy Minister Mammadov in a statement Tuesday.',
          "Particular concern was expressed over encrypted communications networks operating through cybercafés and private servers, making detection and monitoring increasingly difficult.",
        ],
      },
      {
        heading: "New Task Force Formed",
        paragraphs: [
          "In response to the growing threat, a specialized cybercrime unit has been established within the Baku Police Department. The unit comprises technology specialists and traditional investigators working to penetrate digital networks used for illicit activities.",
          '"This requires a new approach to policing," explained Captain Aliyev, who heads the new division. "We\'re dealing with crimes that leave no physical evidence in the traditional sense."',
        ],
      },
      {
        heading: "Recent Cases",
        paragraphs: [
          "Authorities point to several recent cases involving digital fraud, unauthorized access to protected systems, and the trafficking of restricted information through online channels.",
          "Particularly concerning to officials is the emergence of sophisticated marketplaces where illegal goods and services can be exchanged with minimal risk of detection. These marketplaces operate through layers of security and access controls that make infiltration challenging.",
          "Citizens are advised to report suspicious online activities and exercise caution when engaging with unfamiliar websites or digital services.",
        ],
      },
    ],
    source: "Baku Today",
    date: "2003-01-18",
    url: "https://bakutoday.az/news/cybercrime-rise-2003",
  },

  "https://techedge.com/articles/tech-underground-2003": {
    title: "Tech Underground: Where Digital Meets Criminal",
    content: [
      {
        heading: "The Digital Bazaar",
        paragraphs: [
          "Beneath the surface of everyday internet use exists a parallel digital world where forums and encrypted chatrooms have created a sophisticated shadow market with its own rules, economy, and hierarchy.",
          "Unlike physical black markets, these digital spaces offer unprecedented anonymity, global reach, and rapid evolution of security measures that consistently outpace law enforcement capabilities.",
          '"What we\'re seeing is the evolution of criminal enterprise," explains cybersecurity expert Dr. Nadir Hassan. "Traditional organized crime structures are being replaced by decentralized networks that can form, dissolve, and reform with extraordinary fluidity."',
        ],
      },
      {
        heading: "Access and Authentication",
        paragraphs: [
          "Entry to these digital undergrounds is tightly controlled through multi-layered authentication systems. New participants typically require vouching from established members, creating a system of reputation-based trust.",
          "Specialized browsers and encryption tools form the basic toolkit for accessing these spaces, with users frequently employing additional security measures such as virtual private networks and temporary operating systems.",
          "The technical barriers to entry serve dual purposes: preventing law enforcement infiltration while simultaneously ensuring participants possess sufficient technical knowledge to maintain operational security.",
        ],
      },
      {
        heading: "Digital Contraband",
        paragraphs: [
          "The term 'digital contraband' encompasses a wide range of illicit goods and services traded in these forums, from stolen data and unauthorized access credentials to specialized software tools designed for criminal purposes.",
          "Particularly concerning is the emergence of 'access-as-a-service' offerings, where skilled hackers sell entry points to secured systems rather than exploiting them directly.",
          "Transactions typically employ cryptocurrency or other non-traceable payment methods, further complicating efforts to track and disrupt these activities.",
        ],
      },
      {
        heading: "Regional Variations",
        paragraphs: [
          "In post-Soviet states including Azerbaijan, these digital undergrounds often exhibit distinctive characteristics reflecting local economic conditions and regulatory environments.",
          '"The shadow markets in this region benefit from a combination of advanced technical education and regulatory gaps," notes regional analyst Farid Mammadov. "Additionally, linguistic barriers create natural compartmentalization that provides additional security against international law enforcement efforts."',
        ],
      },
    ],
    source: "Tech Edge Magazine",
    date: "2003-02-05",
    url: "https://techedge.com/articles/tech-underground-2003",
  },

  "https://bpd.gov.az/public-notices/missing/karimov-alex": {
    title: "Missing Persons Report: Alex Karimov",
    content: [
      {
        heading: "MISSING PERSON BULLETIN",
        paragraphs: [
          "The Baku Police Department is seeking information regarding the whereabouts of Alex Karimov, age 32, last seen on March 12, 2023 at his residence in the Nizami district.",
          "DESCRIPTION: Male, approximately 182cm tall, 78kg, with black hair and brown eyes. Notable identifying feature: serpent tattoo on right forearm.",
          "Mr. Karimov is employed as a cybersecurity specialist at AzTech Solutions and failed to report to work for three consecutive days, which colleagues describe as highly uncharacteristic.",
          "His apartment showed no signs of forced entry or struggle, though his work laptop and several personal items appear to be missing. Surveillance footage from the building shows him entering on the evening of March 12 but no record of his departure.",
        ],
      },
      {
        heading: "INVESTIGATION STATUS",
        paragraphs: [
          "Initial investigation reveals Mr. Karimov had recently completed a major security infrastructure project for his employer. Colleagues report no unusual behavior or concerns in the days preceding his disappearance.",
          "Phone records indicate his mobile device was powered off at approximately 23:47 on March 12, with no subsequent activity detected.",
          "Financial records show no unusual transactions or withdrawals, and his passport remains at his residence.",
        ],
      },
      {
        heading: "CONTACT INFORMATION",
        paragraphs: [
          "Anyone with information regarding Mr. Karimov's whereabouts is urged to contact Inspector Mammadov at the Baku Police Department, Central Precinct.",
          "Case reference number: BPD-2023-0472",
          "Anonymous tips may be submitted through the department's secure reporting system at https://tips.bpd.gov.az",
        ],
      },
    ],
    source: "Baku Police Department",
    date: "2003-03-17",
    url: "https://bpd.gov.az/public-notices/missing/karimov-alex",
  },

  "https://bpd.gov.az/public-notices/missing/mahmudova-leyla": {
    title: "Missing Persons Report: Dr. Leyla Mahmudova",
    content: [
      {
        heading: "MISSING PERSON BULLETIN",
        paragraphs: [
          "The Baku Police Department is seeking information regarding the whereabouts of Dr. Leyla Mahmudova, age 38, last seen on March 17, 2023 leaving her workplace at Central City Hospital.",
          "DESCRIPTION: Female, approximately 165cm tall, 62kg, with brown hair and green eyes. Identifying feature: surgical scar on left wrist.",
          "Dr. Mahmudova is employed as a neurologist at Central City Hospital and failed to arrive for her scheduled shift on March 18, which colleagues describe as unprecedented.",
          "Investigation of her apartment revealed signs of disturbance, though no conclusive evidence of forced entry. Her medical bag was found at the scene, but her hospital identification badge and personal mobile phone are missing.",
        ],
      },
      {
        heading: "INVESTIGATION STATUS",
        paragraphs: [
          "Preliminary investigation indicates Dr. Mahmudova was subject to a professional review by the Medical Licensing Board relating to potential irregularities in prescription practices, though no formal findings had been issued prior to her disappearance.",
          "Hospital security footage shows Dr. Mahmudova leaving the facility at 19:42 on March 17. No surveillance footage of her apartment building entrance is available due to maintenance issues with the security system.",
          "Financial records show a cash withdrawal of 500 AZN on the morning of March 17, which family members indicate was not unusual.",
        ],
      },
      {
        heading: "CONTACT INFORMATION",
        paragraphs: [
          "Anyone with information regarding Dr. Mahmudova's whereabouts is urged to contact Inspector Mammadov at the Baku Police Department, Central Precinct.",
          "Case reference number: BPD-2023-0488",
          "Anonymous tips may be submitted through the department's secure reporting system at https://tips.bpd.gov.az",
        ],
      },
    ],
    source: "Baku Police Department",
    date: "2003-03-20",
    url: "https://bpd.gov.az/public-notices/missing/mahmudova-leyla",
  },

  "https://bpd.gov.az/public-notices/missing/nasirov-ibrahim": {
    title: "Missing Persons Report: Ibrahim Nasirov",
    content: [
      {
        heading: "MISSING PERSON BULLETIN",
        paragraphs: [
          "The Baku Police Department is seeking information regarding the whereabouts of Ibrahim Nasirov, age 45, last seen on March 24, 2023 entering his residence in the Industrial District, White City Complex B.",
          "DESCRIPTION: Male, approximately 175cm tall, 82kg, with salt-and-pepper hair and brown eyes. Identifying feature: burn scar on right hand.",
          "Mr. Nasirov is employed as a Senior Industrial Systems Engineer at BakuOil Technologies and failed to report to a scheduled system maintenance operation on March 25, which colleagues describe as highly unusual given his record of reliability.",
          "Investigation of his apartment revealed the electricity had been manually disabled at the circuit breaker. His work laptop was present but powered down, and several personal items appear to be missing.",
        ],
      },
      {
        heading: "INVESTIGATION STATUS",
        paragraphs: [
          "Initial investigation indicates Mr. Nasirov had recently completed downloading technical documentation related to a system modernization project at BakuOil Technologies. His employer has confirmed these actions were authorized but noted the unusual timing of the downloads.",
          "Building security footage shows Mr. Nasirov entering his apartment at 18:23 on March 24, but no record of his departure exists. The building's rear exit is not covered by surveillance cameras.",
          "Financial records show no unusual recent activity, though investigators note multiple transfers to foreign accounts over the past six months, which family members indicate were related to technical consulting work.",
        ],
      },
      {
        heading: "CONTACT INFORMATION",
        paragraphs: [
          "Anyone with information regarding Mr. Nasirov's whereabouts is urged to contact Inspector Aliyev at the Baku Police Department, Industrial District Precinct.",
          "Case reference number: BPD-2023-0513",
          "Anonymous tips may be submitted through the department's secure reporting system at https://tips.bpd.gov.az",
        ],
      },
    ],
    source: "Baku Police Department",
    date: "2003-03-27",
    url: "https://bpd.gov.az/public-notices/missing/nasirov-ibrahim",
  },

  "https://digitalreviews.az/software/network-protection-2002": {
    title: "Network Protection Software Reviews 2002",
    content: [
      {
        heading: "Top Security Solutions of the Year",
        paragraphs: [
          "Our annual review of network security solutions examines the most effective tools for protecting corporate and institutional digital infrastructure against increasingly sophisticated threats.",
          "This year's testing methodology involved controlled penetration attempts against standardized network configurations, measuring both prevention capabilities and system impact.",
        ],
      },
      {
        heading: "CobraSystems' Venom - Advanced Protection Suite",
        paragraphs: [
          "CobraSystems' flagship product Venom ranked highly in our penetration testing, offering comprehensive protection against 94% of attempted intrusions with minimal system performance impact.",
          "Particularly impressive was Venom's adaptive response mechanism, which demonstrated learning capabilities during sustained attack scenarios.",
          "The solution employs a multi-layered approach combining traditional signature detection with behavioral analysis and network traffic pattern recognition.",
          'Notable features include its proprietary "Serpent Protocol" which creates dynamic encrypted tunnels for sensitive data transmission that proved resistant to even our most aggressive interception attempts.',
        ],
      },
      {
        heading: "Technical Analysis",
        paragraphs: [
          "The core architecture employs a distributed agent model that provides coverage across network endpoints without creating significant bottlenecks.",
          "During testing, we observed the system successfully identifying and neutralizing zero-day exploit attempts that bypassed other protection solutions in our comparison group.",
          "System administrators will appreciate the comprehensive logging and visualization tools, though the complexity of configuration options may present a steep learning curve for organizations without dedicated security personnel.",
        ],
      },
      {
        heading: "Developer Background",
        paragraphs: [
          "CobraSystems was founded in 2000 by Alex Karimov, formerly of the Azerbaijan Technical University's cybersecurity research division. The company has quickly established itself as an innovative player in the regional security landscape.",
          "According to company representatives, Venom represents the culmination of Karimov's research into predictive threat modeling and adaptive defense mechanisms.",
        ],
      },
    ],
    source: "Digital Reviews",
    date: "2002-10-17",
    url: "https://digitalreviews.az/software/network-protection-2002",
  },

  "https://industrialtech.az/security/prometheus-protocol": {
    title: "Industrial Systems Security: The Prometheus Protocol",
    content: [
      {
        heading: "Emerging Security Framework for Critical Infrastructure",
        paragraphs: [
          "Developed by a team of anonymous security researchers, the Prometheus Protocol aims to address vulnerabilities in industrial control systems by implementing a comprehensive security framework specifically designed for SCADA networks and industrial automation systems.",
          "Unlike conventional IT security approaches, the Prometheus Protocol acknowledges the unique constraints and requirements of industrial environments, including legacy systems, real-time operation requirements, and the catastrophic potential of security breaches.",
        ],
      },
      {
        heading: "Core Components",
        paragraphs: [
          "The framework consists of three primary components, referred to in documentation as 'Fire', 'Knowledge', and 'Creation' - a reference to the mythological figure after which it is named.",
          "'Fire' provides deep inspection capabilities for industrial network traffic, identifying anomalous commands and unauthorized access attempts without requiring modification to existing infrastructure.",
          "'Knowledge' comprises a continuously updated threat intelligence database specifically focused on industrial systems vulnerabilities and attack methodologies.",
          "'Creation' delivers adaptive protection mechanisms that can be deployed without disrupting critical operations, a significant advantage over traditional security approaches that often require system downtime for implementation.",
        ],
      },
      {
        heading: "Implementation Challenges",
        paragraphs: [
          "Despite its technical merits, the Prometheus Protocol faces significant implementation challenges, primarily due to its anonymous development and distribution. Major industrial operators express reluctance to implement security solutions without vendor accountability structures.",
          "Regulatory frameworks in many jurisdictions present additional obstacles, as certification processes typically require developer disclosure and code review that anonymous creators cannot provide.",
          "Nevertheless, elements of the protocol have been observed in implementation across several industrial sectors, suggesting unofficial adoption despite these limitations.",
        ],
      },
      {
        heading: "Controversy",
        paragraphs: [
          "The security community remains divided regarding the Prometheus Protocol, with some experts praising its innovative approach to industrial system protection while others express concern about potential backdoors or vulnerabilities that cannot be independently verified due to the developers' anonymity.",
          "Particularly controversial is the protocol's 'Fire' component, which demonstrates capabilities that suggest intimate knowledge of proprietary industrial control systems that would typically not be available through public documentation.",
        ],
      },
    ],
    source: "Industrial Technology Magazine",
    date: "2022-11-30",
    url: "https://industrialtech.az/security/prometheus-protocol",
  },
};

const WebContent = ({ url, onClose, onNavigate, onBookmark }) => {
  // Error checking for invalid URL
  if (!url) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.navigationControls}>
            <button className={styles.navButton} disabled>
              <ChevronLeft size={18} />
            </button>
            <button className={styles.navButton} disabled>
              <ChevronRight size={18} />
            </button>
          </div>

          <div className={styles.urlBar}>
            <Globe size={14} className={styles.urlIcon} />
            <span className={styles.urlText}>No URL specified</span>
          </div>

          <div className={styles.headerControls}>
            <button className={styles.closeButton} onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>
        <div className={styles.errorContainer}>
          <AlertTriangle size={30} className={styles.errorIcon} />
          <div className={styles.errorText}>
            No URL specified. Please select a search result to view content.
          </div>
        </div>
      </div>
    );
  }

  // Get theme configuration
  const themeConfig = useThemeStore((state) => state.themeConfig);
  const effectsEnabled = useThemeStore((state) => state.effectsEnabled);

  // Get bookmark status from store
  const isBookmarked = useSearchEngineStore((state) => state.isBookmarked(url));

  // Local state
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visitHistory, setVisitHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  // Load content when URL changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate network delay
    const timer = setTimeout(() => {
      try {
        // Try to find this URL in our mock content
        if (WEB_CONTENT[url]) {
          setContent(WEB_CONTENT[url]);

          // Add to history if this is a new navigation
          if (!visitHistory.includes(url)) {
            setVisitHistory((prev) => [...prev, url]);
            setCurrentHistoryIndex(visitHistory.length);
          }
        } else {
          setError(
            "Content not found. The page might be unavailable or restricted."
          );
        }
      } catch (err) {
        setError("Error loading content: " + err.message);
      } finally {
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [url]);

  // Toggle bookmark
  const handleToggleBookmark = () => {
    onBookmark(url, content?.title || "Untitled Page");
  };

  // Handle back navigation
  const handleBack = () => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(newIndex);
      if (onNavigate) {
        onNavigate(visitHistory[newIndex]);
      }
    }
  };

  // Handle forward navigation
  const handleForward = () => {
    if (currentHistoryIndex < visitHistory.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(newIndex);
      if (onNavigate) {
        onNavigate(visitHistory[newIndex]);
      }
    }
  };

  // Format the date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    } catch {
      return dateString; // Return as is if invalid
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.navigationControls}>
            <button
              className={styles.navButton}
              onClick={handleBack}
              disabled={currentHistoryIndex <= 0}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className={styles.navButton}
              onClick={handleForward}
              disabled={currentHistoryIndex >= visitHistory.length - 1}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className={styles.urlBar}>
            <Globe size={14} className={styles.urlIcon} />
            <span className={styles.urlText}>{url}</span>
          </div>

          <div className={styles.headerControls}>
            <button className={styles.closeButton} onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingAnimation}>
            <div className={styles.loadingBar}></div>
          </div>
          <div className={styles.loadingText}>Loading content...</div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.navigationControls}>
            <button
              className={styles.navButton}
              onClick={handleBack}
              disabled={currentHistoryIndex <= 0}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className={styles.navButton}
              onClick={handleForward}
              disabled={currentHistoryIndex >= visitHistory.length - 1}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className={styles.urlBar}>
            <Globe size={14} className={styles.urlIcon} />
            <span className={styles.urlText}>{url}</span>
          </div>

          <div className={styles.headerControls}>
            <button className={styles.closeButton} onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>
        <div className={styles.errorContainer}>
          <AlertTriangle size={30} className={styles.errorIcon} />
          <div className={styles.errorText}>{error}</div>
        </div>
      </div>
    );
  }

  // If no content, show empty state
  if (!content) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.navigationControls}>
            <button
              className={styles.navButton}
              onClick={handleBack}
              disabled={currentHistoryIndex <= 0}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className={styles.navButton}
              onClick={handleForward}
              disabled={currentHistoryIndex >= visitHistory.length - 1}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className={styles.urlBar}>
            <Globe size={14} className={styles.urlIcon} />
            <span className={styles.urlText}>{url}</span>
          </div>

          <div className={styles.headerControls}>
            <button className={styles.closeButton} onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>
        <div className={styles.emptyContainer}>
          <div className={styles.emptyText}>No content available.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header with navigation */}
      <div className={styles.header}>
        <div className={styles.navigationControls}>
          <button
            className={styles.navButton}
            onClick={handleBack}
            disabled={currentHistoryIndex <= 0}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className={styles.navButton}
            onClick={handleForward}
            disabled={currentHistoryIndex >= visitHistory.length - 1}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className={styles.urlBar}>
          <Globe size={14} className={styles.urlIcon} />
          <span className={styles.urlText}>{url}</span>
        </div>

        <div className={styles.headerControls}>
          <button
            className={styles.bookmarkButton}
            onClick={handleToggleBookmark}
            title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <BookmarkPlus
              size={18}
              className={isBookmarked ? styles.bookmarkedIcon : ""}
            />
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        {/* Page title */}
        <h1 className={styles.title}>{content.title}</h1>

        {/* Metadata */}
        <div className={styles.metadata}>
          <div className={styles.source}>
            <span className={styles.sourceLabel}>Source:</span> {content.source}
          </div>
          <div className={styles.date}>
            <Clock size={14} className={styles.dateIcon} />
            {formatDate(content.date)}
          </div>
        </div>

        {/* Content sections */}
        <div className={styles.textContent}>
          {content.content.map((section, index) => (
            <div key={index} className={styles.section}>
              {section.heading && (
                <h2 className={styles.sectionHeading}>{section.heading}</h2>
              )}
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Related Pages - Just showing other available pages for simplicity */}
        <div className={styles.relatedPages}>
          <h3 className={styles.relatedPagesHeading}>Related Pages</h3>
          <div className={styles.relatedList}>
            {Object.keys(WEB_CONTENT)
              .filter((pageUrl) => pageUrl !== url)
              .slice(0, 3)
              .map((pageUrl, index) => {
                const pageInfo = WEB_CONTENT[pageUrl];
                if (!pageInfo) return null;

                return (
                  <div
                    key={index}
                    className={styles.relatedItem}
                    onClick={() => onNavigate && onNavigate(pageUrl)}
                  >
                    <div className={styles.relatedTitle}>{pageInfo.title}</div>
                    <div className={styles.relatedSource}>
                      {pageInfo.source}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Apply scanline effect if enabled */}
      {effectsEnabled?.scanlines && <Scanlines opacity={0.1} />}
    </div>
  );
};

export default WebContent;
