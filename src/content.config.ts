import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SECTION_IDS } from './lib/sections';
import { APPLIES_VERSION_IDS } from './lib/versions';

/**
 * Every page of the guide is an MDX file in src/content/guide.
 * The file path is the URL: farms/cactus-tower.mdx -> /farms/cactus-tower/.
 * index.mdx is the home page.
 */
const guide = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guide' }),
  schema: z.object({
    title: z.string(),
    /** Shorter label for the sidebar, if the title is long. */
    navTitle: z.string().optional(),
    /** One sentence. Used for the meta description and section tiles. */
    description: z.string(),
    section: z.enum(SECTION_IDS),
    /** Sidebar position within the section. Lower comes first. */
    order: z.number().default(100),
    /** "planned" pages show greyed out in the sidebar and aren't built. */
    status: z.enum(['published', 'planned']).default('published'),
    /** false hides the page from the sidebar (for example the style guide). */
    nav: z.boolean().default(true),
    /**
     * "article" wraps the page in one panel with a title; "panels" lets the page lay out its own <Panel>s.
     * (Not called "layout": MDX reserves that frontmatter key for a layout file path.)
     */
    template: z.enum(['article', 'panels']).default('article'),
    /** Small line above the title. */
    eyebrow: z.string().optional(),
    /** Versions the whole page applies to, shown under the title. Sections that differ use <AppliesTo>. */
    versions: z.array(z.enum(APPLIES_VERSION_IDS)).optional(),
  }),
});

export const collections = { guide };
