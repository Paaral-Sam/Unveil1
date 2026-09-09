export type EntityType =
  | 'person'
  | 'organization'
  | 'location'
  | 'vehicle'
  | 'phone'
  | 'account'
  | 'event'
  | 'ip'
  | 'domain'
  | 'crypto'
  | 'cyberattack'
  | 'malware';

export type ThreatLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NEUTRAL' | 'INTEL';

export type SourceType =
  | 'FIR'
  | 'CDR'
  | 'FINANCIAL'
  | 'SURVEILLANCE'
  | 'SOCMINT'
  | 'CRIMINAL_DB'
  | 'INTEL_REPORT'
  | 'CYBER_INTEL'
  | 'FIREWALL_LOG'
  | 'DARKNET_LEAK'
  | 'BLOCKCHAIN_SWIFT'
  | 'OSINT_PUBLIC';

export type CaseStatus = 'OPEN' | 'UNDER_INVESTIGATION' | 'CLOSED' | 'ARCHIVED';

export type RelationshipType =
  | 'FINANCIAL'
  | 'COMMUNICATION'
  | 'CO_LOCATION'
  | 'ASSOCIATION'
  | 'OWNERSHIP'
  | 'INFERRED'
  | 'C2_COMMUNICATION'
  | 'DATA_EXFILTRATION'
  | 'CRYPTO_RANSOM'
  | 'MALWARE_INFECTION';

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  riskScore: number; // 0 to 100
  threatLevel: ThreatLevel;
  confidenceScore: number; // 0 to 100
  sourceTag: SourceType;
  centrality: {
    degree: number;
    betweenness: number;
    pageRank: number;
  };
  aliases?: string[];
  phone?: string;
  vehiclePlate?: string;
  accountNumber?: string;
  ipAddress?: string;
  domainName?: string;
  cryptoWallet?: string;
  malwareHash?: string;
  coordinates?: [number, number]; // [lat, lng]
  locationName?: string;
  associatedCaseIds: string[];
  notesCount: number;
  aiFlags?: string[];
  avatarUrl?: string;
  roleDescription?: string;
  attributes?: Record<string, string>;
}

export interface Relationship {
  id: string;
  source: string; // Entity ID
  target: string; // Entity ID
  type: RelationshipType;
  label: string;
  confidence: number;
  verified: boolean;
  thickness: number; // 1 to 5
  amount?: string;
  frequency?: string;
  lastTimestamp?: string;
  sourceDoc?: string;
  aiFlagged?: boolean;
  aiReason?: string;
}

export interface Case {
  id: string;
  title: string;
  caseNumber: string;
  status: CaseStatus;
  threatLevel: ThreatLevel;
  leadInvestigator: string;
  entityCount: number;
  relationshipCount: number;
  lastUpdated: string;
  description: string;
  targetCell: string;
  tags: string[];
}

export interface NLPItem {
  id: string;
  textSnippet: string;
  fullTextPayload?: string;
  extractedName: string;
  extractedType: EntityType;
  confidenceScore: number;
  sourceDocument: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EDITED';
  editedName?: string;
  editedType?: EntityType;
}

export interface PatternAnomaly {
  id: string;
  caseId: string;
  title: string;
  type: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  entitiesInvolved: string[];
  timestamp: string;
  status: 'NEW' | 'REVIEWED' | 'DISMISSED' | 'UNREVIEWED' | 'INVESTIGATING' | 'CONFIRMED_THREAT' | 'FALSE_POSITIVE';
  evidenceSnippet?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor?: string;
  role?: string;
  action: string;
  resource?: string;
  status?: 'SUCCESS' | 'DENIED' | 'FLAGGED';
  ipAddress?: string;
  user?: string;
  target?: string;
  caseId?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: string;
  entityIds?: string[];
  entityId?: string;
  linkedEntityIds?: string[];
  sourceTag?: string;
  caseId?: string;
  locationName?: string;
  coordinates?: [number, number];
}

export interface OsintMatchedEntity {
  entityId: string;
  name: string;
  type: EntityType;
  matchScore: number; // 0 to 100
}

export interface OsintFinding {
  id: string;
  searchId?: string;
  caseId: string;
  query: string;
  queryType: string;
  title: string;
  url: string;
  source: string;
  snippet: string;
  content?: string;
  publishedAt?: string;
  retrievedAt: string;
  relevanceScore: number;
  confidenceScore: number;
  aiSummary: string;
  aiFlags: string[];
  entitiesExtracted: { name: string; type: EntityType }[];
  matchedEntities?: OsintMatchedEntity[];
  status: 'UNREVIEWED' | 'APPROVED' | 'REJECTED';
}

export interface OsintSearch {
  id: string;
  caseId: string;
  query: string;
  queryType: string;
  searchStatus: 'RUNNING' | 'COMPLETED' | 'FAILED';
  resultCount: number;
  createdAt: string;
  completedAt?: string;
}

export interface FinancialTransaction {
  id: string;
  caseId: string;
  transactionId: string;
  accountId: string;
  accountHolder: string;
  counterparty: string;
  accountHolderEntityId?: string;
  counterpartyEntityId?: string;
  transactionType: 'TRANSFER' | 'DEPOSIT' | 'WITHDRAWAL' | 'CRYPTO_SWAP' | 'SWIFT';
  amount: number;
  currency: string;
  timestamp: string;
  location?: string;
  merchant?: string;
  description?: string;
  referenceNumber?: string;
  sourceDocument: string;
  riskScore: number;
  riskFlags: string[];
  provenance: 'OBSERVED DATA' | 'AI ANALYSIS' | 'INVESTIGATOR VERIFIED';
}

export interface FinancialAccount {
  id: string;
  caseId: string;
  entityId?: string;
  accountNumberMasked: string;
  accountType: string;
  institution: string;
  currency: string;
  status: string;
}

export interface CallRecord {
  id: string;
  caseId: string;
  callId: string;
  callerEntityId?: string;
  receiverEntityId?: string;
  callerNumberMasked: string;
  receiverNumberMasked: string;
  timestamp: string;
  durationSeconds: number;
  callType: 'INCOMING' | 'OUTGOING' | 'MISSED' | 'SMS' | 'ENCRYPTED';
  cellTower?: string;
  location?: string;
  riskScore: number;
  riskFlags: string[];
  sourceDocument: string;
  provenance: 'OBSERVED DATA' | 'AI ANALYSIS' | 'INVESTIGATOR VERIFIED';
}

export interface CrossDomainCorrelation {
  id: string;
  caseId: string;
  entitiesInvolved: string[];
  timeDifferenceMinutes: number;
  callEvidence: CallRecord;
  financialEvidence: FinancialTransaction;
  reason: string;
  confidenceScore: number;
  timestamp: string;
}
