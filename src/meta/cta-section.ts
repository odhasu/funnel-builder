import { SectionMeta } from '../types';

export const ctaSectionMeta: SectionMeta = {
  component: 'cta-section',
  label: 'CTA Section',
  category: 'Call to Action',
  icon: '🎯',
  settings: [
    { id: 'buttonText', label: 'Button Text', type: 'text', default: 'Get Started Now' },
    { id: 'buttonColor', label: 'Button Color', type: 'color', default: '#39ff14' },
    { id: 'bgColor', label: 'Background Color', type: 'color', default: '#000000' },
  ],
};
