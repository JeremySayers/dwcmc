/** Releases around 1.1, oldest first, for the version strip. Dates are release days. */
export const VERSIONS = [
  {
    name: 'Beta 1.8',
    date: '2011-09-14',
    summary: 'Hunger, sprinting, villages, strongholds. No enchanting yet.',
  },
  { name: '1.0', date: '2011-11-18', summary: 'The full release. Enchanting, brewing, the End.' },
  { name: '1.1', date: '2012-01-12', summary: '1.0 with the rough edges fixed.' },
  { name: '1.2', date: '2012-03-01', summary: 'Iron golems, jungles, new planks, redstone lamps.' },
  { name: '1.3', date: '2012-08-01', summary: 'Villager trading, emeralds, new enchanting rules.' },
] as const;

export type VersionName = (typeof VERSIONS)[number]['name'];

/** "2012-01-12" -> "Jan 2012" */
export function monthYear(iso: string): string {
  const [y, m] = iso.split('-').map(Number);
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m! - 1];
  return `${month} ${y}`;
}

/**
 * The versions a page or section can say it applies to, in order.
 * "1.2" covers 1.2.1–1.2.5 and "1.3" covers 1.3.1–1.3.2; "1.4+" means 1.4 and everything after.
 */
export const APPLIES_VERSIONS = [
  { id: 'b1.8', label: 'b1.8', name: 'Beta 1.8' },
  { id: '1.0', label: '1.0', name: '1.0' },
  { id: '1.1', label: '1.1', name: '1.1' },
  { id: '1.2', label: '1.2', name: '1.2 (1.2.1 – 1.2.5)' },
  { id: '1.3', label: '1.3', name: '1.3 (1.3.1 – 1.3.2)' },
  { id: '1.4+', label: '1.4+', name: '1.4 and later' },
] as const;

export type AppliesVersion = (typeof APPLIES_VERSIONS)[number]['id'];

export const APPLIES_VERSION_IDS = APPLIES_VERSIONS.map((v) => v.id) as [AppliesVersion, ...AppliesVersion[]];

/**
 * Plain-language summary for screen readers and tooltips, grouping consecutive versions:
 * ['1.0','1.1','1.2'] -> "1.0 to 1.2", ['1.1'] -> "1.1 only", ['1.1','1.2','1.3','1.4+'] -> "1.1 and later".
 */
export function describeVersions(ids: readonly AppliesVersion[]): string {
  const on = new Set(ids);
  const runs: string[][] = [];
  let run: string[] = [];
  for (const v of APPLIES_VERSIONS) {
    if (on.has(v.id)) run.push(v.id === '1.4+' ? '1.4 and later' : v.id === 'b1.8' ? 'Beta 1.8' : v.id);
    else if (run.length) {
      runs.push(run);
      run = [];
    }
  }
  if (run.length) runs.push(run);
  if (runs.length === 1 && runs[0]!.length === 1 && !ids.includes('1.4+')) return `${runs[0]![0]} only`;
  const parts = runs.map((r) => {
    if (r.length === 1) return r[0]!;
    if (r.at(-1) === '1.4 and later') return `${r[0]} and later`;
    return `${r[0]} to ${r.at(-1)}`;
  });
  return parts.length > 1 ? `${parts.slice(0, -1).join(', ')}, and ${parts.at(-1)}` : parts[0]!;
}
