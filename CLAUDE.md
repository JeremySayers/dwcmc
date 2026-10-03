# DWCMC

Static Astro site: a field guide to Minecraft Java Edition 1.1. Deployed to GitHub Pages at dwcmc.com.

## Commands

- `pnpm dev`, then open http://localhost:4321 (or `pnpm astro dev --background` for a background server)
- `pnpm build` runs `astro check` (types) and then builds. Run it before calling a change done.
- `pnpm test` runs the Vitest unit tests in `src/lib/*.test.ts`
- `pnpm format` runs Prettier. CI runs `pnpm format:check`.

## How the site is put together

- **Every page is an MDX file** in `src/content/guide/<section>/`. The file path is the URL, and `index.mdx` is `/`. `src/pages/[...slug].astro` renders them all.
- **Frontmatter is validated** by `src/content.config.ts`. The fields are `title`, `description`, `section`, `order`, `status` (`published`/`planned`), `nav`, `template` (`article`/`panels`), `eyebrow` and `versions`. Don't use a `layout` key: MDX reserves it for a layout file path.
- **Navigation is generated.** The sidebar, top nav, section tiles and "On this page" list all come from the collection and the headings, so never hand-edit nav lists. Sections are defined in `src/lib/sections.ts`.
- **Planned pages** (`status: planned`) are the backlog. They show greyed out in the sidebar and aren't built. To publish one, write it and remove the `status` line.
- **`template: panels`** pages (the home page) lay out their own `<Panel>`s. `article` pages are wrapped in one panel with an eyebrow and an h1 taken from the frontmatter.

## Styling rules

- **All colours, fonts and sizes live in `src/styles/tokens.css`.** Components use `var(--…)` and never hard-code theme colours. One exception: the white text and shadows on stone buttons, which match the game GUI.
- `src/styles/global.css` holds base element styles, the shared surfaces (`.bev` raised panel, `.paper` reading panel, `.slot` inset slot, `.btn-surface`) and `.prose` (MDX text).
- Component styles are scoped `<style>` blocks. `scopedStyleStrategy: 'attribute'` makes them beat `.prose` rules; keep it that way.
- Text inside `.prose` keeps a 66ch measure. Components choose their own width.
- The theme is a single look (dark dirt page, light stone panels). There is no dark mode on purpose.
- The pixel font is Jersey 15 (one weight), for headings, labels, buttons, chips and counts. Size it with the `--px-*` tokens, never raw px, because it runs small. Body text is Work Sans. Tiny5 (`--font-logo`) is only for the DWCMC logo. `font-synthesis: none` stops fake bold.

## Components for pages

Import components from `@/components/ui` and see `/styleguide/` (`src/content/guide/styleguide.mdx`) for live examples. When you add a component, export it from `src/components/ui/index.ts` and add an example to the style guide.

- `Panel`, `Eyebrow`, `Actions` + `Button` for layout
- `Callout` styled like an item tooltip, for the one thing not to miss
- `ItemList` + `Item` for an icon in a slot with a title and text; `tag` marks a version
- `AppliesTo` for version chips showing which versions a page or section holds for. Article pages get one from the `versions` frontmatter; add one after a heading when a section differs. Every page should say what it applies to.
- `VersionStrip` for the releases around 1.1 (data in `src/lib/versions.ts`)
- `Variants` + `Variant` for switchable alternatives, such as copy drafts or two farm layouts
- `Unconfirmed` for a claim that hasn't been checked in 1.1 yet (for example, it was only seen in 1.2 code). Say where it comes from with `basis`. Never state an unchecked mechanic as fact.
- `LayerDiagram` for top-down, layer-by-layer maps of a build, with a legend and a materials list. Cell characters live in `src/lib/blocks.ts`. Real designs go in `src/lib/designs/`.
- `PixelIcon` for 8×8 icons drawn in `src/lib/icons.ts`. These are original pixel art; never use game textures.

## Content rules

- Everything is about Java Edition 1.1 (Jan 2012). Don't describe anything from 1.2 or later as if it's in the game: no hoppers, comparators, iron golems, redstone lamps or villager trading. Pre-1.3 enchanting goes up to level 50 with 30 bookshelves.
- The site has a personal voice (first person on the home page). Write plainly and specifically.
- Check game facts against https://minecraft.wiki before stating them. The home page promises that every page lists its sources, so end each page with a `## Sources` list.

## Not done yet

- Porting the enchanting tools from the old `minecraft-1-1-enchanting` repo. Its `js/engine.js` and `js/data.js` are pure and tested. The plan is TypeScript modules in `src/lib/enchanting/` with their tests, plus React islands (`pnpm astro add react`) for the UI.
- Site search (Pagefind is the likely fit for a static Astro site).
