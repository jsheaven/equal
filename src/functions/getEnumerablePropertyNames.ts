import { hasOwnProperty } from './hasOwnProperty'

export const getEnumerablePropertyNames = (obj: object, hasKey = hasOwnProperty) => {
  const keys = []
  for (const key in obj) {
    if (hasKey(obj, key)) {
      keys.push(key)
    }
  }
  return keys.concat(
    (Object.getOwnPropertySymbols(obj) as Array<any>).filter(
      (symbol) => Object.getOwnPropertyDescriptor(obj, symbol)!.enumerable,
    ),
  )
}
