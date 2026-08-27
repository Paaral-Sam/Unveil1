import React, { useState } from 'react';
import { BarChart3, Share2, Sparkles, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EntityBadge } from '../components/EntityBadge';
import { RiskScorePill } from '../components/RiskScorePill';

export const CentralityView: React.FC = () => {
  const { entities, setSelectedEntityId, setActiveTab } = useApp();
  const [metricSort, setMetricSort] = useState<'degree' | 'betweenness' | 'pageRank'>('betweenness');

  const sortedEntities = [...entities].sort((a, b) => {
    if (metricSort === 'degree') return b.centrality.degree - a.centrality.degree;
    if (metricSort === 'betweenness') return b.centrality.betweenness - a.centrality.betweenness;
    return b.centrality.pageRank - a.centrality.pageRank;
  });

  const getReasonChip = (ent: typeof entities[0]) => {
    if (ent.centrality.betweenness > 0.7) return 'Bridge Node Connecting 3 Isolated Sub-Cells';
    if (ent.centrality.degree > 15) return 'High Connectivity Hub (15+ Direct Links)';
    if (ent.centrality.pageRank > 0.08) return 'High Capital/Resource Decision Authority';
    return 'Secondary Facilitator';
  };

  return (
    <div className="p-6 space-y-6 bg-tactical-grid min-h-[calc(100vh-74px)] font-mono text-command-text">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-command-border/80 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-purple-400 font-bold uppercase tracking-widest">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span>KEY INFLUENCER & NETWORK CENTRALITY ANALYTICS</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1 uppercase bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            KEY INFLUENCER CENTRALITY RANKINGS
          </h1>
          <p className="text-xs text-command-muted mt-0.5 tracking-wide">
            Algorithmic identification of key cell leaders, bridge nodes, and high-influence brokers
          </p>
        </div>

        {/* Metric Sorting Controls */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-command-muted uppercase font-bold tracking-wider">Sort By Metric:</span>
          {[
            { id: 'betweenness', label: 'Betweenness (Bridge Nodes)' },
            { id: 'degree', label: 'Degree (Hub Volume)' },
            { id: 'pageRank', label: 'PageRank (Influence)' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setMetricSort(m.id as any)}
              className={`px-3.5 py-1.5 rounded-lg uppercase font-bold text-xs transition-all ${
                metricSort === m.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-950/60 border border-purple-400/40'
                  : 'bg-command-panel/80 border border-command-border text-command-muted hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Key Influencers Cards Podium Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {sortedEntities.slice(0, 3).map((ent, idx) => (
          <div
            key={ent.id}
            className={`p-5 rounded-xl command-glass space-y-4 relative overflow-hidden transition-all hover:scale-[1.02] shadow-2xl ${
              idx === 0 ? 'border-amber-500/60 shadow-glow-amber' : idx === 1 ? 'border-cyan-500/60 shadow-glow-blue' : 'border-purple-500/60 shadow-glow-purple'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border uppercase flex items-center space-x-1 ${
                idx === 0 ? 'bg-amber-950 text-amber-300 border-amber-700' : 'bg-blue-950 text-cyan-300 border-cyan-700'
              }`}>
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>RANK #{idx + 1} INFLUENCER</span>
              </span>
              <RiskScorePill score={ent.riskScore} threatLevel={ent.threatLevel} showLabel={false} />
            </div>

            <div className="flex items-center space-x-3">
              {ent.avatarUrl ? (
                <img src={ent.avatarUrl} alt="" className="w-14 h-14 rounded-full border-2 border-purple-400 object-cover shadow-lg" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-purple-950 border-2 border-purple-400 flex items-center justify-center font-bold text-purple-300 text-lg shadow-lg">
                  {ent.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-bold text-base text-white">{ent.name}</h3>
                <EntityBadge type={ent.type} name={ent.type.toUpperCase()} />
              </div>
            </div>

            <div className="p-3 bg-command-bg/90 rounded-lg border border-command-border space-y-1.5 text-xs shadow-inner">
              <div className="flex justify-between">
                <span className="text-command-muted">Degree Centrality:</span>
                <span className="text-blue-400 font-bold">{ent.centrality.degree} links</span>
              </div>
              <div className="flex justify-between">
                <span className="text-command-muted">Betweenness Score:</span>
                <span className="text-amber-400 font-bold">{(ent.centrality.betweenness * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-command-muted">PageRank Rank:</span>
                <span className="text-emerald-400 font-bold">{ent.centrality.pageRank.toFixed(3)}</span>
              </div>
            </div>

            <div className="text-[10px] text-amber-300 bg-amber-950/50 p-2.5 rounded-lg border border-amber-800/80 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
              <span className="truncate">{getReasonChip(ent)}</span>
            </div>

            <button
              onClick={() => {
                setSelectedEntityId(ent.id);
                setActiveTab('network');
              }}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold uppercase flex items-center justify-center space-x-1.5 shadow-lg transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Focus Node in Graph</span>
            </button>
          </div>
        ))}
      </div>

      {/* Full Ranked Centrality Grid Table */}
      <div className="command-glass rounded-xl p-5 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-command-border/80 pb-3">
          <h2 className="text-sm font-bold uppercase text-white tracking-wider">Full Network Centrality Matrix</h2>
          <span className="text-xs text-command-muted font-bold">Sorted by {metricSort.toUpperCase()}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-command-border/80 text-command-muted text-[10px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">Entity Name</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Threat Tier</th>
                <th className="py-2.5 px-3">Degree Links</th>
                <th className="py-2.5 px-3">Betweenness Score</th>
                <th className="py-2.5 px-3">PageRank Score</th>
                <th className="py-2.5 px-3">Why Flagged</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-command-border/40">
              {sortedEntities.map((ent, idx) => (
                <tr key={ent.id} className="hover:bg-purple-950/20 transition-colors">
                  <td className="py-3 px-3 font-bold text-cyan-400">#{idx + 1}</td>
                  <td className="py-3 px-3 font-bold text-white">{ent.name}</td>
                  <td className="py-3 px-3">
                    <EntityBadge type={ent.type} name={ent.type.toUpperCase()} />
                  </td>
                  <td className="py-3 px-3">
                    <RiskScorePill score={ent.riskScore} threatLevel={ent.threatLevel} showLabel={false} />
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: `${Math.min(100, ent.centrality.degree * 5)}%` }} />
                      </div>
                      <span className="text-blue-300 font-bold">{ent.centrality.degree}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full" style={{ width: `${ent.centrality.betweenness * 100}%` }} />
                      </div>
                      <span className="text-amber-300 font-bold">{(ent.centrality.betweenness * 100).toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">
                    {ent.centrality.pageRank.toFixed(3)}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] bg-amber-950/60 text-amber-300 border border-amber-800 px-2 py-0.5 rounded-md font-mono">
                      {getReasonChip(ent)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedEntityId(ent.id);
                        setActiveTab('network');
                      }}
                      className="px-3 py-1 bg-blue-950 hover:bg-blue-600 text-cyan-300 hover:text-white rounded-md border border-blue-700 text-[10px] font-bold uppercase transition-colors"
                    >
                      Focus in Graph
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
