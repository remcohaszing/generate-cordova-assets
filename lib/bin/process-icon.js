#!/usr/bin/env node
const fs = require('pn/fs');
const processImage = require('../process-image');
const writeSafe = require('../write-safe');
const yargs = require('yargs');


const { argv } = yargs
  .usage('Convert an icon to an icon with given dimensions.')
  .option('width', {
    alias: 'w',
    desc: 'The width of the output image.',
    type: 'number'
  })
  .option('height', {
    alias: 'h',
    desc: 'The height of the output image.',
    type: 'number'
  })
  .option('bg-color', {
    desc: 'The color to use to fill a transparent background. If not specified, the output will keep its transparency.',
    type: 'string'
  })
  .option('input', {
    alias: 'i',
    desc: 'The path to the icon to convert.',
    required: true,
    normalize: true
  })
  .option('output', {
    alias: 'o',
    desc: 'The output path of the resulting icon.',
    required: true,
    normalize: true
  })
  .help()
  .alias('help', 'h');


fs.readFile(argv.input)
  .then(sourceBuffer => processImage(sourceBuffer, argv))
  .then(buffer => writeSafe(argv.output, buffer));
