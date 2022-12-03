import { NEW_LINE } from "../constants";
import { map, reduce } from "../lib/arrayKit";
import { charCodeAt, slice, split } from "../lib/stringKit";
import { log } from "../utilities";

const CHAR_CODE_SMALL_A = 97;
const CHAR_CODE_CAPITAL_A = 65;
const ALPHABET_QUANTITY = 26;

export const day03 = (rawData: string) => {
  const rucksacks = split({ str: rawData, separator: NEW_LINE });

  // part 1
  const compartmentsPairs = map({
    array: rucksacks,
    mapper: (str) => {
      const dividePosition = str.length / 2;

      return [
        slice({ str, start: 0, end: dividePosition }),
        slice({ str, start: dividePosition }),
      ] as const;
    },
  });

  const sharedItems = map({
    array: compartmentsPairs,
    mapper: (compartmentsPair) => findSharedItem(compartmentsPair),
  });
  const partOneAnswer = reduce({
    array: sharedItems,
    reducer: (acc, character) =>
      character !== null
        ? acc + getPrioty(charCodeAt({ str: character, index: 0 }))
        : acc,
    initialValue: 0,
  });

  log(`part 1: ${partOneAnswer}`);
};

const findSharedItem = ([leftHandSide, rightHandSide]: Readonly<
  [string, string]
>) => {
  const left = split({ str: leftHandSide, separator: "" });
  const right = split({ str: rightHandSide, separator: "" });

  return reduce<string, string | null>({
    array: left,
    reducer: (acc, item) =>
      acc === null ? (right.includes(item) ? item : null) : acc,
    initialValue: null,
  });
};

const getPrioty = (charCode: number) =>
  CHAR_CODE_SMALL_A - 1 < charCode
    ? charCode - CHAR_CODE_SMALL_A - 1
    : charCode - CHAR_CODE_CAPITAL_A - 1 + ALPHABET_QUANTITY;
