// src/store/darkWebStore.js
import { create } from "zustand";

// Constants
const VENDORS = {
  CobraSystems: {
    id: "CobraSystems",
    realName: "Alex Karimov",
    specialty: "Network Security Exploits",
    status: "Missing",
    lastSeen: "March 12, 2023",
    clue: "Small toy snake on circuit board found at scene",
    profileQuote: "Security holes are just opportunities waiting to be found.",
    accessUnlocked: false,
  },
  GhostDoc: {
    id: "GhostDoc",
    realName: "Dr. Leyla Mahmudova",
    specialty: "Medical Credentials and Prescriptions",
    status: "Missing",
    lastSeen: "March 17, 2023",
    clue: "Antique medical caduceus wrapped in gauze",
    profileQuote: "Your medical identity is just a prescription away.",
    accessUnlocked: false,
  },
  Prometheus_X: {
    id: "Prometheus_X",
    realName: "Ibrahim Nasirov",
    specialty: "Industrial Sabotage Software",
    status: "Missing",
    lastSeen: "March 24, 2023",
    clue: "Small metal lighter with Greek lettering",
    profileQuote: "Bringing forbidden knowledge to mankind.",
    accessUnlocked: false,
  },
  MirrorMask: {
    id: "MirrorMask",
    realName: "Unknown",
    specialty: "Identity Theft and Impersonation",
    status: "Active",
    lastSeen: "Recent Activity",
    clue: "Unknown",
    profileQuote: "Everyone wears a mask, I just collect them.",
    accessUnlocked: false,
  },
  QuantumHarvest: {
    id: "QuantumHarvest",
    realName: "Unknown",
    specialty: "Data Harvesting and Information Sales",
    status: "Active",
    lastSeen: "Recent Activity",
    clue: "Unknown",
    profileQuote: "Your data is our most valuable crop.",
    accessUnlocked: false,
  },
};

// Sample listings for the marketplace
const LISTINGS = [
  {
    id: "NSE-1042",
    title: "Network Penetration Suite 2.0",
    description:
      "Complete toolkit for bypassing network security protocols. Tested on major enterprise systems with 94% success rate. Includes zero-day exploits and anti-detection modules.",
    price: 5999,
    ratings: 4.8,
    transactions: 124,
    category: "Software",
    vendor: "CobraSystems",
    verified: true,
  },
  {
    id: "MED-7734",
    title: "Medical License Generator",
    description:
      "Premium medical credential creation package. Includes templates for 14 specialties with embedded authentication markers that pass standard verification checks.",
    price: 4500,
    ratings: 4.7,
    transactions: 87,
    category: "Documents",
    vendor: "GhostDoc",
    verified: true,
  },
  {
    id: "IND-8821",
    title: "Industrial Control System Backdoor",
    description:
      "Specialized software for accessing industrial control systems. Created for SCADA networks with multi-layer security. Leaves minimal log footprint and includes remote activation modules.",
    price: 12000,
    ratings: 4.9,
    transactions: 36,
    category: "Software",
    vendor: "Prometheus_X",
    verified: true,
  },
  {
    id: "NSE-1055",
    title: "Corporate VPN Takeover Kit",
    description:
      "Advanced toolkit for compromising enterprise VPN systems. Targets major VPN providers with proprietary exploitation methods. Includes step-by-step documentation.",
    price: 8500,
    ratings: 4.6,
    transactions: 53,
    category: "Software",
    vendor: "CobraSystems",
    verified: true,
  },
  {
    id: "MED-7736",
    title: "Prescription Authorization Package",
    description:
      "Complete system for generating authorized prescriptions that pass pharmacy verification systems. Updated monthly with current authorization codes.",
    price: 3200,
    ratings: 4.5,
    transactions: 142,
    category: "Documents",
    vendor: "GhostDoc",
    verified: true,
  },
  {
    id: "IND-8823",
    title: "Infrastructure Blueprint Collection",
    description:
      "Classified technical documentation for critical infrastructure systems. Includes detailed schematics and security protocols for power grid implementations.",
    price: 15000,
    ratings: 4.8,
    transactions: 21,
    category: "Documents",
    vendor: "Prometheus_X",
    verified: true,
  },
  {
    id: "ID-2240",
    title: "Premium Identity Package",
    description:
      "Complete identity set with full background verification. Includes digital footprint history and supporting documentation that passes standard verification checks.",
    price: 7500,
    ratings: 4.7,
    transactions: 68,
    category: "Identity",
    vendor: "MirrorMask",
    verified: true,
  },
  {
    id: "DAT-5578",
    title: "Corporate Data Bundle - Finance Sector",
    description:
      "Comprehensive data collection from major financial institutions. Includes customer records, transaction histories, and internal communications from Q1-Q3 2023.",
    price: 20000,
    ratings: 4.9,
    transactions: 17,
    category: "Data",
    vendor: "QuantumHarvest",
    verified: true,
  },
];

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
