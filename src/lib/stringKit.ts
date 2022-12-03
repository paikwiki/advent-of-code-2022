type CharCodeAt = (param: { str: string; index: number }) => number;
export const charCodeAt: CharCodeAt = ({ str, index }) => str.charCodeAt(index);

type Slice = (param: { str: string; start: number; end?: number }) => string;
export const slice: Slice = ({ str, start, end }) => str.slice(start, end);

type Split = (param: { str: string; separator: string }) => string[];
export const split: Split = ({ str, separator }) => str.split(separator);
