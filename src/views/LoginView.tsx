import React, { useState } from 'react';
import { Key, User, ArrowRight, Lock, ArrowLeft, AlertCircle, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginView: React.FC = () => {
  const { loginRole, loginUser, loginAdmin, goToWelcome } = useApp();
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>(loginRole || 'user');
  
  // User Login State
  const [badgeId, setBadgeId] = useState('ANALYST-8804');
  const [mfaToken, setMfaToken] = useState('782-901');

  // Admin Login State
  const [adminKeyInput, setAdminKeyInput] = useState('unveil2026');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);
    setTimeout(() => {
      loginUser(badgeId, mfaToken);
    }, 400);
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);
    setTimeout(() => {
      const res = loginAdmin(adminKeyInput);
      setIsSubmitting(false);
      if (!res.success) {
        setErrorMessage(res.message || 'Invalid Admin Key!');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-[#03050B] bg-blue-glow flex flex-col items-center justify-center p-6 font-mono text-white relative select-none">
      {/* Back to Welcome Link */}
      <button
        onClick={goToWelcome}
        className="absolute top-8 left-8 btn-blue-outline px-5 py-2 text-xs flex items-center space-x-2 font-bold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>[ BACK TO WELCOME ]</span>
      </button>

      {/* Red & Blue Window Login Container */}
      <div className="w-full max-w-md bg-[#040E26]/95 border border-blue-500/50 p-8 space-y-6 shadow-[0_0_50px_rgba(0,102,255,0.25)] relative z-10 rounded-2xl backdrop-blur-xl">
        {/* Header Brand */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-gradient-to-br from-[#EF4444] to-[#0066FF] border border-white/20 text-white font-bold flex items-center justify-center mx-auto rounded-2xl shadow-lg shadow-red-950/50">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-sans text-2xl font-extrabold text-white tracking-tight pt-2">UNVEIL</h1>
          <p className="text-xs text-[#0088FF] font-mono font-bold uppercase tracking-wider">
            {activeTab === 'user' ? 'ANALYST SECURITY CHECKPOINT' : 'ADMINISTRATIVE MASTER GATEWAY'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#020718] border border-blue-900/50 rounded-xl text-xs font-bold">
          <button
            onClick={() => { setActiveTab('user'); setErrorMessage(null); }}
            className={`py-2.5 text-center rounded-lg transition-all ${
              activeTab === 'user'
                ? 'bg-[#0066FF] text-white font-bold shadow-md shadow-blue-950/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ANALYST.EXE
          </button>

          <button
            onClick={() => { setActiveTab('admin'); setErrorMessage(null); }}
            className={`py-2.5 text-center rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === 'admin'
                ? 'bg-[#DC143C] text-white font-bold shadow-md shadow-red-950/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>ADMIN.EXE</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 bg-red-950/60 text-red-300 border border-red-500/50 text-xs font-mono rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* User Form */}
        {activeTab === 'user' ? (
          <form onSubmit={handleUserSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5 font-bold">
                ANALYST BADGE ID
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="text"
                  required
                  value={badgeId}
                  onChange={e => setBadgeId(e.target.value)}
                  className="w-full bg-[#020718] border border-blue-500/50 rounded-xl px-9 py-2.5 text-xs text-blue-300 font-mono focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5 font-bold">
                SECURITY MFA TOKEN
              </label>
              <div className="relative flex items-center">
                <Key className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="password"
                  required
                  value={mfaToken}
                  onChange={e => setMfaToken(e.target.value)}
                  className="w-full bg-[#020718] border border-blue-500/50 rounded-xl px-9 py-2.5 text-xs text-blue-300 font-mono focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-red-blue w-full py-3.5 text-xs flex items-center justify-center space-x-2 mt-4 font-bold"
            >
              {isSubmitting ? (
                <span>AUTHENTICATING...</span>
              ) : (
                <>
                  <span>AUTHENTICATE SESSION</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Admin Form with unveil2026 key */
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5 font-bold">
                ADMIN MASTER KEY (REQUIRED)
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-red-400 absolute left-3" />
                <input
                  type="password"
                  required
                  value={adminKeyInput}
                  onChange={e => setAdminKeyInput(e.target.value)}
                  placeholder="Enter admin key..."
                  className="w-full bg-[#020718] border border-red-500/50 rounded-xl px-9 py-2.5 text-xs text-red-300 font-mono focus:outline-none focus:border-red-400"
                />
              </div>
              <div className="text-[11px] font-mono text-red-400 mt-1.5 font-bold">
                DEFAULT_KEY: unveil2026
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-red-gradient w-full py-3.5 text-xs flex items-center justify-center space-x-2 mt-4 font-bold"
            >
              {isSubmitting ? (
                <span>VALIDATING_KEY...</span>
              ) : (
                <>
                  <span>LOGIN AS ADMIN</span>
                  <Lock className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="text-[10px] text-center text-slate-400 font-mono pt-2 border-t border-slate-800">
          18 U.S.C. § 1030 UNLESS AUTHORIZED, ACCESS IS STRICTLY PROHIBITED
        </div>
      </div>
    </div>
  );
};
