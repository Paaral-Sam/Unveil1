import React, { useState, useEffect } from 'react';
import { Shield, Edit2, Check, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ClassificationBanner: React.FC = () => {
  const { classificationLevel, setClassificationLevel } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(classificationLevel);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const year = now.getUTCFullYear();
      const month = String(now.getUTCMonth() + 1).padStart(2, '0');
      const day = String(now.getUTCDate()).padStart(2, '0');
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setCurrentTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = () => {
    setClassificationLevel(tempText);
    setIsEditing(false);
  };

  return (
    <div className="w-full bg-[#03060E] border-b border-blue-900/40 text-white px-6 py-2 flex items-center justify-between font-mono text-xs sm:text-sm select-none tracking-wider uppercase font-bold">
      {/* Left: Security Classification Level */}
      <div className="flex items-center space-x-3">
        <Shield className="w-4 h-4 text-[#EF4444] shrink-0" />
        <span className="text-slate-400">CLASSIFICATION:</span>
        {isEditing ? (
          <div className="flex items-center space-x-1">
            <input
              type="text"
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              className="bg-[#040E26] border border-blue-500 text-red-400 text-xs px-2 py-0.5 font-mono uppercase focus:outline-none rounded"
              autoFocus
            />
            <button onClick={handleSave} className="p-1 text-blue-400 hover:text-white">
              <Check className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => setIsEditing(true)}>
            <span className="bg-red-950/80 text-red-400 border border-red-500/50 px-2.5 py-0.5 text-xs rounded-md">
              {classificationLevel}
            </span>
            <Edit2 className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </div>

      {/* Right: Live UTC Time */}
      <div className="flex items-center space-x-2 text-xs sm:text-sm text-white font-mono font-bold">
        <Clock className="w-4 h-4 text-[#0088FF]" />
        <span className="text-[#0088FF]">{currentTime || '2026-08-27 08:57:00 UTC'}</span>
      </div>
    </div>
  );
};
