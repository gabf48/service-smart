// app/dashboard/admin/reviews/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type ReviewRow = {
  id: string;
  user_id: string | null;
  rating: number | null;
  comment: string | null;
  created_at: string | null;

  // dacă ai adăugat deja coloane noi, le ia automat (nu strică dacă nu există)
  is_approved?: boolean | null;
  display_name?: string | null;
  email?: string | null;
  phone?: string | null;
  attachments?: string[] | null;
};

type Notice = { type: "success" | "error"; text: string } | null;

export default function AdminReviewsPage() {
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [tab, setTab] = useState<"pending" | "approved">("pending");

  const fetchReviews = async () => {
    setLoading(true);
    setNotice(null);

    // dacă ai RLS corectă pe admin, asta va funcționa.
    // Selectăm explicit câmpurile de bază; cele opționale vin dacă există.
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    setLoading(false);

    if (error) {
      setNotice({ type: "error", text: error.message });
      setReviews([]);
      return;
    }

    setReviews((data as ReviewRow[]) ?? []);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const pending = useMemo(
    () => reviews.filter((r) => r.is_approved !== true),
    [reviews]
  );

  const approved = useMemo(
    () => reviews.filter((r) => r.is_approved === true),
    [reviews]
  );

  const list = tab === "pending" ? pending : approved;

  const setApproved = async (id: string, value: boolean) => {
    if (busyId) return;
    setBusyId(id);
    setNotice(null);

    const { error } = await supabase
      .from("reviews")
      .update({ is_approved: value })
      .eq("id", id);

    setBusyId(null);

    if (error) {
      setNotice({ type: "error", text: error.message });
      return;
    }

    setNotice({
      type: "success",
      text: value ? "Review aprobat." : "Review respins.",
    });

    await fetchReviews();
  };

  const bannerClass =
    notice?.type === "success"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
      : "border-red-500/30 bg-red-500/10 text-red-100";

  const fmtDate = (iso?: string | null) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString("ro-RO", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const Stars = ({ rating }: { rating: number }) => {
    const r = Math.max(0, Math.min(5, rating));
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < r ? "text-amber-300" : "text-white/20"}
            aria-hidden="true"
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-sm text-white/70 tabular-nums">
          {r}/5
        </span>
      </div>
    );
  };

  return (
    <div className="space-bg h-dvh overflow-hidden flex items-center justify-center p-6">
    

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs text-white/60">Admin</div>
            <h1 className="mt-1 text-3xl font-bold">Reviews</h1>
            <p className="mt-2 text-white/70">
              Aprobă sau respinge review-urile înainte să apară public.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-1">
              <button
                type="button"
                onClick={() => setTab("pending")}
                className={[
                  "rounded-xl px-4 py-2 text-sm font-semibold transition",
                  tab === "pending"
                    ? "bg-white/10 ring-1 ring-white/15"
                    : "hover:bg-white/5 text-white/80",
                ].join(" ")}
              >
                Pending{" "}
                <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs">
                  {pending.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setTab("approved")}
                className={[
                  "rounded-xl px-4 py-2 text-sm font-semibold transition",
                  tab === "approved"
                    ? "bg-white/10 ring-1 ring-white/15"
                    : "hover:bg-white/5 text-white/80",
                ].join(" ")}
              >
                Approved{" "}
                <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs">
                  {approved.length}
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={fetchReviews}
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Notice */}
        {notice && (
          <div className={`mt-6 rounded-2xl border px-5 py-4 ${bannerClass}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold">
                  {notice.type === "success" ? "OK" : "Eroare"}
                </div>
                <div className="mt-1 text-sm opacity-90">{notice.text}</div>
              </div>
              <button
                type="button"
                onClick={() => setNotice(null)}
                className="shrink-0 rounded-lg px-2 py-1 text-white/70 hover:text-white hover:bg-white/10 transition"
                aria-label="Închide"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mt-8">
          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
              Se încarcă…
            </div>
          ) : list.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <div className="text-xl font-semibold">Nimic aici</div>
              <div className="mt-2 text-sm text-white/70">
                {tab === "pending"
                  ? "Nu există review-uri în așteptare."
                  : "Nu există review-uri aprobate încă."}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {list.map((r) => {
                const name =
                  r.display_name ||
                  (r.user_id ? "User" : "Anonim");

                return (
                  <div
                    key={r.id}
                    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl shadow-black/30 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="text-lg font-semibold truncate">
                              {name}
                            </div>

                            <span
                              className={[
                                "inline-flex items-center rounded-full px-3 py-1 text-xs ring-1",
                                r.is_approved
                                  ? "bg-emerald-500/10 text-emerald-200 ring-emerald-500/20"
                                  : "bg-amber-500/10 text-amber-200 ring-amber-500/20",
                              ].join(" ")}
                            >
                              {r.is_approved ? "Approved" : "Pending"}
                            </span>
                          </div>

                          <div className="mt-2">
                            <Stars rating={Number(r.rating ?? 0)} />
                          </div>

                          <div className="mt-3 text-sm text-white/75 whitespace-pre-wrap">
                            {r.comment || "—"}
                          </div>

                          <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/60">
                            {r.created_at ? (
                              <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                                {fmtDate(r.created_at)}
                              </span>
                            ) : null}

                            {r.email ? (
                              <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                                {r.email}
                              </span>
                            ) : null}

                            {r.phone ? (
                              <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                                {r.phone}
                              </span>
                            ) : null}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 shrink-0">
                          {r.is_approved !== true ? (
                            <>
                              <button
                                type="button"
                                disabled={busyId === r.id}
                                onClick={() => setApproved(r.id, true)}
                                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-700 transition disabled:opacity-60"
                              >
                                {busyId === r.id ? "..." : "Approve"}
                              </button>

                              <button
                                type="button"
                                disabled={busyId === r.id}
                                onClick={() => setApproved(r.id, false)}
                                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-700 transition disabled:opacity-60"
                              >
                                {busyId === r.id ? "..." : "Reject"}
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              disabled={busyId === r.id}
                              onClick={() => setApproved(r.id, false)}
                              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition disabled:opacity-60"
                            >
                              {busyId === r.id ? "..." : "Move to pending"}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Attachments (dacă există) */}
                      {Array.isArray(r.attachments) && r.attachments.length ? (
                        <div className="mt-6">
                          <div className="text-sm font-semibold">Attachments</div>
                          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {r.attachments.slice(0, 3).map((url) => (
                              <a
                                key={url}
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30"
                              >
                                <img
                                  src={url}
                                  alt="attachment"
                                  className="h-28 w-full object-cover opacity-90 group-hover:opacity-100 transition"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).style.display =
                                      "none";
                                  }}
                                />
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/50" />
                                <div className="absolute bottom-2 left-2 right-2 text-xs text-white/80 truncate">
                                  Deschide
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}