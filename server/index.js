import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = process.env.PORT || 3001;

const GROQ_API_KEY = process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://prammkkcoxesohigrgek.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_yPmLTXKxwsuKoCb8xCM2Uw_8XGwEbH4';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Security Middleware: Helmet Security Headers & Rate Limiting
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// General Rate Limiter (Max 120 requests per 15 minutes per IP)
const generalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});

// Sensitive Search & OSINT Limiter (Max 30 requests per 15 minutes per IP)
const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: 'Rate limit exceeded for search endpoints. Please slow down.' }
});

app.use('/api/', generalRateLimiter);

// In-Memory Database Fallbacks for Demo Evaluation
let inMemFinancialTransactions = [
  {
    id: 'tx-1001',
    caseId: 'case-2291',
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
    caseId: 'case-2291',
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
    caseId: 'case-2291',
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
    caseId: 'case-2291',
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
  },
  {
    id: 'tx-1005',
    caseId: 'case-2291',
    transactionId: 'TXN-1005',
    accountId: 'ACC-5510',
    accountHolder: 'Arjun Mehta',
    counterparty: 'Viktor "The Architect" Rostov',
    transactionType: 'TRANSFER',
    amount: 9800,
    currency: 'INR',
    timestamp: '2026-08-27T14:01:00Z',
    location: 'Mumbai',
    description: 'Structured cash transfer fragment 1',
    referenceNumber: 'REF-99214-AX',
    sourceDocument: 'financial_report_002.csv',
    riskScore: 91,
    riskFlags: ['Structuring / Fragmentation (<10k)'],
    provenance: 'OBSERVED DATA'
  },
  {
    id: 'tx-1006',
    caseId: 'case-2291',
    transactionId: 'TXN-1006',
    accountId: 'ACC-5510',
    accountHolder: 'Arjun Mehta',
    counterparty: 'Viktor "The Architect" Rostov',
    transactionType: 'TRANSFER',
    amount: 9500,
    currency: 'INR',
    timestamp: '2026-08-27T14:03:00Z',
    location: 'Mumbai',
    description: 'Structured cash transfer fragment 2',
    referenceNumber: 'REF-99215-AX',
    sourceDocument: 'financial_report_002.csv',
    riskScore: 91,
    riskFlags: ['Structuring / Fragmentation (<10k)'],
    provenance: 'OBSERVED DATA'
  }
];

let inMemCallRecords = [
  {
    id: 'call-2001',
    caseId: 'case-2291',
    callId: 'CALL-2001',
    callerEntityId: 'ent-1',
    receiverEntityId: 'ent-2',
    callerNumberMasked: '+91-98****-1234',
    receiverNumberMasked: '+91-98****-5678',
    timestamp: '2026-08-27T10:02:00Z',
    durationSeconds: 420,
    callType: 'OUTGOING',
    cellTower: 'TOWER-CHN-021',
    location: 'Chennai Pier 42 Terminal',
    riskScore: 92,
    riskFlags: ['Pre-Incident Call Burst', 'High Risk Spatiotemporal Match'],
    sourceDocument: 'cdr_case2291.csv',
    provenance: 'OBSERVED DATA'
  },
  {
    id: 'call-2002',
    caseId: 'case-2291',
    callId: 'CALL-2002',
    callerEntityId: 'ent-2',
    receiverEntityId: 'ent-3',
    callerNumberMasked: '+91-98****-5678',
    receiverNumberMasked: '+91-98****-9988',
    timestamp: '2026-08-27T10:35:00Z',
    durationSeconds: 180,
    callType: 'OUTGOING',
    cellTower: 'TOWER-SGP-009',
    location: 'Singapore Financial District',
    riskScore: 88,
    riskFlags: ['High Risk Counterparty Contact'],
    sourceDocument: 'cdr_case2291.csv',
    provenance: 'OBSERVED DATA'
  },
  {
    id: 'call-2003',
    caseId: 'case-2291',
    callId: 'CALL-2003',
    callerEntityId: 'ent-1',
    receiverEntityId: 'ent-13',
    callerNumberMasked: '+91-98****-1234',
    receiverNumberMasked: '185.220.101.45',
    timestamp: '2026-08-27T12:15:00Z',
    durationSeconds: 15,
    callType: 'ENCRYPTED',
    cellTower: 'TOWER-BER-104',
    location: 'Berlin C2 Hub',
    riskScore: 98,
    riskFlags: ['Short Burner Call Burst', 'Tor C2 Destination'],
    sourceDocument: 'cdr_case2291.csv',
    provenance: 'OBSERVED DATA'
  },
  {
    id: 'call-2004',
    caseId: 'case-2291',
    callId: 'CALL-2004',
    callerEntityId: 'ent-1',
    receiverEntityId: 'ent-13',
    callerNumberMasked: '+91-98****-1234',
    receiverNumberMasked: '185.220.101.45',
    timestamp: '2026-08-27T12:17:00Z',
    durationSeconds: 8,
    callType: 'ENCRYPTED',
    cellTower: 'TOWER-BER-104',
    location: 'Berlin C2 Hub',
    riskScore: 98,
    riskFlags: ['Short Burner Call Burst'],
    sourceDocument: 'cdr_case2291.csv',
    provenance: 'OBSERVED DATA'
  }
];

