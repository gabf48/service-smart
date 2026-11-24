/**
 * Service Smart - Data Transformers
 * Pure functions to transform raw Supabase rows into typed domain objects
 */

import type {
  ClientListItem,
  ClientDetail,
  DeviceWithDetails,
  OfferWithDetails,
  ServiceDevice,
  ServicePhoto,
  ServiceOffer,
  ServiceTransaction,
  ServiceClientHistory,
  ServiceClient,
  ServiceStatus,
  ServiceTransactionType,
  ServiceTransactionCategory,
  ServiceDeviceComponent,
} from './types';

interface RawRow {
  [key: string]: unknown;
}

interface RawDevice extends RawRow {
  id: string;
  client_id: string;
  model: string;
  mtm: string;
  mfg_yr: string;
  service_tag: string;
  express_service_code: string;
  serial_number: string;
  notes: string;
  status_id: string | null;
  created_at: string;
  status?: RawRow | null;
  offers?: RawRow[];
  components?: RawRow[];
  photos?: RawRow[];
  client?: RawRow | null;
}

interface RawTransaction extends RawRow {
  type?: RawRow | null;
  device?: RawRow | null;
  device_id?: string | null;
  amount: number | string;
  type_id?: string;
  category_id?: string;
  description?: string;
}

interface RawPhoto extends RawRow {
  device?: RawRow | null;
}

interface RawOffer extends RawRow {
  status?: RawRow | null;
  device?: RawRow | null;
}

// ============================================================================
// DEVICE STATUS TRANSFORMERS
// ============================================================================

export function transformDeviceStatuses(devices: RawDevice[]): Array<{
  id: string;
  model: string;
  status_id: string | null;
  status_name: string;
  status_color: string;
}> {
  const deviceStatuses = devices.map((d) => ({
    id: d.id,
    model: d.model,
    status_id: d.status_id,
    status_name: (d.status?.name as string) || 'Fără status',
    status_color: (d.status?.color as string) || '#8b949e',
  }));

  return deviceStatuses;
}

export function getPrimaryDeviceStatus(
  deviceStatuses: ReturnType<typeof transformDeviceStatuses>
): { status_name: string; status_color: string } | null {
  if (deviceStatuses.length === 0) return null;

  // Find first non-finalized status
  const nonFinalized = deviceStatuses.find(
    (ds) =>
      ds.status_name &&
      !ds.status_name.toLowerCase().includes('finalizat') &&
      !ds.status_name.toLowerCase().includes('anulat')
  );

  const primary = nonFinalized || deviceStatuses[0];
  return {
    status_name: primary.status_name || 'Fără status',
    status_color: primary.status_color || '#8b949e',
  };
}

// ============================================================================
// FINANCIAL TRANSFORMERS
// ============================================================================

export interface DeviceFinancials {
  [deviceId: string]: {
    income: number;
    expense: number;
    profit: number;
  };
}

export function computeDeviceFinancials(
  devices: RawDevice[],
  transactions: RawTransaction[]
): DeviceFinancials {
  const financials: DeviceFinancials = {};

  // Initialize for all devices
  devices.forEach((d) => {
    financials[d.id] = { income: 0, expense: 0, profit: 0 };
  });
  // Also track client-level (no device)
  financials['__client__'] = { income: 0, expense: 0, profit: 0 };

  transactions.forEach((t) => {
    const typeName = t.type?.name as string | undefined;
    const amount = Number(t.amount);
    // Try multiple sources for device_id: direct column, or from nested device join
    const deviceId = (t.device_id as string) || (t.device?.id as string) || '__client__';

    if (!financials[deviceId]) {
      financials[deviceId] = { income: 0, expense: 0, profit: 0 };
    }

    if (typeName === 'Încasare') {
      financials[deviceId].income += amount;
    } else if (typeName === 'Cheltuială') {
      financials[deviceId].expense += amount;
    }
    financials[deviceId].profit = financials[deviceId].income - financials[deviceId].expense;
  });

  return financials;
}

