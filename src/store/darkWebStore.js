// src/store/darkWebStore.js
import { create } from "zustand";

// Constants
import { VENDORS } from "../data/vendors";
import { LISTINGS } from "../data/listings";

// Categories for the marketplace
const CATEGORIES = [
  "All Categories",
  "Software",
  "Documents",
  "Identity",
  "Data",
  "Hardware",
  "Services",
];

const useDarkWebStore = create((set, get) => ({
  // Connection state
  isConnected: false,
  isConnecting: false,
  connectionError: null,

  // Authentication state
  isAuthenticated: false,
  currentVendor: null,

  // Navigation state
  currentPage: "market", // 'market', 'vendor', 'item'
  searchQuery: "",
  selectedCategory: "All Categories",
  sortBy: "featured", // 'featured', 'price-low', 'price-high', 'rating'

  // Data collections
  categories: CATEGORIES,
  vendors: VENDORS,
  listings: LISTINGS,

  // Selected items
  selectedVendor: null,
  selectedListing: null,

  // Connection timestamp for realism
  connectionStartTime: null,

  // Connect to the dark web
  connect: () => {
    set({ isConnecting: true, connectionError: null });

    // Simulate connection delay
    setTimeout(() => {
      set({
        isConnected: true,
        isConnecting: false,
        connectionStartTime: new Date(),
        currentPage: "market",
      });
    }, 3000);
  },

  // Disconnect from the dark web
  disconnect: () => {
    set({
      isConnected: false,
      isConnecting: false,
      connectionStartTime: null,
      currentPage: null,
      selectedVendor: null,
      selectedListing: null,
    });
  },

  // Clean up when unmounting component
  cleanup: () => {
    set({
      isConnected: false,
      isConnecting: false,
      connectionStartTime: null,
      currentPage: null,
      selectedVendor: null,
      selectedListing: null,
      searchQuery: "",
      selectedCategory: "All Categories",
      sortBy: "featured",
    });
  },

  // Get formatted connection time
  getFormattedConnectionTime: () => {
    const { connectionStartTime } = get();
    if (!connectionStartTime) return "00:00:00";

    const diff = new Date() - connectionStartTime;
    const hours = Math.floor(diff / 3600000)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((diff % 3600000) / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((diff % 60000) / 1000)
      .toString()
      .padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  },

  // Search functionality
  search: () => {
    const { searchQuery } = get();
    // Searching happens instantly, we don't need a delay here
    // We could add logic to filter listings based on the search query if needed
  },

  // Set search query
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  // Set selected category
  setCategory: (category) => {
    set({ selectedCategory: category });
  },

  // Set sort method
  setSortBy: (sortMethod) => {
    set({ sortBy: sortMethod });
  },

  // View marketplace
  viewMarket: () => {
    set({ currentPage: "market", selectedVendor: null, selectedListing: null });
  },

  // View vendor profile
  viewVendor: (vendorId) => {
    set({
      currentPage: "vendor",
      selectedVendor: vendorId,
      selectedListing: null,
    });
  },

  // View listing details
  viewListing: (listingId) => {
    const listing = get().listings.find((item) => item.id === listingId);
    if (listing) {
      set({
        currentPage: "item",
        selectedListing: listing,
      });
    }
  },

  // Get filtered listings based on search, category, and sort
  getFilteredListings: () => {
    const { listings, searchQuery, selectedCategory, sortBy } = get();

    // Filter by search query and category
    let filteredListings = listings.filter((listing) => {
      const matchesSearch = searchQuery
        ? listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesCategory =
        selectedCategory === "All Categories" ||
        listing.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort the listings
    switch (sortBy) {
      case "price-low":
        return filteredListings.sort((a, b) => a.price - b.price);
      case "price-high":
        return filteredListings.sort((a, b) => b.price - a.price);
      case "rating":
        return filteredListings.sort((a, b) => b.ratings - a.ratings);
      case "featured":
      default:
        // For featured, we could implement a more complex sorting logic
        // For now, let's just sort by a combination of ratings and transactions
        return filteredListings.sort(
          (a, b) =>
            b.ratings * 0.7 +
            b.transactions * 0.3 -
            (a.ratings * 0.7 + a.transactions * 0.3)
        );
    }
  },

  // Get listings for a specific vendor
  getVendorListings: (vendorId) => {
    const { listings } = get();
    return listings.filter((listing) => listing.vendor === vendorId);
  },

  // Authenticate as a vendor (after cracking)
  authenticateAsVendor: (vendorId) => {
    const vendors = { ...get().vendors };

    if (vendors[vendorId]) {
      // Update the vendor access flag
      vendors[vendorId] = {
        ...vendors[vendorId],
        accessUnlocked: true,
      };

      set({
        vendors,
        isAuthenticated: true,
        currentVendor: vendorId,
      });

      return true;
    }

    return false;
  },
}));

export { useDarkWebStore };
