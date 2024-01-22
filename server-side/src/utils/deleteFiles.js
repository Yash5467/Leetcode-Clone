import fs from "fs";
import path from "path";

export const deleteFilesInDirectory=(directoryPath) =>{
  const absolutePath = path.resolve(directoryPath);

  fs.readdirSync(absolutePath).forEach((file) => {
    const filePath = path.join(absolutePath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      fs.unlinkSync(filePath); // Delete file
    } else if (stat.isDirectory()) {
      deleteFilesInDirectory(filePath); // Recursively delete files in subdirectory
      fs.rmdirSync(filePath); // Delete subdirectory
    }
  });

  // After deleting all files and subdirectories, delete the main directory
  fs.rmdirSync(absolutePath);
}