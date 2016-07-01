/**
 * This PhantomJS script renders Cordova icons for the passed configurations.
 */
'use strict';

/* eslint-env browser, phantomjs */
/* eslint-disable no-console */

var system = require('system');
var webpage = require('webpage');

var async = require('async');


if (system.args.length !== 3) {
  console.log('Configurations not specified');
  phantom.exit(1);
} else {
  convert(system.args[1], JSON.parse(system.args[2]));
}


function convert(imgSrc, images) {
  var page = webpage.create();

  page.open(imgSrc, function(status) {
    if (status !== 'success') {
      console.log('Unable to load', imgSrc);
      return phantom.exit(1);
    }
    async.eachSeries(images, render, phantom.exit);
  });

  function render(config, callback) {
    page.evaluate(function(backgroundColor) {
      document.rootElement.style.backgroundColor = backgroundColor;
    }, config.backgroundColor);
    page.viewportSize = {
      width: config.width,
      height: config.height
    };
    setTimeout(function() {
      page.render(config.src, {format: 'png'});
      console.log('Written', config.src);
      callback();
    }, 0);
  }
}
