"use client";

type ContactFieldsProps = {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  user: any;
  reason: string;
  setReason: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  loading: boolean;
};

export function ContactFields({
  name,
  setName,
  email,
  setEmail,
  user,
  reason,
  setReason,
  description,
  setDescription,
  phone,
  setPhone,
  loading,
}: ContactFieldsProps) {
  return (
    <>
      <input
        placeholder="Nume"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
        className="rounded-xl border border-white/10 bg-gray-900/60 p-3 text-white transition focus:border-blue-500/60 focus:outline-none focus:ring-4 focus:ring-blue-500/15 disabled:opacity-60"
      />

      <input
        type="email"
        placeholder="Email"
        value={user?.email || email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={!!user || loading}
        className={[
          "rounded-xl border p-3 transition focus:border-blue-500/60 focus:outline-none focus:ring-4 focus:ring-blue-500/15 disabled:opacity-60",
          user
            ? "cursor-not-allowed border-white/10 bg-gray-700/40 text-gray-300"
            : "border-white/10 bg-gray-900/60 text-white",
        ].join(" ")}
      />

      <select
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        disabled={loading}
        className="rounded-xl border border-white/10 bg-gray-900/60 p-3 text-white transition focus:border-blue-500/60 focus:outline-none focus:ring-4 focus:ring-blue-500/15 disabled:opacity-60"
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
        disabled={loading}
        className="resize-none rounded-xl border border-white/10 bg-gray-900/60 p-3 text-white transition focus:border-blue-500/60 focus:outline-none focus:ring-4 focus:ring-blue-500/15 disabled:opacity-60"
      />

      <input
        placeholder="Telefon"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={loading}
        className="rounded-xl border border-white/10 bg-gray-900/60 p-3 text-white transition focus:border-blue-500/60 focus:outline-none focus:ring-4 focus:ring-blue-500/15 disabled:opacity-60"
      />
    </>
  );
}