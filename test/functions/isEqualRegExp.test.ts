import { isEqualRegExp } from '../../dist/index.esm'

describe('isEqualRegExp', () => {
  it('returns true for identical RegExp objects', () => {
    const regExp1 = /hello/i;
    const regExp2 = /hello/i;
    expect(isEqualRegExp(regExp1, regExp2)).toBe(true);
  });

  it('returns false for RegExp objects with different source patterns', () => {
    const regExp1 = /hello/i;
    const regExp2 = /world/i;
    expect(isEqualRegExp(regExp1, regExp2)).toBe(false);
  });

  it('returns false for RegExp objects with different flags', () => {
    const regExp1 = /hello/i;
    const regExp2 = /hello/g;
    expect(isEqualRegExp(regExp1, regExp2)).toBe(false);
  });

  it('returns false for different types of objects', () => {
    const regExp = /hello/i;
    const notRegExp: any = 'hello';
    expect(isEqualRegExp(regExp, notRegExp)).toBe(false);
  });
});
