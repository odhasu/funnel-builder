import { SectionMeta } from '../types';

export const thankYouMeta: SectionMeta = {
  component: 'thank-you',
  label: 'Thank You Page',
  category: 'Page',
  icon: '✅',
  settings: [
    { id: 'headline', label: 'Headline', type: 'text', default: "You're on the Waitlist!" },
    { id: 'subheadline', label: 'Subheadline', type: 'textarea', default: "You Just Applied to the Waitlist. Check your email for confirmation." },
    { id: 'bgColor', label: 'Background Color', type: 'color', default: '#000000' },
    { id: 'gradientFrom', label: 'Gradient From', type: 'color', default: '#ffffff' },
    { id: 'gradientTo', label: 'Gradient To', type: 'color', default: '#919191' },
  ],
};
