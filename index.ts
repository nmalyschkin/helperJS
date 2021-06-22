export const makeThrottled = <T extends (...args: any[]) => any>(
  func: T,
  time = 1000
): ((...funcArgs: Parameters<T>) => void) => {
  let waiting = false;
  let toBeExecuted = false;
  let lastArgs: Parameters<T> = null;

  const throttledFunc = (...args: Parameters<T>) => {
    if (!waiting) {
      waiting = true;
      setTimeout(() => {
        waiting = false;
        if (toBeExecuted) {
          toBeExecuted = false;
          throttledFunc(...lastArgs);
        }
      }, time);
      func(...args);
    } else {
      toBeExecuted = true;
      lastArgs = args;
    }
  };

  return throttledFunc;
};

export const retrieveFromIterator = <T>(
  iteratorOrIterable: IterableIterator<T>,
  length: number
): Array<T | undefined> => {
  const iterator = iteratorOrIterable[Symbol.iterator]();
  return Array.from({ length }, () => iterator.next().value);
};

export const exist = (...args: any[]): boolean => {
  for (const y of args) {
    if (y === null || y === undefined) return false;
  }
  return true;
};

export const makeMemoized = <T extends (...args: any[]) => any>(func: T) => {
  let lastArgs: Parameters<T>;
  let lastResult: ReturnType<T>;

  return (...args: Parameters<T>): Readonly<ReturnType<T>> => {
    let sameArgs = true;
    for (
      let index = 0;
      index < Math.max(lastArgs?.length, args.length);
      index++
    ) {
      if (lastArgs[index] !== args[index]) {
        sameArgs = false;
        break;
      }
    }

    if (sameArgs) return lastResult;

    lastArgs = args;
    return (lastResult = func(...args));
  };
};

export const makeCached = <T extends (arg: any) => any>(func: T) => {
  let results: Map<Parameters<T>, ReturnType<T>> = new Map();

  return ((arg: Parameters<T>[0]) => {
    const possibleResult = results.get(arg);

    if (possibleResult) return possibleResult;

    const newResult = func(arg);
    results.set(arg, newResult);
    return newResult;
  }) as T;
};
