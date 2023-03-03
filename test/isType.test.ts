import { isType } from '../dist/index.esm'

describe('isType', () => {
  it('returns true for matching type', () => {
    expect(isType<number>('Number', 42)).toBe(true);
  });

  it('returns false for non-matching type', () => {
    expect(isType<string>('Number', 'hello')).toBe(false);
  });
});
