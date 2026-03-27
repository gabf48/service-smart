"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FooterExpanded } from "./footer/FooterExpanded";
import { FooterCollapsedBar } from "./footer/FooterCollapsedBar";
import { VersionHistoryModal } from "./footer/VersionHistoryModal";
import { getSortedVersions } from "./footer/footerUtils";

export default function Footer() {
  const pathname = usePathname();

  if (
    pathname?.startsWith("/dashboard/admin/reviews") ||
    pathname?.startsWith("/reviews")
  ) {
    return null;
  }

  const [expanded, setExpanded] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const expandedRef = useRef<HTMLDivElement | null>(null);

  const sortedVersions = useMemo(() => getSortedVersions(), []);
  const latestVersion = sortedVersions[0]?.version || "0.0.0";

  useEffect(() => {
    const onDown = (e: Event) => {
      if (!expanded || !expandedRef.current) return;
      if (!expandedRef.current.contains(e.target as Node)) setExpanded(false);
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("touchstart", onDown, { passive: true });

    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("touchstart", onDown);
    };
  }, [expanded]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 text-white">
        <FooterExpanded
          expanded={expanded}
          expandedRef={expandedRef}
          latestVersion={latestVersion}
          onOpenHistory={() => setHistoryOpen(true)}
        />

        <FooterCollapsedBar
          expanded={expanded}
          latestVersion={latestVersion}
          onToggle={() => setExpanded((v) => !v)}
          onHoverOpen={() => setExpanded(true)}
        />
      </div>

      <VersionHistoryModal
        open={historyOpen}
        sortedVersions={sortedVersions}
        onClose={() => setHistoryOpen(false)}
      />
    </>
  );
}