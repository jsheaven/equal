/**
 * @jest-environment jsdom
 */

import { isEqual } from '../../dist/index.esm'

describe('isEqual', () => {
  it('should return true for identical primitive values', () => {
    expect(isEqual(1, 1)).toBe(true)
    expect(isEqual(true, true)).toBe(true)
    expect(isEqual('hello', 'hello')).toBe(true)
  })

  it('should return false for different primitive values', () => {
    expect(isEqual(1, 2)).toBe(false)
    expect(isEqual(true, false)).toBe(false)
    expect(isEqual('hello', 'world')).toBe(false)
  })

  it('should return true for identical date objects', () => {
    const date1 = new Date('2022-01-01')
    const date2 = new Date('2022-01-01')
    expect(isEqual(date1, date2)).toBe(true)
  })

  it('should return false for different date objects', () => {
    const date1 = new Date('2022-01-01')
    const date2 = new Date('2022-01-02')
    expect(isEqual(date1, date2)).toBe(false)
  })

  it('should return true for identical regular expression objects', () => {
    const regex1 = /test/
    const regex2 = /test/
    expect(isEqual(regex1, regex2)).toBe(true)
  })

  it('should return false for different regular expression objects', () => {
    const regex1 = /test/
    const regex2 = /hello/
    expect(isEqual(regex1, regex2)).toBe(false)
  })

  it('should return true for identical error objects', () => {
    const error1 = new Error('Test error')
    const error2 = new Error('Test error')
    expect(isEqual(error1, error2)).toBe(true)
  })

  it('should return false for different error objects', () => {
    const error1 = new Error('Test error')
    const error2 = new Error('Different test error')
    expect(isEqual(error1, error2)).toBe(false)
  })

  it('should return true for identical arrays', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 3]
    expect(isEqual(arr1, arr2)).toBe(true)
  })

  it('should return false for different arrays', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 4]
    expect(isEqual(arr1, arr2)).toBe(false)
  })

  it('should return true for identical objects', () => {
    const obj1 = { a: 1, b: 2, c: 3 }
    const obj2 = { a: 1, b: 2, c: 3 }
    expect(isEqual(obj1, obj2)).toBe(true)
  })

  it('should return false for different objects', () => {
    const obj1 = { a: 1, b: 2, c: 3 }
    const obj2 = { a: 1, b: 2, d: 4 }
    expect(isEqual(obj1, obj2)).toBe(false)
  })

  test('should return true for equal primitive values', () => {
    expect(isEqual('foo', 'foo')).toBe(true)
    expect(isEqual(42, 42)).toBe(true)
    expect(isEqual(true, true)).toBe(true)
    expect(isEqual(null, null)).toBe(true)
    expect(isEqual(undefined, undefined)).toBe(true)
  })

  test('should return false for different primitive values', () => {
    expect(isEqual('foo', 'bar')).toBe(false)
    expect(isEqual(42, 43)).toBe(false)
    expect(isEqual(true, false)).toBe(false)
    expect(isEqual(null, undefined)).toBe(false)
    expect(isEqual(undefined, null)).toBe(false)
  })

  test('should return true for equal dates', () => {
    const date1 = new Date('2022-03-03T00:00:00.000Z')
    const date2 = new Date('2022-03-03T00:00:00.000Z')
    expect(isEqual(date1, date2)).toBe(true)
  })

  test('should return false for different dates', () => {
    const date1 = new Date('2022-03-03T00:00:00.000Z')
    const date2 = new Date('2022-03-04T00:00:00.000Z')
    expect(isEqual(date1, date2)).toBe(false)
  })

  test('should return true for equal regular expressions', () => {
    const regex1 = /foo/gi
    const regex2 = new RegExp('foo', 'gi')
    expect(isEqual(regex1, regex2)).toBe(true)
  })

  test('should return false for different regular expressions', () => {
    const regex1 = /foo/gi
    const regex2 = /bar/gi
    expect(isEqual(regex1, regex2)).toBe(false)
  })

  test('should return true for equal objects', () => {
    const obj1 = { foo: 'bar', baz: 42 }
    const obj2 = { foo: 'bar', baz: 42 }
    expect(isEqual(obj1, obj2)).toBe(true)
  })

  test('should return false for different objects', () => {
    const obj1 = { foo: 'bar', baz: 42 }
    const obj2 = { foo: 'baz', baz: 42 }
    expect(isEqual(obj1, obj2)).toBe(false)
  })

  describe('when given objects with circular references', () => {
    it('should correctly identify them sa equal', () => {
      const a: any = { foo: 'bar' }
      const b: any = { foo: 'bar' }
      const c: any = { foo: 'bar' }
      a.new = a // circular reference
      a.b = b
      c.new = c // circular reference
      c.b = b
      expect(isEqual(a, c)).toBe(true)
    })
  })

  it('should correctly identify them as not equal', () => {
    const a: any = { foo: 'bar' }
    const b1: any = { foo: 'bar', arr: [1] }
    const b2: any = { foo: 'bar', arr: [1, 2, 3] }
    const c: any = { foo: 'bar' }
    a.new = a // circular reference
    a.b = b1
    c.new = c // circular reference
    c.b = b2
    expect(isEqual(a, c)).toBe(false)
  })

  it('returns false for non-object types', () => {
    expect(isEqual(42, '42')).toBe(false)
    expect(isEqual({}, null)).toBe(false)
    expect(isEqual([], undefined)).toBe(false)
    expect(isEqual('foo', /foo/)).toBe(false)
  })

  it('returns false when input values are of different classes', () => {
    expect(isEqual({}, [])).toBe(false)
    expect(isEqual([], {})).toBe(false)
    expect(isEqual([], new Set())).toBe(false)
    expect(isEqual(new Map(), new Set())).toBe(false)
  })

  it('should return false if one of the arguments is not an object', () => {
    const a = function () {}
    const b = function () {}
    expect(isEqual(a, b)).toBe(false)
  })

  it('should return true for two identical DOM nodes', () => {
    const a = document.createElement('div')
    const b = document.createElement('div')
    const result = isEqual(a, b)
    expect(result).toBe(true)
  })

  it('should return false deep equal', () => {
    const a = { prop1: { nestedProp1: 'value1' } }
    const b = { prop1: { nestedProp1: 'value2' } }
    expect(isEqual(a, b)).toBe(false)
  })

  it('returns true when comparing object with circular reference', () => {
    const a = { foo: 'bar' } as any
    const b = { foo: 'bar', circular: a }
    a.circular = b
    expect(isEqual(a, b)).toBe(true)
  })
})
