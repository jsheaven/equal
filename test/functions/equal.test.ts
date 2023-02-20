import { equal } from '../../dist/index.esm'

describe('equal', () => {
  test('compares primitive values', () => {
    expect(equal(null, null, [], [], false)).toBe(true)
    expect(equal(undefined, undefined, [], [], false)).toBe(true)
    expect(equal(null, undefined, [], [], false)).toBe(false)
    expect(equal(1, 1, [], [], false)).toBe(true)
    expect(equal(1, 2, [], [], false)).toBe(false)
    expect(equal('foo', 'foo', [], [], false)).toBe(true)
    expect(equal('foo', 'bar', [], [], false)).toBe(false)
    expect(equal(true, true, [], [], false)).toBe(true)
    expect(equal(true, false, [], [], false)).toBe(false)
  })

  test('compares dates', () => {
    expect(equal(new Date(2022, 1, 1), new Date(2022, 1, 1), [], [], false)).toBe(true)
    expect(equal(new Date(2022, 1, 1), new Date(2023, 1, 1), [], [], false)).toBe(false)
  })

  test('compares regular expressions', () => {
    expect(equal(/foo/, /foo/, [], [], false)).toBe(true)
    expect(equal(/foo/, /bar/, [], [], false)).toBe(false)
  })

  test('compares arrays', () => {
    expect(equal([], [], [], [], false)).toBe(true)
    expect(equal([1, 2, 3], [1, 2, 3], [], [], false)).toBe(true)
    expect(equal([1, 2, 3], [1, 2, 4], [], [], false)).toBe(false)
    expect(equal([1, 2, 3], [3, 2, 1], [], [], false)).toBe(false)
    expect(equal([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }], [], [], false)).toBe(true)
    expect(equal([{ a: 1 }, { b: 2 }], [{ b: 2 }, { a: 1 }], [], [], false)).toBe(false)
    expect(equal([1, [2, 3], [4, [5, 6]]], [1, [2, 3], [4, [5, 6]]], [], [], false)).toBe(true)
    expect(equal([1, [2, 3], [4, [5, 6]]], [1, [2, 3], [4, [6, 5]]], [], [], false)).toBe(false)
    expect(equal([1, 2, 3], [1, 2, 3, 4], [], [], false)).toBe(false)
    expect(equal([1, 2, 3, 4], [1, 2, 3], [], [], false)).toBe(false)
  })
  it('should return true for equal objects', () => {
    expect(equal({}, {}, [], [], false)).toBe(true)
    expect(equal({ a: 1 }, { a: 1 }, [], [], false)).toBe(true)
    expect(equal({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }, [], [], false)).toBe(true)
    expect(equal({ a: [1, 2, 3] }, { a: [1, 2, 3] }, [], [], false)).toBe(true)
    expect(equal({ a: null }, { a: null }, [], [], false)).toBe(true)
    expect(equal({ a: undefined }, { a: undefined }, [], [], false)).toBe(true)
    expect(equal({ a: { b: {} } }, { a: { b: {} } }, [], [], false)).toBe(true)
  })

  it('should return false for non-equal objects', () => {
    expect(equal({}, { a: 1 }, [], [], false)).toBe(false)
    expect(equal({ a: 1 }, { a: 2 }, [], [], false)).toBe(false)
    expect(equal({ a: 1 }, { b: 1 }, [], [], false)).toBe(false)
    expect(equal({ a: [1, 2, 3] }, { a: [3, 2, 1] }, [], [], false)).toBe(false)
    expect(equal({ a: null }, { a: undefined }, [], [], false)).toBe(false)
    expect(equal({ a: { b: 1 } }, { a: { b: 2 } }, [], [], false)).toBe(false)
  })

  it('should handle circular references', () => {
    const a: any = {}
    const b: any = {}
    a.b = b
    b.a = a
    expect(equal(a, b, [], [], true)).toBe(false)

    const c: any = [1, 2, 3]
    c.push(c)
    const d: any = [1, 2, 3]
    d.push(d)
    expect(equal(c, d, [], [], true)).toBe(true)
  })

  it('should handle strict comparisons', () => {
    expect(equal({}, {}, [], [], true)).toBe(true)
    expect(equal([], [], [], [], true)).toBe(true)
    expect(equal({ a: 1 }, { a: 1 }, [], [], true)).toBe(true)
    expect(equal({ a: 1 }, { a: '1' }, [], [], true)).toBe(false)
    expect(equal({ a: [1, 2, 3] }, { a: [1, 2, '3'] }, [], [], true)).toBe(false)
    expect(equal({ a: 1 }, { a: 1, b: 2 }, [], [], true)).toBe(false)
    expect(equal({ a: 1, b: 2 }, { a: 1 }, [], [], true)).toBe(false)
  })
})
