import { EMPTY_CHARACTER, NEW_LINE } from "../constants";
import { arrayLength, map, reduce, splice, includes } from "../lib/arrayKit";
import {
  compare,
  compareWithEqual,
  divide,
  isNull,
  minus,
  notNull,
  plus,
  same,
} from "../lib/operatorKit";
import { charCodeAt, slice, split, stringLength } from "../lib/stringKit";
import { getLines, log } from "../utilities";

const CHAR_CODE_SMALL_A = 97;
const CHAR_CODE_CAPITAL_A = 65;
const ALPHABET_QUANTITY = 26;

export const day03 = (rawData: string) => {
  const rucksacks = getLines(rawData);

  // part 1
  const compartmentsPairs = map({
    array: rucksacks,
    mapper: (str) => {
      const dividePosition = divide(stringLength(str), 2);

      return [
        slice({ str, start: 0, end: dividePosition }),
        slice({ str, start: dividePosition }),
      ] as const;
    },
  });

  const sharedItems = map({
    array: compartmentsPairs,
    mapper: (compartmentsPair) => findSharedItemPartOne(compartmentsPair),
  });

  const partOneAnswer = reduce({
    array: sharedItems,
    reducer: (acc, character) =>
      notNull(character)
        ? plus(acc, getPriority(charCodeAt({ str: character, index: 0 })))
        : acc,
    initialValue: 0,
  });

  log(`part 1: ${partOneAnswer}`);

  // part 2
  const { groups: elfGroups } = reduce<
    string,
    {
      groups: string[][];
      currentElvesCount: number;
    }
  >({
    array: rucksacks,
    reducer: ({ groups, currentElvesCount }, elf) =>
      same(arrayLength(groups), 0) && same(currentElvesCount, 0)
        ? {
            groups: [[elf]],
            currentElvesCount,
          }
        : compare({ target: 2, greaterThan: currentElvesCount })
        ? {
            groups: putElfInLastGroup({ groups, elf }),
            currentElvesCount: plus(currentElvesCount, 1),
          }
        : {
            groups: putElfInAsANewGroup({ groups, elf }),
            currentElvesCount: 0,
          },
    initialValue: { groups: [], currentElvesCount: 0 },
  });

  const sharedItemsPartTwo = map<[string, string, string], string>({
    array: elfGroups as [string, string, string][],
    mapper: (elfGroup) => findSharedItemPartTwo(elfGroup),
  });

  const partTwoAnswer = reduce({
    array: sharedItemsPartTwo,
    reducer: (acc, character) =>
      notNull(character)
        ? plus(acc, getPriority(charCodeAt({ str: character, index: 0 })))
        : acc,
    initialValue: 0,
  });

  log(`part 2: ${partTwoAnswer}`);
};

const putElfInLastGroup = ({
  groups,
  elf,
}: {
  groups: string[][];
  elf: string;
}) => [
  ...splice({
    array: groups,
    startAt: 0,
    deleteCount: minus(arrayLength(groups), 1),
  }),
  [...groups[minus(arrayLength(groups), 1)], elf],
];

const putElfInAsANewGroup = ({
  groups,
  elf,
}: {
  groups: string[][];
  elf: string;
}) => [...groups, [elf]];

const findSharedItemPartTwo = ([firstElf, secondElf, thirdElf]: Readonly<
  [string, string, string]
>) => {
  const firstItems = split({ str: firstElf, separator: EMPTY_CHARACTER });
  const secondItems = split({ str: secondElf, separator: EMPTY_CHARACTER });
  const thirdItems = split({ str: thirdElf, separator: EMPTY_CHARACTER });

  const twoElvesSharedItems = findAllSharedItems({
    leftItems: firstItems,
    rightItems: secondItems,
  });

  const sharedItems = findAllSharedItems({
    leftItems: twoElvesSharedItems,
    rightItems: thirdItems,
  });

  return [...new Set(sharedItems)][0];
};

const findAllSharedItems = ({
  leftItems,
  rightItems,
}: {
  leftItems: string[];
  rightItems: string[];
}) =>
  reduce<string, string[]>({
    array: leftItems,
    reducer: (acc, item) =>
      includes({ array: rightItems, item }) ? [...acc, item] : acc,
    initialValue: [],
  });

const findSharedItemPartOne = ([leftHandSide, rightHandSide]: Readonly<
  [string, string]
>) => {
  const leftItems = split({ str: leftHandSide, separator: EMPTY_CHARACTER });
  const rightItems = split({ str: rightHandSide, separator: EMPTY_CHARACTER });

  return reduce<string, string | null>({
    array: leftItems,
    reducer: (acc, item) =>
      isNull(acc) ? (includes({ array: rightItems, item }) ? item : null) : acc,
    initialValue: null,
  });
};

const getPriority = (charCode: number) =>
  compareWithEqual({ target: charCode, greaterThanOrEqual: CHAR_CODE_SMALL_A })
    ? smallLetterCompensator(charCode)
    : capitalLetterCompensator(charCode);

const smallLetterCompensator = (charCode: number) =>
  minus(charCode, minus(CHAR_CODE_SMALL_A, 1));

const capitalLetterCompensator = (charCode: number) =>
  plus(minus(charCode, minus(CHAR_CODE_CAPITAL_A, 1)), ALPHABET_QUANTITY);
