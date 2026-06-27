import { SectionMeta } from '../types';

export const appFormMeta: SectionMeta = {
  component: 'app-form',
  label: 'Application Form',
  category: 'Form',
  icon: '📝',
  settings: [
    { id: 'buttonText', label: 'Submit Button Text', type: 'text', default: 'Submit Application' },
    { id: 'successMessage', label: 'Success Message', type: 'textarea', default: 'Thank you! We will be in touch.' },
    { id: 'bgColor', label: 'Background Color', type: 'color', default: '#ffffff' },
  ],
};
