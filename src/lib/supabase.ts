import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Public client — used for read-only menu data (respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client — uses service role key, bypasses RLS (server-side only)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ── Type helpers to map Supabase snake_case → app camelCase ──

export interface DbCategory {
  id: string;
  name_en: string;
  name_ar: string;
  icon: string;
  sort_order?: number;
}

export interface DbMenuItem {
  id: string;
  category_id: string;
  name: string;
  name_ar: string;
  description: string | null;
  description_ar: string | null;
  price: string;
  image: string | null;
  tag: string | null;
  tag_ar: string | null;
  badge: string | null;
  is_available: boolean;
  sort_order?: number;
}
