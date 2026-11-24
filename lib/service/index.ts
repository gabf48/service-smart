/**
 * Service Smart - Main Export
 * Re-exports all service modules for convenient importing
 */

// Supabase client
export { serviceSupabase, getServiceRoleClient } from './supabase';

// Lookups (reference data)
export * from './lookups';

// Transformers (data transformation)
export * from './transformers';

// Client queries & mutations
export * from './client-queries';
export * from './client-mutations';

// Device operations
export * from './device';

// Photo operations (Storage)
export * from './photo';

// Offer operations
export * from './offer';

// Transaction operations
export * from './transaction';

// History logging
export * from './history';

// Utilities
export * from './utils';

// Types (re-export for convenience)
export type {
  ServiceClient,
  ServiceDevice,
  ServicePhoto,
  ServiceDeviceComponent,
  ServiceClientHistory,
  ServiceOffer,
  ServiceTransaction,
  ServiceStatus,
  ServicePartStatus,
  ServiceTransactionType,
  ServiceTransactionCategory,
  ServiceComponentType,
  ClientListItem,
  ClientDetail,
  DeviceWithDetails,
  OfferWithDetails,
  CreateClientInput,
  UpdateClientInput,
  CreateDeviceInput,
  UpdateDeviceInput,
  CreateOfferInput,
  UpdateOfferInput,
  CreateTransactionInput,
  UpdateTransactionInput,
  AddHistoryInput,
  ClientFilters,
  ComponentTypeKey,
  AnyComponentData,
} from './types';