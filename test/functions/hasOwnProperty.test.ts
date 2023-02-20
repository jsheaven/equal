import { hasOwnProperty } from '../../dist/index.esm'

describe('hasOwnProperty', () => {
  it('returns true when object has own property', () => {
    const obj = { foo: 'bar' };
    expect(hasOwnProperty(obj, 'foo')).toBe(true);
  });

  it('returns false when object does not have own property', () => {
    const obj = { foo: 'bar' };
    expect(hasOwnProperty(obj, 'baz')).toBe(false);
  });

  it('returns false when key is inherited from prototype', () => {
    const obj = Object.create({ foo: 'bar' });
    expect(hasOwnProperty(obj, 'foo')).toBe(false);
  });

  it('returns false for non-object inputs', () => {
    expect(hasOwnProperty(null, 'foo')).toBe(false);
    expect(hasOwnProperty(undefined, 'foo')).toBe(false);
    expect(hasOwnProperty(42, 'foo')).toBe(false);
    expect(hasOwnProperty('hello', 'foo')).toBe(false);
    expect(hasOwnProperty([], 'foo')).toBe(false);
    expect(hasOwnProperty({}, null)).toBe(false);
    expect(hasOwnProperty({}, undefined)).toBe(false);
    expect(hasOwnProperty({}, 42 as any)).toBe(false);
    expect(hasOwnProperty({}, [] as any)).toBe(false);
  });
});
