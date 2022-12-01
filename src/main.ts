import fs from "fs-extra";
import { solve } from "./day01/solve";
import { join } from "./lib/arrayKit";
import { getSourceFolderPath } from "./utilities";

const main = ({
  rawData,
  solver,
}: {
  rawData: string;
  solver: (rawData: string) => void;
}) => solver(rawData);

main({
  rawData: fs
    .readFileSync(join([getSourceFolderPath("day01"), "input.txt"], "/"))
    .toString(),
  solver: solve,
});
