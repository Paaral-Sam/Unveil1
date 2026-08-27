import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_URL ||
  (import.meta as any).env?.VITE_SUPABASE_URL ||
  'https://prammkkcoxesohigrgek.supabase.co';

const SUPABASE_KEY =
  (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_yPmLTXKxwsuKoCb8xCM2Uw_8XGwEbH4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
