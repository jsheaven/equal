export const isEqualError = (a: Error, b: Error): boolean => {
  return a.message === b.message;
};
