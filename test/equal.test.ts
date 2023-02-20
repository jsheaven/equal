import { jest } from '@jest/globals'
const equalMock = jest.fn()
jest.mock('../dist/index.esm', () => ({
  equal: equalMock,
}));

import { isEqual } from '../dist/index.esm'

describe('isEqual', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the equal function with the correct arguments', () => {
    isEqual('foo', 'bar');

    expect(equalMock).toHaveBeenCalledTimes(1);
    expect(equalMock).toHaveBeenCalledWith('foo', 'bar', [], [], true);
  });

  it('should call the equal function with the correct arguments when strictCheck is false', () => {
    isEqual(42, '42', false);

    expect(equalMock).toHaveBeenCalledTimes(1);
    expect(equalMock).toHaveBeenCalledWith(42, '42', [], [], false);
  });

  it('should return the result of the equal function', () => {
    (equalMock as jest.Mock).mockReturnValueOnce(true);
    expect(isEqual('foo', 'bar')).toBe(true);

    (equalMock as jest.Mock).mockReturnValueOnce(false);
    expect(isEqual('foo', 'bar')).toBe(false);
  });
});
