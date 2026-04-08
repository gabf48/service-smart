export type PendingMfaSetup = {
  factorId: string;
  qrCode: string;
  secret: string;
};

const STORAGE_KEY = "pending_mfa_setup";

export function savePendingMfaSetup(value: PendingMfaSetup) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function readPendingMfaSetup(): PendingMfaSetup | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingMfaSetup;
  } catch {
    return null;
  }
}

export function clearPendingMfaSetup() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}