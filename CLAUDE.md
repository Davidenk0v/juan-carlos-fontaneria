# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Preferencias de comunicación

- Siempre responde en español, sin excepciones.

## Commands

```bash
npm run dev       # Dev server at http://localhost:4321
npm run build     # Static build output to ./dist/
npm run preview   # Preview production build locally
```

There are no lint or test scripts configured.

## Architecture

Single-page landing site (SSG) built with **Astro 5**, **React 19**, and **Tailwind CSS 4**.

- `src/pages/index.astro` — the only page; imports and arranges all sections in order: Header → Hero → Services → Contact → Footer.
- `src/layouts/Layout.astro` — base HTML wrapper; accepts a `title` prop and loads the Inter font from Google Fonts. All pages must use this layout.
- `src/components/` — five Astro components, one per page section. Navigation uses anchor links (`#inicio`, `#servicios`, `#contacto`).
- `src/styles/global.css` — imported in `index.astro`; contains the Tailwind CSS entry point.

**Tailwind CSS v4** is configured as a Vite plugin in `astro.config.mjs` (`@tailwindcss/vite`). The `tailwind.config.mjs` file is legacy and not active. Do not add a `tailwind.config.mjs` or `postcss.config.js` for Tailwind — it will break the setup.

React integration (`@astrojs/react`) is installed and configured, so React components with client directives (`client:load`, `client:idle`, etc.) can be added inside Astro files.

## Business context

The site is for **L&M Fontanero Autorizado** (license 05-B-D90). Key contact details hardcoded throughout:
- Phone/WhatsApp: `+34 643 368 225` (`https://wa.me/34643368225`, `tel:643368225`)
- Email: `luismedinagua@gmail.com`

The contact form in `Contact.astro` currently has no submission logic — a `<script>` block is reserved for it.

The hamburger menu button in `Header.astro` is decorative; no mobile menu toggle logic has been implemented.
