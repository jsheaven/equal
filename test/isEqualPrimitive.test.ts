import { isEqualPrimitive } from '../dist/index.esm'

describe('isEqualPrimitive', () => {
  it('returns true for two identical numbers', () => {
    expect(isEqualPrimitive(42, 42)).toBe(true);
  });

  it('returns true for two identical strings', () => {
    expect(isEqualPrimitive('hello', 'hello')).toBe(true);
  });

  it('returns true for two identical booleans', () => {
    expect(isEqualPrimitive(true, true)).toBe(true);
  });

  it('returns false for different primitive types', () => {
    expect(isEqualPrimitive(42, '42')).toBe(false);
  });

  it('returns true for two equivalent primitive objects', () => {
    const a = new Number(42);
    const b = new Number(42);
    expect(isEqualPrimitive(a, b)).toBe(true);
  });

  it('returns false for two non-equivalent primitive objects', () => {
    const a = new Number(42);
    const b = new Number(43);
    expect(isEqualPrimitive(a, b)).toBe(false);
  });

  it('returns true for two NaN values', () => {
    expect(isEqualPrimitive(NaN, NaN)).toBe(true);
  });
});
