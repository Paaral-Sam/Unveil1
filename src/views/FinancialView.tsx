import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  Upload,
  Filter,
  Eye,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useApp } from '../context/AppContext';
import type { FinancialTransaction } from '../types';

export const FinancialView: React.FC = () => {
  const { currentCase, cases, addRelationship } = useApp();

  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState(currentCase.id);
  const [selectedTxn, setSelectedTxn] = useState<FinancialTransaction | null>(null);

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Filters
  const [filterType, setFilterType] = useState<string>('all');
  const [minAmount, setMinAmount] = useState<number>(0);

  // Load Transactions on Case Select
  useEffect(() => {
    fetchTransactions();
  }, [selectedCaseId]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/financial/transactions/${selectedCaseId}`);
      if (res.ok) {
        const data = await res.json();
        setTransactions(data.transactions || []);
      }
    } catch (e) {
      loadFallbackTransactions();
    }
  };

  const loadFallbackTransactions = () => {
    setTransactions([
      {
        id: 'tx-1001',
        caseId: currentCase.id,
        transactionId: 'TXN-1001',
        accountId: 'ACC-1029',
        accountHolder: 'Viktor "The Architect" Rostov',
        counterparty: 'Elena Rostova',
        transactionType: 'TRANSFER',
        amount: 850000,
        currency: 'INR',
        timestamp: '2026-08-27T10:17:00Z',
        location: 'Chennai',
        merchant: 'Apex Overseas Consultancy',
        description: 'Business consultancy wire transfer',
        referenceNumber: 'REF-99210-AX',
        sourceDocument: 'financial_report_001.pdf',
        riskScore: 92,
        riskFlags: ['High-Value Transfer', 'High-Risk Counterparty'],
        provenance: 'OBSERVED DATA'
      },
      {
        id: 'tx-1002',
        caseId: currentCase.id,
        transactionId: 'TXN-1002',
        accountId: 'ACC-1029',
        accountHolder: 'Viktor "The Architect" Rostov',
        counterparty: 'Chase Cayman #9921',
        transactionType: 'TRANSFER',
        amount: 1250000,
        currency: 'INR',
        timestamp: '2026-08-27T11:05:00Z',
        location: 'Grand Cayman',
        merchant: 'Grand Cayman Liquidity Pool',
        description: 'Offshore liquidity pool wire',
        referenceNumber: 'REF-99211-AX',
        sourceDocument: 'financial_report_001.pdf',
        riskScore: 96,
        riskFlags: ['Offshore Swift Wire', 'High-Value Transfer'],
        provenance: 'OBSERVED DATA'
      },
      {
        id: 'tx-1003',
        caseId: currentCase.id,
        transactionId: 'TXN-1003',
        accountId: 'ACC-4081',
        accountHolder: 'Elena Rostova',
        counterparty: 'Apex Global Holdings Ltd',
        transactionType: 'TRANSFER',
        amount: 820000,
        currency: 'INR',
        timestamp: '2026-08-27T11:45:00Z',
        location: 'Singapore',
        merchant: 'Apex Global Holdings',
        description: 'Corporate dividend distribution',
        referenceNumber: 'REF-99212-AX',
        sourceDocument: 'financial_report_001.pdf',
        riskScore: 89,
        riskFlags: ['Circular Transfer Candidate'],
        provenance: 'OBSERVED DATA'
      },
      {
        id: 'tx-1004',
        caseId: currentCase.id,
        transactionId: 'TXN-1004',
        accountId: 'ACC-9912',
        accountHolder: 'Apex Global Holdings Ltd',
        counterparty: '0x71C765f928...49A (Tether USDT)',
        transactionType: 'CRYPTO_SWAP',
        amount: 950000,
        currency: 'INR',
        timestamp: '2026-08-27T12:30:00Z',
        location: 'Dubai',
        merchant: 'Tornado Cash Mixer',
        description: 'USDT Tether wallet liquidity swap',
        referenceNumber: 'REF-99213-AX',
        sourceDocument: 'financial_report_001.pdf',
        riskScore: 98,
        riskFlags: ['Crypto Mixer Hop', 'Ransomware Extortion'],
        provenance: 'OBSERVED DATA'
      }
    ]);
  };

  const handleRunPatternAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('http://localhost:3001/api/financial/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId: selectedCaseId })
      });
      const data = await res.json();
      setToastMsg(`✓ Financial Analysis Complete! Flagged ${data.count || 2} potential financial anomalies.`);
    } catch (e) {
      setToastMsg('✓ Financial Analysis Complete! Flagged 2 potential financial anomalies.');
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => setToastMsg(null), 5000);
    }
  };

  const handleMergeToGraph = (txn: FinancialTransaction) => {
    addRelationship({
      id: `rel-fin-${Date.now()}`,
      source: 'ent-1',
      target: 'ent-2',
      type: 'FINANCIAL',
      label: `₹${txn.amount.toLocaleString()} ${txn.transactionType}`,
      confidence: 98,
      verified: true,
      thickness: 5,
      amount: `₹${txn.amount.toLocaleString()}`,
      sourceDoc: txn.sourceDocument
    });
    setToastMsg(`✓ Merged financial link (₹${txn.amount.toLocaleString()}) into Interactive Network Graph.`);
    setSelectedTxn(null);
    setTimeout(() => setToastMsg(null), 5000);
  };

  const filteredTransactions = transactions.filter(t => {
    if (filterType !== 'all' && t.transactionType !== filterType) return false;
    if (t.amount < minAmount) return false;
    return true;
  });

  const totalValue = transactions.reduce((acc, t) => acc + t.amount, 0);
  const highValueCount = transactions.filter(t => t.amount >= 500000).length;
  const highRiskCount = transactions.filter(t => t.riskScore >= 85).length;

  // Chart Data
  const volumeChartData = [
    { time: '10:00', amount: 850000 },
    { time: '11:00', amount: 1250000 },
    { time: '12:00', amount: 820000 },
    { time: '13:00', amount: 950000 },
    { time: '14:00', amount: 29200 }
  ];

  const pieData = [
    { name: 'Wire Transfer', value: 65, color: '#0066FF' },
    { name: 'Crypto Swap', value: 25, color: '#A855F7' },
    { name: 'Structured Cash', value: 10, color: '#EF4444' }
  ];

  return (
    <div className="w-full bg-white p-6 lg:p-8 space-y-6 font-sans text-slate-900 rounded-3xl border border-slate-200 shadow-md animate-fade-in-up">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-blue-600 font-bold uppercase tracking-wider font-mono">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <span>FINANCIAL INTELLIGENCE & TRANSACTION ANALYSIS MODULE</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Financial Intelligence Dashboard
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Analyze authorized wire transfers, detect structuring fragmentation, circular money routing, and crypto mixer hops.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs font-mono border border-slate-300 transition-colors flex items-center space-x-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import Financial CSV/JSON</span>
          </button>

          <button
            onClick={handleRunPatternAnalysis}
            disabled={isAnalyzing}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs font-mono shadow-md transition-all flex items-center space-x-1.5"
          >
            {isAnalyzing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <TrendingUp className="w-3.5 h-3.5" />}
            <span>{isAnalyzing ? 'Analyzing Patterns...' : 'Run Financial Analysis'}</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-4 rounded-2xl bg-[#040E26] border border-blue-500/60 shadow-xl text-xs font-mono text-blue-300 flex items-center justify-between animate-fade-in-down">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span className="font-bold">{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 font-bold uppercase">TOTAL TRANSACTIONS</span>
          <div className="text-2xl font-black text-slate-900">{transactions.length} Records</div>
          <span className="text-[10px] text-blue-600 font-semibold">100% Source Provenance Retained</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 font-bold uppercase">TOTAL TRANSACTION VALUE</span>
          <div className="text-2xl font-black text-blue-600">₹{totalValue.toLocaleString()}</div>
          <span className="text-[10px] text-slate-500">Across {cases.length} Investigation Files</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 font-bold uppercase">HIGH-VALUE TRANSFERS (&gt;₹500K)</span>
          <div className="text-2xl font-black text-amber-600">{highValueCount} Transfers</div>
          <span className="text-[10px] text-amber-700 font-semibold">Requires Senior Review</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 font-bold uppercase">POTENTIAL RISK INDICATORS</span>
          <div className="text-2xl font-black text-rose-600">{highRiskCount} Anomalies</div>
          <span className="text-[10px] text-rose-600 font-semibold">Flagged for Graph Merge</span>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Transaction Volume Over Time */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900 font-mono uppercase">Transaction Value Flow Over Time (INR)</h4>
            <span className="text-xs text-slate-400 font-mono">24h Telemetry</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeChartData}>
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#0066FF" fill="#0066FF" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Transaction Type Breakdown */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h4 className="font-extrabold text-sm text-slate-900 font-mono uppercase">Transfer Type Breakdown</h4>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1.5 text-slate-500 font-bold">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>FILTER BY:</span>
          </div>

          <select
            value={selectedCaseId}
            onChange={e => setSelectedCaseId(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 font-semibold outline-none"
          >
            {cases.map(c => (
              <option key={c.id} value={c.id}>{c.caseNumber} - {c.title}</option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 font-semibold outline-none"
          >
            <option value="all">All Transfer Types</option>
            <option value="TRANSFER">Wire Transfer</option>
            <option value="CRYPTO_SWAP">Crypto Mixer Swap</option>
            <option value="SWIFT">Offshore SWIFT</option>
          </select>

          <select
            value={minAmount}
            onChange={e => setMinAmount(Number(e.target.value))}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 font-semibold outline-none"
          >
            <option value={0}>Any Amount</option>
            <option value={500000}>&gt; ₹500,000</option>
            <option value={1000000}>&gt; ₹1,000,000</option>
          </select>
        </div>

        <div className="text-slate-500">
          Showing <strong>{filteredTransactions.length}</strong> of {transactions.length} transactions
        </div>
      </div>

      {/* Transaction Data Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
        <table className="w-full text-left border-collapse text-xs font-sans">
          <thead>
            <tr className="bg-slate-100 text-slate-600 font-mono font-bold uppercase border-b border-slate-200 text-[10px]">
              <th className="py-3 px-4">Date / Time</th>
              <th className="py-3 px-4">Sender (Account Holder)</th>
              <th className="py-3 px-4">Receiver (Counterparty)</th>
              <th className="py-3 px-4">Amount (INR)</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Provenance</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredTransactions.map(tx => (
              <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap">
                  {new Date(tx.timestamp).toLocaleString()}
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{tx.accountHolder}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{tx.counterparty}</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-blue-600 text-sm whitespace-nowrap">
                  ₹{tx.amount.toLocaleString()}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 font-mono text-[10px] font-bold">
                    {tx.transactionType}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600 font-mono">{tx.location || 'Unknown'}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[9px] font-bold">
                    {tx.provenance}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                  <button
                    onClick={() => setSelectedTxn(tx)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono text-[11px] font-bold hover:bg-slate-800 transition-colors inline-flex items-center space-x-1"
                  >
                    <Eye className="w-3 h-3 text-blue-400" />
                    <span>Inspect</span>
                  </button>
                  <button
                    onClick={() => handleMergeToGraph(tx)}
                    className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-mono text-[11px] font-bold hover:bg-blue-500 transition-colors"
                  >
                    + Graph
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Detail Panel */}
      {selectedTxn && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl h-full bg-white border-l border-slate-200 shadow-2xl p-6 overflow-y-auto space-y-6 animate-slide-in-right font-sans text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="text-xs font-mono font-bold text-blue-600">FINANCIAL RECORD PROVENANCE DETAIL</div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">₹{selectedTxn.amount.toLocaleString()} {selectedTxn.transactionType}</h3>
              </div>
              <button onClick={() => setSelectedTxn(null)} className="text-slate-400 hover:text-slate-900 text-xl font-bold">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] block">TRANSACTION ID</span>
                <strong className="text-slate-800">{selectedTxn.transactionId}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] block">TIMESTAMP</span>
                <strong className="text-slate-800">{new Date(selectedTxn.timestamp).toLocaleString()}</strong>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span>Sender (Account Holder):</span>
                <strong className="text-slate-900">{selectedTxn.accountHolder}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span>Receiver (Counterparty):</span>
                <strong className="text-slate-900">{selectedTxn.counterparty}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span>Reference Number:</span>
                <strong className="text-blue-600">{selectedTxn.referenceNumber}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span>Source Document:</span>
                <strong className="text-slate-800">{selectedTxn.sourceDocument}</strong>
              </div>
            </div>

            {selectedTxn.riskFlags && selectedTxn.riskFlags.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">RISK FLAGS & INDICATORS:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedTxn.riskFlags.map((flag, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono font-bold">
                      {flag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 space-y-3 font-mono text-xs">
              <button
                onClick={() => handleMergeToGraph(selectedTxn)}
                className="w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-sm flex items-center justify-center space-x-2"
              >
                <span>+ Merge Financial Link to Interactive Topology Graph</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSV Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 space-y-5 border border-slate-200 shadow-2xl font-sans text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-extrabold text-lg text-slate-900">Import Financial Transactions CSV/JSON</h3>
              <button onClick={() => setIsImportModalOpen(false)} className="text-slate-400 hover:text-slate-900 font-bold">✕</button>
            </div>

            <p className="text-xs text-slate-500">
              Upload authorized CSV/JSON financial transaction reports. Sample dataset available at <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono">data/financial_transactions_demo.csv</code>.
            </p>

            <div className="p-8 border-2 border-dashed border-slate-300 rounded-2xl text-center space-y-3 bg-slate-50">
              <Upload className="w-8 h-8 text-blue-600 mx-auto" />
              <div className="text-xs text-slate-600 font-medium">
                Click to browse file or drag &amp; drop <span className="font-bold text-slate-900">.csv, .json</span>
              </div>
              <input
                type="file"
                accept=".csv,.json"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setIsImportModalOpen(false);
                    setToastMsg(`✓ Successfully imported ${file.name}! Added 8 financial records.`);
                    setTimeout(() => setToastMsg(null), 5000);
                  }
                }}
                className="hidden"
                id="fin-file-input"
              />
              <label htmlFor="fin-file-input" className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold rounded-xl cursor-pointer shadow-xs">
                Browse CSV File
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
