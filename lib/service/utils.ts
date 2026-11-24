/**
 * Service Smart - Utility Functions
 */

import { serviceSupabase } from './supabase';
import { getTransactionTypes } from './lookups';
import type { ServiceClientHistory } from './types';

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

export function formatMoney(amount: number | string): string {
  const num = Number(amount);
  if (isNaN(num)) return '0,00 Lei';
  return num.toLocaleString('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Lei';
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '—';
  try {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateString.split('T')[0] || dateString;
  }
}

export function formatDateShort(dateString: string | null | undefined): string {
  if (!dateString) return '—';
  try {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString.split('T')[0] || dateString;
  }
}

export function getStatusBadgeStyle(
  bgColor: string,
  textColor: string = '#ffffff'
): React.CSSProperties {
  // Ensure text color has enough contrast
  const rgb = hexToRgb(bgColor);
  const computedTextColor = rgb && getLuminance(rgb.r, rgb.g, rgb.b) > 0.5 ? '#000000' : textColor;

  return {
    backgroundColor: bgColor,
    color: computedTextColor,
    fontWeight: 600,
    fontSize: '0.7rem',
    padding: '0.2rem 0.5rem',
    borderRadius: '9999px',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

export function handleError<T>(error: Error | null, data: T | null): T {
  if (error) {
    console.error('[Service Client Error]', error);
    throw new Error(error.message);
  }
  return data as T;
}

export function assertAdmin() {
  // TODO: Verifică rolul din auth context (middleware sau server action)
  // Pentru client-side, RLS se ocupă de autorizare
}

// ============================================================================
// FINANCIAL UTILITIES
// ============================================================================

export async function getClientFinancialSummary(clientId: string) {
  const { data, error } = await serviceSupabase
    .from('service_transactions')
    .select('type_id, amount')
    .eq('client_id', clientId);

  if (error) throw new Error(error.message);

  const typeNames = await getTransactionTypes();
  const typeMap = new Map(typeNames.map(t => [t.id, t.name]));

  let total_income = 0;
  let total_expense = 0;

  for (const tx of data || []) {
    const typeName = typeMap.get(tx.type_id);
    if (typeName === 'Încasare') total_income += Number(tx.amount);
    else if (typeName === 'Cheltuială') total_expense += Number(tx.amount);
  }

  return {
    total_income,
    total_expense,
    profit: total_income - total_expense,
    transaction_count: data?.length || 0,
  };
}

// ============================================================================
// SEARCH HELPERS (pentru integrare cu modulul de căutare piese)
// ============================================================================

export interface DeviceOwnerInfo {
  device_id: string;
  model: string;
  mtm: string | null;
  mfg_yr: string | null;
  service_tag: string | null;
  express_service_code: string | null;
  serial_number: string | null;
  client_id: string | null;
  client_name: string | null;
  client_phone: string | null;
}

export async function getDeviceOwner(deviceId: string): Promise<DeviceOwnerInfo | null> {
  const { data, error } = await serviceSupabase
    .from('service_devices')
    .select(`
      *,
      client:service_clients(id, name, phone)
    `)
    .eq('id', deviceId)
    .single();
  if (error) return null;

  return {
    device_id: data.id,
    model: data.model,
    mtm: data.mtm,
    mfg_yr: data.mfg_yr,
    service_tag: data.service_tag,
    express_service_code: data.express_service_code,
    serial_number: data.serial_number,
    client_id: data.client?.id,
    client_name: data.client?.name,
    client_phone: data.client?.phone,
  };
}