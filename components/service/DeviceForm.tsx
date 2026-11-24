"use client";

import { useState } from "react";
import type {
  ServiceStatus,
  CreateDeviceInput,
  UpdateDeviceInput,
} from "@/lib/service/types";

interface DeviceFormProps {
  clientId: string;
  statuses: ServiceStatus[];
  initialData?: UpdateDeviceInput;
  onSubmit: (data: CreateDeviceInput) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

const DEVICE_FIELDS = [
  { name: "model", label: "Model *", type: "text", required: true, placeholder: "ex: MacBook Pro 14 M3", colSpan: 1 },
  { name: "status_id", label: "Status", type: "select", required: false, placeholder: "", colSpan: 1 },
  { name: "mtm", label: "MTM", type: "text", required: false, placeholder: "ex: A2918", colSpan: 1 },
  { name: "serial_number", label: "Serial Number", type: "text", required: false, placeholder: "ex: C02XYZ123", colSpan: 1 },
  { name: "mfg_yr", label: "An fabricație", type: "text", required: false, placeholder: "ex: 2023", colSpan: 1 },
  { name: "service_tag", label: "Service Tag", type: "text", required: false, placeholder: "ex: ABC123", colSpan: 1 },
  { name: "express_service_code", label: "Express Service Code", type: "text", required: false, placeholder: "ex: 123456789", colSpan: 1 },
  { name: "notes", label: "Note", type: "textarea", required: false, placeholder: "Notițe despre dispozitiv...", colSpan: 2 },
] as const;

export function DeviceForm({
  clientId,
  statuses,
  initialData = {},
  onSubmit,
  onCancel,
  isEditing = false,
}: DeviceFormProps) {
  const [formData, setFormData] = useState<CreateDeviceInput>({
    ...initialData,
    client_id: isEditing ? undefined : clientId,
  } as CreateDeviceInput);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.model?.trim()) return;
    if (isEditing) {
      const { client_id, ...updateData } = formData;
      await onSubmit(updateData as CreateDeviceInput);
    } else {
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 animate-slide-down space-y-3" data-testid="service-device-form">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-white">{isEditing ? "✏️ Editează dispozitiv" : "➕ Adaugă dispozitiv nou"}</h4>
        <button type="button" onClick={onCancel} className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
          ✕
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {DEVICE_FIELDS.map((field) => (
          <div key={field.name} className={field.colSpan === 2 ? "md:col-span-2" : ""}>
            <label className="block text-xs text-gray-400 mb-1">{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                defaultValue={formData[field.name as keyof typeof formData] as string || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="">— Selectează status —</option>
                {statuses.map((s) => (
                  <option key={s.id} value={s.id} style={{ backgroundColor: s.color, color: s.text_color }}>
                    {s.name}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                name={field.name}
                defaultValue={formData[field.name as keyof typeof formData] as string || ""}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder={field.placeholder}
              />
            ) : (
              <input
                name={field.name}
                type="text"
                defaultValue={formData[field.name as keyof typeof formData] as string || ""}
                onChange={handleChange}
                required={field.required}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
          Anulare
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
          {isEditing ? "Salvează" : "Adaugă dispozitiv"}
        </button>
      </div>
    </form>
  );
}