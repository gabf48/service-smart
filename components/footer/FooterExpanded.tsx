"use client";

import Link from "next/link";
import { roadmap } from "@/app/roadmap";
import { badgeClass, statusLabel } from "./footerUtils";
import { FooterSocial } from "./FooterSocial";

export function FooterExpanded({
  expanded,
  expandedRef,
  latestVersion,
  onOpenHistory,
}: {
  expanded: boolean;
  expandedRef: React.RefObject<HTMLDivElement | null>;
  latestVersion: string;
  onOpenHistory: () => void;
}) {
  return (
    <div
      ref={expandedRef}
      className={[
        "pointer-events-auto mx-auto max-w-6xl px-4 transition-all duration-300 ease-out",
        expanded
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      ].join(" ")}
    >
      <div className="mb-2 rounded-2xl bg-black/70 p-4 shadow-xl ring-1 ring-white/10 backdrop-blur-xl">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="min-w-[220px]">
            <div className="text-sm text-white/70">Service Smart</div>
            <div className="text-base font-semibold">
              Versiunea {latestVersion}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onOpenHistory}
                className="rounded-full bg-white/10 px-3 py-2 text-sm transition hover:bg-white/15"
              >
                Istoric versiuni
              </button>

              <Link
                href="/contact"
                className="rounded-full bg-white/10 px-3 py-2 text-sm transition hover:bg-white/15"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-2 text-sm font-semibold">Roadmap</div>
            <div className="flex flex-wrap gap-2">
              {roadmap.map((r) => (
                <span
                  key={r.label}
                  className={[
                    "inline-flex max-w-[220px] items-center gap-2 rounded-full px-3 py-1.5 text-sm",
                    badgeClass(r.status),
                  ].join(" ")}
                  title={`${r.label} (${statusLabel(r.status)})`}
                >
                  <span className="truncate">{r.label}</span>
                  <span className="text-xs opacity-70">
                    {statusLabel(r.status)}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <FooterSocial />
        </div>
      </div>
    </div>
  );
}