export const SUPABASE_URL =
    'https://cihwrfzhiuhsirmeuezo.supabase.co';

export const SUPABASE_KEY = 'sb_publishable_Q_zlcsPwmxXP7gDY-Gv9Qg_blF35gpK';

export const supabaseClient = supabase.createClient(

    SUPABASE_URL,
    SUPABASE_KEY
);