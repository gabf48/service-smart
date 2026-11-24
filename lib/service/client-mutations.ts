/**
 * Service Smart - Client Mutations (INSERT/UPDATE/DELETE operations)
 */

import { serviceSupabase } from './supabase';
import { logHistory } from './history';
import type { CreateClientInput, UpdateClientInput } from './types';

// ============================================================================
// CLIENTS - WRITE
// ============================================================================

export async function createServiceClient(input: CreateClientInput): Promise<string> {
  const { uploaded_files, device, ...clientData } = input;

  const { data: client, error } = await serviceSupabase
    .from('service_clients')
    .insert({
      ...clientData,
      status_id: clientData.status_id || null,
    })
    .select('id')
    .single();
  if (error) throw new Error(error.message);

  // Create initial device if provided
  if (device?.trim()) {
    await serviceSupabase.from('service_devices').insert({
      client_id: client.id,
      model: device.trim(),
    });
  }

  // Upload photos if any
  if (uploaded_files?.length) {
    await uploadPhotos(client.id, uploaded_files);
  }

  // Log history
  await logHistory(client.id, 'Client creat', `Status: ${clientData.status_id ? 'setat' : 'default'}${device ? ` · Dispozitiv: ${device}` : ''}`);

  return client.id;
}

export async function updateClient(clientId: string, input: UpdateClientInput): Promise<void> {
  const { error } = await serviceSupabase
    .from('service_clients')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', clientId);
  if (error) throw new Error(error.message);
}

export async function deleteClient(clientId: string): Promise<void> {
  // Photos sunt șterse cascaded prin FK, dar trebuie să ștergem fișierele din Storage
  const { data: photos } = await serviceSupabase
    .from('service_photos')
    .select('storage_path')
    .eq('client_id', clientId);

  if (photos?.length) {
    const paths = photos.map((p) => p.storage_path);
    await serviceSupabase.storage.from('service-photos').remove(paths);
  }

  const { error } = await serviceSupabase
    .from('service_clients')
    .delete()
    .eq('id', clientId);
  if (error) throw new Error(error.message);
}

export async function setClientStatus(clientId: string, statusId: string): Promise<void> {
  await updateClient(clientId, { status_id: statusId });
  await logHistory(clientId, 'Status schimbat', `Nou status: ${statusId}`);
}

// Import uploadPhotos from photo module (avoid circular dependency)
import { uploadPhotos } from './photo';