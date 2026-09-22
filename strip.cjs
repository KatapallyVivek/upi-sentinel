const fs = require('fs');
const path = require('path');
const decomment = require('decomment');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src', function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    try {
      const code = fs.readFileSync(filePath, 'utf8');
      const withoutComments = decomment(code, {safe: true});
      // decomment can leave empty lines, let's just write it
      fs.writeFileSync(filePath, withoutComments);
      console.log('Removed comments from ' + filePath);
    } catch (e) {
      console.error('Error on ' + filePath, e);
    }
  }
});
