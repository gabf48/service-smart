export function cleanupPreviewUrls(urls: string[]) {
  urls.forEach((url) => URL.revokeObjectURL(url));
}

export function buildPreviewUrls(files: File[]) {
  return files.map((file) => URL.createObjectURL(file));
}