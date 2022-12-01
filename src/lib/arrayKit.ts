type Map = <T, K>(param: { array: T[]; mapper: (item: T) => K }) => K[];
export const map: Map = <T, K>({
  array,
  mapper,
}: {
  array: T[];
  mapper: (item: T) => K;
}) => array.map(mapper);

type Reduce = <T, K>(param: {
  array: T[];
  reducer: (acc: K, curr: T) => K;
  initialValue: K;
}) => K;
export const reduce: Reduce = <T, K>({
  array,
  reducer,
  initialValue,
}: {
  array: T[];
  reducer: (acc: K, curr: T) => K;
  initialValue: K;
}) => array.reduce(reducer, initialValue);

type Splice = <T>(param: {
  array: T[];
  startAt: number;
  deleteCount?: number;
}) => T[];
export const splice: Splice = <T>({
  array,
  startAt,
  deleteCount,
}: {
  array: T[];
  startAt: number;
  deleteCount?: number;
}) => [...array].splice(startAt, deleteCount);

type Sort = <T>(param: { array: T[]; sorter: (a: T, b: T) => number }) => T[];
export const sort: Sort = <T>({
  array,
  sorter,
}: {
  array: T[];
  sorter: (a: T, b: T) => number;
}) => [...array].sort(sorter);
