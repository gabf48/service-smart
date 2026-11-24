"use client";

import { useState } from "react";
import type { ClientDetail } from "@/lib/service/types";
import { formatDate } from "@/lib/service/utils";

interface ServicePersonalTabProps {
  client: ClientDetail;
  editMode: boolean;
  onSave: (updates: Partial<ClientDetail>) => void;
}

export function ServicePersonalTab({ client, editMode, onSave }: ServicePersonalTabProps) {
  const [formData, setFormData] = useState({
    name: client.name,
    phone: client.phone,
    email: client.email || "",
    address: client.address || "",
    notes: client.notes || "",
  });

  if (editMode) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}
        className="space-y-4"
        data-testid="service-personal-tab-form"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nume client *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              required
              data-testid="service-personal-name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Telefon *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              required
              data-testid="service-personal-phone"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">E-mail</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              data-testid="service-personal-email"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Adresă</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              data-testid="service-personal-address"
            />
          </div>
                  </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Observații interne</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            data-testid="service-personal-notes"
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-700">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
            data-testid="service-personal-save-btn"
          >
            💾 Salvează modificările
          </button>
        </div>
      </form>
    );
  }

  // Read mode
  return (
    <div className="space-y-4" data-testid="service-personal-tab-read">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="text-xs text-gray-500 mb-1">Nume</div>
          <div className="font-medium" data-testid="service-personal-name-read">{client.name}</div>
        </div>
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="text-xs text-gray-500 mb-1">Telefon</div>
          <div className="font-medium" data-testid="service-personal-phone-read">{client.phone}</div>
        </div>
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="text-xs text-gray-500 mb-1">E-mail</div>
          <div className="font-medium" data-testid="service-personal-email-read">{client.email || "—"}</div>
        </div>
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="text-xs text-gray-500 mb-1">Adresă</div>
          <div className="font-medium" data-testid="service-personal-address-read">{client.address || "—"}</div>
        </div>
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="text-xs text-gray-500 mb-1">Creat / Actualizat</div>
          <div className="text-sm text-gray-400" data-testid="service-personal-dates-read">
            {formatDate(client.created_at)} / {formatDate(client.updated_at)}
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <div className="text-xs text-gray-500 mb-1">Observații interne</div>
        <div className="whitespace-pre-wrap" data-testid="service-personal-notes-read">{client.notes || "—"}</div>
      </div>
    </div>
  );
}