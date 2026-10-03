/**
 * Cell types for top-down layer diagrams (<LayerDiagram>).
 *
 * Each layer of a design is a list of equal-length strings, one character per block.
 * Add a cell type here to use it in any design. `material` names what you need to
 * collect to build it; cells without one (air, flowing water) aren't counted.
 */

/** Something drawn on top of a cell's colour. Sizes are fractions of the cell. */
export type Mark =
  | { kind: 'dot'; color: string; size: number }
  | { kind: 'lowerHalf'; color: string }
  | { kind: 'hatch'; color: string };

export interface CellType {
  label: string;
  /** Cell colour, or null for cells outside the build (not drawn). */
  color: string | null;
  mark?: Mark;
  /** Shopping-list name. Cells with the same material are counted together. */
  material?: string;
  /** Shown in the legend only when the design uses it. */
  legend: boolean;
}

const AIR = '#5b5b5b';

export const CELLS = {
  ' ': { label: 'Outside the build', color: null, legend: false },
  '.': { label: 'Air', color: AIR, legend: true },
  '#': { label: 'Building block', color: '#eef1f4', material: 'Building blocks', legend: true },
  '~': { label: 'Flowing water', color: '#4a74e0', legend: true },
  S: {
    label: 'Water source',
    color: '#2f56c4',
    mark: { kind: 'dot', color: '#a9c0ff', size: 0.34 },
    material: 'Water sources (or ice)',
    legend: true,
  },
  O: { label: 'Drop hole', color: '#111111', mark: { kind: 'hatch', color: '#3a3a3a' }, legend: true },
  H: {
    label: 'Stone slab (bottom half)',
    color: AIR,
    mark: { kind: 'lowerHalf', color: '#a3a3a3' },
    material: 'Stone slabs',
    legend: true,
  },
  m: {
    label: 'Spawning space',
    color: AIR,
    mark: { kind: 'dot', color: '#9be36a', size: 0.42 },
    legend: true,
  },
} as const satisfies Record<string, CellType>;

export interface DiagramLayer {
  name: string;
  note?: string;
  rows: readonly string[];
}

/** Count every cell by character across all layers. */
export function countCells(layers: readonly DiagramLayer[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const layer of layers) {
    for (const row of layer.rows) {
      for (const ch of row) counts.set(ch, (counts.get(ch) ?? 0) + 1);
    }
  }
  return counts;
}

/** Materials needed to build the layers, largest first. */
export function materials(layers: readonly DiagramLayer[]): { material: string; count: number }[] {
  const byMaterial = new Map<string, number>();
  for (const [ch, n] of countCells(layers)) {
    const cell = (CELLS as Record<string, CellType>)[ch];
    if (cell?.material) byMaterial.set(cell.material, (byMaterial.get(cell.material) ?? 0) + n);
  }
  return [...byMaterial].map(([material, count]) => ({ material, count })).sort((a, b) => b.count - a.count);
}
