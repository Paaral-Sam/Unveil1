import React, { useState } from 'react';
import {
  LayoutDashboard,
  UploadCloud,
  Share2,
  BarChart3,
  AlertTriangle,
  Clock,
  MapPin,
  UserCheck,
  FileSpreadsheet,
  ShieldCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Settings,
  Shield
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SidebarNav: React.FC = () => {
  const { activeTab, setActiveTab, nlpItems, patterns } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const pendingNLPCount = nlpItems.filter(i => i.status === 'PENDING').length;
  const unreviewedPatterns = patterns.filter(p => p.status === 'UNREVIEWED').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    {
      id: 'ingestion',
      label: 'Data Ingestion',
      icon: <UploadCloud className="w-5 h-5 text-emerald-400" />,
      badge: pendingNLPCount > 0 ? pendingNLPCount : undefined,
    },
    { id: 'network', label: 'Network Graph', icon: <Share2 className="w-5 h-5 text-purple-400" /> },
    { id: 'centrality', label: 'Key Influencers', icon: <BarChart3 className="w-5 h-5 text-pink-400" /> },
    {
      id: 'patterns',
      label: 'Pattern Detection',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      badge: unreviewedPatterns > 0 ? unreviewedPatterns : undefined,
    },
    { id: 'timeline', label: 'Timeline View', icon: <Clock className="w-5 h-5 text-blue-400" /> },
    { id: 'geospatial', label: 'Geospatial Map', icon: <MapPin className="w-5 h-5 text-emerald-400" /> },
    { id: 'dossier', label: 'Entity Dossier', icon: <UserCheck className="w-5 h-5 text-indigo-400" /> },
    { id: 'reports', label: 'Report Builder', icon: <FileSpreadsheet className="w-5 h-5 text-slate-300" /> },
    { id: 'admin', label: 'Admin & Audit', icon: <ShieldCheck className="w-5 h-5 text-slate-400" /> },
  ];

  return (
    <aside
      className={`h-[calc(100vh-2rem)] sticky top-4 my-4 ml-4 bg-[#15121C] border border-[#282336] rounded-3xl text-slate-200 flex flex-col justify-between transition-all duration-300 z-30 select-none shadow-2xl p-4 shrink-0 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Top Brand Logo & Nav */}
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-3 pt-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-900 to-pink-700 border border-purple-400/40 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-xl text-white tracking-tight leading-tight">UnVeil</h1>
                <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Intelligence</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-xl hover:bg-[#252030] text-slate-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="space-y-1.5 max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#3B194D] to-[#5C1D63] text-white font-bold shadow-lg border border-purple-500/40'
                    : 'text-slate-400 hover:bg-[#1D1926] hover:text-white'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <span className={`shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : ''}`}>
                  {item.icon}
                </span>
                {!isCollapsed && <span className="truncate flex-1 text-left tracking-wide font-sans">{item.label}</span>}

                {/* Badge */}
                {item.badge !== undefined && (
                  <span className="text-xs bg-purple-600 text-white font-bold px-2 py-0.5 rounded-full font-mono shrink-0 shadow-md">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Settings & Lock Session */}
      <div className="pt-4 border-t border-[#282336] space-y-1.5">
        <button
          onClick={() => setActiveTab('admin')}
          className="w-full flex items-center space-x-3.5 px-4 py-2.5 rounded-2xl text-sm text-slate-400 hover:bg-[#1D1926] hover:text-white transition-all font-medium"
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </button>

        <button
          onClick={() => setActiveTab('login')}
          className="w-full flex items-center space-x-3.5 px-4 py-2.5 rounded-2xl text-sm text-rose-400 hover:bg-rose-950/40 hover:text-rose-200 transition-all font-medium"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Lock Session</span>}
        </button>
      </div>
    </aside>
  );
};
