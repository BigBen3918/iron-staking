export function toPair<T>(x: Record<string, T>) {
  return Object.keys(x).map((key) => ({
    key,
    value: x[key],
  }));
}

export const zipWith = <T, K>(
  keys: string[],
  value: T[],
  mapper: (t: T) => K,
): Record<string, K> => {
  if (!keys || !value || keys.length !== value.length) {
    throw 'length mismatch';
  }

  return keys.reduce((memo, key, index) => {
    return {
      ...memo,
      [key]: mapper(value[index]),
    };
  }, {});
};
