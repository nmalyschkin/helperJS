## functions

### makeThrottled

Higher order function to throttle function calls. Returns `void` since throttled execution is asyncronuous. If the return value is needed, wrap inside a Promise and make a side-effect to resolve the promise.

### retrieveFromIterator

Generic function to retrieve X elements from an iterator or iteratable. Useful for infinite generators or lazy chunking.

### exist

Checks for `null` and `undefined` – can be used instead of nullish coalescing.

### makeMemoized

Higher order function to memoize pure functions. Shallow compares `args` for that purpose.

### makeCached

Higher order function to cache pure functions with a single argument.

## types

### StrictUnion<T>

The typescript discriminated union checks the last object as valid,
while with StrictUnion it get's invalid.

```ts
interface B {
  a: true;
  b: number;
}
interface C {
  a?: false;
  c: number;
}
type Union = StrictUnion<B | C>;

const valid1: Union = {
  a: false,
  c: 5,
};
const valid2: Union = {
  c: 4,
};
const valid3: Union = {
  a: true,
  b: 4,
};
const invalid: Union = {
  b: 4,
  c: 4,
};
```
