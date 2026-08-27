import React, { useState } from 'react';
import { BarChart3, Share2, Sparkles, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EntityBadge } from '../components/EntityBadge';
import { RiskScorePill } from '../components/RiskScorePill';

export const CentralityView: React.FC = () => {
  const { entities, setSelectedEntityId } = useApp();
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

  const handleFocusInGraph = (entityId: string) => {
    setSelectedEntityId(entityId);
    const graphElement = document.getElementById('section-network');
    if (graphElement) {
      graphElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white p-6 lg:p-8 space-y-6 font-sans text-slate-900 rounded-3xl border border-slate-200 shadow-md animate-fade-in-up">
      {/* Header Bar matching Network Explorer Pure White Style */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#0066FF] uppercase tracking-wider">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span>KEY INFLUENCER & NETWORK CENTRALITY ANALYTICS</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Key Influencer Centrality Rankings</h2>
          <p className="text-sm text-slate-500 font-sans mt-0.5">
            Algorithmic identification of key syndicate cell leaders, bridge brokers, and high-influence decision nodes.
          </p>
        </div>

        {/* Metric Sorting Controls */}
        <div className="flex items-center space-x-2 text-xs font-sans">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Sort Metric:</span>
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-mono font-bold">
            {[
              { id: 'betweenness', label: 'Betweenness (Bridges)' },
              { id: 'degree', label: 'Degree (Hub Volume)' },
              { id: 'pageRank', label: 'PageRank (Influence)' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setMetricSort(m.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  metricSort === m.id
                    ? 'bg-[#0066FF] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Key Influencers Cards Podium Highlight matching Network Explorer Card Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedEntities.slice(0, 3).map((ent, idx) => (
          <div
            key={ent.id}
            className={`p-6 rounded-2xl bg-white border space-y-4 relative overflow-hidden transition-all hover:scale-[1.01] shadow-sm hover:shadow-md ${
              idx === 0 ? 'border-amber-400/80 ring-2 ring-amber-400/20' : idx === 1 ? 'border-blue-400/80 ring-2 ring-blue-400/20' : 'border-purple-400/80 ring-2 ring-purple-400/20'
            }`}
          >
            {/* Rank Badge & Risk Score */}
            <div className="flex items-center justify-between">
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full border uppercase flex items-center space-x-1.5 font-mono ${
                idx === 0 ? 'bg-amber-50 text-amber-700 border-amber-300' : idx === 1 ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-purple-50 text-purple-700 border-purple-300'
              }`}>
                <Award className="w-3.5 h-3.5" />
                <span>RANK #{idx + 1} INFLUENCER</span>
              </span>
              <RiskScorePill score={ent.riskScore} threatLevel={ent.threatLevel} showLabel={false} />
            </div>

            {/* Suspect / Entity Info */}
            <div className="flex items-center space-x-3.5 pt-1">
              {ent.avatarUrl ? (
                <img src={ent.avatarUrl} alt="" className="w-14 h-14 rounded-2xl border-2 border-slate-200 object-cover shadow-md" />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#EF4444] to-[#0066FF] text-white flex items-center justify-center font-extrabold text-xl shadow-md shrink-0">
                  {ent.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-extrabold text-base text-slate-900 tracking-tight leading-tight">{ent.name}</h3>
                <div className="mt-1">
                  <EntityBadge type={ent.type} name={ent.type.toUpperCase()} />
                </div>
              </div>
            </div>

            {/* Centrality Metrics Box */}
            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-slate-200 space-y-2 text-xs font-sans shadow-inner">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Degree Centrality:</span>
                <span className="text-blue-600 font-extrabold font-mono text-sm">{ent.centrality.degree} links</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Betweenness Score:</span>
                <span className="text-amber-600 font-extrabold font-mono text-sm">{(ent.centrality.betweenness * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">PageRank Rank:</span>
                <span className="text-emerald-600 font-extrabold font-mono text-sm">{ent.centrality.pageRank.toFixed(3)}</span>
              </div>
            </div>

            {/* Reason Chip */}
            <div className="text-xs text-amber-800 bg-amber-50/90 p-3 rounded-xl border border-amber-200 flex items-center space-x-2 font-medium">
              <Sparkles className="w-4 h-4 shrink-0 text-amber-600" />
              <span className="truncate">{getReasonChip(ent)}</span>
            </div>

            {/* Focus in Graph Button */}
            <button
              onClick={() => handleFocusInGraph(ent.id)}
              className="w-full py-2.5 bg-[#040E26] hover:bg-blue-950 text-white rounded-xl text-xs font-bold uppercase flex items-center justify-center space-x-2 shadow-md transition-all font-mono"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Focus Node in Network Explorer Graph</span>
            </button>
          </div>
        ))}
      </div>

      {/* Full Ranked Centrality Grid Table matching Network Explorer Table Styling */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Full Network Centrality Matrix</h3>
            <p className="text-xs text-slate-500 mt-0.5">Ranked network node metrics for target identification</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold">
            Sorted by {metricSort.toUpperCase()}
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-200 text-slate-600 text-xs uppercase font-mono tracking-wider">
                <th className="py-3.5 px-4">Rank</th>
                <th className="py-3.5 px-4">Entity Name</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Threat Risk</th>
                <th className="py-3.5 px-4">Degree Links</th>
                <th className="py-3.5 px-4">Betweenness Score</th>
                <th className="py-3.5 px-4">PageRank</th>
                <th className="py-3.5 px-4">Algorithmic Reason</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              {sortedEntities.map((ent, idx) => (
                <tr key={ent.id} className="hover:bg-blue-50/50 transition-colors align-middle">
                  <td className="py-3.5 px-4 font-bold font-mono text-blue-600">#{idx + 1}</td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">{ent.name}</td>
                  <td className="py-3.5 px-4">
                    <EntityBadge type={ent.type} name={ent.type.toUpperCase()} />
                  </td>
                  <td className="py-3.5 px-4">
                    <RiskScorePill score={ent.riskScore} threatLevel={ent.threatLevel} showLabel={false} />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2 font-mono">
                      <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                        <div className="bg-blue-600 h-full" style={{ width: `${Math.min(100, ent.centrality.degree * 5)}%` }} />
                      </div>
                      <span className="text-slate-800 font-bold">{ent.centrality.degree}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2 font-mono">
                      <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                        <div className="bg-amber-500 h-full" style={{ width: `${ent.centrality.betweenness * 100}%` }} />
                      </div>
                      <span className="text-amber-700 font-bold">{(ent.centrality.betweenness * 100).toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold font-mono">
                    {ent.centrality.pageRank.toFixed(3)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[11px] bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg font-medium">
                      {getReasonChip(ent)}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleFocusInGraph(ent.id)}
                      className="px-3.5 py-1.5 bg-[#040E26] hover:bg-blue-900 text-white rounded-xl text-xs font-bold uppercase transition-all shadow-sm font-mono inline-flex items-center space-x-1"
                    >
                      <Share2 className="w-3 h-3 text-blue-400" />
                      <span>Focus in Graph</span>
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
