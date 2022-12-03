import { NEW_LINE, SLASH } from "./constants";
import { filter, join } from "./lib/arrayKit";
import { compare } from "./lib/operatorKit";
import { split, stringLength } from "./lib/stringKit";

export const getLines = (str: string) =>
  filter({
    array: split({ str, separator: NEW_LINE }),
    condition: (str) => compare({ target: stringLength(str), greaterThan: 0 }),
  });

export const getSourceFolderPath = (folderName: string) =>
  join({ array: [process.cwd(), "src", folderName], separator: SLASH });

export const log = (logMessage: unknown, logger = console.log) =>
  logger(logMessage);
