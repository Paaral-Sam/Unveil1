import React from 'react';
import { UserCheck, Phone, CreditCard, Car, MapPin, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EntityBadge } from '../components/EntityBadge';
import { RiskScorePill } from '../components/RiskScorePill';

export const EntityDossierView: React.FC = () => {
  const { entities, selectedEntityId, setSelectedEntityId } = useApp();

  const activeEntity = entities.find(e => e.id === selectedEntityId) || entities[0];

  const handleFocusGraph = (entityId: string) => {
    setSelectedEntityId(entityId);
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
          <div className="flex items-center space-x-2 text-xs text-[#0066FF] font-bold uppercase tracking-wider font-mono">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <span>INTELLIGENCE ENTITY DOSSIER FILE</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Subject Dossier Profile & Technical Identifiers
          </h2>
          <p className="text-sm text-slate-500 font-sans mt-0.5">
            Full biometric profiles, technical identifiers (phones, plates, accounts), and operational role summaries.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Entities Selector List */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight pb-2 border-b border-slate-100 uppercase font-mono">
            Select Entity Record
          </h3>
          <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
            {entities.map(ent => (
              <button
                key={ent.id}
                onClick={() => setSelectedEntityId(ent.id)}
                className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all border ${
                  activeEntity.id === ent.id
                    ? 'bg-blue-50 border-[#0066FF] shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                    {ent.type.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 leading-tight">{ent.name}</div>
                    <div className="text-[11px] text-slate-500 font-sans">{ent.type.toUpperCase()}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  <span className="text-xs font-bold text-slate-900 font-mono">{ent.riskScore}</span>
                  <span className={`w-2 h-2 rounded-full ${ent.riskScore > 85 ? 'bg-rose-500' : 'bg-amber-500'}`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right 2 Cols: Full Detailed Dossier Card */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#EF4444] to-[#0066FF] text-white flex items-center justify-center font-extrabold text-2xl shadow-md shrink-0">
                {activeEntity.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{activeEntity.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <EntityBadge type={activeEntity.type} name={activeEntity.type.toUpperCase()} />
                  <span className="text-xs font-mono font-bold text-slate-500">Confidence: {activeEntity.confidenceScore}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <RiskScorePill score={activeEntity.riskScore} threatLevel={activeEntity.threatLevel} />
              <button
                onClick={() => handleFocusGraph(activeEntity.id)}
                className="px-4 py-2 bg-[#040E26] hover:bg-blue-900 text-white rounded-xl text-xs font-bold font-mono transition-colors shadow-md flex items-center space-x-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Focus Node in Graph</span>
              </button>
            </div>
          </div>

          {/* Technical Identifiers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-1">
              <div className="text-xs font-mono font-bold text-slate-500 flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-purple-600" />
                <span>PRIMARY TELEMETRY PHONE</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900 font-mono">{activeEntity.phone || '+1-555-019-4821'}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-1">
              <div className="text-xs font-mono font-bold text-slate-500 flex items-center space-x-1.5">
                <Car className="w-3.5 h-3.5 text-amber-600" />
                <span>REGISTERED VEHICLE PLATE</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900 font-mono">{activeEntity.vehiclePlate || 'NY-771-X99'}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-1">
              <div className="text-xs font-mono font-bold text-slate-500 flex items-center space-x-1.5">
                <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                <span>FINANCIAL SWIFT ACCOUNT</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900 font-mono">{activeEntity.accountNumber || 'CHASE-OFFSHORE-9921'}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-1">
              <div className="text-xs font-mono font-bold text-slate-500 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>GEOFENCE CLUSTER SITE</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900 font-mono">{activeEntity.locationName || 'Pier 42 Terminal'}</div>
            </div>
          </div>

          {/* Operational Summary */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">OPERATIONAL SYNDICATE ROLE</span>
            <p className="text-xs text-slate-800 leading-relaxed font-sans font-semibold">
              {activeEntity.roleDescription || 'Primary syndicate ringleader and key decision broker controlling offshore capital flows.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
