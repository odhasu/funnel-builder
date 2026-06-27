# Funnel Builder — CLAUDE.md

## Project Overview

Vite + React 18 + TypeScript app that builds funnel websites visually using GrapesJS. Users create funnels from templates (VSL, waitlist), customize sections in a page builder, and export as Next.js projects (zipped).

## Architecture

```
src/
  App.tsx                  — Router: dashboard ↔ editor
  main.tsx                 — Entry point
  index.css                — Tailwind + global styles
  components/
    Dashboard.tsx          — Site list / create
    Editor.tsx             — GrapesJS editor container
    EditorCanvas.tsx       — GrapesJS canvas wrapper
    SectionsSidebar.tsx    — Section list + reorder
    SettingsPanel.tsx      — Section property panel
    SettingField.tsx       — Dynamic form fields per setting type
    TemplateGallery.tsx    — New-funnel template picker
    TemplateCard.tsx       — Template card in gallery
    SiteCard.tsx           — Site card in dashboard
    Toolbar.tsx            — Editor toolbar (save, export, back)
    ExportDialog.tsx       — Export confirmation dialog
    BackgroundPicker.tsx   — Background style picker (settings)
    ButtonEffectPicker.tsx — Button effect picker (settings)
    Toast.tsx              — Toast notification component
  templates/
    index.ts               — Template registry (getTemplates, getTemplate, getTemplateForType)
    vsl-basic.ts           — VSL funnel template definition
    waitlist-basic.ts      — Waitlist funnel template definition
  meta/
    index.ts               — Section meta registry (maps component IDs to SectionMeta)
    vsl-hero.ts            — VSL hero section meta
    wl-hero.ts             — Waitlist hero section meta
    wl-form.ts             — Waitlist form section meta
    video-player.ts        — Video player section meta
    app-form.ts            — Application form section meta
    contact-info.ts        — Contact info section meta
    thank-you.ts           — Thank-you page section meta
    footer.ts              — Footer section meta
    background-picker.ts   — Background picker meta
    button-effect.ts       — Button effect meta
  services/
    export.ts              — Next.js project export (JSZip + file-saver)
    storage.ts             — localStorage persistence
  types/
    index.ts               — TypeScript types (FunnelSite, Template, SectionMeta, etc.)
```

## Key Concepts

### Templates (`src/templates/`)
Define the structure of a funnel: pages, sections per page, default attributes per section.
- `Template.id` — unique slug (e.g. `waitlist-basic`)
- `Template.type` — `'vsl' | 'waitlist'`
- `Template.pages[].sections[].component` — maps to a `meta/` entry and GrapesJS block

### Section Meta (`src/meta/`)
Each section component has a `SectionMeta` with its settings definitions (used by SettingsPanel + export generator).
The `meta/index.ts` registry is the single source of truth — register new components there.

### Export Pipeline (`src/services/export.ts`)
Generates a Next.js 14 project in a zip file:
1. `package.json`, `tsconfig.json`, `next.config.js`
2. Page files per template page (index.tsx, thank-you.tsx, etc.)
3. Component files per used section (with inline style rendering)
4. `lib/react-bits-backgrounds.tsx` — placeholder background component wrappers

### Storage
All site data in localStorage under key `funnel-builder:sites`. No backend.

## Waitlist Template Source

The waitlist template's reference design is at:
`lucasresell copy 2waitlist/ai-website-cloner-template/`

It contains the original Next.js 16 + shadcn/ui project with components like WaitlistForm, Grainient (WebGL background), TestimonialsSection, WinsSection, etc. Used as visual reference when updating the funnel builder's waitlist-basic template.

## Available Funnel Types

| Type | Template ID | Description |
|------|-------------|-------------|
| VSL | `vsl-basic` | Video Sales Letter funnel |
| Waitlist | `waitlist-basic` | Waitlist/email capture funnel |

## Export Flow

1. User builds funnel in GrapesJS editor
2. Funnel is saved to localStorage
3. User clicks "Export" → `exportAsNextJSProject()` generates a zip
4. Zip contains a complete Next.js project with `output: 'export'` config
5. User unzips, runs `npm install && npm run build && npx serve out`

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # TypeScript check + Vite production build
npm run preview   # Preview production build
```

## Design Notes

- Uses GrapesJS v0.21 for the visual editor
- Tailwind CSS v3 with PostCSS for styling
- No routing library — simple state toggle between dashboard/editor views
- Setting types: text, textarea, image, color, select, background-picker, video-url, boolean, number
