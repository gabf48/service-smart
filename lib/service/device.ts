/**
 * Service Smart - Device Operations (CRUD + Components)
 */

import { serviceSupabase } from './supabase';
import { logHistory } from './history';
import { transformDeviceWithDetails } from './transformers';
import type {
  ServiceDevice,
  DeviceWithDetails,
  CreateDeviceInput,
  UpdateDeviceInput,
  ServiceDeviceComponent,
  ComponentTypeKey,
  AnyComponentData,
} from './types';

// ============================================================================
// DEVICES - READ
// ============================================================================

export async function getClientDevices(clientId: string): Promise<ServiceDevice[]> {
  const { data, error } = await serviceSupabase
    .from('service_devices')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getDeviceWithDetails(deviceId: string): Promise<DeviceWithDetails> {
  const { data: device, error } = await serviceSupabase
    .from('service_devices')
    .select(`
      *,
      client:service_clients(name),
      offers:service_offers(id),
      components:service_device_components(*),
      photos:service_photos(*)
    `)
    .eq('id', deviceId)
    .single();
  if (error) throw new Error(error.message);

  return transformDeviceWithDetails(device);
}

// ============================================================================
// DEVICES - WRITE
// ============================================================================

export async function createDevice(input: CreateDeviceInput): Promise<string> {
  const { data, error } = await serviceSupabase
    .from('service_devices')
    .insert(input)
    .select('id')
    .single();
  if (error) throw new Error(error.message);

  await logHistory(input.client_id, 'Dispozitiv adăugat', input.model);
  return data.id;
}

export async function updateDevice(deviceId: string, input: UpdateDeviceInput): Promise<void> {
  const { error } = await serviceSupabase
    .from('service_devices')
    .update(input)
    .eq('id', deviceId);
  if (error) throw new Error(error.message);
}

export async function deleteDevice(deviceId: string): Promise<void> {
  const { error } = await serviceSupabase
    .from('service_devices')
    .delete()
    .eq('id', deviceId);
  if (error) throw new Error(error.message);
}

export async function setDeviceStatus(deviceId: string, statusId: string): Promise<void> {
  const { error } = await serviceSupabase
    .from('service_devices')
    .update({ status_id: statusId, updated_at: new Date().toISOString() })
    .eq('id', deviceId);
  if (error) throw new Error(error.message);

  // Log history - need client_id
  const { data: device } = await serviceSupabase
    .from('service_devices')
    .select('client_id, model')
    .eq('id', deviceId)
    .single();
  if (device) {
    await logHistory(device.client_id, 'Status dispozitiv schimbat', `${device.model}: ${statusId}`);
  }
}

// ============================================================================
// DEVICE COMPONENTS
// ============================================================================

export async function getDeviceComponents(deviceId: string): Promise<ServiceDeviceComponent[]> {
  const { data, error } = await serviceSupabase
    .from('service_device_components')
    .select('*')
    .eq('device_id', deviceId);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function upsertDeviceComponent(
  deviceId: string,
  componentTypeKey: ComponentTypeKey,
  componentData: AnyComponentData
): Promise<void> {
  const { error } = await serviceSupabase
    .from('service_device_components')
    .upsert({
      device_id: deviceId,
      component_type_key: componentTypeKey,
      component_data: componentData,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'device_id,component_type_key',
    });
  if (error) throw new Error(error.message);
}

export async function deleteDeviceComponent(deviceId: string, componentTypeKey: ComponentTypeKey): Promise<void> {
  const { error } = await serviceSupabase
    .from('service_device_components')
    .delete()
    .eq('device_id', deviceId)
    .eq('component_type_key', componentTypeKey);
  if (error) throw new Error(error.message);
}