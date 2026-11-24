/**
 * Service Smart - History Logging
 */

import { serviceSupabase } from './supabase';
import type { ServiceClientHistory } from './types';

// ============================================================================
// HISTORY
// ============================================================================

export async function getClientHistory(clientId: string, limit = 200): Promise<ServiceClientHistory[]> {
  const { data, error } = await serviceSupabase
    .from('service_client_history')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function logHistory(clientId: string, action: string, details = ''): Promise<void> {
  const { error } = await serviceSupabase
    .from('service_client_history')
    .insert({
      client_id: clientId,
      action,
      details,
    });
  if (error) console.error('Log history error:', error);
}

export async function addIntervention(clientId: string, details: string): Promise<void> {
  await logHistory(clientId, 'Intervenție', details.trim());
}