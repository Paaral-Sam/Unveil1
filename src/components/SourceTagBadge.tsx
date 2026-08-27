import React from 'react';
import { FileText, PhoneCall, DollarSign, Eye, Share2, Database, ShieldAlert } from 'lucide-react';
import type { SourceType } from '../types';

interface SourceTagBadgeProps {
  source: SourceType;
}

export const SourceTagBadge: React.FC<SourceTagBadgeProps> = ({ source }) => {
  const getConfig = () => {
    switch (source) {
      case 'FIR':
        return { icon: <FileText className="w-3 h-3" />, label: 'FIR / POLICE', cls: 'bg-blue-950 text-blue-300 border-blue-700' };
      case 'CDR':
        return { icon: <PhoneCall className="w-3 h-3" />, label: 'CDR LOG', cls: 'bg-cyan-950 text-cyan-300 border-cyan-700' };
      case 'FINANCIAL':
        return { icon: <DollarSign className="w-3 h-3" />, label: 'FINANCIAL', cls: 'bg-emerald-950 text-emerald-300 border-emerald-700' };
      case 'SURVEILLANCE':
        return { icon: <Eye className="w-3 h-3" />, label: 'SURVEILLANCE', cls: 'bg-amber-950 text-amber-300 border-amber-700' };
      case 'SOCMINT':
        return { icon: <Share2 className="w-3 h-3" />, label: 'SOCMINT', cls: 'bg-purple-950 text-purple-300 border-purple-700' };
      case 'CRIMINAL_DB':
        return { icon: <Database className="w-3 h-3" />, label: 'CRIMINAL DB', cls: 'bg-red-950 text-red-300 border-red-700' };
      case 'INTEL_REPORT':
        return { icon: <ShieldAlert className="w-3 h-3" />, label: 'INTEL REPORT', cls: 'bg-indigo-950 text-indigo-300 border-indigo-700' };
      default:
        return { icon: <FileText className="w-3 h-3" />, label: source, cls: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  const config = getConfig();

  return (
    <span className={`inline-flex items-center space-x-1 px-1.5 py-0.5 rounded border text-[10px] font-mono tracking-wider ${config.cls}`}>
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};
