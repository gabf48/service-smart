"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  ClientDetail,
  ServiceStatus,
  ServicePartStatus,
  ServiceComponentType,
  CreateDeviceInput,
  UpdateDeviceInput,
  ComponentTypeKey,
  AnyComponentData,
} from "@/lib/service/types";
import {
  getStatuses,
  getPartStatuses,
  getComponentTypes,
  getClient,
  updateClient,
  deleteClient,
  createServiceClient,
  createDevice,
  updateDevice,
  deleteDevice,
  upsertDeviceComponent,
  deleteDeviceComponent,
  uploadPhotos,
  deletePhoto,
  createOffer,
  updateOffer,
  deleteOffer,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  logHistory,
} from "@/lib/service/client";

interface UseClientDetailProps {
  clientId: string;
  onClientCreated?: (newClientId: string) => void;
  onClientDeleted?: () => void;
  onTransactionChange?: () => void;
}

interface UseClientDetailReturn {
  client: ClientDetail | null;
  loading: boolean;
  statuses: ServiceStatus[];
  partStatuses: ServicePartStatus[];
  componentTypes: ServiceComponentType[];
  fetchData: () => Promise<void>;
  handleCreateClient: (formData: Partial<ClientDetail>) => Promise<void>;
  handleUpdateClient: (updates: Partial<ClientDetail>) => Promise<void>;
  handleDeleteClient: () => Promise<void>;
  handleDeviceCreated: (device: CreateDeviceInput) => Promise<void>;
  handleDeviceUpdated: (deviceId: string, updates: UpdateDeviceInput) => Promise<void>;
  handleDeviceDeleted: (deviceId: string) => Promise<void>;
  handleComponentSaved: (deviceId: string, componentTypeKey: ComponentTypeKey, componentData: AnyComponentData) => Promise<void>;
  handleComponentDeleted: (deviceId: string, componentTypeKey: ComponentTypeKey) => Promise<void>;
  handlePhotosUploaded: (files: File[], deviceId?: string) => Promise<void>;
  handlePhotoDeleted: (photoId: string) => Promise<void>;
  handleOfferCreated: (offer: any) => Promise<void>;
  handleOfferUpdated: (offerId: string, updates: any) => Promise<void>;
  handleOfferDeleted: (offerId: string) => Promise<void>;
  handleTransactionCreated: (transaction: { type: "Încasare" | "Cheltuială"; amount: number; category?: string; description?: string; device_id?: string }) => Promise<void>;
  handleTransactionUpdated: (transactionId: string, updates: { type?: "Încasare" | "Cheltuială"; amount?: number; category?: string; description?: string; device_id?: string | null }) => Promise<void>;
  handleTransactionDeleted: (transactionId: string) => Promise<void>;
  handleHistoryAdded: (details: string) => Promise<void>;
}

