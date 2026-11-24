"use client";

import { useState } from "react";
import type {
  ClientDetail,
  ServiceDevice,
  ServiceStatus,
  ServiceComponentType,
  CreateDeviceInput,
  UpdateDeviceInput,
  ComponentTypeKey,
  AnyComponentData,
  COMPONENT_FIELD_SPECS,
} from "@/lib/service/types";
import { DeviceCard } from "./DeviceCard";
import { DeviceForm } from "./DeviceForm";

interface DeviceListProps {
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

export function DeviceList({
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
}: DeviceListProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedDevices, setExpandedDevices] = useState<Set<string>>(new Set());
  const [editingDeviceId, setEditingDeviceId] = useState<string | null>(null);
  const [deletingDeviceId, setDeletingDeviceId] = useState<string | null>(null);

  const toggleDevice = (deviceId: string) => {
    setExpandedDevices((prev) => {
      const next = new Set(prev);
      if (next.has(deviceId)) next.delete(deviceId);
      else next.add(deviceId);
      return next;
    });
  };

  const handleAddDevice = async (data: CreateDeviceInput) => {
    await onDeviceCreated(data);
    setShowAddForm(false);
  };

  const handleEditDevice = async (deviceId: string, data: UpdateDeviceInput) => {
    await onDeviceUpdated(deviceId, data);
    setEditingDeviceId(null);
  };

  const handleDeleteDevice = async (deviceId: string) => {
    await onDeviceDeleted(deviceId);
    setDeletingDeviceId(null);
  };

  const startEditDevice = (device: ServiceDevice) => {
    setEditingDeviceId(device.id);
    setExpandedDevices((prev) => new Set(prev).add(device.id)); // Auto-expand when editing
  };

  const cancelEditDevice = () => {
    setEditingDeviceId(null);
  };

  const confirmDeleteDevice = (deviceId: string) => {
    setDeletingDeviceId(deviceId);
  };

  const cancelDeleteDevice = () => {
    setDeletingDeviceId(null);
  };

  if (devices.length === 0) {
    return (
      <div className="space-y-4" data-testid="service-device-list-empty">
        {showAddForm && (
          <DeviceForm
            clientId={client.id}
            statuses={statuses}
            onSubmit={handleAddDevice}
            onCancel={() => setShowAddForm(false)}
          />
        )}
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            data-testid="service-add-first-device-btn"
          >
            <span className="text-2xl">➕</span>
            <span>Adaugă primul dispozitiv</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="service-device-list">
      <div className="space-y-3">
        {devices.map((device) => {
          const isExpanded = expandedDevices.has(device.id);
          const isEditing = editingDeviceId === device.id;
          const isDeleting = deletingDeviceId === device.id;

          return (
            <DeviceCard
              key={device.id}
              device={device}
              client={client}
              statuses={statuses}
              componentTypes={componentTypes}
              COMPONENT_FIELD_SPECS={COMPONENT_FIELD_SPECS}
              onDeviceUpdated={handleEditDevice}
              onDeviceDeleted={handleDeleteDevice}
              onComponentSaved={onComponentSaved}
              onComponentDeleted={onComponentDeleted}
              isExpanded={isExpanded}
              onToggleExpand={() => toggleDevice(device.id)}
              onStartEdit={startEditDevice}
              onCancelEdit={cancelEditDevice}
              onConfirmDelete={confirmDeleteDevice}
              onExecuteDelete={handleDeleteDevice}
              onCancelDelete={cancelDeleteDevice}
              isEditing={isEditing}
              isDeleting={isDeleting}
            />
          );
        })}
      </div>

      {/* Add Device Form */}
      {showAddForm && (
        <DeviceForm
          clientId={client.id}
          statuses={statuses}
          onSubmit={handleAddDevice}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          data-testid="service-add-device-btn"
        >
          <span className="text-2xl">➕</span>
          <span>Adaugă alt dispozitiv</span>
        </button>
      )}
    </div>
  );
}