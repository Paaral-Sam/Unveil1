<<<<<<< HEAD
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import type {
  Case,
  Entity,
  Relationship,
  NLPItem,
  PatternAnomaly,
  EntityType,
  AuditLog,
  TimelineEvent,
} from '../types';

import {
  MOCK_CASES,
  MOCK_ENTITIES,
  MOCK_RELATIONSHIPS,
  MOCK_NLP_ITEMS,
  MOCK_PATTERNS,
  MOCK_AUDIT_LOGS,
  MOCK_TIMELINE_EVENTS,
} from '../mock-data';

import { supabase } from '../lib/supabase';
=======
import React, { createContext, useContext, useState } from 'react';
import type { Case, Entity, Relationship, NLPItem, PatternAnomaly, EntityType, AuditLog, TimelineEvent } from '../types';
import { MOCK_CASES, MOCK_ENTITIES, MOCK_RELATIONSHIPS, MOCK_NLP_ITEMS, MOCK_PATTERNS, MOCK_AUDIT_LOGS, MOCK_TIMELINE_EVENTS } from '../mock-data';
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9

interface AppContextType {
  cases: Case[];
  currentCase: Case;
  entities: Entity[];
  relationships: Relationship[];
  nlpItems: NLPItem[];
  patterns: PatternAnomaly[];
  auditLogs: AuditLog[];
  timelineEvents: TimelineEvent[];
  selectedEntityId: string | null;
  selectedEdgeId: string | null;
  activeTab: string;
  searchQuery: string;
  searchFilterType: EntityType | 'all';
  isDarkMode: boolean;
  classificationLevel: string;
<<<<<<< HEAD
  currentUser: {
    name: string;
    badge: string;
    role: 'Analyst' | 'Investigator' | 'Supervisor' | 'Admin';
  };
  isAuthenticated: boolean;
  currentScreen: 'welcome' | 'login' | 'main';
  loginRole: 'user' | 'admin';

=======
  currentUser: { name: string; badge: string; role: 'Analyst' | 'Investigator' | 'Supervisor' | 'Admin' };
  isAuthenticated: boolean;
  currentScreen: 'welcome' | 'login' | 'main';
  loginRole: 'user' | 'admin';
  
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
  // Actions
  goToWelcome: () => void;
  goToLogin: (role?: 'user' | 'admin') => void;
  loginUser: (badgeId: string, mfaToken: string) => void;
<<<<<<< HEAD
  loginAdmin: (adminKey: string) => {
    success: boolean;
    message?: string;
  };
=======
  loginAdmin: (adminKey: string) => { success: boolean; message?: string };
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
  logout: () => void;
  setCaseId: (id: string) => void;
  setSelectedEntityId: (id: string | null) => void;
  setSelectedEdgeId: (id: string | null) => void;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  setSearchFilterType: (type: EntityType | 'all') => void;
  toggleTheme: () => void;
  setClassificationLevel: (level: string) => void;
<<<<<<< HEAD

=======
  
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
  // NLP Actions
  approveNLPItem: (id: string) => void;
  rejectNLPItem: (id: string) => void;
  editNLPItem: (id: string, name: string, type: EntityType) => void;
  addNLPItems: (newItems: NLPItem[]) => void;
<<<<<<< HEAD

  // Pattern Actions
  updatePatternStatus: (
    id: string,
    status: PatternAnomaly['status']
  ) => void;

=======
  
  // Pattern Actions
  updatePatternStatus: (id: string, status: PatternAnomaly['status']) => void;
  
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
  // Entity Notes & Mutation
  addNoteToEntity: (entityId: string, text: string) => void;
  addEntity: (entity: Entity) => void;
  addRelationship: (rel: Relationship) => void;
<<<<<<< HEAD

=======
  
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
  // Case Action
  createCase: (newCase: Partial<Case>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

<<<<<<< HEAD
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cases, setCases] = useState<Case[]>(MOCK_CASES);
  const [currentCaseId, setCurrentCaseId] =
    useState<string>('case-2291');

  const [entities, setEntities] =
    useState<Entity[]>(MOCK_ENTITIES);

  const [relationships, setRelationships] =
    useState<Relationship[]>(MOCK_RELATIONSHIPS);

  const [nlpItems, setNlpItems] =
    useState<NLPItem[]>(MOCK_NLP_ITEMS);

