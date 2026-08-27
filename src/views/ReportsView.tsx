import React, { useState } from 'react';
import { FileSpreadsheet, Download, CheckCircle2, FileText } from 'lucide-react';
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
    }, 1200);
  };

  return (
    <div className="w-full bg-white p-6 lg:p-8 space-y-6 font-sans text-slate-900 rounded-3xl border border-slate-200 shadow-md animate-fade-in-up">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#0066FF] uppercase tracking-wider">
            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
            <span>INVESTIGATIVE REPORT & EVIDENCE EXPORT BUILDER</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Court Intelligence Package & Evidence Brief Builder
          </h2>
          <p className="text-sm text-slate-500 font-sans mt-0.5">
            Compile structured executive case briefs, key influencer network summaries, and court evidence packages.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Template Selector & Export Buttons */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase font-mono border-b border-slate-100 pb-2">
            Report Export Formats
          </h3>

          <div className="space-y-3 font-mono">
            <button
              onClick={() => handleSimulateExport('PDF')}
              className="w-full py-3 px-4 rounded-xl bg-[#0066FF] hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Formal PDF Brief</span>
            </button>

            <button
              onClick={() => handleSimulateExport('CSV')}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV Evidence Matrix</span>
            </button>

            <button
              onClick={() => handleSimulateExport('JSON')}
              className="w-full py-3 px-4 rounded-xl bg-[#040E26] hover:bg-blue-950 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export i2 Analyst Notebook (JSON)</span>
            </button>
          </div>

          {isExporting && (
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 flex items-center space-x-2">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
              <span>Generating evidentiary report package...</span>
            </div>
          )}

          {exportedFormat && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-700 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Package generated! Downloaded <strong>UnVeil_{exportedFormat}_Package.zip</strong></span>
            </div>
          )}
        </div>

        {/* Right 2 Cols: Report Preview Document */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>PREVIEW: COURT INTELLIGENCE BRIEF</span>
            </span>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              STATUS: READY
            </span>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 space-y-4 leading-relaxed">
            <div className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
              CASE FILE: {currentCase?.caseNumber || 'CASE-2026-2291'} &nbsp;·&nbsp; RESTRICTED FOR COURT ADMISSIBILITY
            </div>
            <div>
              <strong>Target Cell:</strong> {currentCase?.targetCell || 'Primary Cartel Cell'}<br />
              <strong>Lead Investigator:</strong> {currentCase?.leadInvestigator}<br />
              <strong>Summary Evidence:</strong> Ingested {entities.length} primary nodes and {relationships.length} evidentiary links.
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-slate-700 space-y-1">
              <strong className="text-slate-900">EVIDENTIARY FINDINGS:</strong>
              <p>Primary subject Viktor Rostov linked to Elena Rostova via 48 encrypted CDR call logs and $450,000 offshore wire transfer to Chase Account #****-9921.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