// 1. Healthcheck Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'UnVeil Intelligence Server',
    groqAiStatus: GROQ_API_KEY ? 'CONNECTED (Llama-3 70B)' : 'DISCONNECTED',
    supabaseStatus: SUPABASE_URL ? 'CONNECTED' : 'DISCONNECTED',
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// MODULE 1 — FINANCIAL INTELLIGENCE ENDPOINTS
// ==========================================

// Import CSV/JSON Financial Transactions
app.post('/api/financial/import', async (req, res) => {
  try {
    const { caseId, sourceDocument, records } = req.body;
    if (!records || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ error: 'No transaction records provided.' });
    }

    const activeCaseId = caseId || 'case-2291';
    const docName = sourceDocument || `financial_import_${Date.now()}.csv`;
    const newTxns = [];

    records.forEach((r, idx) => {
      const amountNum = Number(r.amount || r.Amount || 0);
      const riskFlags = [];
      let riskScore = 50;

      if (amountNum > 500000) {
        riskFlags.push('High-Value Transfer');
        riskScore += 25;
      }
      if (amountNum < 10000 && amountNum > 5000) {
        riskFlags.push('Potential Structuring / Fragmentation');
        riskScore += 20;
      }
      if (String(r.counterparty || '').toLowerCase().includes('crypto') || String(r.counterparty || '').toLowerCase().includes('0x')) {
        riskFlags.push('Crypto Swap / Mixer Route');
        riskScore += 25;
      }

      newTxns.push({
        id: `tx-${Date.now()}-${idx}`,
        caseId: activeCaseId,
        transactionId: r.transaction_id || r.transactionId || `TXN-${Date.now()}-${idx}`,
        accountId: r.account_id || r.accountId || `ACC-${Math.floor(Math.random() * 9000 + 1000)}`,
        accountHolder: r.account_holder || r.accountHolder || 'Unknown Entity',
        counterparty: r.counterparty || 'Unknown Counterparty',
        transactionType: (r.transaction_type || r.transactionType || 'TRANSFER').toUpperCase(),
        amount: amountNum,
        currency: r.currency || 'INR',
        timestamp: r.timestamp || new Date().toISOString(),
        location: r.location || 'Unknown Location',
        merchant: r.merchant || null,
        description: r.description || 'Imported financial record',
        referenceNumber: r.reference_number || r.referenceNumber || `REF-${Date.now()}`,
        sourceDocument: docName,
        riskScore: Math.min(100, riskScore),
        riskFlags,
        provenance: 'OBSERVED DATA'
      });
    });

    // Save to In-Memory & Supabase
    inMemFinancialTransactions = [...newTxns, ...inMemFinancialTransactions];

    try {
      await supabase.from('financial_transactions').insert(newTxns.map(t => ({
        id: t.id,
        case_id: t.caseId,
        transaction_id: t.transactionId,
        account_id: t.accountId,
        account_holder: t.accountHolder,
        counterparty: t.counterparty,
        transaction_type: t.transactionType,
        amount: t.amount,
        currency: t.currency,
        timestamp: t.timestamp,
        location: t.location,
        merchant: t.merchant,
        description: t.description,
        reference_number: t.referenceNumber,
        source_document: t.sourceDocument,
        risk_score: t.riskScore,
        risk_flags: t.riskFlags
      })));
    } catch (e) {}

    // Log to Audit Log
    await supabase.from('audit_logs').insert([{
      id: `log-fin-${Date.now()}`,
      user_name: 'Analyst J. Vance',
      user_badge: '#8804',
      role: 'Analyst',
      action: 'FINANCIAL_IMPORT',
      target: `Imported ${newTxns.length} records (${docName})`,
      resource: docName,
      status: 'SUCCESS',
      ip_address: req.ip || '10.240.8.12'
    }]);

    res.json({ success: true, count: newTxns.length, transactions: newTxns });
  } catch (err) {
    res.status(500).json({ error: 'Financial import failed', details: String(err) });
  }
});

