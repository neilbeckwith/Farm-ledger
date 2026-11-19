# Acre Ledger

[![Deploy to GitHub Pages](https://github.com/neilbeckwith/Farm-ledger/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/neilbeckwith/Farm-ledger/actions/workflows/deploy-pages.yml)

**Live site:** [neilbeckwith.github.io/Farm-ledger](https://neilbeckwith.github.io/Farm-ledger/)

A living crop stand. Set the biology, weather and nutrient speciation, then watch it grow, peak and fill the barn. Pick a crop (spring wheat, barley, oat, maize and more) and a site (Ottawa Valley, Peterborough, Okanagan bench and more) and follow the stand through the season — growth, biomass, nutrient fluxes and the limiting nutrient, day by day. It runs entirely in the browser — open the live site and the simulation starts running, no sign-in or install needed.

## Stack

- React 19 and TypeScript
- TanStack Start and TanStack Router
- Vite 8
- Tailwind CSS 4
- Nitro, deployed to Vercel on the Node.js 22 runtime (`nodejs22.x`)

Sign-in is off (`VITE_AUTH_ENABLED` is `false` in `.grok/app-env.json`).

## Scripts

Install, develop, build, and serve the production build with:

```bash
npm install
npm run dev
npm run build
npm run preview
```
