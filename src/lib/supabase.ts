import { createClient } from '@supabase/supabase-js';

const getSupabaseConfig = () => {
  try {
    const settings = localStorage.getItem('corexa_settings');
    if (settings) {
      const parsed = JSON.parse(settings);
      if (parsed.supabase_url && parsed.supabase_anon_key) {
        return {
          url: parsed.supabase_url,
          key: parsed.supabase_anon_key,
        };
      }
    }
  } catch {
    // Fall back to environment variables below.
  }

  return {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_ANON_KEY,
  };
};

const { url, key } = getSupabaseConfig();

export const supabase = createClient(url, key);
