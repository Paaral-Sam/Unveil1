import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, Search, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NetworkGraphView: React.FC = () => {
  const { selectedEntityId, setSelectedEntityId } = useApp();
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mockEntityList = [
    { id: 'ent-1', name: 'Arjun Mehta', tag: 'PE', subtitle: 'Primary subject · alias: A.M.', risk: 92, riskColor: '#EF4444', color: '#E0F2FE', textColor: '#0284C7', type: 'person', coords: { x: 180, y: 180 } },
    { id: 'ent-2', name: 'Nisha Kapoor', tag: 'PE', subtitle: 'Associate · financial proxy', risk: 76, riskColor: '#EF4444', color: '#DCFCE7', textColor: '#16A34A', type: 'person', coords: { x: 520, y: 150 } },
    { id: 'ent-3', name: 'Northstar Logistics', tag: 'OR', subtitle: 'Registered business · Delhi', risk: 68, riskColor: '#F59E0B', color: '#F3E8FF', textColor: '#9333EA', type: 'organization', coords: { x: 160, y: 480 } },
    { id: 'ent-4', name: 'DL 01 AB 4821', tag: 'VE', subtitle: 'Toyota Innova · white', risk: 61, riskColor: '#F59E0B', color: '#FEF3C7', textColor: '#D97706', type: 'vehicle', coords: { x: 540, y: 500 } },
    { id: 'ent-5', name: '+91 98*** 7412', tag: 'PH', subtitle: 'CDR cluster · Airtel', risk: 83, riskColor: '#EF4444', color: '#F3E8FF', textColor: '#9333EA', type: 'phone', coords: { x: 360, y: 80 } },
    { id: 'ent-6', name: 'Sector 18 Warehouse', tag: 'LO', subtitle: 'Noida · geofence cluster', risk: 71, riskColor: '#F59E0B', color: '#E0E7FF', textColor: '#4F46E5', type: 'location', coords: { x: 560, y: 320 } },
  ];

  const filteredList = mockEntityList.filter(item => {
    const searchMatch = item.name.toLowerCase().includes(searchFilter.toLowerCase()) || item.subtitle.toLowerCase().includes(searchFilter.toLowerCase());
    const typeMatch = selectedType === 'all' || item.type === selectedType;
    return searchMatch && typeMatch;
  });

  const selectedEntity = mockEntityList.find(e => e.id === selectedEntityId) || mockEntityList[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle High-DPI Display Scaling for ultra-crisp non-blurred graphics
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    // PURE CLEAN WHITE BACKGROUND (#FFFFFF)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Light Grid Lines
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    const gridSize = 28;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const coreX = width / 2;
    const coreY = height / 2;

    // Draw Crisp Dashed Vector Lines
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 1.5;

    mockEntityList.forEach(node => {
      ctx.beginPath();
      ctx.moveTo(coreX, coreY);
      ctx.lineTo(node.coords.x, node.coords.y);
      ctx.stroke();
    });

    ctx.setLineDash([]);

    // Central NETWORK CORE Node
    ctx.beginPath();
    ctx.arc(coreX, coreY, 44, 0, 2 * Math.PI);
    ctx.fillStyle = '#DCFCE7';
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#16A34A';
    ctx.stroke();

    ctx.fillStyle = '#15803D';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NETWORK', coreX, coreY - 4);
    ctx.fillText('CORE', coreX, coreY + 11);

    // Draw Nodes & Labels
    mockEntityList.forEach(node => {
      const isSelected = selectedEntityId === node.id;

      if (isSelected) {
        ctx.beginPath();
        ctx.arc(node.coords.x, node.coords.y, 24, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(22, 163, 74, 0.18)';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#16A34A';
        ctx.stroke();
      }

      // Circle Pill
      ctx.beginPath();
      ctx.arc(node.coords.x, node.coords.y, 17, 0, 2 * Math.PI);
      ctx.fillStyle = node.color;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#94A3B8';
      ctx.stroke();

      ctx.fillStyle = node.textColor;
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.tag, node.coords.x, node.coords.y + 4);

      // Label Card Below Node
      ctx.font = 'bold 12px sans-serif';
      const textWidth = ctx.measureText(node.name).width + 18;
      const cardHeight = 24;
      const cardX = node.coords.x - textWidth / 2;
      const cardY = node.coords.y + 26;

      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, textWidth, cardHeight, 6);
      ctx.fill();
      ctx.shadowColor = 'transparent';

      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#0F172A';
      ctx.fillText(node.name, node.coords.x, cardY + 16);
    });
  }, [selectedEntityId]);

  return (
    <div className="w-full bg-white p-6 lg:p-8 space-y-6 font-sans text-slate-900 rounded-3xl border border-slate-200 shadow-md">
      {/* Header Bar matching Reference Screenshot */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Network explorer</h2>
          <p className="text-sm text-slate-500 font-sans mt-1">
            Trace connected entities, relationship strength, and the evidence behind every assertion.
          </p>
        </div>

        <button
          onClick={() => setSelectedEntityId('ent-1')}
          className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl text-slate-800 font-sans text-xs font-semibold shadow-sm transition-colors flex items-center space-x-2"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
          <span>Refresh graph</span>
        </button>
      </div>

      {/* Main 2-Column Pure White Background Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Pure White Canvas Container */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 relative">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">RELATIONSHIP CANVAS</div>
              <div className="text-sm font-bold text-slate-800 font-sans mt-0.5">10 visible entities · synthetic graph</div>
            </div>

            <div className="px-3 py-1 bg-[#ECFDF5] border border-[#10B981]/30 text-[#047857] text-xs font-semibold rounded-full flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>Evidence-backed</span>
            </div>
          </div>

          {/* Ultra Crisp Canvas on Pure White Background */}
          <div className="w-full h-[550px] rounded-xl overflow-hidden relative border border-slate-200 bg-white">
            <canvas
              ref={canvasRef}
              onClick={(e) => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const hit = mockEntityList.find(n => Math.hypot(n.coords.x - x, n.coords.y - y) <= 30);
                if (hit) setSelectedEntityId(hit.id);
              }}
              className="w-full h-full cursor-pointer block"
            />
          </div>
        </div>

        {/* Right 1 Col: Search & Entity Inspector List matching Screenshot */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search entities by name or ID"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-10 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-sans"
              />
            </div>

            {/* Filter Dropdown & Results Counter */}
            <div className="flex items-center justify-between text-xs font-sans border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value)}
                  className="bg-[#F8FAFC] border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 font-medium focus:outline-none"
                >
                  <option value="all">All entity types</option>
                  <option value="person">Persons</option>
                  <option value="organization">Organizations</option>
                  <option value="vehicle">Vehicles</option>
                  <option value="phone">Phones</option>
                  <option value="location">Locations</option>
                </select>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">{filteredList.length} results</span>
            </div>

            {/* List of Entities */}
            <div className="space-y-2 max-h-[410px] overflow-y-auto pr-1">
              {filteredList.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedEntityId(item.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedEntity.id === item.id
                      ? 'bg-[#F0FDF4] border-[#16A34A] shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
                      style={{ backgroundColor: item.color, color: item.textColor }}
                    >
                      {item.tag}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 leading-tight">{item.name}</div>
                      <div className="text-[11px] text-slate-500 font-sans mt-0.5">{item.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    <span className="text-xs font-bold text-slate-800 font-mono">{item.risk}</span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.riskColor }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-center font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            SELECT AN ENTITY TO INSPECT
          </div>
        </div>
      </div>
    </div>
  );
};
