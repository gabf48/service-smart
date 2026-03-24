"use client";

export function ServiceDetailsFooter({
  phoneE164,
  phoneDisplay,
  onClose,
}: {
  phoneE164: string;
  phoneDisplay: string;
  onClose: () => void;
}) {
  return (
    <div className="p-5 border-t">
      <div>
        Sună: <a href={`tel:${phoneE164}`}>{phoneDisplay}</a>
      </div>

      <button onClick={onClose}>Închide</button>
    </div>
  );
}