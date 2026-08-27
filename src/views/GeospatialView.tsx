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

    // 100% Free Public OpenStreetMap Tile Server (Requires Zero API Keys)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
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

    // Draw Dashed Polyline Route
    const routeCoords = movementEvents.map(e => e.coords as [number, number]);
    L.polyline(routeCoords, {
      color: '#0066FF',
      weight: 3,
      dashArray: '6, 8',
      opacity: 0.8
    }).addTo(map);

    mapInstanceRef.current = map;
  }, []);

  // Movement Playback Animation Logic
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setTimelineIndex((prev) => {
          const next = (prev + 1) % movementEvents.length;
          if (mapInstanceRef.current) {
            const ev = movementEvents[next];
            mapInstanceRef.current.flyTo([ev.coords[0], ev.coords[1]], 13, { duration: 1.2 });
          }
          return next;
        });
      }, 2200);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentEv = movementEvents[timelineIndex];

  return (
    <div className="w-full bg-white p-6 lg:p-8 space-y-6 font-sans text-slate-900 rounded-3xl border border-slate-200 shadow-md animate-fade-in-up">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#0066FF] font-bold uppercase tracking-wider font-mono">
            <Navigation className="w-4 h-4 text-blue-600" />
            <span>GEOSPATIAL INTELLIGENCE & TELEMETRY PLAYBACK ENGINE</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Surveillance & Movement Playback
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Plot GPS coordinates, ANPR camera plate hits, cell tower CDR pings, and geofence time sequence routes.
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-xl text-white font-bold text-xs font-mono flex items-center space-x-2 shadow-md transition-all ${
              isPlaying ? 'bg-amber-600 hover:bg-amber-500' : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Playback' : 'Start Playback'}</span>
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setTimelineIndex(0);
              if (mapInstanceRef.current) {
                mapInstanceRef.current.flyTo([movementEvents[0].coords[0], movementEvents[0].coords[1]], 11);
              }
            }}
            className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 text-slate-700 transition-colors"
            title="Reset Map Route"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Map Box Container */}
      <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Active Time Card */}
        <div className="absolute top-4 left-4 z-20 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl max-w-sm font-sans space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-blue-600">
            <Compass className="w-4 h-4 text-blue-600" />
            <span>CURRENT TIMEFRAME: {currentEv.time}</span>
          </div>
          <h4 className="font-extrabold text-sm text-slate-900 leading-tight">{currentEv.title}</h4>
          <p className="text-xs text-slate-500 font-mono">Target: {currentEv.entityName}</p>
        </div>
      </div>
    </div>
  );
};
