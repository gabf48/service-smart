"use client";

import type { ClientDetail, ServiceComponentType, ServiceStatus, ServicePartStatus, ComponentTypeKey, AnyComponentData, CreateDeviceInput, UpdateDeviceInput } from "@/lib/service/types";
import { COMPONENT_FIELD_SPECS } from "@/lib/service/types";
import { ServiceDeviceCard } from "./ServiceDeviceCard";
import { ServicePhotosCarousel } from "./ServicePhotosCarousel";
import { ServiceOffersList } from "./ServiceOffersList";
import { ServiceFinancialTab } from "./ServiceFinancialTab";
import { ServiceHistoryTab } from "./ServiceHistoryTab";
import { ServicePersonalTab } from "./ServicePersonalTab";

type SectionKey = "personal" | "devices" | "photos" | "offers" | "financial" | "history";

interface ClientDetailContentProps {
  client: ClientDetail;
  currentSection: SectionKey;
  editMode: boolean;
  componentTypes: ServiceComponentType[];
  statuses: ServiceStatus[];
  partStatuses: ServicePartStatus[];
  onDeviceCreated: (device: CreateDeviceInput) => Promise<void>;
  onDeviceUpdated: (deviceId: string, updates: UpdateDeviceInput) => Promise<void>;
  onDeviceDeleted: (deviceId: string) => Promise<void>;
  onComponentSaved: (deviceId: string, componentTypeKey: ComponentTypeKey, componentData: AnyComponentData) => Promise<void>;
  onComponentDeleted: (deviceId: string, componentTypeKey: ComponentTypeKey) => Promise<void>;
  onPhotosUploaded: (files: File[], deviceId?: string) => Promise<void>;
  onPhotoDeleted: (photoId: string) => Promise<void>;
  onOfferCreated: (offer: any) => Promise<void>;
  onOfferUpdated: (offerId: string, updates: any) => Promise<void>;
  onOfferDeleted: (offerId: string) => Promise<void>;
  onTransactionCreated: (transaction: any) => Promise<void>;
  onTransactionUpdated: (transactionId: string, updates: any) => Promise<void>;
  onTransactionDeleted: (transactionId: string) => Promise<void>;
  onHistoryAdded: (details: string) => Promise<void>;
  onSaveClient: (updates: any) => Promise<void>;
}

export function ClientDetailContent({
  client,
  currentSection,
  editMode,
  componentTypes,
  statuses,
  partStatuses,
  onDeviceCreated,
  onDeviceUpdated,
  onDeviceDeleted,
  onComponentSaved,
  onComponentDeleted,
  onPhotosUploaded,
  onPhotoDeleted,
  onOfferCreated,
  onOfferUpdated,
  onOfferDeleted,
  onTransactionCreated,
  onTransactionUpdated,
  onTransactionDeleted,
  onHistoryAdded,
  onSaveClient,
}: ClientDetailContentProps) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto p-4" data-testid="service-detail-content">
      {currentSection === "personal" && (
        <ServicePersonalTab
          client={client}
          editMode={editMode}
          onSave={onSaveClient}
        />
      )}
      {currentSection === "devices" && (
        <ServiceDeviceCard
          client={client}
          devices={client.devices}
          componentTypes={componentTypes}
          COMPONENT_FIELD_SPECS={COMPONENT_FIELD_SPECS}
          statuses={statuses}
          onDeviceCreated={onDeviceCreated}
          onDeviceUpdated={onDeviceUpdated}
          onDeviceDeleted={onDeviceDeleted}
          onComponentSaved={onComponentSaved}
          onComponentDeleted={onComponentDeleted}
        />
      )}
      {currentSection === "photos" && (
        <ServicePhotosCarousel
          client={client}
          editMode={editMode}
          onUploadPhotos={onPhotosUploaded}
          onDeletePhoto={onPhotoDeleted}
        />
      )}
      {currentSection === "offers" && (
        <ServiceOffersList
          client={client}
          editMode={editMode}
          partStatuses={partStatuses}
          onUpdateOffer={onOfferUpdated}
          onDeleteOffer={onOfferDeleted}
        />
      )}
      {currentSection === "financial" && (
        <ServiceFinancialTab
          client={client}
          editMode={editMode}
          onAddTransaction={onTransactionCreated}
          onUpdateTransaction={onTransactionUpdated}
          onDeleteTransaction={onTransactionDeleted}
        />
      )}
      {currentSection === "history" && (
        <ServiceHistoryTab
          client={client}
          editMode={editMode}
          onAddHistory={onHistoryAdded}
        />
      )}
    </div>
  );
}