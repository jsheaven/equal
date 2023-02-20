import { isDomNode } from './isDomNode'
import { hasOwnProperty } from './hasOwnProperty'
import { getEnumerablePropertyNames } from './getEnumerablePropertyNames'
import { equalPrimitive } from './equalPrimitive'
import { equalDates } from './equalDate'
import { equalRegExp } from './equalRegExp'
import { equalError } from './equalError'


export const equal = (
  a: any,
  b: any,
  aStack: Array<unknown>,
  bStack: Array<unknown>,
  strictCheck: boolean | undefined,
): boolean => {
  let result = true

  if (a instanceof Error && b instanceof Error) {
    return equalError(a,b)
  }

  if (Object.is(a, b)) {
    return true
  }
  // A strict comparison is necessary because `null == undefined`.
  if (a === null || b === null) {
    return a === b
  }

  const className = Object.prototype.toString.call(a)
  if (className != Object.prototype.toString.call(b)) {
    return false
  }

  switch (className) {
    case '[object Boolean]':
    case '[object String]':
    case '[object Number]':
      return equalPrimitive(a, b)
    case '[object Date]':
      return equalDates(a, b)
    case '[object RegExp]':
      return equalRegExp(a, b)
  }

  if (typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  // Use DOM3 method isEqualNode (IE>=9)
  if (isDomNode(a) && isDomNode(b)) {
    return a.isEqualNode(b)
  }

  // Used to detect circular references.
  let length = aStack.length
  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    // circular references at same depth are equal
    // circular reference is not equal to non-circular one
    if (aStack[length] === a) {
      return bStack[length] === b
    } else if (bStack[length] === b) {
      return false
    }
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
    if (strictCheck)
      result =
        hasOwnProperty(b, key) &&
        equal(a[key], b[key], aStack, bStack, strictCheck)
    else
      result =
        (hasOwnProperty(b, key) || a[key] === undefined) &&
        equal(a[key], b[key], aStack, bStack, strictCheck)

    if (!result) {
      return false
    }
  }
  // Remove the first object from the stack of traversed objects.
  aStack.pop()
  bStack.pop()

  return result
}