export function computeTotalFinancials(transactions: RawTransaction[]): {
  total_income: number;
  total_expense: number;
  profit: number;
  transaction_count: number;
} {
  const total_income = transactions
    ?.filter((t) => (t.type as RawRow | null)?.name === 'Încasare')
    ?.reduce((sum: number, t) => sum + Number(t.amount), 0) || 0;

  const total_expense = transactions
    ?.filter((t) => (t.type as RawRow | null)?.name === 'Cheltuială')
    ?.reduce((sum: number, t) => sum + Number(t.amount), 0) || 0;

  return {
    total_income,
    total_expense,
    profit: total_income - total_expense,
    transaction_count: transactions?.length || 0,
  };
}

// ============================================================================
// CLIENT LIST TRANSFORMER
// ============================================================================

export function transformClientListItem(row: RawRow): ClientListItem {
  const devices = (row.devices as RawDevice[]) || [];
  const deviceStatuses = transformDeviceStatuses(devices);

  // Fallback: if no device statuses, use client-level status
  let finalDeviceStatuses = deviceStatuses;
  if (deviceStatuses.length === 0 && row.status_id && row.status) {
    finalDeviceStatuses = [{
      id: row.id as string,
      model: '(Client)',
      status_id: row.status_id as string,
      status_name: (row.status as RawRow).name as string,
      status_color: (row.status as RawRow).color as string,
    }];
  }

  const deviceFinancials = computeDeviceFinancials(devices, (row.transactions as RawTransaction[]) || []);
  const totals = computeTotalFinancials((row.transactions as RawTransaction[]) || []);

  return {
    ...row,
    devices: devices.map((d) => d.model).join(', ') || '—',
    device_count: devices.length,
    photo_count: ((row.photos as unknown[]) || []).length,
    total_income: totals.total_income,
    total_expense: totals.total_expense,
    profit: totals.profit,
    device_statuses: finalDeviceStatuses,
    device_financials: deviceFinancials,
  } as ClientListItem;
}

// ============================================================================
// CLIENT DETAIL TRANSFORMER
// ============================================================================

export function transformClientDetail(
  client: ServiceClient,
  devices: RawDevice[],
  photos: RawPhoto[],
  offers: RawOffer[],
  transactions: RawTransaction[],
  history: ServiceClientHistory[]
): ClientDetail {
  const deviceFinancials = computeDeviceFinancials(devices, transactions);
  const totals = computeTotalFinancials(transactions);

  return {
    ...client,
    devices: devices.map((d: RawDevice) => ({
      ...d,
      offer_count: d.offers?.length || 0,
      component_count: d.components?.length || 0,
      photo_count: d.photos?.length || 0,
    })) as (ServiceDevice & { offer_count: number; component_count: number; photo_count: number })[],
    photos: (photos || []).map((p: RawPhoto) => ({
      ...p,
      device_model: p.device?.model as string | undefined,
    })) as ServicePhoto[],
    offers: (offers || []).map((o: RawOffer) => ({
      ...o,
      status: o.status as ServiceStatus | undefined,
      device_model: o.device?.model as string | undefined,
    })) as OfferWithDetails[],
    transactions: transactions.map((t: RawTransaction) => ({
      ...t,
      type: t.type as unknown as ServiceTransactionType,
      category: t.category as unknown as ServiceTransactionCategory | null,
      device: t.device ? { id: t.device.id as string, model: t.device.model as string } : null,
    })) as (ServiceTransaction & { type: ServiceTransactionType; category: ServiceTransactionCategory | null; device?: { id: string; model: string } | null })[],
    history: history || [],
    financial_summary: {
      total_income: totals.total_income,
      total_expense: totals.total_expense,
      profit: totals.profit,
      transaction_count: totals.transaction_count,
    },
    device_financials: deviceFinancials,
  };
}

// ============================================================================
// DEVICE DETAIL TRANSFORMER
// ============================================================================

export function transformDeviceWithDetails(
  device: RawDevice
): DeviceWithDetails {
  return {
    ...device,
    client_name: (device.client as RawRow)?.name as string || '',
    offer_count: device.offers?.length || 0,
    components: (device.components || []) as unknown as ServiceDeviceComponent[],
    photos: (device.photos || []) as unknown as ServicePhoto[],
  } as DeviceWithDetails;
}

// ============================================================================
// OFFER TRANSFORMER
// ============================================================================

export function transformOfferWithDetails(offer: RawOffer): OfferWithDetails {
  return {
    ...offer,
    status: offer.status as ServiceStatus | undefined,
    device_model: offer.device?.model as string | undefined,
  } as OfferWithDetails;
}