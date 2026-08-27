import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TimelineView: React.FC = () => {
  const { timelineEvents, setActiveTab } = useApp();

  return (
    <div className="p-6 space-y-6 bg-unveil-mesh min-h-[calc(100vh-80px)] font-sans text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#282336] pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-blue-400 font-bold uppercase tracking-wider font-mono">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>INCIDENT & MOVEMENT CHRONOLOGICAL RECONSTRUCTION</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Timeline Reconstruction & Event Swimlanes
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Chronological reconstruction of communications, financial wire transfers, and co-location events
          </p>
        </div>
      </div>

      {/* Timeline Stream Cards */}
      <div className="p-6 rounded-3xl bg-[#15121C] border border-[#282336] shadow-2xl space-y-6">
        <div className="relative pl-6 border-l-2 border-purple-500/40 space-y-8">
          {timelineEvents.map(evt => (
            <div key={evt.id} className="relative group">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-purple-600 border-4 border-[#15121C] group-hover:scale-125 transition-transform" />

              <div className="p-5 rounded-2xl bg-[#1C1826] border border-[#282336] hover:border-purple-500/40 transition-colors space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800">
                    {new Date(evt.timestamp).toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-bold">{evt.type}</span>
                </div>

                <h3 className="text-base font-bold text-white">{evt.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{evt.description}</p>

                <div className="pt-2 flex items-center justify-between border-t border-[#282336] text-xs font-mono">
                  <span className="text-slate-400">Source: <strong className="text-slate-200">{evt.sourceTag}</strong></span>
                  <button
                    onClick={() => setActiveTab('network')}
                    className="text-purple-400 hover:text-purple-300 font-bold flex items-center space-x-1"
                  >
                    <span>View in Graph</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