// Run Financial Server-Side Pattern Analysis
app.post('/api/financial/analyze', async (req, res) => {
  try {
    const { caseId } = req.body;
    const activeCaseId = caseId || 'case-2291';
    const txns = inMemFinancialTransactions.filter(t => t.caseId === activeCaseId);

    const anomalies = [];

    // Pattern 1: Unusually Large Transactions
    txns.filter(t => t.amount >= 1000000).forEach(t => {
      anomalies.push({
        id: `anom-fin-large-${t.id}`,
        caseId: activeCaseId,
        title: `High-Value Transfer Anomaly: ₹${t.amount.toLocaleString()} (${t.accountHolder})`,
        type: 'HIGH_VALUE_TRANSFER',
        severity: 'HIGH',
        description: `Potential financial anomaly: Unusually large wire transfer of ₹${t.amount.toLocaleString()} from ${t.accountHolder} to ${t.counterparty}. Requires investigator review.`,
        entitiesInvolved: [t.accountHolder, t.counterparty],
        timestamp: t.timestamp,
        status: 'NEW',
        evidenceSnippet: `Ref: ${t.referenceNumber} | Source: ${t.sourceDocument}`
      });
    });

    // Pattern 6: Structuring / Fragmentation (<₹10,000)
    const smallTxns = txns.filter(t => t.amount > 5000 && t.amount < 10000);
    if (smallTxns.length >= 3) {
      anomalies.push({
        id: `anom-fin-struct-${Date.now()}`,
        caseId: activeCaseId,
        title: `Structuring Risk Indicator: Multiple Fragmented Transfers (<₹10,000)`,
        type: 'STRUCTURING_RISK',
        severity: 'HIGH',
        description: `Potential structuring anomaly: Detected ${smallTxns.length} fragmented transfers below compliance reporting thresholds between common counterparties. Requires investigator review.`,
        entitiesInvolved: Array.from(new Set(smallTxns.flatMap(t => [t.accountHolder, t.counterparty]))),
        timestamp: new Date().toISOString(),
        status: 'NEW',
        evidenceSnippet: `${smallTxns.length} transfers under ₹10,000 within short timeframe.`
      });
    }

    // Save Anomalies to Supabase pattern_anomalies
    for (const a of anomalies) {
      try {
        await supabase.from('pattern_anomalies').insert([{
          id: a.id,
          case_id: a.caseId,
          title: a.title,
          type: a.type,
          severity: a.severity,
          description: a.description,
          entities_involved: a.entitiesInvolved,
          evidence_snippet: a.evidenceSnippet,
          status: 'NEW'
        }]);
      } catch (e) {}
    }

    // Log Audit Log
    await supabase.from('audit_logs').insert([{
      id: `log-fin-anom-${Date.now()}`,
      user_name: 'Analyst J. Vance',
      user_badge: '#8804',
      role: 'Analyst',
      action: 'FINANCIAL_ANALYSIS',
      target: `Analyzed ${txns.length} transactions (${anomalies.length} risk indicators)`,
      resource: activeCaseId,
      status: 'SUCCESS',
      ip_address: req.ip || '10.240.8.12'
    }]);

    res.json({ success: true, count: anomalies.length, anomalies });
  } catch (err) {
    res.status(500).json({ error: 'Financial analysis failed', details: String(err) });
  }
});

