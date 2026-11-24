/**
 * Service Smart - Offer Operations (CRUD)
 */

import { serviceSupabase } from './supabase';
import { logHistory } from './history';
import { transformOfferWithDetails } from './transformers';
import type {
  ServiceOffer,
  OfferWithDetails,
  CreateOfferInput,
  UpdateOfferInput,
} from './types';

// ============================================================================
// OFFERS - READ
// ============================================================================

export async function getClientOffers(clientId: string): Promise<OfferWithDetails[]> {
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
  return (data || []).map(transformOfferWithDetails);
}

export async function getDeviceOffers(deviceId: string): Promise<ServiceOffer[]> {
  const { data, error } = await serviceSupabase
    .from('service_offers')
    .select(`
      *,
      status:service_part_statuses(*)
    `)
    .eq('device_id', deviceId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

// ============================================================================
// OFFERS - WRITE
// ============================================================================

export async function createOffer(input: CreateOfferInput): Promise<string> {
  const { product, part_number, status, quantity, notes, device_id } = input;

  // Get client_id from device
  const { data: device } = await serviceSupabase
    .from('service_devices')
    .select('client_id')
    .eq('id', device_id)
    .single();

  if (!device) throw new Error('Device not found');

  // Get default status if not provided
  let statusId = status;
  if (!statusId) {
    const { data: defaultStatus } = await serviceSupabase
      .from('service_part_statuses')
      .select('id')
      .order('sort_order', { ascending: true })
      .limit(1)
      .single();
    statusId = defaultStatus?.id;
  }

  const { data, error } = await serviceSupabase
    .from('service_offers')
    .insert({
      device_id,
      client_id: device.client_id,
      product_name: product.Produs?.trim() || '',
      price: product.Preț?.trim() || '',
      store: product.Magazin?.trim() || '',
      link: product['Sursă / Link']?.trim() || '',
      image_url: product.Imagine?.trim() || '',
      category: product.Categorie?.trim() || '',
      part_number: part_number?.trim() || '',
      quantity: quantity || 1,
      notes: notes?.trim() || '',
      status_id: statusId,
    })
    .select('id')
    .single();

  if (error) throw new Error(error.message);

  await logHistory(device.client_id, 'Ofertă salvată', `${product.Produs?.substring(0, 70)} · ${statusId}`);
  return data.id;
}

export async function updateOffer(offerId: string, input: UpdateOfferInput): Promise<void> {
  const { error } = await serviceSupabase
    .from('service_offers')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', offerId);
  if (error) throw new Error(error.message);
}

export async function deleteOffer(offerId: string): Promise<void> {
  const { data: offer } = await serviceSupabase
    .from('service_offers')
    .select('client_id, product_name')
    .eq('id', offerId)
    .single();

  const { error } = await serviceSupabase
    .from('service_offers')
    .delete()
    .eq('id', offerId);
  if (error) throw new Error(error.message);

  if (offer) {
    await logHistory(offer.client_id, 'Ofertă ștearsă', offer.product_name);
  }
}