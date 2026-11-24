/**
 * Service Smart - Client Queries (SELECT operations)
 */

import { serviceSupabase } from './supabase';
import type { ClientListItem, ClientDetail, ClientFilters } from './types';
import { transformClientListItem, transformClientDetail } from './transformers';

// ============================================================================
// CLIENTS - READ
// ============================================================================

export async function listClients(filters: ClientFilters = {}): Promise<ClientListItem[]> {
  let query = serviceSupabase
    .from('service_clients')
    .select(`
      *,
      status:service_statuses(name, color),
      devices:service_devices(id, model, status_id, status:service_statuses(name, color)),
      photos:service_photos(id),
      transactions:service_transactions(type_id, amount, device_id, type:service_transaction_types(name), device:service_devices(id, model))
    `)
    .order('created_at', { ascending: false });

  if (filters.search) {
    const search = filters.search.toLowerCase();
    query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%,devices.model.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return (data || []).map(transformClientListItem);
}

export async function listClientsOptimized(filters: ClientFilters = {}): Promise<ClientListItem[]> {
  const { data, error } = await serviceSupabase.rpc('get_clients_list', {
    p_search: filters.search || '',
    p_status_names: filters.status_names || [],
    p_amount_field: filters.amount_field || 'profit',
    p_min_amount: filters.min_amount || null,
    p_max_amount: filters.max_amount || null,
  });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getClient(clientId: string): Promise<ClientDetail> {
  // Fetch client (fără status - statusul e per device)
  const { data: client, error: clientError } = await serviceSupabase
    .from('service_clients')
    .select('*')
    .eq('id', clientId)
    .single();
  if (clientError) throw new Error(clientError.message);

  // Fetch devices with counts și status
  const { data: devices, error: devicesError } = await serviceSupabase
    .from('service_devices')
    .select(`
      *,
      status:service_statuses(*),
      offers:service_offers(id),
      components:service_device_components(id),
      photos:service_photos(id)
    `)
    .eq('client_id', clientId)
    .order('created_at', { ascending: true });
  if (devicesError) throw new Error(devicesError.message);

  // Fetch photos
  const { data: photos, error: photosError } = await serviceSupabase
    .from('service_photos')
    .select(`
      *,
      device:service_devices(model)
    `)
    .eq('client_id', clientId)
    .order('uploaded_at', { ascending: false });
  if (photosError) throw new Error(photosError.message);

  // Fetch offers with status
  const { data: offers, error: offersError } = await serviceSupabase
    .from('service_offers')
    .select(`
      *,
      status:service_part_statuses(*),
      device:service_devices(model)
    `)
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });
  if (offersError) throw new Error(offersError.message);

  // Fetch transactions with type & category
  const { data: transactions, error: txError } = await serviceSupabase
    .from('service_transactions')
    .select(`
      *,
      type:service_transaction_types(*),
      category:service_transaction_categories(*),
      device:service_devices(id, model)
    `)
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });
  if (txError) throw new Error(txError.message);

  // Fetch history
  const { data: history, error: histError } = await serviceSupabase
    .from('service_client_history')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
    .limit(200);
  if (histError) throw new Error(histError.message);

  return transformClientDetail(client, devices || [], photos || [], offers || [], transactions || [], history || []);
}

export async function getClientDevicesList(clientId: string) {
  const { data, error } = await serviceSupabase
    .from('service_devices')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

export async function getClientPhotosList(clientId: string) {
  const { data, error } = await serviceSupabase
    .from('service_photos')
    .select(`
      *,
      device:service_devices(model)
    `)
    .eq('client_id', clientId)
    .order('uploaded_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getClientOffersList(clientId: string) {
  const { data, error } = await serviceSupabase
    .from('service_offers')
    .select(`
      *,
      status:service_part_statuses(*),
      device:service_devices(model)
    `)
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getClientTransactionsList(clientId: string) {
  const { data, error } = await serviceSupabase
    .from('service_transactions')
    .select(`
      *,
      type:service_transaction_types(*),
      category:service_transaction_categories(*)
    `)
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getClientHistoryList(clientId: string, limit = 200) {
  const { data, error } = await serviceSupabase
    .from('service_client_history')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data;
}