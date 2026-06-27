import { SectionMeta } from '../types';

export const wlFooterMeta: SectionMeta = {
  component: 'wl-footer',
  label: 'Waitlist Footer',
  category: 'Footer',
  icon: '🔗',
  settings: [
    { id: 'text', label: 'Footer Text', type: 'text', default: 'Built using clyro' },
    { id: 'link', label: 'Link URL', type: 'text', default: 'https://clyro.io/' },
    { id: 'bgColor', label: 'Background Color', type: 'color', default: '#000000' },
  ],
};
