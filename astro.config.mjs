// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

/*
 * Where the site is served. For now it's GitHub Pages at jeremysayers.github.io/dwcmc/.
 * To move to dwcmc.com: set SITE to 'https://dwcmc.com', set BASE to '', and add the
 * custom domain under the repository's Settings → Pages.
 */
const SITE = 'https://jeremysayers.github.io';
const BASE = '/dwcmc';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE || undefined,
  trailingSlash: 'ignore',
  integrations: [mdx()],
  // Scoped component styles win over the global .prose rules.
  scopedStyleStrategy: 'attribute',
});
