export type ContactRequestStatus = "open" | "resolved";

export type ContactRequestRow = {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  reason: string;
  description: string;
  phone: string | null;
  attachments: string[] | null;
  status: ContactRequestStatus;
  created_at?: string | null;
};

export type ContactReasonFilter =
  | "all"
  | "Cerere oferta"
  | "Bug website"
  | "Colaborare"
  | "Problema laptop/PC"
  | "Alt motiv"
  | "Modifica date personale";

export type ContactStatusFilter = "all" | "open" | "resolved";