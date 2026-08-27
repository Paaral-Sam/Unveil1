import React from 'react';
import type { ThreatLevel } from '../types';

interface RiskScorePillProps {
  score: number; // 0 - 100
  threatLevel?: ThreatLevel;
  showLabel?: boolean;
}

export const RiskScorePill: React.FC<RiskScorePillProps> = ({ score, threatLevel, showLabel = true }) => {
  const getColors = () => {
    if (score >= 90 || threatLevel === 'CRITICAL') {
      return { bg: 'bg-red-950/80', text: 'text-red-400', border: 'border-red-600', fill: 'bg-red-500', label: 'CRITICAL' };
    } else if (score >= 75 || threatLevel === 'HIGH') {
      return { bg: 'bg-orange-950/80', text: 'text-orange-400', border: 'border-orange-600', fill: 'bg-orange-500', label: 'HIGH' };
    } else if (score >= 50 || threatLevel === 'MEDIUM') {
      return { bg: 'bg-amber-950/80', text: 'text-amber-400', border: 'border-amber-600', fill: 'bg-amber-500', label: 'MEDIUM' };
    } else {
      return { bg: 'bg-emerald-950/80', text: 'text-emerald-400', border: 'border-emerald-600', fill: 'bg-emerald-500', label: 'LOW' };
    }
  };

  const style = getColors();

  return (
    <div className={`inline-flex items-center space-x-2 px-2 py-0.5 rounded border text-xs font-mono font-medium ${style.bg} ${style.border} ${style.text}`}>
      <div className="w-10 bg-slate-800 rounded-full h-1.5 overflow-hidden">
        <div className={`h-full ${style.fill} transition-all duration-300`} style={{ width: `${score}%` }} />
      </div>
      <span className="font-bold">{score}/100</span>
      {showLabel && <span className="text-[10px] uppercase font-semibold tracking-wider">({style.label})</span>}
    </div>
  );
};
