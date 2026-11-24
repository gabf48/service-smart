"use client";

import { useState } from "react";
import type {
  ClientDetail,
  ServiceDevice,
  ServiceStatus,
  ServiceComponentType,
  ComponentTypeKey,
  COMPONENT_FIELD_SPECS,
  AnyComponentData,
} from "@/lib/service/types";
import { formatDate, getStatusBadgeStyle } from "@/lib/service/utils";
import { DeviceForm } from "./DeviceForm";
import { ComponentForm } from "./ComponentForm";

interface DeviceCardProps {
  device: ServiceDevice;
  client: ClientDetail;
  statuses: ServiceStatus[];
  componentTypes: ServiceComponentType[];
  COMPONENT_FIELD_SPECS: typeof COMPONENT_FIELD_SPECS;
  onDeviceUpdated: (deviceId: string, data: any) => Promise<void>;
  onDeviceDeleted: (deviceId: string) => Promise<void>;
  onComponentSaved: (deviceId: string, type: ComponentTypeKey, data: AnyComponentData) => Promise<void>;
  onComponentDeleted: (deviceId: string, type: ComponentTypeKey) => Promise<void>;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onStartEdit: (device: ServiceDevice) => void;
  onCancelEdit: () => void;
  onConfirmDelete: (deviceId: string) => void;
  onExecuteDelete: (deviceId: string) => void;
  onCancelDelete: () => void;
  isEditing: boolean;
  isDeleting: boolean;
}

