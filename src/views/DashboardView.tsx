import React from 'react';
import { Sparkles, ArrowUpRight, TrendingUp, ShieldAlert, Cpu } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardView: React.FC<{ onOpenAiSidebar: () => void }> = ({ onOpenAiSidebar }) => {
  const { cases, entities, setSelectedEntityId } = useApp();

  const highRiskEntities = entities.filter(e => e.threatLevel === 'CRITICAL' || e.threatLevel === 'HIGH').slice(0, 5);

  const handleFocusNode = (entityId: string) => {
    setSelectedEntityId(entityId);
    const graphElement = document.getElementById('section-network');
    if (graphElement) {
      graphElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white p-6 lg:p-8 space-y-6 font-sans text-slate-900 rounded-3xl border border-slate-200 shadow-md animate-fade-in-up">
      {/* Top Header Title Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#0066FF] uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-blue-600" />
            <span>REAL-TIME CASE METRICS & THREAT MONITORING</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Executive Intelligence Overview</h2>
          <p className="text-sm text-slate-500 font-sans mt-0.5">
            Overview metrics, multi-source record counts, active case syndicates, and real-time threat notifications.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs font-mono font-bold flex items-center space-x-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>NEURAL ENGINES ACTIVE</span>
          </span>
        </div>
      </div>

      {/* Main 4-Card Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Ingested Data Stat Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-extrabold text-slate-800">Total Ingested Data</span>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-xs font-mono text-[#0066FF] font-bold border border-blue-200">
              6M Records
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-slate-900 tracking-tight font-sans">$ 12,304.11</div>
            <div className="text-xs text-[#0066FF] font-bold flex items-center space-x-1 font-mono pt-1">
              <TrendingUp className="w-4 h-4" />
              <span>+18.4% Network Expansion</span>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100 font-sans text-xs">
            <div className="flex justify-between text-slate-500">
              <span>FIRs & Intercepts:</span>
              <span className="text-slate-900 font-bold font-mono">4.2M Records</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>CDR Phone Logs:</span>
              <span className="text-slate-900 font-bold font-mono">1.8M Traces</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Unique Entities:</span>
              <span className="text-[#0066FF] font-bold font-mono">1.02M Nodes</span>
            </div>
          </div>
        </div>

        {/* Card 2: Explore AI Insights Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#040E26] via-[#081538] to-[#040E26] text-white border border-blue-900 shadow-lg flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold uppercase">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>COPILOT AI ASSISTANT</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
              READY
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-white">Explore AI Insights & Case Intelligence</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Open the AI Copilot sidebar to query document payloads, analyze SWIFT transfers, or request syndicate summaries.
            </p>
          </div>

          <button
            onClick={onOpenAiSidebar}
            className="w-full py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-500 text-white font-bold text-xs font-mono flex items-center justify-center space-x-2 shadow-md transition-all"
          >
            <span>Open AI Copilot Sidebar</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 3: Active Case Syndicate Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-extrabold text-slate-800">Active Case Target</span>
            <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-mono font-bold border border-rose-200">
              {cases[0]?.caseNumber || 'CASE-2026-2291'}
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-lg font-extrabold text-slate-900 leading-tight">{cases[0]?.title || 'Syndicate Operational Network'}</h4>
            <p className="text-xs text-slate-500 font-sans">Target Cell: <strong>{cases[0]?.targetCell || 'Primary Cartel Cell'}</strong></p>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100 text-xs font-sans">
            <div className="flex justify-between text-slate-500">
              <span>Lead Investigator:</span>
              <span className="text-slate-900 font-bold font-mono">{cases[0]?.leadInvestigator}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Entities & Links:</span>
              <span className="text-emerald-600 font-bold font-mono">{entities.length} Nodes · {cases[0]?.relationshipCount || 17} Links</span>
            </div>
          </div>
        </div>

        {/* Card 4: Top High Threat Targets */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-600 font-mono">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>HIGH THREAT TARGETS</span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500">{highRiskEntities.length} Targets</span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[140px] pr-1">
            {highRiskEntities.map(ent => (
              <div
                key={ent.id}
                onClick={() => handleFocusNode(ent.id)}
                className="p-2 rounded-xl bg-[#F8FAFC] border border-slate-200 hover:border-blue-400 cursor-pointer flex items-center justify-between text-xs transition-colors"
              >
                <span className="font-bold text-slate-900 truncate">{ent.name}</span>
                <span className="text-xs font-extrabold text-rose-600 font-mono shrink-0 ml-2">{ent.riskScore}%</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-mono text-center font-semibold">
            CLICK TARGET TO FOCUS GRAPH
          </div>
        </div>
      </div>
    </div>
  );
};
