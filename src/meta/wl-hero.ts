import { SectionMeta } from '../types';

export const wlHeroMeta: SectionMeta = {
  component: 'wl-hero',
  label: 'Waitlist Hero',
  category: 'Header',
  icon: '📋',
  settings: [
    { id: 'headline', label: 'Headline', type: 'text', default: 'Join the Waitlist' },
    { id: 'subheadline', label: 'Subheadline', type: 'textarea', default: 'Be the first to know when we launch.' },
    { id: 'bgColor', label: 'Background Color', type: 'color', default: '#0f172a' },
  ],
};
