// components/apps/darkWeb/Marketplace/MarketplaceBrowser.jsx
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ArrowDownAZ,
  DollarSign,
  Star,
  CheckCircle,
  SortDesc,
} from "lucide-react";
import { useDarkWebStore } from "../../../../store/darkWebStore";
import styles from "./MarketplaceBrowser.module.scss";

const MarketplaceBrowser = () => {
  // Get marketplace data and actions from store
  const search = useDarkWebStore((state) => state.search);
  const setCategory = useDarkWebStore((state) => state.setCategory);
  const setSortBy = useDarkWebStore((state) => state.setSortBy);
  const viewListing = useDarkWebStore((state) => state.viewListing);
  const viewVendor = useDarkWebStore((state) => state.viewVendor);
  const searchQuery = useDarkWebStore((state) => state.searchQuery);
  const selectedCategory = useDarkWebStore((state) => state.selectedCategory);
  const sortBy = useDarkWebStore((state) => state.sortBy);
  const categories = useDarkWebStore((state) => state.categories);
  const getFilteredListings = useDarkWebStore(
    (state) => state.getFilteredListings
  );

  // Local state
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showFilters, setShowFilters] = useState(false);

  // Reset local search query when the global one changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Handle search input
  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    search(localSearchQuery);
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  // Handle sort method selection
  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Get the filtered and sorted listings
  const listings = getFilteredListings();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>SHADOW MARKET</h1>
        <div className={styles.headerRight}>
          <div className={styles.networkStatus}>
            <div className={styles.statusIndicator}></div>
            <span>SECURE CONNECTION ESTABLISHED</span>
          </div>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search Shadow Market..."
            value={localSearchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className={styles.searchButton}>
            <Search size={18} />
          </button>
        </form>

        <button className={styles.filtersButton} onClick={toggleFilters}>
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && (
        <div className={styles.filtersContainer}>
          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>Category:</div>
            <div className={styles.filterOptions}>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`${styles.filterOption} ${
                    selectedCategory === category ? styles.active : ""
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>Sort By:</div>
            <div className={styles.filterOptions}>
              <button
                className={`${styles.filterOption} ${
                  sortBy === "featured" ? styles.active : ""
                }`}
                onClick={() => handleSortChange("featured")}
              >
                <Star size={14} /> Featured
              </button>
              <button
                className={`${styles.filterOption} ${
                  sortBy === "price-low" ? styles.active : ""
                }`}
                onClick={() => handleSortChange("price-low")}
              >
                <SortDesc size={14} /> Price (Low-High)
              </button>
              <button
                className={`${styles.filterOption} ${
                  sortBy === "price-high" ? styles.active : ""
                }`}
                onClick={() => handleSortChange("price-high")}
              >
                <DollarSign size={14} /> Price (High-Low)
              </button>
              <button
                className={`${styles.filterOption} ${
                  sortBy === "rating" ? styles.active : ""
                }`}
                onClick={() => handleSortChange("rating")}
              >
                <ArrowDownAZ size={14} /> Rating
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.resultsInfo}>
        {listings.length} {listings.length === 1 ? "listing" : "listings"} found
        {searchQuery && ` for "${searchQuery}"`}
        {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
      </div>

      <div className={styles.listingsGrid}>
        {listings.map((listing) => (
          <div
            key={listing.id}
            className={styles.listingCard}
            onClick={() => viewListing(listing.id)}
          >
            <div className={styles.listingTitle} data-text={listing.title}>
              {listing.title}
              {listing.verified && (
                <CheckCircle size={14} className={styles.verifiedIcon} />
              )}
            </div>

            <div className={styles.listingDescription}>
              {listing.description}
            </div>

            <div className={styles.listingMeta}>
              <div
                className={styles.listingVendor}
                onClick={(e) => {
                  e.stopPropagation();
                  viewVendor(listing.vendor);
                }}
              >
                {listing.vendor}
              </div>
              <div className={styles.listingRating}>
                {listing.ratings.toFixed(1)} ★ ({listing.transactions})
              </div>
            </div>

            <div className={styles.listingFooter}>
              <div className={styles.listingId}>{listing.id}</div>
              <div className={styles.listingPrice}>
                ₡ {listing.price.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {listings.length === 0 && (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>?</div>
          <h3>No listings found</h3>
          <p>Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default MarketplaceBrowser;
