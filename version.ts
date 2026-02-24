export interface VersionEntry {
  version: string;
  date: string;
  changes: string[];
}

// Top-down: cea mai nouă versiune prima
export const versions: VersionEntry[] = [
  {
    version: '1.0.0',
    date: '2026-02-24',
    changes: ['Versiune de baza'],
  },
];