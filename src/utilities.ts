export const getSourceFolderPath = (folderName: string) =>
  [process.cwd(), "src", folderName].join("/");
