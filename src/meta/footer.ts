import { SectionMeta } from '../types';

export const footerMeta: SectionMeta = {
  component: 'footer',
  label: 'Footer',
  category: 'Footer',
  icon: '🔗',
  settings: [
    { id: 'text', label: 'Footer Text', type: 'text', default: '© 2024 All rights reserved.' },
  ],
};
