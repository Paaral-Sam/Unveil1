import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Upload, FileText, Bot, User, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { askGroqCopilot } from '../services/groq';

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
      text: `Hello Analyst. Powered by Groq AI (Llama-3 70B), I am actively connected to ${currentCase.title} (${currentCase.caseNumber}). Ask me anything about C2 IP servers, ransomware malware, Monero/USDT mixer cashouts, or phone telemetry.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isAiThinking]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
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
    setIsAiThinking(true);

    // Call Groq API via Llama-3 70B Service
    const aiReply = await askGroqCopilot(q, {
      title: currentCase.title,
      number: currentCase.caseNumber
    });

    const aiMsg: ChatMessage = {
      id: `msg-ai-${Date.now()}`,
      sender: 'ai',
      text: aiReply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setIsAiThinking(false);
    setMessages(prev => [...prev, aiMsg]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTimeout(() => {
        setAttachedFile(file.name);
        handleSendMessage(`Uploaded case intelligence document: ${file.name}. Summarize entities.`);
      }, 600);
    }
  };

  return (
    <>
      {/* Backdrop overlay so clicking outside closes sidebar */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] animate-fade-in"
      />

      {/* Fixed Full Viewport Height Floating Sidebar on Right Edge */}
      <div className="fixed top-0 bottom-0 right-0 z-[100] h-full w-full sm:w-[460px] md:w-[480px] bg-[#040E26] border-l border-blue-500/40 shadow-2xl flex flex-col font-sans text-slate-100 backdrop-blur-2xl animate-slide-in-right select-none">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-[#020718] border-b border-blue-900/50 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#EF4444] via-[#A855F7] to-[#0066FF] border border-white/20 flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-extrabold text-lg text-white tracking-tight leading-none">UnVeil AI Copilot</h3>
                <span className="px-2 py-0.5 rounded-md bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-mono text-[9px] font-bold">GROQ LIVE</span>
              </div>
              <p className="text-xs text-blue-400 font-mono font-bold mt-1">Llama-3 70B &nbsp;·&nbsp; {currentCase.caseNumber}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-blue-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.sender === 'ai'
                  ? 'bg-gradient-to-tr from-purple-600 to-blue-600 text-white shadow-md'
                  : 'bg-slate-700 text-white'
              }`}>
                {msg.sender === 'ai' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
              </div>

              <div className={`max-w-[85%] space-y-1 ${msg.sender === 'user' ? 'items-end' : ''}`}>
                <div className={`p-4 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-line shadow-md ${
                  msg.sender === 'ai'
                    ? 'bg-[#081538] border border-blue-900/50 text-slate-100'
                    : 'bg-gradient-to-r from-[#EF4444] to-[#0066FF] text-white font-medium'
                }`}>
                  {msg.fileAttached && (
                    <div className="mb-2 p-2 rounded-xl bg-black/30 border border-white/20 flex items-center space-x-2 text-xs font-mono">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>{msg.fileAttached}</span>
                    </div>
                  )}
                  {msg.text}
                </div>

                <div className={`text-[10px] font-mono text-slate-400 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {/* AI Thinking Spinner */}
          {isAiThinking && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4 text-white animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-[#081538] border border-blue-900/50 text-xs text-blue-300 font-mono flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                <span>Groq Llama-3 70B reasoning over case intelligence...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Suggestion Chips */}
        <div className="px-4 py-2 bg-[#020718]/80 border-t border-blue-900/40 flex items-center space-x-2 overflow-x-auto text-[11px] font-mono scrollbar-none">
          <button
            onClick={() => handleSendMessage('Summarize key threat patterns in case 2291')}
            className="px-3 py-1 rounded-full bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-300 whitespace-nowrap transition-colors"
          >
            ⚡ Case Threat Summary
          </button>
          <button
            onClick={() => handleSendMessage('Show all C2 IP addresses and darknet domains')}
            className="px-3 py-1 rounded-full bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-300 whitespace-nowrap transition-colors"
          >
            💻 C2 IPs & Darknet
          </button>
          <button
            onClick={() => handleSendMessage('Trace Tether USDT crypto mixer transfers')}
            className="px-3 py-1 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 whitespace-nowrap transition-colors"
          >
            🪙 Crypto Mixer Hops
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#020718] border-t border-blue-900/50 space-y-3 shrink-0">
          {attachedFile && (
            <div className="flex items-center justify-between p-2 rounded-xl bg-blue-950 border border-blue-500/40 text-xs text-blue-300 font-mono">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Attached: <strong>{attachedFile}</strong></span>
              </div>
              <button onClick={() => setAttachedFile(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
          )}

          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Ask Groq AI about case entities, C2 IPs, crypto..."
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              disabled={isAiThinking}
              className="w-full bg-[#081538] border border-blue-500/40 focus:border-[#0088FF] focus:ring-1 focus:ring-blue-500/30 rounded-2xl pl-4 pr-24 py-3 text-xs text-white placeholder-slate-400 font-sans focus:outline-none"
            />

            <div className="absolute right-2 flex items-center space-x-1">
              <label className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-blue-900/60 cursor-pointer transition-colors" title="Upload File to AI">
                <Upload className="w-4 h-4" />
                <input type="file" onChange={handleFileUpload} accept=".txt,.pdf,.csv,.json,.log" className="hidden" />
              </label>

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputQuery.trim() && !attachedFile}
                className="p-2 rounded-xl bg-gradient-to-r from-[#EF4444] to-[#0066FF] hover:brightness-110 text-white disabled:opacity-50 transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
