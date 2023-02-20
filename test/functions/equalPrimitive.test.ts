import { equalPrimitive } from '../../dist/index.esm'

describe('equalPrimitive', () => {
  it('returns true for two identical numbers', () => {
    expect(equalPrimitive(42, 42)).toBe(true);
  });

  it('returns true for two identical strings', () => {
    expect(equalPrimitive('hello', 'hello')).toBe(true);
  });

  it('returns true for two identical booleans', () => {
    expect(equalPrimitive(true, true)).toBe(true);
  });

  it('returns false for different primitive types', () => {
    expect(equalPrimitive(42, '42')).toBe(false);
  });

  it('returns true for two equivalent primitive objects', () => {
    const a = new Number(42);
    const b = new Number(42);
    expect(equalPrimitive(a, b)).toBe(true);
  });

  it('returns false for two non-equivalent primitive objects', () => {
    const a = new Number(42);
    const b = new Number(43);
    expect(equalPrimitive(a, b)).toBe(false);
  });

  it('returns true for two NaN values', () => {
    expect(equalPrimitive(NaN, NaN)).toBe(true);
  });
});
