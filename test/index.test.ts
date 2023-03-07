describe('index', () => {
  it('test all exported functions', async () => {
    const module = await import('../dist/index.esm')
    const exportedModules = Object.keys(module)

    expect(exportedModules).toEqual(
      expect.arrayContaining([
        'getEnumerablePropertyNames',
        'hasOwnProperty',
        'isDomNode',
        'isEqual',
        'isEqualDates',
        'isEqualError',
        'isEqualPrimitive',
        'isEqualRegExp',
        'isType',
      ]),
    )
  })
})
