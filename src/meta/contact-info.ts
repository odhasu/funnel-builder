import { SectionMeta } from '../types';

export const contactInfoMeta: SectionMeta = {
  component: 'contact-info',
  label: 'Contact Info',
  category: 'Footer',
  icon: '📞',
  settings: [
    { id: 'phone', label: 'Phone Number', type: 'text', default: '' },
    { id: 'email', label: 'Email Address', type: 'text', default: '' },
    { id: 'address', label: 'Address', type: 'text', default: '' },
  ],
};
