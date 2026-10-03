import { describe, expect, it } from 'vitest';
import { ICONS, PALETTE, iconRects, type IconName } from './icons';
import { SECTIONS } from './sections';

describe('ICONS', () => {
  for (const [name, rows] of Object.entries(ICONS)) {
    it(`${name} is 8×8 and only uses palette colours`, () => {
      expect(rows).toHaveLength(8);
      for (const row of rows) {
        expect(row).toHaveLength(8);
        for (const ch of row) {
          if (ch !== '.') expect(PALETTE).toHaveProperty(ch);
        }
      }
    });
  }

  it('has an icon for every section', () => {
    for (const s of SECTIONS) expect(ICONS).toHaveProperty(s.icon);
  });
});

describe('iconRects', () => {
  it('emits one rect per filled pixel with its palette colour', () => {
    const name: IconName = 'apple';
    const filled = ICONS[name].join('').replaceAll('.', '').length;
    const rects = iconRects(name);
    expect(rects).toHaveLength(filled);
    expect(rects[0]).toEqual({ x: 4, y: 0, fill: PALETTE.k });
  });
});
