"use client";

import { DeviceList } from "./DeviceList";
import type {
  ClientDetail,
  ServiceDevice,
  ServiceComponentType,
  ServiceStatus,
  CreateDeviceInput,
  UpdateDeviceInput,
  ComponentTypeKey,
  AnyComponentData,
  COMPONENT_FIELD_SPECS,
} from "@/lib/service/types";

interface ServiceDeviceCardProps {
  client: ClientDetail;
  devices: ServiceDevice[];
  componentTypes: ServiceComponentType[];
  COMPONENT_FIELD_SPECS: typeof COMPONENT_FIELD_SPECS;
  statuses: ServiceStatus[];
  onDeviceCreated: (device: CreateDeviceInput) => Promise<void>;
  onDeviceUpdated: (deviceId: string, data: UpdateDeviceInput) => Promise<void>;
  onDeviceDeleted: (deviceId: string) => Promise<void>;
  onComponentSaved: (deviceId: string, type: ComponentTypeKey, data: AnyComponentData) => Promise<void>;
  onComponentDeleted: (deviceId: string, type: ComponentTypeKey) => Promise<void>;
}

export function ServiceDeviceCard({
  client,
  devices,
  componentTypes,
  COMPONENT_FIELD_SPECS,
  statuses,
  onDeviceCreated,
  onDeviceUpdated,
  onDeviceDeleted,
  onComponentSaved,
  onComponentDeleted,
}: ServiceDeviceCardProps) {
  return (
    <div data-testid="service-device-card">
      <DeviceList
        client={client}
        devices={devices}
        componentTypes={componentTypes}
        COMPONENT_FIELD_SPECS={COMPONENT_FIELD_SPECS}
        statuses={statuses}
        onDeviceCreated={onDeviceCreated}
        onDeviceUpdated={onDeviceUpdated}
        onDeviceDeleted={onDeviceDeleted}
        onComponentSaved={onComponentSaved}
        onComponentDeleted={onComponentDeleted}
      />
    </div>
  );
}