import fs from "fs-extra";
import { solve } from "./day01/solve";
import { getSourceFolderPath } from "./utilities";

((f, rawData) => f(rawData))(
  solve,
  fs
    .readFileSync([getSourceFolderPath("day01"), "input.txt"].join("/"))
    .toString()
);
