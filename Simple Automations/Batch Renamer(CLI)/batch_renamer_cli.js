// npm install argparse
const fs = require('fs');
const path = require('path');
const { ArgumentParser } = require('argparse');

const parser = new ArgumentParser({ description: 'Batch rename files in directory' }); parser.add_argument('search', { type: 'str', help: 'To be replaced text' }); parser.add_argument('replace', { type: 'str', help: 'Text to use for replacement' }); parser.add_argument('--filetype', {
  type: 'str',
  default: null,
  help: 'Only files with the given type will be renamed (e.g. .txt)',
});
parser.add_argument('--path', {
  type: 'str',
  default: '.',
  help: 'Directory path that contains the to be renamed files',
});

const args = parser.parse_args();
console.log(args);

// rename path to dirPath because of naming conflict with the path library
const { filetype, search, replace, path: dirPath } = args;

// filter the current directory for files
const dir = fs.readdirSync(dirPath);
const files = dir.filter(f => fs.statSync(f).isFile());

console.log(`${files.length} of ${dir.length} elements are files.`);

let renamed = 0;

for (const doc of files) {
  const file = path.parse(doc);

  // skip not matching file types
  if (filetype != null && file.ext != filetype) continue;
  // skip not matching file names
  if (!file.name.includes(search)) continue;

  // rename the actual file
  fs.renameSync(doc, doc.replace(search, replace));
  renamed++;
}

console.log(`renamed ${renamed} of ${files.length} files.`);