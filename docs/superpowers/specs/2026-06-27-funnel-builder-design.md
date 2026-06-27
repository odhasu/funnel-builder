# Funnel Builder — Design Spec

## Overview

Template-first visual funnel builder. Pick template → edit content in Shopify-style split editor → save as website. GrapesJS canvas + React shell + JSON file storage + React Bits for backgrounds/animations.

## Funnel Types (MVP)

### VSL Funnel
Pages: Home → Thank You
Home sections: Hero → Video Player → Application Form → Contact Info
Thank You: Thank You page

### Waitlist Funnel
Pages: Home → Thank You
Home sections: Hero → Waitlist Signup → Contact Info
Thank You: Thank You page

## Architecture

```
React Shell (UI, state, routing)
  ├── Dashboard — list/create funnel sites
  ├── Template Gallery — pick template by type
  ├── Editor (3-panel Shopify layout)
  │   ├── Left: Sections sidebar (list, reorder, add)
  │   ├── Center: GrapesJS iframe canvas (click to select)
  │   └── Right: Settings panel (auto-generated from section meta)
  └── Toolbar — save, preview, device toggle, publish
```

### Template + Overrides Model

Templates are pre-built GrapesJS projects with known section structure. Users don't modify structure — they override content.

```
TEMPLATE (fixed)
  ├── pages with section layout
  ├── GrapesJS component data per section
  └── default styles, backgrounds, text

FUNNEL_SITE (user's copy)
  ├── references template_id
  └── overrides: { section_id → { headline, bg_image, ... } }

RENDER: template base + apply overrides → canvas
SAVE: only overrides JSON, template stays clean
```

### Section Meta System

Each component type has a meta definition that drives the settings panel:

```typescript
interface SectionMeta {
  component: string;           // unique id like "vsl-hero"
  label: string;               // "VSL Hero"
  category: string;            // "Header" | "Media" | "Form" | "Footer"
  icon: string;                // icon name
  settings: SettingDef[];      // drives settings panel UI
}

interface SettingDef {
  id: string;                  // maps to GrapesJS trait / component attribute
  label: string;
  type: "text" | "textarea" | "image" | "color" | "select" | 
        "background-picker" | "video-url" | "form-fields" | "boolean" | "number";
  default: any;
  options?: { label: string; value: any }[];  // for select type
  placeholder?: string;
}
```

### React Bits Integration

Background picker shows react-bits background components as thumbnails. Selection sets component attribute. Same for button effects (StarBorder, ElectricBorder, etc.).

**Canvas rendering approach:** GrapesJS canvas uses vanilla JS/Backbone. React Bits backgrounds (WebGL/Canvas-based) render via a `<canvas>` element embedded in the GrapesJS component. The canvas element gets initialized by a small standalone script — no React needed inside the iframe for MVP. Each background is a self-contained JS module that paints to a `<canvas>`.

Button effects (StarBorder, ElectricBorder): rendered as CSS-only or minimal JS effects inside the GrapesJS component, matching the same visual output.

**In settings panel:** Live preview of background/button effect rendered as React component. User tweaks props, sees result, applies to canvas.

Background settings: component picker + per-component props (speed, color, intensity, etc.)
Button settings: effect picker + text + link + color

### Data Storage (File-based)

```
data/
  templates/
    vsl-basic/
      template.json        # { id, name, type, pages: [{ id, sections }], meta info }
      thumbnail.jpg
    waitlist-basic/
      ...
  sites/
    my-funnel-slug/
      site.json            # { id, name, type, template_id, overrides, created_at }
      overrides/
        s1.json            # section-level override values
        s2.json
      preview/
        index.html
```

### Editor Data Flow

1. User picks template → editor loads
2. GrapesJS loads template component tree into iframe canvas
3. User clicks section (canvas or sidebar) → right panel shows settings from meta
4. User edits setting → value saved to overrides state → pushed to GrapesJS via `component.setAttributes()`
5. Canvas re-renders in real-time
6. Save writes overrides JSON to disk
7. Export generates Next.js zip with pages, components, package.json, React Bits deps

### MVP Template Sections

| Section | Component Key | Settings |
|---|---|---|
| VSL Hero | vsl-hero | headline, subheadline, cta_text, cta_link, background, overlay |
| Hero (Waitlist) | wl-hero | headline, subheadline, background |
| Video Player | video-player | video_url (YT/Vimeo), autoplay, loop, cover_image |
| Application Form | app-form | fields (dynamic list), button_text, success_message, bg |
| Waitlist Form | wl-form | headline, email_placeholder, button_text, incentive_text, bg |
| Contact Info | contact-info | phone, email, address, social_links |
| Thank You | thank-you | headline, subheadline, redirect_url, redirect_delay, bg |
| Footer | footer | text, links |

### Tech Stack

- React (Vite) — UI shell
- GrapesJS — canvas editor (iframe)
- React Bits — background components + button/text animations
- JSON file storage — data persistence
- Next.js project export — zip with pages, components, package.json, React Bits deps
- CSS/Tailwind — UI styling

### Build Order (Implementation Plan)

1. Project scaffold (React + Vite + GrapesJS)
2. File storage layer (read/write JSON)
3. Dashboard + template gallery
4. Editor shell (3-panel layout)
5. GrapesJS canvas integration
6. Section meta system + settings panel
7. Template creation (VSL + Waitlist)
8. Override sync (settings ↔ GrapesJS)
9. React Bits integration (background + button pickers)
10. Preview + Next.js export (zip with pages + components + deps)
11. Polish + edge cases
