const fs = require('pn/fs');
const map = require('lodash.map');
const path = require('path');
const processImage = require('../process-image');
const writeSafe = require('../write-safe');
const template = require('lodash.template');


module.exports = ({ projectRoot, log, source, backgroundColor, settings, pathTemplateValues }) =>
  Promise.all(map(settings, ({ width, height, transparent }, outputPath) => {
    const fullPath = path.join(projectRoot, template(outputPath)(pathTemplateValues));
    const bgColor = !transparent && backgroundColor;
    log('verbose', `Generating ${fullPath}`);
    return fs.readFile(source)
      .then(sourceBuffer => processImage(sourceBuffer, { width, height, bgColor }))
      .then(buffer => writeSafe(fullPath, buffer));
  }));
