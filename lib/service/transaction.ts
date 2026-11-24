/**
 * Service Smart - Transaction Operations (CRUD)
 */

import { serviceSupabase } from './supabase';
import { logHistory } from './history';
import type {
  ServiceTransaction,
  CreateTransactionInput,
  UpdateTransactionInput,
} from './types';

// ============================================================================
// TRANSACTIONS - READ
// ============================================================================

export async function getClientTransactions(clientId: string): Promise<ServiceTransaction[]> {
  const { data, error } = await serviceSupabase
    .from('service_transactions')
    .select(`
      *,
      type:service_transaction_types(*),
      category:service_transaction_categories(*),
      device:service_devices(id, model)
    `)
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

// ============================================================================
// TRANSACTIONS - WRITE
// ============================================================================

export async function createTransaction(input: CreateTransactionInput): Promise<string> {
  // Resolve type_id
  const { data: type } = await serviceSupabase
    .from('service_transaction_types')
    .select('id')
    .eq('name', input.type)
    .single();

  // Resolve category_id
  let categoryId: string | null = null;
  if (input.category) {
    const { data: cat } = await serviceSupabase
      .from('service_transaction_categories')
      .select('id')
      .eq('name', input.category)
      .single();
    categoryId = cat?.id || null;
  }

  const { data, error } = await serviceSupabase
    .from('service_transactions')
    .insert({
      client_id: input.client_id,
      device_id: input.device_id || null,
      type_id: type?.id,
      amount: input.amount,
      category_id: categoryId,
      description: input.description?.trim() || '',
    })
    .select('id')
    .single();

  if (error) throw new Error(error.message);

  await logHistory(
    input.client_id,
    'Tranzacție adăugată',
    `${input.type} ${input.amount.toFixed(2)} Lei · ${input.category || 'Piese'}${input.description ? ` · ${input.description}` : ''}${input.device_id ? ` · Device: ${input.device_id}` : ''}`
  );

  return data.id;
}

export async function updateTransaction(transactionId: string, input: UpdateTransactionInput): Promise<void> {
  const updates: Record<string, unknown> = { ...input, updated_at: new Date().toISOString() };

  if (input.type) {
    const { data: type } = await serviceSupabase
      .from('service_transaction_types')
      .select('id')
      .eq('name', input.type)
      .single();
    updates.type_id = type?.id;
    delete updates.type;
  }

  if (input.category) {
    const { data: cat } = await serviceSupabase
      .from('service_transaction_categories')
      .select('id')
      .eq('name', input.category)
      .single();
    updates.category_id = cat?.id;
    delete updates.category;
  }

  if (input.device_id !== undefined) {
    updates.device_id = input.device_id;
  }

  const { error } = await serviceSupabase
    .from('service_transactions')
    .update(updates)
    .eq('id', transactionId);
  if (error) throw new Error(error.message);
}

export async function deleteTransaction(transactionId: string): Promise<void> {
  const { data: tx } = await serviceSupabase
    .from('service_transactions')
    .select('client_id, type_id, amount, category_id, description')
    .eq('id', transactionId)
    .single();

  const { error } = await serviceSupabase
    .from('service_transactions')
    .delete()
    .eq('id', transactionId);
  if (error) throw new Error(error.message);

  if (tx) {
    // Log history would need type/category names - simplified
    await logHistory(tx.client_id, 'Tranzacție ștearsă', `${tx.amount} Lei`);
  }
}