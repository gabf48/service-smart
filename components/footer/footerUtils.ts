import { versions } from "@/app/version";
import type { RoadmapStatus } from "@/app/roadmap";

export function getSortedVersions() {
  return [...versions].sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    if (da !== db) return db - da;

    const pa = a.version.split(".").map((n) => Number(n) || 0);
    const pb = b.version.split(".").map((n) => Number(n) || 0);

    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const diff = (pb[i] ?? 0) - (pa[i] ?? 0);
      if (diff !== 0) return diff;
    }

    return 0;
  });
}

export function badgeClass(status: RoadmapStatus) {
  if (status === "done") {
    return "bg-green-500/15 text-green-200 ring-1 ring-green-400/20";
  }

  if (status === "in-progress") {
    return "bg-yellow-500/15 text-yellow-200 ring-1 ring-yellow-400/20";
  }

  return "bg-white/10 text-white/70 ring-1 ring-white/15";
}

export function statusLabel(status: RoadmapStatus) {
  if (status === "done") return "done";
  if (status === "in-progress") return "wip";
  return "planned";
}