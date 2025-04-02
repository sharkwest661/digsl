// src/data/databaseRecords.js

// Single database type
export const DATABASE_TYPES = {
  GOVERNMENT: "government",
};

// Mock database records
export const DB_RECORDS = {
  // Government comprehensive database
  [DATABASE_TYPES.GOVERNMENT]: [
    // VICTIM 1: Alex Karimov (CobraSystems)
    {
      id: "gov-2835",
      name: "Alex Karimov",
      dateOfBirth: "04/12/1978",
      nationalID: "AZ19780412K",
      status: "Missing",
      lastSeen: "03/15/2003",
      address: "Apartment 7B, Nizami Street 42, Baku",
      occupation: "Cybersecurity Specialist",
      employer: "AzTech Solutions",
      description:
        "Male, 25, reported missing on 03/15/2003. Known tech expertise in network security.",
      notes:
        "Missing persons report filed by employer after 3 days of absence. Tech background with specialization in network security. No prior criminal record.",
      details: {
        physical: {
          height: "182cm",
          weight: "78kg",
          eyeColor: "Brown",
          hairColor: "Black",
          distinguishingFeatures: "Serpent tattoo on right forearm",
        },
        background: {
          nationality: "Azerbaijani",
          languages: "Azerbaijani, English, Russian",
          education: "BSc Computer Science, Baku State University (2000)",
          familyContacts:
            "Father: Farid Karimov (citizen), Mother: Sevinj Karimova (deceased)",
        },
        employment: {
          position: "Senior Network Security Specialist",
          clearanceLevel: "High - Corporate Systems",
          responsibilities:
            "Corporate network security, penetration testing, security system design",
          workHistory: [
            {
              employer: "AzTech Solutions",
              position: "Senior Network Security Specialist",
              dates: "05/2000 - Present",
            },
            {
              employer: "DataSec Baku",
              position: "Network Security Analyst",
              dates: "06/1999 - 05/2000",
            },
          ],
          certifications: [
            "Certified Ethical Hacker",
            "Cisco Certified Network Professional",
          ],
        },
        financial: {
          accountNumbers: ["BNA-7538294", "BNA-9638201"],
          transactionFlags: "Large cryptocurrency exchanges detected",
          transactionHistory: [
            {
              date: "03/10/2003",
              type: "Withdrawal",
              amount: "₼15,000",
              description: "Cash withdrawal",
            },
            {
              date: "03/01/2003",
              type: "Deposit",
              amount: "₼28,500",
              description: "Transfer from unknown source",
            },
          ],
          suspiciousActivity:
            "Multiple large transfers to/from cryptocurrency exchanges",
        },
        medical: {
          bloodType: "O+",
          allergies: "None reported",
          medications: "None current",
          history: "Treated for wrist injury (2001)",
        },
        police: {
          caseNumbers: ["BPD-2003-0472"],
          criminalStatus: "No Criminal Record",
          caseOfficer: "Inspector Mammadov",
          evidenceItems: [
            "Personal laptop (encrypted)",
            "Phone records (subpoenaed)",
            "Building access logs",
          ],
        },
        travel: {
          passportNumber: "AZE38204761",
          travelHistory: [
            {
              date: "11/2002",
              destination: "Turkey",
            },
            {
              date: "06/2002",
              destination: "UAE",
            },
            {
              date: "02/2001",
              destination: "Russia",
            },
          ],
        },
      },
    },

    // VICTIM 2: Dr. Leyla Mahmudova (GhostDoc)
    {
      id: "gov-3142",
      name: "Dr. Leyla Mahmudova",
      dateOfBirth: "07/23/1972",
      nationalID: "AZ19720723M",
      status: "Missing",
      lastSeen: "03/18/2003",
      address: "Fountain Square Luxury Apartments, Apt 12C",
      occupation: "Medical Doctor - Neurology",
      employer: "Central City Hospital",
      description:
        "Female, 31, reported missing on 03/18/2003. Employee ID badge found at scene.",
      notes:
        "Hospital staff reported absence. Apartment found in disarray. Medical license under review for unspecified violations prior to disappearance.",
      details: {
        physical: {
          height: "165cm",
          weight: "62kg",
          eyeColor: "Green",
          hairColor: "Brown",
          distinguishingFeatures: "Surgical scar on left wrist",
        },
        background: {
          nationality: "Azerbaijani",
          languages: "Azerbaijani, English, Turkish",
          education:
            "MD, Baku Medical University (1995), Neurology Specialization (Berlin, 1997-1999)",
          familyContacts:
            "Brother: Farid Mahmudov (contact information on file)",
        },
        employment: {
          position: "Neurologist - Senior Staff",
          clearanceLevel: "High - Medical Records & Pharmaceutical",
          responsibilities:
            "Patient care, neurological assessment, prescription authority",
          workHistory: [
            {
              employer: "Central City Hospital",
              position: "Neurologist - Senior Staff",
              dates: "03/2000 - Present",
            },
            {
              employer: "MedPlus Clinic",
              position: "Neurologist",
              dates: "09/1999 - 03/2000",
            },
            {
              employer: "Berlin Charité Hospital",
              position: "Resident Physician",
              dates: "06/1997 - 08/1999",
            },
          ],
          certifications: [
            "Board Certified Neurologist",
            "Advanced Life Support",
            "Neuropharmacology Certification",
          ],
        },
        financial: {
          accountNumbers: ["AZB-2674291", "AZB-2674292"],
          transactionFlags: "Multiple offshore accounts",
          transactionHistory: [
            {
              date: "03/15/2003",
              type: "Transfer",
              amount: "₼25,000",
              description: "Transfer to Swiss account",
            },
            {
              date: "03/01/2003",
              type: "Deposit",
              amount: "₼42,000",
              description: "Unknown source",
            },
          ],
          suspiciousActivity:
            "Income inconsistent with medical profession salary",
        },
        medical: {
          bloodType: "A-",
          allergies: "Penicillin",
          medications: "None current",
          history: "Medical staff - annual checkups only",
        },
        police: {
          caseNumbers: ["BPD-2003-0488"],
          criminalStatus: "Professional Investigation",
          caseOfficer: "Inspector Aliyev",
          evidenceItems: [
            "Medical bag",
            "Hospital key card",
            "Prescription pad",
          ],
        },
        travel: {
          passportNumber: "AZE26183047",
          travelHistory: [
            {
              date: "09/2002",
              destination: "Germany",
            },
            {
              date: "05/2001",
              destination: "UK",
            },
            {
              date: "03/2000",
              destination: "Switzerland",
            },
          ],
        },
      },
    },

    // VICTIM 3: Ibrahim Nasirov (Prometheus_X)
    {
      id: "gov-3298",
      name: "Ibrahim Nasirov",
      dateOfBirth: "11/04/1965",
      nationalID: "AZ19651104N",
      status: "Missing",
      lastSeen: "03/25/2003",
      address: "Industrial District, White City Complex B",
      occupation: "Industrial Systems Engineer",
      employer: "BakuOil Technologies",
      description:
        "Male, 38, reported missing on 03/25/2003. Workplace ID and personal effects found at home.",
      notes:
        "Former industrial engineer with access to sensitive infrastructure systems. Apartment electricity manually disabled before disappearance.",
      details: {
        physical: {
          height: "175cm",
          weight: "82kg",
          eyeColor: "Brown",
          hairColor: "Salt and pepper",
          distinguishingFeatures: "Burn scar on right hand",
        },
        background: {
          nationality: "Azerbaijani",
          languages: "Azerbaijani, Russian, English",
          education:
            "MSc Industrial Engineering, Azerbaijan Technical University (1990)",
          familyContacts: "No immediate family listed",
        },
        employment: {
          position: "Senior Industrial Systems Engineer",
          clearanceLevel: "Very High - Critical Infrastructure",
          responsibilities:
            "Design and maintenance of industrial control systems for oil production facilities",
          workHistory: [
            {
              employer: "BakuOil Technologies",
              position: "Senior Industrial Systems Engineer",
              dates: "11/1998 - Present",
            },
            {
              employer: "SOCAR",
              position: "Systems Engineer",
              dates: "04/1995 - 11/1998",
            },
            {
              employer: "Azneft",
              position: "Junior Engineer",
              dates: "06/1990 - 04/1995",
            },
          ],
          certifications: [
            "Certified Industrial Control Systems Security Professional",
            "Process Control Systems Specialist",
          ],
        },
        financial: {
          accountNumbers: ["CBA-1572839", "CBA-1891724"],
          transactionFlags: "Frequent international wire transfers",
          transactionHistory: [
            {
              date: "03/20/2003",
              type: "Withdrawal",
              amount: "₼20,000",
              description: "Cash withdrawal",
            },
            {
              date: "03/01/2003",
              type: "Deposit",
              amount: "₼45,000",
              description: "Wire transfer from RusTech Industries",
            },
          ],
          suspiciousActivity:
            "Undisclosed foreign income, payments from sensitive industrial sectors",
        },
        medical: {
          bloodType: "B+",
          allergies: "None",
          medications: "Lisinopril (10mg), Lorazepam (0.5mg)",
          history:
            "Hypertension (1998), Anxiety disorder (1999), Hand burn treatment (1995)",
        },
        police: {
          caseNumbers: ["BPD-2003-0513"],
          criminalStatus: "Intelligence Interest",
          caseOfficer: "Inspector Aliyev",
          evidenceItems: [
            "Work laptop",
            "Security access cards",
            "Personal notebook with technical diagrams",
          ],
        },
        travel: {
          passportNumber: "AZE17294635",
          travelHistory: [
            {
              date: "11/2002",
              destination: "Russia",
            },
            {
              date: "07/2002",
              destination: "Russia",
            },
            {
              date: "04/2001",
              destination: "Turkey",
            },
            {
              date: "02/2000",
              destination: "Ukraine",
            },
          ],
        },
      },
    },

    // VICTIM 4: Unknown real name (QuantumHarvest)
    {
      id: "gov-3517",
      name: "Ruslan Babayev",
      dateOfBirth: "02/18/1976",
      nationalID: "AZ19760218B",
      status: "Missing",
      lastSeen: "04/02/2003",
      address: "Tech District Apartments, Block C, Unit 505",
      occupation: "Data Analyst",
      employer: "DataSync Technologies",
      description:
        "Male, 27, reported missing on 04/02/2003. Computer found with all data wiped.",
      notes:
        "Known for exceptional programming skills. Previously consulted for government databases. Apartment found with sophisticated electronic equipment.",
      details: {
        physical: {
          height: "179cm",
          weight: "75kg",
          eyeColor: "Blue",
          hairColor: "Blonde",
          distinguishingFeatures: "Birthmark on back of neck",
        },
        background: {
          nationality: "Azerbaijani",
          languages: "Azerbaijani, English, German",
          education:
            "MSc Computer Science, Technical University of Berlin (2000)",
          familyContacts:
            "Parents (deceased), sister: Aysel Babayeva (contact information on file)",
        },
        employment: {
          position: "Senior Data Analyst",
          clearanceLevel: "High - Data Systems",
          responsibilities:
            "Database architecture, data mining algorithms, predictive analytics",
          workHistory: [
            {
              employer: "DataSync Technologies",
              position: "Senior Data Analyst",
              dates: "06/2000 - Present",
            },
            {
              employer: "Government Statistical Office",
              position: "Consultant",
              dates: "01/2000 - 06/2000",
            },
            {
              employer: "Berlin Information Systems",
              position: "Intern",
              dates: "09/1998 - 12/1999",
            },
          ],
          certifications: [
            "Oracle Certified Database Expert",
            "Microsoft Certified Data Professional",
            "Advanced Data Mining Certification",
          ],
        },
        financial: {
          accountNumbers: ["KBB-4982176", "KBB-5103482"],
          transactionFlags: "Unusual electronic transfers",
          transactionHistory: [
            {
              date: "03/30/2003",
              type: "Withdrawal",
              amount: "₼18,500",
              description: "Electronic transfer to anonymous account",
            },
            {
              date: "03/15/2003",
              type: "Deposit",
              amount: "₼35,000",
              description: "Wire transfer from overseas account",
            },
          ],
          suspiciousActivity:
            "Pattern of funds moving through multiple accounts before withdrawal",
        },
        medical: {
          bloodType: "AB+",
          allergies: "Shellfish",
          medications: "None current",
          history:
            "Carpal tunnel syndrome (2001), Migraine treatment (ongoing)",
        },
        police: {
          caseNumbers: ["BPD-2003-0547"],
          criminalStatus: "No Criminal Record",
          caseOfficer: "Inspector Guliyev",
          evidenceItems: [
            "Wiped computer systems",
            "External hard drives (encrypted)",
            "Surveillance equipment at residence",
          ],
        },
        travel: {
          passportNumber: "AZE48291756",
          travelHistory: [
            {
              date: "01/2003",
              destination: "Germany",
            },
            {
              date: "10/2002",
              destination: "United States",
            },
            {
              date: "05/2001",
              destination: "Japan",
            },
          ],
        },
      },
    },

    // VICTIM 5: Unknown real name (MirrorMask)
    {
      id: "gov-3683",
      name: "Nazrin Hasanova",
      dateOfBirth: "09/30/1980",
      nationalID: "AZ19800930H",
      status: "Missing",
      lastSeen: "04/10/2003",
      address: "Artist District, Mir Apartment Building, Unit 12",
      occupation: "Graphic Designer / Identity Consultant",
      employer: "Creative Pulse Studios",
      description:
        "Female, 23, reported missing on 04/10/2003. Last seen leaving workplace. Known for exceptional forgery skills.",
      notes:
        "Apartment contained multiple identity documents under different names. Specialized in document reproduction and graphic design.",
      details: {
        physical: {
          height: "168cm",
          weight: "58kg",
          eyeColor: "Brown",
          hairColor: "Black (frequently changes color)",
          distinguishingFeatures: "Small tattoo of mirror on left wrist",
        },
        background: {
          nationality: "Azerbaijani",
          languages: "Azerbaijani, English, Turkish, Russian",
          education: "Fine Arts Degree, Baku Academy of Arts (2000)",
          familyContacts:
            "Mother: Aygun Hasanova (contact information on file)",
        },
        employment: {
          position: "Senior Graphic Designer",
          clearanceLevel: "Standard",
          responsibilities:
            "Document design, identity materials, creative direction",
          workHistory: [
            {
              employer: "Creative Pulse Studios",
              position: "Senior Graphic Designer",
              dates: "01/2001 - Present",
            },
            {
              employer: "Baku Document Services",
              position: "Document Specialist",
              dates: "06/2000 - 12/2000",
            },
          ],
          certifications: [
            "Adobe Certified Expert",
            "Security Printing Specialist",
            "Digital Forensics Awareness (government training)",
          ],
        },
        financial: {
          accountNumbers: ["IBB-7391042", "IBB-8273940"],
          transactionFlags: "Multiple identities linked to accounts",
          transactionHistory: [
            {
              date: "04/05/2003",
              type: "Withdrawal",
              amount: "₼12,000",
              description: "Cash withdrawal",
            },
            {
              date: "03/25/2003",
              type: "Deposit",
              amount: "₼30,000",
              description: "Source unknown",
            },
          ],
          suspiciousActivity:
            "Accounts under multiple names traced to same individual",
        },
        medical: {
          bloodType: "A+",
          allergies: "Latex",
          medications: "None current",
          history: "Eye examination (2002), Corrective lenses prescribed",
        },
        police: {
          caseNumbers: ["BPD-2003-0582"],
          criminalStatus: "Prior Investigation",
          caseOfficer: "Inspector Mammadov",
          evidenceItems: [
            "Multiple passports (different identities)",
            "Printing equipment",
            "Design templates for official documents",
          ],
        },
        travel: {
          passportNumber: "AZE36194728",
          travelHistory: [
            {
              date: "02/2003",
              destination: "Turkey",
            },
            {
              date: "11/2002",
              destination: "Georgia",
            },
            {
              date: "06/2001",
              destination: "Ukraine",
            },
          ],
        },
      },
    },

    // Additional People
    {
      id: "gov-1024",
      name: "Eldar Mammadov",
      dateOfBirth: "05/17/1962",
      nationalID: "AZ19620517M",
      status: "Active",
      address: "27 Nizami Street, Baku",
      occupation: "Police Inspector",
      employer: "Baku Police Department",
      description:
        "Male, 41, lead investigator on multiple missing persons cases.",
      notes:
        "Decorated officer with 20 years of service. Currently investigating recent disappearances.",
      details: {
        physical: {
          height: "180cm",
          weight: "85kg",
          eyeColor: "Brown",
          hairColor: "Black with gray",
        },
        background: {
          nationality: "Azerbaijani",
          languages: "Azerbaijani, Russian",
          education: "Police Academy, Baku (1985)",
        },
        employment: {
          position: "Senior Inspector, Missing Persons Division",
          clearanceLevel: "High - Law Enforcement",
          workHistory: [
            {
              employer: "Baku Police Department",
              position: "Senior Inspector",
              dates: "1995 - Present",
            },
            {
              employer: "Baku Police Department",
              position: "Patrol Officer",
              dates: "1985 - 1995",
            },
          ],
        },
      },
    },
    {
      id: "gov-1156",
      name: "Aysel Guliyeva",
      dateOfBirth: "03/24/1975",
      nationalID: "AZ19750324G",
      status: "Active",
      address: "Fountain Square Residences, Block A, Apt 42",
      occupation: "Software Developer",
      employer: "BakuTech Solutions",
      description: "Female, 28, programmer specializing in database systems.",
      notes:
        "Currently working on government database project. No criminal record.",
    },
    {
      id: "gov-1287",
      name: "Rashad Aliyev",
      dateOfBirth: "11/08/1968",
      nationalID: "AZ19681108A",
      status: "Active",
      address: "45 Republic Avenue, Baku",
      occupation: "Pharmacist",
      employer: "Central City Pharmacy",
      description:
        "Male, 35, licensed pharmacist with access to controlled substances.",
      notes:
        "No suspicious activity. Regular inventory checks show no discrepancies.",
    },
    {
      id: "gov-1342",
      name: "Leyla Jafarova",
      dateOfBirth: "07/19/1977",
      nationalID: "AZ19770719J",
      status: "Active",
      address: "Green Hills Complex, Building C, Apt 78",
      occupation: "Network Administrator",
      employer: "AzerbaijanTel",
      description:
        "Female, 26, manages network infrastructure for telecommunications company.",
      notes: "High security clearance. No suspicious activity noted.",
    },
    {
      id: "gov-1476",
      name: "Fuad Nasirov",
      dateOfBirth: "02/05/1979",
      nationalID: "AZ19790205N",
      status: "Active",
      address: "Seaside Apartments, Block D, Unit 34",
      occupation: "Electrical Engineer",
      employer: "Baku Power Distribution",
      description: "Male, 24, works on power grid infrastructure.",
      notes:
        "Regular security clearance. Cousin of missing person Ibrahim Nasirov - no contact in past 2 years.",
    },
    {
      id: "gov-1589",
      name: "Sabina Mammadova",
      dateOfBirth: "08/12/1982",
      nationalID: "AZ19820812M",
      status: "Active",
      address: "Student Housing Complex, Room 203",
      occupation: "Student",
      employer: "Baku State University",
      description:
        "Female, 21, computer science student with exceptional programming skills.",
      notes:
        "Flagged for attempting to access university security systems (2002). Warning issued.",
    },
    {
      id: "gov-1672",
      name: "Orkhan Huseynov",
      dateOfBirth: "06/28/1970",
      nationalID: "AZ19700628H",
      status: "Active",
      address: "42 Samad Vurgun Street, Baku",
      occupation: "Medical Doctor",
      employer: "Private Practice",
      description: "Male, 33, psychiatrist with private practice.",
      notes:
        "Prescribed controlled substances to patient Dr. Leyla Mahmudova for anxiety (2002).",
    },
    {
      id: "gov-1785",
      name: "Gulnara Azizova",
      dateOfBirth: "04/09/1973",
      nationalID: "AZ19730409A",
      status: "Active",
      address: "Old City District, 15 Maiden Tower Street",
      occupation: "Document Specialist",
      employer: "Ministry of Internal Affairs",
      description: "Female, 30, processes official identity documents.",
      notes:
        "Security clearance for sensitive document processing. No suspicious activity.",
    },
    {
      id: "gov-1832",
      name: "Tural Mammadli",
      dateOfBirth: "12/17/1974",
      nationalID: "AZ19741217M",
      status: "Person of Interest",
      address: "Unknown - Last known: 67 Oil Workers Avenue, Baku",
      occupation: "Computer Programmer",
      employer: "Self-employed",
      description:
        "Male, 29, freelance programmer with focus on security systems.",
      notes:
        "Under investigation for possible cyber crimes. Not directly connected to missing persons cases.",
    },
    {
      id: "gov-1947",
      name: "Kamala Hasanova",
      dateOfBirth: "05/30/1980",
      nationalID: "AZ19800530H",
      status: "Active",
      address: "Artists' District, Mirror Building, Apt 56",
      occupation: "Graphic Designer",
      employer: "Baku Marketing Group",
      description: "Female, 23, sister of missing person Nazrin Hasanova.",
      notes: "Cooperating with investigation. No suspicious activity noted.",
    },
    {
      id: "gov-2053",
      name: "Murad Jafarov",
      dateOfBirth: "09/21/1969",
      nationalID: "AZ19690921J",
      status: "Active",
      address: "28 Parliament Avenue, Baku",
      occupation: "Systems Administrator",
      employer: "Ministry of Communications",
      description: "Male, 34, manages government computer systems.",
      notes:
        "High security clearance. Regular background checks show no issues.",
    },
    {
      id: "gov-2164",
      name: "Fidan Karimova",
      dateOfBirth: "11/03/1981",
      nationalID: "AZ19811103K",
      status: "Active",
      address: "University Staff Housing, Block B, Unit 17",
      occupation: "Research Assistant",
      employer: "Azerbaijan Technical University",
      description:
        "Female, 22, research assistant in industrial engineering department.",
      notes:
        "Cousin of missing person Alex Karimov. Interviewed as part of investigation.",
    },
    {
      id: "gov-2278",
      name: "Elchin Maharramov",
      dateOfBirth: "03/12/1972",
      nationalID: "AZ19720312M",
      status: "Active",
      address: "Military Housing Complex, Building 4, Apt 23",
      occupation: "Security Consultant",
      employer: "Defense Ministry",
      description:
        "Male, 31, former military, now civilian consultant on security protocols.",
      notes: "High security clearance. No suspicious activity noted.",
    },
    {
      id: "gov-2385",
      name: "Nigar Aliyeva",
      dateOfBirth: "07/09/1978",
      nationalID: "AZ19780709A",
      status: "Active",
      address: "Central District, 45 Freedom Street, Apt 12",
      occupation: "Database Administrator",
      employer: "National Bank of Azerbaijan",
      description: "Female, 25, manages financial database systems.",
      notes: "High security clearance. No unusual financial activity detected.",
    },
    {
      id: "gov-2492",
      name: "Anar Babayev",
      dateOfBirth: "01/28/1971",
      nationalID: "AZ19710128B",
      status: "Active",
      address: "45 Victory Street, Baku",
      occupation: "Information Security Officer",
      employer: "SOCAR (State Oil Company)",
      description: "Male, 32, manages information security for oil company.",
      notes:
        "Attended same university as missing person Ibrahim Nasirov. No direct connection established.",
    },
  ],
};
