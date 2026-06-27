# Funnel Builder

A visual funnel website builder built with React, TypeScript, and GrapesJS. Create VSL and waitlist funnels with a drag-and-drop editor, customize sections, and export as a complete Next.js project.

## Features

- **Template-based** — Start from a VSL or waitlist template
- **Visual editor** — GrapesJS drag-and-drop canvas
- **Section customization** — Dynamic settings panel per section
- **Export to Next.js** — Download as a complete, buildable Next.js project zip
- **Local storage** — All funnels saved in your browser

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
npm run preview
```

## Usage

1. **Create a funnel** — Click "+ New Funnel" and pick a template (VSL or Waitlist)
2. **Edit** — Add/remove/reorder sections, customize each section's properties
3. **Export** — Click "Export" to download a Next.js project zip
4. **Deploy** — Unzip, run `npm install && npm run build`, deploy the `out/` folder

## Available Templates

| Template | Type | Pages |
|----------|------|-------|
| Waitlist Classic | Waitlist | Home, Thank You |
| VSL Basic | VSL | Home |

## Project Structure

```
src/
  components/     — React UI components
  templates/      — Funnel template definitions
  meta/           — Section metadata and settings schemas
  services/       — Export and storage logic
  types/          — TypeScript type definitions
lucasresell copy 2waitlist/
                  — Reference waitlist template source (Next.js 16)
```

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS v3
- **Visual Editor:** GrapesJS v0.21
- **Build:** Vite 5
- **Export:** JSZip, file-saver
