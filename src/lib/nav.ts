import { SECTIONS, type Section, type SectionId } from './sections';

/** The fields of a guide entry that navigation needs. Kept separate from astro:content so it's testable. */
export interface NavEntry {
  id: string;
  title: string;
  navTitle?: string;
  section: SectionId;
  order: number;
  status: 'published' | 'planned';
  nav: boolean;
}

export interface NavPage {
  id: string;
  title: string;
  href: string | null;
  planned: boolean;
}

export interface NavGroup {
  section: Section;
  pages: NavPage[];
  /** First published page in the section, used by the top nav. */
  firstHref: string | null;
}

/** The URL for an entry. The entry with id "index" is the home page. */
export function entryHref(id: string): string {
  return id === 'index' ? '/' : `/${id}/`;
}

/** Build the sidebar: every section in order, its pages sorted by `order` then title. */
export function buildNav(entries: NavEntry[]): NavGroup[] {
  return SECTIONS.map((section) => {
    const pages = entries
      .filter((e) => e.nav && e.section === section.id)
      .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
      .map((e) => ({
        id: e.id,
        title: e.navTitle ?? e.title,
        href: e.status === 'published' ? entryHref(e.id) : null,
        planned: e.status === 'planned',
      }));
    return { section, pages, firstHref: pages.find((p) => p.href)?.href ?? null };
  });
}
