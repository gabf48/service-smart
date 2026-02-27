export type RoadmapStatus = "planned" | "in-progress" | "done";

export interface RoadmapItem {
  label: string;
  status: RoadmapStatus;
}

export const roadmap: RoadmapItem[] = [
  { label: "Admin users management", status: "planned" },
  { label: "Bookings / requests flow", status: "planned" },
  { label: "Email notifications", status: "planned" },
  { label: "Reviews moderation", status: "in-progress" },
  { label: "SEO + OG tags polish", status: "done" },
];