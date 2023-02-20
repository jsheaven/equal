import { equal } from './functions'

export type EqualsFunction = <T>(
  a: T,
  b: unknown,
  strictCheck?: boolean,
) => boolean;

// Extracted out of jasmine 2.5.2
export const isEqual: EqualsFunction = (a, b, strictCheck= true) => {
  return equal(a, b, [], [], strictCheck);
};

