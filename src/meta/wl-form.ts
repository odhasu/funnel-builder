import { SectionMeta } from '../types';

export const wlFormMeta: SectionMeta = {
  component: 'wl-form',
  label: 'Waitlist Form',
  category: 'Form',
  icon: '✉️',
  settings: [
    { id: 'headline', label: 'Form Headline', type: 'text', default: 'Join the Waitlist' },
    { id: 'emailPlaceholder', label: 'Email Placeholder', type: 'text', default: 'Enter your best email' },
    { id: 'buttonText', label: 'Button Text', type: 'text', default: 'Join Waitlist' },
    { id: 'incentiveText', label: 'Incentive Text', type: 'text', default: '' },
    { id: 'bgColor', label: 'Background Color', type: 'color', default: '#000000' },
    { id: 'accentColor', label: 'Accent Color', type: 'color', default: '#39ff14' },
    { id: 'cardBorder', label: 'Card Border', type: 'text', default: 'rgba(57, 255, 20, 0.3)' },
    { id: 'gradientFrom', label: 'Gradient From', type: 'color', default: '#ffffff' },
    { id: 'gradientTo', label: 'Gradient To', type: 'color', default: '#969696' },
  ],
};
