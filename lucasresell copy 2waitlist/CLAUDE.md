# Waitlist Template Source

This folder contains the reference waitlist funnel design from the lucasresell project. It was cloned from a waitlist page built with Next.js 16, shadcn/ui, and Tailwind CSS v4.

## What This Is

The source of truth for the "Waitlist Classic" template in the funnel builder. The design was reverse-engineered from a production waitlist page and serves as the visual + component reference.

## Key Files

- `ai-website-cloner-template/` — Full Next.js project with the waitlist components
- `ai-website-cloner-template/src/components/WaitlistForm.tsx` — Email capture form
- `ai-website-cloner-template/src/components/Grainient.tsx` — WebGL animated background
- `ai-website-cloner-template/src/components/GradientHeading.tsx` — Gradient text heading
- `ai-website-cloner-template/src/components/Beams.tsx` — Light beam effects
- `ai-website-cloner-template/src/components/TestimonialsSection.tsx` — Social proof
- `ai-website-cloner-template/src/components/WinsSection.tsx` — Results showcase
- `ai-website-cloner-template/src/app/page.tsx` — Main page layout

## Design Tokens

- Background: `#000` (black)
- Text: `#fff` (white), `#d4d4d4` (muted), `#919191` (subtle)
- Accent: `#39ff14` (neon green)
- Gradient text: `linear-gradient(167deg, #fff 0%, #919191 100%)`
- Font: system default
- Max-width containers: 670px (hero), 510px (subtext)

## Template Mapping

The funnel builder's `waitlist-basic.ts` template references these component IDs:
- `wl-hero`, `wl-form`, `testimonials`, `wins-section`, `cta-section`, `wl-footer`, `thank-you`

Each maps to a `SectionMeta` in `src/meta/` and renders a GrapesJS block in the editor.

## Related

See the funnel builder's `src/templates/waitlist-basic.ts` for the template configuration.
See `src/services/export.ts` for the Next.js export pipeline that generates code from this template.
