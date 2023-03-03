import { isEqualError } from '../dist/index.esm'

describe('isEqualError', () => {
  it('returns true for equal errors', () => {
    const error1 = new Error('foo');
    const error2 = new Error('foo');
    expect(isEqualError(error1, error2)).toBe(true);
  });

  it('returns false for different error messages', () => {
    const error1 = new Error('foo');
    const error2 = new Error('bar');
    expect(isEqualError(error1, error2)).toBe(false);
  });

  it('returns true for different error types', () => {
    const error1 = new Error('foo');
    const error2 = new TypeError('foo');
    expect(isEqualError(error1, error2)).toBe(true);
  });
});
