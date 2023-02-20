import { equalDates } from '../../dist/index.esm'

describe('equalDates', () => {
  it('returns true for equal dates', () => {
    const a = new Date(2022, 1, 1);
    const b = new Date(2022, 1, 1);
    expect(equalDates(a, b)).toBe(true);
  });

  it('returns false for unequal dates', () => {
    const a = new Date(2022, 1, 1);
    const b = new Date(2023, 1, 1);
    expect(equalDates(a, b)).toBe(false);
  });

  it('returns true for identical dates with different timezones', () => {
    const a = new Date('2022-01-01T00:00:00.000Z');
    const b = new Date('2022-01-01T08:00:00.000+08:00');
    expect(equalDates(a, b)).toBe(true);
  });

  it('returns false for invalid dates', () => {
    const a = new Date('invalid');
    const b = new Date('invalid');
    expect(equalDates(a, b)).toBe(false);
  });

  it('returns true for equivalent NaN values', () => {
    const a = new Date(NaN);
    const b = new Date(NaN);
    expect(equalDates(a, b)).toBe(false);
  });

  it('returns false for unequal NaN values', () => {
    const a = new Date(NaN);
    const b = new Date('2022-01-01T00:00:00.000Z');
    expect(equalDates(a, b)).toBe(false);
  });

  it('compares dates by their millisecond representation', () => {
    const a = new Date(2022, 1, 1);
    const b = new Date(2022, 1, 1, 12);
    expect(equalDates(a, b)).toBe(false);
  });
});
