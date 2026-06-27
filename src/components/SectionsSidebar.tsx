import { TemplateSection } from '../types';

interface Props {
  sections: TemplateSection[];
  selectedSectionId: string | null;
  onSelect: (id: string) => void;
  mergedAttributes: Record<string, Record<string, any>>;
}

const sectionIcons: Record<string, string> = {
  'vsl-hero': '\u{1F3AC}',
  'wl-hero': '\u{1F4CB}',
  'video-player': '▶️',
  'app-form': '\u{1F4DD}',
  'wl-form': '✉️',
  'contact-info': '\u{1F4DE}',
  'thank-you': '✅',
  'testimonials': '💬',
  'wins-section': '🏆',
  'cta-section': '🎯',
  'wl-footer': '🔗',
};

export function SectionsSidebar({ sections, selectedSectionId, onSelect }: Props) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto flex-shrink-0">
      <div className="p-3 border-b border-gray-200 bg-gray-100">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sections</h3>
      </div>
      <div className="p-2 space-y-1">
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => onSelect(section.id)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2 ${
              selectedSectionId === section.id
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'hover:bg-gray-100 text-gray-700 border border-transparent'
            }`}
          >
            <span className="text-base">{sectionIcons[section.component] || '\u{1F4C4}'}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{section.component}</div>
              <div className="text-xs text-gray-400">Section {idx + 1}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