  const [patterns, setPatterns] =
    useState<PatternAnomaly[]>(MOCK_PATTERNS);

  const [auditLogs, setAuditLogs] =
    useState<AuditLog[]>(MOCK_AUDIT_LOGS);

  const [timelineEvents] =
    useState<TimelineEvent[]>(MOCK_TIMELINE_EVENTS);

  const [selectedEntityId, setSelectedEntityId] =
    useState<string | null>('ent-1');

  const [selectedEdgeId, setSelectedEdgeId] =
    useState<string | null>(null);

  const [activeTab, setActiveTab] =
    useState<string>('dashboard');

  const [searchQuery, setSearchQuery] =
    useState<string>('');

  const [searchFilterType, setSearchFilterType] =
    useState<EntityType | 'all'>('all');

  const [isDarkMode, setIsDarkMode] =
    useState<boolean>(true);

  const [classificationLevel, setClassificationLevel] =
    useState<string>('RESTRICTED — FOR OFFICIAL USE ONLY');

  // Navigation Screens: 'welcome' -> 'login' -> 'main'
  const [currentScreen, setCurrentScreen] =
    useState<'welcome' | 'login' | 'main'>('welcome');

  const [loginRole, setLoginRole] =
    useState<'user' | 'admin'>('user');

  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(false);
=======
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<Case[]>(MOCK_CASES);
  const [currentCaseId, setCurrentCaseId] = useState<string>('case-2291');
  const [entities, setEntities] = useState<Entity[]>(MOCK_ENTITIES);
  const [relationships, setRelationships] = useState<Relationship[]>(MOCK_RELATIONSHIPS);
  const [nlpItems, setNlpItems] = useState<NLPItem[]>(MOCK_NLP_ITEMS);
  const [patterns, setPatterns] = useState<PatternAnomaly[]>(MOCK_PATTERNS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [timelineEvents] = useState<TimelineEvent[]>(MOCK_TIMELINE_EVENTS);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>('ent-1');
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFilterType, setSearchFilterType] = useState<EntityType | 'all'>('all');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [classificationLevel, setClassificationLevel] = useState<string>('RESTRICTED — FOR OFFICIAL USE ONLY');
  
  // Navigation Screens: 'welcome' -> 'login' -> 'main'
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'login' | 'main'>('welcome');
  const [loginRole, setLoginRole] = useState<'user' | 'admin'>('user');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9

  const [currentUser, setCurrentUser] = useState({
    name: 'Analyst J. Vance',
    badge: '#8804',
<<<<<<< HEAD
    role: 'Analyst' as
      | 'Analyst'
      | 'Investigator'
      | 'Supervisor'
      | 'Admin',
  });

  // ============================================================
  // SUPABASE: LOAD CASES
  // ============================================================

  useEffect(() => {
    const loadCases = async () => {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error(
          'Failed to load cases from Supabase:',
          error
        );
        return;
      }

      if (data && data.length > 0) {
        const dbCases: Case[] = data.map((row) => ({
          id: row.id,
          title: row.title,
          caseNumber: row.case_number,
          status: row.status as Case['status'],
          threatLevel: row.threat_level as Case['threatLevel'],
          leadInvestigator: row.lead_investigator,
          targetCell: row.target_cell || '',
          description: row.description || '',
          entityCount: row.entity_count || 0,
          relationshipCount: row.relationship_count || 0,
          tags: row.tags || [],
          lastUpdated: row.last_updated,
        }));

        setCases(dbCases);
        setCurrentCaseId(dbCases[0].id);
      } else {
        console.log(
          'Supabase connected successfully, but the cases table is empty.'
        );
      }
    };

    loadCases();
  }, []);

  const currentCase =
    cases.find((c) => c.id === currentCaseId) || cases[0];
=======
    role: 'Analyst' as 'Analyst' | 'Investigator' | 'Supervisor' | 'Admin'
  });

  const currentCase = cases.find(c => c.id === currentCaseId) || cases[0];
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9

  const goToWelcome = () => {
    setCurrentScreen('welcome');
  };

