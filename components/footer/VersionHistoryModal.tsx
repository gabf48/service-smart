"use client";

export function VersionHistoryModal({
  open,
  sortedVersions,
  onClose,
}: {
  open: boolean;
  sortedVersions: {
    date: string;
    version: string;
    changes: string[];
  }[];
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[80vh] w-full max-w-lg overflow-auto rounded-lg bg-gray-800 p-6 text-white">
        <h2 className="mb-4 text-xl font-bold">History versiuni</h2>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-b border-gray-600 p-2 text-left">Data</th>
              <th className="border-b border-gray-600 p-2 text-left">Versiune</th>
              <th className="border-b border-gray-600 p-2 text-left">Schimbări</th>
            </tr>
          </thead>
          <tbody>
            {sortedVersions.map((v, i) => (
              <tr key={i} className="hover:bg-gray-700">
                <td className="border-b border-gray-700 p-2">{v.date}</td>
                <td className="border-b border-gray-700 p-2">{v.version}</td>
                <td className="border-b border-gray-700 p-2">
                  <ul className="list-disc space-y-1 pl-5">
                    {v.changes.map((c, j) => (
                      <li key={j}>{c}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 font-bold text-gray-300 hover:text-white"
          aria-label="Închide"
        >
          ✕
        </button>
      </div>
    </div>
  );
}