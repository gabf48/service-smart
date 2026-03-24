"use client";

import { AdminContactHeader } from "./_components/AdminContactHeader";
import { AdminContactFilters } from "./_components/AdminContactFilters";
import { AdminContactTable } from "./_components/AdminContactTable";
import { AdminContactNotice } from "./_components/AdminContactNotice";
import { AdminContactDetailsModal } from "./_components/AdminContactDetailsModal";
import { useAdminContactPage } from "./_hooks/useAdminContactPage";

export default function AdminContactPage() {
  const {
  filteredItems,
  loading,
  errorMsg,
  bulkReopen,
  notice,
  search,
  setSearch,
  reasonFilter,
  setReasonFilter,
  statusFilter,
  setStatusFilter,
  selectedItem,
  setSelectedItem,
  busyId,
  loadItems,
  toggleResolved,
  handleExportCsv,
  selectedIds,
  toggleSelect,
  selectAllVisible,
  clearSelection,
  bulkMarkResolved,
} = useAdminContactPage();

  return (
    <div className="space-y-6 p-6" data-testid="admin-contact-page">
 <AdminContactHeader
  total={filteredItems.length}
  selectedCount={selectedIds.length}
  onRefresh={loadItems}
  onExportCsv={handleExportCsv}
  onSelectAllVisible={selectAllVisible}
  onClearSelection={clearSelection}
  onBulkMarkResolved={bulkMarkResolved}
  onBulkReopen={bulkReopen}
/>
      <AdminContactFilters
        search={search}
        setSearch={setSearch}
        reasonFilter={reasonFilter}
        setReasonFilter={setReasonFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <AdminContactNotice notice={notice} />

      {loading && <p className="text-white/70">Se încarcă mesajele...</p>}

      {errorMsg && <p className="text-red-400">{errorMsg}</p>}

      {!loading && !errorMsg && filteredItems.length > 0 && (
        <AdminContactTable
  items={filteredItems}
  selectedIds={selectedIds}
  onToggleSelect={toggleSelect}
  onOpenDetails={setSelectedItem}
/>
      )}

      {!loading && !errorMsg && filteredItems.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="text-lg font-semibold text-white">
            Nu există rezultate
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Încearcă să modifici căutarea sau filtrele selectate.
          </p>
        </div>
      )}

      <AdminContactDetailsModal
        item={selectedItem}
        busy={busyId === selectedItem?.id}
        onClose={() => setSelectedItem(null)}
        onToggleResolved={toggleResolved}
      />
    </div>
  );
}