<<<<<<< HEAD
  const goToLogin = (
    role: 'user' | 'admin' = 'user'
  ) => {
=======
  const goToLogin = (role: 'user' | 'admin' = 'user') => {
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
    setLoginRole(role);
    setCurrentScreen('login');
  };

<<<<<<< HEAD
  const loginUser = (
    badgeId: string,
    _mfaToken: string
  ) => {
    setCurrentUser({
      name: 'Analyst J. Vance',
      badge: badgeId || '#8804',
      role: 'Analyst',
    });

=======
  const loginUser = (badgeId: string, _mfaToken: string) => {
    setCurrentUser({
      name: 'Analyst J. Vance',
      badge: badgeId || '#8804',
      role: 'Analyst'
    });
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
    setIsAuthenticated(true);
    setCurrentScreen('main');
    setActiveTab('dashboard');
  };

  const loginAdmin = (adminKey: string) => {
    if (adminKey === 'unveil2026') {
      setCurrentUser({
        name: 'Chief Admin Director',
        badge: '#ADM-001',
<<<<<<< HEAD
        role: 'Admin',
      });

      setIsAuthenticated(true);
      setCurrentScreen('main');
      setActiveTab('dashboard');

      return { success: true };
    }

    return {
      success: false,
      message: 'Invalid Admin Key! Access Denied.',
    };
=======
        role: 'Admin'
      });
      setIsAuthenticated(true);
      setCurrentScreen('main');
      setActiveTab('dashboard');
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin Key! Access Denied.' };
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('welcome');
  };

  const setCaseId = (id: string) => {
    setCurrentCaseId(id);
  };

  const toggleTheme = () => {
<<<<<<< HEAD
    setIsDarkMode((prev) => !prev);

=======
    setIsDarkMode(prev => !prev);
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

<<<<<<< HEAD
  // ============================================================
  // COMPLETE END-TO-END INTELLIGENCE PIPELINE
  // FEATURES 2 TO 6 - CURRENTLY IN MEMORY
  // ============================================================

  const approveNLPItem = (id: string) => {
    setNlpItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: 'APPROVED' }
          : item
      )
    );

    const targetItem = nlpItems.find(
      (i) => i.id === id
    );

