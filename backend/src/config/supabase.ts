import { createClient, SupabaseClient } from '@supabase/supabase-js';
import env from './env.js';

const supabase: SupabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

export default supabase;
