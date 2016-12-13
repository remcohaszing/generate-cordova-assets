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
const processImage = require('./lib/process-image');
const transparentIcons = require('./lib/transparent-icons');
const util = require('./lib/util');
const writeSafe = require('./lib/write-safe');


module.exports = (context) => {
  const ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser;

  const config = new ConfigParser(path.resolve(context.opts.projectRoot, 'config.xml'));

  const backgroundColor = config.getPreference('IconBackgroundColor') || 'white';
  const iconSource = config.getPreference('IconSource');

  const images = [];
  context.opts.cordova.platforms.forEach((platform) => {
    images.push(...config.getIcons(platform)
        .map(icon => util.processIconDensity(icon))
        .map((icon) => {
          if (transparentIcons.indexOf(platform) !== -1) {
            return icon;
          }
          return util.setBackground(icon, backgroundColor);
        }));
    images.push(...config.getSplashScreens(platform)
        .map(splashScreen => util.processSplashScreenDensity(splashScreen))
        .map(splashScreen => util.setBackground(splashScreen, backgroundColor)));
  });
  console.log(`Generating ${images.length} images...`);
  return Promise.all(images.map(({ width, height, src, bgColor }) =>
    fs.readFile(iconSource)
      .then(sourceBuffer => processImage(sourceBuffer, { width, height, bgColor })
      .then(buffer => writeSafe(src, buffer))
  )));
};
