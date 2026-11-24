"use client";

import { useState, useEffect } from "react";
import type {
  ClientDetail,
  ServiceDevice,
  ServiceComponentType,
  ComponentTypeKey,
  AnyComponentData,
  COMPONENT_FIELD_SPECS,
} from "@/lib/service/types";
import { ComponentFields } from "./ComponentFields";

interface ComponentFormProps {
  client: ClientDetail;
  device: ServiceDevice;
  componentTypes: ServiceComponentType[];
  COMPONENT_FIELD_SPECS: typeof COMPONENT_FIELD_SPECS;
  onComponentSaved: (deviceId: string, type: ComponentTypeKey, data: AnyComponentData) => Promise<void>;
  onComponentDeleted: (deviceId: string, type: ComponentTypeKey) => Promise<void>;
  onClose: () => void;
}

type FormMode = "add" | "edit";

interface FormState {
  mode: FormMode;
  type: ComponentTypeKey;
  data: AnyComponentData;
  existingData?: AnyComponentData;
}

export function ComponentForm({
  client,
  device,
  componentTypes,
  COMPONENT_FIELD_SPECS,
  onComponentSaved,
  onComponentDeleted,
  onClose,
}: ComponentFormProps) {
  const [formState, setFormState] = useState<FormState | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const startAdd = (type: ComponentTypeKey) => {
    setFormState({ mode: "add", type, data: {} });
  };

  const startEdit = (type: ComponentTypeKey, existingData: AnyComponentData) => {
    setFormState({ mode: "edit", type, data: { ...existingData }, existingData });
  };

  const handleChange = (key: string, value: unknown) => {
    setFormState((prev) => (prev ? { ...prev, data: { ...prev.data, [key]: value } } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState || submitting) return;

    setSubmitting(true);
    try {
      await onComponentSaved(device.id, formState.type, formState.data);
      setFormState(null);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!formState || formState.mode !== "edit" || submitting) return;
    if (!confirm("Ștergi această componentă?")) return;

    setSubmitting(true);
    try {
      await onComponentDeleted(device.id, formState.type);
      setFormState(null);
    } finally {
      setSubmitting(false);
    }
  };

  const cancel = () => {
    setFormState(null);
    onClose();
  };

  if (!formState) return null;

  const { mode, type, data, existingData } = formState;
  const specs = COMPONENT_FIELD_SPECS[type];
  const compType = componentTypes.find((ct) => ct.key === type);

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mb-4 animate-slide-down">
      <div className="flex items-center justify-between mb-4">
        <h5 className="font-medium text-white">
          {compType?.icon} {mode === "add" ? "Adaugă" : "Editează"} componentă: {compType?.label}
        </h5>
        <button onClick={cancel} className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
          ✕
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          {ComponentFields({
            type,
            data,
            prefix: `${mode}-${type}`,
            onChange: handleChange,
            COMPONENT_FIELD_SPECS,
          })}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          {mode === "edit" && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={submitting}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-colors disabled:opacity-50"
            >
              Șterge
            </button>
          )}
          <button
            type="button"
            onClick={cancel}
            disabled={submitting}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors disabled:opacity-50"
          >
            Anulare
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors disabled:opacity-50"
          >
            {submitting ? "Se salvează..." : "Salvează"}
          </button>
        </div>
      </form>
    </div>
  );
}