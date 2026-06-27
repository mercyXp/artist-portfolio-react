import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isValidUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

const mockSupabase = {
  from: () => ({
    select: () => ({
      order: () => Promise.resolve({ data: null, error: { message: 'Supabase is not configured' } }),
      then: (cb: any) => cb({ data: null, error: { message: 'Supabase is not configured' } }),
    }),
    insert: () => Promise.resolve({ data: null, error: { message: 'Supabase is not configured' } }),
  }),
};

if (!isValidUrl(supabaseUrl) || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.warn(
      'Supabase credentials are missing or invalid. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY with valid URLs.'
    );
  }
}

export const supabase = isValidUrl(supabaseUrl) && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (mockSupabase as any);
