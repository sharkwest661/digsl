// components/apps/searchEngine/SearchEngine.jsx
import React, { useState, useEffect } from "react";
import {
  Search,
  History,
  Bookmark,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { useThemeStore } from "../../../store";
import { Scanlines } from "../../effects/Scanlines";
import styles from "./SearchEngine.module.scss";

// Mock search results data
const SEARCH_RESULTS = {
  "shadow market": [
    {
      title: "Black Markets in Post-Soviet States - Economic Analysis",
      url: "https://economicreview.az/markets/black-markets-post-soviet",
      snippet:
        "...the term 'shadow market' is often used to describe unofficial economic activity. In Azerbaijan, these markets evolved significantly during the early 2000s...",
      date: "2002-11-25",
      source: "Economic Review Journal",
    },
    {
      title: "Rise in Cybercrime Concerns Authorities",
      url: "https://bakutoday.az/news/cybercrime-rise-2003",
      snippet:
        "...authorities have expressed concern over what they call a 'shadow market' of digital transactions occurring outside regulated channels...",
      date: "2003-01-18",
      source: "Baku Today",
    },
    {
      title: "Tech Underground: Where Digital Meets Criminal",
      url: "https://techedge.com/articles/tech-underground-2003",
      snippet:
        "...forums where digital contraband is traded have created a sophisticated shadow market with its own rules and economy...",
      date: "2003-02-05",
      source: "Tech Edge Magazine",
    },
  ],
  "alex karimov": [
    {
      title: "Azerbaijani Tech Expert Wins Regional Competition",
      url: "https://techweekly.az/competitions/regional-winners-2002",
      snippet:
        "...security specialist Alex Karimov took first place with his innovative approach to network protection...",
      date: "2002-08-12",
      source: "Tech Weekly Azerbaijan",
    },
    {
      title: "Missing Persons Report: Alex Karimov",
      url: "https://bpd.gov.az/public-notices/missing/karimov-alex",
      snippet:
        "The Baku Police Department is seeking information regarding the whereabouts of Alex Karimov, age 32, last seen on March 12, 2023...",
      date: "2003-03-17",
      source: "Baku Police Department",
    },
  ],
  "leyla mahmudova": [
    {
      title: "Central City Hospital Welcomes New Neurologist",
      url: "https://cch.gov.az/news/new-staff-2016",
      snippet:
        "...Dr. Leyla Mahmudova joins our neurology department, bringing expertise from her training in Berlin...",
      date: "2016-03-15",
      source: "Central City Hospital",
    },
    {
      title: "Missing Persons Report: Dr. Leyla Mahmudova",
      url: "https://bpd.gov.az/public-notices/missing/mahmudova-leyla",
      snippet:
        "The Baku Police Department is seeking information regarding the whereabouts of Dr. Leyla Mahmudova, age 38, last seen on March 17, 2023...",
      date: "2003-03-20",
      source: "Baku Police Department",
    },
  ],
  "ibrahim nasirov": [
    {
      title: "BakuOil Technologies Announces Modernization Project",
      url: "https://bakuoil.az/news/modernization-legacy-systems",
      snippet:
        "...leading the project is senior engineer Ibrahim Nasirov, who specializes in industrial control systems...",
      date: "2022-04-10",
      source: "BakuOil Corporate News",
    },
    {
      title: "Engineering Conference Highlights Infrastructure Security",
      url: "https://techeng.az/conferences/infrastructure-security-2022",
      snippet:
        "...notable presentation by Ibrahim Nasirov on protecting legacy systems from modern threats...",
      date: "2022-09-05",
      source: "Tech Engineering Association",
    },
    {
      title: "Missing Persons Report: Ibrahim Nasirov",
      url: "https://bpd.gov.az/public-notices/missing/nasirov-ibrahim",
      snippet:
        "The Baku Police Department is seeking information regarding the whereabouts of Ibrahim Nasirov, age 45, last seen on March 24, 2023...",
      date: "2003-03-27",
      source: "Baku Police Department",
    },
  ],
  cyberpunk: [
    {
      title: "The Aesthetics of Technology: Cyberpunk in Modern Cinema",
      url: "https://filmreview.az/essays/cyberpunk-aesthetics",
      snippet:
        "...the cyberpunk genre continues to influence visual media, combining high technology with societal breakdown...",
      date: "2002-12-10",
      source: "Film Review Azerbaijan",
    },
    {
      title: "Digital Literature Trends: From Cyberpunk to Post-Digital",
      url: "https://litjournal.az/trends/digital-literature",
      snippet:
        "...cyberpunk narratives have evolved from cautionary tales to reflections of our current digital reality...",
      date: "2003-01-30",
      source: "Literary Journal",
    },
  ],
  venom: [
    {
      title: "Digital Security Firm CobraSystems Launches New Protection Suite",
      url: "https://techbusiness.az/security/cobrasystems-launches-venom",
      snippet:
        "...named 'Venom', the new security suite promises advanced protection against network intrusions...",
      date: "2002-07-22",
      source: "Tech Business News",
    },
    {
      title: "Network Protection Software Reviews 2002",
      url: "https://digitalreviews.az/software/network-protection-2002",
      snippet:
        "...CobraSystems' Venom ranked highly in our penetration testing, offering comprehensive protection...",
      date: "2002-10-17",
      source: "Digital Reviews",
    },
  ],
  prometheus: [
    {
      title: "Greek Mythology in Modern Technology Branding",
      url: "https://brandingtoday.az/articles/mythology-tech-branding",
      snippet:
        "...from Apollo to Prometheus, ancient Greek figures continue to inspire technology company names...",
      date: "2002-05-08",
      source: "Branding Today",
    },
    {
      title: "Industrial Systems Security: The Prometheus Protocol",
      url: "https://industrialtech.az/security/prometheus-protocol",
      snippet:
        "...developed by a team of anonymous security researchers, the Prometheus Protocol aims to address vulnerabilities in industrial systems...",
      date: "2022-11-30",
      source: "Industrial Technology Magazine",
    },
  ],
  "ghost doc": [
    {
      title: "Digital Document Management Systems Review",
      url: "https://officetechreview.az/document-management-2002",
      snippet:
        "...GhostDoc offers seamless integration with existing systems while maintaining robust document security...",
      date: "2002-06-14",
      source: "Office Tech Review",
    },
  ],
  fire: [
    {
      title: "Prometheus_X Releases 'Fire' Data Extraction Tool",
      url: "https://underground.forums/tools/prometheusX-fire-release",
      snippet: "[Content removed by administrator]",
      date: "[Redacted]",
      source: "[Redacted]",
    },
  ],
};

// Common search terms relevant to the investigation
const SUGGESTED_SEARCHES = [
  "shadow market",
  "alex karimov",
  "leyla mahmudova",
  "ibrahim nasirov",
  "cyberpunk",
  "venom",
  "prometheus",
  "ghost doc",
  "fire",
];

const SearchEngine = () => {
  // Get theme configuration
  const themeConfig = useThemeStore((state) => state.themeConfig);
  const effectsEnabled = useThemeStore((state) => state.effectsEnabled);

  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showError, setShowError] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setResults([]);
    setNoResults(false);
    setShowError(false);

    // Add to search history if not already there
    if (!searchHistory.includes(searchQuery.toLowerCase())) {
      setSearchHistory((prev) =>
        [searchQuery.toLowerCase(), ...prev].slice(0, 10)
      );
    }

    // Simulate network delay
    setTimeout(() => {
      const query = searchQuery.toLowerCase();

      // Check if we have mock results for this query
      let foundResults = [];

      // Check for exact matches first
      if (SEARCH_RESULTS[query]) {
        foundResults = SEARCH_RESULTS[query];
      } else {
        // Check for partial matches
        for (const key in SEARCH_RESULTS) {
          if (key.includes(query) || query.includes(key)) {
            foundResults = [...foundResults, ...SEARCH_RESULTS[key]];
          }
        }

        // Check if any result snippets or titles contain the query
        for (const key in SEARCH_RESULTS) {
          for (const result of SEARCH_RESULTS[key]) {
            if (
              !foundResults.includes(result) &&
              (result.title.toLowerCase().includes(query) ||
                result.snippet.toLowerCase().includes(query))
            ) {
              foundResults.push(result);
            }
          }
        }
      }

      // Remove duplicates
      foundResults = [...new Set(foundResults)];

      if (foundResults.length > 0) {
        setResults(foundResults);
      } else {
        setNoResults(true);
      }

      setIsSearching(false);
    }, 1200); // Search delay for realism
  };

  // Handle input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Update suggestions
    if (value.trim()) {
      const lowercaseValue = value.toLowerCase();
      const filtered = SUGGESTED_SEARCHES.filter((term) =>
        term.toLowerCase().includes(lowercaseValue)
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    // Auto-search the suggestion
    setIsSearching(true);
    setResults([]);
    setNoResults(false);
    setShowError(false);

    // Add to search history
    if (!searchHistory.includes(suggestion.toLowerCase())) {
      setSearchHistory((prev) =>
        [suggestion.toLowerCase(), ...prev].slice(0, 10)
      );
    }

    // Simulate network delay
    setTimeout(() => {
      if (SEARCH_RESULTS[suggestion.toLowerCase()]) {
        setResults(SEARCH_RESULTS[suggestion.toLowerCase()]);
      } else {
        setNoResults(true);
      }
      setIsSearching(false);
    }, 1200);
  };

  // Handle history click
  const handleHistoryClick = (historyItem) => {
    setSearchQuery(historyItem);
    // Auto-search
    setIsSearching(true);
    setResults([]);
    setNoResults(false);
    setShowError(false);

    // Simulate network delay
    setTimeout(() => {
      if (SEARCH_RESULTS[historyItem.toLowerCase()]) {
        setResults(SEARCH_RESULTS[historyItem.toLowerCase()]);
      } else {
        setNoResults(true);
      }
      setIsSearching(false);
    }, 1200);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setResults([]);
    setNoResults(false);
    setSuggestions([]);
    setShowError(false);
  };

  // Effect to simulate some network issues occasionally
  useEffect(() => {
    if (isSearching) {
      const shouldShowError = Math.random() < 0.05; // 5% chance of error
      if (shouldShowError) {
        const timer = setTimeout(() => {
          setIsSearching(false);
          setShowError(true);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [isSearching]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoText}>NEXA</span>
          <span className={styles.logoSecondary}>FIND</span>
        </div>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
              placeholder="Search the web..."
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClearSearch}
              >
                ×
              </button>
            )}
            <button type="submit" className={styles.searchButton}>
              {isSearching ? (
                <RefreshCw size={18} className={styles.loadingIcon} />
              ) : (
                <Search size={18} />
              )}
            </button>

            {/* Search suggestions */}
            {suggestions.length > 0 && (
              <div className={styles.suggestions}>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={styles.suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <Search size={14} />
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </header>

      <div className={styles.contentContainer}>
        <aside className={styles.sidebar}>
          <div className={styles.historySection}>
            <div className={styles.sectionHeader}>
              <History size={16} />
              <span>Search History</span>
            </div>
            {searchHistory.length > 0 ? (
              <ul className={styles.historyList}>
                {searchHistory.map((item, index) => (
                  <li
                    key={index}
                    className={styles.historyItem}
                    onClick={() => handleHistoryClick(item)}
                  >
                    <Search size={14} className={styles.historyIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.emptyHistory}>No search history</div>
            )}
          </div>

          <div className={styles.bookmarksSection}>
            <div className={styles.sectionHeader}>
              <Bookmark size={16} />
              <span>Suggested Searches</span>
            </div>
            <ul className={styles.bookmarksList}>
              {SUGGESTED_SEARCHES.slice(0, 6).map((term, index) => (
                <li
                  key={index}
                  className={styles.bookmarkItem}
                  onClick={() => handleSuggestionClick(term)}
                >
                  <span>{term}</span>
                  <ChevronRight size={14} className={styles.bookmarkIcon} />
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className={styles.resultsContainer}>
          {isSearching ? (
            <div className={styles.loadingState}>
              <RefreshCw size={30} className={styles.loadingIcon} />
              <div className={styles.loadingText}>Searching the web...</div>
            </div>
          ) : showError ? (
            <div className={styles.errorState}>
              <AlertTriangle size={30} className={styles.errorIcon} />
              <div className={styles.errorTitle}>Connection Error</div>
              <div className={styles.errorMessage}>
                Unable to connect to search servers. Please check your
                connection and try again.
              </div>
              <button className={styles.retryButton} onClick={handleSearch}>
                Retry Search
              </button>
            </div>
          ) : noResults ? (
            <div className={styles.noResultsState}>
              <div className={styles.noResultsTitle}>No results found</div>
              <div className={styles.noResultsMessage}>
                Your search - <strong>{searchQuery}</strong> - did not match any
                documents.
              </div>
              <div className={styles.noResultsSuggestions}>
                Suggestions:
                <ul>
                  <li>Make sure all words are spelled correctly.</li>
                  <li>Try different keywords.</li>
                  <li>Try more general keywords.</li>
                </ul>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className={styles.searchResults}>
              <div className={styles.resultsInfo}>
                Found {results.length} results for "{searchQuery}"
              </div>

              <div className={styles.resultsList}>
                {results.map((result, index) => (
                  <div key={index} className={styles.resultItem}>
                    <a href="#" className={styles.resultTitle}>
                      {result.title}
                    </a>
                    <div className={styles.resultMeta}>
                      <div className={styles.resultUrl}>{result.url}</div>
                      <div className={styles.resultSource}>
                        {result.source} · {result.date}
                      </div>
                    </div>
                    <div className={styles.resultSnippet}>{result.snippet}</div>
                    <div className={styles.resultActions}>
                      <a href="#" className={styles.resultLink}>
                        <ExternalLink size={14} />
                        Visit Page
                      </a>
                      <a href="#" className={styles.resultLink}>
                        <Bookmark size={14} />
                        Save
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.initialState}>
              <div className={styles.initialStateContent}>
                <div className={styles.searchLogo}>
                  <span className={styles.initialLogoText}>NEXA</span>
                  <span className={styles.initialLogoSecondary}>FIND</span>
                </div>
                <div className={styles.initialMessage}>
                  Search for information about people, events, or topics.
                </div>
                <div className={styles.popularSearches}>
                  <div className={styles.popularSearchesTitle}>
                    Popular Searches:
                  </div>
                  <div className={styles.popularSearchTags}>
                    {SUGGESTED_SEARCHES.slice(0, 5).map((term, index) => (
                      <div
                        key={index}
                        className={styles.searchTag}
                        onClick={() => handleSuggestionClick(term)}
                      >
                        {term}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Apply scanline effect if enabled */}
      {effectsEnabled?.scanlines && <Scanlines opacity={0.2} />}
    </div>
  );
};

export default SearchEngine;
