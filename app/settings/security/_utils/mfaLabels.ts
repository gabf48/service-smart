export type AalValue = "aal1" | "aal2" | "unknown";

export type TotpFactor = {
  id: string;
  friendly_name?: string | null;
};

export function mapAalLabel(aal: AalValue) {
  if (aal === "aal2") return "Verificat cu 2FA";
  if (aal === "aal1") return "Autentificat fără 2FA";
  return "Necunoscut";
}