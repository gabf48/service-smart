const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export function validateFiles(files: FileList | null) {
  if (!files || files.length === 0) return null;

  if (files.length > MAX_FILES) {
    return `Poți încărca maximum ${MAX_FILES} fișiere.`;
  }

  const invalid = Array.from(files).find(
    (f) => f.size > MAX_FILE_SIZE_BYTES
  );

  if (invalid) {
    return `Fișierul "${invalid.name}" depășește ${MAX_FILE_SIZE_MB} MB.`;
  }

  return null;
}