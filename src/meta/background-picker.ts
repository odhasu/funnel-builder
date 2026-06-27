export interface BackgroundDef {
  id: string;
  label: string;
  type: 'color' | 'react-bits';
}

export const backgrounds: BackgroundDef[] = [
  { id: '', label: 'Solid Color', type: 'color' },
  { id: 'liquid-ether', label: 'Liquid Ether', type: 'react-bits' },
  { id: 'dither', label: 'Dither', type: 'react-bits' },
  { id: 'prism', label: 'Prism', type: 'react-bits' },
  { id: 'dark-veil', label: 'Dark Veil', type: 'react-bits' },
  { id: 'grid-scan', label: 'Grid Scan', type: 'react-bits' },
  { id: 'light-pillar', label: 'Light Pillar', type: 'react-bits' },
  { id: 'pixel-snow', label: 'Pixel Snow', type: 'react-bits' },
];
