import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopNav } from './components/TopNav';
import { ParticleBackground } from './components/ParticleBackground';
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

const AppContent: React.FC = () => {
  const { currentScreen, isAuthenticated } = useApp();
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
      {/* Interactive Background Particle Canvas Engine */}
      <ParticleBackground />

      {/* Sticky Top Header spanning 100% full browser width */}
      <TopNav />

      {/* Interactive AI Copilot Slide-Over Sidebar */}
      <AiCopilotSidebar isOpen={isAiSidebarOpen} onClose={() => setIsAiSidebarOpen(false)} />

      {/* Main Single-Page Scroll Down Website Spanning 100% Full Viewport Width */}
      <main className="flex-1 w-full space-y-24 pb-32 relative z-10">
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

          {/* Section 4: Interactive Syndicate Network Topology Canvas */}
          <section id="section-network" className="scroll-mt-28 w-full">
            <NetworkGraphView />
          </section>

          {/* Section 5: Key Influencer & Network Centrality Analytics */}
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

          {/* Section 8: Timeline Reconstruction & Event Swimlanes */}
          <section id="section-timeline" className="scroll-mt-28 w-full">
            <TimelineView />
          </section>

          {/* Section 9: Subject Dossier Profile & Technical Identifiers */}
          <section id="section-dossier" className="scroll-mt-28 w-full">
            <EntityDossierView />
          </section>

          {/* Section 10: Court Intelligence Package & Evidence Brief Builder */}
          <section id="section-reports" className="scroll-mt-28 w-full">
            <ReportsView />
          </section>

          {/* Section 11: Security Audit Trail & Governance Portal */}
          <section id="section-admin" className="scroll-mt-28 w-full">
            <AdminView />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-blue-900/40 bg-[#020718] py-8 text-center text-xs text-slate-500 font-mono relative z-10">
        <p>UnVeil Intelligence System &nbsp;·&nbsp; RESTRICTED LAW ENFORCEMENT & CYBER THREAT PORTAL &nbsp;·&nbsp; VERSION 2.5</p>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
