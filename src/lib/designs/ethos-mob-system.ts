/**
 * One layer of EthosLab's "Practical Mob System" (YouTube, 7 August 2012), as top-down maps.
 *
 * Drawn from the video's cutaway shots.
 *
 * Coordinates are x (west to east) and z (north to south), 0–18, with the drop hole at 9, 9.
 */
import type { DiagramLayer } from '../blocks';

const N = 19;
const C = 9;

type Cell = `${number},${number}`;
const key = (x: number, z: number): Cell => `${x},${z}`;

// 12 pads of 3 × 3: four around the centre, and two on each side between the ring and the outer wall.
const PAD_CORNERS: [number, number][] = [
  [6, 6],
  [10, 6],
  [6, 10],
  [10, 10],
  [6, 2],
  [10, 2],
  [6, 14],
  [10, 14],
  [2, 6],
  [2, 10],
  [14, 6],
  [14, 10],
];

const pads = new Set<Cell>();
const padCentres = new Set<Cell>();
for (const [x0, z0] of PAD_CORNERS) {
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) pads.add(key(x0 + i, z0 + j));
  padCentres.add(key(x0 + 1, z0 + 1));
}

// Water: a ring around the inner four pads, and a cross from the outer wall to just short of the centre.
const water = new Set<Cell>();
for (let i = 5; i <= 13; i++) {
  water.add(key(i, 5)).add(key(i, 13)).add(key(5, i)).add(key(13, i));
}
for (let k = 1; k <= 17; k++) {
  if (k === C) continue;
  water.add(key(C, k)).add(key(k, C));
}

// Sources: the end of each arm (it flows 7 blocks and stops one short of the hole) and each ring corner.
const sources = new Set<Cell>([
  key(C, 1),
  key(C, 17),
  key(1, C),
  key(17, C),
  key(5, 5),
  key(13, 5),
  key(5, 13),
  key(13, 13),
]);
// A block above each ring-corner source makes one bonus spawning space per corner.
const bonus = new Set<Cell>([key(5, 5), key(13, 5), key(5, 13), key(13, 13)]);

const hole = key(C, C);
const inside = new Set<Cell>([...pads, ...water, hole]);

// Walls: every block beside the inside, the outside corners of each pad, and the two blocks
// flanking each arm's end. The inside corners next to the ring sources are left out, which
// gives the notched outline seen in the video.
const walls = new Set<Cell>();
const SIDES = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
] as const;
const DIAGONALS = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
] as const;
const addWalls = (cells: Iterable<Cell>, dirs: readonly (readonly [number, number])[]) => {
  for (const cell of cells) {
    const [x, z] = cell.split(',').map(Number) as [number, number];
    for (const [dx, dz] of dirs) {
      const n = key(x + dx, z + dz);
      if (!inside.has(n)) walls.add(n);
    }
  }
};
addWalls(inside, SIDES);
addWalls(pads, DIAGONALS);
for (const [x, z] of [
  [C, 0],
  [C, N - 1],
  [0, C],
  [N - 1, C],
] as const) {
  const along =
    x === C
      ? [
          [1, 0],
          [-1, 0],
        ]
      : [
          [0, 1],
          [0, -1],
        ];
  for (const [dx, dz] of along) walls.add(key(x + dx!, z + dz!));
}

function map(pick: (cell: Cell) => string): string[] {
  const rows: string[] = [];
  for (let z = 0; z < N; z++) {
    let row = '';
    for (let x = 0; x < N; x++) row += pick(key(x, z));
    rows.push(row);
  }
  return rows;
}

const outside = (c: Cell) => !inside.has(c) && !walls.has(c);

export const ETHOS_LAYERS: DiagramLayer[] = [
  {
    name: 'Floor',
    note: 'Solid, with one hole in the middle. Mobs from every layer fall through it.',
    rows: map((c) => (outside(c) ? ' ' : c === hole ? 'O' : '#')),
  },
  {
    name: 'Water',
    note: 'The bottom half of each pad, the walls, and the water channels. Eight sources: one at the end of each arm, one in each ring corner.',
    rows: map((c) => (outside(c) ? ' ' : c === hole ? 'O' : sources.has(c) ? 'S' : water.has(c) ? '~' : '#')),
  },
  {
    name: 'Pad tops',
    note: 'The top half of each pad. A block over each ring-corner source gives a bonus spawning space.',
    rows: map((c) =>
      outside(c) ? ' ' : c === hole ? 'O' : pads.has(c) || walls.has(c) || bonus.has(c) ? '#' : '.',
    ),
  },
  {
    name: 'Spawning',
    note: 'Mobs spawn on the 8 edge blocks of each pad and on the 4 bonus blocks: 100 spaces. A slab in the middle of each pad stops spiders.',
    rows: map((c) =>
      outside(c)
        ? ' '
        : c === hole
          ? 'O'
          : walls.has(c)
            ? '#'
            : padCentres.has(c)
              ? 'H'
              : pads.has(c) || bonus.has(c)
                ? 'm'
                : '.',
    ),
  },
  {
    name: 'Headroom',
    note: 'Walls only. The next layer’s floor goes on top, so pads have 2 blocks of headroom: too low for endermen.',
    rows: map((c) => (outside(c) ? ' ' : c === hole ? 'O' : walls.has(c) ? '#' : '.')),
  },
];
