# Waitlist Form Redesign + Google Sheets Integration

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the 7-step waitlist form with consistent Neue Plak typography, Tailwind styling, and submit form responses to Google Sheets via Apps Script web app.

**Architecture:** Client-side multi-step form in WaitlistForm.tsx — 4 multiple-choice steps (A-E) + 3 text-input steps → on final submit, POST JSON to Google Apps Script web app URL → Apps Script appends row to Google Sheet → redirect user to thank-you page.

**Tech Stack:** Next.js 16 (static export), React 19, Tailwind CSS v4, Google Apps Script (backend proxy)

## Global Constraints

- `output: "export"` in next.config.ts — no API routes, no server-side code
- Neue Plak font used consistently via CSS variables (no inline fontFamily)
- Brand green: `#39FF14`, use `--brand-green` / `text-(--brand-green)` in Tailwind
- Redirect target after submit: `https://mentorship.lucasresells.com/waitlist-thank-you`
- `basePath: "/lucas-resell"` in next.config.ts — all asset paths relative

---
