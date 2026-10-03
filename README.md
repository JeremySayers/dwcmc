# DWCMC

A field guide to Minecraft Java Edition 1.1: its mechanics, farms and builds. Published at [dwcmc.com](https://dwcmc.com).

Built with [Astro](https://astro.build) as a fully static site. Pages are MDX files; the layout, navigation and theme are shared, so a theme change is a one-file edit.

## Develop

Requires Node 22.12+ and pnpm.

```sh
pnpm install
pnpm dev            # http://localhost:4321
pnpm test           # unit tests (Vitest)
pnpm build          # type-check, then build to dist/
pnpm preview        # serve dist/
pnpm format         # Prettier
```

## Add a page

Create an `.mdx` file under `src/content/guide/<section>/`. The path is the URL.

```mdx
---
title: Cactus tower
description: An automatic cactus farm that needs no redstone.
section: farms
order: 40
---

import { Callout } from '@/components/ui';

Text goes here.
```

It appears in the sidebar automatically. `status: planned` lists it greyed out without building it, which is how the backlog of unwritten pages works. The style guide at `/styleguide/` shows every component you can use.

## Layout

```
src/
  content/guide/     every page, as MDX (index.mdx is the home page)
  content.config.ts  frontmatter schema
  components/ui/     components for MDX pages (Panel, Callout, AppliesTo, LayerDiagram, Variants…)
  components/layout/ top bar, sidebar, right rail
  layouts/           the page shell
  lib/               sections, navigation, icons, version data, block diagrams (+ tests)
  lib/designs/       layer-by-layer data for farm and build diagrams
  styles/tokens.css  every colour, font and size in the theme
  styles/global.css  base styles, bevelled surfaces, prose
public/              copied as-is (CNAME, favicon)
```

## Deploy

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`. The site is live at https://jeremysayers.github.io/dwcmc/.

To move it to dwcmc.com, set `SITE` and `BASE` at the top of `astro.config.mjs` as the comment there describes, point the domain's DNS at GitHub Pages, and add the custom domain under **Settings → Pages**.

Fan project. Not affiliated with Mojang or Microsoft. No game textures are used.
