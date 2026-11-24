"use client";

import { useState } from "react";
import type { ClientDetail, ServiceClientHistory } from "@/lib/service/types";
import { formatDateShort } from "@/lib/service/utils";

interface ServiceHistoryTabProps {
  client: ClientDetail;
  editMode: boolean;
  onAddHistory: (details: string) => Promise<void>;
}

export function ServiceHistoryTab({ client, editMode, onAddHistory }: ServiceHistoryTabProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDetails, setNewDetails] = useState("");

  const history = client.history || [];

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDetails.trim()) return;
    await onAddHistory(newDetails.trim());
    setNewDetails("");
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4" data-testid="service-history-tab">
      {/* Add Intervention Form */}
      {editMode && (
        <details className={showAddForm ? "open" : ""} data-testid="service-history-add-form">
          <summary className="cursor-pointer p-3 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center justify-between" data-testid="service-history-add-toggle">
            <span className="font-medium">➕ Adaugă intervenție</span>
            <span className="text-gray-400">▼</span>
          </summary>
          <form onSubmit={handleAddSubmit} className="p-4 space-y-3 border-t border-gray-700" data-testid="service-history-add-form-inner">
            <textarea
              value={newDetails}
              onChange={(e) => setNewDetails(e.target.value)}
              placeholder="Descriere intervenție (ex. Verificat sursa, înlocuit condensatorul C12...)"
              rows={3}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              required
              data-testid="service-history-details"
            />
            <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium" data-testid="service-history-add-submit">
              💾 Adaugă intervenție
            </button>
          </form>
        </details>
      )}

      {/* History List */}
      {history.length === 0 ? (
        <div className="text-center py-12 text-gray-500" data-testid="service-history-empty">
          <div className="text-4xl mb-2">🕘</div>
          <p>Încă nu există evenimente în istoric.</p>
          {editMode && <p className="text-sm mt-2">Completează formularul de mai sus pentru a adăuga prima intervenție.</p>}
        </div>
      ) : (
        <div className="space-y-3" data-testid="service-history-list">
          {history.map((entry) => (
            <div key={entry.id} className="bg-gray-800/50 rounded-lg border border-gray-700 p-4" data-testid={`service-history-entry-${entry.id}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium" data-testid={`service-history-action-${entry.id}`}>{entry.action}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap" data-testid={`service-history-date-${entry.id}`}>{formatDateShort(entry.created_at)}</span>
                  </div>
                  {entry.details && (
                    <div className="text-sm text-gray-400 whitespace-pre-wrap" data-testid={`service-history-details-${entry.id}`}>{entry.details}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}