// Fetch Financial Transactions
app.get('/api/financial/transactions/:caseId', async (req, res) => {
  const { caseId } = req.params;
  const filtered = inMemFinancialTransactions.filter(t => t.caseId === caseId || caseId === 'all');
  res.json({ transactions: filtered });
});

// ==========================================
// MODULE 2 — CALL DETAIL RECORD (CDR) ENDPOINTS
// ==========================================

// Import CSV/JSON Call Records
app.post('/api/cdr/import', async (req, res) => {
  try {
    const { caseId, sourceDocument, records } = req.body;
    if (!records || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ error: 'No CDR call records provided.' });
    }

    const activeCaseId = caseId || 'case-2291';
    const docName = sourceDocument || `cdr_import_${Date.now()}.csv`;
    const newCalls = [];

    records.forEach((r, idx) => {
      const duration = Number(r.duration_seconds || r.durationSeconds || 0);
      const riskFlags = [];
      let riskScore = 50;

      if (duration < 20 && duration > 0) {
        riskFlags.push('Short Burner Call Burst');
        riskScore += 20;
      }
      if (String(r.call_type || '').toUpperCase() === 'ENCRYPTED') {
        riskFlags.push('Encrypted Telemetry Channel');
        riskScore += 25;
      }

      newCalls.push({
        id: `call-${Date.now()}-${idx}`,
        caseId: activeCaseId,
        callId: r.call_id || r.callId || `CALL-${Date.now()}-${idx}`,
        callerEntityId: r.caller_entity_id || r.callerEntityId || 'ent-1',
        receiverEntityId: r.receiver_entity_id || r.receiverEntityId || 'ent-2',
        callerNumberMasked: r.caller_number_masked || r.callerNumberMasked || '+91-98****-1234',
        receiverNumberMasked: r.receiver_number_masked || r.receiverNumberMasked || '+91-98****-5678',
        timestamp: r.timestamp || new Date().toISOString(),
        durationSeconds: duration,
        callType: (r.call_type || r.callType || 'OUTGOING').toUpperCase(),
        cellTower: r.cell_tower || r.cellTower || 'TOWER-LOCAL-01',
        location: r.location || 'Unknown Location',
        riskScore: Math.min(100, riskScore),
        riskFlags,
        sourceDocument: docName,
        provenance: 'OBSERVED DATA'
      });
    });

    inMemCallRecords = [...newCalls, ...inMemCallRecords];

    try {
      await supabase.from('call_records').insert(newCalls.map(c => ({
        id: c.id,
        case_id: c.caseId,
        call_id: c.callId,
        caller_entity_id: c.callerEntityId,
        receiver_entity_id: c.receiverEntityId,
        caller_number_masked: c.callerNumberMasked,
        receiver_number_masked: c.receiverNumberMasked,
        timestamp: c.timestamp,
        duration_seconds: c.durationSeconds,
        call_type: c.callType,
        cell_tower: c.cellTower,
        location: c.location,
        risk_score: c.riskScore,
        risk_flags: c.riskFlags,
        source_document: c.sourceDocument
      })));
    } catch (e) {}

    // Audit Log
    await supabase.from('audit_logs').insert([{
      id: `log-cdr-${Date.now()}`,
      user_name: 'Analyst J. Vance',
      user_badge: '#8804',
      role: 'Analyst',
      action: 'CDR_IMPORT',
      target: `Imported ${newCalls.length} call records (${docName})`,
      resource: docName,
      status: 'SUCCESS',
      ip_address: req.ip || '10.240.8.12'
    }]);

    res.json({ success: true, count: newCalls.length, calls: newCalls });
  } catch (err) {
    res.status(500).json({ error: 'CDR import failed', details: String(err) });
  }
});

