import { SectionMeta } from '../types';
import { vslHeroMeta } from './vsl-hero';
import { wlHeroMeta } from './wl-hero';
import { videoPlayerMeta } from './video-player';
import { appFormMeta } from './app-form';
import { wlFormMeta } from './wl-form';
import { contactInfoMeta } from './contact-info';
import { thankYouMeta } from './thank-you';
import { footerMeta } from './footer';
import { testimonialsMeta } from './testimonials';
import { winsSectionMeta } from './wins-section';
import { ctaSectionMeta } from './cta-section';
import { wlFooterMeta } from './wl-footer';

const metaRegistry: Record<string, SectionMeta> = {
  'vsl-hero': vslHeroMeta,
  'wl-hero': wlHeroMeta,
  'video-player': videoPlayerMeta,
  'app-form': appFormMeta,
  'wl-form': wlFormMeta,
  'contact-info': contactInfoMeta,
  'thank-you': thankYouMeta,
  'footer': footerMeta,
  'testimonials': testimonialsMeta,
  'wins-section': winsSectionMeta,
  'cta-section': ctaSectionMeta,
  'wl-footer': wlFooterMeta,
};

export function getSectionMeta(component: string): SectionMeta | undefined {
  return metaRegistry[component];
}

export function getAllSectionMetas(): SectionMeta[] {
  return Object.values(metaRegistry);
}
