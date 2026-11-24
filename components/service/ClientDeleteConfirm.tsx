"use client";

import type { ClientDetail } from "@/lib/service/types";

interface ClientDeleteConfirmProps {
  client: ClientDetail;
  show: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export function ClientDeleteConfirm({ client, show, onConfirm, onCancel }: ClientDeleteConfirmProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" data-testid="service-delete-confirm-modal">
      <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4 border border-gray-700" data-testid="service-delete-confirm-panel">
        <h3 className="text-lg font-bold text-white mb-2">Ștergere client</h3>
        <p className="text-gray-300 mb-6">
          Ești sigur că vrei să ștergi clientul <strong>{client.name}</strong>?
          Această acțiune va șterge și toate dispozitivele, piesele, pozele, tranzacțiile și istoricul asociat.
          Această acțiune nu poate fi anulată.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors" data-testid="service-delete-confirm-cancel">
            Anulare
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-colors" data-testid="service-delete-confirm-ok">
            Șterge permanent
          </button>
        </div>
      </div>
    </div>
  );
}