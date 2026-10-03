import { describe, expect, it } from 'vitest';
import { VERSIONS, describeVersions, monthYear } from './versions';

describe('monthYear', () => {
  it('formats an ISO date as short month and year', () => {
    expect(monthYear('2012-01-12')).toBe('Jan 2012');
    expect(monthYear('2011-11-18')).toBe('Nov 2011');
  });
});

describe('VERSIONS', () => {
  it('is in release order', () => {
    const dates = VERSIONS.map((v) => v.date);
    expect([...dates].sort()).toEqual(dates);
  });
});

describe('describeVersions', () => {
  it('groups a consecutive run', () => {
    expect(describeVersions(['1.0', '1.1', '1.2'])).toBe('1.0 to 1.2');
  });

  it('says "only" for a single version', () => {
    expect(describeVersions(['1.1'])).toBe('1.1 only');
  });

  it('names Beta and later versions in words', () => {
    expect(describeVersions(['b1.8', '1.0'])).toBe('Beta 1.8 to 1.0');
    expect(describeVersions(['1.1', '1.2', '1.3', '1.4+'])).toBe('1.1 and later');
  });

  it('joins separate runs', () => {
    expect(describeVersions(['1.0', '1.1', '1.4+'])).toBe('1.0 to 1.1, and 1.4 and later');
  });

  it('ignores input order', () => {
    expect(describeVersions(['1.2', '1.0', '1.1'])).toBe('1.0 to 1.2');
  });
});
