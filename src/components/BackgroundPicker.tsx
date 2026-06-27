import { backgrounds } from '../meta/background-picker';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function BackgroundPicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <button
        onClick={() => onChange('')}
        className={`p-2 border rounded-lg text-xs text-center ${
          value === '' || value === null
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="w-full h-12 rounded bg-gradient-to-br from-gray-100 to-gray-300 mb-1" />
        Solid
      </button>
      {backgrounds.slice(1).map(bg => (
        <button
          key={bg.id}
          onClick={() => onChange(bg.id)}
          className={`p-2 border rounded-lg text-xs text-center ${
            value === bg.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className={`w-full h-12 rounded mb-1 bg-gradient-to-br ${
            bg.id === 'liquid-ether' ? 'from-purple-400 via-pink-400 to-blue-400' :
            bg.id === 'dither' ? 'from-gray-600 to-gray-900' :
            bg.id === 'prism' ? 'from-blue-300 via-green-300 to-purple-300' :
            bg.id === 'dark-veil' ? 'from-gray-900 to-black' :
            bg.id === 'grid-scan' ? 'from-cyan-500 to-blue-800' :
            bg.id === 'light-pillar' ? 'from-amber-200 via-yellow-400 to-orange-500' :
            'from-sky-300 to-indigo-600'
          }`} />
          {bg.label}
        </button>
      ))}
    </div>
  );
}
