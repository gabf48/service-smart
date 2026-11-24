"use client";

import type { ClientDetail, ServiceDevice } from "@/lib/service/types";
import { getStatusBadgeStyle } from "@/lib/service/utils";

interface ClientDetailHeaderProps {
  client: ClientDetail;
  editMode: boolean;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onClose: () => void;
}

export function ClientDetailHeader({
  client,
  editMode,
  onEditClick,
  onDeleteClick,
  onClose,
}: ClientDetailHeaderProps) {
  // Show all unique device statuses
  const deviceStatuses = client.devices
    ?.map((d) => d.status?.name)
    .filter((s): s is string => !!s) || [];
  const uniqueStatuses = [...new Set(deviceStatuses)];

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-gray-900 z-10 rounded-t-xl" data-testid="service-detail-header">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-white" data-testid="service-detail-name">{client.name}</h2>
        <p className="text-sm text-gray-400" data-testid="service-detail-phone">{client.phone}</p>
      </div>
      <div className="flex items-center gap-2">
        {/* Status badges */}
        {uniqueStatuses.length === 0 && (
          <span className="px-2 py-1 text-xs rounded-full font-semibold" style={getStatusBadgeStyle("#8b949e")} data-testid="service-detail-status">
            Fără status
          </span>
        )}
        {uniqueStatuses.length === 1 && (
          <span
            className="px-2 py-1 text-xs rounded-full font-semibold"
            style={getStatusBadgeStyle(client.devices?.find((d) => d.status?.name === uniqueStatuses[0])?.status?.color || "#8b949e")}
            data-testid="service-detail-status"
          >
            {uniqueStatuses[0]}
          </span>
        )}
        {uniqueStatuses.length > 1 && (
          <span
            className="px-2 py-1 text-xs rounded-full font-semibold bg-gray-700 text-white"
            title={uniqueStatuses.join(", ")}
            data-testid="service-detail-status"
          >
            {uniqueStatuses.length} statusuri: {uniqueStatuses.slice(0, 2).join(", ")}{uniqueStatuses.length > 2 ? "..." : ""}
          </span>
        )}
        {!editMode && (
          <button onClick={onEditClick} className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors" data-testid="service-detail-edit-btn">
            ✏️ Editează
          </button>
        )}
        <button onClick={onDeleteClick} className="p-2 hover:bg-red-900/50 rounded-lg text-red-400 transition-colors" title="Șterge client" data-testid="service-detail-delete-btn">
          🗑️
        </button>
        <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors" data-testid="service-detail-close-btn">
          ✕
        </button>
      </div>
    </div>
  );
}