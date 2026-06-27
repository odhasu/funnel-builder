import { SectionMeta } from '../types';

export const wlHeroMeta: SectionMeta = {
  component: 'wl-hero',
  label: 'Waitlist Hero',
  category: 'Header',
  icon: '📋',
  settings: [
    { id: 'headline', label: 'Headline', type: 'text', default: 'The Inner Circle Is Currently Closed' },
    { id: 'subheadline', label: 'Subheadline', type: 'textarea', default: "We're not accepting new applications right now, but join the waitlist below to be first in line when spots open up." },
    { id: 'bgColor', label: 'Background Color', type: 'color', default: '#000000' },
    { id: 'textColor', label: 'Text Color', type: 'color', default: '#ffffff' },
    { id: 'mutedColor', label: 'Muted Text Color', type: 'color', default: '#d4d4d4' },
    { id: 'gradientFrom', label: 'Gradient From', type: 'color', default: '#ffffff' },
    { id: 'gradientTo', label: 'Gradient To', type: 'color', default: '#919191' },
  ],
};
