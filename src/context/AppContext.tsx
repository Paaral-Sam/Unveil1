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
  const [auditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
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

  const approveNLPItem = (id: string) => {
    setNlpItems(prev => prev.map(item => item.id === id ? { ...item, status: 'APPROVED' } : item));
    const targetItem = nlpItems.find(i => i.id === id);
    if (targetItem) {
      const exists = entities.some(e => e.name.toLowerCase() === targetItem.extractedName.toLowerCase());
      if (!exists) {
        const newEnt: Entity = {
          id: `ent-nlp-${Date.now()}`,
          name: targetItem.extractedName,
          type: targetItem.extractedType,
          riskScore: Math.floor(Math.random() * 30) + 60,
          threatLevel: 'MEDIUM',
          confidenceScore: targetItem.confidenceScore,
          sourceTag: 'FIR',
          centrality: { degree: 1, betweenness: 0.1, pageRank: 0.01 },
          associatedCaseIds: [currentCaseId],
          notesCount: 1,
          aiFlags: ['Extracted via Human-in-the-Loop Review']
        };
        setEntities(prev => [...prev, newEnt]);
      }
    }
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
