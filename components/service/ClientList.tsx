"use client";

import React, { useState } from "react";
import type { ClientListItem, ServiceStatus } from "@/lib/service/types";
import { formatMoney, getStatusBadgeStyle } from "@/lib/service/utils";

interface ClientListProps {
  clients: ClientListItem[];
  loading: boolean;
  statuses: ServiceStatus[];
  onClientSelect: (clientId: string) => void;
  onClientStatusChange: (clientId: string, newStatusId: string) => void;
  onClientDelete: (clientId: string) => Promise<void>;
}

function getPrimaryDeviceStatus(client: ClientListItem): { status_name: string; status_color: string } | null {
  const deviceStatuses = client.device_statuses || [];
  if (deviceStatuses.length === 0) return null;

  // Find first non-finalized status
  const nonFinalized = deviceStatuses.find(ds =>
    ds.status_name && !ds.status_name.toLowerCase().includes('finalizat') &&
    !ds.status_name.toLowerCase().includes('anulat')
  );

  const primary = nonFinalized || deviceStatuses[0];
  return {
    status_name: primary.status_name || 'Fără status',
    status_color: primary.status_color || '#8b949e',
  };
}

function renderStatusBadge(statusName: string, statusColor: string) {
  return (
    <span className="px-2 py-1 text-xs rounded-full font-semibold text-center" style={getStatusBadgeStyle(statusColor)}>
      {statusName}
    </span>
  );
}

