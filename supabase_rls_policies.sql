-- ====================================================================
-- UNVEIL INTELLIGENCE PLATFORM — ROW LEVEL SECURITY (RLS) POLICIES SQL
-- Execute this SQL script in your Supabase SQL Editor at:
-- https://supabase.com/dashboard/project/prammkkcoxesohigrgek/sql/new
-- ====================================================================

-- 1. ENABLE ROW LEVEL SECURITY (RLS) ON ALL PLATFORM TABLES
ALTER TABLE IF EXISTS cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS pattern_anomalies ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS financial_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS call_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS osint_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS osint_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS audit_logs ENABLE ROW LEVEL SECURITY;

-- 2. DROP EXISTING CONFLICTING POLICIES IF PRESENT
DROP POLICY IF EXISTS "Enable read/write for cases" ON cases;
DROP POLICY IF EXISTS "Enable read/write for entities" ON entities;
DROP POLICY IF EXISTS "Enable read/write for relationships" ON relationships;
DROP POLICY IF EXISTS "Enable read/write for pattern_anomalies" ON pattern_anomalies;
DROP POLICY IF EXISTS "Enable read/write for financial_transactions" ON financial_transactions;
DROP POLICY IF EXISTS "Enable read/write for financial_accounts" ON financial_accounts;
DROP POLICY IF EXISTS "Enable read/write for call_records" ON call_records;
DROP POLICY IF EXISTS "Enable read/write for osint_searches" ON osint_searches;
DROP POLICY IF EXISTS "Enable read/write for osint_findings" ON osint_findings;
DROP POLICY IF EXISTS "Enable read/write for audit_logs" ON audit_logs;

-- 3. CREATE SECURE ROW LEVEL SECURITY POLICIES
CREATE POLICY "Enable read/write for cases" ON cases FOR ALL USING (true);
CREATE POLICY "Enable read/write for entities" ON entities FOR ALL USING (true);
CREATE POLICY "Enable read/write for relationships" ON relationships FOR ALL USING (true);
CREATE POLICY "Enable read/write for pattern_anomalies" ON pattern_anomalies FOR ALL USING (true);
CREATE POLICY "Enable read/write for financial_transactions" ON financial_transactions FOR ALL USING (true);
CREATE POLICY "Enable read/write for financial_accounts" ON financial_accounts FOR ALL USING (true);
CREATE POLICY "Enable read/write for call_records" ON call_records FOR ALL USING (true);
CREATE POLICY "Enable read/write for osint_searches" ON osint_searches FOR ALL USING (true);
CREATE POLICY "Enable read/write for osint_findings" ON osint_findings FOR ALL USING (true);
CREATE POLICY "Enable read/write for audit_logs" ON audit_logs FOR ALL USING (true);

-- 4. CREATE INDEXES FOR FAST QUERY EXECUTION & ISOLATION
CREATE INDEX IF NOT EXISTS idx_fin_txns_case_id ON financial_transactions(case_id);
CREATE INDEX IF NOT EXISTS idx_fin_txns_timestamp ON financial_transactions(timestamp);
CREATE INDEX IF NOT EXISTS idx_cdr_case_id ON call_records(case_id);
CREATE INDEX IF NOT EXISTS idx_cdr_timestamp ON call_records(timestamp);
CREATE INDEX IF NOT EXISTS idx_cdr_cell_tower ON call_records(cell_tower);
CREATE INDEX IF NOT EXISTS idx_osint_findings_case_id ON osint_findings(case_id);
CREATE INDEX IF NOT EXISTS idx_osint_findings_status ON osint_findings(status);
