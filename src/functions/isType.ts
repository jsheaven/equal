export const isType = <T>(typeName: string, value: unknown): value is T => {
  return Object.prototype.toString.apply(value) === `[object ${typeName}]`
}
