import { SectionMeta } from '../types';

export const wlFormMeta: SectionMeta = {
  component: 'wl-form',
  label: 'Waitlist Form',
  category: 'Form',
  icon: '✉️',
  settings: [
    { id: 'headline', label: 'Form Headline', type: 'text', default: 'Secure Your Spot' },
    { id: 'emailPlaceholder', label: 'Email Placeholder', type: 'text', default: 'Enter your best email' },
    { id: 'buttonText', label: 'Button Text', type: 'text', default: 'Join Waitlist' },
    { id: 'incentiveText', label: 'Incentive Text', type: 'text', default: '' },
    { id: 'bgColor', label: 'Background Color', type: 'color', default: '#ffffff' },
  ],
};
