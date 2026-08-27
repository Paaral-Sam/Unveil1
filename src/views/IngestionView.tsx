import React, { useState } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  XCircle,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EntityBadge } from '../components/EntityBadge';

export const IngestionView: React.FC = () => {
  const { nlpItems, approveNLPItem, rejectNLPItem } = useApp();
  const [activeSourceTab, setActiveSourceTab] = useState<'FIR' | 'CDR' | 'FINANCIAL' | 'SURVEILLANCE'>('FIR');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedSuccess, setUploadedSuccess] = useState(false);

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setUploadedSuccess(true);
        setTimeout(() => setUploadedSuccess(false), 4000);
      }, 1500);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-unveil-mesh min-h-[calc(100vh-80px)] font-sans text-slate-100 animate-fade-in-up">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-blue-900/40 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-emerald-400 font-bold uppercase tracking-wider font-mono">
            <UploadCloud className="w-4 h-4 text-emerald-400" />
            <span>DATA INGESTION & HUMAN-IN-THE-LOOP NLP REVIEW</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
            Multi-Source Intelligence Ingestion & Extraction Review
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Ingest unstructured FIRs, CDR call telemetry, financial SWIFT logs, and approve AI entity extractions.
          </p>
        </div>
      </div>

      {/* Extended Upload Box & Extended Review Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[520px]">
        {/* Left Column: Extended Multi-Source Document Uploader Card */}
        <div className="p-7 sm:p-8 rounded-3xl bg-[#0B0F19]/90 border border-blue-900/40 shadow-2xl flex flex-col justify-between space-y-6 backdrop-blur-xl card-motion">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">Multi-Source Document Uploader</h3>

            {/* Source Tabs */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              {[
                { id: 'FIR', label: 'FIR & Police Reports' },
                { id: 'CDR', label: 'CDR Telemetry' },
                { id: 'FINANCIAL', label: 'Financial SWIFT' },
                { id: 'SURVEILLANCE', label: 'Surveillance Reports' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSourceTab(tab.id as any)}
                  className={`py-2.5 px-3 rounded-2xl transition-all ${
                    activeSourceTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-lg scale-[1.02]'
                      : 'bg-[#121929] text-slate-400 hover:text-white border border-blue-900/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Extended File Dropzone */}
            <div className="relative border-2 border-dashed border-purple-500/40 hover:border-purple-400 rounded-3xl p-10 sm:p-12 text-center space-y-4 bg-[#121929]/80 transition-all cursor-pointer group hover:bg-purple-950/20">
              <input
                type="file"
                onChange={handleSimulateUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
              <div className="w-16 h-16 rounded-3xl bg-purple-950 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xl">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div>
                <p className="text-base font-bold text-white">Click or drag & drop files here</p>
                <p className="text-xs text-slate-400 mt-1 font-mono">Supports PDF, TXT, CSV, JSON, DOCX up to 50MB</p>
              </div>
            </div>

            {isUploading && (
              <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-xs text-purple-300 flex items-center space-x-2 font-mono">
                <div className="w-4 h-4 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
                <span>Processing NLP Entity Extraction...</span>
              </div>
            )}

            {uploadedSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center space-x-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Document ingested successfully! 4 entities ready for review.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right 2 Columns: Extended Pending AI NLP Extractions Review Table Card */}
        <div className="lg:col-span-2 p-7 sm:p-8 rounded-3xl bg-[#0B0F19]/90 border border-blue-900/40 shadow-2xl flex flex-col justify-between space-y-6 backdrop-blur-xl card-motion">
          <div className="space-y-5 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-900/40 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Pending AI NLP Extractions Review Table</h3>
                <p className="text-xs text-slate-400 mt-1">Approve, edit, or reject AI-discovered entities before merging to main graph</p>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold self-start sm:self-auto">
                {nlpItems.filter(i => i.status === 'PENDING').length} Pending Review
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse font-sans">
                <thead>
                  <tr className="border-b border-blue-900/40 text-slate-400 text-xs uppercase font-mono tracking-wider">
                    <th className="py-3.5 px-4">Extracted Entity</th>
                    <th className="py-3.5 px-4">Entity Type</th>
                    <th className="py-3.5 px-4">Confidence</th>
                    <th className="py-3.5 px-4">Source Context Snippet</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-900/30">
                  {nlpItems.map(item => (
                    <tr key={item.id} className="hover:bg-[#121929] transition-colors">
                      <td className="py-4.5 px-4 font-bold text-white">{item.extractedName}</td>
                      <td className="py-4.5 px-4">
                        <EntityBadge type={item.extractedType} name={item.extractedType.toUpperCase()} />
                      </td>
                      <td className="py-4.5 px-4 font-mono font-bold text-emerald-400">
                        {item.confidenceScore}%
                      </td>
                      <td className="py-4.5 px-4 text-xs text-slate-300 max-w-sm leading-relaxed">
                        "{item.textSnippet}"
                      </td>
                      <td className="py-4.5 px-4 text-right space-x-2 whitespace-nowrap">
                        {item.status === 'PENDING' ? (
                          <>
                            <button
                              onClick={() => approveNLPItem(item.id)}
                              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center space-x-1 shadow-md"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>✓ Approve</span>
                            </button>

                            <button
                              onClick={() => rejectNLPItem(item.id)}
                              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center space-x-1 shadow-md"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>⊗ Reject</span>
                            </button>
                          </>
                        ) : (
                          <span className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold ${
                            item.status === 'APPROVED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                          }`}>
                            {item.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
