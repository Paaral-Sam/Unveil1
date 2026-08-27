import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Search, Filter, Lock, Terminal, Activity, FileSpreadsheet } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminView: React.FC = () => {
  const { auditLogs, currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActionFilter, setSelectedActionFilter] = useState('ALL');

  const extendedLogs: Array<{ id: string; timestamp: string; user: string; action: string; target: string; ip: string }> = [
    ...auditLogs.map(l => ({
      id: l.id,
      timestamp: l.timestamp,
      user: l.user,
      action: l.action,
      target: l.target,
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
                        log.id.toLowerCase().includes(searchTerm.toLowerCase());
    const actionMatch = selectedActionFilter === 'ALL' || log.action.includes(selectedActionFilter);
    return searchMatch && actionMatch;
  });

  return (
    <div className="p-6 sm:p-8 space-y-8 min-h-[85vh] font-sans text-slate-100 animate-fade-in-up flex flex-col justify-between">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-blue-900/40 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#EF4444] font-bold uppercase tracking-wider mb-1">
            <Lock className="w-4 h-4" />
            <span>SYSTEM AUDIT LOGS & ACCESS CONTROL</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Security Audit Trail & User Access Matrix</h2>
          <p className="text-sm text-slate-400 font-sans mt-1">
            18 U.S.C. compliance access logs, data stream connector statuses, and security clearance management.
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-[#040E26] border border-blue-500/40 flex items-center space-x-2 text-blue-300 font-bold">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>ACTIVE ROLE: {currentUser.role.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Top 3 Status Monitor Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-[#040E26]/90 border border-blue-500/40 space-y-2 font-mono backdrop-blur-xl">
          <div className="flex justify-between text-xs text-slate-400 font-bold">
            <span>AUDIT COMPLIANCE SCORE</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">100% ISO-27001</div>
          <div className="text-[11px] text-emerald-400 font-bold">Immutable Append-Only Log Ledger</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#040E26]/90 border border-blue-500/40 space-y-2 font-mono backdrop-blur-xl">
          <div className="flex justify-between text-xs text-slate-400 font-bold">
            <span>INGESTION STREAM CONNECTORS</span>
            <Activity className="w-4 h-4 text-[#0088FF]" />
          </div>
          <div className="text-3xl font-extrabold text-white">6 LIVE STREAMS</div>
          <div className="text-[11px] text-[#0088FF] font-bold">Encrypted TLS 1.3 Communication</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#040E26]/90 border border-blue-500/40 space-y-2 font-mono backdrop-blur-xl">
          <div className="flex justify-between text-xs text-slate-400 font-bold">
            <span>ACTIVE AUTHENTICATED SESSIONS</span>
            <Terminal className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">4 ANALYST UNITS</div>
          <div className="text-[11px] text-red-400 font-bold">MFA Hardware Token Enforced</div>
        </div>
      </div>

      {/* Main Extended Audit Log Table Container matching Screenshot */}
      <div className="p-7 rounded-3xl bg-[#040E26]/95 border border-blue-500/40 shadow-2xl space-y-6 flex-1 min-h-[520px] backdrop-blur-xl flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-blue-900/50 pb-4">
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <FileSpreadsheet className="w-5 h-5 text-[#0088FF]" />
              <span>Immutable System Audit Log Table</span>
            </h3>

            {/* Filter & Search Bar */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search audit logs..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="bg-[#081538] border border-blue-900/60 focus:border-[#0088FF] rounded-xl px-9 py-2 text-xs text-white placeholder-slate-400 focus:outline-none w-64"
                />
              </div>

              <div className="flex items-center space-x-1.5">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedActionFilter}
                  onChange={e => setSelectedActionFilter(e.target.value)}
                  className="bg-[#081538] border border-blue-900/60 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="ALL">All Actions</option>
                  <option value="GRAPH">Graph Exports</option>
                  <option value="NLP">NLP Entity Approvals</option>
                  <option value="CASE">Case Status</option>
                  <option value="DOSSIER">Dossier Views</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-blue-900/50">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#081538] text-slate-300 uppercase text-[10px] tracking-wider border-b border-blue-900/50">
                <tr>
                  <th className="p-4">LOG ID</th>
                  <th className="p-4">TIMESTAMP</th>
                  <th className="p-4">ANALYST USER</th>
                  <th className="p-4">ACTION</th>
                  <th className="p-4">TARGET RESOURCE</th>
                  <th className="p-4">IP / HOST</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/40 bg-[#040E26]/80 text-slate-200">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-blue-950/60 transition-colors">
                    <td className="p-4 font-bold text-purple-400">{log.id}</td>
                    <td className="p-4 text-slate-400">{log.timestamp}</td>
                    <td className="p-4 font-bold text-white">{log.user}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold text-[10px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300 truncate max-w-xs">{log.target}</td>
                    <td className="p-4 text-slate-400 text-[11px]">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-3 border-t border-blue-900/40 text-right text-[11px] text-slate-400 font-mono">
          Showing {filteredLogs.length} verified audit events · SHA-256 HMAC Encrypted
        </div>
      </div>
    </div>
  );
};
