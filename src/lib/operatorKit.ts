type NumberOperator = (lhs: number, rhs: number) => number;
export const plus: NumberOperator = (lhs, rhs) => lhs + rhs;
export const minus: NumberOperator = (lhs, rhs) => lhs - rhs;
export const divide: NumberOperator = (lhs, rhs) => lhs / rhs;
export const multiply: NumberOperator = (lhs, rhs) => lhs * rhs;

export const same = <T>(lhs: T, rhs: T) => lhs === rhs;
export const notSame = <T, K extends T>(lhs: T, rhs: K): lhs is Exclude<T, K> =>
  lhs !== rhs;
export const notNull = <T>(item: T): item is Exclude<T, null> => item !== null;

export const compare = <T>({
  target,
  greaterThan,
}: {
  target: T;
  greaterThan: T;
}) => target > greaterThan;

export const compareWithEqual = <T>({
  target,
  greaterThanOrEqual,
}: {
  target: T;
  greaterThanOrEqual: T;
}) => target >= greaterThanOrEqual;
