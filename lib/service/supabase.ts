/**
 * Service Smart - Supabase Client Configuration
 * Shared client instances for the service module
 */

import { createClient } from '@supabase/supabase-js';
import { supabase as browserSupabase } from '../supabase';

// ============================================================================
// SUPABASE CLIENTS
// ============================================================================

// Clientul principal - are sesiunea utilizatorului logat (browser)
export const serviceSupabase = browserSupabase;

// Client cu service role pentru operații admin (server-side only)
export function getServiceRoleClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}