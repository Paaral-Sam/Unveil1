import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Upload, FileText, Bot, User, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  fileAttached?: string;
}

export const AiCopilotSidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { currentCase } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello Analyst. I have analyzed 6.02M records for ${currentCase.title} (${currentCase.caseNumber}). Ask me anything about entity connections, upload CDR/FIR documents, or request pattern synthesis.`,
      timestamp: '09:59'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim() && !attachedFile) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: q || `Uploaded document: ${attachedFile}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fileAttached: attachedFile || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setAttachedFile(null);

    // AI Response Simulation
    setTimeout(() => {
      let aiReply = '';
      const queryLower = q.toLowerCase();

      if (queryLower.includes('arjun') || queryLower.includes('mehta') || queryLower.includes('proxy')) {
        aiReply = `I found 3 primary proxy entities linked to Arjun Mehta (Risk 92):\n• Elena Rostova (Shell Manager - Risk 84)\n• Apex Global Holdings Ltd (Shell Co - Risk 90)\n• NY-771-X99 Black SUV (Vehicle - Risk 82)\nThese entities share 14 cross-border financial wires and 28 co-location pings at Pier 42.`;
      } else if (queryLower.includes('cdr') || queryLower.includes('phone') || queryLower.includes('cluster')) {
        aiReply = `CDR Analysis completed across 1.8M call logs:\n• Pre-incident call spike detected on 2026-08-25 between +1-555-019-4821 and +44-20-7946-0912.\n• 48 rapid burst calls logged 15 minutes prior to cargo arrival at Rotterdam Pier 42 Terminal.`;
      } else if (queryLower.includes('summarize') || queryLower.includes('2291') || queryLower.includes('case')) {
        aiReply = `${currentCase.title} (${currentCase.caseNumber}):\n• Total Identified Nodes: ${currentCase.entityCount}\n• Flagged Laundering Volume: $12,304.11 USD\n• High-Risk Ringleader: Viktor "The Architect" Rostov\n• Key Suspicious Pattern: 5-hop circular wire transfer returning to Cayman offshore pool.`;
      } else if (attachedFile || queryLower.includes('upload') || queryLower.includes('document')) {
        aiReply = `Extracted 4 high-confidence entities from ${attachedFile || 'intelligence file'}:\n1. Person: Dmitri Volkov (96% confidence)\n2. Account: Grand Cayman #881 (78% confidence)\n3. Vehicle: NY-771-X99 (92% confidence)\nThese items are pending your review in the Ingestion Module.`;
      } else {
        aiReply = `Cross-referencing intelligence database for "${q}":\nFound 1.02M node matches. Highest risk hit: Viktor "The Architect" Rostov (Risk 96). Linked to 18 active communication channels and $4.2M wire transfers.`;
      }

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setAttachedFile(file.name);
        setIsUploading(false);
        handleSendMessage(`Uploaded case intelligence document: ${file.name}`);
      }, 600);
    }
  };

  return (
    <>
      {/* Backdrop overlay so clicking outside closes sidebar, allowing clean view anywhere user is scrolled */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] animate-fade-in"
      />

      {/* Fixed Full Viewport Height Floating Sidebar on Right Edge */}
      <div className="fixed top-0 bottom-0 right-0 z-[100] h-full w-full sm:w-[460px] md:w-[480px] bg-[#040E26] border-l border-blue-500/40 shadow-2xl flex flex-col font-sans text-slate-100 backdrop-blur-2xl animate-slide-in-right select-none">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-[#020718] border-b border-blue-900/50 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#EF4444] to-[#0066FF] flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-tight leading-tight">AI Copilot Assistant</h3>
              <p className="text-xs text-[#0088FF] font-mono font-bold uppercase tracking-wider">ACTIVE CASE: {currentCase.caseNumber}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-blue-900/50 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Case Document Ingestion Banner */}
        <div className="p-4 bg-[#081538] border-b border-blue-900/40 font-mono text-xs shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 font-bold uppercase text-[11px] tracking-wider">CASE DOCUMENT INGESTION</span>
            <span className="text-emerald-400 font-bold text-[10px]">PDF, TXT, CDR SUPPORTED</span>
          </div>

          <label className="border-2 border-dashed border-blue-500/40 hover:border-blue-400 rounded-2xl p-3.5 bg-[#020718] flex items-center justify-center space-x-2.5 cursor-pointer transition-all hover:bg-blue-950/30 group">
            <Upload className="w-4 h-4 text-[#0088FF] group-hover:scale-110 transition-transform" />
            <span className="text-slate-300 font-bold">
              {isUploading ? 'Uploading file...' : attachedFile ? `Attached: ${attachedFile}` : 'Upload FIR / CDR / Intelligence Doc'}
            </span>
            <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.txt,.csv,.json,.docx" />
          </label>

          {attachedFile && (
            <div className="mt-2 text-[11px] text-emerald-400 font-bold flex items-center space-x-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Document ready for AI cross-examination</span>
            </div>
          )}
        </div>

        {/* Quick Action Prompt Chips */}
        <div className="p-3 bg-[#040C24] border-b border-blue-900/40 flex flex-wrap gap-1.5 text-xs font-mono shrink-0">
          {[
            `Summarize active case #${currentCase.caseNumber.split('-').pop() || '2291'}`,
            'Identify proxies for Arjun Mehta',
            'Analyze phone CDR clusters'
          ].map(chip => (
            <button
              key={chip}
              onClick={() => handleSendMessage(chip)}
              className="px-3 py-1.5 rounded-full bg-[#081538] hover:bg-gradient-to-r hover:from-[#EF4444] hover:to-[#0066FF] border border-blue-500/30 text-blue-300 hover:text-white text-[11px] font-bold transition-all shadow-sm"
            >
              + {chip}
            </button>
          ))}
        </div>

        {/* ChatGPT-like Interactive Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[88%] p-4 rounded-3xl space-y-1.5 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#EF4444] to-[#0066FF] text-white rounded-br-none shadow-xl'
                  : 'bg-[#081538] border border-blue-500/40 text-slate-200 rounded-bl-none shadow-lg'
              }`}>
                <div className="flex items-center space-x-2 text-[10px] opacity-75 font-mono font-bold uppercase">
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-[#0088FF]" />}
                  <span>{msg.sender === 'user' ? 'ANALYST' : 'UNVEIL AI COPILOT'}</span>
                  <span>· {msg.timestamp}</span>
                </div>

                {msg.fileAttached && (
                  <div className="p-2 rounded-xl bg-black/30 border border-white/20 text-[11px] font-mono flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-amber-300" />
                    <span className="font-bold">{msg.fileAttached}</span>
                  </div>
                )}

                <div className="leading-relaxed font-sans text-xs space-y-1 whitespace-pre-line">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Bottom ChatGPT-style Input Bar */}
        <form
          onSubmit={e => { e.preventDefault(); handleSendMessage(); }}
          className="p-4 bg-[#020718] border-t border-blue-900/50 flex items-center space-x-2 shrink-0"
        >
          <input
            type="text"
            placeholder="Type a question or query intelligence database..."
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            className="flex-1 bg-[#081538] border border-blue-500/40 focus:border-[#0088FF] rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none font-sans shadow-inner"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#EF4444] to-[#0066FF] hover:scale-105 active:scale-95 text-white font-bold text-xs shadow-lg flex items-center space-x-1 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </>
  );
};
