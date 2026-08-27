import React, { useState } from 'react';
import { UserCheck, Search, Filter, Lock, Terminal } from 'lucide-react';
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
    <div className="w-full bg-white p-6 lg:p-8 space-y-6 font-sans text-slate-900 rounded-3xl border border-slate-200 shadow-md animate-fade-in-up">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#0066FF] font-bold uppercase tracking-wider font-mono">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>IMMUTABLE SYSTEM AUDIT LOGS & COMPLIANCE MATRIX</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Security Audit Trail & Governance Portal
          </h2>
          <p className="text-sm text-slate-500 font-sans mt-0.5">
            Real-time cryptographic access logging, analyst action history, and security clearance monitoring.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AUDIT LOG KERNEL: SECURE</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Left Controls & Stats / Right Log Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Security Metrics & Search Controls */}
        <div className="space-y-6">
          {/* Active Session Card */}
          <div className="p-6 rounded-2xl bg-[#040E26] text-white border border-blue-900 shadow-md space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-2">
              <span className="text-xs text-blue-400 font-bold uppercase flex items-center space-x-1.5">
                <UserCheck className="w-4 h-4" />
                <span>ACTIVE SESSION ANALYST</span>
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-md font-bold">
                LEVEL 4
              </span>
            </div>

            <div className="space-y-1 font-sans">
              <h3 className="text-lg font-extrabold text-white">{currentUser.name}</h3>
              <p className="text-xs text-blue-300 font-mono font-bold">BADGE #8804 · SENIOR INTELLIGENCE ANALYST</p>
              <p className="text-xs text-slate-300 pt-1">IP Address: <strong>10.240.8.12 (Internal Subnet)</strong></p>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 font-sans">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase font-mono border-b border-slate-100 pb-2">
              Audit Search & Filters
            </h3>

            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by analyst, action, target or IP"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-10 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center space-x-1">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Action Category Filter</span>
              </label>
              <select
                value={selectedActionFilter}
                onChange={e => setSelectedActionFilter(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-medium focus:outline-none"
              >
                <option value="ALL">All Logged Actions</option>
                <option value="APPROVE_EXTRACTION">APPROVE_EXTRACTION</option>
                <option value="GEO_SURVEILLANCE_PLAYBACK">GEO_SURVEILLANCE_PLAYBACK</option>
                <option value="NEW_CASE_PROVISION">NEW_CASE_PROVISION</option>
                <option value="DOSSIER_PRINT_EXPORT">DOSSIER_PRINT_EXPORT</option>
                <option value="PATTERN_ANOMALY_FLAG">PATTERN_ANOMALY_FLAG</option>
                <option value="CDR_FILE_INGESTION">CDR_FILE_INGESTION</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Immutable Audit Log Table */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 font-sans">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-blue-600" />
              <span>IMMUTABLE AUDIT TRAIL LOG MATRIX</span>
            </span>
            <span className="text-xs font-mono font-bold text-blue-600 font-mono">
              {filteredLogs.length} LOG ENTRIES
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-slate-200 text-slate-600 text-xs uppercase font-mono tracking-wider">
                  <th className="py-3 px-3">Timestamp</th>
                  <th className="py-3 px-3">Analyst / Actor</th>
                  <th className="py-3 px-3">Action Type</th>
                  <th className="py-3 px-3">Target Resource</th>
                  <th className="py-3 px-3">IP Node</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="py-3 px-3 text-slate-500 font-bold whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-3 px-3 font-extrabold text-slate-900">{log.user}</td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold border border-blue-200 text-[10px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-800 font-semibold">{log.target}</td>
                    <td className="py-3 px-3 text-slate-500 font-bold">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
