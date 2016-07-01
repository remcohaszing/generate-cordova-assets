#!/usr/bin/env node
/**
 * This script generates icons and splash screens from a single source.
 *
 * This script uses PhantomJS to render the source file, so anything renderable by PhantomJS can be used.
 *
 * @hook before_prepare
 *
 * @preference {string} IconSource Path to the source file to render.
 * @preference {string} [IconBackgroundColor=white] Color to use to fill the background for images which don't support
 *   transparency.
 */
'use strict';

const path = require('path');

const phantomjs = require('phantomjs-prebuilt');


module.exports = function(context) {
  const ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser;
  const superspawn = context.requireCordovaModule('cordova-common').superspawn;

  let config = new ConfigParser(path.resolve(context.opts.projectRoot, 'config.xml'));

  let backgroundColor = config.getPreference('IconBackgroundColor') || 'white';
  let sourceFile = config.getPreference('IconSource');

  let images = [];
  context.opts.cordova.platforms.forEach(function(platform) {
    Array.prototype.push.apply(
      images,
      config.getIcons(platform)
        .map(iconDensityToSize)
        .map(setIconBackground));
    Array.prototype.push.apply(
      images,
      config.getSplashScreens(platform)
        .map(splashScreenDensityToSize)
        .map(setSplashScreenBackground));
  });
  console.log(`Generating ${images.length} images...`);
  return superspawn.spawn(phantomjs.path, [
    path.resolve(__dirname, 'phantomjs-generate-assets.js'),
    path.resolve(context.opts.projectRoot, sourceFile),
    JSON.stringify(images)
  ], {stdio: 'inherit'});

  function setIconBackground(icon) {
    if (['android'].indexOf(icon.platform) === -1) {
      icon.backgroundColor = backgroundColor;
    } else {
      icon.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
    return icon;
  }

  function setSplashScreenBackground(splashScreen) {
    splashScreen.backgroundColor = backgroundColor;
    return splashScreen;
  }
};


/**
 * Convert splash screen densities into pixel sizes.
 *
 * https://github.com/phonegap/phonegap/wiki/App-Icon-Sizes
 */
function iconDensityToSize(icon) {
  if (icon.density) {
    let size = {
      ldpi: 36,
      mdpi: 48,
      hdpi: 72,
      xhdpi: 96,
      xxhdpi: 144,
      xxxhdpi: 192
    }[icon.density];
    icon.width = size;
    icon.height = size;
  }
  return icon;
}


/**
 * Convert splash screen densities into pixel sizes.
 *
 * https://github.com/phonegap/phonegap/wiki/App-Splash-Screen-Sizes
 */
function splashScreenDensityToSize(splashScreen) {
  if (splashScreen.density) {
    let sizes = {
      ldpi: {
        width: 200,
        height: 320
      },
      mdpi: {
        width: 320,
        height: 480
      },
      hdpi: {
        width: 480,
        height: 800
      },
      xhdpi: {
        width: 720,
        height: 1280
      },
      xxhdpi: {
        width: 960,
        height: 1600
      },
      xxxhdpi: {
        width: 1280,
        height: 1920
      }
    };
    let match = splashScreen.density.match(/^(?:(land|port)(?=-)|)-?((?:l|m|(?:x{0,3})h)dpi)$/);
    let orientation = match[1] || 'port';
    let density = match[2];
    let size = sizes[density];
    switch (orientation) {
      case 'land':
        splashScreen.width = size.height;
        splashScreen.height = size.width;
        break;
      case 'port':
      default:
        splashScreen.width = size.width;
        splashScreen.height = size.height;
    }
  }
  return splashScreen;
}
