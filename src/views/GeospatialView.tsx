import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Play,
  Pause,
  RotateCcw,
  Compass,
  Navigation
} from 'lucide-react';

export const GeospatialView: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timelineIndex, setTimelineIndex] = useState<number>(0);

  // Time sequence events
  const movementEvents = [
    { time: '02:14:00 UTC', title: 'Port Authority Harbor Dock 14', coords: [40.7128, -74.0060], entityName: 'Warehouse 14, Dock Rd' },
    { time: '04:32:00 UTC', title: 'Queens Industrial Vault', coords: [40.7282, -73.9442], entityName: 'Consignment Drop - 12' },
    { time: '07:15:00 UTC', title: 'Brooklyn Safehouse Compound', coords: [40.6782, -73.9442], entityName: 'Viktor Operativa (Leader)' },
    { time: '11:45:00 UTC', title: 'JFK Cargo Logistics Terminal', coords: [40.6413, -73.7781], entityName: 'Operativa Logistics Ltd' },
    { time: '14:20:00 UTC', title: 'Wall St Exchange Hub', coords: [40.7061, -74.0092], entityName: 'Apex Offshore Holdings' }
  ];

  // Initialize Interactive Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [40.7128, -73.98],
      zoom: 11,
      zoomControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; CartoDB'
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    // Plot Movement Markers
    movementEvents.forEach((ev) => {
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="background-color: #0066FF; width: 14px; height: 14px; border-radius: 50%; border: 3px solid #FFFFFF; box-shadow: 0 0 10px rgba(0,102,255,0.6);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });

      L.marker([ev.coords[0], ev.coords[1]], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; color: #0F172A; padding: 4px;">
            <strong style="color: #0066FF;">${ev.time}</strong><br/>
            <strong>${ev.title}</strong><br/>
            <span style="color: #64748B;">Target: ${ev.entityName}</span>
          </div>
        `);
    });

    // Draw Vector Path Polyline
    const points = movementEvents.map(e => [e.coords[0], e.coords[1]] as [number, number]);
    L.polyline(points, {
      color: '#0066FF',
      weight: 3,
      dashArray: '6, 6',
      opacity: 0.8
    }).addTo(map);

    mapInstanceRef.current = map;
  }, []);

  // Playback timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setTimelineIndex(prev => {
          const next = (prev + 1) % movementEvents.length;
          if (mapInstanceRef.current) {
            const ev = movementEvents[next];
            mapInstanceRef.current.panTo([ev.coords[0], ev.coords[1]]);
          }
          return next;
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="w-full bg-white p-6 lg:p-8 space-y-6 font-sans text-slate-900 rounded-3xl border border-slate-200 shadow-md animate-fade-in-up">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#0066FF] uppercase tracking-wider">
            <Navigation className="w-4 h-4 text-blue-600" />
            <span>GEOSPATIAL INTELLIGENCE & TELEMETRY PLAYBACK ENGINE</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Surveillance & Movement Playback
          </h2>
          <p className="text-sm text-slate-500 font-sans mt-0.5">
            Plot GPS coordinates, ANPR camera plate hits, cell tower CDR pings, and geofence time sequence routes.
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-xl text-white font-bold flex items-center space-x-2 shadow-md transition-all ${
              isPlaying ? 'bg-amber-600 hover:bg-amber-500' : 'bg-[#0066FF] hover:bg-blue-500'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Playback' : 'Play Movement Route'}</span>
          </button>
          <button
            onClick={() => { setTimelineIndex(0); setIsPlaying(false); }}
            className="p-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 rounded-xl transition-colors"
            title="Reset Route"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Canvas & Event Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-[480px] relative bg-slate-100">
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Active Playback Floating Pill */}
          <div className="absolute top-4 left-4 z-20 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg text-xs font-mono space-y-1">
            <div className="flex items-center space-x-2 text-blue-600 font-bold">
              <Compass className="w-4 h-4" />
              <span>CURRENT TIMEFRAME: {movementEvents[timelineIndex].time}</span>
            </div>
            <div className="font-sans text-slate-900 font-extrabold text-sm">{movementEvents[timelineIndex].title}</div>
            <div className="text-slate-500 text-[11px]">Target: {movementEvents[timelineIndex].entityName}</div>
          </div>
        </div>

        {/* Chronological Movement Route Inspector List */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
              MOVEMENT SEQUENCE STEPS
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {movementEvents.map((ev, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setTimelineIndex(idx);
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.panTo([ev.coords[0], ev.coords[1]]);
                    }
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    timelineIndex === idx
                      ? 'bg-blue-50 border-[#0066FF] shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-600">
                    <span>STEP #{idx + 1}</span>
                    <span>{ev.time}</span>
                  </div>
                  <div className="font-bold text-xs text-slate-900 mt-1">{ev.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{ev.entityName}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-center text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            CLICK STEP TO RE-CENTER MAP
          </div>
        </div>
      </div>
    </div>
  );
};
