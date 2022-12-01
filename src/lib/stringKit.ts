type Split = (param: { str: string; separator: string }) => string[];
export const split: Split = ({ str, separator }) => str.split(separator);