export function ClientList({
  clients,
  loading,
  statuses,
  onClientSelect,
  onClientStatusChange,
  onClientDelete,
}: ClientListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedClients, setExpandedClients] = useState<Set<string>>(new Set());

  const handleDelete = async (clientId: string, clientName: string) => {
    if (!confirm(`Ștergi clientul "${clientName}"? Toate datele asociate vor fi pierdute.`)) return;

    setDeletingId(clientId);
    try {
      await onClientDelete(clientId);
    } finally {
      setDeletingId(null);
    }
  };

  const toggleExpand = (clientId: string) => {
    setExpandedClients(prev => {
      const next = new Set(prev);
      if (next.has(clientId)) next.delete(clientId);
      else next.add(clientId);
      return next;
    });
  };

  const isExpanded = (clientId: string) => expandedClients.has(clientId);

  return (
    <div className="w-full">
      {/* Table */}
      {loading ? (
        <div className="py-8 text-center text-gray-500">Se încarcă...</div>
      ) : clients.length === 0 ? (
        <div className="py-8 text-center text-gray-500">Nu există clienți care să corespundă filtrelor.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-700 w-full">
          <table className="w-full text-sm min-w-[1000px]">
            <thead className="bg-gray-900/50">
              <tr className="text-left text-gray-400">
                <th className="px-3 py-2">Client</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Telefon</th>
                <th className="px-3 py-2">Dispozitiv</th>
                <th className="px-3 py-2 text-right">Încasat</th>
                <th className="px-3 py-2 text-right">Cheltuit</th>
                <th className="px-3 py-2 text-right">Profit</th>
                <th className="px-3 py-2">Creat</th>
                <th className="px-3 py-2">Actualizat</th>
                <th className="px-3 py-2 text-center">Acțiuni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {clients.map((c) => {
                const deviceStatuses = c.device_statuses || [];
                const primaryStatus = getPrimaryDeviceStatus(c);
                const hasMultipleDevices = deviceStatuses.length > 1;
                const expanded = isExpanded(c.id);

                return (
                  <React.Fragment key={c.id}>
                    {/* Main client row */}
                    <tr
                      key={c.id}
                      data-testid={`service-client-row-${c.id}`}
                      className={`hover:bg-gray-800/50 ${hasMultipleDevices ? 'cursor-pointer' : ''}`}
                      onClick={() => onClientSelect(c.id)}
                    >
                      <td className="px-3 py-2 font-medium">
                        <div className="flex items-center gap-2">
                          {hasMultipleDevices && (
                            <span
                              data-testid={`service-client-expand-${c.id}`}
                              className={`text-gray-400 transition-transform cursor-pointer ${expanded ? 'rotate-90' : ''}`}
                              onClick={(e) => { e.stopPropagation(); toggleExpand(c.id); }}
                            >
                              ▶
                            </span>
                          )}
                          <span data-testid={`service-client-name-${c.id}`} onClick={(e) => { e.stopPropagation(); onClientSelect(c.id); }} className="cursor-pointer">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-center" data-testid={`service-client-status-${c.id}`}>
                        {primaryStatus ? renderStatusBadge(primaryStatus.status_name, primaryStatus.status_color) : renderStatusBadge('Fără status', '#8b949e')}
                      </td>
                      <td className="px-3 py-2 text-gray-300" data-testid={`service-client-phone-${c.id}`}>{c.phone}</td>
                      <td className="px-3 py-2 text-gray-400 max-w-xs truncate" data-testid={`service-client-device-${c.id}`}>
                        {primaryStatus ? deviceStatuses[0]?.model || '—' : c.devices}
                      </td>
                      <td className="px-3 py-2 text-right text-green-400" data-testid={`service-client-income-${c.id}`}>{formatMoney(c.total_income)}</td>
                      <td className="px-3 py-2 text-right text-red-400" data-testid={`service-client-expense-${c.id}`}>{formatMoney(c.total_expense)}</td>
                      <td className="px-3 py-2 text-right font-bold" style={{ color: c.profit >= 0 ? "#3fb950" : "#f85149" }} data-testid={`service-client-profit-${c.id}`}>
                        {formatMoney(c.profit)}
                      </td>
                      <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{c.created_at?.split("T")[0]}</td>
                      <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{c.updated_at?.split("T")[0]}</td>
                      <td className="px-3 py-2 text-center">
                        <button
                          data-testid={`service-client-delete-${c.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(c.id, c.name);
                          }}
                          disabled={deletingId === c.id}
                          className="p-2 hover:bg-red-900/50 rounded-lg text-red-400 transition-colors disabled:opacity-50"
                          title="Șterge client"
                        >
                          {deletingId === c.id ? <span className="animate-spin">⟳</span> : "🗑️"}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded device rows - inline table rows */}
                    {hasMultipleDevices && expanded && deviceStatuses.slice(1).map((ds, idx) => {
                      const deviceFinancials = c.device_financials?.[ds.id] || { income: 0, expense: 0, profit: 0 };
                      return (
                        <tr key={`${c.id}-device-${ds.id || idx}`} data-testid={`service-client-device-row-${c.id}-${ds.id || idx}`} className="bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                          <td className="px-3 py-2 pl-10 text-gray-400 text-sm"></td>
                          <td className="px-3 py-2 text-center" data-testid={`service-device-status-${ds.id || idx}`}>
                            {renderStatusBadge(ds.status_name || 'Fără status', ds.status_color || '#8b949e')}
                          </td>
                          <td className="px-3 py-2 text-gray-500 text-sm"></td>
                          <td className="px-3 py-2 text-gray-400 font-medium text-white" data-testid={`service-device-model-${ds.id || idx}`}>{ds.model}</td>
                          <td className="px-3 py-2 text-right text-green-400" data-testid={`service-device-income-${ds.id || idx}`}>{formatMoney(deviceFinancials.income)}</td>
                          <td className="px-3 py-2 text-right text-red-400" data-testid={`service-device-expense-${ds.id || idx}`}>{formatMoney(deviceFinancials.expense)}</td>
                          <td className="px-3 py-2 text-right font-bold" style={{ color: deviceFinancials.profit >= 0 ? "#3fb950" : "#f85149" }} data-testid={`service-device-profit-${ds.id || idx}`}>
                            {formatMoney(deviceFinancials.profit)}
                          </td>
                          <td className="px-3 py-2 text-gray-500"></td>
                          <td className="px-3 py-2 text-gray-500"></td>
                          <td className="px-3 py-2 text-center"></td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}