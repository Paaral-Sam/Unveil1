import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Search, Filter, Lock, Terminal, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminView: React.FC = () => {
  const { auditLogs, currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActionFilter, setSelectedActionFilter] = useState('ALL');

  const extendedLogs: Array<{ id: string; timestamp: string; user: string; action: string; target: string; ip: string }> = [
    ...auditLogs.map(l => ({
      id: l.id,
      timestamp: l.timestamp,
      user: l.user || l.actor || 'Analyst J. Vance',
      action: l.action,
      target: l.target || l.resource || 'Entity Graph',
      ip: l.ipAddress || '10.240.8.12'
    })),
    { id: 'log-105', timestamp: '26/08/2026, 18:45:10', user: 'Analyst J. Vance (Badge #8804)', action: 'GEO_SURVEILLANCE_PLAYBACK', target: 'Geofence Cluster Sector 18', ip: '10.240.8.12' },
    { id: 'log-106', timestamp: '26/08/2026, 17:30:22', user: 'Supervisor M. Sterling', action: 'NEW_CASE_PROVISION', target: 'Case #2026-4412 (Apex Cyber)', ip: '10.240.8.15' },
    { id: 'log-107', timestamp: '26/08/2026, 16:15:00', user: 'Chief Admin Director', action: 'SYSTEM_CLEARANCE_UPDATE', target: 'Investigator S. Chen -> LEVEL_4', ip: '10.240.8.01' },
    { id: 'log-108', timestamp: '26/08/2026, 15:02:44', user: 'Analyst J. Vance (Badge #8804)', action: 'DOSSIER_PRINT_EXPORT', target: 'Dossier #ent-1 (Arjun Mehta)', ip: '10.240.8.12' },
    { id: 'log-109', timestamp: '26/08/2026, 14:10:05', user: 'System Automated Sentinel', action: 'PATTERN_ANOMALY_FLAG', target: 'Syndicate Rapid Money Transfer', ip: 'LOCAL_KERNEL' },
    { id: 'log-110', timestamp: '26/08/2026, 12:44:19', user: 'Investigator S. Chen', action: 'CDR_FILE_INGESTION', target: 'Airtel_Tower_Logs_Noida.csv', ip: '10.240.8.19' },
  ];

  const filteredLogs = extendedLogs.filter(log => {
    const searchMatch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        log.ip.includes(searchTerm);
    const actionMatch = selectedActionFilter === 'ALL' || log.action === selectedActionFilter;
    return searchMatch && actionMatch;
  });

  return (
    <div className="p-6 sm:p-8 space-y-8 min-h-[85vh] font-sans text-slate-100 animate-fade-in-up">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-blue-900/40 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-blue-400 font-bold uppercase tracking-wider font-mono">
            <Lock className="w-4 h-4 text-blue-400" />
            <span>IMMUTABLE SYSTEM AUDIT LOGS & COMPLIANCE MATRIX</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
            Security Audit Trail & Governance Portal
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time cryptographic access logging, analyst action history, and security clearance monitoring.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start md:self-auto">
          <div className="px-4 py-2 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold flex items-center space-x-2 shadow-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>CLEARANCE LEVEL: {currentUser.role.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Compliance Matrix Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#040E26]/90 border border-blue-500/40 shadow-2xl space-y-2 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>COMPLIANCE SCORE</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">99.8%</div>
          <p className="text-xs text-emerald-400 font-semibold">Zero unauthorized access attempts detected</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#040E26]/90 border border-blue-500/40 shadow-2xl space-y-2 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>STREAM CONNECTORS</span>
            <Terminal className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">6 ACTIVE</div>
          <p className="text-xs text-blue-400 font-semibold">Real-time sync with Central Police DB & SWIFT</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#040E26]/90 border border-blue-500/40 shadow-2xl space-y-2 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>ACTIVE SESSIONS</span>
            <UserCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">14 ANALYSTS</div>
          <p className="text-xs text-purple-400 font-semibold">Multi-factor encrypted session tokens active</p>
        </div>
      </div>

      {/* Audit Log Table Container with Extended Height */}
      <div className="p-7 sm:p-8 rounded-3xl bg-[#040E26]/90 border border-blue-500/40 shadow-2xl space-y-6 backdrop-blur-xl min-h-[520px]">
        {/* Controls Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search user, action, target, or IP..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#020718] border border-blue-900/50 focus:border-[#0066FF] rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none font-mono"
            />
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end font-mono text-xs">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedActionFilter}
              onChange={e => setSelectedActionFilter(e.target.value)}
              className="bg-[#020718] border border-blue-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="ALL">ALL ACTIONS</option>
              <option value="GEO_SURVEILLANCE_PLAYBACK">SURVEILLANCE PLAYBACK</option>
              <option value="NEW_CASE_PROVISION">NEW CASE PROVISION</option>
              <option value="SYSTEM_CLEARANCE_UPDATE">CLEARANCE UPDATE</option>
              <option value="DOSSIER_PRINT_EXPORT">DOSSIER PRINT EXPORT</option>
              <option value="PATTERN_ANOMALY_FLAG">ANOMALY FLAG</option>
              <option value="CDR_FILE_INGESTION">FILE INGESTION</option>
            </select>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto rounded-2xl border border-blue-900/50">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-[#081538] border-b border-blue-900/50 text-slate-300 uppercase tracking-wider">
                <th className="py-3.5 px-4">EVENT ID</th>
                <th className="py-3.5 px-4">TIMESTAMP</th>
                <th className="py-3.5 px-4">ACTOR / ANALYST</th>
                <th className="py-3.5 px-4">ACTION PERFORMED</th>
                <th className="py-3.5 px-4">TARGET RESOURCE</th>
                <th className="py-3.5 px-4 text-right">CLIENT IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/40 bg-[#040E26]/80 text-slate-200">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-blue-950/60 transition-colors">
                  <td className="py-4 px-4 font-bold text-blue-400">{log.id}</td>
                  <td className="py-4 px-4 text-slate-400">{log.timestamp}</td>
                  <td className="py-4 px-4 font-bold text-white">{log.user}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-blue-950 text-blue-300 border border-blue-800 font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-300 font-sans">{log.target}</td>
                  <td className="py-4 px-4 text-right text-emerald-400 font-mono font-bold">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
