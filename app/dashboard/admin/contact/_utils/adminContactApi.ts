import { supabase } from "@/lib/supabase";
import type {
  ContactRequestRow,
  ContactRequestStatus,
} from "../_types/contact";

export async function fetchContactRequests() {
  const { data, error } = await supabase
    .from("contact_requests")
    .select(
      "id,user_id,name,email,reason,description,phone,attachments,status,created_at"
    )
    .order("created_at", { ascending: false });

  return {
    data: (data as ContactRequestRow[]) || [],
    error,
  };
}

export async function updateContactRequestStatus(
  id: string,
  status: ContactRequestStatus
) {
  const { error } = await supabase
    .from("contact_requests")
    .update({ status })
    .eq("id", id);

  return { error };
}

export function exportContactRequestsCsv(items: ContactRequestRow[]) {
  const headers = [
    "ID",
    "Name",
    "Email",
    "Reason",
    "Status",
    "Phone",
    "Description",
    "Attachments",
    "Created At",
  ];

  const escapeCsv = (value: unknown) => {
    const text = String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
  };

  const rows = items.map((item) => [
    escapeCsv(item.id),
    escapeCsv(item.name),
    escapeCsv(item.email),
    escapeCsv(item.reason),
    escapeCsv(item.status),
    escapeCsv(item.phone || ""),
    escapeCsv(item.description || ""),
    escapeCsv((item.attachments || []).join(" | ")),
    escapeCsv(item.created_at || ""),
  ]);

  const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `contact-requests-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function bulkUpdateContactRequestStatus(
  ids: string[],
  status: ContactRequestStatus
) {
  const { error } = await supabase
    .from("contact_requests")
    .update({ status })
    .in("id", ids);

  return { error };
}