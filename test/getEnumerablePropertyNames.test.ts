import {jest} from '@jest/globals'
import { getEnumerablePropertyNames, hasOwnProperty } from '../dist/index.esm'

describe('getEnumerablePropertyNames', () => {
  it('returns an empty array for an empty object', () => {
    expect(getEnumerablePropertyNames({})).toEqual([]);
  });

  it('returns an array of enumerable property names for an object with enumerable properties', () => {
    const obj = {
      a: 1,
      b: 'two',
      c: true,
    };
    expect(getEnumerablePropertyNames(obj)).toEqual(['a', 'b', 'c']);
  });

  it('ignores non-enumerable properties', () => {
    const obj = {
      a: 1,
    };
    Object.defineProperty(obj, 'b', { value: 'two', enumerable: false });
    expect(getEnumerablePropertyNames(obj)).toEqual(['a']);
  });

  it('returns an array of enumerable property names, including symbol keys', () => {
    const firstKey = Symbol('foo');
    const secondKey = Symbol('bar')
    const obj = {
      [firstKey]: 1,
      [secondKey]: 2,
    };
    expect(getEnumerablePropertyNames(obj)).toEqual([
      firstKey,
      secondKey,
    ]);
  });

  it('uses the `hasKey` function to determine property existence', () => {
    const obj = {
      a: 1,
    };
    const hasKeyMock = jest.fn(hasOwnProperty);
    getEnumerablePropertyNames(obj, hasKeyMock);
    expect(hasKeyMock).toHaveBeenCalledWith(obj, 'a');
  });
});
