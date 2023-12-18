import { createClient } from "@supabase/supabase-js";

import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";


export const db = createClient(
    PUBLIC_SUPABASE_URL, 
    PUBLIC_SUPABASE_ANON_KEY,
    {
        auth: {
            detectSessionInUrl: true,
            flowType: 'pkce',
        }
    }
    );