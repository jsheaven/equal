import { isEqual } from '../dist/index.esm'

describe('isEqual', () => {
  test('compares primitive values', () => {
    expect(isEqual(null, null, false)).toBe(true)
    expect(isEqual(undefined, undefined, false)).toBe(true)
    expect(isEqual(null, undefined, false)).toBe(false)
    expect(isEqual(1, 1, false)).toBe(true)
    expect(isEqual(1, 2, false)).toBe(false)
    expect(isEqual('foo', 'foo', false)).toBe(true)
    expect(isEqual('foo', 'bar', false)).toBe(false)
    expect(isEqual(true, true, false)).toBe(true)
    expect(isEqual(true, false, false)).toBe(false)
  })

  test('compares dates', () => {
    expect(isEqual(new Date(2022, 1, 1), new Date(2022, 1, 1), false)).toBe(true)
    expect(isEqual(new Date(2022, 1, 1), new Date(2023, 1, 1), false)).toBe(false)
  })

  test('compares regular expressions', () => {
    expect(isEqual(/foo/, /foo/, false)).toBe(true)
    expect(isEqual(/foo/, /bar/, false)).toBe(false)
  })

  test('compares arrays', () => {
    expect(isEqual([], [], false)).toBe(true)
    expect(isEqual([1, 2, 3], [1, 2, 3], false)).toBe(true)
    expect(isEqual([1, 2, 3], [1, 2, 4], false)).toBe(false)
    expect(isEqual([1, 2, 3], [3, 2, 1], false)).toBe(false)
    expect(isEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }], false)).toBe(true)
    expect(isEqual([{ a: 1 }, { b: 2 }], [{ b: 2 }, { a: 1 }], false)).toBe(false)
    expect(isEqual([1, [2, 3], [4, [5, 6]]], [1, [2, 3], [4, [5, 6]]], false)).toBe(true)
    expect(isEqual([1, [2, 3], [4, [5, 6]]], [1, [2, 3], [4, [6, 5]]], false)).toBe(false)
    expect(isEqual([1, 2, 3], [1, 2, 3, 4], false)).toBe(false)
    expect(isEqual([1, 2, 3, 4], [1, 2, 3], false)).toBe(false)
  })
  it('should return true for equal objects', () => {
    expect(isEqual({}, {}, false)).toBe(true)
    expect(isEqual({ a: 1 }, { a: 1 }, false)).toBe(true)
    expect(isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }, false)).toBe(true)
    expect(isEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] }, false)).toBe(true)
    expect(isEqual({ a: null }, { a: null }, false)).toBe(true)
    expect(isEqual({ a: undefined }, { a: undefined }, false)).toBe(true)
    expect(isEqual({ a: { b: {} } }, { a: { b: {} } }, false)).toBe(true)
  })

  it('should return false for non-equal objects', () => {
    expect(isEqual({}, { a: 1 }, false)).toBe(false)
    expect(isEqual({ a: 1 }, { a: 2 }, false)).toBe(false)
    expect(isEqual({ a: 1 }, { b: 1 }, false)).toBe(false)
    expect(isEqual({ a: [1, 2, 3] }, { a: [3, 2, 1] }, false)).toBe(false)
    expect(isEqual({ a: null }, { a: undefined }, false)).toBe(false)
    expect(isEqual({ a: { b: 1 } }, { a: { b: 2 } }, false)).toBe(false)
  })

  it('should handle circular references', () => {
    const a: any = {}
    const b: any = {}
    a.b = b
    b.a = a
    expect(isEqual(a, b, true)).toBe(false)

    const c: any = [1, 2, 3]
    c.push(c)
    const d: any = [1, 2, 3]
    d.push(d)
    expect(isEqual(c, d, true)).toBe(true)
  })

  it('should handle strict comparisons', () => {
    expect(isEqual({}, {}, true)).toBe(true)
    expect(isEqual([], [], true)).toBe(true)
    expect(isEqual({ a: 1 }, { a: 1 }, true)).toBe(true)
    expect(isEqual({ a: 1 }, { a: '1' }, true)).toBe(false)
    expect(isEqual({ a: [1, 2, 3] }, { a: [1, 2, '3'] }, true)).toBe(false)
    expect(isEqual({ a: 1 }, { a: 1, b: 2 }, true)).toBe(false)
    expect(isEqual({ a: 1, b: 2 }, { a: 1 }, true)).toBe(false)
  })
})
