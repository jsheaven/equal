<h1 align="center">@jsheaven/equal</h1>

> this package provides a utility for deep comparison of two values (objects, primitives or arrays) in JavaScript /
> Typescript. It can be used to check if two objects are equal in value, even if they have different references in memory.
> The isEqual function recursively compares each property of the objects, using the === operator to compare primitive
> values and recursively calling itself to compare nested objects and arrays. The package also provides an option to
> perform a strict comparison, which will check that the objects have the same prototype chain, constructor, and other
> characteristics. The package is commonly used in testing frameworks, such as Jest, to compare the expected and actual
> values of test results.

<h2 align="center">User Stories</h2>

1. As a developer, I want to use isEqual for comparing two values

2. As a developer, I don't want to create a custom comparator

<h2 align="center">Features</h2>

- ✅ Compares two values for equality.
- ✅ Include Array, Date, Error, RegExp, DomNode, Primitives or Objects.
- ✅ Includes also circular references.
- ✅ Available as a simple API and simple to use CLI
- ✅ Just `775 byte` nano sized (ESM, gizpped)
- ✅ Tree-shakable and side-effect free
- ✅ Runs on Windows, Mac, Linux, CI tested
- ✅ First class TypeScript support
- ✅ 100% Unit Test coverage

<h2 align="center">Example usage (API, as a library)</h2>

<h3 align="center">Setup</h3>

- yarn: `yarn add @jsheaven/equal`
- npm: `npm install @jsheaven/equal`

<h3 align="center">ESM</h3>

```ts
import { isEqual } from '@jsheaven/equal'

const equal = isEqual({ date: new Date('2023-02-02') }, { date: new Date('2023-02-02') })
if (equal) {
  //logic if result is equal
} else {
  //logic if result is not equal
}
```

<h3 align="center">CommonJS</h3>

```ts
const { isEqual } = require('@jsheaven/equal')

// same API like ESM variant
```
