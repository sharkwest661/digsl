// store/darkWebStore.js
import { create } from "zustand";

// Mock market listing data
const MARKET_LISTINGS = [
  {
    id: "SM-42861",
    title: "Digital Enhancement",
    description:
      "Neural capabilities upgrade. Boost cognitive function, reaction time. 98% success rate. Discrete packaging. No questions asked.",
    price: 14500,
    category: "Pharmaceutical",
    vendor: "CobraSystems",
    ratings: 4.8,
    transactions: 247,
    verified: true,
    featured: true,
  },
  {
    id: "SM-29574",
    title: "Identity Package",
    description:
      "Complete documentation set. Passport, driver's license, birth certificate. Undetectable by standard verification. Custom background history.",
    price: 38200,
    category: "Services",
    vendor: "MirrorMask",
    ratings: 4.6,
    transactions: 183,
    verified: true,
    featured: false,
  },
  {
    id: "SM-18306",
    title: "Corporate Access",
    description:
      "Login credentials to major financial systems. Updated weekly. Use with caution. Non-refundable. Success rate varies by security protocols.",
    price: 22750,
    category: "Digital Goods",
    vendor: "GhostDoc",
    ratings: 4.3,
    transactions: 129,
    verified: true,
    featured: true,
  },
  {
    id: "SM-75120",
    title: "Memory Erasure",
    description:
      "Experimental compound causes targeted amnesia. Perfect for witnesses. Dosage instructions included. No trace in standard toxicology screens.",
    price: 27300,
    category: "Pharmaceutical",
    vendor: "GhostDoc",
    ratings: 4.7,
    transactions: 92,
    verified: true,
    featured: false,
  },
  {
    id: "SM-36492",
    title: "Off-Grid Communications",
    description:
      "Untraceable messaging system. Military-grade encryption. Works in dead zones. Battery life: 72 hours. Includes self-destruct mechanism.",
    price: 19800,
    category: "Digital Goods",
    vendor: "QuantumHarvest",
    ratings: 4.5,
    transactions: 186,
    verified: true,
    featured: true,
  },
  {
    id: "SM-50847",
    title: "Reality Distortion",
    description:
      "Augmented reality overlay hacks. Alter perception of surveillance systems. 12-hour duration per dose. No side effects reported (mostly).",
    price: 31500,
    category: "Digital Goods",
    vendor: "Prometheus_X",
    ratings: 4.9,
    transactions: 74,
    verified: true,
    featured: true,
  },
  {
    id: "SM-64238",
    title: "Private Data Packages",
    description:
      "Comprehensive personal and financial data on high-value targets. Custom extraction available. Regularly updated. Deniability guaranteed.",
    price: 42650,
    category: "Digital Goods",
    vendor: "QuantumHarvest",
    ratings: 4.7,
    transactions: 158,
    verified: true,
    featured: false,
  },
  {
    id: "SM-27395",
    title: "Custom Sabotage Tools",
    description:
      "Industrial control system manipulation toolkit. Target-specific solutions. Leaves no digital footprint. Proven track record.",
    price: 56900,
    category: "Digital Goods",
    vendor: "Prometheus_X",
    ratings: 4.8,
    transactions: 46,
    verified: true,
    featured: false,
  },
  {
    id: "SM-81453",
    title: "Network Venom",
    description:
      "Advanced network penetration suite. Bypasses all major security systems. Self-evolving algorithms. Quick deployment, untraceable operation.",
    price: 47500,
    category: "Digital Goods",
    vendor: "CobraSystems",
    ratings: 4.9,
    transactions: 215,
    verified: true,
    featured: true,
  },
  {
    id: "SM-59371",
    title: "Memory Implantation",
    description:
      "Revolutionary cognitive manipulation service. Create targeted false memories. Experimental procedure. Limited availability.",
    price: 64800,
    category: "Services",
    vendor: "GhostDoc",
    ratings: 4.2,
    transactions: 37,
    verified: true,
    featured: false,
  },
];

// Vendor data - will be expanded as the game progresses
const VENDORS = {
  CobraSystems: {
    id: "CobraSystems",
    avatar: "snake with computer circuit patterns",
    clue: "Small toy snake wrapped around a circuit board",
    realName: "Alex Karimov",
    specialty: "Network penetration tools that compromise user data",
    status: "Missing",
    lastSeen: "3 days before body discovered",
    accessUnlocked: false,
    profileQuote:
      "Breaking through every wall to reach what's on the other side.",
  },
  GhostDoc: {
    id: "GhostDoc",
    avatar: "Vintage medical symbol with ethereal effect",
    clue: "Antique medical caduceus with gauze wrapped around it",
    realName: "Dr. Leyla Mahmudova",
    specialty: "Medical credentials and prescription access",
    status: "Missing",
    lastSeen: "Day of disappearance",
    accessUnlocked: false,
    profileQuote: "Your new identity is just a consultation away.",
  },
  Prometheus_X: {
    id: "Prometheus_X",
    avatar: "Stylized flame with binary code",
    clue: "Small metal lighter with Greek lettering",
    realName: "Ibrahim Nasirov",
    specialty:
      "Industrial sabotage software and restricted technical documents",
    status: "Missing",
    lastSeen: "5 hours before disappearance",
    accessUnlocked: false,
    profileQuote: "bringing forbidden knowledge to mankind",
  },
  QuantumHarvest: {
    id: "QuantumHarvest",
    avatar: "Stylized wheat/data symbols",
    clue: "USB drive embedded in a small sheaf of wheat",
    realName: "Unknown",
    specialty: "Mass data harvesting and selling personal information",
    status: "Active",
    lastSeen: "Recently active",
    accessUnlocked: false,
    profileQuote: "Every byte of data is a seed we can harvest.",
  },
  MirrorMask: {
    id: "MirrorMask",
    avatar: "Stylized mirrored mask",
    clue: "Small mirror with text etched backward",
    realName: "Unknown",
    specialty: "Identity theft and impersonation services",
    status: "Active",
    lastSeen: "Recently active",
    accessUnlocked: false,
    profileQuote: "Become anyone. Be seen as no one.",
  },
};

