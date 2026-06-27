export type FunnelType = 'vsl' | 'waitlist';

export interface FunnelSite {
  id: string;
  name: string;
  type: FunnelType;
  templateId: string;
  overrides: Record<string, Record<string, any>>;
  createdAt: number;
  updatedAt: number;
}

export interface TemplateSection {
  id: string;
  component: string;
  defaultAttributes: Record<string, any>;
}

export interface TemplatePage {
  id: string;
  name: string;
  slug: string;
  sections: TemplateSection[];
}

export interface Template {
  id: string;
  name: string;
  type: FunnelType;
  thumbnail: string;
  pages: TemplatePage[];
}

export type SettingType =
  | 'text'
  | 'textarea'
  | 'image'
  | 'color'
  | 'select'
  | 'background-picker'
  | 'video-url'
  | 'boolean'
  | 'number';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SettingDef {
  id: string;
  label: string;
  type: SettingType;
  default: any;
  options?: SelectOption[];
  placeholder?: string;
}

export interface SectionMeta {
  component: string;
  label: string;
  category: string;
  icon: string;
  settings: SettingDef[];
}
