import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://prammkkcoxesohigrgek.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByYW1ta2tjb3hlc29oaWdyZ2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4MDc2MzgsImV4cCI6MjEwMzM4MzYzOH0.aLpgBmAQR_Rm3Di8XGb9shEJufnbFiUfHAdDKt_rCCc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
