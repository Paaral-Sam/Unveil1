import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Play,
  Pause,
  RotateCcw,
  Compass,
  Navigation
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GeospatialView: React.FC = () => {
  const { entities, setSelectedEntityId } = useApp();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timelineIndex, setTimelineIndex] = useState<number>(0);
  const [showVectors, setShowVectors] = useState<boolean>(true);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);

  // Geo-located entities
  const geoEntities = entities.filter(e => e.coordinates && e.coordinates.length === 2);

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
      zoom: 12,
      zoomControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers & Polylines on Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline || layer instanceof L.Circle) {
        map.removeLayer(layer);
      }
    });

    if (showHeatmap) {
      geoEntities.forEach(ent => {
        if (!ent.coordinates) return;
        const color = ent.threatLevel === 'CRITICAL' ? '#EF4444' : ent.threatLevel === 'HIGH' ? '#F97316' : '#A855F7';
        L.circle(ent.coordinates as [number, number], {
          radius: 1200,
          color: color,
          fillColor: color,
          fillOpacity: 0.15,
          weight: 1
        }).addTo(map);
      });
    }

    geoEntities.forEach(ent => {
      if (!ent.coordinates) return;
      const color = ent.threatLevel === 'CRITICAL' ? '#EF4444' : ent.threatLevel === 'HIGH' ? '#F97316' : '#A855F7';

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            width: 22px;
            height: 22px;
            background-color: ${color};
            border: 3px solid #181520;
            border-radius: 50%;
            box-shadow: 0 0 15px ${color};
            cursor: pointer;
          "></div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      const marker = L.marker(ent.coordinates as [number, number], { icon: customIcon }).addTo(map);

      const popupContent = `
        <div style="font-family: 'IBM Plex Sans', sans-serif; padding: 4px;">
          <div style="font-weight: bold; font-size: 14px; color: #FFFFFF;">${ent.name}</div>
          <div style="font-size: 11px; color: #A855F7; font-weight: bold; margin-top: 2px;">${ent.type.toUpperCase()}</div>
          <div style="font-size: 11px; color: #CBD5E1; margin-top: 4px;">${ent.locationName || 'Location Logged'}</div>
          <div style="font-size: 11px; color: #EF4444; font-weight: bold; margin-top: 4px;">Risk Score: ${ent.riskScore}/100</div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setSelectedEntityId(ent.id);
      });
    });

    if (showVectors && geoEntities.length >= 2) {
      const lineCoords = geoEntities.map(e => e.coordinates as [number, number]);
      L.polyline(lineCoords, {
        color: '#A855F7',
        weight: 3,
        dashArray: '8, 8',
        opacity: 0.7
      }).addTo(map);
    }
  }, [geoEntities, showVectors, showHeatmap]);

  // Timeline Animation Effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      timer = setInterval(() => {
        setTimelineIndex(prev => {
          const next = (prev + 1) % movementEvents.length;
          const evt = movementEvents[next];
          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo(evt.coords as [number, number], 13, { duration: 1.5 });
          }
          return next;
        });
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="p-6 space-y-6 bg-unveil-mesh min-h-[calc(100vh-80px)] font-sans text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#282336] pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-purple-400 font-bold uppercase tracking-wider font-mono">
            <Compass className="w-4 h-4 text-purple-400" />
            <span>GEOSPATIAL INTELLIGENCE MAP</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Surveillance & Movement Trajectory Playback
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Geospatial co-location tracking, ALPR hits, and time-lapse movement playback
          </p>
        </div>

        {/* Map View Controls */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-4 py-2 rounded-full font-bold transition-all border ${
              showHeatmap
                ? 'bg-purple-900/60 border-purple-500/60 text-white shadow-md'
                : 'bg-[#15121C] border-[#282336] text-slate-400 hover:text-white'
            }`}
          >
            Heatmap Layer
          </button>

          <button
            onClick={() => setShowVectors(!showVectors)}
            className={`px-4 py-2 rounded-full font-bold transition-all border ${
              showVectors
                ? 'bg-purple-900/60 border-purple-500/60 text-white shadow-md'
                : 'bg-[#15121C] border-[#282336] text-slate-400 hover:text-white'
            }`}
          >
            Movement Vectors
          </button>
        </div>
      </div>

      {/* Main Interactive Map Canvas Container */}
      <div className="rounded-3xl bg-[#15121C] border border-[#282336] shadow-2xl p-4 space-y-4">
        {/* Leaflet Map Div */}
        <div className="w-full h-[540px] relative rounded-2xl overflow-hidden border border-[#282336]">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Floating Current Location Card overlay */}
          <div className="absolute top-4 left-4 z-[1000] bg-[#181520]/90 border border-[#282336] backdrop-blur-md rounded-2xl p-4 text-xs font-mono space-y-1 shadow-2xl max-w-xs">
            <div className="flex items-center space-x-2 text-purple-400 font-bold">
              <Navigation className="w-4 h-4 animate-pulse" />
              <span>ACTIVE PLAYBACK NODE</span>
            </div>
            <div className="text-sm font-bold text-white pt-1">{movementEvents[timelineIndex].title}</div>
            <div className="text-xs text-slate-400">{movementEvents[timelineIndex].entityName}</div>
            <div className="text-[11px] text-emerald-400 font-bold">{movementEvents[timelineIndex].time}</div>
          </div>
        </div>

        {/* Time-Slider Playback Bar */}
        <div className="p-4 rounded-2xl bg-[#1C1826] border border-[#282336] flex items-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-700 to-pink-600 hover:from-purple-600 hover:to-pink-500 text-white flex items-center justify-center shadow-lg shrink-0 transition-transform active:scale-95"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <button
            onClick={() => { setIsPlaying(false); setTimelineIndex(0); }}
            className="p-2 rounded-xl bg-[#15121C] text-slate-400 hover:text-white border border-[#282336]"
            title="Reset Timeline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Timeline Slider Steps */}
          <div className="flex-1 space-y-1">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>{movementEvents[timelineIndex].time}</span>
              <span>Sequence Step {timelineIndex + 1} / {movementEvents.length}</span>
            </div>
            <input
              type="range"
              min={0}
              max={movementEvents.length - 1}
              value={timelineIndex}
              onChange={e => {
                setIsPlaying(false);
                setTimelineIndex(Number(e.target.value));
              }}
              className="w-full h-2 bg-[#120F18] rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
