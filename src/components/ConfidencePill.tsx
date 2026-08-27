import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

interface ConfidencePillProps {
  score: number; // 0 - 100
}

export const ConfidencePill: React.FC<ConfidencePillProps> = ({ score }) => {
  const getStatus = () => {
    if (score >= 90) {
      return { text: 'VERIFIED', icon: <CheckCircle2 className="w-3 h-3 text-emerald-400" />, cls: 'bg-emerald-950/80 text-emerald-300 border-emerald-700' };
    } else if (score >= 75) {
      return { text: 'CORROBORATED', icon: <CheckCircle2 className="w-3 h-3 text-blue-400" />, cls: 'bg-blue-950/80 text-blue-300 border-blue-700' };
    } else if (score >= 50) {
      return { text: 'SINGLE-SOURCE', icon: <AlertTriangle className="w-3 h-3 text-amber-400" />, cls: 'bg-amber-950/80 text-amber-300 border-amber-700' };
    } else {
      return { text: 'UNCONFIRMED', icon: <HelpCircle className="w-3 h-3 text-rose-400" />, cls: 'bg-rose-950/80 text-rose-300 border-rose-700' };
    }
  };

  const status = getStatus();

  return (
    <span className={`inline-flex items-center space-x-1 px-1.5 py-0.5 rounded border text-[10px] font-mono ${status.cls}`}>
      {status.icon}
      <span>{score}% {status.text}</span>
    </span>
  );
};
