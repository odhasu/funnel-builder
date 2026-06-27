export interface ButtonEffectDef {
  id: string;
  label: string;
  description: string;
}

export const buttonEffects: ButtonEffectDef[] = [
  { id: '', label: 'None', description: 'Standard button' },
  { id: 'glow', label: 'Glow', description: 'Soft glow on hover' },
  { id: 'shimmer', label: 'Shimmer', description: 'Shimmering light effect' },
  { id: 'pulse', label: 'Pulse', description: 'Pulsing ring effect' },
  { id: 'ripple', label: 'Ripple', description: 'Ripple on click' },
];
