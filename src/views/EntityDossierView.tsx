import React from 'react';
import { UserCheck, Phone, CreditCard, Car, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EntityBadge } from '../components/EntityBadge';
import { RiskScorePill } from '../components/RiskScorePill';

export const EntityDossierView: React.FC = () => {
  const { entities, selectedEntityId, setSelectedEntityId, setActiveTab } = useApp();

  const activeEntity = entities.find(e => e.id === selectedEntityId) || entities[0];

  return (
    <div className="p-6 space-y-6 bg-unveil-mesh min-h-[calc(100vh-80px)] font-sans text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#282336] pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-indigo-400 font-bold uppercase tracking-wider font-mono">
            <UserCheck className="w-4 h-4 text-indigo-400" />
            <span>INTELLIGENCE ENTITY DOSSIER FILE</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Subject Dossier Profile & Identifiers
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Full biometric profiles, technical identifiers (phones, plates, accounts), and operational role summaries
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Entities Selector List */}
        <div className="p-6 rounded-3xl bg-[#15121C] border border-[#282336] shadow-2xl space-y-3">
          <h3 className="text-base font-bold text-white tracking-tight pb-2 border-b border-[#282336]">Select Entity Record</h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {entities.map(ent => (
              <button
                key={ent.id}
                onClick={() => setSelectedEntityId(ent.id)}
                className={`w-full text-left p-3 rounded-2xl flex items-center justify-between transition-colors border ${
                  activeEntity.id === ent.id
                    ? 'bg-purple-900/40 border-purple-500/60 text-white font-bold'
                    : 'bg-[#1C1826] border-[#282336] text-slate-300 hover:bg-[#252033]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {ent.avatarUrl ? (
                    <img src={ent.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover border border-purple-500/40" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-purple-950 flex items-center justify-center font-bold text-purple-300 text-sm">
                      {ent.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-sm text-white">{ent.name}</div>
                    <EntityBadge type={ent.type} name={ent.type.toUpperCase()} />
                  </div>
                </div>
                <RiskScorePill score={ent.riskScore} threatLevel={ent.threatLevel} showLabel={false} />
              </button>
            ))}
          </div>
        </div>

        {/* Right 2 Cols: Main Dossier Card */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#15121C] border border-[#282336] shadow-2xl space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#282336] pb-5">
            <div className="flex items-center space-x-4">
              {activeEntity.avatarUrl ? (
                <img src={activeEntity.avatarUrl} alt="" className="w-20 h-20 rounded-3xl object-cover border-2 border-purple-500 shadow-xl" />
              ) : (
                <div className="w-20 h-20 rounded-3xl bg-purple-950 border-2 border-purple-500 flex items-center justify-center font-bold text-purple-300 text-3xl shadow-xl">
                  {activeEntity.name.charAt(0)}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{activeEntity.name}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <EntityBadge type={activeEntity.type} name={activeEntity.type.toUpperCase()} />
                  <span className="text-xs text-slate-400 font-mono">ID: {activeEntity.id}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <RiskScorePill score={activeEntity.riskScore} threatLevel={activeEntity.threatLevel} />
              <button
                onClick={() => setActiveTab('network')}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl text-xs font-bold shadow-lg"
              >
                Inspect in Graph Canvas
              </button>
            </div>
          </div>

          {/* Technical Identifiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#1C1826] border border-[#282336] space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-purple-400 font-mono">
                <Phone className="w-4 h-4" />
                <span>COMMUNICATION IDENTIFIER</span>
              </div>
              <div className="text-sm font-bold text-white font-mono">{activeEntity.phone || 'N/A Telemetry'}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1C1826] border border-[#282336] space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 font-mono">
                <CreditCard className="w-4 h-4" />
                <span>FINANCIAL ACCOUNT NUMBER</span>
              </div>
              <div className="text-sm font-bold text-white font-mono">{activeEntity.accountNumber || 'N/A Account'}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1C1826] border border-[#282336] space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 font-mono">
                <Car className="w-4 h-4" />
                <span>VEHICLE ALPR PLATE</span>
              </div>
              <div className="text-sm font-bold text-white font-mono">{activeEntity.vehiclePlate || 'N/A Vehicle'}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1C1826] border border-[#282336] space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 font-mono">
                <MapPin className="w-4 h-4" />
                <span>PRIMARY CO-LOCATION LOCATION</span>
              </div>
              <div className="text-sm font-bold text-white">{activeEntity.locationName || 'New York Sector'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
