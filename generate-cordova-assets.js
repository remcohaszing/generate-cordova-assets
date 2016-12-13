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

const phantomjs = require('phantomjs-prebuilt');

const util = require('./lib/util');
const transparentIcons = require('./lib/transparent-icons');


module.exports = (context) => {
  const ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser;
  const superspawn = context.requireCordovaModule('cordova-common').superspawn;

  const config = new ConfigParser(path.resolve(context.opts.projectRoot, 'config.xml'));

  const backgroundColor = config.getPreference('IconBackgroundColor') || 'white';
  const sourceFile = config.getPreference('IconSource');

  const images = [];
  context.opts.cordova.platforms.forEach((platform) => {
    images.push(...config.getIcons(platform)
        .map(icon => util.processIconDensity(icon))
        .map((icon) => {
          if (transparentIcons.indexOf(platform) === -1) {
            return util.setBackground(icon, backgroundColor);
          }
          return util.setBackground(icon, 'rgba(0, 0, 0, 0)');
        }));
    images.push(...config.getSplashScreens(platform)
        .map(splashScreen => util.processSplashScreenDensity(splashScreen))
        .map(splashScreen => util.setBackground(splashScreen, backgroundColor)));
  });
  console.log(`Generating ${images.length} images...`);
  return superspawn.spawn(phantomjs.path, [
    path.resolve(__dirname, 'phantomjs-generate-assets.js'),
    path.resolve(context.opts.projectRoot, sourceFile),
    JSON.stringify(images),
  ], { stdio: 'inherit' });
};
