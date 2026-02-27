"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { versions } from "@/app/version";
import { roadmap, type RoadmapStatus } from "@/app/roadmap";

export default function Footer() {
  const [expanded, setExpanded] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

 const sortedVersions = [...versions].sort((a, b) => {
  const da = new Date(a.date).getTime();
  const db = new Date(b.date).getTime();
  if (da !== db) return db - da; // date desc

  // fallback: compare semver-ish "1.2.3"
  const pa = a.version.split(".").map((n) => Number(n) || 0);
  const pb = b.version.split(".").map((n) => Number(n) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pb[i] ?? 0) - (pa[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
});

const latestVersion = sortedVersions[0]?.version || "0.0.0";

  // Close expanded panel when clicking/tapping outside (mobile-friendly)
  useEffect(() => {
    const onDown = (e: Event) => {
      if (!expanded) return;
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) setExpanded(false);
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("touchstart", onDown, { passive: true });

    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("touchstart", onDown);
    };
  }, [expanded]);

  const badgeClass = (s: RoadmapStatus) => {
    if (s === "done") return "bg-green-500/15 text-green-200 ring-1 ring-green-400/20";
    if (s === "in-progress") return "bg-yellow-500/15 text-yellow-200 ring-1 ring-yellow-400/20";
    return "bg-white/10 text-white/70 ring-1 ring-white/15";
  };

  const statusLabel = (s: RoadmapStatus) => {
    if (s === "done") return "done";
    if (s === "in-progress") return "wip";
    return "planned";
  };

  return (
    <>
      {/* Sticky footer panel */}
      <div
        ref={panelRef}
        className="fixed bottom-0 left-0 right-0 z-50 text-white"
        onMouseEnter={() => setExpanded(true)}
      >
        {/* Expanded panel */}
        <div
          className={[
            "mx-auto max-w-6xl px-4",
            "transition-all duration-300 ease-out",
            expanded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0 pointer-events-none",
          ].join(" ")}
        >
          <div className="mb-2 rounded-2xl bg-black/70 backdrop-blur-xl shadow-xl ring-1 ring-white/10 p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              {/* Left: info */}
              <div className="min-w-[220px]">
                <div className="text-sm text-white/70">Service Smart</div>
                <div className="text-base font-semibold">Versiunea {latestVersion}</div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setHistoryOpen(true)}
                    className="rounded-full px-3 py-2 text-sm bg-white/10 hover:bg-white/15 transition"
                  >
                    Istoric versiuni
                  </button>

                  <Link
                    href="/contact"
                    className="rounded-full px-3 py-2 text-sm bg-white/10 hover:bg-white/15 transition"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Middle: roadmap */}
              <div className="flex-1">
                <div className="text-sm font-semibold mb-2">Roadmap</div>
                <div className="flex flex-wrap gap-2">
                  {roadmap.map((r) => (
                    <span
                      key={r.label}
                      className={[
                        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm",
                        badgeClass(r.status),
                      ].join(" ")}
                      title={`${r.label} (${statusLabel(r.status)})`}
                    >
                      <span className="truncate max-w-[220px]">{r.label}</span>
                      <span className="text-xs opacity-70">{statusLabel(r.status)}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: socials */}
              <div className="min-w-[220px]">
                <div className="text-sm font-semibold mb-2">Social</div>
                <div className="flex flex-wrap gap-2">
                  <a
                    className="rounded-full px-3 py-2 text-sm bg-white/10 hover:bg-white/15 transition"
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    Facebook
                  </a>
                  <a
                    className="rounded-full px-3 py-2 text-sm bg-white/10 hover:bg-white/15 transition"
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                    Instagram
                  </a>
                </div>

                <div className="mt-3 text-xs text-white/60">
                  Cluj-Napoca • (adaugi aici adresa)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsed bar (always visible) */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={[
            "w-full",
            "bg-gray-900/90 backdrop-blur-md",
            "border-t border-white/10",
            "px-4 py-2",
            "text-sm text-gray-200",
            "hover:text-white transition",
          ].join(" ")}
        >
          <div className="mx-auto max-w-6xl flex items-center justify-between">
            <span>Versiunea {latestVersion}</span>
            <span className="text-xs text-white/70">
              {expanded ? "Click pentru a închide" : "Hover / click pentru detalii"}
            </span>
          </div>
        </button>
      </div>

      {/* History modal */}
      {historyOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-[60]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setHistoryOpen(false);
          }}
        >
          <div className="bg-gray-800 text-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-auto p-6 relative">
            <h2 className="text-xl font-bold mb-4">History versiuni</h2>

            <table className="w-full border-collapse">
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
                      <ul className="list-disc pl-5">
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
              onClick={() => setHistoryOpen(false)}
              className="absolute top-2 right-2 text-gray-300 hover:text-white font-bold cursor-pointer"
              aria-label="Închide"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Spacer so content doesn't hide behind fixed footer */}
      <div className="h-14 sm:h-12" />
    </>
  );
}