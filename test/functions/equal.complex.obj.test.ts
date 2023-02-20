import { equal } from '../../dist/index.esm'

describe('equal function', () => {
  const obj = {
    prop1: 123,
    prop2: 'test',
    prop3: {
      nested1: true,
      nested2: [1, 2, 3],
      nested3: {
        deeper1: { foo: 'bar' },
        deeper2: null,
      },
    },
    prop4: new Date('2022-12-01T00:00:00Z'),
  }

  it('should return true for equal objects with deep of 4', () => {
    expect(equal(obj, {
      prop1: 123,
      prop2: 'test',
      prop3: {
        nested1: true,
        nested2: [1, 2, 3],
        nested3: {
          deeper1: { foo: 'bar' },
          deeper2: null,
        },
      },
      prop4: new Date('2022-12-01T00:00:00Z'),
    }, [], [], true)).toBe(true)
  })

  it('should return false for non-equal objects with deep of 4', () => {
    expect(equal(obj, {
      prop1: 123,
      prop2: 'test',
      prop3: {
        nested1: true,
        nested2: [1, 2, 3],
        nested3: {
          deeper1: { foo: 'bar' },
          deeper2: undefined,
        },
      },
      prop4: new Date('2022-12-01T00:00:00Z'),
    }, [], [], true)).toBe(false)
  })
  it('returns true if the objects are equal', () => {
    const a = {
      b: {
        c: {
          d: 1,
        },
      },
    }
    const b = {
      b: {
        c: {
          d: 1,
        },
      },
    }
    expect(equal(a, b, [], [], false)).toBe(true)
  })

  it('returns false if the objects have a different value at the third level', () => {
    const a = {
      b: {
        c: {
          d: 1,
        },
      },
    }
    const b = {
      b: {
        c: {
          d: 2,
        },
      },
    }
    expect(equal(a, b, [], [], false)).toBe(false)
  })

  it('returns false if the objects have a different key at the second level', () => {
    const a = {
      b: {
        c: {
          d: 1,
        },
      },
    }
    const b = {
      b: {
        e: {
          d: 1,
        },
      },
    }
    expect(equal(a, b, [], [], false)).toBe(false)
  })

  it('returns false if one object has more keys at the second level', () => {
    const a = {
      b: {
        c: {
          d: 1,
        },
      },
    }
    const b = {
      b: {
        c: {
          d: 1,
        },
        e: {
          f: 2,
        },
      },
    }
    expect(equal(a, b, [], [], false)).toBe(false)
  })

  it('returns false if the objects have a different key at the first level', () => {
    const a = {
      b: {
        c: {
          d: 1,
        },
      },
    }
    const b = {
      e: {
        c: {
          d: 1,
        },
      },
    }
    expect(equal(a, b, [], [], false)).toBe(false)
  })

  it('returns false if one object has more keys at the first level', () => {
    const a = {
      b: {
        c: {
          d: 1,
        },
      },
    }
    const b = {
      b: {
        c: {
          d: 1,
        },
      },
      e: {
        f: 2,
      },
    }
    expect(equal(a, b, [], [], false)).toBe(false)
  })
  it('should return true for a complex object with a depth of 3', () => {
    const a = {
      id: 1,
      name: 'Alice',
      address: {
        street: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        country: 'USA',
        zip: '12345',
        phone: {
          areaCode: '555',
          number: '123-4567',
        },
      },
      interests: ['reading', 'movies', 'hiking'],
    }

    const b = {
      id: 1,
      name: 'Alice',
      address: {
        street: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        country: 'USA',
        zip: '12345',
        phone: {
          areaCode: '555',
          number: '123-4567',
        },
      },
      interests: ['reading', 'movies', 'hiking'],
    }

    expect(equal(a, b, [], [], false)).toBe(true)
  })

  it('should return false for a complex object with a depth of 3 and different properties', () => {
    const a = {
      id: 1,
      name: 'Alice',
      address: {
        street: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        country: 'USA',
        zip: '12345',
        phone: {
          areaCode: '555',
          number: '123-4567',
        },
      },
      interests: ['reading', 'movies', 'hiking'],
    }

    const b = {
      id: 1,
      name: 'Bob',
      address: {
        street: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        country: 'USA',
        zip: '12345',
        phone: {
          areaCode: '555',
          number: '123-4567',
        },
      },
      interests: ['reading', 'movies', 'traveling'],
    }

    expect(equal(a, b, [], [], false)).toBe(false)
  })
  it('should handle circular references', () => {
    const a: any = { name: 'A' };
    const b: any = { name: 'B' };
    const c: any = { name: 'C' };
    a.b = b;
    b.c = c;
    c.a = a;
    expect(equal(a, a, [],[], false)).toBe(true);
    expect(equal(a, b, [],[], false)).toBe(false);
    expect(equal(a, c, [],[], false)).toBe(false);
  });
})
