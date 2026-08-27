import React, { useState } from 'react';
import { Database, Check, Copy, X, Server, ExternalLink } from 'lucide-react';

interface SupabaseSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseSetupModal: React.FC<SupabaseSetupModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlSchemaScript = `-- ENABLE UUID EXTENSION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CASES TABLE
CREATE TABLE IF NOT EXISTS public.cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    case_number TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'OPEN',
    threat_level TEXT DEFAULT 'MEDIUM',
    lead_investigator TEXT NOT NULL,
    entity_count INTEGER DEFAULT 0,
    relationship_count INTEGER DEFAULT 0,
    target_cell TEXT,
    description TEXT,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    last_updated TIMESTAMPTZ DEFAULT now()
);

-- 2. ENTITIES TABLE
CREATE TABLE IF NOT EXISTS public.entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    risk_score INTEGER DEFAULT 80,
    threat_level TEXT DEFAULT 'HIGH',
    confidence_score INTEGER DEFAULT 95,
    source_tag TEXT DEFAULT 'FIR',
    degree INTEGER DEFAULT 1,
    betweenness NUMERIC DEFAULT 0.1,
    page_rank NUMERIC DEFAULT 0.05,
    phone TEXT,
    vehicle_plate TEXT,
    account_number TEXT,
    location_name TEXT,
    coordinates NUMERIC[2],
    role_description TEXT,
    ai_flags TEXT[] DEFAULT '{}',
    notes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. RELATIONSHIPS TABLE
CREATE TABLE IF NOT EXISTS public.relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
    source_id UUID REFERENCES public.entities(id) ON DELETE CASCADE,
    target_id UUID REFERENCES public.entities(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    label TEXT NOT NULL,
    confidence INTEGER DEFAULT 90,
    verified BOOLEAN DEFAULT true,
    thickness INTEGER DEFAULT 3,
    amount TEXT,
    frequency TEXT,
    last_timestamp TEXT,
    source_doc TEXT,
    ai_flagged BOOLEAN DEFAULT false,
    ai_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. NLP_EXTRACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.nlp_extractions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
    source_document TEXT NOT NULL,
    extracted_name TEXT NOT NULL,
    extracted_type TEXT NOT NULL,
    confidence_score INTEGER DEFAULT 95,
    text_snippet TEXT NOT NULL,
    full_text_payload TEXT,
    status TEXT DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. AUDIT_LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMPTZ DEFAULT now(),
    actor TEXT NOT NULL,
    role TEXT NOT NULL,
    action TEXT NOT NULL,
    target TEXT NOT NULL,
    resource TEXT,
    status TEXT DEFAULT 'SUCCESS',
    ip_address TEXT DEFAULT '10.240.8.12'
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nlp_extractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ANONYMOUS / AUTHENTICATED ACCESS POLICIES
CREATE POLICY "Allow public read-write" ON public.cases FOR ALL USING (true);
CREATE POLICY "Allow public read-write" ON public.entities FOR ALL USING (true);
CREATE POLICY "Allow public read-write" ON public.relationships FOR ALL USING (true);
CREATE POLICY "Allow public read-write" ON public.nlp_extractions FOR ALL USING (true);
CREATE POLICY "Allow public read-write" ON public.audit_logs FOR ALL USING (true);`;

  const handleCopySQL = () => {
    navigator.clipboard.writeText(sqlSchemaScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in font-sans">
      <div className="bg-[#040E26] border border-blue-500/50 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-slate-100 animate-scale-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-blue-900/60 flex items-center justify-between bg-[#081538]">
          <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-extrabold uppercase tracking-wider">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>SUPABASE BACKEND CONNECTED & SQL MIGRATION ASSISTANT</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
          {/* Connection Status Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0E2A38] via-[#081538] to-[#040E26] border border-emerald-500/40 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-emerald-400 font-bold flex items-center space-x-2">
                <Server className="w-4 h-4" />
                <span>SUPABASE INSTANCE: prammkkcoxesohigrgek.supabase.co</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                CONNECTED (ONLINE)
              </span>
            </div>
            <p className="text-xs text-slate-300">
              The React frontend is connected to your Supabase project. To instantiate the remote database tables in 1-click, copy the SQL migration script below and paste it in your Supabase SQL Editor.
            </p>
          </div>

          {/* Step 1 Instructions */}
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-blue-400 font-bold uppercase">1. INSTANTIATE TABLES IN SUPABASE SQL EDITOR</span>
              <a
                href="https://supabase.com/dashboard/project/prammkkcoxesohigrgek/sql/new"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center space-x-1"
              >
                <span>Open Supabase SQL Editor</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="relative rounded-2xl bg-[#020718] border border-blue-900/60 p-4 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-56">
              <button
                onClick={handleCopySQL}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
              </button>
              <pre className="whitespace-pre-wrap">{sqlSchemaScript}</pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-blue-900/60 bg-[#081538] flex justify-between items-center">
          <span className="text-xs text-slate-400 font-mono">SUPABASE BACKEND READY</span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold font-mono text-xs shadow-lg transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
