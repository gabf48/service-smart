export type Service = {
  id: string;
  title: string;
  short: string;
  category: string;
  icon: string;
  ctaMotivo: string;
  priceFrom: number;
  heroImage?: string;
  trustPoints: string[];
  deliverables: string[];
  processSteps: { title: string; desc: string }[];
  notes?: string[];
};

export type Category = {
  key: string;
  title: string;
  subtitle: string;
  icon: string;
};