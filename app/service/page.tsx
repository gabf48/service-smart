"use client";

import { useState, useEffect } from "react";
import { ClientList } from "@/components/service/ClientList";
import { ClientDetail } from "@/components/service/ClientDetail";
import type { ClientListItem, ServiceStatus, ClientFilters } from "@/lib/service/types";
import { formatMoney } from "@/lib/service/utils";
import { listClients, getStatuses, setClientStatus, deleteClient } from "@/lib/service/client";

export default function ServicePage() {
  const [clients, setClients] = useState<ClientListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState<ServiceStatus[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [filters, setFilters] = useState<ClientFilters>({
    search: "",
    status_names: [],
    amount_field: "profit",
    min_amount: undefined,
    max_amount: undefined,
  });
  const [totals, setTotals] = useState({ income: 0, expense: 0, profit: 0 });

  const fetchStatuses = async () => {
    const data = await getStatuses();
    if (data) setStatuses(data);
  };

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await listClients({
        search: filters.search || undefined,
        status_names: filters.status_names?.length ? filters.status_names : undefined,
      });

      setClients(data || []);
      const income = (data || []).reduce((s, c) => s + (c.total_income || 0), 0);
      const expense = (data || []).reduce((s, c) => s + (c.total_expense || 0), 0);
      setTotals({ income, expense, profit: income - expense });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
    fetchClients();
  }, []);

  useEffect(() => {
    fetchClients();
  }, [filters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((f) => ({ ...f, search: e.target.value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFilters((f) => ({ ...f, status_names: val ? [val] : [] }));
  };

  const handleAmountFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((f) => ({ ...f, amount_field: e.target.value as "profit" | "income" | "expense" }));
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value ? parseFloat(e.target.value) : undefined;
    setFilters((f) => ({ ...f, min_amount: val }));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value ? parseFloat(e.target.value) : undefined;
    setFilters((f) => ({ ...f, max_amount: val }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      status_names: [],
      amount_field: "profit",
      min_amount: undefined,
      max_amount: undefined,
    });
  };

  const statusCounts = clients.reduce((acc, c) => {
    // Use device statuses for counting
    const statusesToCount = c.device_statuses?.length ? c.device_statuses : [{ status_name: "Fără status" }];
    statusesToCount.forEach((ds) => {
      const label = ds.status_name || "Fără status";
      acc[label] = (acc[label] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const statusText = Object.entries(statusCounts)
    .map(([name, count]) => `${name}: ${count}`)
    .join(" · ") || "—";

  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId);
  };

  const handleClientClose = () => {
    setSelectedClientId(null);
  };

  const handleClientCreated = (newClientId: string) => {
    // Refresh list and close the modal
    fetchClients();
    handleClientClose();
  };

  const handleClientDeleted = () => {
    fetchClients();
    handleClientClose();
  };

  const handleClientStatusChange = async (clientId: string, newStatusId: string) => {
    try {
      await setClientStatus(clientId, newStatusId);
      // Optimistic update - refresh the list
      fetchClients();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleClientDelete = async (clientId: string) => {
    try {
      await deleteClient(clientId);
      // If we had the deleted client selected, close the detail
      if (selectedClientId === clientId) {
        setSelectedClientId(null);
      }
      // Refresh the list
      fetchClients();
    } catch (error) {
      console.error("Failed to delete client:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Page Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 sticky top-0 z-10">
        <div className="mx-auto max-w-full px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">🧾 Clienți & Service</h1>
              <p className="text-gray-400 mt-1">Gestionează clienți, dispozitive, piese, finanțe și istoricul service-ului</p>
            </div>
            <button
              onClick={() => handleClientSelect("new")}
              data-testid="service-new-client-btn"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium text-white transition-colors"
            >
              ➕ Client nou
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mx-auto max-w-full px-4 pb-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="sr-only">Caută client</label>
              <input
                type="text"
                placeholder="🔎 Caută nume / telefon / device"
                value={filters.search}
                onChange={handleSearchChange}
                data-testid="service-search-input"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="min-w-[180px]">
              <label className="sr-only">Status</label>
              <select
                value={filters.status_names?.[0] || ""}
                onChange={handleStatusChange}
                data-testid="service-status-filter"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none text-center"
              >
                <option value="">Toate statusurile</option>
                {statuses.map((s) => (
                  <option key={s.id} value={s.id} style={{ backgroundColor: s.color, color: s.text_color, textAlign: "center" }}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-[140px]">
              <label className="sr-only">Sumă</label>
              <select
                value={filters.amount_field}
                onChange={handleAmountFieldChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="profit">Profit</option>
                <option value="income">Încasat</option>
                <option value="expense">Cheltuit</option>
              </select>
            </div>

            <div className="min-w-[100px]">
              <label className="sr-only">Min</label>
              <input
                type="number"
                step="50"
                placeholder="Min"
                value={filters.min_amount ?? ""}
                onChange={handleMinChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="min-w-[100px]">
              <label className="sr-only">Max</label>
              <input
                type="number"
                step="50"
                placeholder="Max"
                value={filters.max_amount ?? ""}
                onChange={handleMaxChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleReset}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
              title="Resetează filtre"
            >
              🧹
            </button>
          </div>

          {/* Totals */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400">💵 Încasat total</div>
              <div className="text-xl font-bold text-green-400">{formatMoney(totals.income)}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400">💸 Cheltuit total</div>
              <div className="text-xl font-bold text-red-400">{formatMoney(totals.expense)}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400">📈 Profit total</div>
              <div className={`text-xl font-bold ${totals.profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                {formatMoney(totals.profit)}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {clients.length} clienți · {statusText}
          </p>
        </div>
      </div>

      {/* Client List - folosește componenta ClientList cu lățime completă */}
      <div className="px-4 py-6 sm:px-6 lg:px-8 w-full">
        <ClientList
          clients={clients}
          loading={loading}
          statuses={statuses}
          onClientSelect={handleClientSelect}
          onClientStatusChange={handleClientStatusChange}
          onClientDelete={handleClientDelete}
        />
      </div>

      {/* Client Detail Modal */}
      {selectedClientId && (
        <ClientDetail
          clientId={selectedClientId}
          onClose={handleClientClose}
          onClientCreated={handleClientCreated}
          onClientDeleted={handleClientDeleted}
          onTransactionChange={fetchClients}
          initialSection="personal"
        />
      )}
    </div>
  );
}