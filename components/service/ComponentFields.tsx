"use client";

import type { ComponentTypeKey, AnyComponentData, COMPONENT_FIELD_SPECS } from "@/lib/service/types";

interface ComponentFieldsProps {
  type: ComponentTypeKey;
  data: AnyComponentData;
  prefix: string;
  onChange: (key: string, value: unknown) => void;
  COMPONENT_FIELD_SPECS: typeof COMPONENT_FIELD_SPECS;
}

export function ComponentFields({
  type,
  data,
  prefix,
  onChange,
  COMPONENT_FIELD_SPECS,
}: ComponentFieldsProps) {
  const specs = COMPONENT_FIELD_SPECS[type];
  if (!specs) return null;

  const dataRecord = data as Record<string, unknown>;

  return specs.map((spec) => {
    const rawValue = dataRecord[spec.key];
    const value = rawValue ?? "";
    const key = `${prefix}-${spec.key}`;

    if (spec.type === "number" && spec.options) {
      const opts = spec.options as { min: number; max: number; step: number };
      return (
        <div key={key} className="mb-3">
          <label className="block text-xs text-gray-400 mb-1">{spec.label}</label>
          <input
            type="number"
            min={opts.min}
            max={opts.max}
            step={opts.step}
            value={value === "" ? "" : String(value)}
            onChange={(e) => onChange(spec.key, e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
      );
    }

    if (spec.type === "select" && spec.options) {
      const opts = spec.options as string[];
      return (
        <div key={key} className="mb-3">
          <label className="block text-xs text-gray-400 mb-1">{spec.label}</label>
          <select
            value={value === "" ? "" : String(value)}
            onChange={(e) => onChange(spec.key, e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="">— Selectează —</option>
            {opts.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );
    }

    // Default: text input
    return (
      <div key={key} className="mb-3">
        <label className="block text-xs text-gray-400 mb-1">{spec.label}</label>
        <input
          type="text"
          value={value === "" ? "" : String(value)}
          onChange={(e) => onChange(spec.key, e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          placeholder={spec.placeholder}
        />
      </div>
    );
  });
}