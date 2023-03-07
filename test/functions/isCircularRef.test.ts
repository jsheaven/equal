import { isCircularRef } from '../../dist/index.esm'
describe('isCircularRef', () => {
  it('should return undefined when aStack and bStack are empty', () => {
    expect(isCircularRef(null, null, [], [])).toBeUndefined()
  })

  it('should return false when there is no circular reference', () => {
    expect(isCircularRef(null, {}, [null], [{}])).toBe(false)
  })

  it('should return true when a circular reference exists', () => {
    const obj = {}
    const arr = [obj]
    obj['prop'] = arr

    expect(isCircularRef(arr, obj, [arr, obj], [obj, arr])).toBe(true)
  })

  it('should return true when circular reference is at same depth', () => {
    const obj1 = {}
    const obj2 = { prop: obj1 }
    obj1['prop'] = obj2

    expect(isCircularRef(obj1, obj2, [obj1, obj2], [obj2, obj1])).toBe(true)
  })
  it('should return false when circular reference is at same depth for b', () => {
    const obj1 = {}
    const obj2 = { prop: obj1 }

    expect(isCircularRef(obj1, obj2, [obj2], [obj2])).toBe(false)
  })
})
