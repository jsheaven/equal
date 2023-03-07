export const isEqualRegExp = (a: RegExp, b: RegExp) => {
  // RegExps are compared by their source patterns and flags.
  return a.source === b.source && a.flags === b.flags
}