// Categories for filtering
const CATEGORIES = [
  "All Categories",
  "Pharmaceutical",
  "Digital Goods",
  "Services",
  "Rare Items",
  "Custom Requests",
];

const useDarkWebStore = create((set, get) => ({
  // Connection state
  isConnected: false,
  isConnecting: false,
  connectionError: null,

  // Authentication state
  isAuthenticated: false,
  currentVendor: null,

  // Market data
  listings: MARKET_LISTINGS,
  vendors: VENDORS,
  categories: CATEGORIES,

  // UI state
  currentPage: "market", // market, vendor, item, etc.
  selectedVendor: null,
  selectedListing: null,
  searchQuery: "",
  selectedCategory: "All Categories",
  sortBy: "featured", // featured, price, ratings

  // Connection timer (for immersion)
  connectionTime: 0,
  connectionInterval: null,

  // Actions

  // Connect to Shadow Market
  connect: () => {
    set({ isConnecting: true, connectionError: null });

    // Simulate connection delay
    setTimeout(() => {
      // Simulate success for now
      set({
        isConnected: true,
        isConnecting: false,
        connectionTime: 0,
      });

      // Start connection timer
      const interval = setInterval(() => {
        set((state) => ({ connectionTime: state.connectionTime + 1 }));
      }, 1000);

      set({ connectionInterval: interval });
    }, 2000);
  },

  // Disconnect from Shadow Market
  disconnect: () => {
    const { connectionInterval } = get();
    if (connectionInterval) {
      clearInterval(connectionInterval);
    }

    set({
      isConnected: false,
      isAuthenticated: false,
      connectionTime: 0,
      connectionInterval: null,
      currentPage: "market",
      selectedVendor: null,
      selectedListing: null,
    });
  },

  // Authenticate as a vendor (unlocked through the terminal/hacking)
  authenticateAsVendor: (vendorId) => {
    const { vendors } = get();
    if (vendors[vendorId]) {
      set({
        isAuthenticated: true,
        currentVendor: vendorId,
        selectedVendor: vendorId,
        currentPage: "vendor",
      });

      // Mark vendor as unlocked in the store
      set((state) => ({
        vendors: {
          ...state.vendors,
          [vendorId]: {
            ...state.vendors[vendorId],
            accessUnlocked: true,
          },
        },
      }));

      return true;
    }
    return false;
  },

  // Search listings
  search: (query) => {
    set({ searchQuery: query });
  },

  // Filter by category
  setCategory: (category) => {
    set({ selectedCategory: category });
  },

  // Sort listings
  setSortBy: (sortMethod) => {
    set({ sortBy: sortMethod });
  },

  // View vendor profile
  viewVendor: (vendorId) => {
    if (get().vendors[vendorId]) {
      set({
        selectedVendor: vendorId,
        currentPage: "vendor",
      });
    }
  },

  // View item details
  viewListing: (listingId) => {
    const listing = get().listings.find((item) => item.id === listingId);
    if (listing) {
      set({
        selectedListing: listing,
        currentPage: "item",
      });
    }
  },

  // Return to marketplace
  viewMarket: () => {
    set({
      currentPage: "market",
      selectedVendor: null,
      selectedListing: null,
    });
  },

  // Get filtered listings based on current search/filter/sort
  getFilteredListings: () => {
    const { listings, searchQuery, selectedCategory, sortBy } = get();

    // Filter by search query
    let filtered = listings;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.vendor.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Sort
    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered = [...filtered].sort((a, b) => b.ratings - a.ratings);
    } else if (sortBy === "featured") {
      filtered = [...filtered].sort(
        (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      );
    }

    return filtered;
  },

  // Get vendor's listings
  getVendorListings: (vendorId) => {
    return get().listings.filter((item) => item.vendor === vendorId);
  },

  // Format connection time as MM:SS
  getFormattedConnectionTime: () => {
    const time = get().connectionTime;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  },

  // Clean up (call on component unmount)
  cleanup: () => {
    const { connectionInterval } = get();
    if (connectionInterval) {
      clearInterval(connectionInterval);
    }
  },
}));

export { useDarkWebStore };
