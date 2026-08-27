export type EntityType = 'person' | 'organization' | 'location' | 'vehicle' | 'phone' | 'account' | 'event';

export type ThreatLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NEUTRAL' | 'INTEL';

export type SourceType = 'FIR' | 'CDR' | 'FINANCIAL' | 'SURVEILLANCE' | 'SOCMINT' | 'CRIMINAL_DB' | 'INTEL_REPORT';

export type CaseStatus = 'OPEN' | 'UNDER_INVESTIGATION' | 'CLOSED' | 'ARCHIVED';

export type RelationshipType = 'FINANCIAL' | 'COMMUNICATION' | 'CO_LOCATION' | 'ASSOCIATION' | 'OWNERSHIP' | 'INFERRED';

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
  type: 'CIRCULAR_FUNDS' | 'BURNER_PHONE' | 'CALL_SPIKE_PRE_EVENT' | 'CO_LOCATION_CLUSTER' | 'RAPID_ASSET_DISPOSAL';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  entitiesInvolved: string[];
  timestamp: string;
  evidenceSnippet: string;
  status: 'UNREVIEWED' | 'INVESTIGATING' | 'FALSE_POSITIVE' | 'ESCALATED';
}

export interface TimelineEvent {
  id: string;
  caseId: string;
  entityId: string;
  timestamp: string;
  title: string;
  type: string;
  sourceTag: SourceType;
  locationName?: string;
  coordinates?: [number, number];
  description: string;
  linkedEntityIds: string[];
  category?: string;
  source?: string;
  relatedEntities?: string[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  target: string;
  caseId: string;
  ipAddress: string;
}
