const isSvg = require('is-svg');
const jimp = require('jimp');
const svg2png = require('svg2png');
const tinycolor = require('tinycolor2');


module.exports = function processImage(sourceBuffer, { width, height, bgColor }) {
  function processBackgroundColor(image) {
    if (bgColor) {
      const rgb = tinycolor(bgColor).toRgb();
      image
        .background(jimp.rgbaToInt(rgb.r, rgb.g, rgb.b, 0xFF))
        .rgba(false);
    }
    return new Promise((resolve, reject) => {
      image.getBuffer(jimp.MIME_PNG, (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });
  }

  if (isSvg(sourceBuffer)) {
    return svg2png(sourceBuffer, { width, height })
      .then((pngBuffer) => {
        if (!bgColor) {
          return pngBuffer;
        }
        return jimp.read(pngBuffer).then(processBackgroundColor);
      });
  }
  return jimp.read(sourceBuffer)
    .then(image => image.contain(width, height))
    .then(processBackgroundColor);
};
