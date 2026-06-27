import { SettingDef } from '../types';

interface Props {
  setting: SettingDef;
  value: any;
  onChange: (value: any) => void;
}

export function SettingField({ setting, value, onChange }: Props) {
  const val = value ?? setting.default;

  switch (setting.type) {
    case 'text':
    case 'video-url':
      return (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{setting.label}</label>
          <input
            type="text"
            value={val}
            onChange={e => onChange(e.target.value)}
            placeholder={setting.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      );

    case 'textarea':
      return (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{setting.label}</label>
          <textarea
            value={val}
            onChange={e => onChange(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
        </div>
      );

    case 'color':
      return (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{setting.label}</label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={val}
              onChange={e => onChange(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-gray-300"
            />
            <input
              type="text"
              value={val}
              onChange={e => onChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      );

    case 'boolean':
      return (
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-600">{setting.label}</label>
          <button
            onClick={() => onChange(!val)}
            className={`w-10 h-5 rounded-full transition-colors relative ${
              val ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
              val ? 'left-5' : 'left-0.5'
            }`} />
          </button>
        </div>
      );

    case 'select':
      return (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{setting.label}</label>
          <select
            value={val}
            onChange={e => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {setting.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );

    case 'image':
      return (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{setting.label}</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={val}
              onChange={e => onChange(e.target.value)}
              placeholder="Image URL"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              onClick={() => {
                const url = prompt('Enter image URL:');
                if (url) onChange(url);
              }}
              className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
            >
              Browse
            </button>
          </div>
          {val && (
            <img src={val} alt="" className="mt-2 w-full h-24 object-cover rounded-lg border border-gray-200" />
          )}
        </div>
      );

    case 'number':
      return (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{setting.label}</label>
          <input
            type="number"
            value={val}
            onChange={e => onChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      );

    default:
      return (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{setting.label}</label>
          <input
            type="text"
            value={val}
            onChange={e => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      );
  }
}
