export const getSourceFolderPath = (folderName: string) =>
  [process.cwd(), "src", folderName].join("/");

export const log = (logMessage: unknown, logger = console.log) =>
  logger(logMessage);
