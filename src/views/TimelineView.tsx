import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TimelineView: React.FC = () => {
  const { timelineEvents, setSelectedEntityId } = useApp();

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
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#0066FF] uppercase tracking-wider">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>INCIDENT & MOVEMENT CHRONOLOGICAL RECONSTRUCTION</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Timeline Reconstruction & Event Swimlanes
          </h2>
          <p className="text-sm text-slate-500 font-sans mt-0.5">
            Chronological reconstruction of communications, financial wire transfers, and co-location events.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold">
          {timelineEvents.length} Sequential Intercept Events
        </span>
      </div>

      {/* Timeline Stream Cards */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="relative pl-6 border-l-2 border-blue-500/60 space-y-6">
          {timelineEvents.map(evt => (
            <div key={evt.id} className="relative group">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] top-2 w-4 h-4 rounded-full bg-[#0066FF] border-4 border-white shadow-md group-hover:scale-125 transition-transform" />

              <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    {new Date(evt.timestamp).toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-slate-700 font-bold bg-slate-100 px-3 py-1 rounded-full border border-slate-200 uppercase">
                    {evt.type}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900">{evt.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">{evt.description}</p>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs font-mono">
                  <span className="text-slate-500 font-semibold">Location: <strong className="text-slate-900">{evt.locationName || 'N/A'}</strong></span>
                  <button
                    onClick={handleFocusGraph}
                    className="text-[#0066FF] hover:text-blue-700 font-bold flex items-center space-x-1"
                  >
                    <span>Inspect Target Node</span>
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
