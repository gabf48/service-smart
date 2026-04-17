"use client";

type Props = {
  phoneDisplay: string; // "+40 757 180 250"
  phoneTel: string;     // "+40757180250"
};

export default function PhoneBadge({
  phoneDisplay,
  phoneTel,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      {/* CALL */}
      <a
        href={`tel:${phoneTel}`}
        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
      >
        📞 Sună
      </a>

      {/* WHATSAPP */}
      <a
        href={`https://wa.me/${phoneTel.replace("+", "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-green-700 transition"
      >
        💬 WhatsApp
      </a>
    </div>
  );
}