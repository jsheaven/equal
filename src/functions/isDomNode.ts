export const isDomNode = (obj: any): boolean => {
  // Use DOM3 method isEqualNode (IE>=9)
  return (
    obj !== null &&
    typeof obj === 'object' &&
    typeof obj.nodeType === 'number' &&
    typeof obj.nodeName === 'string' &&
    typeof obj.isEqualNode === 'function'
  )
}
