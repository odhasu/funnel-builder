import { SectionMeta } from '../types';

export const winsSectionMeta: SectionMeta = {
  component: 'wins-section',
  label: 'Wins Section',
  category: 'Social Proof',
  icon: '🏆',
  settings: [
    { id: 'headline', label: 'Headline', type: 'text', default: 'More Inner Circle Wins:' },
    { id: 'bgColor', label: 'Background Color', type: 'color', default: '#000000' },
    { id: 'textColor', label: 'Text Color', type: 'color', default: '#ffffff' },
  ],
};
