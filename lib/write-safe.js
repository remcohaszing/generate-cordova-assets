const path = require('path');

const fs = require('pn/fs');
const mkdirp = require('mkdirp-then');


module.exports = function writeSafe(location, buffer) {
  return mkdirp(path.dirname(location))
    .then(() => fs.writeFile(location, buffer));
};
