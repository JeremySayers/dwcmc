/**
 * Pixel icons, drawn for this site (not game textures).
 *
 * Each icon is 8 rows of 8 characters. Every character is a key into PALETTE,
 * and "." is transparent. Add an icon by adding an entry to ICONS; the
 * IconName type and the tests in icons.test.ts pick it up automatically.
 */

export const PALETTE = {
  k: '#4a3218', // dark wood
  K: '#9b6b3b', // wood
  W: '#b8945f', // planks
  P: '#8a5a2b', // book cover
  n: '#5d3b1d', // dirt speck / outline
  D: '#79553a', // dirt
  T: '#6fae45', // grass top
  g: '#5aa83a', // leaf
  G: '#3a7a24', // dark leaf
  m: '#2e7d32', // melon / emerald dark
  M: '#7fc04f', // melon / emerald light
  e: '#4f8f2b', // spawn egg
  E: '#1d1d1d', // spawn egg spots
  y: '#e0c25a', // wheat / gold
  Y: '#a8862c', // dark wheat
  l: '#ffd36b', // glow light
  L: '#f6a821', // glow dark
  r: '#c41d1d', // red
  R: '#ff6a5a', // red highlight
  c: '#5ee7e0', // diamond
  C: '#2aa7a0', // dark diamond
  s: '#e6d7a1', // sand
  S: '#cdbb84', // dark sand
  b: '#3a62d9', // water
  B: '#5b82ee', // light water
  o: '#e8e8e8', // white
  O: '#cfcfcf', // light grey
  i: '#d8d8d8', // iron
  I: '#a8a8a8', // dark iron
  a: '#9a9a9a', // stone
  A: '#6a6a6a', // dark stone
  t: '#dddddd', // string
  w: '#ece6d2', // paper
  x: '#1e1e1e', // black
} as const;

export type PaletteKey = keyof typeof PALETTE;

export const ICONS = {
  grass: ['TTTTTTTT', 'TgTTgTTg', 'DTDDTDTD', 'DDDDDDDD', 'DnDDDDnD', 'DDDDnDDD', 'DDnDDDDD', 'DDDDDDnD'],
  wool: ['oooooooo', 'oOoooOoo', 'ooooooOo', 'oooOoooo', 'OoooooOo', 'ooooOooo', 'oOoooooo', 'oooooOoo'],
  beach: ['sssssbbb', 'sSsssbbb', 'ssssbbBb', 'sssSbbbb', 'sssbbbbB', 'ssbbBbbb', 'sSbbbbbb', 'sbbbbBbb'],
  apple: ['....k...', '...kg...', '.rrkrr..', 'rrrrrrr.', 'rRrrrrr.', 'rrrrrrr.', '.rrrrr..', '..r.r...'],
  bow: ['.....KKK', '....K..t', '...K...t', '..K...t.', '.K...t..', 'K...t...', 'K..t....', 'KKt.....'],
  melon: ['.mmmmmm.', 'mMmMmMmm', 'mmMmmMmm', 'mMmmMmMm', 'mmMmmMmm', 'mMmMmmMm', 'mmmMmMmm', '.mmmmmm.'],
  gate: ['K......K', 'KKKKKKKK', 'K.K..K.K', 'K.K..K.K', 'KKKKKKKK', 'K......K', 'K......K', '........'],
  disc: ['..xxxx..', '.xxxxxx.', 'xxxyyxxx', 'xxywwyxx', 'xxywwyxx', 'xxxyyxxx', '.xxxxxx.', '..xxxx..'],
  egg: ['...ee...', '..eEee..', '.eeeeEe.', '.eEeeee.', 'eeeeeEee', 'eEeeeeee', '.eeeEee.', '..eeee..'],
  golem: ['..iiii..', '..iIIi..', '..iiii..', 'iiiiiiii', 'iIiiiiIi', 'i.iiii.i', '..i..i..', '..i..i..'],
  planks: ['WWWWWWWW', 'PPPPPPPP', 'yyyyyyyy', 'YYYYYYYY', 'oOoOoOoO', 'IIIIIIII', 'sssSssss', 'SSSSSSSS'],
  emerald: ['...mm...', '..mMMm..', '.mMMmMm.', 'mMMmmMMm', 'mMmmmmMm', '.mMmmMm.', '..mMMm..', '...mm...'],
  book: ['.nnnnnn.', 'nPPPPPPw', 'nPPyyPPw', 'nPPPPPPw', 'nPPPPPPw', 'nPPPPPPw', 'nPPPPPPw', '.nnnnnn.'],
  lamp: ['nnnnnnnn', 'nLlLlLln', 'nlLlLlLn', 'nLlllLln', 'nlLlLlLn', 'nLlLllln', 'nlLlLlLn', 'nnnnnnnn'],
  compass: ['..aaaa..', '.aooooa.', 'aooorooa', 'aoorrooa', 'aooxoooa', 'aoxoooa.', '.aooooa.', '..aaaa..'],
  wheat: ['y.y.y.y.', '.yYyYy..', 'y.yYy.y.', '.yyyyy..', '..YyY...', '..gGg...', '..gGg...', '.g.G.g..'],
  piston: ['WWWWWWWW', 'WWWWWWWW', 'aaaAAaaa', 'aaaAAaaa', 'aaAAAAaa', 'aaaAAaaa', 'aaaaaaaa', 'AAAAAAAA'],
  pickaxe: ['.cccccc.', 'cC.kk.Cc', 'c..kk..c', '...kk...', '...kk...', '...kk...', '...kk...', '...kk...'],
  map: ['wwwwwwww', 'wgggwbbw', 'wgGgwbbw', 'wggssbbw', 'wgssbbbw', 'wsrsbbbw', 'wssbbbbw', 'wwwwwwww'],
} as const satisfies Record<string, readonly string[]>;

export type IconName = keyof typeof ICONS;

/** One SVG <rect> per filled pixel, in an 8×8 viewBox. */
export function iconRects(name: IconName): { x: number; y: number; fill: string }[] {
  const rects: { x: number; y: number; fill: string }[] = [];
  ICONS[name].forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch !== '.') rects.push({ x, y, fill: PALETTE[ch as PaletteKey] });
    });
  });
  return rects;
}
