export const isEqualDates = (a: Date, b: Date): boolean => {
  // Coerce dates to numeric primitive values. Dates are compared by their
  // millisecond representations. Note that invalid dates with millisecond representations
  // of `NaN` are not equivalent.
  return +a == +b;
};

