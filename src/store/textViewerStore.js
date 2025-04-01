// store/textViewerStore.js
import { create } from "zustand";

// Initial files available in the text viewer
const INITIAL_FILES = {
  readme: {
    id: "readme",
    title: "README.txt",
    date: new Date("2023-03-28T10:15:00"),
    content: `# CONFIDENTIAL: Case File #2872-B

AUTHORIZATION LEVEL: Level 4 Clearance
CASE STATUS: Active Investigation
DATE: March 28, 2023

## CASE OVERVIEW

In the past month, five bodies have been discovered across Baku. Each victim was found with their face deliberately damaged beyond recognition and a small object left with the body. These objects appear to be symbolic in nature.

The police investigation has stalled until we received an anonymous tip that connects these murders to an underground dark web marketplace called "Shadow Market" - a platform for illegal goods and services accessible only through specialized browsers.

You have been assigned as the lead digital investigator on this case due to your expertise in cybercrime forensics. Your task is to identify the victims, determine what they were selling on Shadow Market, and ultimately track down the vigilante killer.

## EVIDENCE RECOVERED

The following items were found with each victim:

1. A small toy snake wrapped around a circuit board
2. An antique medical caduceus with gauze wrapped around it
3. A small metal lighter with Greek lettering
4. A USB drive embedded in a small sheaf of wheat
5. A small mirror with text etched backward

Our anonymous source suggests these objects correspond to specific vendor profiles on Shadow Market. Your first objective is to access this marketplace and identify these connections.

## SYSTEM INSTRUCTIONS

This workstation has been equipped with several specialized applications to assist your investigation:

- DARK WEB BROWSER: For accessing Shadow Market (requires configuration)
- SEARCH ENGINE: For finding information across public networks
- DATABASE: Access to police, medical, financial, and other records
- EVIDENCE BOARD: Track and connect your findings about the victims
- EMAIL: Check for incoming communications
- NOTEPAD: Document your observations
- TERMINAL: For advanced system operations and password cracking

To begin your investigation:
1. Use the Search Engine to research recent missing persons cases in Baku
2. Configure the Dark Web Browser to access Shadow Market
3. Use the Database to cross-reference potential victim identities
4. Document your findings on the Evidence Board

Be thorough in your investigation. The killer appears to be targeting vendors based on specific criteria. Understanding this pattern may help identify potential future targets before they become victims.

Good luck, Detective. Time is of the essence.

-- Chief Investigator Aliyev`,
  },
  "access-instructions": {
    id: "access-instructions",
    title: "DarkWeb_Access.txt",
    date: new Date("2023-03-27T16:42:00"),
    content: `# DARK WEB ACCESS INSTRUCTIONS

To access the Shadow Market, you will need to configure the Dark Web Browser correctly:

1. Launch the Dark Web Browser application
2. Enter the following .onion address: shadowmkt7zvqi32.onion
3. When prompted for authentication, use credentials from the anonymous source:
   Username: shadowguest
   Password: v1s1t0r2023

Note that the marketplace frequently changes its access protocols. If you cannot connect using these credentials, check your email for updated information from our source.

WARNING: Exercise extreme caution when navigating the marketplace. Some vendors may have sophisticated tracking methods.

For technical assistance, contact IT support through the Terminal application.`,
  },
};

// Create the text viewer store
const useTextViewerStore = create((set, get) => ({
  // List of available files
  files: INITIAL_FILES,

  // Currently open file
  currentFile: null,

  // Open a specific file by ID
  openFile: (fileId) => {
    const { files } = get();
    const fileToOpen = files[fileId];

    if (fileToOpen) {
      set({ currentFile: fileToOpen });
      return true;
    }

    return false;
  },

  // Add a new file to the store
  addFile: (file) => {
    set((state) => ({
      files: {
        ...state.files,
        [file.id]: file,
      },
    }));
  },

  // Close the current file
  closeFile: () => {
    set({ currentFile: null });
  },
}));

export { useTextViewerStore };