export function useClientDetail({
  clientId,
  onClientCreated,
  onClientDeleted,
  onTransactionChange,
}: UseClientDetailProps): UseClientDetailReturn {
  const [client, setClient] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState<ServiceStatus[]>([]);
  const [partStatuses, setPartStatuses] = useState<ServicePartStatus[]>([]);
  const [componentTypes, setComponentTypes] = useState<ServiceComponentType[]>([]);

  const isNewClient = clientId === "new";

  // Fetch all lookup data and client detail
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // For new clients, only fetch lookup data
      if (isNewClient) {
        const [statusesRes, partStatusesRes, componentTypesRes] = await Promise.all([
          getStatuses(),
          getPartStatuses(),
          getComponentTypes(),
        ]);
        setStatuses(statusesRes);
        setPartStatuses(partStatusesRes);
        setComponentTypes(componentTypesRes);
        // Create a blank client object for the form
        setClient({
          id: "",
          name: "",
          phone: "",
          email: "",
          address: "",
          problem: "",
          notes: "",
          status_id: null,
          status: undefined,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          devices: [],
          photos: [],
          offers: [],
          transactions: [],
          history: [],
          financial_summary: {
            total_income: 0,
            total_expense: 0,
            profit: 0,
            transaction_count: 0,
          },
          device_financials: {},
        } as ClientDetail);
      } else {
        const [statusesRes, partStatusesRes, componentTypesRes, clientRes] = await Promise.all([
          getStatuses(),
          getPartStatuses(),
          getComponentTypes(),
          getClient(clientId),
        ]);

        setStatuses(statusesRes);
        setPartStatuses(partStatusesRes);
        setComponentTypes(componentTypesRes);
        setClient(clientRes);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [clientId, isNewClient]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateClient = async (formData: Partial<ClientDetail>) => {
    const newClientId = await createServiceClient({
      name: formData.name || "",
      phone: formData.phone || "",
      email: formData.email,
      address: formData.address,
      problem: formData.problem,
      notes: formData.notes,
      status_id: formData.status_id ?? undefined,
    });
    if (onClientCreated) {
      onClientCreated(newClientId);
    }
  };

  const handleUpdateClient = async (updates: Partial<ClientDetail>) => {
    await updateClient(clientId, updates);
    setClient((prev) => (prev ? { ...prev, ...updates } : null));
    fetchData(); // Refresh
  };

  const handleDeleteClient = async () => {
    await deleteClient(clientId);
    if (onClientDeleted) {
      onClientDeleted();
    }
  };

  const handleDeviceCreated = async (device: CreateDeviceInput) => {
    await createDevice(device);
    fetchData();
  };

  const handleDeviceUpdated = async (deviceId: string, updates: UpdateDeviceInput) => {
    await updateDevice(deviceId, updates);
    fetchData();
  };

  const handleDeviceDeleted = async (deviceId: string) => {
    await deleteDevice(deviceId);
    fetchData();
  };

  const handleComponentSaved = async (
    deviceId: string,
    componentTypeKey: ComponentTypeKey,
    componentData: AnyComponentData
  ) => {
    await upsertDeviceComponent(deviceId, componentTypeKey, componentData);
    fetchData();
  };

  const handleComponentDeleted = async (deviceId: string, componentTypeKey: ComponentTypeKey) => {
    await deleteDeviceComponent(deviceId, componentTypeKey);
    fetchData();
  };

  const handlePhotosUploaded = async (files: File[], deviceId?: string) => {
    if (files.length > 0) {
      await uploadPhotos(clientId, files, deviceId);
      fetchData();
    }
  };

  const handlePhotoDeleted = async (photoId: string) => {
    await deletePhoto(photoId);
    fetchData();
  };

  const handleOfferCreated = async (offer: any) => {
    await createOffer(offer);
    fetchData();
  };

  const handleOfferUpdated = async (offerId: string, updates: any) => {
    await updateOffer(offerId, updates);
    fetchData();
  };

  const handleOfferDeleted = async (offerId: string) => {
    await deleteOffer(offerId);
    fetchData();
  };

  const handleTransactionCreated = async (transaction: { type: "Încasare" | "Cheltuială"; amount: number; category?: string; description?: string; device_id?: string }) => {
    await createTransaction({
      client_id: clientId,
      device_id: transaction.device_id,
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
    });
    fetchData();
    onTransactionChange?.();
  };

  const handleTransactionUpdated = async (transactionId: string, updates: { type?: "Încasare" | "Cheltuială"; amount?: number; category?: string; description?: string; device_id?: string | null }) => {
    await updateTransaction(transactionId, updates);
    fetchData();
    onTransactionChange?.();
  };

  const handleTransactionDeleted = async (transactionId: string) => {
    await deleteTransaction(transactionId);
    fetchData();
    onTransactionChange?.();
  };

  const handleHistoryAdded = async (details: string) => {
    await logHistory(clientId, "Intervenție", details);
    fetchData();
  };

  return {
    client,
    loading,
    statuses,
    partStatuses,
    componentTypes,
    fetchData,
    handleCreateClient,
    handleUpdateClient,
    handleDeleteClient,
    handleDeviceCreated,
    handleDeviceUpdated,
    handleDeviceDeleted,
    handleComponentSaved,
    handleComponentDeleted,
    handlePhotosUploaded,
    handlePhotoDeleted,
    handleOfferCreated,
    handleOfferUpdated,
    handleOfferDeleted,
    handleTransactionCreated,
    handleTransactionUpdated,
    handleTransactionDeleted,
    handleHistoryAdded,
  };
}