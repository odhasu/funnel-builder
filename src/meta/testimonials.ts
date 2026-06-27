import { SectionMeta } from '../types';

export const testimonialsMeta: SectionMeta = {
  component: 'testimonials',
  label: 'Testimonials',
  category: 'Social Proof',
  icon: '💬',
  settings: [
    { id: 'headline', label: 'Headline', type: 'text', default: "Interviews with the Inner Circle:" },
    { id: 'bgColor', label: 'Background Color', type: 'color', default: '#000000' },
    { id: 'textColor', label: 'Text Color', type: 'color', default: '#ffffff' },
  ],
};
