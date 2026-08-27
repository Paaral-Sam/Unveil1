import React, { useState, useRef, useEffect, useMemo } from 'react';
import { RefreshCw, Search, Filter, ZoomIn, ZoomOut, Maximize2, Shield, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface RenderNode {
  id: string;
  name: string;
  tag: string;
  subtitle: string;
  risk: number;
  riskColor: string;
  color: string;
  textColor: string;
  type: string;
  coords: { x: number; y: number };
}

interface EdgeTooltip {
  sourceName: string;
  targetName: string;
  label: string;
  type: string;
  sourceDoc: string;
  confidence: number;
  x: number;
  y: number;
}

export const NetworkGraphView: React.FC = () => {
  const { entities, relationships, selectedEntityId, setSelectedEntityId } = useApp();
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  
  // Interactive Canvas State (Zoom, Pan, Drag, Degree Depth, Hover Edge Tooltip)
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [degreeDepth, setDegreeDepth] = useState<1 | 2>(1);
  const [hoveredEdge, setHoveredEdge] = useState<EdgeTooltip | null>(null);
  
  // Node Drag State
  const [pinnedPositions, setPinnedPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [isPanningCanvas, setIsPanningCanvas] = useState<boolean>(false);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Combine Mock Entities + Dynamic AppContext Extracted Entities
  const allGraphNodes: RenderNode[] = useMemo(() => {
    const defaultNodes: RenderNode[] = [
      { id: 'ent-1', name: 'Viktor "The Architect" Rostov', tag: 'PE', subtitle: 'Primary syndicate ringleader', risk: 96, riskColor: '#EF4444', color: '#FEE2E2', textColor: '#DC2626', type: 'person', coords: { x: 220, y: 180 } },
      { id: 'ent-2', name: 'Elena Rostova', tag: 'PE', subtitle: 'Associate · financial proxy', risk: 89, riskColor: '#EF4444', color: '#DCFCE7', textColor: '#16A34A', type: 'person', coords: { x: 560, y: 150 } },
      { id: 'ent-3', name: 'Northstar Offshore Shell LLC', tag: 'OR', subtitle: 'Grand Cayman shell entity', risk: 91, riskColor: '#EF4444', color: '#F3E8FF', textColor: '#9333EA', type: 'organization', coords: { x: 180, y: 480 } },
      { id: 'ent-4', name: 'NY-771-X99', tag: 'VE', subtitle: 'Black Range Rover · getaway', risk: 93, riskColor: '#EF4444', color: '#FEF3C7', textColor: '#D97706', type: 'vehicle', coords: { x: 580, y: 490 } },
      { id: 'ent-5', name: '+1-555-019-4821', tag: 'PH', subtitle: 'Encrypted CDR telemetry phone', risk: 84, riskColor: '#EF4444', color: '#F3E8FF', textColor: '#9333EA', type: 'phone', coords: { x: 400, y: 80 } },
      { id: 'ent-6', name: 'Pier 42 Terminal (Geofence)', tag: 'LO', subtitle: 'High-volume meeting cluster', risk: 82, riskColor: '#EF4444', color: '#E0E7FF', textColor: '#4F46E5', type: 'location', coords: { x: 620, y: 310 } },
    ];

    // Merge AppContext Entities
    const extraNodes: RenderNode[] = entities
      .filter(e => !defaultNodes.some(dn => dn.id === e.id || dn.name.toLowerCase() === e.name.toLowerCase()))
      .map((e, idx) => {
        const tag = e.type === 'person' ? 'PE' : e.type === 'phone' ? 'PH' : e.type === 'vehicle' ? 'VE' : e.type === 'account' ? 'AC' : e.type === 'location' ? 'LO' : 'OR';
        const color = e.type === 'person' ? '#FEE2E2' : e.type === 'phone' ? '#F3E8FF' : e.type === 'vehicle' ? '#FEF3C7' : e.type === 'account' ? '#E0F2FE' : '#E0E7FF';
        const textColor = e.type === 'person' ? '#DC2626' : e.type === 'phone' ? '#9333EA' : e.type === 'vehicle' ? '#D97706' : e.type === 'account' ? '#0284C7' : '#4F46E5';
        
        // Circular auto-layout for dynamic nodes
        const angle = (idx / Math.max(1, entities.length)) * Math.PI * 2;
        const radius = 260;
        const defaultX = 380 + Math.cos(angle) * radius;
        const defaultY = 280 + Math.sin(angle) * radius;

        return {
          id: e.id,
          name: e.name,
          tag,
          subtitle: e.roleDescription || `${e.type.toUpperCase()} · Ingested Node`,
          risk: e.riskScore,
          riskColor: e.riskScore > 85 ? '#EF4444' : e.riskScore > 65 ? '#F59E0B' : '#10B981',
          color,
          textColor,
          type: e.type,
          coords: { x: defaultX, y: defaultY }
        };
      });

    // Apply custom pinned drag positions
    return [...defaultNodes, ...extraNodes].map(node => {
      if (pinnedPositions[node.id]) {
        return { ...node, coords: pinnedPositions[node.id] };
      }
      return node;
    });
  }, [entities, pinnedPositions]);

  // Combine Mock Links + AppContext Relationships
  const allGraphLinks = useMemo(() => {
    const defaultLinks = [
      { id: 'rel-1', source: 'ent-1', target: 'ent-2', type: 'COMMUNICATION', label: 'Encrypted Telemetry (48 Calls)', sourceDoc: 'FIR-sample.txt', confidence: 98 },
      { id: 'rel-2', source: 'ent-2', target: 'ent-3', type: 'FINANCIAL', label: '$450,000 SWIFT Offshore Wire', sourceDoc: 'SWIFT_wire_9921.txt', confidence: 99 },
      { id: 'rel-3', source: 'ent-1', target: 'ent-4', type: 'OWNERSHIP', label: 'Registered Getaway Vehicle', sourceDoc: 'ANPR_Pier42.log', confidence: 94 },
      { id: 'rel-4', source: 'ent-4', target: 'ent-6', type: 'CO_LOCATION', label: 'ANPR Pier 42 Hit 03:15 AM', sourceDoc: 'Surveillance_Log_0315.txt', confidence: 96 },
      { id: 'rel-5', source: 'ent-1', target: 'ent-5', type: 'COMMUNICATION', label: 'Burner Telemetry Activation', sourceDoc: 'CDR_Telemetry_019.csv', confidence: 95 }
    ];

    const appLinks = relationships.map(r => ({
      id: r.id,
      source: r.source,
      target: r.target,
      type: r.type,
      label: r.label,
      sourceDoc: r.sourceDoc || 'Ingested FIR Log',
      confidence: r.confidence
    }));

    return [...defaultLinks, ...appLinks];
  }, [relationships]);

  // Filtered List based on Search and Type Dropdown
  const filteredNodes = useMemo(() => {
    return allGraphNodes.filter(item => {
      const searchMatch = item.name.toLowerCase().includes(searchFilter.toLowerCase()) || item.subtitle.toLowerCase().includes(searchFilter.toLowerCase());
      const typeMatch = selectedType === 'all' || item.type === selectedType;
      return searchMatch && typeMatch;
    });
  }, [allGraphNodes, searchFilter, selectedType]);

  const activeSelectedId = selectedEntityId || 'ent-1';
  const selectedNode = allGraphNodes.find(e => e.id === activeSelectedId) || allGraphNodes[0];

  // Calculate 1st-Degree and 2nd-Degree Connected Node ID Sets
  const connectedNodeIdSets = useMemo(() => {
    const firstDegree = new Set<string>();
    firstDegree.add(activeSelectedId);

    allGraphLinks.forEach(link => {
      if (link.source === activeSelectedId) firstDegree.add(link.target);
      if (link.target === activeSelectedId) firstDegree.add(link.source);
    });

    const secondDegree = new Set<string>(firstDegree);
    if (degreeDepth === 2) {
      allGraphLinks.forEach(link => {
        if (firstDegree.has(link.source)) secondDegree.add(link.target);
        if (firstDegree.has(link.target)) secondDegree.add(link.source);
      });
    }

    return { firstDegree, secondDegree };
  }, [activeSelectedId, allGraphLinks, degreeDepth]);

  // Render High-DPI Interactive Vector Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    // Canvas Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Apply Zoom & Pan Transform
    ctx.save();
    ctx.translate(panOffset.x, panOffset.y);
    ctx.scale(zoomLevel, zoomLevel);

    // Draw Grid Lines
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    const gridSize = 32;
    for (let x = -500; x < width + 500; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, -500);
      ctx.lineTo(x, height + 500);
      ctx.stroke();
    }
    for (let y = -500; y < height + 500; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(-500, y);
      ctx.lineTo(width + 500, y);
      ctx.stroke();
    }

    const activeSet = degreeDepth === 2 ? connectedNodeIdSets.secondDegree : connectedNodeIdSets.firstDegree;

    // Draw Edges (Links)
    allGraphLinks.forEach(link => {
      const sourceNode = allGraphNodes.find(n => n.id === link.source);
      const targetNode = allGraphNodes.find(n => n.id === link.target);

      if (!sourceNode || !targetNode) return;

      const isConnectedToSelected = link.source === activeSelectedId || link.target === activeSelectedId;
      const isHighlighted = activeSet.has(link.source) && activeSet.has(link.target);

      ctx.beginPath();
      ctx.moveTo(sourceNode.coords.x, sourceNode.coords.y);
      ctx.lineTo(targetNode.coords.x, targetNode.coords.y);

      if (isConnectedToSelected) {
        ctx.setLineDash([]);
        ctx.strokeStyle = '#0066FF';
        ctx.lineWidth = 3;
      } else if (isHighlighted) {
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = '#0EA5E9';
        ctx.lineWidth = 2;
      } else {
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
        ctx.lineWidth = 1.5;
      }
      ctx.stroke();

      // Render Edge Evidence Label Pill in Center of Edge
      const midX = (sourceNode.coords.x + targetNode.coords.x) / 2;
      const midY = (sourceNode.coords.y + targetNode.coords.y) / 2;

      ctx.setLineDash([]);
      ctx.font = 'bold 9px monospace';
      const labelWidth = ctx.measureText(link.label).width + 12;
      
      ctx.fillStyle = isConnectedToSelected ? '#0066FF' : '#F8FAFC';
      ctx.beginPath();
      ctx.roundRect(midX - labelWidth / 2, midY - 9, labelWidth, 18, 4);
      ctx.fill();

      ctx.strokeStyle = isConnectedToSelected ? '#0044B3' : '#CBD5E1';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = isConnectedToSelected ? '#FFFFFF' : '#334155';
      ctx.textAlign = 'center';
      ctx.fillText(link.label, midX, midY + 3);
    });

    // Draw Nodes & Badges
    allGraphNodes.forEach(node => {
      const isSelected = activeSelectedId === node.id;
      const isInDegreeSet = activeSet.has(node.id);
      const alpha = isInDegreeSet || isSelected ? 1.0 : 0.25;

      ctx.globalAlpha = alpha;

      // Selection Glow Ring (Single Click Action 1)
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(node.coords.x, node.coords.y, 28, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(0, 102, 255, 0.15)';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#0066FF';
        ctx.stroke();
      }

      // 2nd Degree Expansion Glow Ring (Double Click Action 2)
      if (degreeDepth === 2 && isInDegreeSet && !isSelected) {
        ctx.beginPath();
        ctx.arc(node.coords.x, node.coords.y, 24, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = '#10B981';
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Circle Node Pill
      ctx.beginPath();
      ctx.arc(node.coords.x, node.coords.y, 18, 0, 2 * Math.PI);
      ctx.fillStyle = node.color;
      ctx.fill();
      ctx.lineWidth = isSelected ? 2.5 : 1.5;
      ctx.strokeStyle = node.riskColor;
      ctx.stroke();

      // Node Tag Text (PE, PH, VE, AC, LO, OR)
      ctx.fillStyle = node.textColor;
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.tag, node.coords.x, node.coords.y + 4);

      // Label Card Box Below Node
      ctx.font = 'bold 11px sans-serif';
      const textWidth = ctx.measureText(node.name).width + 16;
      const cardHeight = 22;
      const cardX = node.coords.x - textWidth / 2;
      const cardY = node.coords.y + 24;

      ctx.fillStyle = isSelected ? '#040E26' : '#FFFFFF';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, textWidth, cardHeight, 6);
      ctx.fill();
      ctx.shadowColor = 'transparent';

      ctx.strokeStyle = isSelected ? '#0066FF' : '#CBD5E1';
      ctx.lineWidth = isSelected ? 1.5 : 1;
      ctx.stroke();

      ctx.fillStyle = isSelected ? '#FFFFFF' : '#0F172A';
      ctx.fillText(node.name, node.coords.x, cardY + 15);
    });

    ctx.restore();
  }, [allGraphNodes, allGraphLinks, activeSelectedId, connectedNodeIdSets, degreeDepth, panOffset, zoomLevel]);

  // Action 1 & Action 2: Canvas Mouse Click (Single Click vs Double Click Detection)
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    
    // Transform screen click coords to zoomed/panned canvas coords
    const mouseX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
    const mouseY = (e.clientY - rect.top - panOffset.y) / zoomLevel;

    // Hit test nodes
    const hitNode = allGraphNodes.find(n => Math.hypot(n.coords.x - mouseX, n.coords.y - mouseY) <= 28);

    if (hitNode) {
      if (e.detail === 2) {
        // DOUBLE CLICK ACTION: Expand Subnetwork to 2nd-Degree Connections (Associates of Associates)
        setSelectedEntityId(hitNode.id);
        setDegreeDepth(2);
      } else {
        // SINGLE CLICK ACTION: Select Entity, Open Subject Dossier, Highlight 1st-Degree Connections
        setSelectedEntityId(hitNode.id);
        setDegreeDepth(1);
      }
    }
  };

  // Action 3: Click & Drag Node (Custom Positioning) & Canvas Panning
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
    const mouseY = (e.clientY - rect.top - panOffset.y) / zoomLevel;

    const hitNode = allGraphNodes.find(n => Math.hypot(n.coords.x - mouseX, n.coords.y - mouseY) <= 28);

    if (hitNode) {
      setDraggingNodeId(hitNode.id);
    } else {
      setIsPanningCanvas(true);
      setDragStartPos({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  // Action 5: Hover Over Edge Tooltip & Node Drag Tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    // 1. Dragging Node Custom Position
    if (draggingNodeId) {
      const mouseX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
      const mouseY = (e.clientY - rect.top - panOffset.y) / zoomLevel;
      setPinnedPositions(prev => ({
        ...prev,
        [draggingNodeId]: { x: mouseX, y: mouseY }
      }));
      return;
    }

    // 2. Panning Canvas
    if (isPanningCanvas) {
      setPanOffset({
        x: e.clientX - dragStartPos.x,
        y: e.clientY - dragStartPos.y
      });
      return;
    }

    // 3. Hover Edge Distance Test
    const mouseX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
    const mouseY = (e.clientY - rect.top - panOffset.y) / zoomLevel;

    let foundEdgeHover: EdgeTooltip | null = null;

    for (const link of allGraphLinks) {
      const src = allGraphNodes.find(n => n.id === link.source);
      const tgt = allGraphNodes.find(n => n.id === link.target);
      if (!src || !tgt) continue;

      // Distance from mouse point to line segment
      const x1 = src.coords.x;
      const y1 = src.coords.y;
      const x2 = tgt.coords.x;
      const y2 = tgt.coords.y;

      const A = mouseX - x1;
      const B = mouseY - y1;
      const C = x2 - x1;
      const D = y2 - y1;

      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      let param = -1;
      if (lenSq !== 0) param = dot / lenSq;

      let xx, yy;

      if (param < 0) {
        xx = x1;
        yy = y1;
      } else if (param > 1) {
        xx = x2;
        yy = y2;
      } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
      }

      const dist = Math.hypot(mouseX - xx, mouseY - yy);

      if (dist < 12) {
        foundEdgeHover = {
          sourceName: src.name,
          targetName: tgt.name,
          label: link.label,
          type: link.type,
          sourceDoc: link.sourceDoc,
          confidence: link.confidence,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        break;
      }
    }

    setHoveredEdge(foundEdgeHover);
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
    setIsPanningCanvas(false);
  };

  // Action 4: Mouse Wheel Zoom
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoomLevel(prev => Math.min(Math.max(prev * zoomFactor, 0.5), 2.5));
  };

  const handleResetGraph = () => {
    setPinnedPositions({});
    setZoomLevel(1.0);
    setPanOffset({ x: 0, y: 0 });
    setDegreeDepth(1);
    setSelectedEntityId('ent-1');
  };

  const handleOpenSubjectDossier = (entityId: string) => {
    setSelectedEntityId(entityId);
    const dossierElement = document.getElementById('section-dossier');
    if (dossierElement) {
      dossierElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white p-6 lg:p-8 space-y-6 font-sans text-slate-900 rounded-3xl border border-slate-200 shadow-md animate-fade-in-up">
      {/* Header Bar matching Reference Screenshot */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#0066FF] uppercase tracking-wider">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>INTERACTIVE SYNDICATE NETWORK TOPOLOGY CANVAS</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Network Explorer</h2>
          <p className="text-sm text-slate-500 font-sans mt-0.5">
            Trace connected entities, drag custom node layouts, inspect evidence docs, and expand 1st/2nd-degree subnetwork depths.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Degree Depth Toggle (Actions 1 & 2) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-mono font-bold">
            <button
              onClick={() => setDegreeDepth(1)}
              className={`px-3 py-1 rounded-lg transition-all ${
                degreeDepth === 1 ? 'bg-[#0066FF] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Single Click Action: 1st-Degree Direct Connections"
            >
              1st Degree
            </button>
            <button
              onClick={() => setDegreeDepth(2)}
              className={`px-3 py-1 rounded-lg transition-all ${
                degreeDepth === 2 ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Double Click Action: 2nd-Degree Subnetwork Associates"
            >
              2nd Degree
            </button>
          </div>

          <button
            onClick={handleResetGraph}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl text-slate-800 font-sans text-xs font-semibold shadow-sm transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
            <span>Reset Canvas</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Pure White Background Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Pure White Canvas Container */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 relative">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">INTERACTIVE CANVAS ENGINE</div>
              <div className="text-sm font-bold text-slate-800 font-sans mt-0.5">
                {allGraphNodes.length} Nodes · {allGraphLinks.length} Verified Links · Depth: {degreeDepth}st/nd Degree
              </div>
            </div>

            {/* Action 4: Zoom Controls */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-700">
                <button onClick={() => setZoomLevel(prev => Math.max(prev * 0.9, 0.5))} className="p-1.5 hover:bg-white rounded-lg transition-colors">
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-2">{Math.round(zoomLevel * 100)}%</span>
                <button onClick={() => setZoomLevel(prev => Math.min(prev * 1.1, 2.5))} className="p-1.5 hover:bg-white rounded-lg transition-colors">
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => { setZoomLevel(1.0); setPanOffset({ x: 0, y: 0 }); }} className="p-1.5 hover:bg-white rounded-lg transition-colors" title="Reset Zoom & Pan">
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="px-3 py-1 bg-[#ECFDF5] border border-[#10B981]/30 text-[#047857] text-xs font-semibold rounded-full flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Evidence-Backed</span>
              </div>
            </div>
          </div>

          {/* Canvas Box with Mouse Event Handlers */}
          <div className="w-full h-[560px] rounded-xl overflow-hidden relative border border-slate-200 bg-white">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onWheel={handleWheel}
              className="w-full h-full cursor-grab active:cursor-grabbing block"
            />

            {/* Action 5: Hover Over Edge Tooltip Popover */}
            {hoveredEdge && (
              <div
                style={{ left: `${hoveredEdge.x + 12}px`, top: `${hoveredEdge.y + 12}px` }}
                className="absolute z-30 p-3.5 rounded-2xl bg-[#040E26] border border-blue-500/60 shadow-2xl text-slate-100 text-xs font-mono space-y-1.5 pointer-events-none animate-fade-in"
              >
                <div className="flex items-center justify-between gap-4 border-b border-blue-900/60 pb-1 text-[#0088FF] font-bold">
                  <span>{hoveredEdge.type} LINK</span>
                  <span className="text-emerald-400 font-extrabold">{hoveredEdge.confidence}% CONFIDENCE</span>
                </div>
                <div className="font-sans font-bold text-white text-xs pt-0.5">{hoveredEdge.label}</div>
                <div className="text-[11px] text-slate-300">
                  Source Doc: <strong className="text-blue-300 font-mono">{hoveredEdge.sourceDoc}</strong>
                </div>
                <div className="text-[10px] text-slate-400">
                  Connects: {hoveredEdge.sourceName} ↔ {hoveredEdge.targetName}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Gestures Capability Legend (matching Uploaded Image media_1787818519397.png) */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-sans grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 block font-mono text-[11px]">Single Click Node</span>
              <span className="text-[11px] text-slate-500">Highlights 1st-degree links & opens Dossier</span>
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-700 block font-mono text-[11px]">Double Click Node</span>
              <span className="text-[11px] text-slate-500">Expands 2nd-degree subnetwork</span>
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-blue-700 block font-mono text-[11px]">Click & Drag Node</span>
              <span className="text-[11px] text-slate-500">Pins custom coordinates layout</span>
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-purple-700 block font-mono text-[11px]">Mouse Wheel Zoom</span>
              <span className="text-[11px] text-slate-500">Zooms in/out 50% to 250%</span>
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-amber-700 block font-mono text-[11px]">Hover Over Edge</span>
              <span className="text-[11px] text-slate-500">Shows evidence doc & confidence popover</span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Search & Entity Inspector List */}
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
                  <option value="account">Accounts</option>
                  <option value="location">Locations</option>
                </select>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">{filteredNodes.length} results</span>
            </div>

            {/* List of Entities */}
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredNodes.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedEntityId(item.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedNode.id === item.id
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

          {/* Selected Entity Dossier Trigger Button */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => handleOpenSubjectDossier(selectedNode.id)}
              className="w-full py-2.5 rounded-xl bg-[#040E26] hover:bg-blue-950 text-white font-bold text-xs font-mono flex items-center justify-center space-x-2 transition-colors shadow-md"
            >
              <Eye className="w-4 h-4 text-blue-400" />
              <span>Inspect Subject Dossier ({selectedNode.name})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
