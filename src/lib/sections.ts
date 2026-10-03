import type { IconName } from './icons';

/**
 * The top-level sections of the guide, in sidebar order.
 * A page joins a section through the `section` field in its frontmatter.
 */
export const SECTIONS = [
  {
    id: 'start',
    name: 'Start here',
    icon: 'map',
    blurb: 'What this site is and why it covers 1.1.',
    defaultOpen: true,
    inTopNav: false,
  },
  {
    id: 'mechanics',
    name: 'Mechanics',
    icon: 'compass',
    blurb: 'How spawning, crops, water, pistons and enchanting really work in 1.1.',
    defaultOpen: true,
    inTopNav: true,
  },
  {
    id: 'farms',
    name: 'Farms',
    icon: 'wheat',
    blurb: 'Farms built from 1.1 parts only. No hoppers, no golems.',
    defaultOpen: false,
    inTopNav: true,
  },
  {
    id: 'designs',
    name: 'Designs',
    icon: 'piston',
    blurb: 'Rooms and builds that look good with a short block list.',
    defaultOpen: false,
    inTopNav: true,
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: 'pickaxe',
    blurb: 'Calculators for enchanting, bookshelves and XP.',
    defaultOpen: false,
    inTopNav: true,
  },
] as const satisfies readonly {
  id: string;
  name: string;
  icon: IconName;
  blurb: string;
  defaultOpen: boolean;
  inTopNav: boolean;
}[];

export type Section = (typeof SECTIONS)[number];
export type SectionId = Section['id'];

export const SECTION_IDS = SECTIONS.map((s) => s.id) as [SectionId, ...SectionId[]];
