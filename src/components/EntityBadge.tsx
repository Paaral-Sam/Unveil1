import React from 'react';
import { User, Building2, MapPin, Car, Phone, Landmark, Calendar, Globe, Cpu, ShieldAlert, Terminal, Lock } from 'lucide-react';
import type { EntityType } from '../types';

interface EntityBadgeProps {
  type: EntityType;
  name: string;
  className?: string;
  showIcon?: boolean;
}

export const EntityBadge: React.FC<EntityBadgeProps> = ({ type, name, className = '', showIcon = true }) => {
  const getIcon = () => {
    switch (type) {
      case 'person': return <User className="w-3.5 h-3.5" />;
      case 'organization': return <Building2 className="w-3.5 h-3.5" />;
      case 'location': return <MapPin className="w-3.5 h-3.5" />;
      case 'vehicle': return <Car className="w-3.5 h-3.5" />;
      case 'phone': return <Phone className="w-3.5 h-3.5" />;
      case 'account': return <Landmark className="w-3.5 h-3.5" />;
      case 'event': return <Calendar className="w-3.5 h-3.5" />;
      case 'ip': return <Terminal className="w-3.5 h-3.5" />;
      case 'domain': return <Globe className="w-3.5 h-3.5" />;
      case 'crypto': return <Lock className="w-3.5 h-3.5" />;
      case 'cyberattack': return <ShieldAlert className="w-3.5 h-3.5" />;
      case 'malware': return <Cpu className="w-3.5 h-3.5" />;
      default: return <User className="w-3.5 h-3.5" />;
    }
  };

  const getColorStyle = () => {
    switch (type) {
      case 'person': return 'bg-blue-950/80 text-blue-300 border-blue-700/60';
      case 'organization': return 'bg-purple-950/80 text-purple-300 border-purple-700/60';
      case 'location': return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
      case 'vehicle': return 'bg-amber-950/80 text-amber-300 border-amber-700/60';
      case 'phone': return 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60';
      case 'account': return 'bg-rose-950/80 text-rose-300 border-rose-700/60';
      case 'event': return 'bg-orange-950/80 text-orange-300 border-orange-700/60';
      case 'ip': return 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60';
      case 'domain': return 'bg-teal-950/80 text-teal-300 border-teal-700/60';
      case 'crypto': return 'bg-yellow-950/80 text-yellow-300 border-yellow-700/60';
      case 'cyberattack': return 'bg-red-950/80 text-red-300 border-red-700/60';
      case 'malware': return 'bg-pink-950/80 text-pink-300 border-pink-700/60';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <span className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded border text-xs font-mono font-medium ${getColorStyle()} ${className}`}>
      {showIcon && <span>{getIcon()}</span>}
      <span className="truncate">{name}</span>
    </span>
  );
};
