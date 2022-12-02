import fs from "fs-extra";
import arg from "arg";
import solves from "./solves";
import { join } from "./lib/arrayKit";
import { getSourceFolderPath } from "./utilities";

const args = arg({
  "--exec": String,
});

(() => {
  if (args["--exec"] === undefined)
    throw new Error("--exec required(ex: yarn start --exec day01)");

  const dayToExecute = args["--exec"] as keyof typeof solves;
  if (!solves[dayToExecute]) throw new Error("invalid --exec (ex: day01)");

  const rawData = fs
    .readFileSync(
      join({
        array: [getSourceFolderPath(dayToExecute), "input.txt"],
        separator: "/",
      })
    )
    .toString();

  solves[dayToExecute](rawData);
})();
