import React from 'react';
import { Sparkles, ArrowUpRight, TrendingUp, ShieldAlert, Cpu } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardView: React.FC<{ onOpenAiSidebar: () => void }> = ({ onOpenAiSidebar }) => {
  const { cases, entities, setActiveTab, setSelectedEntityId } = useApp();

  const highRiskEntities = entities.filter(e => e.threatLevel === 'CRITICAL' || e.threatLevel === 'HIGH').slice(0, 5);

  return (
    <div className="p-6 sm:p-8 space-y-8 min-h-[85vh] font-sans text-slate-100 animate-fade-in-up flex flex-col justify-between">
      {/* Top Header Title Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-blue-900/40 pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Executive Intelligence Overview</h2>
          <p className="text-sm text-slate-400 font-mono mt-1">
            REAL-TIME INTELLIGENCE METRICS &nbsp;·&nbsp; ACTIVE CASE SYNDICATES &nbsp;·&nbsp; THREAT MONITORING
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NEURAL ENGINES ACTIVE</span>
          </span>
        </div>
      </div>

      {/* Main 4-Card Overview Grid with Extended Height */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 min-h-[460px]">
        {/* Card 1: Total Ingested Data Stat Card */}
        <div className="p-7 rounded-3xl bg-[#040E26]/90 border border-blue-500/40 shadow-2xl flex flex-col justify-between space-y-6 card-motion backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-300">Total Ingested Data</span>
            <span className="px-3 py-1 rounded-full bg-blue-950 text-xs font-mono text-[#0088FF] font-bold border border-blue-500/40">
              6M Records
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-5xl font-extrabold text-white tracking-tight font-sans">$ 12,304.11</div>
            <div className="text-xs text-[#0088FF] font-bold flex items-center space-x-1 font-mono">
              <TrendingUp className="w-4 h-4" />
              <span>+18.4% Network Expansion Rate</span>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-blue-900/50">
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>FIRs & Intercepts:</span>
              <span className="text-white font-bold">4.2M Records</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>CDR Phone Logs:</span>
              <span className="text-white font-bold">1.8M Traces</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>Unique Entities:</span>
              <span className="text-[#0088FF] font-bold">1.02M Nodes</span>
            </div>
          </div>
        </div>

        {/* Card 2: Decisions Powered by Data & AI Copilot Trigger */}
        <div className="p-7 rounded-3xl bg-gradient-to-br from-[#1C050F] via-[#0D091F] to-[#040E26] border border-red-500/50 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden group card-motion backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/15 rounded-full blur-3xl group-hover:bg-red-500/25 transition-all pointer-events-none" />

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#EF4444] to-[#0066FF] flex items-center justify-center text-white shadow-lg">
              <Cpu className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#EF4444]" />
              <span>Decisions Powered by Data</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Move beyond guesswork with AI-driven network insights tailored to your active investigation strategy. Upload FIR / CDR documents or query the copilot in real time.
            </p>
          </div>

          {/* Glowing Pill CTA Button triggering AI Sidebar */}
          <button
            onClick={onOpenAiSidebar}
            className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#EF4444] to-[#0066FF] hover:from-[#DC2626] hover:to-[#0055DD] text-white font-bold text-sm shadow-xl shadow-red-950/60 btn-motion flex items-center justify-center space-x-2.5"
          >
            <Sparkles className="w-4.5 h-4.5 text-white" />
            <span>Explore AI Insights (Copilot)</span>
          </button>
        </div>

        {/* Card 3: Target Watchlist */}
        <div className="p-7 rounded-3xl bg-[#040E26]/90 border border-blue-500/40 shadow-2xl flex flex-col justify-between space-y-4 card-motion backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
              <ShieldAlert className="w-4.5 h-4.5 text-red-400" />
              <span>Target Watchlist</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-[#EF4444] text-white font-bold text-[10px] font-mono">High Risk</span>
          </div>

          <div className="space-y-2.5 flex-1">
            {highRiskEntities.map(ent => (
              <div
                key={ent.id}
                onClick={() => {
                  setSelectedEntityId(ent.id);
                  setActiveTab('network');
                }}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-[#081538] hover:bg-blue-950 border border-blue-900/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#EF4444] to-[#0066FF] flex items-center justify-center font-bold text-white text-xs">
                    {ent.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white leading-tight">{ent.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{ent.type.toUpperCase()}</div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-xs font-bold text-[#EF4444]">Risk {ent.riskScore}</div>
                  <div className="text-[10px] text-[#0088FF] font-bold">{ent.centrality.degree} Links</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Active Dossiers */}
        <div className="p-7 rounded-3xl bg-[#040E26]/90 border border-blue-500/40 shadow-2xl flex flex-col justify-between space-y-4 card-motion backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight">Active Dossiers</h3>
            <button
              onClick={() => setActiveTab('dossier')}
              className="text-xs font-bold text-[#0088FF] hover:text-blue-300 flex items-center space-x-1 transition-colors font-mono"
            >
              <span>See all</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 flex-1">
            {cases.slice(0, 4).map(c => (
              <div
                key={c.id}
                onClick={() => setActiveTab('dossier')}
                className="p-3.5 rounded-2xl bg-[#081538] border border-blue-900/50 hover:border-blue-400 cursor-pointer transition-colors space-y-1.5 flex flex-col justify-between"
              >
                <div className="text-[11px] font-bold text-[#0088FF] font-mono">{c.caseNumber}</div>
                <div className="text-xs font-bold text-white truncate">{c.title}</div>
                <div className="text-[10px] text-red-400 font-bold pt-1">{c.entityCount} Nodes</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
