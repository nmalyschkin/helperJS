/**
 * This is a workaround for the invalid state of discriminated union
 * @see https://stackoverflow.com/questions/52677576/typescript-discriminated-union-allows-invalid-state/52678379
 */
type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAllKeys extends PropertyKey> = T extends any
  ? T & Partial<Record<Exclude<TAllKeys, keyof T>, never>>
  : never;
type StrictUnion<T> = StrictUnionHelper<T, UnionKeys<T>>;
