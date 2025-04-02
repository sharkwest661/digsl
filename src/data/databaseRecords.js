import { DATABASE_TYPES } from "../constants/app";

// Mock database records
export const DB_RECORDS = {
  // Police records
  [DATABASE_TYPES.POLICE]: [
    {
      id: "p-2835",
      name: "Alex Karimov",
      caseNumbers: ["BPD-2023-0472"],
      lastKnown: "Apartment 7B, Nizami Street 42, Baku",
      status: "Missing",
      description:
        "Male, 32, reported missing on 03/15/2023. Known alias: 'CobraSystems'",
      notes:
        "Missing persons report filed by employer after 3 days of absence. Suspicious circumstances noted. Tech background with specialization in network security. No prior criminal record.",
      details: {
        height: "182cm",
        weight: "78kg",
        eyeColor: "Brown",
        hairColor: "Black",
        distinguishingFeatures: "Serpent tattoo on right forearm",
        nationality: "Azerbaijani",
        languages: "Azerbaijani, English, Russian",
        occupation: "Cybersecurity Specialist",
        employer: "AzTech Solutions",
        emergencyContact: "None provided",
        lastSeen: "03/12/2023 at NightOwl Internet Cafe",
        caseOfficer: "Inspector Mammadov",
        evidenceItems: [
          "Personal laptop (encrypted)",
          "Phone records (subpoenaed)",
          "Building access logs",
        ],
      },
    },
    {
      id: "p-3142",
      name: "Dr. Leyla Mahmudova",
      caseNumbers: ["BPD-2023-0488"],
      lastKnown: "Fountain Square Luxury Apartments, Apt 12C",
      status: "Missing",
      description:
        "Female, 38, reported missing on 03/18/2023. Employee ID badge found at scene. Possible alias: 'GhostDoc'",
      notes:
        "Hospital staff reported absence. Apartment found in disarray. Medical license under review for unspecified violations prior to disappearance.",
      details: {
        height: "165cm",
        weight: "62kg",
        eyeColor: "Green",
        hairColor: "Brown",
        distinguishingFeatures: "Surgical scar on left wrist",
        nationality: "Azerbaijani",
        languages: "Azerbaijani, English, Turkish",
        occupation: "Medical Doctor - Neurology",
        employer: "Central City Hospital",
        emergencyContact: "Farid Mahmudov (brother)",
        lastSeen: "03/17/2023 at employer location",
        caseOfficer: "Inspector Mammadov",
        evidenceItems: ["Medical bag", "Hospital key card", "Prescription pad"],
      },
    },
    {
      id: "p-3298",
      name: "Ibrahim Nasirov",
      caseNumbers: ["BPD-2023-0513"],
      lastKnown: "Industrial District, White City Complex B",
      status: "Missing",
      description:
        "Male, 45, reported missing on 03/25/2023. Workplace ID and personal effects found at home. Possible alias: 'Prometheus_X'",
      notes:
        "Former industrial engineer with access to sensitive infrastructure systems. Apartment electricity manually disabled before disappearance.",
      details: {
        height: "175cm",
        weight: "82kg",
        eyeColor: "Brown",
        hairColor: "Salt and pepper",
        distinguishingFeatures: "Burn scar on right hand",
        nationality: "Azerbaijani",
        languages: "Azerbaijani, Russian, English",
        occupation: "Industrial Systems Engineer",
        employer: "BakuOil Technologies",
        emergencyContact: "None listed",
        lastSeen: "03/24/2023 entering his apartment building",
        caseOfficer: "Inspector Aliyev",
        evidenceItems: [
          "Work laptop",
          "Security access cards",
          "Personal notebook with technical diagrams",
        ],
      },
    },
  ],

  // Medical records
  [DATABASE_TYPES.MEDICAL]: [
    {
      id: "m-6742",
      patientName: "Alex Karimov",
      patientID: "ACH-73421",
      dateOfBirth: "04/12/1991",
      bloodType: "O+",
      allergies: "None reported",
      medications: "None current",
      history: "Treated for wrist injury (2020), routine physical (2022)",
      lastVisit: "01/15/2023",
      physician: "Dr. Orhan Mammadli",
      notes:
        "Patient reported frequent headaches during last visit. Brain scan scheduled but never attended.",
      details: {
        admissions: [
          {
            date: "09/12/2020",
            reason: "Wrist injury from typing/computer use",
            treatment:
              "Anti-inflammatory medication, ergonomic recommendations",
            discharge: "09/12/2020",
          },
        ],
        vaccinations: "Up to date",
        insuranceProvider: "AzMedical Health",
        nextAppointment: "None scheduled",
        medicalHistory: "No significant medical history",
        familyHistory: "Father: Hypertension, Mother: Unknown",
        attachments: ["Physical results (2022)", "Wrist X-ray (2020)"],
      },
    },
    {
      id: "m-7103",
      patientName: "Leyla Mahmudova",
      patientID: "ACH-45629",
      dateOfBirth: "07/23/1985",
      bloodType: "A-",
      allergies: "Penicillin",
      medications: "None current",
      history: "Medical staff - annual checkups only",
      lastVisit: "02/10/2023",
      physician: "Self-administered tests",
      notes:
        "Dr. Mahmudova logged unusual access to pharmaceutical database (flagged by system).",
      details: {
        admissions: [],
        vaccinations: "Up to date (required for medical staff)",
        insuranceProvider: "Hospital Staff Coverage",
        nextAppointment: "None scheduled",
        medicalHistory: "No significant medical history",
        familyHistory: "No significant history reported",
        attachments: [
          "Staff medical clearance (2023)",
          "Drug screening (clean)",
        ],
      },
    },
    {
      id: "m-7589",
      patientName: "Ibrahim Nasirov",
      patientID: "ACH-26735",
      dateOfBirth: "11/04/1978",
      bloodType: "B+",
      allergies: "None",
      medications: "Lisinopril (10mg), Lorazepam (0.5mg)",
      history:
        "Hypertension (2018), Anxiety disorder (2019), Hand burn treatment (2015)",
      lastVisit: "03/10/2023",
      physician: "Dr. Aysel Huseynova",
      notes:
        "Patient requested early medication refill. Reported increased work stress and difficulty sleeping.",
      details: {
        admissions: [
          {
            date: "07/15/2015",
            reason: "Second-degree burn on right hand",
            treatment: "Burn treatment, antibiotics, pain management",
            discharge: "07/17/2015",
          },
        ],
        vaccinations: "Up to date",
        insuranceProvider: "BakuOil Corporate Health Plan",
        nextAppointment: "04/10/2023 (missed)",
        medicalHistory: "Hypertension, Anxiety disorder, Hand injury (2015)",
        familyHistory: "Father: Heart disease, Mother: Diabetes",
        attachments: ["Prescription history", "Psychiatric evaluation (2019)"],
      },
    },
  ],

  // Immigration records
  [DATABASE_TYPES.IMMIGRATION]: [
    {
      id: "i-12853",
      fullName: "Alexander Karimov",
      nationality: "Azerbaijani",
      passportNumber: "AZE38204761",
      dateOfBirth: "04/12/1991",
      placeOfBirth: "Ganja, Azerbaijan",
      status: "Citizen",
      travelHistory: "Turkey (2022), UAE (2021), Russia (2020)",
      notes: "No immigration violations",
      details: {
        addresses: [
          "Nizami Street 42, Apt 7B, Baku (current)",
          "Tabriz Street 17, Ganja (previous)",
        ],
        entryExitRecords: [
          {
            date: "06/15/2022",
            direction: "Exit",
            destination: "Istanbul, Turkey",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "06/22/2022",
            direction: "Entry",
            origin: "Istanbul, Turkey",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "11/03/2021",
            direction: "Exit",
            destination: "Dubai, UAE",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "11/10/2021",
            direction: "Entry",
            origin: "Dubai, UAE",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "02/17/2020",
            direction: "Exit",
            destination: "Moscow, Russia",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "02/25/2020",
            direction: "Entry",
            origin: "Moscow, Russia",
            port: "Heydar Aliyev International Airport",
          },
        ],
        visaHistory: "Not applicable (citizen)",
        familyMembers:
          "Father: Farid Karimov (citizen), Mother: Sevinj Karimova (deceased)",
        additionalDocs: ["National ID card", "Birth certificate"],
        securityNotes: "None",
        biometricData: "Fingerprints on file",
      },
    },
    {
      id: "i-10967",
      fullName: "Leyla Mahmudova",
      nationality: "Azerbaijani",
      passportNumber: "AZE26183047",
      dateOfBirth: "07/23/1985",
      placeOfBirth: "Baku, Azerbaijan",
      status: "Citizen",
      travelHistory: "Germany (2022), UK (2021), Switzerland (2019)",
      notes: "No immigration violations",
      details: {
        addresses: [
          "Fountain Square Luxury Apartments, Apt 12C, Baku (current)",
        ],
        entryExitRecords: [
          {
            date: "09/10/2022",
            direction: "Exit",
            destination: "Frankfurt, Germany",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "09/17/2022",
            direction: "Entry",
            origin: "Frankfurt, Germany",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "05/22/2021",
            direction: "Exit",
            destination: "London, UK",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "06/05/2021",
            direction: "Entry",
            origin: "London, UK",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "03/15/2019",
            direction: "Exit",
            destination: "Zurich, Switzerland",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "03/22/2019",
            direction: "Entry",
            origin: "Zurich, Switzerland",
            port: "Heydar Aliyev International Airport",
          },
        ],
        visaHistory: "Not applicable (citizen)",
        familyMembers: "Brother: Farid Mahmudov (citizen)",
        additionalDocs: ["National ID card", "Medical license"],
        securityNotes: "None",
        biometricData: "Fingerprints on file",
      },
    },
    {
      id: "i-09321",
      fullName: "Ibrahim Nasirov",
      nationality: "Azerbaijani",
      passportNumber: "AZE17294635",
      dateOfBirth: "11/04/1978",
      placeOfBirth: "Baku, Azerbaijan",
      status: "Citizen",
      travelHistory: "Russia (2022, 2021, 2020), Turkey (2021), Ukraine (2019)",
      notes: "Multiple business trips to Russian Federation",
      details: {
        addresses: [
          "Industrial District, White City Complex B, Unit 503, Baku (current)",
        ],
        entryExitRecords: [
          {
            date: "11/23/2022",
            direction: "Exit",
            destination: "Moscow, Russia",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "11/30/2022",
            direction: "Entry",
            origin: "Moscow, Russia",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "07/11/2022",
            direction: "Exit",
            destination: "St. Petersburg, Russia",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "07/18/2022",
            direction: "Entry",
            origin: "St. Petersburg, Russia",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "04/25/2021",
            direction: "Exit",
            destination: "Ankara, Turkey",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "05/02/2021",
            direction: "Entry",
            origin: "Ankara, Turkey",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "02/12/2019",
            direction: "Exit",
            destination: "Kyiv, Ukraine",
            port: "Heydar Aliyev International Airport",
          },
          {
            date: "02/19/2019",
            direction: "Entry",
            origin: "Kyiv, Ukraine",
            port: "Heydar Aliyev International Airport",
          },
        ],
        visaHistory: "Not applicable (citizen)",
        familyMembers: "No immediate family listed",
        additionalDocs: [
          "National ID card",
          "Professional engineering certification",
        ],
        securityNotes:
          "Secondary screening performed after 2022 Russia visit due to extended industrial site visits",
        biometricData: "Fingerprints on file",
      },
    },
  ],

  // Financial records
  [DATABASE_TYPES.FINANCIAL]: [
    {
      id: "f-38294",
      name: "Alex Karimov",
      accountNumbers: ["BNA-7538294", "BNA-9638201"],
      taxID: "AZ19910412KRM",
      employmentStatus: "Employed",
      incomeLevel: "High",
      transactionFlags: "Large cryptocurrency exchanges detected",
      notes: "Unusual pattern of foreign funds transfers in past 6 months",
      details: {
        accountSummary: [
          {
            type: "Checking",
            number: "BNA-7538294",
            balance: "₼2,890",
            status: "Active",
          },
          {
            type: "Savings",
            number: "BNA-9638201",
            balance: "₼57,430",
            status: "Active",
          },
        ],
        transactionHistory: [
          {
            date: "03/10/2023",
            type: "Withdrawal",
            amount: "₼15,000",
            description: "Cash withdrawal",
          },
          {
            date: "03/01/2023",
            type: "Deposit",
            amount: "₼28,500",
            description: "Transfer from unknown source",
          },
          {
            date: "02/15/2023",
            type: "Withdrawal",
            amount: "₼5,000",
            description: "Cash withdrawal",
          },
          {
            date: "02/01/2023",
            type: "Deposit",
            amount: "₼32,000",
            description: "Transfer from cryptocurrency exchange",
          },
        ],
        cryptoWallets: ["Identified but addresses classified"],
        taxHistory: "Up to date, last filing: January 2023",
        propertyOwnership: "None registered",
        creditScore: "Excellent (790)",
        loans: "None active",
        suspiciousActivity:
          "Multiple large transfers to/from cryptocurrency exchanges",
      },
    },
    {
      id: "f-42153",
      name: "Leyla Mahmudova",
      accountNumbers: ["AZB-2674291", "AZB-2674292"],
      taxID: "AZ19850723MHM",
      employmentStatus: "Employed",
      incomeLevel: "Very High",
      transactionFlags: "Multiple offshore accounts",
      notes:
        "Significant increase in deposits over past year without corresponding salary increase",
      details: {
        accountSummary: [
          {
            type: "Checking",
            number: "AZB-2674291",
            balance: "₼8,320",
            status: "Active",
          },
          {
            type: "Savings",
            number: "AZB-2674292",
            balance: "₼205,850",
            status: "Active",
          },
        ],
        transactionHistory: [
          {
            date: "03/15/2023",
            type: "Transfer",
            amount: "₼25,000",
            description: "Transfer to Swiss account",
          },
          {
            date: "03/01/2023",
            type: "Deposit",
            amount: "₼42,000",
            description: "Unknown source",
          },
          {
            date: "02/15/2023",
            type: "Withdrawal",
            amount: "₼10,000",
            description: "Cash withdrawal",
          },
          {
            date: "02/01/2023",
            type: "Deposit",
            amount: "₼38,000",
            description: "Unknown source",
          },
        ],
        cryptoWallets: ["None identified"],
        taxHistory: "Up to date, last filing: January 2023",
        propertyOwnership: "Fountain Square Luxury Apartment (purchased 2021)",
        creditScore: "Excellent (810)",
        loans: "Mortgage: ₼450,000 (2021-2051)",
        suspiciousActivity:
          "Income inconsistent with medical profession salary",
      },
    },
    {
      id: "f-36728",
      name: "Ibrahim Nasirov",
      accountNumbers: ["CBA-1572839", "CBA-1891724"],
      taxID: "AZ19781104NSR",
      employmentStatus: "Employed",
      incomeLevel: "High",
      transactionFlags: "Frequent international wire transfers",
      notes:
        "Multiple payments from industrial companies in neighboring countries",
      details: {
        accountSummary: [
          {
            type: "Checking",
            number: "CBA-1572839",
            balance: "₼5,720",
            status: "Active",
          },
          {
            type: "Savings",
            number: "CBA-1891724",
            balance: "₼124,530",
            status: "Active",
          },
        ],
        transactionHistory: [
          {
            date: "03/20/2023",
            type: "Withdrawal",
            amount: "₼20,000",
            description: "Cash withdrawal",
          },
          {
            date: "03/01/2023",
            type: "Deposit",
            amount: "₼45,000",
            description: "Wire transfer from RusTech Industries",
          },
          {
            date: "02/15/2023",
            type: "Withdrawal",
            amount: "₼8,000",
            description: "Cash withdrawal",
          },
          {
            date: "02/01/2023",
            type: "Deposit",
            amount: "₼42,000",
            description: "Wire transfer from RusTech Industries",
          },
        ],
        cryptoWallets: ["One identified wallet with substantial activity"],
        taxHistory: "Up to date, last filing: January 2023",
        propertyOwnership: "White City Apartment (purchased 2018)",
        creditScore: "Good (720)",
        loans: "Mortgage: ₼320,000 (2018-2048)",
        suspiciousActivity:
          "Undisclosed foreign income, payments from sensitive industrial sectors",
      },
    },
  ],

  // Employment records
  [DATABASE_TYPES.EMPLOYMENT]: [
    {
      id: "e-62938",
      name: "Alex Karimov",
      currentEmployer: "AzTech Solutions",
      position: "Senior Network Security Specialist",
      employmentStatus: "Missing - Employment Suspended",
      startDate: "05/15/2018",
      clearanceLevel: "High - Corporate Systems",
      securityIncidents: "None reported",
      notes:
        "Specialized in network penetration testing and security systems. Last accessed company systems 03/11/2023 at 23:47.",
      details: {
        responsibilities:
          "Corporate network security, penetration testing, security system design",
        performance: "Excellent - last review January 2023",
        accessPrivileges:
          "Full access to network infrastructure, security systems, client data",
        salary: "₼85,000 annually + performance bonuses",
        supervisors: "Elmar Hajiyev (IT Director)",
        workHistory: [
          {
            employer: "AzTech Solutions",
            position: "Senior Network Security Specialist",
            dates: "05/15/2018 - Present",
          },
          {
            employer: "DataSec Baku",
            position: "Network Security Analyst",
            dates: "06/2015 - 05/2018",
          },
          {
            employer: "BakuTel",
            position: "Junior IT Specialist",
            dates: "08/2013 - 06/2015",
          },
        ],
        education: "BSc Computer Science, Baku State University (2013)",
        certifications: [
          "Certified Ethical Hacker",
          "Cisco Certified Network Professional",
          "CompTIA Security+",
        ],
        projects: [
          "Corporate firewall redesign (2022)",
          "Banking security systems (2020-2021)",
        ],
        attendanceRecord: "Exemplary until disappearance",
      },
    },
    {
      id: "e-57291",
      name: "Dr. Leyla Mahmudova",
      currentEmployer: "Central City Hospital",
      position: "Neurologist - Senior Staff",
      employmentStatus: "Missing - Employment Suspended",
      startDate: "03/10/2016",
      clearanceLevel: "High - Medical Records & Pharmaceutical",
      securityIncidents: "Unauthorized database access (03/15/2023)",
      notes:
        "Respected physician with specialty in neurological disorders. Flagged for unusual database access patterns week before disappearance.",
      details: {
        responsibilities:
          "Patient care, neurological assessment, prescription authority",
        performance: "Outstanding - last review December 2022",
        accessPrivileges:
          "Full access to medical records, pharmaceutical inventory, restricted medications",
        salary: "₼120,000 annually",
        supervisors: "Dr. Javid Aliyev (Chief of Medicine)",
        workHistory: [
          {
            employer: "Central City Hospital",
            position: "Neurologist - Senior Staff",
            dates: "03/10/2016 - Present",
          },
          {
            employer: "MedPlus Clinic",
            position: "Neurologist",
            dates: "09/2012 - 03/2016",
          },
          {
            employer: "Berlin Charité Hospital",
            position: "Resident Physician",
            dates: "06/2010 - 08/2012",
          },
        ],
        education:
          "MD, Baku Medical University (2008), Neurology Specialization (Berlin, 2010-2012)",
        certifications: [
          "Board Certified Neurologist",
          "Advanced Life Support",
          "Neuropharmacology Certification",
        ],
        projects: [
          "Neurological research study (2020-2022)",
          "Medical student mentorship program",
        ],
        attendanceRecord: "Perfect until disappearance",
      },
    },
    {
      id: "e-48672",
      name: "Ibrahim Nasirov",
      currentEmployer: "BakuOil Technologies",
      position: "Senior Industrial Systems Engineer",
      employmentStatus: "Missing - Employment Suspended",
      startDate: "11/05/2015",
      clearanceLevel: "Very High - Critical Infrastructure",
      securityIncidents:
        "Unauthorized download of system schematics (03/20/2023)",
      notes:
        "Specialized in industrial control systems. Downloaded sensitive infrastructure documents days before disappearance.",
      details: {
        responsibilities:
          "Design and maintenance of industrial control systems for oil production facilities",
        performance: "Above Average - last review February 2023",
        accessPrivileges:
          "High-level access to infrastructure systems, SCADA networks, facility schematics",
        salary: "₼92,000 annually",
        supervisors: "Rashad Mammadov (Engineering Director)",
        workHistory: [
          {
            employer: "BakuOil Technologies",
            position: "Senior Industrial Systems Engineer",
            dates: "11/05/2015 - Present",
          },
          {
            employer: "SOCAR",
            position: "Systems Engineer",
            dates: "04/2010 - 11/2015",
          },
          {
            employer: "Azneft",
            position: "Junior Engineer",
            dates: "06/2003 - 04/2010",
          },
        ],
        education:
          "MSc Industrial Engineering, Azerbaijan Technical University (2003)",
        certifications: [
          "Certified Industrial Control Systems Security Professional",
          "Process Control Systems Specialist",
        ],
        projects: [
          "Modernization of Legacy Control Systems (2021-2023)",
          "Safety Protocol Implementation (2019-2020)",
        ],
        attendanceRecord:
          "Regular authorized travel to industrial sites, no unexplained absences until disappearance",
      },
    },
  ],

  // Criminal records
  [DATABASE_TYPES.CRIMINAL]: [
    {
      id: "c-27913",
      name: "Alex Karimov",
      nationalID: "AZ19910412K",
      criminalStatus: "No Criminal Record",
      watchlistStatus: "Not on watchlist",
      interpol: "No alerts",
      notes:
        "No criminal history. Subject in ongoing missing persons investigation.",
      details: {
        knownAssociates: "None with criminal records",
        warnings: "Tech skills could enable cybercrime",
        priorInvestigations: "None",
        fingerprintsOnFile: true,
        dnaOnFile: false,
        lastUpdate: "03/16/2023 - Added to missing persons registry",
      },
    },
    {
      id: "c-31456",
      name: "Leyla Mahmudova",
      nationalID: "AZ19850723M",
      criminalStatus: "Professional Investigation",
      watchlistStatus: "Medical Licensing Board Watchlist",
      interpol: "No alerts",
      notes:
        "Under investigation by Medical Licensing Board for prescription irregularities prior to disappearance.",
      details: {
        knownAssociates: "None with criminal records",
        warnings: "Access to restricted pharmaceuticals",
        priorInvestigations:
          "Medical Board review (ongoing at time of disappearance)",
        fingerprintsOnFile: true,
        dnaOnFile: true,
        lastUpdate: "03/19/2023 - Added to missing persons registry",
      },
    },
    {
      id: "c-29874",
      name: "Ibrahim Nasirov",
      nationalID: "AZ19781104N",
      criminalStatus: "Intelligence Interest",
      watchlistStatus: "Critical Infrastructure Protection",
      interpol: "No alerts",
      notes:
        "Monitored due to access to critical infrastructure. Known contact with foreign industrial entities.",
      details: {
        knownAssociates: "Contacts in Russian industrial sector (non-criminal)",
        warnings: "Access to critical infrastructure systems",
        priorInvestigations:
          "Counter-intelligence assessment (2022) - No action taken",
        fingerprintsOnFile: true,
        dnaOnFile: true,
        lastUpdate: "03/26/2023 - Added to missing persons registry",
      },
    },
  ],
};
