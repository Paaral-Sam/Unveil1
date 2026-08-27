import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PatternsView: React.FC = () => {
  const { patterns, updatePatternStatus, setSelectedEntityId } = useApp();

  const handleFocusGraph = () => {
    setSelectedEntityId('ent-1');
    const graphElement = document.getElementById('section-network');
    if (graphElement) {
      graphElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          {patterns.length} Active Threat Alerts
        </span>
      </div>

      {/* Pattern Alert Cards List */}
      <div className="space-y-4">
        {patterns.map(pat => (
          <div
            key={pat.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md space-y-4 transition-all"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-bold shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-tight">{pat.title}</h3>
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
              <div className="flex flex-wrap gap-1.5 items-center text-xs">
                <span className="text-slate-500 font-mono font-bold uppercase text-[10px]">INVOLVED:</span>
                {pat.entitiesInvolved.map((entName, idx) => (
                  <button
                    key={idx}
                    onClick={handleFocusGraph}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 border border-slate-200 text-slate-800 hover:text-blue-600 text-xs font-mono font-semibold transition-colors flex items-center space-x-1"
                  >
                    <span>{entName}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => updatePatternStatus(pat.id, 'CONFIRMED_THREAT')}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-colors font-mono"
                >
                  ✓ Confirm Threat
                </button>
                <button
                  onClick={() => updatePatternStatus(pat.id, 'DISMISSED')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-bold text-xs transition-colors font-mono"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
