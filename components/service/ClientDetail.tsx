"use client";

import { useState, useEffect } from "react";
import { ClientDetailHeader } from "./ClientDetailHeader";
import { ClientDetailTabs } from "./ClientDetailTabs";
import { ClientDetailContent } from "./ClientDetailContent";
import { ClientDeleteConfirm } from "./ClientDeleteConfirm";
import { useClientDetail } from "./useClientDetail";
import type { SectionKey } from "./ClientDetailTabs";

interface ClientDetailProps {
  clientId: string;
  onClose: () => void;
  onClientCreated?: (newClientId: string) => void;
  onClientDeleted?: () => void;
  onTransactionChange?: () => void;
  initialSection?: SectionKey;
}

export function ClientDetail({
  clientId,
  onClose,
  onClientCreated,
  onClientDeleted,
  onTransactionChange,
  initialSection = "personal",
}: ClientDetailProps) {
  const [editMode, setEditMode] = useState(false);
  const [currentSection, setCurrentSection] = useState<SectionKey>(initialSection);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isNewClient = clientId === "new";

  // Handle ESC key and backdrop click to close modal (only when not in edit mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !editMode) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [editMode, onClose]);

  const {
    client,
    loading,
    statuses,
    partStatuses,
    componentTypes,
    fetchData,
    handleCreateClient,
    handleUpdateClient,
    handleDeleteClient,
    handleDeviceCreated,
    handleDeviceUpdated,
    handleDeviceDeleted,
    handleComponentSaved,
    handleComponentDeleted,
    handlePhotosUploaded,
    handlePhotoDeleted,
    handleOfferCreated,
    handleOfferUpdated,
    handleOfferDeleted,
    handleTransactionCreated,
    handleTransactionUpdated,
    handleTransactionDeleted,
    handleHistoryAdded,
  } = useClientDetail({
    clientId,
    onClientCreated,
    onClientDeleted,
    onTransactionChange,
  });

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" data-testid="service-detail-loading">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p>Se încarcă detaliile clientului...</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" data-testid="service-detail-not-found">
        <div className="text-center text-white">
          <p className="text-red-400">Clientul nu a fost găsit.</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
            Închide
          </button>
        </div>
      </div>
    );
  }

  // For new clients, show only the personal tab with create form
  if (isNewClient) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={(e) => { if (!editMode && e.target === e.currentTarget) onClose(); }}
        data-testid="service-detail-modal-new"
      >
        <div
          className="fixed inset-0 flex items-center justify-center p-4 animate-modal-backdrop"
          onClick={(e) => { if (!editMode && e.target === e.currentTarget) onClose(); }}
        >
          <div className="w-full max-w-2xl max-h-[90vh] bg-gray-900 shadow-2xl rounded-xl flex flex-col animate-modal-panel" data-testid="service-detail-panel-new">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-gray-900 z-10 rounded-t-xl">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-white">➕ Client nou</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors" data-testid="service-detail-close-new">
                ✕
              </button>
            </div>

            {/* Content - only personal section for new clients */}
            <div className="flex-1 overflow-y-auto p-4">
              <ClientDetailContent
                client={client}
                currentSection="personal"
                editMode={true}
                componentTypes={componentTypes}
                statuses={statuses}
                partStatuses={partStatuses}
                onDeviceCreated={handleDeviceCreated}
                onDeviceUpdated={handleDeviceUpdated}
                onDeviceDeleted={handleDeviceDeleted}
                onComponentSaved={handleComponentSaved}
                onComponentDeleted={handleComponentDeleted}
                onPhotosUploaded={handlePhotosUploaded}
                onPhotoDeleted={handlePhotoDeleted}
                onOfferCreated={handleOfferCreated}
                onOfferUpdated={handleOfferUpdated}
                onOfferDeleted={handleOfferDeleted}
                onTransactionCreated={handleTransactionCreated}
                onTransactionUpdated={handleTransactionUpdated}
                onTransactionDeleted={handleTransactionDeleted}
                onHistoryAdded={handleHistoryAdded}
                onSaveClient={handleCreateClient}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleOpenDeleteConfirm = () => setShowDeleteConfirm(true);
  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);
  const handleConfirmDelete = async () => {
    await handleDeleteClient();
    handleCloseDeleteConfirm();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (!editMode && e.target === e.currentTarget) onClose(); }}
      data-testid="service-detail-modal"
    >
      <div
        className="fixed inset-0 flex items-center justify-center p-4 animate-modal-backdrop"
        onClick={(e) => { if (!editMode && e.target === e.currentTarget) onClose(); }}
      >
        <div className="w-full max-w-5xl max-h-[90vh] bg-gray-900 shadow-2xl rounded-xl flex flex-col animate-modal-panel" data-testid="service-detail-panel">
          {/* Header */}
          <ClientDetailHeader
            client={client}
            editMode={editMode}
            onEditClick={() => setEditMode(true)}
            onDeleteClick={handleOpenDeleteConfirm}
            onClose={onClose}
          />

          {/* Section Navigation */}
          <ClientDetailTabs
            currentSection={currentSection}
            onSectionChange={setCurrentSection}
          />

          {/* Content */}
          <ClientDetailContent
            client={client}
            currentSection={currentSection}
            editMode={editMode}
            componentTypes={componentTypes}
            statuses={statuses}
            partStatuses={partStatuses}
            onDeviceCreated={handleDeviceCreated}
            onDeviceUpdated={handleDeviceUpdated}
            onDeviceDeleted={handleDeviceDeleted}
            onComponentSaved={handleComponentSaved}
            onComponentDeleted={handleComponentDeleted}
            onPhotosUploaded={handlePhotosUploaded}
            onPhotoDeleted={handlePhotoDeleted}
            onOfferCreated={handleOfferCreated}
            onOfferUpdated={handleOfferUpdated}
            onOfferDeleted={handleOfferDeleted}
            onTransactionCreated={handleTransactionCreated}
            onTransactionUpdated={handleTransactionUpdated}
            onTransactionDeleted={handleTransactionDeleted}
            onHistoryAdded={handleHistoryAdded}
            onSaveClient={handleUpdateClient}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ClientDeleteConfirm
        client={client}
        show={showDeleteConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteConfirm}
      />
    </div>
  );
}