=======
  // COMPLETE END-TO-END INTELLIGENCE PIPELINE (FEATURES 2 TO 6) IN-MEMORY
  const approveNLPItem = (id: string) => {
    setNlpItems(prev => prev.map(item => item.id === id ? { ...item, status: 'APPROVED' } : item));

    const targetItem = nlpItems.find(i => i.id === id);
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
    if (!targetItem) return;

    const baseTimestamp = Date.now();
    const primaryName = targetItem.extractedName;

    // FEATURE 2: Extract Entities & Discovered Nodes
<<<<<<< HEAD
    const mainSubjectId =
      `ent-approved-main-${baseTimestamp}`;

    const associateSubjectId =
      `ent-approved-assoc-${baseTimestamp}`;

    const phoneEntityId =
      `ent-approved-phone-${baseTimestamp}`;

    const vehicleEntityId =
      `ent-approved-vehicle-${baseTimestamp}`;

    const accountEntityId =
      `ent-approved-[#****-9921]-${baseTimestamp}`;

    const locationEntityId =
      `ent-approved-loc-${baseTimestamp}`;
=======
    const mainSubjectId = `ent-approved-main-${baseTimestamp}`;
    const associateSubjectId = `ent-approved-assoc-${baseTimestamp}`;
    const phoneEntityId = `ent-approved-phone-${baseTimestamp}`;
    const vehicleEntityId = `ent-approved-vehicle-${baseTimestamp}`;
    const accountEntityId = `ent-approved-[#****-9921]-${baseTimestamp}`;
    const locationEntityId = `ent-approved-loc-${baseTimestamp}`;
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9

    const newExtractedNodes: Entity[] = [
      {
        id: mainSubjectId,
        name: primaryName,
        type: targetItem.extractedType || 'person',
        riskScore: 96,
        threatLevel: 'CRITICAL',
        confidenceScore: 98,
        sourceTag: 'FIR',
<<<<<<< HEAD
        centrality: {
          degree: 18,
          betweenness: 0.94,
          pageRank: 0.18,
        },
=======
        centrality: { degree: 18, betweenness: 0.94, pageRank: 0.18 },
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
        phone: '+1-555-019-4821',
        vehiclePlate: 'NY-771-X99',
        accountNumber: 'CHASE-OFFSHORE-9921',
        associatedCaseIds: [currentCaseId],
        notesCount: 2,
<<<<<<< HEAD
        roleDescription:
          'Primary Syndicate Ringleader / Mastermind',
        aiFlags: [
          'Extracted via Human-in-the-Loop Review',
          'High Financial Influence',
          'Multi-Source Signal Hit',
        ],
=======
        roleDescription: 'Primary Syndicate Ringleader / Mastermind',
        aiFlags: ['Extracted via Human-in-the-Loop Review', 'High Financial Influence', 'Multi-Source Signal Hit']
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
      },
      {
        id: associateSubjectId,
        name: 'Elena Rostova',
        type: 'person',
        riskScore: 89,
        threatLevel: 'HIGH',
        confidenceScore: 94,
        sourceTag: 'FIR',
<<<<<<< HEAD
        centrality: {
          degree: 11,
          betweenness: 0.72,
          pageRank: 0.11,
        },
        phone: '+1-555-019-[#****-9921]',
        associatedCaseIds: [currentCaseId],
        notesCount: 1,
        roleDescription:
          'Financial Proxy / Money Conduit',
        aiFlags: [
          'Offshore SWIFT Wire Controller',
        ],
=======
        centrality: { degree: 11, betweenness: 0.72, pageRank: 0.11 },
        phone: '+1-555-019-[#****-9921]',
        associatedCaseIds: [currentCaseId],
        notesCount: 1,
        roleDescription: 'Financial Proxy / Money Conduit',
        aiFlags: ['Offshore SWIFT Wire Controller']
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
      },
      {
        id: phoneEntityId,
        name: '+1-555-019-4821',
        type: 'phone',
        riskScore: 84,
        threatLevel: 'HIGH',
        confidenceScore: 95,
        sourceTag: 'CDR',
<<<<<<< HEAD
        centrality: {
          degree: 9,
          betweenness: 0.65,
          pageRank: 0.08,
        },
        associatedCaseIds: [currentCaseId],
        notesCount: 1,
        aiFlags: [
          'Burner Phone Telemetry Spikes',
        ],
=======
        centrality: { degree: 9, betweenness: 0.65, pageRank: 0.08 },
        associatedCaseIds: [currentCaseId],
        notesCount: 1,
        aiFlags: ['Burner Phone Telemetry Spikes']
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
      },
      {
        id: vehicleEntityId,
        name: 'NY-771-X99',
        type: 'vehicle',
        riskScore: 91,
        threatLevel: 'CRITICAL',
        confidenceScore: 96,
        sourceTag: 'SURVEILLANCE',
<<<<<<< HEAD
        centrality: {
          degree: 7,
          betweenness: 0.58,
          pageRank: 0.06,
        },
        associatedCaseIds: [currentCaseId],
        notesCount: 1,
        aiFlags: [
          'ANPR Automated Pier 42 Hit',
        ],
=======
        centrality: { degree: 7, betweenness: 0.58, pageRank: 0.06 },
        associatedCaseIds: [currentCaseId],
        notesCount: 1,
        aiFlags: ['ANPR Automated Pier 42 Hit']
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
      },
      {
        id: accountEntityId,
        name: 'Chase Account #****-9921 ($450k Wire)',
        type: 'account',
        riskScore: 95,
        threatLevel: 'CRITICAL',
        confidenceScore: 97,
        sourceTag: 'FINANCIAL',
<<<<<<< HEAD
        centrality: {
          degree: 14,
          betweenness: 0.88,
          pageRank: 0.15,
        },
        accountNumber:
          'CHASE-9921-OFFSHORE',
        associatedCaseIds: [currentCaseId],
        notesCount: 1,
        aiFlags: [
          'Grand Cayman Offshore Receiver',
        ],
=======
        centrality: { degree: 14, betweenness: 0.88, pageRank: 0.15 },
        accountNumber: 'CHASE-9921-OFFSHORE',
        associatedCaseIds: [currentCaseId],
        notesCount: 1,
        aiFlags: ['Grand Cayman Offshore Receiver']
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
      },
      {
        id: locationEntityId,
        name: 'Pier 42 Terminal (Geofence)',
        type: 'location',
        riskScore: 82,
        threatLevel: 'HIGH',
        confidenceScore: 91,
        sourceTag: 'SURVEILLANCE',
<<<<<<< HEAD
        centrality: {
          degree: 8,
          betweenness: 0.62,
          pageRank: 0.07,
        },
        coordinates: [40.7128, -74.0060],
        associatedCaseIds: [currentCaseId],
        notesCount: 1,
        aiFlags: [
          'Geofence Cluster Site',
        ],
      },
=======
        centrality: { degree: 8, betweenness: 0.62, pageRank: 0.07 },
        coordinates: [40.7128, -74.0060],
        associatedCaseIds: [currentCaseId],
        notesCount: 1,
        aiFlags: ['Geofence Cluster Site']
      }
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
    ];

    // FEATURE 3: Build Relationship Maps
    const newExtractedLinks: Relationship[] = [
      {
        id: `rel-nlp-1-${baseTimestamp}`,
        source: mainSubjectId,
        target: associateSubjectId,
        type: 'COMMUNICATION',
        label: 'Encrypted Telemetry (48 Calls)',
        confidence: 96,
        verified: true,
        thickness: 4,
        frequency: '48 Calls in 24h',
        sourceDoc: targetItem.sourceDocument,
        aiFlagged: true,
<<<<<<< HEAD
        aiReason:
          'Pre-Event Communication Spike',
=======
        aiReason: 'Pre-Event Communication Spike'
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
      },
      {
        id: `rel-nlp-2-${baseTimestamp}`,
        source: associateSubjectId,
        target: accountEntityId,
        type: 'FINANCIAL',
        label: '$450,000 SWIFT Wire Transfer',
        confidence: 98,
        verified: true,
        thickness: 5,
        amount: '$450,000',
        sourceDoc: targetItem.sourceDocument,
        aiFlagged: true,
<<<<<<< HEAD
        aiReason:
          'Unsanctioned Offshore Transfer',
=======
        aiReason: 'Unsanctioned Offshore Transfer'
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
      },
      {
        id: `rel-nlp-3-${baseTimestamp}`,
        source: mainSubjectId,
        target: vehicleEntityId,
        type: 'OWNERSHIP',
        label: 'Registered Owner / Operator',
        confidence: 94,
        verified: true,
        thickness: 3,
<<<<<<< HEAD
        sourceDoc: targetItem.sourceDocument,
=======
        sourceDoc: targetItem.sourceDocument
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
      },
      {
        id: `rel-nlp-4-${baseTimestamp}`,
        source: vehicleEntityId,
        target: locationEntityId,
        type: 'CO_LOCATION',
        label: 'ANPR Hit 03:15 AM Departure',
        confidence: 93,
        verified: true,
        thickness: 3,
        lastTimestamp: '03:15 AM',
<<<<<<< HEAD
        sourceDoc: targetItem.sourceDocument,
=======
        sourceDoc: targetItem.sourceDocument
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
      },
      {
        id: `rel-nlp-5-${baseTimestamp}`,
        source: mainSubjectId,
        target: phoneEntityId,
        type: 'COMMUNICATION',
        label: 'Burner Telemetry Link',
        confidence: 95,
        verified: true,
        thickness: 4,
<<<<<<< HEAD
        sourceDoc: targetItem.sourceDocument,
      },
=======
        sourceDoc: targetItem.sourceDocument
      }
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
    ];

    // FEATURE 5: Detect Suspicious Patterns
    const newThreatPattern: PatternAnomaly = {
      id: `pat-nlp-${baseTimestamp}`,
      caseId: currentCaseId,
<<<<<<< HEAD
      title:
        `SUSPICIOUS OFFSHORE SWIFT WIRE & BURNER TELEMETRY SPIKE (${primaryName})`,
      type: 'CIRCULAR_FUNDS',
      severity: 'HIGH',
      description:
        `AI Threat Detection Engine flagged rapid $450,000 wire transfer to Chase Account #****-9921 following burner phone activation between ${primaryName} and Elena Rostova at Pier 42 Terminal.`,
      entitiesInvolved: [
        primaryName,
        'Elena Rostova',
        'Chase Account #****-9921',
        'NY-771-X99',
      ],
      timestamp: new Date().toISOString(),
      status: 'NEW',
      evidenceSnippet: targetItem.textSnippet,
    };

    // Update Local State
    setEntities((prev) => {
      const existingNames = new Set(
        prev.map((e) => e.name.toLowerCase())
      );

      const filteredNew =
        newExtractedNodes.filter(
          (n) =>
            !existingNames.has(
              n.name.toLowerCase()
            )
        );

      return [...filteredNew, ...prev];
    });

    setRelationships((prev) => [
      ...newExtractedLinks,
      ...prev,
    ]);

    setPatterns((prev) => [
      newThreatPattern,
      ...prev,
    ]);
