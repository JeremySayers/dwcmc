import { getCollection } from 'astro:content';
import { buildNav, type NavGroup } from './nav';

/** Sidebar groups built from every entry in the guide collection, including planned ones. */
export async function getNav(): Promise<NavGroup[]> {
  const entries = await getCollection('guide');
  return buildNav(entries.map((e) => ({ id: e.id, ...e.data })));
}
