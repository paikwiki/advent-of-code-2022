import { NEW_LINE } from "../constants";
import { map, reduce, sort, splice } from "../lib/arrayKit";
import { split } from "../lib/stringKit";
import { log } from "../utilities";

export const solve = (rawData: string) => {
  const sortedElfCalories = sort(
    map(split(rawData, NEW_LINE + NEW_LINE), (elf) =>
      reduce(split(elf, NEW_LINE), eachElfTotalCalorieCalculator, 0)
    ),
    descSortFunc
  );

  const partOneAnswer = sortedElfCalories[0];
  log(`part one: ${partOneAnswer}`);

  const partTwoAnswer = reduce(
    splice(sortedElfCalories, 0, 3),
    (acc, curr) => acc + curr,
    0
  );
  log(`part two: ${partTwoAnswer}`);
};

const descSortFunc = (a: number, b: number) => b - a;
const eachElfTotalCalorieCalculator = (acc: number, curr: string) =>
  acc + parseInt(curr);
