import { FunnelSite } from '../types';

const SITES_KEY = 'funnel-builder:sites';

export function loadSites(): FunnelSite[] {
  try {
    const raw = localStorage.getItem(SITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSites(sites: FunnelSite[]): void {
  localStorage.setItem(SITES_KEY, JSON.stringify(sites));
}

export function createSite(name: string, type: FunnelSite['type'], templateId: string): FunnelSite {
  const now = Date.now();
  const site: FunnelSite = {
    id: `site-${now}-${Math.random().toString(36).slice(2, 6)}`,
    name,
    type,
    templateId,
    overrides: {},
    createdAt: now,
    updatedAt: now,
  };
  const sites = loadSites();
  sites.push(site);
  saveSites(sites);
  return site;
}

export function saveSite(site: FunnelSite): void {
  site.updatedAt = Date.now();
  const sites = loadSites();
  const idx = sites.findIndex(s => s.id === site.id);
  if (idx >= 0) {
    sites[idx] = site;
  } else {
    sites.push(site);
  }
  saveSites(sites);
}

export function deleteSite(id: string): void {
  const sites = loadSites().filter(s => s.id !== id);
  saveSites(sites);
}

export function getSite(id: string): FunnelSite | undefined {
  return loadSites().find(s => s.id === id);
}

export function updateOverrides(
  site: FunnelSite,
  sectionId: string,
  values: Record<string, any>
): FunnelSite {
  return {
    ...site,
    overrides: {
      ...site.overrides,
      [sectionId]: { ...(site.overrides[sectionId] || {}), ...values },
    },
  };
}
