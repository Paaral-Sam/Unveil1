import React, { useState, useEffect } from 'react';
import { Shield, Bell, User, Search, X, AlertCircle, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClassificationBanner } from './ClassificationBanner';
import { EntityBadge } from './EntityBadge';

const NAV_LINKS = [
  { id: 'section-overview', label: 'Overview' },
  { id: 'section-network', label: 'Network Graph' },
  { id: 'section-centrality', label: 'Influencers' },
  { id: 'section-patterns', label: 'AI Patterns' },
  { id: 'section-geospatial', label: 'Geospatial' },
  { id: 'section-timeline', label: 'Timeline' },
  { id: 'section-dossier', label: 'Dossiers' },
  { id: 'section-reports', label: 'Reports' },
  { id: 'section-admin', label: 'Audit Logs' },
];

export const TopNav: React.FC = () => {
  const {
    entities,
    searchQuery,
    setSearchQuery,
    currentUser,
    patterns,
    setSelectedEntityId,
    logout
  } = useApp();

  const [activeSection, setActiveSection] = useState<string>('section-hero');
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserTooltipOpen, setIsUserTooltipOpen] = useState(false);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll listener to update active tab highlight automatically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search Results
  const searchResults = searchQuery.trim() ? entities.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.phone?.includes(searchQuery) ||
    e.vehiclePlate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.accountNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const handleSelectSearchResult = (entityId: string) => {
    setSelectedEntityId(entityId);
    scrollToSection('section-network');
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col font-sans select-none bg-[#03081A]/95 border-b border-blue-900/40 backdrop-blur-xl shadow-2xl transition-all duration-300">
      {/* Security Classification Header */}
      <ClassificationBanner />

      {/* Main Top Header Strip Spanning Edge-to-Edge with Logo Alone on Far Left */}
      <div className="w-full px-6 sm:px-10 lg:px-12 py-3.5 flex items-center justify-between gap-6">
        {/* Brand Logo Alone on Left Corner */}
        <div
          onClick={() => scrollToSection('section-hero')}
          className="flex items-center space-x-3.5 cursor-pointer group shrink-0"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#EF4444] to-[#0066FF] border border-white/20 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 group-active:scale-95 transition-transform duration-200">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-2xl text-white tracking-tight leading-tight group-hover:text-blue-300 transition-colors">UnVeil</h1>
            <p className="text-xs text-[#EF4444] font-mono uppercase tracking-wider font-semibold">Intelligence</p>
          </div>
        </div>

        {/* Top Navigation Links Bar Centered - Gradient Container with Solid Black Active Item */}
        <nav className="hidden lg:flex items-center p-1.5 rounded-full bg-gradient-to-r from-[#FF1A4B] via-[#8B26B2] to-[#0066FF] shadow-lg shadow-purple-900/30 border border-white/20">
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-2 rounded-full text-xs xl:text-sm font-bold whitespace-nowrap transition-all duration-300 ease-out ${
                  isActive
                    ? 'bg-[#08080C] text-white shadow-xl scale-[1.03] border border-white/10'
                    : 'text-white hover:text-white hover:bg-black/20 active:scale-95'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Search Input, Bell, and Single Person Icon */}
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          {/* Search Bar */}
          <div className="relative w-40 sm:w-56 lg:w-64">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-[#020718] border border-blue-900/50 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-500/30 rounded-full px-9 py-2 text-xs text-white placeholder-slate-400 focus:outline-none transition-all duration-200"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3.5 text-slate-400 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Results Overlay */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-[#040E26] border border-blue-500/40 rounded-2xl shadow-2xl z-50 max-h-72 overflow-y-auto p-2">
                <div className="px-3 py-2 text-xs text-slate-300 font-bold border-b border-blue-900/50 flex justify-between">
                  <span>FOUND {searchResults.length} ENTITIES</span>
                  <button onClick={() => setIsSearchFocused(false)} className="hover:text-white">CLOSE</button>
                </div>
                <div className="divide-y divide-blue-900/50">
                  {searchResults.map(entity => (
                    <button
                      key={entity.id}
                      onClick={() => handleSelectSearchResult(entity.id)}
                      className="w-full text-left px-3 py-2.5 hover:bg-blue-950 flex items-center justify-between text-xs transition-colors rounded-xl"
                    >
                      <EntityBadge type={entity.type} name={entity.name} />
                      <span className="text-xs text-red-400 font-bold">RISK: {entity.riskScore}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Alert Bell */}
          <div className="relative">
            <button
              onClick={() => setIsAlertsOpen(!isAlertsOpen)}
              className="relative p-2.5 rounded-full bg-[#020718] border border-blue-900/50 hover:border-red-500/40 text-slate-300 hover:scale-105 active:scale-95 transition-all duration-200"
              title="AI Threat Alerts"
            >
              <Bell className="w-4.5 h-4.5 text-red-400" />
              {patterns.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EF4444] text-white font-mono text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                  {patterns.length}
                </span>
              )}
            </button>

            {/* Alerts Drawer */}
            {isAlertsOpen && (
              <div className="absolute right-0 top-full mt-2 w-84 bg-[#040E26] border border-red-500/40 rounded-2xl shadow-2xl z-50 p-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center space-x-2 text-red-400 text-sm font-bold">
                    <AlertCircle className="w-4.5 h-4.5" />
                    <span>AI THREAT ALERTS</span>
                  </div>
                  <button onClick={() => setIsAlertsOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>
                <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
                  {patterns.map(pat => (
                    <div
                      key={pat.id}
                      onClick={() => {
                        scrollToSection('section-patterns');
                        setIsAlertsOpen(false);
                      }}
                      className="p-3 rounded-xl bg-[#091536] border border-red-500/30 text-xs cursor-pointer hover:border-red-500 transition-colors"
                    >
                      <div className="flex justify-between font-bold text-red-400 text-xs">
                        <span>{pat.title}</span>
                        <span className="text-[10px] bg-red-950 px-1.5 py-0.5 rounded-md">{pat.severity}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">{pat.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Single Person Icon Button with Log Out option inside modal */}
          <div className="relative">
            <button
              onClick={() => setIsUserTooltipOpen(!isUserTooltipOpen)}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#EF4444] to-[#0066FF] border border-white/20 flex items-center justify-center text-white font-bold shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
              title="Click to view Analyst Profile & Log Out"
            >
              <User className="w-5 h-5 text-white" />
            </button>

            {/* Profile Popover Modal with Log Out Option */}
            {isUserTooltipOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-[#040E26] border border-blue-500/50 rounded-2xl shadow-2xl z-50 p-4 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-blue-900/50 pb-2">
                  <span className="text-[#0088FF] font-bold text-xs uppercase">ANALYST_PROFILE</span>
                  <button onClick={() => setIsUserTooltipOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white font-sans">{currentUser.name}</div>
                  <div className="text-xs text-blue-400 font-bold">BADGE: ANALYST-8804</div>
                  <div className="text-[11px] text-slate-300">ROLE: {currentUser.role}</div>
                  <div className="text-[10px] text-emerald-400 font-bold pt-1">SESSION: ACTIVE (SECURE)</div>
                </div>

                <div className="pt-2 border-t border-blue-900/50">
                  <button
                    onClick={() => {
                      setIsUserTooltipOpen(false);
                      logout();
                    }}
                    className="w-full py-2.5 rounded-xl bg-red-950/80 hover:bg-red-600 border border-red-500/50 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-md"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>LOG OUT SESSION</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