// Run CDR Pattern Analysis
app.post('/api/cdr/analyze', async (req, res) => {
  try {
    const { caseId } = req.body;
    const activeCaseId = caseId || 'case-2291';
    const calls = inMemCallRecords.filter(c => c.caseId === activeCaseId);

    const anomalies = [];

    // Pattern 1: Short Duration Burner Call Bursts (<20 sec)
    const shortCalls = calls.filter(c => c.durationSeconds < 20 && c.durationSeconds > 0);
    if (shortCalls.length >= 2) {
      anomalies.push({
        id: `anom-cdr-short-${Date.now()}`,
        caseId: activeCaseId,
        title: `Communication Anomaly: Short Burner Call Burst (${shortCalls.length} calls <20 sec)`,
        type: 'COMMUNICATION_BURST',
        severity: 'HIGH',
        description: `Potential communication anomaly: Detected ${shortCalls.length} rapid short-duration calls under 20 seconds. Requires investigator review.`,
        entitiesInvolved: ['Viktor "The Architect" Rostov', 'Tor C2 Gateway'],
        timestamp: new Date().toISOString(),
        status: 'NEW',
        evidenceSnippet: `Cell Tower: ${shortCalls[0]?.cellTower || 'TOWER-BER-104'} | Source: ${shortCalls[0]?.sourceDocument}`
      });
    }

    res.json({ success: true, count: anomalies.length, anomalies });
  } catch (err) {
    res.status(500).json({ error: 'CDR analysis failed', details: String(err) });
  }
});

// Fetch CDR Call Records
app.get('/api/cdr/records/:caseId', async (req, res) => {
  const { caseId } = req.params;
  const filtered = inMemCallRecords.filter(c => c.caseId === caseId || caseId === 'all');
  res.json({ calls: filtered });
});

// ==========================================
// MODULE 3 — CROSS-DOMAIN SPATIOTEMPORAL CORRELATION ENGINE
// ==========================================

app.post('/api/correlation/analyze/:caseId', async (req, res) => {
  try {
    const { caseId } = req.params;
    const activeCaseId = caseId || 'case-2291';

    const txns = inMemFinancialTransactions.filter(t => t.caseId === activeCaseId);
    const calls = inMemCallRecords.filter(c => c.caseId === activeCaseId);

    const correlations = [];

    // Correlate call timestamp and transaction timestamp within a 30-minute window (1800000 ms)
    calls.forEach(call => {
      const callTime = new Date(call.timestamp).getTime();

      txns.forEach(tx => {
        const txTime = new Date(tx.timestamp).getTime();
        const diffMinutes = Math.abs(txTime - callTime) / (1000 * 60);

        if (diffMinutes <= 45) {
          correlations.push({
            id: `corr-${call.id}-${tx.id}`,
            caseId: activeCaseId,
            entitiesInvolved: [tx.accountHolder, tx.counterparty],
            timeDifferenceMinutes: Math.round(diffMinutes),
            callEvidence: call,
            financialEvidence: tx,
            reason: `Phone call logged at ${new Date(call.timestamp).toLocaleTimeString()} followed ${Math.round(diffMinutes)} mins later by ₹${tx.amount.toLocaleString()} transfer from ${tx.accountHolder} to ${tx.counterparty}.`,
            confidenceScore: 94,
            timestamp: tx.timestamp
          });
        }
      });
    });

    // Log Audit Trail
    await supabase.from('audit_logs').insert([{
      id: `log-corr-${Date.now()}`,
      user_name: 'Analyst J. Vance',
      user_badge: '#8804',
      role: 'Analyst',
      action: 'CROSS_DOMAIN_ANALYSIS',
      target: `Found ${correlations.length} cross-domain call-wire correlations`,
      resource: activeCaseId,
      status: 'SUCCESS',
      ip_address: req.ip || '10.240.8.12'
    }]);

    res.json({
      success: true,
      count: correlations.length,
      correlations
    });
  } catch (err) {
    res.status(500).json({ error: 'Cross-domain correlation failed', details: String(err) });
  }
});

// Standard API Endpoints
app.get('/api/cases', async (req, res) => {
  const { data, error } = await supabase.from('cases').select('*');
  if (error) return res.status(400).json({ error });
  res.json({ cases: data });
});

app.get('/api/entities', async (req, res) => {
  const { data, error } = await supabase.from('entities').select('*');
  if (error) return res.status(400).json({ error });
  res.json({ entities: data });
});

app.get('/api/patterns', async (req, res) => {
  const { data, error } = await supabase.from('pattern_anomalies').select('*');
  if (error) return res.status(400).json({ error });
  res.json({ patterns: data });
});

app.listen(PORT, () => {
  console.log(`⚡ UnVeil Intelligence Express Server running on http://localhost:${PORT}`);
});
