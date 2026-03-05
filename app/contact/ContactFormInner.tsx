// app/contact/ContactFormInner.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/app/context/AuthContext";
import { useSearchParams } from "next/navigation";

type Notice = { type: "success" | "error"; text: string } | null;

export default function ContactFormInner() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const motivoParam = searchParams?.get("motivo") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState(motivoParam || "Cerere oferta");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user]);

  useEffect(() => {
    // dacă se schimbă motivo din query, actualizează select-ul
    if (motivoParam) setReason(motivoParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motivoParam]);

  const resetForm = () => {
    setName("");
    if (!user) setEmail("");
    setReason(motivoParam || "Cerere oferta");
    setDescription("");
    setPhone("");
    setFiles(null);

    // reset input file UI (fiind uncontrolled)
    const fileEl = document.getElementById("contact_files") as HTMLInputElement | null;
    if (fileEl) fileEl.value = "";
  };

const handleSubmit = async () => {
  if (loading) return;
  setNotice(null);
  setLoading(true);

  try {
    let uploadedUrls: string[] = [];

    if (files?.length) {
      for (const file of Array.from(files)) {
        const fileName = `${Date.now()}-${file.name}`;

        const { error: upErr } = await supabase.storage
          .from("contact-uploads")
          .upload(fileName, file);

        if (upErr) throw new Error(`Upload failed: ${upErr.message}`);

        const { data } = supabase.storage
          .from("contact-uploads")
          .getPublicUrl(fileName);

        uploadedUrls.push(data.publicUrl);
      }
    }

    const { error: dbErr } = await supabase
      .from("contact_requests")
      .insert([
        {
          user_id: user?.id || null,
          name,
          email: user?.email || email,
          reason,
          description,
          phone,
          attachments: uploadedUrls,
        },
      ]);

    if (dbErr) throw new Error(dbErr.message);

    // ✉️ trimite email
    await fetch("/api/send-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email: user?.email || email,
        phone,
        reason,
        description,
        attachments: uploadedUrls,
      }),
    });

    setNotice({
      type: "success",
      text:
        "Mesaj trimis cu succes. Îți răspundem cât mai rapid. Dacă ai atașat fișiere, le-am primit.",
    });

    resetForm();

  } catch (e: any) {
    setNotice({
      type: "error",
      text:
        e?.message ||
        "A apărut o eroare la trimitere. Te rog încearcă din nou.",
    });
  } finally {
    setLoading(false);
  }
};

  const bannerClass =
    notice?.type === "success"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
      : "border-red-500/30 bg-red-500/10 text-red-100";

  return (
    <div className="max-w-xl mx-auto p-8 bg-black/70 rounded-2xl text-white flex flex-col gap-4 border border-white/10 shadow-2xl backdrop-blur-xl">
      <h1 className="text-2xl font-bold">Contact</h1>

      {/* Modern notice (în loc de alert) */}
      {notice && (
        <div className={`rounded-xl border px-4 py-3 text-sm ${bannerClass}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold">
                {notice.type === "success" ? "Gata ✅" : "Eroare"}
              </div>
              <div className="mt-1 opacity-90">{notice.text}</div>
            </div>

            <button
              type="button"
              onClick={() => setNotice(null)}
              className="shrink-0 rounded-lg px-2 py-1 text-white/70 hover:text-white hover:bg-white/10 transition"
              aria-label="Închide mesajul"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <input
        placeholder="Nume"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 bg-gray-900/60 text-white border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/15 transition"
      />

      <input
        type="email"
        placeholder="Email"
        value={user?.email || email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={!!user}
        className={[
          "p-3 border rounded-xl focus:outline-none transition",
          "focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/15",
          user
            ? "bg-gray-700/40 text-gray-300 cursor-not-allowed border-white/10"
            : "bg-gray-900/60 text-white border-white/10",
        ].join(" ")}
      />

      <select
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="p-3 bg-gray-900/60 text-white border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/15 transition"
      >
        <option>Cerere oferta</option>
        <option>Bug website</option>
        <option>Colaborare</option>
        <option>Problema laptop/PC</option>
        <option>Alt motiv</option>
        <option>Modifica date personale</option>
      </select>

      <textarea
        placeholder="Descriere"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        className="p-3 bg-gray-900/60 text-white border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/15 transition resize-none"
      />

      <input
        placeholder="Telefon"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="p-3 bg-gray-900/60 text-white border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/15 transition"
      />

      <input
        id="contact_files"
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => setFiles(e.target.files)}
        className="p-3 bg-gray-900/60 text-white border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/15 transition"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="rounded-xl bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-700 transition disabled:opacity-60 active:scale-[0.99]"
      >
        {loading ? "Se trimite..." : "Trimite"}
      </button>
    </div>
  );
}