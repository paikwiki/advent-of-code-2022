import { COMMA, DASH } from "../constants";
import { arrayLength, filter, includes, map } from "../lib/arrayKit";
import { compareWithEqual, minus, plus } from "../lib/operatorKit";
import { split } from "../lib/stringKit";
import { createArrayFilledWithNull, getLines, log } from "../utilities";

export const day04 = (rawData: string) => {
  const sectionRangePairs = map({
    array: getLines(rawData),
    mapper: (line) => split({ str: line, separator: COMMA }),
  });

  // part 1
  const fullyContainedPairs = filter({
    array: sectionRangePairs,
    condition: ([firstElf, secondElf]) =>
      isFullyContainedRange({
        firstElfRange: getRange(firstElf) as [number, number],
        secondElfRange: getRange(secondElf) as [number, number],
      }),
  });
  const partOneAnswer = arrayLength(fullyContainedPairs);

  log(`part 1: ${partOneAnswer}`);

  // part 2
  const overlappedPairs = filter({
    array: sectionRangePairs,
    condition: ([firstElf, secondElf]) =>
      isOverlappedRange({
        firstElfRange: getRange(firstElf) as [number, number],
        secondElfRange: getRange(secondElf) as [number, number],
      }),
  });
  const partTwoAnswer = arrayLength(overlappedPairs);

  log(`part 2: ${partTwoAnswer}`);
};

const isOverlappedRange = ({
  firstElfRange,
  secondElfRange,
}: {
  firstElfRange: [number, number];
  secondElfRange: [number, number];
}) =>
  arrayLength(
    filter({
      array: convertRangeToSectionsArray(firstElfRange),
      condition: (item) =>
        includes({ array: convertRangeToSectionsArray(secondElfRange), item }),
    })
  ) > 0;

const convertRangeToSectionsArray = ([firstSectionNumber, lastSectionNumber]: [
  number,
  number
]) =>
  map({
    array: createArrayFilledWithNull(
      plus(minus(lastSectionNumber, firstSectionNumber), 1)
    ),
    mapper: (_, index) => plus(index, firstSectionNumber),
  });

const isFullyContainedRange = ({
  firstElfRange,
  secondElfRange,
}: {
  firstElfRange: [number, number];
  secondElfRange: [number, number];
}) =>
  isLeftRangeFullyContainedRightRange(firstElfRange, secondElfRange) ||
  isLeftRangeFullyContainedRightRange(secondElfRange, firstElfRange);

const isLeftRangeFullyContainedRightRange = (
  [lhsMin, lhsMax]: [number, number],
  [rhsMin, rhsMax]: [number, number]
) =>
  compareWithEqual({ target: rhsMin, greaterThanOrEqual: lhsMin }) &&
  compareWithEqual({ target: lhsMax, greaterThanOrEqual: rhsMax });

const getRange = (firstElf: string) =>
  map({
    array: split({ str: firstElf, separator: DASH }),
    mapper: (str) => parseInt(str),
  });
