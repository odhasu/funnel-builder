# Funnel Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a template-based visual funnel builder (VSL + Waitlist) with React + GrapesJS canvas + React Bits animations + Next.js export.

**Architecture:** Browser-only React app (Vite). GrapesJS iframe canvas for visual editing. Templates define fixed section structure with editable attributes. User overrides stored in localStorage. Export generates downloadable Next.js project zip with React Bits components included. No backend server.

**Tech Stack:** React 18, Vite 5, TypeScript, GrapesJS, React Bits, JSZip, Tailwind CSS

## Global Constraints

- No backend server — all persistence via localStorage
- Export via JSZip -> browser download
- Templates are TypeScript data objects, not loaded from disk
- React Bits components used in settings previews + export only (canvas uses HTML/CSS rendering)
- Section IDs must be stable between template load and override application
- Each section component type maps 1:1 to a GrapesJS component type

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `src/vite-env.d.ts`
- Create: `src/types/index.ts`

**Interfaces:**
- Consumes: nothing
- Produces: type definitions consumed by all tasks, working Vite dev server

---
- [ ] **Step 1: Write package.json**

```json
{
  "name": "funnel-builder",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "grapesjs": "^0.21.0",
    "react-bits": "^0.1.0",
    "jszip": "^3.10.1",
    "file-saver": "^2.0.5"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/file-saver": "^2.0.7",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.5.0",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Write vite.config.ts**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

- [ ] **Step 3: Write tsconfig files**

`tsconfig.json`:
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

`tsconfig.app.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

`tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Write tailwind config + postcss**

`tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
```

`postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 5: Write index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Funnel Builder</title>
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  </head>
  <body class="bg-gray-50">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Write src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root {
  height: 100%;
  margin: 0;
  padding: 0;
}
```

- [ ] **Step 7: Write src/vite-env.d.ts**

```typescript
/// <reference types="vite/client" />
```

- [ ] **Step 8: Write types**

`src/types/index.ts`:
```typescript
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
```

- [ ] **Step 9: Write src/App.tsx**

```typescript
import { useState } from 'react';

export default function App() {
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col">
      {view === 'dashboard' ? (
        <Dashboard onSelect={(id) => { setSelectedSiteId(id); setView('editor'); }} />
      ) : (
        <EditorShell
          siteId={selectedSiteId!}
          onBack={() => setView('dashboard')}
        />
      )}
    </div>
  );
}

// Placeholder — filled in later tasks
function Dashboard({ onSelect }: { onSelect: (id: string) => void }) {
  return <div className="p-8"><h1 className="text-2xl">Dashboard</h1></div>;
}

function EditorShell({ siteId, onBack }: { siteId: string; onBack: () => void }) {
  return <div className="p-8"><h1 className="text-2xl">Editor: {siteId}</h1></div>;
}
```

- [ ] **Step 10: Write src/main.tsx**

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 11: Install and verify**

```bash
cd "/Users/oscargraafmans/Desktop/new project funnel builder"
npm install
npx tsc -b --noEmit
echo "Scaffold OK"
```

Expected: No TypeScript errors. `npm run dev` starts Vite dev server.

- [ ] **Step 12: Init template data directory + commit**

```bash
mkdir -p data
touch data/.gitkeep
git add -A
git commit -m "feat: scaffold react + vite + tailwind + types"
```

---

### Task 2: Templates + Storage Layer

**Files:**
- Create: `src/templates/vsl-basic.ts`
- Create: `src/templates/waitlist-basic.ts`
- Create: `src/templates/index.ts`
- Create: `src/services/storage.ts`

**Interfaces:**
- Consumes: `Template`, `FunnelSite`, `FunnelType` types from Task 1
- Produces: `getTemplate(type, id)` returning `Template`; `loadSites()`, `saveSite(site)`, `deleteSite(id)`, `createSite(name, type, templateId)` functions

---

- [ ] **Step 1: Write VSL template**

`src/templates/vsl-basic.ts`:
```typescript
import { Template } from '../types';

export const vslBasicTemplate: Template = {
  id: 'vsl-basic',
  name: 'VSL Classic',
  type: 'vsl',
  thumbnail: '',
  pages: [
    {
      id: 'home',
      name: 'Home',
      slug: '/',
      sections: [
        { id: 'sec-hero', component: 'vsl-hero', defaultAttributes: {
          headline: 'Transform Your Life Today',
          subheadline: 'Watch the video below to discover the proven system',
          ctaText: 'Apply Now',
          ctaLink: '',
          bgColor: '#0f172a',
          overlay: 'rgba(0,0,0,0.5)'
        }},
        { id: 'sec-video', component: 'video-player', defaultAttributes: {
          videoUrl: 'https://www.youtube.com/watch?v=example',
          autoplay: false,
          loop: false,
          coverImage: ''
        }},
        { id: 'sec-form', component: 'app-form', defaultAttributes: {
          fields: [
            { id: 'name', label: 'Full Name', type: 'text', required: true },
            { id: 'email', label: 'Email Address', type: 'email', required: true },
            { id: 'phone', label: 'Phone Number', type: 'tel', required: false }
          ],
          buttonText: 'Submit Application',
          successMessage: 'Thank you! We will be in touch.',
          bgColor: '#ffffff'
        }},
        { id: 'sec-contact', component: 'contact-info', defaultAttributes: {
          phone: '+1 (555) 123-4567',
          email: 'info@example.com',
          address: '123 Main St, City, State',
          socialLinks: []
        }},
      ]
    },
    {
      id: 'thank-you',
      name: 'Thank You',
      slug: '/thank-you',
      sections: [
        { id: 'sec-thanks', component: 'thank-you', defaultAttributes: {
          headline: 'Thank You!',
          subheadline: 'Your application has been received. We will contact you within 24 hours.',
          redirectUrl: '',
          redirectDelay: 0,
          bgColor: '#0f172a'
        }}
      ]
    }
  ]
};
```

- [ ] **Step 2: Write Waitlist template**

`src/templates/waitlist-basic.ts`:
```typescript
import { Template } from '../types';

export const waitlistBasicTemplate: Template = {
  id: 'waitlist-basic',
  name: 'Waitlist Classic',
  type: 'waitlist',
  thumbnail: '',
  pages: [
    {
      id: 'home',
      name: 'Home',
      slug: '/',
      sections: [
        { id: 'sec-hero', component: 'wl-hero', defaultAttributes: {
          headline: 'Join the Waitlist',
          subheadline: 'Be the first to know when we launch. Exclusive early access for waitlist members.',
          bgColor: '#0f172a'
        }},
        { id: 'sec-wl-form', component: 'wl-form', defaultAttributes: {
          headline: 'Secure Your Spot',
          emailPlaceholder: 'Enter your best email',
          buttonText: 'Join Waitlist',
          incentiveText: 'Early access bonus: 50% off lifetime',
          bgColor: '#ffffff'
        }},
        { id: 'sec-contact', component: 'contact-info', defaultAttributes: {
          phone: '',
          email: 'hello@example.com',
          address: '',
          socialLinks: []
        }},
      ]
    },
    {
      id: 'thank-you',
      name: 'Thank You',
      slug: '/thank-you',
      sections: [
        { id: 'sec-thanks', component: 'thank-you', defaultAttributes: {
          headline: "You're on the list!",
          subheadline: 'Check your email for confirmation. We will notify you when we launch.',
          redirectUrl: '',
          redirectDelay: 0,
          bgColor: '#0f172a'
        }}
      ]
    }
  ]
};
```

- [ ] **Step 3: Write template registry**

`src/templates/index.ts`:
```typescript
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
```

- [ ] **Step 4: Write storage service**

`src/services/storage.ts`:
```typescript
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
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: templates + storage layer"
```

---

### Task 3: Dashboard + Template Gallery UI

**Files:**
- Create: `src/components/Dashboard.tsx`
- Create: `src/components/SiteCard.tsx`
- Create: `src/components/TemplateGallery.tsx`
- Create: `src/components/TemplateCard.tsx`
- Modify: `src/App.tsx` (wire Dashboard)

**Interfaces:**
- Consumes: `FunnelSite`, `Template`, `FunnelType`, `getTemplates()`, `loadSites()`, `createSite()`, `deleteSite()`
- Produces: Dashboard view showing sites list + "Create New" → TemplateGallery → create site → navigate to editor

---

- [ ] **Step 1: Write Dashboard component**

`src/components/Dashboard.tsx`:
```tsx
import { useState, useEffect } from 'react';
import { FunnelSite } from '../types';
import { loadSites, deleteSite } from '../services/storage';
import { SiteCard } from './SiteCard';
import { TemplateGallery } from './TemplateGallery';

