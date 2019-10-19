'use strict';

const fileSystem = require('fs');
const path = require('path');

const deleteFile = (currentPath) => {
  fileSystem.unlinkSync(currentPath);
};

const removeAllSubDirectoriesAndFiles = (pathToDelete) => {
  fileSystem.readdirSync(pathToDelete).forEach((fileToDelete) => {
    const currentPath = path.resolve(pathToDelete, fileToDelete);

    if (fileSystem.lstatSync(currentPath).isDirectory()) {
      removeAllSubDirectoriesAndFiles(currentPath);
    } else {
      deleteFile(currentPath);
    }
  });

  fileSystem.rmdirSync(pathToDelete);
};

const deleteFolderRecursively = (pathToDelete) => {
  if (!fileSystem.existsSync(pathToDelete)) {
    // eslint-disable-next-line no-console
    console.log(`WARNING: Attempted to delete a nonexistent directory ${pathToDelete}`);
    return;
  }

  if (!pathToDelete.startsWith('./')) {
    // eslint-disable-next-line no-console
    console.log(`WARNING: Attempted to delete ${pathToDelete}, but was not relative to the project. Skipping.`);
    return;
  }

  removeAllSubDirectoriesAndFiles(pathToDelete);
};

module.exports = deleteFolderRecursively;
