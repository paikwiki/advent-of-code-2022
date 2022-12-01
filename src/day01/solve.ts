import fs from "fs-extra";
import { NEW_LINE_CHARACTER } from "../constants";
import { getSourceFolderPath } from "../utilities";

export const solve = () => {
  const elves = fs
    .readFileSync([getSourceFolderPath("day01"), "input.txt"].join("/"))
    .toString()
    .split(NEW_LINE_CHARACTER + NEW_LINE_CHARACTER);

  const answer = elves
    .map((elf) =>
      elf
        .split(NEW_LINE_CHARACTER)
        .reduce((acc: number, curr: string) => acc + parseInt(curr), 0)
    )
    .reduce((acc, curr) => (curr > acc ? curr : acc), 0);

  console.log(answer);
};