=======
      title: `SUSPICIOUS OFFSHORE SWIFT WIRE & BURNER TELEMETRY SPIKE (${primaryName})`,
      type: 'CIRCULAR_FUNDS',
      severity: 'HIGH',
      description: `AI Threat Detection Engine flagged rapid $450,000 wire transfer to Chase Account #****-9921 following burner phone activation between ${primaryName} and Elena Rostova at Pier 42 Terminal.`,
      entitiesInvolved: [primaryName, 'Elena Rostova', 'Chase Account #****-9921', 'NY-771-X99'],
      timestamp: new Date().toISOString(),
      status: 'NEW',
      evidenceSnippet: targetItem.textSnippet
    };

    // Update Local State
    setEntities(prev => {
      const existingNames = new Set(prev.map(e => e.name.toLowerCase()));
      const filteredNew = newExtractedNodes.filter(n => !existingNames.has(n.name.toLowerCase()));
      return [...filteredNew, ...prev];
    });

    setRelationships(prev => [...newExtractedLinks, ...prev]);
    setPatterns(prev => [newThreatPattern, ...prev]);
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9

    // Audit Trail Log
    const newLog: AuditLog = {
      id: `log-nlp-${baseTimestamp}`,
      timestamp: new Date().toLocaleString(),
      user: `${currentUser.name} (${currentUser.badge})`,
      actor: currentUser.name,
      role: currentUser.role,
<<<<<<< HEAD
      action:
        'HUMAN_IN_THE_LOOP_GRAPH_ENRICHMENT',
      target:
        `${primaryName} (Merged 6 Entities & 5 Links)`,
      resource: targetItem.sourceDocument,
      status: 'SUCCESS',
      ipAddress: '10.240.8.12',
    };

    setAuditLogs((prev) => [
      newLog,
      ...prev,
    ]);

