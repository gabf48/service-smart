/**
 * Service Smart - Photo Operations (Supabase Storage)
 */

import { serviceSupabase } from './supabase';
import { logHistory } from './history';
import type { ServicePhoto } from './types';

const PHOTOS_BUCKET = 'service-photos';

// ============================================================================
// PHOTOS - READ
// ============================================================================

export async function getClientPhotos(clientId: string): Promise<ServicePhoto[]> {
  const { data, error } = await serviceSupabase
    .from('service_photos')
    .select(`
      *,
      device:service_devices(model)
    `)
    .eq('client_id', clientId)
    .order('uploaded_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getDevicePhotos(deviceId: string): Promise<ServicePhoto[]> {
  const { data, error } = await serviceSupabase
    .from('service_photos')
    .select('*')
    .eq('device_id', deviceId)
    .order('uploaded_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

// ============================================================================
// PHOTOS - WRITE
// ============================================================================

export async function uploadPhotos(
  clientId: string,
  files: File[],
  deviceId?: string
): Promise<number> {
  let uploaded = 0;

  for (const file of files) {
    const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
    const fileName = `${clientId}_${crypto.randomUUID()}.${ext}`;
    const storagePath = `uploads/${fileName}`;

    const { error: uploadError } = await serviceSupabase.storage
      .from(PHOTOS_BUCKET)
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload photo error:', uploadError);
      continue;
    }

    const { error: dbError } = await serviceSupabase
      .from('service_photos')
      .insert({
        client_id: clientId,
        device_id: deviceId || null,
        storage_path: storagePath,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
      });

    if (dbError) {
      console.error('DB insert photo error:', dbError);
      // Try to clean up storage
      await serviceSupabase.storage.from(PHOTOS_BUCKET).remove([storagePath]);
      continue;
    }

    uploaded++;
  }

  if (uploaded > 0) {
    await logHistory(clientId, 'Poze adăugate', `${uploaded} poză/poze`);
  }

  return uploaded;
}

export async function deletePhoto(photoId: string): Promise<void> {
  const { data: photo } = await serviceSupabase
    .from('service_photos')
    .select('storage_path, client_id')
    .eq('id', photoId)
    .single();

  if (photo) {
    await serviceSupabase.storage.from(PHOTOS_BUCKET).remove([photo.storage_path]);

    const { error } = await serviceSupabase
      .from('service_photos')
      .delete()
      .eq('id', photoId);
    if (error) throw new Error(error.message);

    await logHistory(photo.client_id, 'Poză ștearsă', '');
  }
}

export function getPhotoPublicUrl(storagePath: string): string {
  const { data } = serviceSupabase.storage.from(PHOTOS_BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}