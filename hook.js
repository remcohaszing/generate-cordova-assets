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
const platforms = require('./lib/platforms');
const generate = require('./lib/hook/generate');


module.exports = (context) => {
  const {
    ConfigParser,
    events
  } = context.requireCordovaModule('cordova-common');
  const log = events.emit.bind(events);
  const { cordova, projectRoot } = context.opts;

  const config = new ConfigParser(path.resolve(projectRoot, 'config.xml'));

  const backgroundColor = config.getPreference('IconBackgroundColor') || 'white';
  const iconSource = path.resolve(projectRoot, config.getPreference('IconSource'));

  const pathTemplateValues = {
    name: config.name()
  };

  return Promise.all(cordova.platforms.map((platform) => {
    if (!(platform in platforms)) {
      log('warn', 'Skipping generation of icons and splash screens.');
      return null;
    }
    log('info', `Generating icons and splash screens for platform ${platform}`);
    const { icons, splashScreens } = platforms[platform];
    return Promise.all([
      generate({
        projectRoot,
        log,
        source: iconSource,
        backgroundColor,
        platform,
        settings: icons,
        pathTemplateValues
      }),
      generate({
        projectRoot,
        log,
        source: iconSource,
        backgroundColor,
        platform,
        settings: splashScreens,
        pathTemplateValues
      })
    ]);
  }));
};
