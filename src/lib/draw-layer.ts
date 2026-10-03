/**
 * Draws layer diagrams on a canvas in real device pixels.
 *
 * A grid built from HTML elements can't keep its 1px lines even on screens with display
 * scaling (125%, 150%…): a CSS pixel isn't a whole number of screen pixels, so some lines
 * round to 2. Drawing at the canvas's exact device-pixel size, with whole-pixel squares
 * and lines, keeps every line identical at any size or scaling.
 */
import { CELLS, type CellType } from './blocks';

const cells = CELLS as Record<string, CellType>;

function frameColor(): string {
  return getComputedStyle(document.documentElement).getPropertyValue('--slot-dark').trim() || '#373737';
}

/** Draw one cell with its top-left at x, y and a side of s device pixels. */
function drawCell(ctx: CanvasRenderingContext2D, ch: string, x: number, y: number, s: number) {
  const cell = cells[ch];
  if (!cell?.color) return;
  ctx.fillStyle = cell.color;
  ctx.fillRect(x, y, s, s);
  const mark = cell.mark;
  if (!mark) return;
  ctx.fillStyle = mark.color;
  if (mark.kind === 'dot') {
    const d = Math.max(1, Math.round(s * mark.size));
    const o = Math.floor((s - d) / 2);
    ctx.fillRect(x + o, y + o, d, d);
  } else if (mark.kind === 'lowerHalf') {
    const h = Math.floor(s / 2);
    ctx.fillRect(x, y + s - h, s, h);
  } else {
    const band = Math.max(1, Math.round(s / 6));
    for (let i = 0; i < s; i++) {
      for (let j = 0; j < s; j++) {
        if (Math.floor((i + j) / band) % 2 === 0) ctx.fillRect(x + i, y + j, 1, 1);
      }
    }
  }
}

/** Fit the rows into a w × h device-pixel canvas: whole-pixel squares, lines `line` pixels wide. */
export function drawLayer(canvas: HTMLCanvasElement, rows: string[], w: number, h: number, dpr: number) {
  const ctx = canvas.getContext('2d');
  if (!ctx || !rows.length) return;
  canvas.width = w;
  canvas.height = h;
  const cols = rows[0]!.length;
  const line = Math.max(1, Math.floor(dpr));
  const pad = Math.round(4 * dpr);
  const cell = Math.max(
    1,
    Math.floor(
      Math.min(
        (w - 2 * pad - (cols - 1) * line) / cols,
        (h - 2 * pad - (rows.length - 1) * line) / rows.length,
      ),
    ),
  );
  const ox = Math.floor((w - (cols * cell + (cols - 1) * line)) / 2);
  const oy = Math.floor((h - (rows.length * cell + (rows.length - 1) * line)) / 2);
  ctx.fillStyle = frameColor();
  ctx.fillRect(0, 0, w, h);
  rows.forEach((row, r) => {
    [...row].forEach((ch, c) => drawCell(ctx, ch, ox + c * (cell + line), oy + r * (cell + line), cell));
  });
}

/** A single legend square. */
export function drawSwatch(canvas: HTMLCanvasElement, ch: string, w: number, h: number) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = w;
  canvas.height = h;
  drawCell(ctx, ch, 0, 0, Math.min(w, h));
}
