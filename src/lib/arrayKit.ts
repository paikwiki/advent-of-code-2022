type Map = <T, K>(array: T[], mapper: (item: T) => K) => K[];
export const map: Map = <T, K>(array: T[], mapper: (item: T) => K) =>
  array.map(mapper);

type Reduce = <T, K>(
  array: T[],
  reducer: (acc: K, curr: T) => K,
  initialValue: K
) => K;
export const reduce: Reduce = <T, K>(
  array: T[],
  reducer: (acc: K, curr: T) => K,
  initialValue: K
) => array.reduce(reducer, initialValue);

type Splice = <T>(array: T[], startAt: number, deleteCount?: number) => T[];
export const splice: Splice = <T>(
  array: T[],
  startAt: number,
  deleteCount?: number
) => [...array].splice(startAt, deleteCount);

type Sort = <T>(array: T[], sorter: (a: T, b: T) => number) => T[];
export const sort: Sort = <T>(array: T[], sorter: (a: T, b: T) => number) =>
  [...array].sort(sorter);
