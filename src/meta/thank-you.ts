import { SectionMeta } from '../types';

export const thankYouMeta: SectionMeta = {
  component: 'thank-you',
  label: 'Thank You Page',
  category: 'Page',
  icon: '✅',
  settings: [
    { id: 'headline', label: 'Headline', type: 'text', default: 'Thank You!' },
    { id: 'subheadline', label: 'Subheadline', type: 'textarea', default: '' },
    { id: 'bgColor', label: 'Background Color', type: 'color', default: '#000000' },
  ],
};
