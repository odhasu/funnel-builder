import { buttonEffects } from '../meta/button-effect';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function ButtonEffectPicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {buttonEffects.map(effect => (
        <button
          key={effect.id}
          onClick={() => onChange(effect.id)}
          className={`p-2 border rounded-lg text-xs text-center ${
            value === effect.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className={`w-full h-12 rounded mb-1 bg-gradient-to-br ${
            effect.id === 'glow' ? 'from-yellow-300 to-orange-500' :
            effect.id === 'shimmer' ? 'from-blue-200 via-white to-blue-300' :
            effect.id === 'pulse' ? 'from-green-400 to-emerald-600' :
            effect.id === 'ripple' ? 'from-cyan-300 to-blue-500' :
            'from-gray-200 to-gray-400'
          }`} />
          {effect.label}
        </button>
      ))}
    </div>
  );
}
