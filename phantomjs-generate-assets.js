/**
 * This PhantomJS script renders Cordova icons for the passed configurations.
 */

/* eslint-env
  es6:false,
  browser,
  phantomjs
*/
/* eslint-disable
  no-var,
  prefer-arrow-callback,
  strict
*/

'use strict';

/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
var system = require('system');
var webpage = require('webpage');
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

var async = require('async');


function convert(imgSrc, images) {
  var page = webpage.create();

  function render(config, callback) {
    page.evaluate(function setBackgroundColor(backgroundColor) {
      document.rootElement.style.backgroundColor = backgroundColor;
    }, config.backgroundColor);
    page.viewportSize = {
      width: config.width,
      height: config.height,
    };
    setTimeout(function renderAsync() {
      page.render(config.src, { format: 'png' });
      console.log('Written', config.src);
      callback();
    }, 0);
  }

  page.open(imgSrc, function onOpen(status) {
    if (status !== 'success') {
      console.log('Unable to load', imgSrc);
      phantom.exit(1);
      return;
    }
    async.eachSeries(images, render, phantom.exit);
  });
}


if (system.args.length !== 3) {
  console.log('Configurations not specified');
  phantom.exit(1);
} else {
  convert(system.args[1], JSON.parse(system.args[2]));
}
