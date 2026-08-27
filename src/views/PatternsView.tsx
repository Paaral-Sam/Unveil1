import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PatternsView: React.FC = () => {
  const { patterns, updatePatternStatus, setActiveTab } = useApp();

  return (
    <div className="p-6 space-y-6 bg-unveil-mesh min-h-[calc(100vh-80px)] font-sans text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#282336] pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-amber-400 font-bold uppercase tracking-wider font-mono">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>AI PATTERN & ANOMALY DETECTION ENGINE</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Suspicious Network Pattern & Anomaly Alerts Feed
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Automated detection of circular money transfers, pre-event call bursts, burner phone usage, and co-location clusters
          </p>
        </div>
      </div>

      {/* Pattern Alert Cards List */}
      <div className="space-y-4">
        {patterns.map(pat => (
          <div
            key={pat.id}
            className="p-6 rounded-3xl bg-[#15121C] border border-[#282336] shadow-2xl space-y-4 hover:border-rose-500/40 transition-colors"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#282336] pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-400 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{pat.title}</h3>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">Detected: {new Date(pat.timestamp).toLocaleString()}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold border bg-rose-950 text-rose-300 border-rose-800">
                  {pat.severity} SEVERITY
                </span>
                <span className="px-3 py-1 rounded-full bg-[#1C1826] border border-[#282336] text-slate-300 text-xs font-mono">
                  {pat.type}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{pat.description}</p>

            {/* Implicated Entities Badges */}
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="text-slate-400 font-bold uppercase">Implicated Entities:</span>
              {pat.entitiesInvolved.map((entId, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-[#1C1826] border border-purple-500/40 text-purple-300 font-bold">
                  {entId}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#282336]">
              <button
                onClick={() => updatePatternStatus(pat.id, 'FALSE_POSITIVE')}
                className="px-4 py-2 bg-[#1C1826] hover:bg-[#252030] text-slate-400 hover:text-white rounded-2xl text-xs font-bold transition-colors border border-[#282336]"
              >
                Mark False Positive
              </button>

              <button
                onClick={() => setActiveTab('network')}
                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl text-xs font-bold transition-all shadow-lg shadow-purple-900/40 flex items-center space-x-1.5"
              >
                <span>Investigate in Canvas Graph</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
