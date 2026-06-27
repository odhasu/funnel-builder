import { TemplateSection } from '../types';

interface Props {
  section: TemplateSection;
  mergedAttributes: Record<string, any>;
  onChange: (key: string, value: any) => void;
}

export function SettingsPanel({ section, mergedAttributes, onChange }: Props) {
  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">{section.component}</h3>
        <p className="text-xs text-gray-500 mt-0.5">Section settings</p>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-400 italic">Settings panel loads here in Task 6</p>
      </div>
    </div>
  );
}
