import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://prammkkcoxesohigrgek.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_yPmLTXKxwsuKoCb8xCM2Uw_8XGwEbH4';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testSupabaseTables() {
  console.log('--- Testing Supabase Connection & Table RLS Status ---');
  
  const tables = ['cases', 'entities', 'pattern_anomalies', 'financial_transactions', 'call_records', 'osint_findings', 'osint_searches'];
  
  for (const table of tables) {
    try {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
      if (error) {
        console.log(`Table '${table}': Status -> ${error.message} (Code: ${error.code})`);
      } else {
        console.log(`✓ Table '${table}': Accessible (Records count: ${count || 0})`);
      }
    } catch (e) {
      console.log(`Table '${table}': Exception -> ${e}`);
    }
  }
}

testSupabaseTables();
