import { describe, expect, it } from 'vitest';
import { buildNav, entryHref, type NavEntry } from './nav';
import { SECTIONS } from './sections';

const entry = (over: Partial<NavEntry> & Pick<NavEntry, 'id' | 'section'>): NavEntry => ({
  title: over.id,
  order: 100,
  status: 'published',
  nav: true,
  ...over,
});

describe('entryHref', () => {
  it('maps index to the site root', () => {
    expect(entryHref('index')).toBe('/');
  });

  it('maps nested ids to directory URLs', () => {
    expect(entryHref('farms/cactus-tower')).toBe('/farms/cactus-tower/');
  });
});

describe('buildNav', () => {
  it('returns every section in SECTIONS order, even empty ones', () => {
    const nav = buildNav([]);
    expect(nav.map((g) => g.section.id)).toEqual(SECTIONS.map((s) => s.id));
    expect(nav.every((g) => g.pages.length === 0 && g.firstHref === null)).toBe(true);
  });

  it('sorts pages by order, then title', () => {
    const nav = buildNav([
      entry({ id: 'farms/c', section: 'farms', title: 'C', order: 20 }),
      entry({ id: 'farms/b', section: 'farms', title: 'B', order: 10 }),
      entry({ id: 'farms/a', section: 'farms', title: 'A', order: 20 }),
    ]);
    expect(nav.find((g) => g.section.id === 'farms')!.pages.map((p) => p.title)).toEqual(['B', 'A', 'C']);
  });

  it('gives planned pages no link and skips them for the section link', () => {
    const nav = buildNav([
      entry({ id: 'tools/a', section: 'tools', order: 1, status: 'planned' }),
      entry({ id: 'tools/b', section: 'tools', order: 2 }),
    ]);
    const tools = nav.find((g) => g.section.id === 'tools')!;
    expect(tools.pages[0]).toMatchObject({ href: null, planned: true });
    expect(tools.firstHref).toBe('/tools/b/');
  });

  it('leaves out pages with nav: false', () => {
    const nav = buildNav([entry({ id: 'styleguide', section: 'start', nav: false })]);
    expect(nav.find((g) => g.section.id === 'start')!.pages).toEqual([]);
  });

  it('prefers navTitle over title', () => {
    const nav = buildNav([
      entry({ id: 'designs/room', section: 'designs', title: 'Long title', navTitle: 'Short' }),
    ]);
    expect(nav.find((g) => g.section.id === 'designs')!.pages[0]!.title).toBe('Short');
  });
});
