"use client";

export async function compressImage(
  file: File,
  opts?: { maxW?: number; maxH?: number; quality?: number }
) {
  const maxW = opts?.maxW ?? 1600;
  const maxH = opts?.maxH ?? 1600;
  const quality = opts?.quality ?? 0.82;

  const inputType = file.type;
  const outputType = inputType === "image/png" ? "image/png" : "image/jpeg";

  const objectUrl = URL.createObjectURL(file);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = objectUrl;
    });

    const ratio = Math.min(maxW / img.width, maxH / img.height, 1);
    const w = Math.round(img.width * ratio);
    const h = Math.round(img.height * ratio);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");

    ctx.drawImage(img, 0, 0, w, h);

    const blob: Blob = await new Promise((resolve, reject) => {
      const cb = (b: Blob | null) => (b ? resolve(b) : reject(new Error("Compress failed")));
      if (outputType === "image/png") {
        canvas.toBlob(cb, "image/png");
      } else {
        canvas.toBlob(cb, "image/jpeg", quality);
      }
    });

    const ext = outputType === "image/png" ? "png" : "jpg";
    const safeNameBase = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^\w\-]+/g, "_");

    return new File([blob], `${safeNameBase}.${ext}`, { type: outputType });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}