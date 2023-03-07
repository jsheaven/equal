import { isDomNode } from './isDomNode'
import { hasOwnProperty } from './hasOwnProperty'
import { getEnumerablePropertyNames } from './getEnumerablePropertyNames'
import { isEqualPrimitive } from './isEqualPrimitive'
import { isEqualDates } from './isEqualDate'
import { isEqualRegExp } from './isEqualRegExp'
import { isEqualError } from './isEqualError'
import { isCircularRef } from './isCircularRef'

export const isEqual = (
  a: any,
  b: any,
  strictCheck: boolean = true,
  aStack: Array<unknown> = [],
  bStack: Array<unknown> = [],
): boolean => {
  let result = true

  if (a instanceof Error && b instanceof Error) {
    return isEqualError(a, b)
  }

  if (Object.is(a, b)) {
    return true
  }

  // A strict comparison is necessary because `null == undefined`.
  if (a === null || b === null) {
    return a === b
  }

  const className = Object.prototype.toString.call(a)
  const otherClassName = Object.prototype.toString.call(b)
  if (className !== otherClassName) {
    return false
  }

  switch (className) {
    case '[object Boolean]':
    case '[object String]':
    case '[object Number]':
      return isEqualPrimitive(a, b)
    case '[object Date]':
      return isEqualDates(a, b)
    case '[object RegExp]':
      return isEqualRegExp(a, b)
  }

  if (typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  // Use DOM3 method isEqualNode (IE>=9)
  if (isDomNode(a) && isDomNode(b)) {
    return a.isEqualNode(b)
  }

  const circularResult = isCircularRef(a, b, aStack, bStack)
  if (typeof circularResult !== 'undefined') {
    return circularResult
  }

  // Add the first object to the stack of traversed objects.
  aStack.push(a)
  bStack.push(b)
  // Recursively compare objects and arrays.
  // Compare array lengths to determine if a deep comparison is necessary.
  if (strictCheck && className == '[object Array]' && a.length !== b.length) {
    return false
  }

  // Deep compare objects.
  const aKeys = getEnumerablePropertyNames(a)
  let key

  const bKeys = getEnumerablePropertyNames(b)

  // Ensure that both objects contain the same number of properties before comparing deep equality.
  let size = aKeys.length
  if (bKeys.length !== size) {
    return false
  }

  while (size--) {
    key = aKeys[size]

    // Deep compare each member
    if (strictCheck) result = hasOwnProperty(b, key) && isEqual(a[key], b[key], strictCheck, aStack, bStack)
    else
      result = (hasOwnProperty(b, key) || a[key] === undefined) && isEqual(a[key], b[key], strictCheck, aStack, bStack)

    if (!result) {
      return false
    }
  }

  // Remove the first object from the stack of traversed objects.
  aStack.pop()
  bStack.pop()

  return result
}
