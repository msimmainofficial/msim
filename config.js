const SUPABASE_URL = "https://cmtttmuiwgwmdqgcztgc.supabase.co";

const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
