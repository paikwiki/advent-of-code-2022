import fs from "fs-extra";
import { NEW_LINE_CHARACTER } from "../constants";
import { getSourceFolderPath } from "../utilities";

export const solve = () => {
  const elves = fs
    .readFileSync([getSourceFolderPath("day01"), "input.txt"].join("/"))
    .toString()
    .split(NEW_LINE_CHARACTER + NEW_LINE_CHARACTER);

  const elfCalories = elves.map((elf) =>
    elf
      .split(NEW_LINE_CHARACTER)
      .reduce((acc: number, curr: string) => acc + parseInt(curr), 0)
  );
  const partOneAnswer = elfCalories.reduce(
    (acc, curr) => (curr > acc ? curr : acc),
    0
  );
  console.log(`part one: ${partOneAnswer}`);

  const partTwoAnswer = [...elfCalories]
    .sort((a: number, b: number) => b - a)
    .splice(0, 3)
    .reduce((acc, curr) => acc + curr, 0);

  console.log(`part two: ${partTwoAnswer}`);
};
