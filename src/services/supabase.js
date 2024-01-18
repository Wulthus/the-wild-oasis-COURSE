import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://odbnztnzjrvkfwfdebyv.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kYm56dG56anJ2a2Z3ZmRlYnl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMzU2NzYsImV4cCI6MjAxNjkxMTY3Nn0.bgWsre_1jmIgzfcL7XAZ0L8b_n2h0eTBf-FSTc7dZLw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;