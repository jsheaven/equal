/**
 * @jest-environment jsdom
 */

import { isDomNode } from '../../dist/index.esm'

describe('isDomNode', () => {
  it('should return false for null or undefined inputs', () => {
    expect(isDomNode(null)).toBe(false)
    expect(isDomNode(undefined)).toBe(false)
  })

  it('should return false for non-object inputs', () => {
    expect(isDomNode(123)).toBe(false)
    expect(isDomNode('abc')).toBe(false)
    expect(isDomNode(true)).toBe(false)
    expect(isDomNode([])).toBe(false)
    expect(isDomNode(() => {})).toBe(false)
  })

  it('should return false for objects without nodeType, nodeName, or isEqualNode properties', () => {
    const obj1 = {}
    const obj2 = { nodeType: 1 }
    const obj3 = { nodeName: 'div' }
    const obj4 = { isEqualNode: () => {} }
    const obj5 = { nodeType: 1, nodeName: 'div' }
    const obj6 = { nodeType: 1, isEqualNode: () => {} }
    const obj7 = { nodeName: 'div', isEqualNode: () => {} }
    expect(isDomNode(obj1)).toBe(false)
    expect(isDomNode(obj2)).toBe(false)
    expect(isDomNode(obj3)).toBe(false)
    expect(isDomNode(obj4)).toBe(false)
    expect(isDomNode(obj5)).toBe(false)
    expect(isDomNode(obj6)).toBe(false)
    expect(isDomNode(obj7)).toBe(false)
  })

  it('should return true for objects with nodeType, nodeName, and isEqualNode properties', () => {
    const div = document.createElement('div')
    expect(isDomNode(div)).toBe(true)
  })
})
