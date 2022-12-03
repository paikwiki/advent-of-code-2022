import { NEW_LINE } from "../constants";
import { filter, map, reduce, splice } from "../lib/arrayKit";
import { charCodeAt, slice, split } from "../lib/stringKit";
import { log } from "../utilities";

const CHAR_CODE_SMALL_A = 97;
const CHAR_CODE_CAPITAL_A = 65;
const ALPHABET_QUANTITY = 26;

export const day03 = (rawData: string) => {
  const rucksacks = filter({
    array: split({ str: rawData, separator: NEW_LINE }),
    condition: (str) => str.length > 0,
  });

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
    mapper: (compartmentsPair) => findSharedItemPartOne(compartmentsPair),
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
      groups.length === 0 && currentElvesCount === 0
        ? {
            groups: [[elf]],
            currentElvesCount: currentElvesCount,
          }
        : currentElvesCount < 2
        ? {
            groups: putElfInLastGroup({ groups, elf }),
            currentElvesCount: currentElvesCount + 1,
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
      character !== null
        ? acc + getPrioty(charCodeAt({ str: character, index: 0 }))
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
    deleteCount: groups.length - 1,
  }),
  [...groups[groups.length - 1], elf],
];

const putElfInAsANewGroup = ({
  groups,
  elf,
}: {
  groups: string[][];
  elf: string;
}) => [...groups, [elf]];

const findSharedItemPartTwo = ([first, second, third]: Readonly<
  [string, string, string]
>) => {
  const firstItems = split({ str: first, separator: "" });
  const secondItems = split({ str: second, separator: "" });
  const thirdItems = split({ str: third, separator: "" });

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
    reducer: (acc, item) => (rightItems.includes(item) ? [...acc, item] : acc),
    initialValue: [],
  });

const findSharedItemPartOne = ([leftHandSide, rightHandSide]: Readonly<
  [string, string]
>) => {
  const leftItems = split({ str: leftHandSide, separator: "" });
  const rightItems = split({ str: rightHandSide, separator: "" });

  return reduce<string, string | null>({
    array: leftItems,
    reducer: (acc, item) =>
      acc === null ? (rightItems.includes(item) ? item : null) : acc,
    initialValue: null,
  });
};

const getPrioty = (charCode: number) =>
  CHAR_CODE_SMALL_A - 1 < charCode
    ? charCode - (CHAR_CODE_SMALL_A - 1)
    : charCode - (CHAR_CODE_CAPITAL_A - 1) + ALPHABET_QUANTITY;
