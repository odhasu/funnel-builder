import { SectionMeta } from '../types';

export const videoPlayerMeta: SectionMeta = {
  component: 'video-player',
  label: 'Video Player',
  category: 'Media',
  icon: '▶️',
  settings: [
    { id: 'videoUrl', label: 'Video URL (YouTube/Vimeo)', type: 'video-url', default: '' },
    { id: 'autoplay', label: 'Auto-play', type: 'boolean', default: false },
    { id: 'loop', label: 'Loop', type: 'boolean', default: false },
    { id: 'coverImage', label: 'Cover Image', type: 'image', default: '' },
  ],
};
