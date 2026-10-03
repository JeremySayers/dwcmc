// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://dwcmc.com',
  trailingSlash: 'ignore',
  integrations: [mdx()],
  // Scoped component styles win over the global .prose rules.
  scopedStyleStrategy: 'attribute',
});
