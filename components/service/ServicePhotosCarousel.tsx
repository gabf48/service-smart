"use client";

import { useState, useCallback } from "react";
import type { ClientDetail, ServicePhoto } from "@/lib/service/types";
import { serviceSupabase } from "@/lib/service/client";

interface ServicePhotosCarouselProps {
  client: ClientDetail;
  editMode: boolean;
  onUploadPhotos: (files: File[], deviceId?: string) => Promise<void>;
  onDeletePhoto: (photoId: string, storagePath: string) => Promise<void>;
}

export function ServicePhotosCarousel({
  client,
  editMode,
  onUploadPhotos,
  onDeletePhoto,
}: ServicePhotosCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const photos = client.photos || [];
  const devices = client.devices || [];

  // Filter photos by selected device
  const filteredPhotos = selectedDeviceId
    ? photos.filter(p => p.device_id === selectedDeviceId)
    : photos;

  // Ensure currentIndex is valid for filtered photos
  if (currentIndex >= filteredPhotos.length && filteredPhotos.length > 0) {
    setCurrentIndex(filteredPhotos.length - 1);
  }

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const files = formData.getAll("photos") as File[];
    if (files.length === 0) return;

    setUploading(true);
    try {
      await onUploadPhotos(files, selectedDeviceId || undefined);
      (e.target as HTMLFormElement).reset();
      setShowUpload(false);
    } finally {
      setUploading(false);
    }
  };

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(photos.length - 1, i + 1));
  }, [photos.length]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  if (photos.length === 0) {
    return (
      <div className="space-y-4" data-testid="service-photos-empty">
        {editMode && (
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700" data-testid="service-photos-upload-form">
            <h4 className="font-medium mb-3">📷 Încarcă poze</h4>
            <form onSubmit={handleUpload} className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Asociază la dispozitiv</label>
                <select
                  value={selectedDeviceId || ""}
                  onChange={(e) => setSelectedDeviceId(e.target.value || null)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  data-testid="service-photos-device-select"
                >
                  {devices.map((d) => (
                    <option key={d.id} value={d.id}>📱 {d.model}</option>
                  ))}
                </select>
              </div>
              <input
                type="file"
                name="photos"
                multiple
                accept="image/*"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                data-testid="service-photos-file-input"
              />
              <button
                type="submit"
                disabled={uploading}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg font-medium"
                data-testid="service-photos-submit-btn"
              >
                {uploading ? "Se încarcă..." : "⬆️ Salvează pozele"}
              </button>
            </form>
          </div>
        )}
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-2">📷</div>
          <p>Nicio poză încă pentru acest client.</p>
          {editMode && <p className="text-sm mt-2">Completează formularul de mai sus pentru a adăuga poze.</p>}
        </div>
      </div>
    );
  }

  const currentPhoto = photos[currentIndex];
  const photoUrl = serviceSupabase.storage.from("service-photos").getPublicUrl(currentPhoto.storage_path).data.publicUrl;

  return (
    <div className="space-y-4" data-testid="service-photos-carousel">
      {/* Upload Form */}
      {editMode && (
        <details className="group">
          <summary className="cursor-pointer p-3 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center justify-between" data-testid="service-photos-upload-toggle">
            <span className="font-medium">📷 Încarcă poze noi</span>
            <span className="text-gray-400">▼</span>
          </summary>
          <form onSubmit={handleUpload} className="p-4 space-y-3 border-t border-gray-700" data-testid="service-photos-upload-form">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Asociază la dispozitiv</label>
              <select
                value={selectedDeviceId || ""}
                onChange={(e) => setSelectedDeviceId(e.target.value || null)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                data-testid="service-photos-device-select"
              >
                {devices.map((d) => (
                  <option key={d.id} value={d.id}>📱 {d.model}</option>
                ))}
              </select>
            </div>
            <input
              type="file"
              name="photos"
              multiple
              accept="image/*"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              data-testid="service-photos-file-input"
            />
            <button
              type="submit"
              disabled={uploading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg font-medium"
              data-testid="service-photos-submit-btn"
            >
              {uploading ? "Se încarcă..." : "⬆️ Salvează pozele"}
            </button>
          </form>
        </details>
      )}

      {/* Device Filter */}
      <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-3" data-testid="service-photos-filter">
        <label className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">📱 Filtrează după dispozitiv:</span>
          <select
            value={selectedDeviceId || ""}
            onChange={(e) => setSelectedDeviceId(e.target.value || null)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            data-testid="service-photos-device-filter"
          >
            <option value="">Toate dispozitivele</option>
            {devices.map((d) => (
              <option key={d.id} value={d.id}>📱 {d.model}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Carousel */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden" data-testid="service-photos-carousel-main">
        {/* Navigation */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700" data-testid="service-photos-nav">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="p-2 hover:bg-gray-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Poza anterioară"
            data-testid="service-photos-prev-btn"
          >
            ◀
          </button>

          <div className="flex-1 text-center" data-testid="service-photos-counter">
            <span className="text-gray-400">Poza {currentIndex + 1} / {filteredPhotos.length}</span>
            {currentPhoto.device_model && (
              <span className="ml-3 px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300" data-testid="service-photos-device-badge">
                📱 {currentPhoto.device_model}
              </span>
            )}
            {!currentPhoto.device_model && currentPhoto.device_id && (
              <span className="ml-3 px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-500" data-testid="service-photos-device-badge">
                📱 Dispozitiv necunoscut
              </span>
            )}
          </div>

          <button
            onClick={goNext}
            disabled={currentIndex >= filteredPhotos.length - 1}
            className="p-2 hover:bg-gray-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Poza următoare"
            data-testid="service-photos-next-btn"
          >
            ▶
          </button>
        </div>

        {/* Main Image */}
        <div className="relative aspect-video bg-gray-900 flex items-center justify-center" data-testid="service-photos-main-image-container">
          <img
            src={photoUrl}
            alt={`Poza ${currentIndex + 1}`}
            className="max-w-full max-h-[70vh] object-contain"
            loading="lazy"
            data-testid="service-photos-main-image"
          />
          {editMode && (
            <button
              onClick={() => onDeletePhoto(currentPhoto.id, currentPhoto.storage_path)}
              className="absolute top-4 right-4 p-2 bg-red-600/80 hover:bg-red-600 rounded-full text-white transition-colors shadow-lg"
              title="Șterge această poză"
              data-testid="service-photos-delete-btn"
            >
              🗑️
            </button>
          )}
        </div>

        {/* Thumbnail Strip */}
        {filteredPhotos.length > 1 && (
          <div className="p-4 border-t border-gray-700 overflow-x-auto" data-testid="service-photos-thumbnails">
            <div className="flex gap-2 min-w-max">
              {filteredPhotos.map((photo, index) => {
                const thumbUrl = serviceSupabase.storage.from("service-photos").getPublicUrl(photo.storage_path).data.publicUrl;
                const deviceLabel = photo.device_model
                  ? `📱 ${photo.device_model}`
                  : photo.device_id
                    ? "📱 Dispozitiv necunoscut"
                    : null;
                return (
                  <button
                    key={photo.id}
                    onClick={() => goTo(photos.indexOf(photo))}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all relative ${
                      photos.indexOf(photo) === currentIndex
                        ? "border-blue-500 shadow-lg shadow-blue-500/30"
                        : "border-transparent hover:border-gray-600"
                    }`}
                    aria-label={`Poza ${index + 1}`}
                    aria-current={photos.indexOf(photo) === currentIndex ? "true" : "false"}
                    data-testid={`service-photo-thumb-${photo.id}`}
                  >
                    <img
                      src={thumbUrl}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                      data-testid={`service-photo-thumb-img-${photo.id}`}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-[10px] text-white px-1 py-0.5 truncate" data-testid={`service-photo-thumb-badge-${photo.id}`}>
                      {deviceLabel}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Photo Info */}
      <div className="text-sm text-gray-400" data-testid="service-photos-info">
        <p data-testid="service-photos-file-info">{currentPhoto.file_name} · {formatBytes(currentPhoto.file_size || 0)}</p>
        <p className="mt-1" data-testid="service-photos-upload-date">Încărcată: {formatDateShort(currentPhoto.uploaded_at)}</p>
        <p className="mt-1" data-testid="service-photos-device-info">
          {currentPhoto.device_model && <span className="px-2 py-0.5 bg-gray-700 rounded text-xs">📱 {currentPhoto.device_model}</span>}
          {!currentPhoto.device_model && currentPhoto.device_id && <span className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-500">📱 Dispozitiv necunoscut</span>}
        </p>
      </div>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function formatDateShort(dateString: string | null | undefined): string {
  if (!dateString) return "—";
  try {
    return new Date(dateString).toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString.split("T")[0] || dateString;
  }
}

// Fix type for FormEvent
type HTMLFormEvent = React.FormEvent<HTMLFormElement>;