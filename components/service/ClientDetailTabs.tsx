"use client";

export type SectionKey = "personal" | "devices" | "photos" | "offers" | "financial" | "history";

const SECTIONS: { key: SectionKey; label: string; icon: string }[] = [
  { key: "personal", label: "Date personale", icon: "👤" },
  { key: "devices", label: "Dispozitive", icon: "📱" },
  { key: "photos", label: "Poze", icon: "📷" },
  { key: "offers", label: "Piese/Oferte", icon: "🔩" },
  { key: "financial", label: "Financiar", icon: "💰" },
  { key: "history", label: "Istoric", icon: "🕘" },
];

interface ClientDetailTabsProps {
  currentSection: SectionKey;
  onSectionChange: (section: SectionKey) => void;
}

export function ClientDetailTabs({ currentSection, onSectionChange }: ClientDetailTabsProps) {
  return (
    <div className="border-b border-gray-700 sticky top-[60px] bg-gray-900 z-10" data-testid="service-detail-tabs">
      <nav className="flex overflow-x-auto px-4" role="tablist">
        {SECTIONS.map((section) => (
          <button
            key={section.key}
            role="tab"
            aria-selected={currentSection === section.key}
            onClick={() => onSectionChange(section.key)}
            className={`flex-shrink-0 px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              currentSection === section.key
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
            data-testid={`service-tab-${section.key}`}
          >
            {section.icon} {section.label}
          </button>
        ))}
      </nav>
    </div>
  );
}