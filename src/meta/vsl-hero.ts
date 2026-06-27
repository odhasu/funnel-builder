import { SectionMeta } from '../types';

export const vslHeroMeta: SectionMeta = {
  component: 'vsl-hero',
  label: 'VSL Hero',
  category: 'Header',
  icon: '🎬',
  settings: [
    { id: 'headline', label: 'Headline', type: 'text', default: 'Transform Your Life Today' },
    { id: 'subheadline', label: 'Subheadline', type: 'textarea', default: 'Watch the video below to discover the proven system' },
    { id: 'ctaText', label: 'CTA Button Text', type: 'text', default: 'Apply Now' },
    { id: 'background', label: 'Background Effect', type: 'background-picker', default: '' },
    { id: 'bgColor', label: 'Fallback Color', type: 'color', default: '#0f172a' },
    { id: 'overlay', label: 'Overlay Color', type: 'color', default: 'rgba(0,0,0,0.5)' },
  ],
};
