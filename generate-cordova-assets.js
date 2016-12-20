#!/usr/bin/env node
/**
 * This script generates icons and splash screens from a single source.
 *
 * This script uses PhantomJS to render the source file, so anything renderable by PhantomJS can be
 * used.
 *
 * @hook before_prepare
 *
 * @preference {string} IconSource Path to the source file to render.
 * @preference {string} [IconBackgroundColor=white] Color to use to fill the background for images
 *   which don't support transparency.
 */


const path = require('path');

const fs = require('pn/fs');
const map = require('lodash.map');
const platforms = require('./lib/platforms');
const processImage = require('./lib/process-image');
const writeSafe = require('./lib/write-safe');
const template = require('lodash.template');


module.exports = (context) => {
  const {
    ConfigParser,
    events
  } = context.requireCordovaModule('cordova-common');

  const config = new ConfigParser(path.resolve(context.opts.projectRoot, 'config.xml'));

  const backgroundColor = config.getPreference('IconBackgroundColor') || 'white';
  const iconSource = config.getPreference('IconSource');

  const templateValues = {
    name: config.name()
  };

  return Promise.all(context.opts.cordova.platforms.map((platform) => {
    if (!(platform in platforms)) {
      events.emit('warn', 'Skipping generation of icons and splash screens.');
      return null;
    }
    events.emit('info', `Generating icons and splash screens for platform ${platform}`);
    return Promise.all([
      Promise.all(map(platforms[platform].icons,
        ({ width, height, transparent }, outputPath) => {
          const fullPath = path.join('platforms', platform, template(outputPath)(templateValues));
          const bgColor = !transparent && backgroundColor;
          events.emit('verbose', `Generating ${fullPath}`);
          return fs.readFile(iconSource)
            .then(sourceBuffer => processImage(sourceBuffer, { width, height, bgColor }))
            .then(buffer => writeSafe(fullPath, buffer));
        }
      )),
      Promise.all(map(platforms[platform].splashScreens,
        ({ width, height, transparent }, outputPath) => {
          const fullPath = path.join('platforms', platform, template(outputPath)(templateValues));
          const bgColor = !transparent && backgroundColor;
          events.emit('verbose', `Generating ${fullPath}`);
          return fs.readFile(iconSource)
            .then(sourceBuffer => processImage(sourceBuffer, { width, height, bgColor }))
            .then(buffer => writeSafe(fullPath, buffer));
        }
      ))
    ]);
  }));
};
