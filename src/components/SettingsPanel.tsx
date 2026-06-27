import { TemplateSection } from '../types';
import { getSectionMeta } from '../meta';
import { SettingField } from './SettingField';

interface Props {
  section: TemplateSection;
  mergedAttributes: Record<string, any>;
  onChange: (key: string, value: any) => void;
}

export function SettingsPanel({ section, mergedAttributes, onChange }: Props) {
  const meta = getSectionMeta(section.component);

  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">{meta?.label || section.component}</h3>
        <p className="text-xs text-gray-500 mt-0.5 capitalize">{meta?.category || ''}</p>
      </div>
      <div className="p-4 space-y-4">
        {meta?.settings.map(setting => (
          <SettingField
            key={setting.id}
            setting={setting}
            value={mergedAttributes[setting.id]}
            onChange={val => onChange(setting.id, val)}
          />
        ))}
        {(!meta || meta.settings.length === 0) && (
          <p className="text-sm text-gray-400 italic">No settings available</p>
        )}
      </div>
    </div>
  );
}
