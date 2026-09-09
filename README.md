# 🛡️ UnVeil Intelligence Platform

**UnVeil** is an AI-powered Threat Intelligence, Physical Syndicate Graph Topology, Open-Source Intelligence (OSINT), **Financial Intelligence**, and **Call Detail Record (CDR)** Investigation Platform built with **React + Vite**, **Node.js + Express**, **Supabase (PostgreSQL 15)**, and **Groq AI (Llama-3 70B)**.

---

## 🏛️ System Architecture

```
 ┌─────────────────────────────────────────────────────────────┐
 │                    REACT + VITE FRONTEND                    │
 │               (Single-Page Intelligence UI)                 │
 └──────────────┬──────────────────────────────┬───────────────┘
                │                              │
                ▼                              ▼
 ┌─────────────────────────────┐ ┌─────────────────────────────┐
 │  Node.js + Express API      │ │   Supabase PostgreSQL 15    │
 │  Server (Port 3001)         │ │   Cloud Database            │
 └──────────────┬──────────────┘ └─────────────────────────────┘
                │
                ▼
 ┌─────────────────────────────┐
 │  Groq AI Engine             │
 │  (Llama-3.3 70B Versatile)  │
 └─────────────────────────────┘
```

---

## 💰 Module 1: Financial Intelligence / Transaction Analysis

Analyzes authorized financial transaction records to detect suspicious money laundering patterns:
- **Patterns Detected**:
  1. High-Value Wire Transfers (>₹500,000)
  2. Rapid Movement of Funds between Multiple Accounts
  3. Circular Money Laundering Loops
  4. Structuring / Unusual Transaction Fragmentation (<₹10,000)
  5. Dormant Account Activation Spikes
  6. Crypto Mixer Hops (Tornado Cash / Tether USDT swaps)
- **Data Provenance**: Every transaction explicitly marks provenance level:
  - `OBSERVED DATA` (Raw CSV/JSON telemetry)
  - `AI ANALYSIS` (Groq Llama-3 70B pattern detection)
  - `INVESTIGATOR VERIFIED` (Confirmed by human analyst)

---

## 📞 Module 2: Call Detail Record (CDR) Analysis

Analyzes authorized telecom records to detect communication anomalies:
- **Patterns Detected**:
  1. Communication Bursts
  2. Short-Duration Burner Calls (<20 seconds)
  3. Cell Tower Spatiotemporal Pings
  4. Encrypted Channel Telemetry
- **Privacy Controls**: All phone numbers and account numbers are masked by default (`+91-98****-1234`, `ACC-****-1029`).

---

## ⚡ Module 3: Cross-Domain Spatiotemporal Correlation Engine

Correlates phone call bursts and wire transfers occurring within a **30-minute window** between common entities:
- *Example*: Call logged at 10:02 AM ➔ ₹850,000 wire transfer executed at 10:17 AM.
- Highlighted in UI as **"Potential Cross-Domain Correlation"** requiring investigator review.

---

## 🗄️ Supabase Database Migration (SQL)

Run the following DDL script in your **Supabase SQL Editor** to set up the Financial, CDR, and OSINT tables:

```sql
-- 1. FINANCIAL TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS financial_transactions (
    id VARCHAR(100) PRIMARY KEY,
    case_id VARCHAR(100) REFERENCES cases(id) ON DELETE CASCADE,
    transaction_id VARCHAR(100) NOT NULL,
    account_id VARCHAR(100) NOT NULL,
    account_holder VARCHAR(255) NOT NULL,
    counterparty VARCHAR(255) NOT NULL,
    account_holder_entity_id VARCHAR(100) REFERENCES entities(id) ON DELETE SET NULL,
    counterparty_entity_id VARCHAR(100) REFERENCES entities(id) ON DELETE SET NULL,
    transaction_type VARCHAR(50) NOT NULL,
    amount NUMERIC(15,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255),
    merchant VARCHAR(255),
    description TEXT,
    reference_number VARCHAR(100),
    source_document VARCHAR(255) NOT NULL,
    risk_score INT DEFAULT 50 CHECK (risk_score BETWEEN 0 AND 100),
    risk_flags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CALL DETAIL RECORDS TABLE
CREATE TABLE IF NOT EXISTS call_records (
    id VARCHAR(100) PRIMARY KEY,
    case_id VARCHAR(100) REFERENCES cases(id) ON DELETE CASCADE,
    call_id VARCHAR(100) NOT NULL,
    caller_entity_id VARCHAR(100) REFERENCES entities(id) ON DELETE SET NULL,
    receiver_entity_id VARCHAR(100) REFERENCES entities(id) ON DELETE SET NULL,
    caller_number_masked VARCHAR(100) NOT NULL,
    receiver_number_masked VARCHAR(100) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_seconds INT NOT NULL,
    call_type VARCHAR(50) NOT NULL,
    cell_tower VARCHAR(100),
    location VARCHAR(255),
    risk_score INT DEFAULT 50 CHECK (risk_score BETWEEN 0 AND 100),
    risk_flags TEXT[],
    source_document VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES & RLS
CREATE INDEX IF NOT EXISTS idx_fin_txns_case_id ON financial_transactions(case_id);
CREATE INDEX IF NOT EXISTS idx_cdr_case_id ON call_records(case_id);

ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read/write for financial_transactions" ON financial_transactions FOR ALL USING (true);
CREATE POLICY "Enable read/write for call_records" ON call_records FOR ALL USING (true);
```

---

## ⚡ API Endpoints Reference

### Financial & CDR APIs:
- **`POST /api/financial/import`**: Import CSV/JSON financial transactions.
- **`POST /api/financial/analyze`**: Run server-side financial anomaly analysis.
- **`GET /api/financial/transactions/:caseId`**: Fetch financial transactions.
- **`POST /api/cdr/import`**: Import CSV/JSON call records.
- **`POST /api/cdr/analyze`**: Run server-side CDR call anomaly analysis.
- **`GET /api/cdr/records/:caseId`**: Fetch call records.
- **`POST /api/correlation/analyze/:caseId`**: Execute cross-domain call/wire spatiotemporal correlation analysis.

---

## 🚀 How to Start the Platform

```bash
# 1. Install Dependencies
npm install

# 2. Start Express Backend API Server (Port 3001)
npm run server

# 3. Start React + Vite Frontend App (Port 5173 / 5175)
npm run dev
```

### Synthetic Demo Datasets:
- **`data/financial_transactions_demo.csv`**
- **`data/cdr_demo.csv`**
