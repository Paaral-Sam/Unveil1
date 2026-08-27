import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopNav } from './components/TopNav';
import { WelcomeView } from './views/WelcomeView';
import { HeroView } from './views/HeroView';
import { DashboardView } from './views/DashboardView';
import { IngestionView } from './views/IngestionView';
import { NetworkGraphView } from './views/NetworkGraphView';
import { CentralityView } from './views/CentralityView';
import { PatternsView } from './views/PatternsView';
import { TimelineView } from './views/TimelineView';
import { GeospatialView } from './views/GeospatialView';
import { EntityDossierView } from './views/EntityDossierView';
import { ReportsView } from './views/ReportsView';
import { AdminView } from './views/AdminView';
import { LoginView } from './views/LoginView';
import { AiCopilotSidebar } from './components/AiCopilotSidebar';
import { SupabaseSetupModal } from './components/SupabaseSetupModal';

const AppContent: React.FC = () => {
  const { currentScreen, isAuthenticated, isSupabaseModalOpen, setIsSupabaseModalOpen } = useApp();
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(false);

  // Screen 1: Editorial Welcome Page
  if (currentScreen === 'welcome' && !isAuthenticated) {
    return <WelcomeView />;
  }

  // Screen 2: Authentication Gateway (User & Admin with Key unveil2026)
  if (currentScreen === 'login' || !isAuthenticated) {
    return <LoginView />;
  }

  // Screen 3: Full UnVeil Single-Page Application
  return (
    <div className="min-h-screen w-full bg-[#03050B] text-slate-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white animate-fade-in-up relative">
      {/* Sticky Top Header spanning 100% full browser width */}
      <TopNav />

      {/* Interactive AI Copilot Slide-Over Sidebar */}
      <AiCopilotSidebar isOpen={isAiSidebarOpen} onClose={() => setIsAiSidebarOpen(false)} />

      {/* Supabase SQL & Backend Setup Modal */}
      <SupabaseSetupModal isOpen={isSupabaseModalOpen} onClose={() => setIsSupabaseModalOpen(false)} />

      {/* Main Single-Page Scroll Down Website Spanning 100% Full Viewport Width */}
      <main className="flex-1 w-full space-y-24 pb-32">
        {/* Section 1: Landing Hero & Search (100% Edge-to-Edge Full Width Background) */}
        <section id="section-hero" className="w-full">
          <HeroView />
        </section>

        {/* Content Container spanning fluidly */}
        <div className="w-full px-4 sm:px-8 lg:px-12 space-y-24">
          {/* Section 2: Overview & 4-Card Metric Grid */}
          <section id="section-overview" className="scroll-mt-28 w-full">
            <DashboardView onOpenAiSidebar={() => setIsAiSidebarOpen(true)} />
          </section>

          {/* Section 3: Data Ingestion & Human-in-the-Loop Review */}
          <section id="section-ingestion" className="scroll-mt-28 w-full">
            <IngestionView />
          </section>

          {/* Section 4: Dedicated Interactive Network Topology Graph Canvas */}
          <section id="section-network" className="scroll-mt-28 w-full">
            <NetworkGraphView />
          </section>

          {/* Section 5: Key Influencer Centrality Analysis */}
          <section id="section-centrality" className="scroll-mt-28 w-full">
            <CentralityView />
          </section>

          {/* Section 6: AI Pattern & Anomaly Alerts Feed */}
          <section id="section-patterns" className="scroll-mt-28 w-full">
            <PatternsView />
          </section>

          {/* Section 7: Geospatial Intelligence & Movement Playback */}
          <section id="section-geospatial" className="scroll-mt-28 w-full">
            <GeospatialView />
          </section>

          {/* Section 8: Timeline Incident Reconstruction */}
          <section id="section-timeline" className="scroll-mt-28 w-full">
            <TimelineView />
          </section>

          {/* Section 9: Subject Dossiers & Biometric Profiles */}
          <section id="section-dossier" className="scroll-mt-28 w-full">
            <EntityDossierView />
          </section>

          {/* Section 10: Court Intelligence Package & Evidence Reports */}
          <section id="section-reports" className="scroll-mt-28 w-full">
            <ReportsView />
          </section>

          {/* Section 11: Security Audit Logs & System Administration */}
          <section id="section-admin" className="scroll-mt-28 w-full">
            <AdminView />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#03050B] border-t border-blue-900/40 py-10 text-center text-sm text-slate-400 font-mono">
        <div>UnVeil Criminal Network Intelligence Platform &copy; 2026. All Rights Reserved.</div>
        <div className="mt-1.5 text-slate-500 font-bold">RESTRICTED ACCESS — 18 U.S.C. LAW ENFORCEMENT SENSITIVE</div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
