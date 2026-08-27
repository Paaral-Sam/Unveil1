import React, { useState } from 'react';
import { AlertTriangle, ExternalLink, CheckCircle2, XCircle, Check, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PatternsView: React.FC = () => {
  const { patterns, updatePatternStatus, setSelectedEntityId, entities } = useApp();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Smart Entity Resolver: Maps name string to exact entity ID in AppContext
  const handleFocusEntity = (entName: string) => {
    let targetId = 'ent-1'; // Default fallback

    // Match exact entity names from mock dataset
    if (entName.includes('185.220.101.45')) targetId = 'ent-13';
    else if (entName.includes('darknet-exfiltrate-vault')) targetId = 'ent-14';
    else if (entName.includes('LockBit')) targetId = 'ent-16';
    else if (entName.includes('0x71C7')) targetId = 'ent-15';
    else if (entName.includes('Apex Global')) targetId = 'ent-3';
    else {
      // Dynamic search in AppContext entities
      const match = entities.find(e => e.name.toLowerCase().includes(entName.toLowerCase()) || entName.toLowerCase().includes(e.name.toLowerCase()));
      if (match) targetId = match.id;
    }

    setSelectedEntityId(targetId);
    
    // Smooth scroll down to Network Topology Explorer
    const graphElement = document.getElementById('section-network');
    if (graphElement) {
      graphElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConfirmThreat = (patternId: string, title: string) => {
    updatePatternStatus(patternId, 'CONFIRMED_THREAT' as any);
    setToastMessage(`✓ Confirmed threat "${title}". Evidence logged for prosecution brief.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleDismissThreat = (patternId: string, title: string) => {
    updatePatternStatus(patternId, 'DISMISSED');
    setToastMessage(`⊗ Dismissed alert "${title}". Removed from active threat counter.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const activeThreats = patterns.filter(p => p.status !== 'DISMISSED');

  return (
    <div className="w-full bg-white p-6 lg:p-8 space-y-6 font-sans text-slate-900 rounded-3xl border border-slate-200 shadow-md animate-fade-in-up">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-rose-600 font-bold uppercase tracking-wider font-mono">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>AI PATTERN & ANOMALY DETECTION ENGINE</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Suspicious Network Pattern & Anomaly Feed
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Automated detection of circular money transfers, pre-event call bursts, burner phone usage, and co-location clusters.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono font-bold">
          {activeThreats.length} Active Threat Alerts
        </span>
      </div>

      {/* Confirmation Toast Notification */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-[#040E26] border border-emerald-500/60 shadow-xl text-xs font-mono text-emerald-400 flex items-center justify-between animate-fade-in-down">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Pattern Alert Cards List */}
      <div className="space-y-4">
        {patterns.map(pat => {
          const isConfirmed = pat.status === 'CONFIRMED_THREAT' || pat.status === ('CONFIRMED' as any);
          const isDismissed = pat.status === 'DISMISSED';

          return (
            <div
              key={pat.id}
              className={`p-6 rounded-2xl border shadow-sm transition-all space-y-4 ${
                isConfirmed
                  ? 'bg-[#F0FDF4] border-emerald-400 shadow-md'
                  : isDismissed
                  ? 'bg-slate-50 border-slate-200 opacity-60'
                  : 'bg-white border-slate-200 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 border ${
                    isConfirmed ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-600'
                  }`}>
                    {isConfirmed ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-extrabold text-slate-900 leading-tight">{pat.title}</h3>
                      {isConfirmed && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white font-mono text-[10px] font-bold">
                          ✓ CONFIRMED THREAT
                        </span>
                      )}
                      {isDismissed && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-300 text-slate-700 font-mono text-[10px] font-bold">
                          ⊗ DISMISSED
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">Detected: {new Date(pat.timestamp).toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold border bg-rose-50 text-rose-700 border-rose-200">
                    {pat.severity} SEVERITY
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold">
                    {pat.type}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                {pat.description}
              </p>

              {pat.evidenceSnippet && (
                <div className="p-3.5 rounded-xl bg-[#020718] border border-blue-900/60 font-mono text-xs text-slate-200 leading-relaxed">
                  "{pat.evidenceSnippet}"
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                {/* Interactive Entity Pills: Clicking focuses node in Network Explorer */}
                <div className="flex flex-wrap gap-1.5 items-center text-xs">
                  <span className="text-slate-500 font-mono font-bold uppercase text-[10px]">INVOLVED:</span>
                  {pat.entitiesInvolved.map((entName, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFocusEntity(entName)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white border border-slate-200 text-slate-800 text-xs font-mono font-semibold transition-colors flex items-center space-x-1.5 shadow-xs group"
                      title={`Click to focus "${entName}" in Network Explorer Graph`}
                    >
                      <span>{entName}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white" />
                    </button>
                  ))}
                </div>

                {/* Interactive Actions: Confirm Threat & Dismiss */}
                <div className="flex items-center space-x-2 shrink-0">
                  {!isConfirmed && (
                    <button
                      onClick={() => handleConfirmThreat(pat.id, pat.title)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all font-mono active:scale-95 flex items-center space-x-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>✓ Confirm Threat</span>
                    </button>
                  )}

                  {!isDismissed && (
                    <button
                      onClick={() => handleDismissThreat(pat.id, pat.title)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-bold text-xs transition-all font-mono active:scale-95 flex items-center space-x-1"
                    >
                      <XCircle className="w-3.5 h-3.5 text-slate-500" />
                      <span>Dismiss</span>
                    </button>
                  )}

                  {isConfirmed && (
                    <button
                      onClick={() => handleFocusEntity(pat.entitiesInvolved[0])}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition-all font-mono flex items-center space-x-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-300" />
                      <span>Inspect Graph Topology</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
