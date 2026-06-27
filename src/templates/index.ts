import { Template, FunnelType } from '../types';
import { vslBasicTemplate } from './vsl-basic';
import { waitlistBasicTemplate } from './waitlist-basic';

const templates: Template[] = [vslBasicTemplate, waitlistBasicTemplate];

export function getTemplates(type?: FunnelType): Template[] {
  if (type) return templates.filter(t => t.type === type);
  return templates;
}

export function getTemplate(id: string): Template | undefined {
  return templates.find(t => t.id === id);
}

export function getTemplateForType(type: FunnelType): Template {
  const t = templates.find(t => t.type === type);
  if (!t) throw new Error(`No template found for type: ${type}`);
  return t;
}
