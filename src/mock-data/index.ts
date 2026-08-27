import type { Case, Entity, Relationship, NLPItem, PatternAnomaly, TimelineEvent, AuditLog } from '../types';

export const MOCK_CASES: Case[] = [
  {
    id: 'case-2291',
    title: 'Operativa Syndicate - Cross-Border Cybercrime & Laundering',
    caseNumber: 'CASE-2026-2291',
    status: 'UNDER_INVESTIGATION',
    threatLevel: 'CRITICAL',
    leadInvestigator: 'Det. Insp. Marcus Vance (Badge #8804)',
    entityCount: 48,
    relationshipCount: 95,
    lastUpdated: '2026-08-25T14:30:00Z',
    description: 'Multi-jurisdictional syndicate operating ransomware C2 infrastructure, darknet data exfiltration portals, crypto mixers, and illicit shell wire transfers.',
    targetCell: 'Red Horizon Cyber & Cartel Cell',
    tags: ['Money Laundering', 'Cybercrime', 'Ransomware', 'Crypto Mixer', 'High Priority']
  },
  {
    id: 'case-1048',
    title: 'Redline Maritime Smuggling Network',
    caseNumber: 'CASE-2026-1048',
    status: 'OPEN',
    threatLevel: 'HIGH',
    leadInvestigator: 'Sr. Analyst Sarah Chen (Badge #4921)',
    entityCount: 28,
    relationshipCount: 54,
    lastUpdated: '2026-08-24T18:15:00Z',
    description: 'Coastal logistics firm laundering proceeds via vessel chartering accounts and GPS-masked transponders.',
    targetCell: 'Port Operations Alpha',
    tags: ['Maritime', 'Contraband', 'GPS Spoofing']
  },
  {
    id: 'case-4412',
    title: 'Apex Cyber Syndicate - Ransomware Cashout Ring',
    caseNumber: 'CASE-2026-4412',
    status: 'UNDER_INVESTIGATION',
    threatLevel: 'HIGH',
    leadInvestigator: 'Cyber Agent D. Kowalski (Badge #1109)',
    entityCount: 35,
    relationshipCount: 71,
    lastUpdated: '2026-08-25T09:45:00Z',
    description: 'Decentralized crypto mixer cashout network funneling funds through local shell bank accounts.',
    targetCell: 'Apex Crypto Cell',
    tags: ['Cybercrime', 'Crypto Mixer', 'Shell Accounts']
  },
  {
    id: 'case-0982',
    title: 'Ironclad Logistics Procurement Fraud',
    caseNumber: 'CASE-2026-0982',
    status: 'OPEN',
    threatLevel: 'MEDIUM',
    leadInvestigator: 'FinInt Analyst Alex Mercer',
    entityCount: 16,
    relationshipCount: 29,
    lastUpdated: '2026-08-22T11:20:00Z',
    description: 'Fraudulent municipal contract biddings linked to fictitious vendor addresses.',
    targetCell: 'Procurement Cell B',
    tags: ['Corruption', 'Contract Fraud']
  },
  {
    id: 'case-8831',
    title: 'Vanguard Weapons Trafficking Ring',
    caseNumber: 'CASE-2026-8831',
    status: 'CLOSED',
    threatLevel: 'LOW',
    leadInvestigator: 'Capt. R. Davis',
    entityCount: 52,
    relationshipCount: 110,
    lastUpdated: '2026-07-19T16:00:00Z',
    description: 'Archived case on illegal firearm movement along Interstate 95 corridor.',
    targetCell: 'Vanguard Cell',
    tags: ['Arms Trafficking', 'Resolved']
  }
];

