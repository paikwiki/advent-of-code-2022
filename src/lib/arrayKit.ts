type Filter = <T>(param: {
  array: T[];
  condition: (item: T) => boolean;
}) => T[];
export const filter: Filter = <T>({
  array,
  condition,
}: {
  array: T[];
  condition: (item: T) => boolean;
}) => array.filter(condition);

type Includes = <T>(param: { array: T[]; item: T }) => boolean;
export const includes: Includes = <T>({
  array,
  item,
}: {
  array: T[];
  item: T;
}) => array.includes(item);

type Join = (param: { array: string[]; separator?: string }) => string;
export const join: Join = ({ array, separator }) => array.join(separator ?? "");

type ArrayLength = (array: unknown[]) => number;
export const arrayLength: ArrayLength = (array) => array.length;

export const map = <T, K>({
  array,
  mapper,
}: {
  array: T[];
  mapper: (item: T, index?: number) => K;
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
