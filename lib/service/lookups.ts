/**
 * Service Smart - Lookup Tables (Reference Data)
 * Read-only queries for dropdowns, statuses, types, categories
 */

import { serviceSupabase } from './supabase';
import type {
  ServiceStatus,
  ServicePartStatus,
  ServiceTransactionType,
  ServiceTransactionCategory,
  ServiceComponentType,
} from './types';

// ============================================================================
// ERROR HANDLING (inline to avoid circular deps)
// ============================================================================

function handleError<T>(error: Error | null, data: T | null): T {
  if (error) {
    console.error('[Service Client Error]', error);
    throw new Error(error.message);
  }
  return data as T;
}

// ============================================================================
// STATUS & LOOKUP TABLES
// ============================================================================

export async function getStatuses(): Promise<ServiceStatus[]> {
  const { data, error } = await serviceSupabase
    .from('service_statuses')
    .select('*')
    .order('sort_order', { ascending: true });
  return handleError(error, data);
}

export async function getPartStatuses(): Promise<ServicePartStatus[]> {
  const { data, error } = await serviceSupabase
    .from('service_part_statuses')
    .select('*')
    .order('sort_order', { ascending: true });
  return handleError(error, data);
}

export async function getTransactionTypes(): Promise<ServiceTransactionType[]> {
  const { data, error } = await serviceSupabase
    .from('service_transaction_types')
    .select('*');
  return handleError(error, data);
}

export async function getTransactionCategories(): Promise<ServiceTransactionCategory[]> {
  const { data, error } = await serviceSupabase
    .from('service_transaction_categories')
    .select('*');
  return handleError(error, data);
}

export async function getComponentTypes(): Promise<ServiceComponentType[]> {
  const { data, error } = await serviceSupabase
    .from('service_component_types')
    .select('*')
    .order('sort_order', { ascending: true });
  return handleError(error, data);
}