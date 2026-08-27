import React, { useState } from 'react';
import { FileSpreadsheet, Download, CheckCircle2, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReportsView: React.FC = () => {
  const { currentCase, entities, relationships } = useApp();
  const [isExporting, setIsExporting] = useState(false);
  const [exportedFormat, setExportedFormat] = useState<string | null>(null);

  const handleSimulateExport = (format: string) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportedFormat(format);
      setTimeout(() => setExportedFormat(null), 4000);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6 bg-unveil-mesh min-h-[calc(100vh-80px)] font-sans text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#282336] pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">
            <FileSpreadsheet className="w-4 h-4 text-slate-300" />
            <span>INVESTIGATIVE REPORT & EVIDENCE EXPORT BUILDER</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Court Intelligence Package & Evidence Brief Builder
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Compile structured executive case briefs, key influencer network summaries, and court evidence packages
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Template Selector & Export Buttons */}
        <div className="p-6 rounded-3xl bg-[#15121C] border border-[#282336] shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-white tracking-tight">Report Export Formats</h3>

          <div className="space-y-3">
            <button
              onClick={() => handleSimulateExport('PDF')}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg flex items-center justify-center space-x-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Executive Briefing (PDF)</span>
            </button>

            <button
              onClick={() => handleSimulateExport('CSV')}
              className="w-full py-3 px-4 rounded-2xl bg-[#1C1826] hover:bg-[#252033] border border-[#282336] text-white font-bold text-sm shadow-lg flex items-center justify-center space-x-2 transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export Network Graph Data (CSV)</span>
            </button>

            <button
              onClick={() => handleSimulateExport('JSON')}
              className="w-full py-3 px-4 rounded-2xl bg-[#1C1826] hover:bg-[#252033] border border-[#282336] text-white font-bold text-sm shadow-lg flex items-center justify-center space-x-2 transition-all"
            >
              <Share2 className="w-4 h-4 text-purple-400" />
              <span>Export Maltego / i2 Schema (JSON)</span>
            </button>
          </div>

          {isExporting && (
            <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-xs text-purple-300 flex items-center space-x-2 font-mono">
              <div className="w-4 h-4 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
              <span>Generating evidentiary report bundle...</span>
            </div>
          )}

          {exportedFormat && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center space-x-2 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Report exported successfully as {exportedFormat}!</span>
            </div>
          )}
        </div>

        {/* Right 2 Cols: Report Preview Box */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#15121C] border border-[#282336] shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-white tracking-tight border-b border-[#282336] pb-3">Report Document Live Preview</h3>

          <div className="p-6 rounded-2xl bg-[#1C1826] border border-[#282336] space-y-4 font-mono text-xs">
            <div className="flex justify-between text-purple-400 font-bold border-b border-[#282336] pb-2">
              <span>UNVEIL INTELLIGENCE PACKAGE</span>
              <span>CLASSIFICATION: RESTRICTED</span>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-white">CASE RECORD #{currentCase.caseNumber}: {currentCase.title}</div>
              <div className="text-slate-400">Lead Investigator: {currentCase.leadInvestigator}</div>
            </div>

            <div className="p-3 bg-[#15121C] rounded-xl border border-[#282336] space-y-1">
              <div className="text-slate-300 font-bold">EXECUTIVE SUMMARY:</div>
              <p className="text-slate-400 leading-relaxed">{currentCase.description}</p>
            </div>

            <div className="space-y-1">
              <div className="text-slate-300 font-bold">NETWORK TOPOLOGY METRICS:</div>
              <div className="text-slate-400">• Total Nodes: {entities.length} verified entities</div>
              <div className="text-slate-400">• Total Edges: {relationships.length} relationship links</div>
              <div className="text-slate-400">• Target Cell: {currentCase.targetCell}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
