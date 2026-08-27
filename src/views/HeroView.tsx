import React, { useState } from 'react';
import { Search, Database, Compass, Shield, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroView: React.FC = () => {
  const { setSearchQuery } = useApp();
  const [inputVal, setInputVal] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setSearchQuery(inputVal);
      const target = document.getElementById('section-network');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="section-hero" className="w-full min-h-[88vh] bg-gradient-to-b from-[#05143C] via-[#040C24] to-[#020718] py-24 px-6 sm:px-12 lg:px-20 flex flex-col items-center justify-center text-center relative overflow-hidden select-none border-b border-blue-900/40">
      {/* Ambient Navy Blue Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Pill Chip */}
      <div className="inline-flex items-center space-x-2.5 px-5 py-2 rounded-full bg-blue-950/60 border border-blue-500/40 text-sm sm:text-base font-mono text-blue-300 font-bold mb-10 shadow-xl relative z-10">
        <Shield className="w-4.5 h-4.5 text-[#0088FF]" />
        <span>AI-Powered Criminal Network Intelligence</span>
      </div>

      {/* Large Hero Headline */}
      <h1 className="w-full max-w-6xl text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] mb-8 font-sans relative z-10">
        Unveil Hidden Connections in{' '}
        <span className="font-serif italic bg-gradient-to-r from-red-400 via-purple-300 to-[#38BDF8] bg-clip-text text-transparent font-bold pr-3">
          Criminal Networks
        </span>
      </h1>

      {/* Subtitle text */}
      <p className="w-full max-w-4xl text-lg sm:text-2xl text-slate-300 font-normal leading-relaxed mb-12 font-sans relative z-10">
        Ingest fragmented intelligence reports, automatically extract entities, visualize relationship topologies, and detect suspicious syndicate patterns in real-time.
      </p>

      {/* Cleanly Aligned Search Bar Pill Container with Perfectly Fitted Button */}
      <form onSubmit={handleSearchSubmit} className="w-full max-w-4xl sm:max-w-5xl lg:max-w-6xl relative z-10 mb-20 shadow-2xl">
        <div className="w-full bg-[#03091B]/95 border border-blue-500/40 focus-within:border-[#0088FF] focus-within:ring-2 focus-within:ring-blue-500/30 rounded-full p-2 pl-6 sm:pl-8 pr-2 flex items-center justify-between shadow-2xl backdrop-blur-2xl transition-all duration-300">
          <div className="flex items-center flex-1 mr-4 overflow-hidden">
            <Search className="w-6 h-6 text-slate-400 shrink-0 mr-3.5" />
            <input
              type="text"
              placeholder="Enter entity name, phone number, vehicle plate, account #..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full bg-transparent border-none text-sm sm:text-base lg:text-lg text-white placeholder-slate-400 focus:outline-none font-sans truncate"
            />
          </div>
          <button
            type="submit"
            className="px-6 sm:px-9 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#E85D75] via-[#A855F7] to-[#3B82F6] hover:brightness-110 text-white font-extrabold text-sm sm:text-base shadow-xl flex items-center justify-center space-x-2 shrink-0 font-sans transition-transform active:scale-95"
          >
            <span>Search Intelligence</span>
          </button>
        </div>
      </form>

      {/* Quick Action Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-20 font-mono text-sm sm:text-base font-bold relative z-10">
        <button
          onClick={() => scrollToSection('section-overview')}
          className="px-5 py-3 rounded-full bg-[#030A1C] hover:bg-blue-950 border border-blue-900/60 text-slate-200 hover:text-white flex items-center space-x-2.5 shadow-md transition-colors"
        >
          <Database className="w-5 h-5 text-blue-400" />
          <span>Explore 6M Ingested Records</span>
        </button>

        <button
          onClick={() => scrollToSection('section-network')}
          className="px-5 py-3 rounded-full bg-[#030A1C] hover:bg-blue-950 border border-blue-900/60 text-slate-200 hover:text-white flex items-center space-x-2.5 shadow-md transition-colors"
        >
          <Share2 className="w-5 h-5 text-[#0088FF]" />
          <span>Interactive Relationship Map</span>
        </button>

        <button
          onClick={() => scrollToSection('section-geospatial')}
          className="px-5 py-3 rounded-full bg-[#030A1C] hover:bg-blue-950 border border-blue-900/60 text-slate-200 hover:text-white flex items-center space-x-2.5 shadow-md transition-colors"
        >
          <Compass className="w-5 h-5 text-[#EF4444]" />
          <span>Geospatial Surveillance Map</span>
        </button>
      </div>

      {/* Agency Logo Ticker */}
      <div className="pt-10 border-t border-blue-900/40 w-full max-w-6xl relative z-10">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-400 font-mono font-bold mb-6">
          TRUSTED BY GLOBAL LAW ENFORCEMENT & INTELLIGENCE AGENCIES
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 opacity-70 text-lg sm:text-2xl font-bold font-mono tracking-wider text-slate-200">
          <span className="hover:text-blue-400 transition-colors">[ INTERPOL ]</span>
          <span className="hover:text-blue-400 transition-colors">[ EUROPOL ]</span>
          <span className="hover:text-blue-400 transition-colors">[ DEA CYBER ]</span>
          <span className="hover:text-blue-400 transition-colors">[ FINCEN ]</span>
          <span className="hover:text-blue-400 transition-colors">[ SCOTLAND YARD ]</span>
        </div>
      </div>
    </section>
  );
};
