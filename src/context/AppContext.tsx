import React, { createContext, useContext, useState } from 'react';
import type { Case, Entity, Relationship, NLPItem, PatternAnomaly, EntityType, AuditLog, TimelineEvent } from '../types';
import { MOCK_CASES, MOCK_ENTITIES, MOCK_RELATIONSHIPS, MOCK_NLP_ITEMS, MOCK_PATTERNS, MOCK_AUDIT_LOGS, MOCK_TIMELINE_EVENTS } from '../mock-data';

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
  currentUser: { name: string; badge: string; role: 'Analyst' | 'Investigator' | 'Supervisor' | 'Admin' };
  isAuthenticated: boolean;
  currentScreen: 'welcome' | 'login' | 'main';
  loginRole: 'user' | 'admin';
  
  // Actions
  goToWelcome: () => void;
  goToLogin: (role?: 'user' | 'admin') => void;
  loginUser: (badgeId: string, mfaToken: string) => void;
  loginAdmin: (adminKey: string) => { success: boolean; message?: string };
  logout: () => void;
  setCaseId: (id: string) => void;
  setSelectedEntityId: (id: string | null) => void;
  setSelectedEdgeId: (id: string | null) => void;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  setSearchFilterType: (type: EntityType | 'all') => void;
  toggleTheme: () => void;
  setClassificationLevel: (level: string) => void;
  
  // NLP Actions
  approveNLPItem: (id: string) => void;
  rejectNLPItem: (id: string) => void;
  editNLPItem: (id: string, name: string, type: EntityType) => void;
  addNLPItems: (newItems: NLPItem[]) => void;
  
  // Pattern Actions
  updatePatternStatus: (id: string, status: PatternAnomaly['status']) => void;
  
  // Entity Notes & Mutation
  addNoteToEntity: (entityId: string, text: string) => void;
  addEntity: (entity: Entity) => void;
  addRelationship: (rel: Relationship) => void;
  
  // Case Action
  createCase: (newCase: Partial<Case>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

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
  
  const [currentUser, setCurrentUser] = useState({
    name: 'Analyst J. Vance',
    badge: '#8804',
    role: 'Analyst' as 'Analyst' | 'Investigator' | 'Supervisor' | 'Admin'
  });

  const currentCase = cases.find(c => c.id === currentCaseId) || cases[0];

  const goToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const goToLogin = (role: 'user' | 'admin' = 'user') => {
    setLoginRole(role);
    setCurrentScreen('login');
  };

  const loginUser = (badgeId: string, _mfaToken: string) => {
    setCurrentUser({
      name: 'Analyst J. Vance',
      badge: badgeId || '#8804',
      role: 'Analyst'
    });
    setIsAuthenticated(true);
    setCurrentScreen('main');
    setActiveTab('dashboard');
  };

  const loginAdmin = (adminKey: string) => {
    if (adminKey === 'unveil2026') {
      setCurrentUser({
        name: 'Chief Admin Director',
        badge: '#ADM-001',
        role: 'Admin'
      });
      setIsAuthenticated(true);
      setCurrentScreen('main');
      setActiveTab('dashboard');
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin Key! Access Denied.' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('welcome');
  };

  const setCaseId = (id: string) => {
    setCurrentCaseId(id);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  // COMPLETE END-TO-END INTELLIGENCE PIPELINE (FEATURES 2 TO 6)
  const approveNLPItem = (id: string) => {
    // 1. Mark NLP Extraction as APPROVED
    setNlpItems(prev => prev.map(item => item.id === id ? { ...item, status: 'APPROVED' } : item));

    const targetItem = nlpItems.find(i => i.id === id);
    if (!targetItem) return;

    const baseTimestamp = Date.now();
    const primaryName = targetItem.extractedName;

    // FEATURE 2: Extract Entities & Discovered Nodes
    const mainSubjectId = `ent-approved-main-${baseTimestamp}`;
    const associateSubjectId = `ent-approved-assoc-${baseTimestamp}`;
    const phoneEntityId = `ent-approved-phone-${baseTimestamp}`;
    const vehicleEntityId = `ent-approved-vehicle-${baseTimestamp}`;
    const accountEntityId = `ent-approved-[#****-9921]-${baseTimestamp}`;
    const locationEntityId = `ent-approved-loc-${baseTimestamp}`;

    const newExtractedNodes: Entity[] = [
      {
        id: mainSubjectId,
        name: primaryName,
        type: targetItem.extractedType || 'person',
        riskScore: 96,
        threatLevel: 'CRITICAL',
        confidenceScore: 98,
        sourceTag: 'FIR',
        // FEATURE 4: Promote to High Centrality Leader on Influencer Podium
        centrality: { degree: 18, betweenness: 0.94, pageRank: 0.18 },
        phone: '+1-555-019-4821',
        vehiclePlate: 'NY-771-X99',
        accountNumber: 'CHASE-OFFSHORE-9921',
        associatedCaseIds: [currentCaseId],
        notesCount: 2,
        roleDescription: 'Primary Syndicate Ringleader / Mastermind',
        aiFlags: ['Extracted via Human-in-the-Loop Review', 'High Financial Influence', 'Multi-Source Signal Hit']
      },
      {
        id: associateSubjectId,
        name: 'Elena Rostova',
        type: 'person',
        riskScore: 89,
        threatLevel: 'HIGH',
        confidenceScore: 94,
        sourceTag: 'FIR',
        centrality: { degree: 11, betweenness: 0.72, pageRank: 0.11 },
        phone: '+1-555-019-[#****-9921]',
        associatedCaseIds: [currentCaseId],
        notesCount: 1,
        roleDescription: 'Financial Proxy / Money Conduit',
        aiFlags: ['Offshore SWIFT Wire Controller']
      },
      {
        id: phoneEntityId,
        name: '+1-555-019-4821',
        type: 'phone',
        riskScore: 84,
        threatLevel: 'HIGH',
        confidenceScore: 95,
        sourceTag: 'CDR',
        centrality: { degree: 9, betweenness: 0.65, pageRank: 0.08 },
        associatedCaseIds: [currentCaseId],
        notesCount: 1,
        aiFlags: ['Burner Phone Telemetry Spikes']
      },
      {
        id: vehicleEntityId,
        name: 'NY-771-X99',
        type: 'vehicle',
        riskScore: 91,
        threatLevel: 'CRITICAL',
        confidenceScore: 96,
        sourceTag: 'SURVEILLANCE',
        centrality: { degree: 7, betweenness: 0.58, pageRank: 0.06 },
        associatedCaseIds: [currentCaseId],
        notesCount: 1,
        aiFlags: ['ANPR Automated Pier 42 Hit']
      },
      {
        id: accountEntityId,
        name: 'Chase Account #****-9921 ($450k Wire)',
        type: 'account',
        riskScore: 95,
        threatLevel: 'CRITICAL',
        confidenceScore: 97,
        sourceTag: 'FINANCIAL',
        centrality: { degree: 14, betweenness: 0.88, pageRank: 0.15 },
        accountNumber: 'CHASE-9921-OFFSHORE',
        associatedCaseIds: [currentCaseId],
        notesCount: 1,
        aiFlags: ['Grand Cayman Offshore Receiver']
      },
      {
        id: locationEntityId,
        name: 'Pier 42 Terminal (Geofence)',
        type: 'location',
        riskScore: 82,
        threatLevel: 'HIGH',
        confidenceScore: 91,
        sourceTag: 'SURVEILLANCE',
        centrality: { degree: 8, betweenness: 0.62, pageRank: 0.07 },
        coordinates: [40.7128, -74.0060],
        associatedCaseIds: [currentCaseId],
        notesCount: 1,
        aiFlags: ['Geofence Cluster Site']
      }
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
        aiReason: 'Pre-Event Communication Spike'
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
        aiReason: 'Unsanctioned Offshore Transfer'
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
        sourceDoc: targetItem.sourceDocument
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
        sourceDoc: targetItem.sourceDocument
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
        sourceDoc: targetItem.sourceDocument
      }
    ];

    // FEATURE 5: Detect Suspicious Patterns (AI Anomaly Detector)
    const newThreatPattern: PatternAnomaly = {
      id: `pat-nlp-${baseTimestamp}`,
      caseId: currentCaseId,
      title: `SUSPICIOUS OFFSHORE SWIFT WIRE & BURNER TELEMETRY SPIKE (${primaryName})`,
      type: 'CIRCULAR_FUNDS',
      severity: 'HIGH',
      description: `AI Threat Detection Engine flagged rapid $450,000 wire transfer to Chase Account #****-9921 following burner phone activation between ${primaryName} and Elena Rostova at Pier 42 Terminal.`,
      entitiesInvolved: [primaryName, 'Elena Rostova', 'Chase Account #****-9921', 'NY-771-X99'],
      timestamp: new Date().toISOString(),
      status: 'NEW',
      evidenceSnippet: targetItem.textSnippet
    };

    // FEATURE 6: Update State across all Views & Dashboard
    setEntities(prev => {
      // Avoid duplicate names
      const existingNames = new Set(prev.map(e => e.name.toLowerCase()));
      const filteredNew = newExtractedNodes.filter(n => !existingNames.has(n.name.toLowerCase()));
      return [...filteredNew, ...prev];
    });

    setRelationships(prev => [...newExtractedLinks, ...prev]);
    setPatterns(prev => [newThreatPattern, ...prev]);

    // Update Case Metadata
    setCases(prev => prev.map(c => c.id === currentCaseId ? {
      ...c,
      entityCount: c.entityCount + newExtractedNodes.length,
      relationshipCount: c.relationshipCount + newExtractedLinks.length,
      lastUpdated: new Date().toISOString(),
      threatLevel: 'CRITICAL'
    } : c));

    // Audit Trail Log
    setAuditLogs(prev => [
      {
        id: `log-nlp-${baseTimestamp}`,
        timestamp: new Date().toLocaleString(),
        user: `${currentUser.name} (${currentUser.badge})`,
        actor: currentUser.name,
        role: currentUser.role,
        action: 'HUMAN_IN_THE_LOOP_GRAPH_ENRICHMENT',
        target: `${primaryName} (Merged 6 Entities & 5 Links)`,
        resource: targetItem.sourceDocument,
        status: 'SUCCESS',
        ipAddress: '10.240.8.12'
      },
      ...prev
    ]);

    // Select the newly approved primary entity
    setSelectedEntityId(mainSubjectId);
  };

  const rejectNLPItem = (id: string) => {
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
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