=======
      action: 'HUMAN_IN_THE_LOOP_GRAPH_ENRICHMENT',
      target: `${primaryName} (Merged 6 Entities & 5 Links)`,
      resource: targetItem.sourceDocument,
      status: 'SUCCESS',
      ipAddress: '10.240.8.12'
    };

    setAuditLogs(prev => [newLog, ...prev]);
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
    setSelectedEntityId(mainSubjectId);
  };

  const rejectNLPItem = (id: string) => {
<<<<<<< HEAD
    setNlpItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: 'REJECTED' }
          : item
      )
    );
  };

  const editNLPItem = (
    id: string,
    name: string,
    type: EntityType
  ) => {
    setNlpItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'EDITED',
              editedName: name,
              extractedName: name,
              editedType: type,
              extractedType: type,
            }
          : item
      )
    );
  };

  const addNLPItems = (
    newItems: NLPItem[]
  ) => {
    setNlpItems((prev) => [
      ...newItems,
      ...prev,
    ]);
  };

  const updatePatternStatus = (
    id: string,
    status: PatternAnomaly['status']
  ) => {
    setPatterns((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status }
          : p
      )
    );
  };

  const addNoteToEntity = (
    entityId: string,
    text: string
  ) => {
    setEntities((prev) =>
      prev.map((e) =>
        e.id === entityId
          ? {
              ...e,
              notesCount: e.notesCount + 1,
              aiFlags: [
                ...(e.aiFlags || []),
                `Investigator Note: ${text}`,
              ],
            }
          : e
      )
    );
  };

  const addEntity = (newEnt: Entity) => {
    setEntities((prev) => [
      newEnt,
      ...prev,
    ]);
  };

  const addRelationship = (
    newRel: Relationship
  ) => {
    setRelationships((prev) => [
      newRel,
      ...prev,
    ]);
  };

  const createCase = (
    newCaseData: Partial<Case>
  ) => {
    const createdCase: Case = {
      id: `case-${Date.now()}`,
      title:
        newCaseData.title ||
        'Untitled Investigation',
      caseNumber:
        `CASE-2026-${Math.floor(
          Math.random() * 9000 + 1000
        )}`,
      status: 'OPEN',
      threatLevel:
        newCaseData.threatLevel ||
        'MEDIUM',
      leadInvestigator:
        currentUser.name,
      entityCount: 0,
      relationshipCount: 0,
      lastUpdated:
        new Date().toISOString(),
      description:
        newCaseData.description ||
        'New case created by analyst.',
      targetCell:
        newCaseData.targetCell ||
        'Primary Target Group',
      tags:
        newCaseData.tags ||
        ['New Case'],
    };

    setCases((prev) => [
      createdCase,
      ...prev,
    ]);

    setCurrentCaseId(
      createdCase.id
    );
  };

  return (
    <AppContext.Provider
      value={{
        cases,
        currentCase,
        entities,
        relationships,
        nlpItems,
        patterns,
        auditLogs,
        timelineEvents,
        selectedEntityId,
        selectedEdgeId,
        activeTab,
        searchQuery,
        searchFilterType,
        isDarkMode,
        classificationLevel,
        currentUser,
        isAuthenticated,
        currentScreen,
        loginRole,

        goToWelcome,
        goToLogin,
        loginUser,
        loginAdmin,
        logout,
        setCaseId,
        setSelectedEntityId,
        setSelectedEdgeId,
        setActiveTab,
        setSearchQuery,
        setSearchFilterType,
        toggleTheme,
        setClassificationLevel,

        approveNLPItem,
        rejectNLPItem,
        editNLPItem,
        addNLPItems,

        updatePatternStatus,

        addNoteToEntity,
        addEntity,
        addRelationship,

        createCase,
      }}
    >
=======
    setNlpItems(prev => prev.map(item => item.id === id ? { ...item, status: 'REJECTED' } : item));
  };

  const editNLPItem = (id: string, name: string, type: EntityType) => {
    setNlpItems(prev => prev.map(item => item.id === id ? { 
      ...item, 
      status: 'EDITED', 
      editedName: name, 
      extractedName: name,
      editedType: type,
      extractedType: type 
    } : item));
  };

  const addNLPItems = (newItems: NLPItem[]) => {
    setNlpItems(prev => [...newItems, ...prev]);
  };

  const updatePatternStatus = (id: string, status: PatternAnomaly['status']) => {
    setPatterns(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const addNoteToEntity = (entityId: string, text: string) => {
    setEntities(prev => prev.map(e => e.id === entityId ? {
      ...e,
      notesCount: e.notesCount + 1,
      aiFlags: [...(e.aiFlags || []), `Investigator Note: ${text}`]
    } : e));
  };

  const addEntity = (newEnt: Entity) => {
    setEntities(prev => [newEnt, ...prev]);
  };

  const addRelationship = (newRel: Relationship) => {
    setRelationships(prev => [newRel, ...prev]);
  };

  const createCase = (newCaseData: Partial<Case>) => {
    const createdCase: Case = {
      id: `case-${Date.now()}`,
      title: newCaseData.title || 'Untitled Investigation',
      caseNumber: `CASE-2026-${Math.floor(Math.random() * 9000 + 1000)}`,
      status: 'OPEN',
      threatLevel: newCaseData.threatLevel || 'MEDIUM',
      leadInvestigator: currentUser.name,
      entityCount: 0,
      relationshipCount: 0,
      lastUpdated: new Date().toISOString(),
      description: newCaseData.description || 'New case created by analyst.',
      targetCell: newCaseData.targetCell || 'Primary Target Group',
      tags: newCaseData.tags || ['New Case']
    };
    setCases(prev => [createdCase, ...prev]);
    setCurrentCaseId(createdCase.id);
  };

  return (
    <AppContext.Provider value={{
      cases,
      currentCase,
      entities,
      relationships,
      nlpItems,
      patterns,
      auditLogs,
      timelineEvents,
      selectedEntityId,
      selectedEdgeId,
      activeTab,
      searchQuery,
      searchFilterType,
      isDarkMode,
      classificationLevel,
      currentUser,
      isAuthenticated,
      currentScreen,
      loginRole,
      goToWelcome,
      goToLogin,
      loginUser,
      loginAdmin,
      logout,
      setCaseId,
      setSelectedEntityId,
      setSelectedEdgeId,
      setActiveTab,
      setSearchQuery,
      setSearchFilterType,
      toggleTheme,
      setClassificationLevel,
      approveNLPItem,
      rejectNLPItem,
      editNLPItem,
      addNLPItems,
      updatePatternStatus,
      addNoteToEntity,
      addEntity,
      addRelationship,
      createCase
    }}>
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
<<<<<<< HEAD

  if (!context) {
    throw new Error(
      'useApp must be used within an AppProvider'
    );
  }

  return context;
};
=======
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
>>>>>>> c320f2181b9c0b7a80fb9bcdadc3828d08d261e9
