import assert from 'assert';
import fs from 'fs';

// We are given a file/folder path
// 1. check if the path is a file or a folder
// 2. If it is a file, then read its content and may be display it to console.
// 3. If it is a directory, then display the list of files/folders contained by it.

/**
 *
 * @param path path to a file or folder. Absolute path.
 */
function readFileSystemPath(
  path: string,
  callback: (err: Error | null, result: string | string[]) => void
): void {
  // Check if the path represents a file or a directory/folder
  // We shall use the callback based async API pretend that there is no Promise based API to do the same.
  // we need async behavior because we dont want to block the exectution of js runtime thread (JS is single threaded)
  // node has fs module which has API to interact with file system. And it does provide non blocking async API
  // we shall use that.

  // use file.stat API to get the information about the file/folder at path
  // whethere the path represents a file/folder
  fs.stat(path, (err, stats) => {
    // if (err) {
    //   //throw err;
    //   callback(err, '');
    // }
    if (stats.isDirectory()) {
      // get the contents of the directory
      fs.readdir(path, (err, files) => {
        // callback hell! a callback inside another callback
        // if (err) {
        //   callback(err, '');
        // }
        callback(null, files);
      });
    } else if (stats.isFile()) {
      // it must be a file, read its contents
      fs.readFile(path, 'utf8', (err, data) => {
        // if (err) {
        //   callback(err, '');
        // }
        callback(null, data);
      });
    } else {
      return 'Neither a file, nor a directly';
    }
  });
}

const path = '/Users/shripada/Desktop/sample/some.txt';
readFileSystemPath(path, (err, data) => {
  assert.equal(data, 'Welcome to async world\n');
});

// 1. no consistent way to relay back error. Sometimes we might forget to relay back error encountered
// 2. Passing the success value also suffers from same problem. we might totally forget to call the callback
// 3. If we need to sequence operations, we end up with callback nesting - oftern called as callback hell.
