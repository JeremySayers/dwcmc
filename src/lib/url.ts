/**
 * Prefix a site path ("/mechanics/") with the base path the site is served under
 * ("/dwcmc" on GitHub Pages). Anything that isn't a site path is returned unchanged.
 *
 * Use this for internal links in components. Links written in MDX pages go through
 * MdxLink, which calls this, so pages can keep using "/…".
 */
export function withBase(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + path;
}
