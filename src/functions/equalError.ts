export const equalError = (a: Error, b: Error): boolean => {
  return a.message === b.message;
};

