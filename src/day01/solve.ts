import { NEW_LINE } from "../constants";
import { map, reduce, sort, splice } from "../lib/arrayKit";
import { split } from "../lib/stringKit";
import { log } from "../utilities";

export const solve = (rawData: string) => {
  const elves = split({ str: rawData, separator: NEW_LINE + NEW_LINE });
  const elfCalories = map({
    array: elves,
    mapper: elfTotalCalorieCalculator,
  });
  const sortedElfCalories = sort({
    array: elfCalories,
    sorter: descSortFunc,
  });

  // part 1
  const partOneAnswer = sortedElfCalories[0];
  log(`part one: ${partOneAnswer}`);

  // part 2
  const top3Elves = splice({
    array: sortedElfCalories,
    startAt: 0,
    deleteCount: 3,
  });

  const partTwoAnswer = reduce({
    array: top3Elves,
    reducer: totalCalculatorReducer,
    initialValue: 0,
  });

  log(`part two: ${partTwoAnswer}`);
};

const totalCalculatorReducer = (acc: number, curr: number) => acc + curr;

const elfTotalCalorieCalculator = (elf: string) =>
  reduce({
    array: split({ str: elf, separator: NEW_LINE }),
    reducer: eachElfTotalCalorieReducer,
    initialValue: 0,
  });

const eachElfTotalCalorieReducer = (acc: number, curr: string) =>
  acc + parseInt(curr);

const descSortFunc = (a: number, b: number) => b - a;
