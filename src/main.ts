import fs from "fs-extra";
import { solve } from "./day01/solve";
import { getSourceFolderPath } from "./utilities";

((rawData, f) => f(rawData))(
  fs
    .readFileSync([getSourceFolderPath("day01"), "input.txt"].join("/"))
    .toString(),
  solve
);
