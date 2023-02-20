export const equalPrimitive = (a: any, b: any): boolean => {
  if (typeof a !== typeof b) {
    // One is a primitive, one a `new Primitive()`
    return false;
  } else if (typeof a !== 'object' && typeof b !== 'object') {
    // both are proper primitives
    return Object.is(a, b);
  } else {
    // both are `new Primitive()`s
    return Object.is(a.valueOf(), b.valueOf());
  }
};