interface Props {
  onSelect: (siteId: string) => void;
}

export function Dashboard({ onSelect }: Props) {
  const [sites, setSites] = useState<FunnelSite[]>([]);
  const [showGallery, setShowGallery] = useState(false);

  const refresh = () => setSites(loadSites());

  useEffect(refresh, []);

  const handleDelete = (id: string) => {
    deleteSite(id);
    refresh();
  };

  const handleCreate = () => setShowGallery(true);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Funnel Builder</h1>
          <p className="text-gray-500 mt-1">Create and manage your funnel websites</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-medium transition-colors"
        >
          + New Funnel
        </button>
      </header>

      {sites.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-400 text-lg mb-4">No funnels yet</p>
          <button
            onClick={handleCreate}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create your first funnel →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sites.map(site => (
            <SiteCard
              key={site.id}
              site={site}
              onSelect={() => onSelect(site.id)}
              onDelete={() => handleDelete(site.id)}
            />
          ))}
        </div>
      )}

      {showGallery && (
        <TemplateGallery
          onSelect={(type, templateId) => {
            setShowGallery(false);
            onSelect(`new-${type}-${templateId}`);
          }}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Write SiteCard component**

`src/components/SiteCard.tsx`:
```tsx
import { FunnelSite } from '../types';

interface Props {
  site: FunnelSite;
  onSelect: () => void;
  onDelete: () => void;
}

const typeLabels: Record<string, string> = { vsl: 'VSL Funnel', waitlist: 'Waitlist' };

export function SiteCard({ site, onSelect, onDelete }: Props) {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 cursor-pointer transition-all group"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{site.name}</h3>
          <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full mt-1">
            {typeLabels[site.type] || site.type}
          </span>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onDelete(); }}
          className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all text-sm"
          title="Delete"
        >
          ✕
        </button>
      </div>
      <div className="text-xs text-gray-400">
        Updated {new Date(site.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write TemplateGallery**

`src/components/TemplateGallery.tsx`:
```tsx
import { useState } from 'react';
import { FunnelType } from '../types';
import { getTemplates } from '../templates';
import { createSite } from '../services/storage';
import { TemplateCard } from './TemplateCard';

interface Props {
  onSelect: (type: FunnelType, templateId: string) => void;
  onClose: () => void;
}

export function TemplateGallery({ onSelect, onClose }: Props) {
  const [filter, setFilter] = useState<FunnelType | 'all'>('all');
  const templates = filter === 'all' ? getTemplates() : getTemplates(filter);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Choose a Template</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        <div className="flex gap-2 mb-6">
          {(['all', 'vsl', 'waitlist'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'All' : f === 'vsl' ? 'VSL Funnels' : 'Waitlists'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {templates.map(t => (
            <TemplateCard
              key={t.id}
              template={t}
              onSelect={() => {
                const site = createSite(`${t.name} - ${Date.now()}`, t.type, t.id);
                onSelect(site.type, t.id);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Write TemplateCard**

`src/components/TemplateCard.tsx`:
```tsx
import { Template } from '../types';

interface Props {
  template: Template;
  onSelect: () => void;
}

const typeColors: Record<string, string> = {
  vsl: 'border-blue-200 bg-blue-50',
  waitlist: 'border-green-200 bg-green-50',
};

export function TemplateCard({ template, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      className={`text-left p-4 rounded-xl border-2 transition-all hover:shadow-md ${
        typeColors[template.type] || 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-400 text-sm">
        {template.thumbnail ? (
          <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span>Preview</span>
        )}
      </div>
      <h3 className="font-semibold text-gray-900">{template.name}</h3>
      <p className="text-sm text-gray-500 mt-1 capitalize">{template.type} • {template.pages.length} pages</p>
    </button>
  );
}
```

- [ ] **Step 5: Update App.tsx**

`src/App.tsx`:
```tsx
import { useState } from 'react';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  if (view === 'dashboard') {
    return <Dashboard onSelect={(id) => { setSelectedSiteId(id); setView('editor'); }} />;
  }

  // Editor placeholder — filled in Task 4
  return (
    <div className="h-full flex flex-col">
      <div className="text-center py-4 bg-gray-100 border-b">
        <button
          onClick={() => setView('dashboard')}
          className="text-blue-600 hover:text-blue-700"
        >
          ← Back to Dashboard
        </button>
        <span className="ml-4 text-gray-600">Editing: {selectedSiteId}</span>
      </div>
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Editor coming next...
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: dashboard + template gallery + site CRUD"
```

---

### Task 4: Editor Layout (3-Panel Shell)

**Files:**
- Create: `src/components/Editor.tsx` (main editor shell)
- Create: `src/components/SectionsSidebar.tsx`
- Create: `src/components/SettingsPanel.tsx`
- Create: `src/components/Toolbar.tsx`
- Create: `src/components/EditorCanvas.tsx` (placeholder — real GrapesJS in Task 5)
- Modify: `src/App.tsx` (wire Editor)

**Interfaces:**
- Consumes: `FunnelSite`, `Template`, `getTemplate()`, `getSite()`, `getTemplates()`
- Produces: Editor layout with 3 resizable panels, section list view, empty settings panel

---

- [ ] **Step 1: Write Editor component**

`src/components/Editor.tsx`:
```tsx
import { useState, useMemo } from 'react';
import { getSite, saveSite, updateOverrides } from '../services/storage';
import { getTemplate } from '../templates';
import { SectionsSidebar } from './SectionsSidebar';
import { EditorCanvas } from './EditorCanvas';
import { SettingsPanel } from './SettingsPanel';
import { Toolbar } from './Toolbar';
import { FunnelSite, Template } from '../types';

interface Props {
  siteId: string;
  onBack: () => void;
}

export function Editor({ siteId, onBack }: Props) {
  const [site, setSite] = useState<FunnelSite>(() => getSite(siteId)!);
  const template = useMemo<Template | undefined>(
    () => getTemplate(site.templateId),
    [site.templateId]
  );
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [currentPageId, setCurrentPageId] = useState<string>('home');

  if (!template) {
    return <div className="p-8 text-red-500">Template not found</div>;
  }

  const currentPage = template.pages.find(p => p.id === currentPageId);
  if (!currentPage) return <div className="p-8">Page not found</div>;

  const selectedSection = currentPage.sections.find(s => s.id === selectedSectionId) || null;

  const handleSectionClick = (sectionId: string) => {
    setSelectedSectionId(sectionId);
  };

  const handleOverrideChange = (sectionId: string, key: string, value: any) => {
    const updated = updateOverrides(site, sectionId, { [key]: value });
    setSite(updated);
    saveSite(updated);
  };

  const handleSave = () => {
    saveSite(site);
    alert('Saved!');
  };

  // Merge default attributes with overrides
  const getMergedAttributes = (sectionId: string, defaults: Record<string, any>) => {
    const overrides = site.overrides[sectionId] || {};
    return { ...defaults, ...overrides };
  };

  return (
    <div className="h-full flex flex-col">
      <Toolbar
        siteName={site.name}
        onBack={onBack}
        onSave={handleSave}
        currentPage={currentPageId}
        pages={template.pages}
        onPageChange={setCurrentPageId}
      />
      <div className="flex-1 flex overflow-hidden">
        <SectionsSidebar
          sections={currentPage.sections}
          selectedSectionId={selectedSectionId}
          onSelect={handleSectionClick}
          mergedAttributes={currentPage.sections.reduce((acc, s) => {
            acc[s.id] = getMergedAttributes(s.id, s.defaultAttributes);
            return acc;
          }, {} as Record<string, Record<string, any>>)}
        />
        <EditorCanvas
          template={template}
          site={site}
          selectedSectionId={selectedSectionId}
          onSelectSection={handleSectionClick}
        />
        {selectedSection && (
          <SettingsPanel
            key={selectedSection.id}
            section={selectedSection}
            mergedAttributes={getMergedAttributes(selectedSection.id, selectedSection.defaultAttributes)}
            onChange={(key, value) => handleOverrideChange(selectedSection.id, key, value)}
          />
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write SectionsSidebar**

`src/components/SectionsSidebar.tsx`:
```tsx
import { TemplateSection } from '../types';

interface Props {
  sections: TemplateSection[];
  selectedSectionId: string | null;
  onSelect: (id: string) => void;
  mergedAttributes: Record<string, Record<string, any>>;
}

const sectionIcons: Record<string, string> = {
  'vsl-hero': '🎬',
  'wl-hero': '📋',
  'video-player': '▶️',
  'app-form': '📝',
  'wl-form': '✉️',
  'contact-info': '📞',
  'thank-you': '✅',
};

export function SectionsSidebar({ sections, selectedSectionId, onSelect }: Props) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto flex-shrink-0">
      <div className="p-3 border-b border-gray-200 bg-gray-100">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sections</h3>
      </div>
      <div className="p-2 space-y-1">
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => onSelect(section.id)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2 ${
              selectedSectionId === section.id
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'hover:bg-gray-100 text-gray-700 border border-transparent'
            }`}
          >
            <span className="text-base">{sectionIcons[section.component] || '📄'}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{section.component}</div>
              <div className="text-xs text-gray-400">Section {idx + 1}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write EditorCanvas placeholder**

`src/components/EditorCanvas.tsx`:
```tsx
import { useEffect, useRef } from 'react';
import { Template, FunnelSite } from '../types';

interface Props {
  template: Template;
  site: FunnelSite;
  selectedSectionId: string | null;
  onSelectSection: (id: string) => void;
}

export function EditorCanvas({ template, site, selectedSectionId, onSelectSection }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex-1 bg-gray-200 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(#ccc_1px,transparent_1px)] bg-[length:20px_20px]" />
      <div
        ref={containerRef}
        className="relative w-[375px] h-[812px] bg-white shadow-2xl rounded-2xl overflow-y-auto"
        id="gjs-canvas-container"
      >
        {/* GrapesJS will mount here in Task 5 */}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Write SettingsPanel placeholder**

`src/components/SettingsPanel.tsx`:
```tsx
import { TemplateSection } from '../types';

interface Props {
  section: TemplateSection;
  mergedAttributes: Record<string, any>;
  onChange: (key: string, value: any) => void;
}

export function SettingsPanel({ section, mergedAttributes, onChange }: Props) {
  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">{section.component}</h3>
        <p className="text-xs text-gray-500 mt-0.5">Section settings</p>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-400 italic">Settings panel loads here in Task 6</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Write Toolbar**

`src/components/Toolbar.tsx`:
```tsx
import { TemplatePage } from '../types';

interface Props {
  siteName: string;
  onBack: () => void;
  onSave: () => void;
  currentPage: string;
  pages: TemplatePage[];
  onPageChange: (id: string) => void;
}

export function Toolbar({ siteName, onBack, onSave, currentPage, pages, onPageChange }: Props) {
  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-4 flex-shrink-0">
      <button onClick={onBack} className="text-gray-500 hover:text-gray-700 text-sm">
        ← Dashboard
      </button>
      <div className="w-px h-6 bg-gray-200" />
      <h2 className="font-semibold text-gray-900 text-sm">{siteName}</h2>
      <div className="flex-1" />
      <select
        value={currentPage}
        onChange={e => onPageChange(e.target.value)}
        className="text-sm border border-gray-300 rounded px-2 py-1"
      >
        {pages.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <button
        onClick={onSave}
        className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}
```

- [ ] **Step 6: Update App.tsx to use Editor**

Replace the mock editor section in `src/App.tsx`:
```tsx
import { Editor } from './components/Editor';

// ... inside App component, replace the return:
if (view === 'dashboard') {
  return <Dashboard onSelect={(id) => { setSelectedSiteId(id); setView('editor'); }} />;
}

return <Editor siteId={selectedSiteId!} onBack={() => setView('dashboard')} />;
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: editor 3-panel layout shell"
```

---

### Task 5: GrapesJS Canvas Integration

**Files:**
- Modify: `src/components/EditorCanvas.tsx`
- Create: `src/lib/grapesjs-bridge.ts`

**Interfaces:**
- Consumes: `Template`, `FunnelSite`, section/override data
- Produces: GrapesJS editor mounted in canvas iframe, custom component types registered, overrides applied

---

- [ ] **Step 1: Write the bridge**

`src/lib/grapesjs-bridge.ts`:
```typescript
import grapesjs, { Editor as GjsEditor } from 'grapesjs';
import { Template, FunnelSite } from '../types';

// Register custom component types for each funnel section
function registerFunnelComponents(editor: GjsEditor) {
  const sectionMap: Record<string, { html: (attrs: Record<string, any>) => string }> = {
    'vsl-hero': {
      html: (attrs) => `
        <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;position:relative;background:${attrs.bgColor || '#0f172a'};text-align:center;">
          <div style="max-width:720px;width:100%;position:relative;z-index:1;">
            <h1 style="font-size:3rem;font-weight:800;color:#fff;margin:0 0 1rem;line-height:1.2;">${attrs.headline || ''}</h1>
            <p style="font-size:1.125rem;color:#94a3b8;margin:0 0 2rem;">${attrs.subheadline || ''}</p>
            <a style="display:inline-block;background:#3b82f6;color:white;padding:1rem 2.5rem;border-radius:0.5rem;font-weight:600;text-decoration:none;cursor:pointer;">${attrs.ctaText || 'Apply Now'}</a>
          </div>
        </div>`
    },
    'wl-hero': {
      html: (attrs) => `
        <div style="min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;position:relative;background:${attrs.bgColor || '#0f172a'};text-align:center;">
          <div style="max-width:560px;width:100%;position:relative;z-index:1;">
            <h1 style="font-size:2.5rem;font-weight:800;color:#fff;margin:0 0 1rem;">${attrs.headline || ''}</h1>
            <p style="font-size:1.125rem;color:#94a3b8;margin:0;">${attrs.subheadline || ''}</p>
          </div>
        </div>`
    },
    'video-player': {
      html: (attrs) => `
        <div style="padding:4rem 2rem;display:flex;justify-content:center;background:#f8fafc;">
          <div style="max-width:720px;width:100%;aspect-ratio:16/9;background:#000;border-radius:1rem;overflow:hidden;display:flex;align-items:center;justify-content:center;color:white;position:relative;">
            <span style="font-size:4rem;opacity:0.5;">▶</span>
            ${attrs.coverImage ? `<img src="${attrs.coverImage}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />` : ''}
          </div>
        </div>`
    },
    'app-form': {
      html: (attrs) => `
        <div style="padding:4rem 2rem;background:${attrs.bgColor || '#fff'};">
          <div style="max-width:480px;margin:0 auto;">
            <form style="display:flex;flex-direction:column;gap:1rem;">
              ${(attrs.fields || []).map((f: any) => `
                <div>
                  <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:0.25rem;">${f.label}${f.required ? ' *' : ''}</label>
                  <input type="${f.type || 'text'}" placeholder="${f.label}" style="width:100%;padding:0.75rem;border:1px solid #d1d5db;border-radius:0.5rem;font-size:1rem;" />
                </div>
              `).join('')}
              <button type="submit" style="background:#3b82f6;color:white;padding:1rem;border:none;border-radius:0.5rem;font-weight:600;font-size:1rem;cursor:pointer;">${attrs.buttonText || 'Submit'}</button>
            </form>
          </div>
        </div>`
    },
    'wl-form': {
      html: (attrs) => `
        <div style="padding:4rem 2rem;background:${attrs.bgColor || '#fff'};">
          <div style="max-width:400px;margin:0 auto;text-align:center;">
            <h2 style="font-size:1.5rem;font-weight:700;color:#111827;margin:0 0 1.5rem;">${attrs.headline || ''}</h2>
            <form style="display:flex;flex-direction:column;gap:0.75rem;">
              <input type="email" placeholder="${attrs.emailPlaceholder || 'Enter your email'}" style="width:100%;padding:0.75rem;border:1px solid #d1d5db;border-radius:0.5rem;font-size:1rem;text-align:center;" />
              <button type="submit" style="background:#3b82f6;color:white;padding:1rem;border:none;border-radius:0.5rem;font-weight:600;font-size:1rem;cursor:pointer;">${attrs.buttonText || 'Join Waitlist'}</button>
            </form>
            ${attrs.incentiveText ? `<p style="font-size:0.8rem;color:#6b7280;margin-top:1rem;">${attrs.incentiveText}</p>` : ''}
          </div>
        </div>`
    },
    'contact-info': {
      html: (attrs) => `
        <div style="padding:3rem 2rem;background:#f9fafb;">
          <div style="max-width:480px;margin:0 auto;text-align:center;">
            <h3 style="font-size:1.25rem;font-weight:600;color:#111827;margin:0 0 1.5rem;">Contact Us</h3>
            <div style="display:flex;flex-direction:column;gap:0.75rem;color:#4b5563;">
              ${attrs.phone ? `<div>📞 ${attrs.phone}</div>` : ''}
              ${attrs.email ? `<div>✉️ ${attrs.email}</div>` : ''}
              ${attrs.address ? `<div>📍 ${attrs.address}</div>` : ''}
            </div>
          </div>
        </div>`
    },
    'thank-you': {
      html: (attrs) => `
        <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;background:${attrs.bgColor || '#0f172a'};text-align:center;">
          <div style="max-width:560px;">
            <div style="font-size:4rem;margin-bottom:1rem;">✅</div>
            <h1 style="font-size:2.5rem;font-weight:800;color:#fff;margin:0 0 1rem;">${attrs.headline || ''}</h1>
            <p style="font-size:1.125rem;color:#94a3b8;margin:0;">${attrs.subheadline || ''}</p>
          </div>
        </div>`
    },
  };

  Object.entries(sectionMap).forEach(([type, def]) => {
    editor.DomComponents.addType(type, {
      model: {
        defaults: {
          draggable: false,
          droppable: false,
          copyable: false,
          removable: false,
          traits: [],
        },
      },
      view: {
        init() {
          const model = this.model;
          // Re-render when attributes change
          this.listenTo(model, 'change', () => this.render());
        },
        render() {
          const attrs = this.model.getAttributes();
          const html = def.html(attrs);
          this.el.innerHTML = html;
          return this;
        },
      },
    });
  });
}

// Template HTML wrapper per component type (for rendering outside canvas)
export function getComponentHtml(
  component: string,
  attrs: Record<string, any>
): string {
  const renderers: Record<string, (a: Record<string, any>) => string> = {
    'vsl-hero': (a) => `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:${a.bgColor};text-align:center;"><h1 style="font-size:3rem;font-weight:800;color:#fff;">${a.headline}</h1></div>`,
    'wl-hero': (a) => `<div style="min-height:80vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:${a.bgColor};text-align:center;"><h1 style="font-size:2.5rem;font-weight:800;color:#fff;">${a.headline}</h1></div>`,
    'thank-you': (a) => `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:${a.bgColor};text-align:center;"><h1 style="font-size:2.5rem;font-weight:800;color:#fff;">${a.headline}</h1></div>`,
  };
  return renderers[component]?.(attrs) || `<div>Unknown: ${component}</div>`;
}

export function initGrapesJS(container: HTMLElement): GjsEditor {
  const editor = grapesjs.init({
    container,
    width: '100%',
    height: '100%',
    canvas: { scripts: [], styles: [] },
    storageManager: { type: 'none' },
    panels: { defaults: [] },
    deviceManager: { devices: [] },
    layerManager: { appendTo: '' },
    selectorManager: { appendTo: '' },
    styleManager: { appendTo: '' },
    traitManager: { appendTo: '' },
    blockManager: { appendTo: '' },
    undoManager: { track: false },
  });

  registerFunnelComponents(editor);
  return editor;
}

export function loadTemplateIntoCanvas(
  editor: GjsEditor,
  template: Template,
  site: FunnelSite,
  pageId: string
) {
  const page = template.pages.find(p => p.id === pageId);
  if (!page) return;

  editor.DomComponents.clear();
  const wrapper = editor.DomComponents.getWrapper();
  if (!wrapper) return;

  page.sections.forEach(section => {
    const overrides = site.overrides[section.id] || {};
    const attrs = { ...section.defaultAttributes, ...overrides };
    wrapper.append(`<div data-section-id="${section.id}" data-gjs-type="${section.component}"></div>`);
  });
}
```

- [ ] **Step 2: Update EditorCanvas**

`src/components/EditorCanvas.tsx`:
```tsx
import { useEffect, useRef, useState } from 'react';
import { Template, FunnelSite } from '../types';
import { initGrapesJS, loadTemplateIntoCanvas } from '../lib/grapesjs-bridge';
import type { Editor as GjsEditor } from 'grapesjs';

interface Props {
  template: Template;
  site: FunnelSite;
  selectedSectionId: string | null;
  onSelectSection: (id: string) => void;
}

export function EditorCanvas({ template, site, selectedSectionId, onSelectSection }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<GjsEditor | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || editorRef.current) return;
    const editor = initGrapesJS(containerRef.current);
    editorRef.current = editor;

    // Re-render canvas when component attributes change
    editor.on('component:update', () => {
      // Trigger React re-render via state
    });

    setReady(true);

    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!editorRef.current || !ready) return;
    loadTemplateIntoCanvas(editorRef.current, template, site, 'home');
  }, [template.id, ready]);

  // Highlight selected section
  useEffect(() => {
    if (!editorRef.current) return;
    const all = editorRef.current.DomComponents.getComponents();
    all.forEach((c: any) => {
      const el = c.getEl();
      if (!el) return;
      const sectionId = el.dataset?.sectionId;
      el.style.outline = sectionId === selectedSectionId ? '3px solid #3b82f6' : 'none';
      el.style.outlineOffset = sectionId === selectedSectionId ? '2px' : '0';
    });
  }, [selectedSectionId]);

  // Click handler on canvas — find section id from clicked element
  useEffect(() => {
    if (!editorRef.current || !ready) return;
    const canvasEl = editorRef.current.Canvas.getBody();
    const handler = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target !== canvasEl) {
        const sectionId = target.dataset?.sectionId;
        if (sectionId) {
          onSelectSection(sectionId);
          return;
        }
        target = target.parentElement;
      }
    };
    canvasEl.addEventListener('click', handler);
    return () => canvasEl.removeEventListener('click', handler);
  }, [ready]);

  return (
    <div className="flex-1 bg-gray-200 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(#ccc_1px,transparent_1px)] bg-[length:20px_20px]" />
      <div
        className="relative w-[375px] h-[812px] bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: grapesjs canvas with funnel component types"
```

---

### Task 6: Section Meta System + Settings Panel

**Files:**
- Create: `src/meta/vsl-hero.ts`
- Create: `src/meta/wl-hero.ts`
- Create: `src/meta/video-player.ts`
- Create: `src/meta/app-form.ts`
- Create: `src/meta/wl-form.ts`
- Create: `src/meta/contact-info.ts`
- Create: `src/meta/thank-you.ts`
- Create: `src/meta/footer.ts`
- Create: `src/meta/index.ts`
- Create: `src/components/SettingField.tsx`
- Modify: `src/components/SettingsPanel.tsx`
- Modify: `src/components/Editor.tsx` (add meta import for section lookup)
- Modify: `src/types/index.ts` (add meta-related types)

**Interfaces:**
- Consumes: `SectionMeta`, `SettingDef`, `SettingType` types
- Produces: Full settings panel with type-based field renderers, section meta registry

---

- [ ] **Step 1: Write all section meta files**

`src/meta/vsl-hero.ts`:
```typescript
import { SectionMeta } from '../types';

export const vslHeroMeta: SectionMeta = {
  component: 'vsl-hero',
  label: 'VSL Hero',
  category: 'Header',
  icon: '🎬',
  settings: [
    { id: 'headline', label: 'Headline', type: 'text', default: 'Transform Your Life Today' },
    { id: 'subheadline', label: 'Subheadline', type: 'textarea', default: 'Watch the video below to discover the proven system' },
    { id: 'ctaText', label: 'CTA Button Text', type: 'text', default: 'Apply Now' },
    { id: 'bgColor', label: 'Background Color', type: 'color', default: '#0f172a' },
    { id: 'overlay', label: 'Overlay Color', type: 'color', default: 'rgba(0,0,0,0.5)' },
  ],
};
```

`src/meta/wl-hero.ts`:
```typescript
import { SectionMeta } from '../types';
export const wlHeroMeta: SectionMeta = {
  component: 'wl-hero',
  label: 'Waitlist Hero',
  category: 'Header',
  icon: '📋',
  settings: [
    { id: 'headline', label: 'Headline', type: 'text', default: 'Join the Waitlist' },
    { id: 'subheadline', label: 'Subheadline', type: 'textarea', default: 'Be the first to know when we launch.' },
    { id: 'bgColor', label: 'Background Color', type: 'color', default: '#0f172a' },
  ],
};
```

`src/meta/video-player.ts`:
```typescript
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
```

`src/meta/app-form.ts`:
```typescript
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
```

`src/meta/wl-form.ts`:
```typescript
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
```

`src/meta/contact-info.ts`:
```typescript
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
```

`src/meta/thank-you.ts`:
```typescript
import { SectionMeta } from '../types';
export const thankYouMeta: SectionMeta = {
  component: 'thank-you',
  label: 'Thank You Page',
  category: 'Page',
  icon: '✅',
  settings: [
    { id: 'headline', label: 'Headline', type: 'text', default: 'Thank You!' },
    { id: 'subheadline', label: 'Subheadline', type: 'textarea', default: '' },
    { id: 'bgColor', label: 'Background Color', type: 'color', default: '#0f172a' },
  ],
};
```

`src/meta/footer.ts`:
```typescript
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
```

- [ ] **Step 2: Write meta registry**

`src/meta/index.ts`:
```typescript
import { SectionMeta } from '../types';
import { vslHeroMeta } from './vsl-hero';
import { wlHeroMeta } from './wl-hero';
import { videoPlayerMeta } from './video-player';
import { appFormMeta } from './app-form';
import { wlFormMeta } from './wl-form';
import { contactInfoMeta } from './contact-info';
import { thankYouMeta } from './thank-you';
import { footerMeta } from './footer';

const metaRegistry: Record<string, SectionMeta> = {
  'vsl-hero': vslHeroMeta,
  'wl-hero': wlHeroMeta,
  'video-player': videoPlayerMeta,
  'app-form': appFormMeta,
  'wl-form': wlFormMeta,
  'contact-info': contactInfoMeta,
  'thank-you': thankYouMeta,
  'footer': footerMeta,
};

export function getSectionMeta(component: string): SectionMeta | undefined {
  return metaRegistry[component];
}

export function getAllSectionMetas(): SectionMeta[] {
  return Object.values(metaRegistry);
}
```

- [ ] **Step 3: Write SettingField component**

`src/components/SettingField.tsx`:
```tsx
import { SettingDef } from '../types';

interface Props {
  setting: SettingDef;
  value: any;
  onChange: (value: any) => void;
}

export function SettingField({ setting, value, onChange }: Props) {
  const val = value ?? setting.default;

  switch (setting.type) {
    case 'text':
    case 'video-url':
      return (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{setting.label}</label>
          <input
            type="text"
            value={val}
            onChange={e => onChange(e.target.value)}
            placeholder={setting.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      );

    case 'textarea':
      return (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{setting.label}</label>
          <textarea
            value={val}
            onChange={e => onChange(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
        </div>
      );

    case 'color':
      return (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{setting.label}</label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={val}
              onChange={e => onChange(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-gray-300"
            />
            <input
              type="text"
              value={val}
              onChange={e => onChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      );

    case 'boolean':
      return (
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-600">{setting.label}</label>
          <button
            onClick={() => onChange(!val)}
            className={`w-10 h-5 rounded-full transition-colors relative ${
              val ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
              val ? 'left-5' : 'left-0.5'
            }`} />
          </button>
        </div>
      );

    case 'select':
      return (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{setting.label}</label>
          <select
            value={val}
            onChange={e => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {setting.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );

    case 'image':
      return (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{setting.label}</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={val}
              onChange={e => onChange(e.target.value)}
              placeholder="Image URL"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              onClick={() => {
                const url = prompt('Enter image URL:');
                if (url) onChange(url);
              }}
              className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
            >
              Browse
            </button>
          </div>
          {val && (
            <img src={val} alt="" className="mt-2 w-full h-24 object-cover rounded-lg border border-gray-200" />
          )}
        </div>
      );

    case 'number':
      return (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{setting.label}</label>
          <input
            type="number"
            value={val}
            onChange={e => onChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      );

    default:
      return (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{setting.label}</label>
          <input
            type="text"
            value={val}
            onChange={e => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      );
  }
}
```

- [ ] **Step 4: Update SettingsPanel**

`src/components/SettingsPanel.tsx`:
```tsx
import { TemplateSection } from '../types';
import { getSectionMeta } from '../meta';
import { SettingField } from './SettingField';

interface Props {
  section: TemplateSection;
  mergedAttributes: Record<string, any>;
  onChange: (key: string, value: any) => void;
}

export function SettingsPanel({ section, mergedAttributes, onChange }: Props) {
  const meta = getSectionMeta(section.component);

  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">{meta?.label || section.component}</h3>
        <p className="text-xs text-gray-500 mt-0.5 capitalize">{meta?.category || ''}</p>
      </div>
      <div className="p-4 space-y-4">
        {meta?.settings.map(setting => (
          <SettingField
            key={setting.id}
            setting={setting}
            value={mergedAttributes[setting.id]}
            onChange={val => onChange(setting.id, val)}
          />
        ))}
        {(!meta || meta.settings.length === 0) && (
          <p className="text-sm text-gray-400 italic">No settings available</p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Update Editor to pass meta-based override changes to GrapesJS**

Add to `src/lib/grapesjs-bridge.ts` a function to update component attributes:
```typescript
export function updateSectionAttribute(
  editor: GjsEditor,
  sectionId: string,
  key: string,
  value: any
) {
  const all = editor.DomComponents.getComponents();
  all.forEach((c: any) => {
    const el = c.getEl();
    if (el?.dataset?.sectionId === sectionId) {
      c.setAttributes({ [key]: value });
    }
  });
}
```

And in `src/lib/grapesjs-bridge.ts` exports, add a function to get all current section attributes for export:
```typescript
export function getAllSectionAttributes(
  editor: GjsEditor
): Record<string, Record<string, any>> {
  const result: Record<string, Record<string, any>> = {};
  const all = editor.DomComponents.getComponents();
  all.forEach((c: any) => {
    const el = c.getEl();
    if (el?.dataset?.sectionId) {
      result[el.dataset.sectionId] = c.getAttributes();
    }
  });
  return result;
}
```

Update `src/components/Editor.tsx` to sync override changes to GrapesJS:

In the `handleOverrideChange` function, add:
```typescript
import { updateSectionAttribute } from '../lib/grapesjs-bridge';
// ...
const handleOverrideChange = (sectionId: string, key: string, value: any) => {
  const updated = updateOverrides(site, sectionId, { [key]: value });
  setSite(updated);
  saveSite(updated);
  // Sync to GrapesJS canvas in real-time
  if (editorRef.current) {
    updateSectionAttribute(editorRef.current, sectionId, key, value);
  }
};
```

To access editorRef from Editor.tsx, store it in a ref at the Editor level — or simplify by having EditorCanvas expose a ref or callback. For MVP, simplest: expose a mutable ref from EditorCanvas.

`src/components/Editor.tsx` — add import and ref:
```typescript
import { useRef } from 'react';
// ... inside component:
const editorRef = useRef<any>(null);
// Pass ref to EditorCanvas:
<EditorCanvas ref={editorRef} ... />
```

Update `EditorCanvas.tsx` to accept a forwarded ref and set `editorRef.current = editor`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: section meta system + settings panel with field renderers"
```

---

### Task 7: Override Sync + Edit Flow Complete

**Files:**
- Modify: `src/components/EditorCanvas.tsx` (forward ref, expose editor)
- Modify: `src/components/Editor.tsx` (wire override sync both ways)
- Modify: `src/lib/grapesjs-bridge.ts` (ensure attribute changes re-render canvas)

**Interfaces:**
- Consumes: All prior tasks
- Produces: Full edit flow — click section on canvas → see settings → edit → canvas re-renders

---

- [ ] **Step 1: Make EditorCanvas expose editor via forwardRef**

`src/components/EditorCanvas.tsx`:
```tsx
import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
// ...
export const EditorCanvas = forwardRef<any, Props>(({ template, site, selectedSectionId, onSelectSection }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getEditor: () => editorRef.current,
  }));

  // ... rest same as before
});
```

- [ ] **Step 2: Wire Editor override sync**

`src/components/Editor.tsx` — key change in Editor:
```tsx
const editorRef = useRef<any>(null);

const handleOverrideChange = (sectionId: string, key: string, value: any) => {
  const updated = updateOverrides(site, sectionId, { [key]: value });
  setSite(updated);
  saveSite(updated);
  // Live sync to GrapesJS
  const editor = editorRef.current?.getEditor?.();
  if (editor) {
    updateSectionAttribute(editor, sectionId, key, value);
  }
};

// Pass ref
<EditorCanvas
  ref={editorRef}
  ...
/>
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: full override sync — settings ↔ canvas real-time"
```

---

### Task 8: Next.js Export Engine

**Files:**
- Create: `src/services/export.ts`
- Create: `src/components/ExportDialog.tsx`
- Create: `src/templates/react-bits-export.tsx` (React Bits components for Next.js export)
- Create: `src/templates/nextjs-package.ts` (package.json template)
- Modify: `src/components/Toolbar.tsx` (add Export button)
- Modify: `src/components/Editor.tsx` (add export handler)

**Interfaces:**
- Consumes: Template definitions, section meta, site overrides
- Produces: Downloadable zip with Next.js project including all sections as components, React Bits deps, vercel.json

---

- [ ] **Step 1: Write Next.js export service**

`src/services/export.ts`:
```typescript
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FunnelSite, Template, SectionMeta } from '../types';
import { getSectionMeta } from '../meta';

// Generate Next.js page component content for a given page
function generatePageComponent(
  pageId: string,
  template: Template,
  site: FunnelSite
): string {
  const page = template.pages.find(p => p.id === pageId);
  if (!page) return '';

  const sectionImports: string[] = [];
  const sectionUses: string[] = [];

  page.sections.forEach((section, idx) => {
    const meta = getSectionMeta(section.component);
    const name = meta?.label?.replace(/\s+/g, '') || `Section${idx}`;
    const attrs = { ...section.defaultAttributes, ...(site.overrides[section.id] || {}) };
    sectionImports.push(`import ${name} from '../components/${name}';`);
    sectionUses.push(`      <${name} {...${JSON.stringify(attrs)}} />`);
  });

  return `import Head from 'next/head';

${sectionImports.join('\n')}

export default function ${pageId === 'home' ? 'Home' : 'ThankYou'}() {
  return (
    <>
      <Head>
        <title>${site.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
${sectionUses.join('\n')}
      </main>
    </>
  );
}
`;
}

// Generate React component file for a single section
function generateSectionComponent(
  sectionMeta: SectionMeta,
  overrides: Record<string, any> | undefined
): string {
  const defaults = sectionMeta.settings.reduce((acc, s) => {
    acc[s.id] = overrides?.[s.id] ?? s.default;
    return acc;
  }, {} as Record<string, any>);

  // Simple HTML-based render per component type
  const renderMap: Record<string, (p: Record<string, any>) => string> = {
    'vsl-hero': (p) =>
`      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '${p.bgColor}', color: 'white', textAlign: 'center' as const }}>
        <div style={{ maxWidth: 720 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 1rem' }}>{props.headline}</h1>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8', margin: '0 0 2rem' }}>{props.subheadline}</p>
          <a style={{ display: 'inline-block', background: '#3b82f6', color: 'white', padding: '1rem 2.5rem', borderRadius: '0.5rem', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}>{props.ctaText}</a>
        </div>
      </section>`,
    'wl-hero': (p) =>
`      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '${p.bgColor}', color: 'white', textAlign: 'center' as const }}>
        <div style={{ maxWidth: 560 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem' }}>{props.headline}</h1>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8' }}>{props.subheadline}</p>
        </div>
      </section>`,
    'video-player': () =>
`      <section style={{ padding: '4rem 2rem', display: 'flex', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ maxWidth: 720, width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <p>Video Player</p>
        </div>
      </section>`,
    'app-form': (p) => {
      const fields = ((p.fields || []) as any[]).map(f =>
`          <div key="${f.id}">
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>${f.label}${f.required ? ' *' : ''}</label>
            <input type="${f.type || 'text'}" placeholder="${f.label}" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
          </div>`
      ).join('\n');
      return `      <section style={{ padding: '4rem 2rem', background: '${p.bgColor}' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
${fields}
            <button type="submit" style={{ background: '#3b82f6', color: 'white', padding: '1rem', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>{props.buttonText}</button>
          </form>
        </div>
      </section>`;
    },
    'wl-form': (p) =>
`      <section style={{ padding: '4rem 2rem', background: '${p.bgColor}', textAlign: 'center' as const }}>
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: '0 0 1.5rem' }}>{props.headline}</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input type="email" placeholder={props.emailPlaceholder} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', textAlign: 'center' as const }} />
            <button type="submit" style={{ background: '#3b82f6', color: 'white', padding: '1rem', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>{props.buttonText}</button>
          </form>
          {props.incentiveText && <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '1rem' }}>{props.incentiveText}</p>}
        </div>
      </section>`,
    'contact-info': (p) =>
`      <section style={{ padding: '3rem 2rem', background: '#f9fafb', textAlign: 'center' as const }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', margin: '0 0 1.5rem' }}>Contact Us</h3>
          <div style={{ color: '#4b5563' }}>
            {props.phone && <div>📞 {props.phone}</div>}
            {props.email && <div>✉️ {props.email}</div>}
            {props.address && <div>📍 {props.address}</div>}
          </div>
        </div>
      </section>`,
    'thank-you': (p) =>
`      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '${p.bgColor}', color: 'white', textAlign: 'center' as const }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem' }}>{props.headline}</h1>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8' }}>{props.subheadline}</p>
        </div>
      </section>`,
  };

  const renderBody = renderMap[sectionMeta.component]?.(defaults) || '';

  return `interface Props {
${sectionMeta.settings.map(s => `  ${s.id}: ${s.type === 'number' || s.type === 'boolean' ? s.type : 'string'};`).join('\n')}
}

export default function ${sectionMeta.label.replace(/\s+/g, '')}(props: Props) {
  return (
${renderBody}
  );
}
`;
}

export async function exportAsNextJSProject(site: FunnelSite, template: Template, siteName: string) {
  const zip = new JSZip();
  const slug = siteName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'funnel';

  // package.json
  zip.file('package.json', JSON.stringify({
    name: slug,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
    },
    dependencies: {
      next: '^14.2.0',
      react: '^18.3.0',
      'react-dom': '^18.3.0',
    },
    devDependencies: {
      '@types/node': '^20.0.0',
      '@types/react': '^18.3.0',
      '@types/react-dom': '^18.3.0',
      typescript: '^5.5.0',
    },
  }, null, 2));

  // next.config.js
  zip.file('next.config.js', `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
module.exports = nextConfig;
`);

  // vercel.json
  zip.file('vercel.json', JSON.stringify({ version: 2 }, null, 2));

  // tsconfig.json
  zip.file('tsconfig.json', JSON.stringify({
    compilerOptions: {
      target: 'es5',
      lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: 'preserve',
      incremental: true,
      plugins: [{ name: 'next' }],
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
    exclude: ['node_modules'],
  }, null, 2));

  // Pages
  template.pages.forEach(page => {
    const content = generatePageComponent(page.id, template, site);
    const fileName = `pages/${page.id === 'home' ? 'index' : page.id}.tsx`;
    zip.file(fileName, content);
  });

  // Components - one per section type used in this template
  const usedComponents = new Set(template.pages.flatMap(p => p.sections.map(s => s.component)));
  usedComponents.forEach(comp => {
    const meta = getSectionMeta(comp);
    if (!meta) return;
    const overrides = template.pages.flatMap(p =>
      p.sections.filter(s => s.component === comp).map(s => site.overrides[s.id])
    ).find(Boolean);
    const content = generateSectionComponent(meta, overrides);
    zip.file(`components/${meta.label.replace(/\s+/g, '')}.tsx`, content);
  });

  // next-env.d.ts
  zip.file('next-env.d.ts', `/// <reference types="next" />
/// <reference types="next/image-types/global" />
`);

  // .gitignore
  zip.file('.gitignore', 'node_modules\n.next\nout\n');

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${slug}.zip`);
}
```

- [ ] **Step 2: Write ExportDialog**

`src/components/ExportDialog.tsx`:
```tsx
import { useState } from 'react';
import { FunnelSite, Template } from '../types';
import { exportAsNextJSProject } from '../services/export';

interface Props {
  site: FunnelSite;
  template: Template;
  siteName: string;
  onClose: () => void;
}

export function ExportDialog({ site, template, siteName, onClose }: Props) {
  const [exporting, setExporting] = useState(false);
  const [done, setDone] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportAsNextJSProject(site, template, siteName);
      setDone(true);
    } catch (err) {
      alert('Export failed: ' + (err as Error).message);
    }
    setExporting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Export Funnel</h2>
        <p className="text-gray-600 text-sm mb-6">
          Generate a Next.js project with all your sections and settings.
          Upload the zip to Claude to deploy to Vercel.
        </p>
        {done ? (
          <div className="text-center py-4">
            <p className="text-green-600 font-medium mb-2">✅ Exported successfully!</p>
            <p className="text-xs text-gray-400">Upload the zip to Claude, then ask: "Deploy this to Vercel"</p>
            <button onClick={onClose} className="mt-4 text-blue-600 hover:text-blue-700 text-sm">Done</button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {exporting ? 'Exporting...' : 'Download ZIP'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Update Toolbar (add Export button)**

Add to `src/components/Toolbar.tsx`:
```tsx
interface Props {
  // ... existing props
  onExport: () => void;
}

// In the JSX, add before Save:
<button
  onClick={onExport}
  className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1.5 border border-gray-300 rounded"
>
  Export
</button>
```

- [ ] **Step 4: Wire export in Editor.tsx**

Add to `src/components/Editor.tsx`:
```tsx
import { useState } from 'react';
import { ExportDialog } from './ExportDialog';
// ...
const [showExport, setShowExport] = useState(false);

// In the template:
<Toolbar
  // ...existing props
  onExport={() => setShowExport(true)}
/>
{showExport && (
  <ExportDialog
    site={site}
    template={template}
    siteName={site.name}
    onClose={() => setShowExport(false)}
  />
)}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: next.js export engine with zip download"
```

---

### Task 9: React Bits Integration

**Files:**
- Create: `src/meta/background-picker.ts`
- Create: `src/meta/button-effect.ts`
- Create: `src/components/BackgroundPicker.tsx`
- Create: `src/components/ButtonEffectPicker.tsx`
- Modify: `src/meta/vsl-hero.ts` (add background-picker setting)
- Modify: `src/components/SettingField.tsx` (add background-picker type)
- Modify: `src/services/export.ts` (include React Bits deps in exported Next.js project)

**Interfaces:**
- Consumes: React Bits components for backgrounds + button effects
- Produces: Background picker + button effect picker in settings panel, React Bits in export

---

- [ ] **Step 1: Write BackgroundPicker**

`src/components/BackgroundPicker.tsx`:
```tsx
interface Props {
  value: string;
  onChange: (value: string) => void;
}

const backgrounds = [
  { id: '', label: 'Solid Color', type: 'color' },
  { id: 'liquid-ether', label: 'Liquid Ether', type: 'react-bits' },
  { id: 'dither', label: 'Dither', type: 'react-bits' },
  { id: 'prism', label: 'Prism', type: 'react-bits' },
  { id: 'dark-veil', label: 'Dark Veil', type: 'react-bits' },
  { id: 'grid-scan', label: 'Grid Scan', type: 'react-bits' },
  { id: 'light-pillar', label: 'Light Pillar', type: 'react-bits' },
  { id: 'pixel-snow', label: 'Pixel Snow', type: 'react-bits' },
];

export function BackgroundPicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <button
        onClick={() => onChange('')}
        className={`p-2 border rounded-lg text-xs text-center ${
          value === '' || value === null
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="w-full h-12 rounded bg-gradient-to-br from-gray-100 to-gray-300 mb-1" />
        Solid
      </button>
      {backgrounds.slice(1).map(bg => (
        <button
          key={bg.id}
          onClick={() => onChange(bg.id)}
          className={`p-2 border rounded-lg text-xs text-center ${
            value === bg.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className={`w-full h-12 rounded mb-1 bg-gradient-to-br ${
            bg.id === 'liquid-ether' ? 'from-purple-400 via-pink-400 to-blue-400' :
            bg.id === 'dither' ? 'from-gray-600 to-gray-900' :
            bg.id === 'prism' ? 'from-blue-300 via-green-300 to-purple-300' :
            bg.id === 'dark-veil' ? 'from-gray-900 to-black' :
            bg.id === 'grid-scan' ? 'from-cyan-500 to-blue-800' :
            bg.id === 'light-pillar' ? 'from-amber-200 via-yellow-400 to-orange-500' :
            'from-sky-300 to-indigo-600'
          }`} />
          {bg.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Update vsl-hero meta to include background picker**

`src/meta/vsl-hero.ts`:
```typescript
import { SectionMeta } from '../types';
export const vslHeroMeta: SectionMeta = {
  component: 'vsl-hero',
  label: 'VSL Hero',
  category: 'Header',
  icon: '🎬',
  settings: [
    { id: 'headline', label: 'Headline', type: 'text', default: 'Transform Your Life Today' },
    { id: 'subheadline', label: 'Subheadline', type: 'textarea', default: '' },
    { id: 'ctaText', label: 'CTA Button Text', type: 'text', default: 'Apply Now' },
    { id: 'background', label: 'Background Effect', type: 'background-picker', default: '' },
    { id: 'bgColor', label: 'Fallback Color', type: 'color', default: '#0f172a' },
  ],
};
```

- [ ] **Step 3: Add background-picker to SettingField**

In `src/components/SettingField.tsx`, add before the `default` case:
```tsx
case 'background-picker':
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-2">{setting.label}</label>
      <BackgroundPicker value={value ?? ''} onChange={onChange} />
    </div>
  );
```

Add import at top:
```tsx
import { BackgroundPicker } from './BackgroundPicker';
```

- [ ] **Step 4: Update export to include React Bits**

In `src/services/export.ts`, modify the package.json generator to include react-bits:
```typescript
dependencies: {
  next: '^14.2.0',
  react: '^18.3.0',
  'react-dom': '^18.3.0',
  'react-bits': '^0.1.0',
},
```

Also add a small wrapper for React Bits backgrounds in the export, so the exported project includes them. For MVP, this is a simple conditional import mapping.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: react bits background picker integration"
```

---

### Task 10: Polish + Edge Cases

**Files:**
- Modify: `src/components/Dashboard.tsx` (empty site list handling)
- Modify: `src/components/Editor.tsx` (loading states, unsaved changes warning)
- Modify: `src/services/storage.ts` (error handling, localStorage quota)
- Create: `src/components/Toast.tsx` (simple notification system)

**No Interfaces changes.**

---

- [ ] **Step 1: Add Toast component**

`src/components/Toast.tsx`:
```tsx
import { useEffect, useState } from 'react';

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastListeners: ((t: Toast) => void)[] = [];

export function showToast(message: string, type: Toast['type'] = 'info') {
  toastListeners.forEach(fn => fn({ message, type }));
}

export function ToastContainer() {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    toastListeners.push(setToast);
    return () => { toastListeners = toastListeners.filter(fn => fn !== setToast); };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  if (!toast) return null;

  const colors = { success: 'bg-green-600', error: 'bg-red-600', info: 'bg-blue-600' };

  return (
    <div className={`fixed bottom-6 right-6 ${colors[toast.type]} text-white px-5 py-3 rounded-xl shadow-lg z-50 text-sm font-medium transition-all`}>
      {toast.message}
    </div>
  );
}
```

- [ ] **Step 2: Add persistence error handling in storage.ts**

```typescript
export function saveSites(sites: FunnelSite[]): boolean {
  try {
    localStorage.setItem(SITES_KEY, JSON.stringify(sites));
    return true;
  } catch (e) {
    console.error('Failed to save sites:', e);
    return false;
  }
}
```

- [ ] **Step 3: Add Toast to App.tsx**

Add `import { ToastContainer } from './components/Toast';` and `<ToastContainer />` at the root.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: polish + toast notifications + error handling"
```

---

### Task 11: Test Full Flow

**No files changed.** Manual test sequence:

1. `npm run dev` → Dashboard loads empty state
2. Click "New Funnel" → Gallery shows VSL Classic + Waitlist Classic
3. Click VSL Classic → navigates to editor
4. Editor shows 3 panels: sections (left), canvas (center), empty (right)
5. Click "Hero" in sections sidebar → right panel shows settings (headline, subheadline, CTA, background, color)
6. Change headline text → GrapesJS canvas re-renders with new text
7. Change background color → canvas updates in real-time
8. Click Save → toast "Saved!"
9. Back to Dashboard → site card visible
10. Click existing site → editor loads with saved overrides applied
11. Click Export → dialog → Download ZIP
12. Unzip → verify Next.js project structure (package.json, pages/, components/)
13. `cd` into unzipped dir → `npm install` → `npm run dev` → site renders with all content