export const MOCK_ENTITIES: Entity[] = [
  {
    id: 'ent-1',
    name: 'Viktor "The Architect" Rostov',
    type: 'person',
    riskScore: 96,
    threatLevel: 'CRITICAL',
    confidenceScore: 94,
    sourceTag: 'CRIMINAL_DB',
    centrality: { degree: 18, betweenness: 0.89, pageRank: 0.092 },
    aliases: ['Viktor R.', 'The Architect', 'V-Boss'],
    phone: '+1 (555) 902-8819',
    coordinates: [40.7128, -74.0060],
    locationName: 'New York, NY (Primary Hub)',
    associatedCaseIds: ['case-2291'],
    notesCount: 14,
    aiFlags: ['Key Cell Leader', 'Bridge Node Connecting 3 Sub-Networks', 'Unusual Financial Velocity'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    roleDescription: 'Primary Ring Leader & Financial Decision Maker',
    attributes: { 'DOB': '1978-04-12', 'Citizenship': 'Dual US/CY', 'Interpol Red Notice': 'ACTIVE-A-4901' }
  },
  {
    id: 'ent-2',
    name: 'Elena Rostova (Shell Manager)',
    type: 'person',
    riskScore: 84,
    threatLevel: 'HIGH',
    confidenceScore: 91,
    sourceTag: 'FINANCIAL',
    centrality: { degree: 14, betweenness: 0.72, pageRank: 0.075 },
    aliases: ['Elena Vance', 'E. Rostova'],
    phone: '+1 (555) 431-9022',
    coordinates: [40.7306, -73.9352],
    locationName: 'Queens, NY',
    associatedCaseIds: ['case-2291', 'case-4412'],
    notesCount: 8,
    aiFlags: ['High Transfer Frequency', 'Authorized Signatory on 5 Shell Accounts'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    roleDescription: 'Chief Financial Operator & Account Controller',
    attributes: { 'Passport': 'US-9918231', 'Tax ID': 'XX-XXX4910' }
  },
  {
    id: 'ent-3',
    name: 'Apex Global Holdings Ltd (Shell Co)',
    type: 'organization',
    riskScore: 90,
    threatLevel: 'CRITICAL',
    confidenceScore: 98,
    sourceTag: 'FIR',
    centrality: { degree: 16, betweenness: 0.81, pageRank: 0.084 },
    associatedCaseIds: ['case-2291', 'case-1048'],
    notesCount: 19,
    aiFlags: ['Fictitious Office Address', 'Circular Wire Recipient'],
    locationName: 'Financial District, NY',
    coordinates: [40.7075, -74.0089],
    attributes: { 'Registration': 'DEL-2023-8819', 'Declared Capital': '$5,000,000' }
  },
  {
    id: 'ent-4',
    name: 'Burner MSISDN +1-555-019-4821',
    type: 'phone',
    riskScore: 78,
    threatLevel: 'MEDIUM',
    confidenceScore: 88,
    sourceTag: 'CDR',
    centrality: { degree: 11, betweenness: 0.54, pageRank: 0.048 },
    phone: '+1 (555) 019-4821',
    associatedCaseIds: ['case-2291'],
    notesCount: 5,
    aiFlags: ['IMEI Swapped 4 Times', 'Pre-Incident Short Call Burst'],
    attributes: { 'Carrier': 'Prepaid MVNO', 'Activation Date': '2026-08-01' }
  },
  {
    id: 'ent-5',
    name: 'Black SUV - Plate NY-771-X99',
    type: 'vehicle',
    riskScore: 82,
    threatLevel: 'HIGH',
    confidenceScore: 95,
    sourceTag: 'SURVEILLANCE',
    centrality: { degree: 9, betweenness: 0.42, pageRank: 0.039 },
    vehiclePlate: 'NY-771-X99',
    coordinates: [40.7580, -73.9855],
    locationName: 'Midtown Manhattan (ALPR Hit)',
    associatedCaseIds: ['case-2291'],
    notesCount: 6,
    aiFlags: ['Multiple ALPR Hits Near Warehouses', 'Linked to Viktor Rostov'],
    attributes: { 'Make/Model': '2024 Cadillac Escalade Black', 'VIN': '1GYS4HKJ9RR192831' }
  },
  {
    id: 'ent-6',
    name: 'Warehouse Pier 42 Depot',
    type: 'location',
    riskScore: 88,
    threatLevel: 'HIGH',
    confidenceScore: 92,
    sourceTag: 'SURVEILLANCE',
    centrality: { degree: 12, betweenness: 0.63, pageRank: 0.059 },
    coordinates: [40.7101, -73.9785],
    locationName: 'Pier 42 Marine Terminal, NY',
    associatedCaseIds: ['case-2291', 'case-1048'],
    notesCount: 11,
    aiFlags: ['Co-Location Hotspot', 'Night Surveillance Activity'],
    attributes: { 'Zoning': 'Industrial/Port', 'Lease Holder': 'Apex Global Holdings' }
  },
  {
    id: 'ent-7',
    name: 'Chase Account #****-9921 (Apex Primary)',
    type: 'account',
    riskScore: 92,
    threatLevel: 'CRITICAL',
    confidenceScore: 99,
    sourceTag: 'FINANCIAL',
    centrality: { degree: 15, betweenness: 0.79, pageRank: 0.078 },
    accountNumber: 'CHASE-778-9921-X',
    associatedCaseIds: ['case-2291'],
    notesCount: 9,
    aiFlags: ['Rapid In-Out Wire Funneling', '$1.4M Outflow in 24 Hours'],
    attributes: { 'Bank': 'JPMorgan Chase', 'Branch': 'Wall Street NYC' }
  },
  {
    id: 'ent-8',
    name: 'Dmitri "The Hammer" Volkov',
    type: 'person',
    riskScore: 89,
    threatLevel: 'HIGH',
    confidenceScore: 87,
    sourceTag: 'INTEL_REPORT',
    centrality: { degree: 10, betweenness: 0.49, pageRank: 0.045 },
    aliases: ['Hammer Dmitri', 'D-Volk'],
    phone: '+1 (555) 772-1002',
    coordinates: [40.7484, -73.9857],
    locationName: 'Empire State Corridor',
    associatedCaseIds: ['case-2291'],
    notesCount: 7,
    aiFlags: ['Enforcer Role', 'Direct Link to Rostov'],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    roleDescription: 'Field Operations & Enforcer',
    attributes: { 'Criminal History': 'Prior Convictions (Extortion, Assault)' }
  },
  {
    id: 'ent-9',
    name: 'Offshore Trust - Grand Cayman #881',
    type: 'account',
    riskScore: 85,
    threatLevel: 'HIGH',
    confidenceScore: 84,
    sourceTag: 'FINANCIAL',
    centrality: { degree: 8, betweenness: 0.38, pageRank: 0.038 },
    accountNumber: 'CAYMAN-INT-88102',
    associatedCaseIds: ['case-2291', 'case-4412'],
    notesCount: 4,
    aiFlags: ['Ultimate Beneficiary Obfuscated'],
    attributes: { 'Jurisdiction': 'Cayman Islands' }
  },
  {
    id: 'ent-10',
    name: 'Illicit Transfer Event - $450,000',
    type: 'event',
    riskScore: 94,
    threatLevel: 'CRITICAL',
    confidenceScore: 96,
    sourceTag: 'FINANCIAL',
    centrality: { degree: 7, betweenness: 0.31, pageRank: 0.032 },
    coordinates: [40.7060, -74.0088],
    locationName: 'Financial District Wire Portal',
    associatedCaseIds: ['case-2291'],
    notesCount: 3,
    aiFlags: ['Structured Transaction Below SAR Threshold'],
    attributes: { 'Amount': '$450,000.00', 'Timestamp': '2026-08-24 23:14:02 UTC' }
  },
  {
    id: 'ent-13',
    name: '185.220.101.45 (Tor C2 Node)',
    type: 'ip',
    riskScore: 98,
    threatLevel: 'CRITICAL',
    confidenceScore: 99,
    sourceTag: 'CYBER_INTEL',
    centrality: { degree: 17, betweenness: 0.85, pageRank: 0.088 },
    ipAddress: '185.220.101.45',
    locationName: 'Bucharest, Romania (Tor Exit Node)',
    associatedCaseIds: ['case-2291', 'case-4412'],
    notesCount: 12,
    aiFlags: ['Active Command & Control Server', 'Ransomware Beaconing Destination', 'High Egress Egress'],
    roleDescription: 'Primary Cyber Attack Command & Control Hub',
    attributes: { 'ASN': 'AS208091', 'Protocol': 'HTTPS Encrypted C2 Tunnel' }
  },
  {
    id: 'ent-14',
    name: 'darknet-exfiltrate-vault.onion',
    type: 'domain',
    riskScore: 95,
    threatLevel: 'CRITICAL',
    confidenceScore: 97,
    sourceTag: 'DARKNET_LEAK',
    centrality: { degree: 13, betweenness: 0.74, pageRank: 0.071 },
    domainName: 'darknet-exfiltrate-vault.onion',
    associatedCaseIds: ['case-2291', 'case-4412'],
    notesCount: 8,
    aiFlags: ['Tor Hidden Service', 'Corporate Data Leak Portal', 'Extortion Storage Vault'],
    roleDescription: 'Stolen Corporate Data Storage & Extortion Portal',
    attributes: { 'Darkweb Protocol': 'v3 Onion Service', 'Indexed Data': '450GB Exfiltrated SQL Dump' }
  },
  {
    id: 'ent-15',
    name: '0x71C765f928...49A (Tether USDT)',
    type: 'crypto',
    riskScore: 97,
    threatLevel: 'CRITICAL',
    confidenceScore: 99,
    sourceTag: 'BLOCKCHAIN_SWIFT',
    centrality: { degree: 15, betweenness: 0.78, pageRank: 0.079 },
    cryptoWallet: '0x71C765f928aA192B45e119420049A',
    associatedCaseIds: ['case-2291', 'case-4412'],
    notesCount: 10,
    aiFlags: ['Ransom Payment Recipient Wallet', 'Tornado Cash Mixer Hops', 'High USDT Inflow'],
    roleDescription: 'Primary Cyber Extortion Ransom Payment Wallet',
    attributes: { 'Blockchain': 'Ethereum / TRON USDT', 'Total Received': '$1,850,000 USDT' }
  },
  {
    id: 'ent-16',
    name: 'LockBit 3.0 Ransomware Binary',
    type: 'malware',
    riskScore: 99,
    threatLevel: 'CRITICAL',
    confidenceScore: 100,
    sourceTag: 'FIREWALL_LOG',
    centrality: { degree: 14, betweenness: 0.76, pageRank: 0.077 },
    malwareHash: 'a891f92c10b429188e4019a84210b490',
    associatedCaseIds: ['case-2291', 'case-4412'],
    notesCount: 15,
    aiFlags: ['Automated Endpoint Encryptor', 'Shadow Copy Wiping Executable', 'Credential Harvester'],
    roleDescription: 'Destructive Encryptor Binary & Stealer',
    attributes: { 'SHA-256': 'a891f92c10b429188e4019a84210b490a891f92c10b429188e4019a84210b490', 'Family': 'LockBit 3.0 Black' }
  },
  {
    id: 'ent-17',
    name: 'Spear-Phishing OAuth Exploit Event',
    type: 'cyberattack',
    riskScore: 91,
    threatLevel: 'HIGH',
    confidenceScore: 94,
    sourceTag: 'CYBER_INTEL',
    centrality: { degree: 11, betweenness: 0.58, pageRank: 0.052 },
    associatedCaseIds: ['case-2291'],
    notesCount: 6,
    aiFlags: ['Targeted Executive Phishing', 'OAuth Token Theft', 'Initial Access Vector'],
    roleDescription: 'Initial Network Penetration Vector',
    attributes: { 'Attack Vector': 'Malicious Executive Phishing Email', 'Target Account': 'cfo@apexglobal.com' }
  }
];

export const MOCK_RELATIONSHIPS: Relationship[] = [
  {
    id: 'rel-1',
    source: 'ent-1',
    target: 'ent-2',
    type: 'ASSOCIATION',
    label: 'Direct Command / Co-Conspirator',
    confidence: 96,
    verified: true,
    thickness: 5,
    frequency: 'Daily Contact',
    lastTimestamp: '2026-08-25T12:00:00Z',
    sourceDoc: 'FIR-2026-8891 (Wiretap Order #401)',
    aiFlagged: false
  },
  {
    id: 'rel-2',
    source: 'ent-1',
    target: 'ent-3',
    type: 'OWNERSHIP',
    label: 'Beneficial Owner (100% Control)',
    confidence: 98,
    verified: true,
    thickness: 4,
    sourceDoc: 'FinCEN SAR #992019',
    aiFlagged: false
  },
  {
    id: 'rel-3',
    source: 'ent-2',
    target: 'ent-7',
    type: 'FINANCIAL',
    label: 'Signatory & Wire Initiator',
    confidence: 99,
    verified: true,
    thickness: 5,
    amount: '$2,450,000 Cumulative',
    sourceDoc: 'Chase Bank Records Subpoena #882',
    aiFlagged: false
  },
  {
    id: 'rel-16',
    source: 'ent-1',
    target: 'ent-13',
    type: 'C2_COMMUNICATION',
    label: 'Encrypted C2 Command Tunnel',
    confidence: 99,
    verified: true,
    thickness: 5,
    sourceDoc: 'Sysmon_Event_3_Firewall.log',
    aiFlagged: true,
    aiReason: 'Ransomware C2 Command Tunneling'
  },
  {
    id: 'rel-17',
    source: 'ent-13',
    target: 'ent-14',
    type: 'DATA_EXFILTRATION',
    label: '50GB Darknet DNS Egress Tunnel',
    confidence: 97,
    verified: true,
    thickness: 5,
    sourceDoc: 'Zeek_DNS_Tunneling.log',
    aiFlagged: true,
    aiReason: 'Massive Exfiltration to Darkweb Vault'
  },
  {
    id: 'rel-18',
    source: 'ent-15',
    target: 'ent-3',
    type: 'CRYPTO_RANSOM',
    label: '$1,250,000 USDT Ransom Cashout',
    confidence: 98,
    verified: true,
    thickness: 5,
    sourceDoc: 'Chainalysis_Blockchain_Trace.csv',
    aiFlagged: true,
    aiReason: 'Crypto Ransom Payment to Shell Company'
  },
  {
    id: 'rel-19',
    source: 'ent-16',
    target: 'ent-13',
    type: 'MALWARE_INFECTION',
    label: 'LockBit Beaconing & RSA Key Sync',
    confidence: 99,
    verified: true,
    thickness: 5,
    sourceDoc: 'CrowdStrike_EDR_Alert_991.json',
    aiFlagged: true,
    aiReason: 'Active Ransomware Encryption Execution'
  }
];

export const MOCK_NLP_ITEMS: NLPItem[] = [
  {
    id: 'nlp-1',
    sourceDocument: 'FIR_Report_2026_0991.txt',
    extractedName: 'Ravi Kumar (Suspect)',
    extractedType: 'person',
    confidenceScore: 94,
    textSnippet: 'Witness statement confirms suspect Ravi Kumar was spotted handing over a black briefcase containing $50,000 cash near Pier 42 Marine Terminal.',
    fullTextPayload: `FIRST INFORMATION REPORT (Under Section 154 Cr.P.C.)
District: Metro Sector 4 | Police Station: Central Intelligence Cell | Year: 2026 | FIR No: 0991/2026
Date & Time of Occurrence: 24/08/2026 at 23:15 Hours

1. Name of Suspect: Ravi Kumar
2. Offence Alleged: Criminal Conspiracy, Money Laundering, Illicit Cash Handover
3. Investigation Details: On the night of 24th August 2026, surveillance team Delta observed suspect Ravi Kumar arriving at Pier 42 Marine Terminal in a black sedan (License Plate NY-771-X99). Suspect met with Elena Rostova and transferred a black hard-shell case containing approximately $50,000 in unrecorded currency notes. Telemetry pings from cell tower #402 confirm presence of burner phone +1-555-019-4821 at exact scene.`,
    status: 'PENDING'
  },
  {
    id: 'nlp-2',
    sourceDocument: 'Sysmon_Firewall_C2_Alert.log',
    extractedName: '185.220.101.45 (Tor C2 Server)',
    extractedType: 'ip',
    confidenceScore: 99,
    textSnippet: 'EDR alert detected endpoint PC-EXEC-01 establishing HTTPS SSH tunnel to external Tor C2 IP 185.220.101.45 exfiltrating 50GB DNS payload.',
    fullTextPayload: `CYBERSECURITY SIEM / EDR THREAT DETECTION INCIDENT
Alert ID: SEC-2026-99201 | Severity: CRITICAL | System: Sysmon Kernel Driver
Event Type: Process Access / Network Connection (Sysmon Event ID 3)

Source Endpoint: Workstation PC-EXEC-01 (Domain Controller Admin)
Destination IP: 185.220.101.45 (Known Tor Exit Node / LockBit C2 Server)
Destination Domain: darknet-exfiltrate-vault.onion
Data Transfer Volume: 51.4 GB via DNS Tunneling Protocol (Port 53 / 443)
Malware Process: LockBit_3.0_Payload.exe (SHA-256: a891f92c10b429188e4019a84210b490)
Action Taken: Endpoint Quarantined by SOC Automation.`,
    status: 'PENDING'
  }
];

export const MOCK_PATTERNS: PatternAnomaly[] = [
  {
    id: 'pat-101',
    caseId: 'case-2291',
    title: 'Ransomware C2 Beaconing & 50GB DNS Exfiltration',
    type: 'CYBER_EXFILTRATION',
    severity: 'HIGH',
    description: 'Automated detection of malware process beaconing to Tor C2 server 185.220.101.45 followed by 50GB DNS egress transfer to darknet-exfiltrate-vault.onion.',
    entitiesInvolved: ['185.220.101.45 (Tor C2 Node)', 'darknet-exfiltrate-vault.onion', 'LockBit 3.0 Ransomware Binary'],
    timestamp: '2026-08-25T14:10:05Z',
    status: 'NEW',
    evidenceSnippet: 'Sysmon Event ID 3: 50.4GB outbound DNS tunnel payload to 185.220.101.45 (Tor C2 Destination).'
  },
  {
    id: 'pat-102',
    caseId: 'case-2291',
    title: 'Crypto Mixer Cashout Funneling (Tether USDT)',
    type: 'CRYPTO_LAUNDERING',
    severity: 'HIGH',
    description: 'Ransomware wallet 0x71C7...49A transferred 1,250,000 USDT through 4 Tornado Cash mixing hops into Apex Global Holdings bank account.',
    entitiesInvolved: ['0x71C765f928...49A (Tether USDT)', 'Apex Global Holdings Ltd (Shell Co)'],
    timestamp: '2026-08-25T11:45:00Z',
    status: 'NEW',
    evidenceSnippet: 'Chainalysis Blockchain Trace: $1,250,000 USDT cashout from ransomware wallet into JPMorgan Chase Account #****-9921.'
  }
];

export const MOCK_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'evt-1',
    timestamp: '2026-08-24T23:14:02Z',
    title: 'Ransomware C2 Tunneling & $1.25M Crypto Cashout',
    description: 'C2 Server 185.220.101.45 received 50GB exfiltrated corporate data while ransomware wallet 0x71C7...49A initiated $1.25M Tether transfer to Apex Shell Bank Account.',
    type: 'CYBERATTACK_AND_FINANCIAL',
    locationName: 'Bucharest Tor Node ↔ NYC Financial District',
    entityId: 'ent-13'
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-101',
    timestamp: '2026-08-25T14:15:00Z',
    user: 'Det. Insp. Marcus Vance',
    action: 'CYBER_C2_INVESTIGATION',
    target: 'Tor Node 185.220.101.45',
    ipAddress: '10.240.8.12'
  }
];
