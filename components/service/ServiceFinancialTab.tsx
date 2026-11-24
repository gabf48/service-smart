"use client";

import { useState } from "react";
import type { ClientDetail, ServiceTransaction, ServiceTransactionType, ServiceTransactionCategory, ServiceDevice } from "@/lib/service/types";
import { formatMoney, formatDateShort, getStatusBadgeStyle } from "@/lib/service/utils";

interface ServiceFinancialTabProps {
  client: ClientDetail;
  editMode: boolean;
  onAddTransaction: (input: { type: "Încasare" | "Cheltuială"; amount: number; category?: string; description?: string; device_id?: string }) => Promise<void>;
  onUpdateTransaction: (transactionId: string, input: { type?: "Încasare" | "Cheltuială"; amount?: number; category?: string; description?: string; device_id?: string | null }) => Promise<void>;
  onDeleteTransaction: (transactionId: string) => Promise<void>;
}

export function ServiceFinancialTab({
  client,
  editMode,
  onAddTransaction,
  onUpdateTransaction,
  onDeleteTransaction,
}: ServiceFinancialTabProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: "Încasare" as "Încasare" | "Cheltuială",
    amount: "",
    category: "",
    description: "",
    device_id: "",
  });
  const [editingTransactionId, setEditingTransactionId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    type: "Încasare" as "Încasare" | "Cheltuială",
    amount: "",
    category: "",
    description: "",
    device_id: "",
  });
  const [deletingTransactionId, setDeletingTransactionId] = useState<string | null>(null);

  const summary = client.financial_summary || { total_income: 0, total_expense: 0, profit: 0, transaction_count: 0 };
  const transactions = client.transactions || [];
  const devices = client.devices || [];

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newTransaction.amount);
    if (!amount || amount <= 0) return;
    await onAddTransaction({
      type: newTransaction.type,
      amount,
      category: newTransaction.category || undefined,
      description: newTransaction.description || undefined,
      device_id: newTransaction.device_id || undefined,
    });
    setNewTransaction({ type: "Încasare", amount: "", category: "", description: "", device_id: "" });
    setShowAddForm(false);
  };

  const handleEditSubmit = async (transactionId: string) => {
    const amount = parseFloat(editFormData.amount);
    if (!amount || amount <= 0) return;
    await onUpdateTransaction(transactionId, {
      type: editFormData.type,
      amount,
      category: editFormData.category || undefined,
      description: editFormData.description || undefined,
      device_id: editFormData.device_id || null,
    });
    setEditingTransactionId(null);
  };

  const handleDeleteConfirm = async (transactionId: string) => {
    await onDeleteTransaction(transactionId);
    setDeletingTransactionId(null);
  };

  const typeColors: Record<string, string> = {
    "Încasare": "#3fb950",
    "Cheltuială": "#f85149",
  };

  const typeIcons: Record<string, string> = {
    "Încasare": "➕",
    "Cheltuială": "➖",
  };

  const getDeviceName = (deviceId: string | null | undefined): string => {
    if (!deviceId) return "—";
    const device = devices.find(d => d.id === deviceId);
    return device?.model || "—";
  };

  return (
    <div className="space-y-6" data-testid="service-financial-tab">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4" data-testid="service-financial-summary">
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700" data-testid="service-financial-income">
          <div className="text-xs text-gray-500 mb-1">💵 Încasat total</div>
          <div className="text-2xl font-bold text-green-400">{formatMoney(summary.total_income)}</div>
        </div>
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700" data-testid="service-financial-expense">
          <div className="text-xs text-gray-500 mb-1">💸 Cheltuit total</div>
          <div className="text-2xl font-bold text-red-400">{formatMoney(summary.total_expense)}</div>
        </div>
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700" data-testid="service-financial-profit">
          <div className="text-xs text-gray-500 mb-1">📈 Profit</div>
          <div className={`text-2xl font-bold ${summary.profit >= 0 ? "text-green-400" : "text-red-400"}`}>
            {formatMoney(summary.profit)}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500" data-testid="service-financial-count">
        {summary.transaction_count} tranzacție{summary.transaction_count !== 1 ? "i" : ""} înregistrată
      </p>

      {/* Add Transaction Form */}
      {editMode && (
        <details className={showAddForm ? "open" : ""} data-testid="service-financial-add-form">
          <summary className="cursor-pointer p-3 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center justify-between" data-testid="service-financial-add-toggle">
            <span className="font-medium">➕ Tranzacție nouă</span>
            <span className="text-gray-400">▼</span>
          </summary>
          <form onSubmit={handleAddSubmit} className="p-4 space-y-3 border-t border-gray-700" data-testid="service-financial-add-form-inner">
            <div className="grid grid-cols-2 gap-3">
              <select
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as "Încasare" | "Cheltuială" })}
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                data-testid="service-financial-add-type"
              >
                <option value="Încasare">💵 Încasare</option>
                <option value="Cheltuială">💸 Cheltuială</option>
              </select>
              <select
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                data-testid="service-financial-add-category"
              >
                <option value="">Categorie (opțional)</option>
                <option value="Piese">🔩 Piese</option>
                <option value="Manoperă">🔧 Manoperă</option>
                <option value="Transport">🚚 Transport</option>
                <option value="Altele">📦 Altele</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={newTransaction.device_id}
                onChange={(e) => setNewTransaction({ ...newTransaction, device_id: e.target.value })}
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                data-testid="service-financial-add-device"
              >
                <option value="">Fără dispozitiv (client)</option>
                {devices.map((d) => (
                  <option key={d.id} value={d.id}>{d.model}</option>
                ))}
              </select>
              <input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Sumă (Lei)"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                required
                data-testid="service-financial-add-amount"
              />
            </div>
            <input
              type="text"
              placeholder="Descriere (opțional)"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              data-testid="service-financial-add-description"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium"
              data-testid="service-financial-add-submit"
            >
              💾 Adaugă tranzacția
            </button>
          </form>
        </details>
      )}

      {/* Transactions List */}
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500" data-testid="service-financial-empty">
          <div className="text-3xl mb-2">🧾</div>
          <p>Nu există tranzacții înregistrate pentru acest client.</p>
        </div>
      ) : (
        <div className="space-y-3" data-testid="service-financial-list">
          {transactions.map((tx) => {
            const isEditing = editingTransactionId === tx.id;
            const isDeleting = deletingTransactionId === tx.id;
            const typeName = tx.type?.name || "—";
            const categoryName = tx.category?.name || "—";
            const color = typeColors[typeName] || "#8b949e";
            const icon = typeIcons[typeName] || "•";
            const deviceName = getDeviceName(tx.device_id);

            return (
              <div key={tx.id} className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden" data-testid={`service-transaction-${tx.id}`}>
                {isDeleting ? (
                  <div className="p-4 flex items-center justify-between" data-testid={`service-transaction-delete-${tx.id}`}>
                    <span className="text-red-300">Ștergi tranzacția <strong>{formatMoney(tx.amount)}</strong>?</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleDeleteConfirm(tx.id)} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm" data-testid={`service-transaction-delete-confirm-${tx.id}`}>Confirmă</button>
                      <button onClick={() => setDeletingTransactionId(null)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm" data-testid={`service-transaction-delete-cancel-${tx.id}`}>Anulează</button>
                    </div>
                  </div>
                ) : isEditing ? (
                  <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(tx.id); }} className="p-4 space-y-3" data-testid={`service-transaction-edit-${tx.id}`}>
                    <h4 className="font-medium">✏️ Editează tranzacția</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={editFormData.type}
                        onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value as "Încasare" | "Cheltuială" })}
                        className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        data-testid={`service-transaction-edit-type-${tx.id}`}
                      >
                        <option value="Încasare">💵 Încasare</option>
                        <option value="Cheltuială">💸 Cheltuială</option>
                      </select>
                      <select
                        value={editFormData.category}
                        onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                        className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        data-testid={`service-transaction-edit-category-${tx.id}`}
                      >
                        <option value="">—</option>
                        <option value="Piese">🔩 Piese</option>
                        <option value="Manoperă">🔧 Manoperă</option>
                        <option value="Transport">🚚 Transport</option>
                        <option value="Altele">📦 Altele</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={editFormData.device_id}
                        onChange={(e) => setEditFormData({ ...editFormData, device_id: e.target.value })}
                        className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        data-testid={`service-transaction-edit-device-${tx.id}`}
                      >
                        <option value="">Fără dispozitiv (client)</option>
                        {devices.map((d) => (
                          <option key={d.id} value={d.id}>{d.model}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={editFormData.amount}
                        onChange={(e) => setEditFormData({ ...editFormData, amount: e.target.value })}
                        className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        required
                        data-testid={`service-transaction-edit-amount-${tx.id}`}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Descriere"
                      value={editFormData.description}
                      onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                      data-testid={`service-transaction-edit-description-${tx.id}`}
                    />
                    <div className="flex gap-2 justify-end">
                      <button type="button" onClick={() => setEditingTransactionId(null)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg" data-testid={`service-transaction-edit-cancel-${tx.id}`}>Anulează</button>
                      <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg" data-testid={`service-transaction-edit-save-${tx.id}`}>Salvează</button>
                    </div>
                  </form>
                ) : (
                  <div className="p-4" data-testid={`service-transaction-read-${tx.id}`}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span
                          className="px-2 py-1 rounded text-sm font-semibold text-white"
                          style={{ backgroundColor: color }}
                          data-testid={`service-transaction-type-${tx.id}`}
                        >
                          {icon} {typeName}
                        </span>
                        <span className="font-bold text-lg" style={{ color }} data-testid={`service-transaction-amount-${tx.id}`}>
                          {formatMoney(tx.amount)}
                        </span>
                        <span className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300" data-testid={`service-transaction-category-${tx.id}`}>
                          {categoryName}
                        </span>
                        {tx.device_id && (
                          <span className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-400 flex items-center gap-1" data-testid={`service-transaction-device-${tx.id}`}>
                            📱 {deviceName}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                        <span data-testid={`service-transaction-date-${tx.id}`}>{formatDateShort(tx.created_at)}</span>
                        {tx.description && <span data-testid={`service-transaction-description-${tx.id}`}>· {tx.description}</span>}
                        {editMode && (
                          <div className="flex gap-1 ml-auto">
                            <button
                              onClick={() => {
                                setEditFormData({
                                  type: typeName as "Încasare" | "Cheltuială",
                                  amount: String(tx.amount),
                                  category: categoryName,
                                  description: tx.description || "",
                                  device_id: tx.device_id || "",
                                });
                                setEditingTransactionId(tx.id);
                              }}
                              className="p-1.5 hover:bg-gray-700 rounded"
                              title="Editează"
                              data-testid={`service-transaction-edit-btn-${tx.id}`}
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => setDeletingTransactionId(tx.id)}
                              className="p-1.5 hover:bg-gray-700 rounded"
                              title="Șterge"
                              data-testid={`service-transaction-delete-btn-${tx.id}`}
                            >
                              🗑️
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}