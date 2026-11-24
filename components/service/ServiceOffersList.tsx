"use client";

import { useState } from "react";
import type { ClientDetail, ServiceOffer, ServicePartStatus } from "@/lib/service/types";
import { formatMoney, getStatusBadgeStyle } from "@/lib/service/utils";

interface ServiceOffersListProps {
  client: ClientDetail;
  editMode: boolean;
  partStatuses: ServicePartStatus[];
  onUpdateOffer: (offerId: string, updates: { status?: string; quantity?: number; notes?: string }) => Promise<void>;
  onDeleteOffer: (offerId: string) => Promise<void>;
}

export function ServiceOffersList({
  client,
  editMode,
  partStatuses,
  onUpdateOffer,
  onDeleteOffer,
}: ServiceOffersListProps) {
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<{ status: string; quantity: number; notes: string }>({
    status: "",
    quantity: 1,
    notes: "",
  });
  const [deletingOfferId, setDeletingOfferId] = useState<string | null>(null);

  const offers = client.offers || [];

  if (offers.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500" data-testid="service-offers-empty">
        <div className="text-4xl mb-2">🔩</div>
        <p>Nicio ofertă salvată pentru acest client.</p>
        <p className="text-sm mt-2">
          Pornește o căutare dintr-un device sau folosește butonul „Salvează la client”
          din rezultatele căutării.
        </p>
      </div>
    );
  }

  // Group offers by device
  const grouped = offers.reduce((acc, offer) => {
    const deviceId = offer.device_id;
    if (!acc[deviceId]) acc[deviceId] = [];
    acc[deviceId].push(offer);
    return acc;
  }, {} as Record<string, ServiceOffer[]>);

  const handleEditSubmit = async (offerId: string) => {
    await onUpdateOffer(offerId, editFormData);
    setEditingOfferId(null);
  };

  const handleDeleteConfirm = async (offerId: string) => {
    await onDeleteOffer(offerId);
    setDeletingOfferId(null);
  };

  return (
    <div className="space-y-4" data-testid="service-offers-list">
      {Object.entries(grouped).map(([deviceId, items]) => {
        const deviceLabel = items[0]?.device_model || `Device #${deviceId}`;
        return (
          <details key={deviceId} className="group" open data-testid={`service-offers-device-${deviceId}`}>
            <summary className="cursor-pointer p-3 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center justify-between" data-testid={`service-offers-device-summary-${deviceId}`}>
              <span className="font-medium">📱 {deviceLabel} · 🔩 {items.length} ofert{items.length !== 1 ? "e" : "ă"}</span>
              <span className="text-gray-400">▼</span>
            </summary>
            <div className="p-4 space-y-3 border-t border-gray-700" data-testid={`service-offers-device-items-${deviceId}`}>
              {items.map((offer) => {
                const isEditing = editingOfferId === offer.id;
                const isDeleting = deletingOfferId === offer.id;
                const status = partStatuses.find((s) => s.id === offer.status_id);

                return (
                  <div key={offer.id} className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden" data-testid={`service-offer-${offer.id}`}>
                    {isDeleting ? (
                      <div className="p-4 flex items-center justify-between" data-testid={`service-offer-delete-${offer.id}`}>
                        <span className="text-red-300">Ștergi oferta „{offer.product_name}”?</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDeleteConfirm(offer.id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm"
                            data-testid={`service-offer-delete-confirm-${offer.id}`}
                          >
                            Confirmă
                          </button>
                          <button
                            onClick={() => setDeletingOfferId(null)}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
                            data-testid={`service-offer-delete-cancel-${offer.id}`}
                          >
                            Anulează
                          </button>
                        </div>
                      </div>
                    ) : isEditing ? (
                      <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(offer.id); }} className="p-4 space-y-3" data-testid={`service-offer-edit-form-${offer.id}`}>
                        <h4 className="font-medium">✏️ Editează ofertă</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <select
                            value={editFormData.status}
                            onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            data-testid={`service-offer-edit-status-${offer.id}`}
                          >
                            {partStatuses.map((s) => (
                              <option key={s.id} value={s.id} style={{ backgroundColor: s.color }}>
                                {s.name}
                              </option>
                            ))}
                          </select>
                          <input
                            type="number"
                            min="1"
                            value={editFormData.quantity}
                            onChange={(e) => setEditFormData({ ...editFormData, quantity: parseInt(e.target.value) || 1 })}
                            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            data-testid={`service-offer-edit-quantity-${offer.id}`}
                          />
                        </div>
                        <textarea
                          value={editFormData.notes}
                          onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                          placeholder="Notițe"
                          rows={2}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                          data-testid={`service-offer-edit-notes-${offer.id}`}
                        />
                        <div className="flex gap-2 justify-end">
                          <button type="button" onClick={() => setEditingOfferId(null)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg" data-testid={`service-offer-edit-cancel-${offer.id}`}>Anulează</button>
                          <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg" data-testid={`service-offer-edit-save-${offer.id}`}>Salvează</button>
                        </div>
                      </form>
                    ) : (
                      <div className="p-4" data-testid={`service-offer-read-${offer.id}`}>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <a
                                href={offer.link || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-400 hover:underline truncate block"
                                data-testid={`service-offer-name-${offer.id}`}
                              >
                                {offer.product_name}
                              </a>
                              {status && (
                                <span style={getStatusBadgeStyle(status.color)} data-testid={`service-offer-status-${offer.id}`}>
                                  {status.name}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                              <span data-testid={`service-offer-price-${offer.id}`}>💰 {offer.price || "—"}</span>
                              <span data-testid={`service-offer-store-${offer.id}`}>🏬 {offer.store || "—"}</span>
                              <span data-testid={`service-offer-quantity-${offer.id}`}>Cantitate: {offer.quantity}</span>
                              <span data-testid={`service-offer-date-${offer.id}`}>Salvată: {formatDateShort(offer.created_at)}</span>
                            </div>
                            {offer.part_number && (
                              <div className="text-xs text-gray-500 mt-1 font-mono" data-testid={`service-offer-part-number-${offer.id}`}>Căutare: {offer.part_number}</div>
                            )}
                            {offer.notes && (
                              <div className="text-sm text-gray-400 mt-1" data-testid={`service-offer-notes-${offer.id}`}>📝 {offer.notes}</div>
                            )}
                          </div>
                          {editMode && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => {
                                  setEditFormData({
                                    status: offer.status_id || "",
                                    quantity: offer.quantity,
                                    notes: offer.notes || "",
                                  });
                                  setEditingOfferId(offer.id);
                                }}
                                className="p-2 hover:bg-gray-700 rounded-lg"
                                title="Editează"
                                data-testid={`service-offer-edit-btn-${offer.id}`}
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => setDeletingOfferId(offer.id)}
                                className="p-2 hover:bg-gray-700 rounded-lg"
                                title="Șterge"
                                data-testid={`service-offer-delete-btn-${offer.id}`}
                              >
                                🗑️
                              </button>
                            </div>
                          )}
                        </div>

                        {offer.image_url && (
                          <a href={offer.link || "#"} target="_blank" rel="noopener noreferrer" className="block mt-2">
                            <img
                              src={offer.image_url}
                              alt={offer.product_name}
                              className="max-w-xs h-auto rounded-lg border border-gray-700"
                              loading="lazy"
                              data-testid={`service-offer-image-${offer.id}`}
                            />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </details>
        );
      })}
    </div>
  );
}

function formatDateShort(dateString: string | null | undefined): string {
  if (!dateString) return "—";
  try {
    return new Date(dateString).toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateString.split("T")[0] || dateString;
  }
}