export function DeviceCard({
  device,
  client,
  statuses,
  componentTypes,
  COMPONENT_FIELD_SPECS,
  onDeviceUpdated,
  onDeviceDeleted,
  onComponentSaved,
  onComponentDeleted,
  isExpanded,
  onToggleExpand,
  onStartEdit,
  onCancelEdit,
  onConfirmDelete,
  onExecuteDelete,
  onCancelDelete,
  isEditing,
  isDeleting,
}: DeviceCardProps) {
  const [showComponentForm, setShowComponentForm] = useState<{
    mode: "add" | "edit";
    type: ComponentTypeKey;
    existingData?: AnyComponentData;
  } | null>(null);
  const [componentFormData, setComponentFormData] = useState<AnyComponentData>({});

  const handleEditSubmit = async (data: any) => {
    await onDeviceUpdated(device.id, data);
  };

  const handleDelete = async () => {
    await onDeviceDeleted(device.id);
  };

  const startAddComponent = (type: ComponentTypeKey) => {
    setComponentFormData({});
    setShowComponentForm({ mode: "add", type });
  };

  const startEditComponent = (type: ComponentTypeKey, existingData: AnyComponentData) => {
    setComponentFormData(existingData);
    setShowComponentForm({ mode: "edit", type, existingData });
  };

  const handleComponentChange = (key: string, value: unknown) => {
    setComponentFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleComponentSaved = async (deviceId: string, type: ComponentTypeKey, data: AnyComponentData) => {
    await onComponentSaved(deviceId, type, data);
    setShowComponentForm(null);
    setComponentFormData({});
  };

  const handleComponentDelete = async (deviceId: string, type: ComponentTypeKey) => {
    if (!showComponentForm || showComponentForm.mode !== "edit") return;
    if (!confirm("Ștergi această componentă?")) return;
    await onComponentDeleted(deviceId, type);
    setShowComponentForm(null);
    setComponentFormData({});
  };

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden" data-testid={`service-device-card-${device.id}`}>
      {/* Device Header */}
      <div
        onClick={onToggleExpand}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggleExpand();
          }
        }}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-800 transition-colors cursor-pointer"
        data-testid={`service-device-header-${device.id}`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-2xl flex-shrink-0">📱</span>
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <h4 className="font-medium text-white truncate" data-testid={`service-device-model-${device.id}`}>{device.model}</h4>
            {device.status && (
              <span
                className="px-2 py-0.5 text-xs rounded-full font-medium whitespace-nowrap flex-shrink-0"
                style={getStatusBadgeStyle(device.status.color, device.status.text_color)}
                data-testid={`service-device-status-${device.id}`}
              >
                {device.status.name}
              </span>
            )}
            {!device.status && (
              <span className="px-2 py-0.5 text-xs rounded-full font-medium whitespace-nowrap flex-shrink-0 bg-gray-700 text-gray-400" data-testid={`service-device-status-${device.id}`}>
                Fără status
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500 ml-2 flex-wrap" data-testid={`service-device-meta-${device.id}`}>
            {device.mtm && <span>MTM: <span className="text-gray-400 font-mono">{device.mtm}</span></span>}
            {device.mfg_yr && <span>An: <span className="text-gray-400">{device.mfg_yr}</span></span>}
            {device.serial_number && (
              <span>SN: <span className="text-gray-400 font-mono truncate max-w-[120px]">{device.serial_number}</span></span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-lg transition-transform ${isExpanded ? "rotate-180" : ""}`} data-testid={`service-device-expand-${device.id}`}>▼</span>
          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={onCancelEdit}
                className="p-2 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                title="Anulare"
                data-testid={`service-device-edit-cancel-${device.id}`}
              >
                ✕
              </button>
            </div>
          ) : !isDeleting ? (
            <div className="flex gap-1">
              <button
                onClick={() => onStartEdit(device)}
                className="p-2 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                title="Editează"
                data-testid={`service-device-edit-btn-${device.id}`}
              >
                ✏️
              </button>
              <button
                onClick={() => onConfirmDelete(device.id)}
                className="p-2 hover:bg-red-900/50 rounded text-red-400 hover:text-red-300"
                title="Șterge"
                data-testid={`service-device-delete-btn-${device.id}`}
              >
                🗑️
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => onExecuteDelete(device.id)} className="px-3 py-1 text-sm bg-red-600 hover:bg-red-500 rounded text-white" data-testid={`service-device-delete-confirm-${device.id}`}>
                Confirmă
              </button>
              <button onClick={onCancelDelete} className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded text-white" data-testid={`service-device-delete-cancel-${device.id}`}>
                Anulare
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Device Details / Edit Form */}
      <div className={`overflow-auto transition-all duration-200 relative ${isExpanded ? "max-h-[600px] opacity-100 z-10" : "max-h-0 opacity-0"}`} data-testid={`service-device-details-${device.id}`}>
        {isEditing ? (
          <DeviceForm
            clientId={client.id}
            statuses={statuses}
            initialData={{
              model: device.model,
              mtm: device.mtm,
              serial_number: device.serial_number,
              mfg_yr: device.mfg_yr,
              service_tag: device.service_tag,
              express_service_code: device.express_service_code,
              notes: device.notes,
              status_id: device.status_id,
            }}
            onSubmit={handleEditSubmit}
            onCancel={onCancelEdit}
            isEditing
          />
        ) : (
          <div className="p-4 border-t border-gray-700 space-y-4" data-testid={`service-device-info-${device.id}`}>
            {/* Device Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {device.mtm && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-32">MTM:</span>
                  <span className="text-gray-300 font-mono">{device.mtm}</span>
                </div>
              )}
              {device.serial_number && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-32">Serial:</span>
                  <span className="text-gray-300 font-mono">{device.serial_number}</span>
                </div>
              )}
              {device.mfg_yr && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-32">An:</span>
                  <span className="text-gray-300">{device.mfg_yr}</span>
                </div>
              )}
              {device.service_tag && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-32">Service Tag:</span>
                  <span className="text-gray-300 font-mono">{device.service_tag}</span>
                </div>
              )}
              {device.express_service_code && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-32">Express Code:</span>
                  <span className="text-gray-300 font-mono">{device.express_service_code}</span>
                </div>
              )}
              {device.notes && (
                <div className="md:col-span-2">
                  <span className="text-gray-500">Note:</span>
                  <p className="text-gray-300 mt-1">{device.notes}</p>
                </div>
              )}
            </div>

            {/* Components */}
            <div data-testid={`service-device-components-${device.id}`}>
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-white">
                  {device.component_count || 0} componente salvate · {componentTypes.length} tipuri disponibile
                </h5>
                {componentTypes.length > 0 && (
                  <button
                    onClick={() => startAddComponent(componentTypes[0].key)}
                    className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
                    data-testid={`service-device-add-component-${device.id}`}
                  >
                    + Adaugă componentă
                  </button>
                )}
              </div>
              <p className="text-gray-500 text-sm">
                Pentru a vedea și edita componentele existente, deschide detaliile dispozitivului.
              </p>
            </div>
          </div>
        )}

        {/* Component Form Modal */}
        {showComponentForm && (
          <ComponentForm
            client={client}
            device={device}
            componentTypes={componentTypes}
            COMPONENT_FIELD_SPECS={COMPONENT_FIELD_SPECS}
            onComponentSaved={handleComponentSaved}
            onComponentDeleted={handleComponentDelete}
            onClose={() => setShowComponentForm(null)}
          />
        )}
      </div>
    </div>
  );
}