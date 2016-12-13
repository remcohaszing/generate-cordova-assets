const jimp = require('jimp');
const svg2png = require('svg2png');
const tinycolor = require('tinycolor2');


module.exports = function processImage(sourceBuffer, { width, height, bgColor }) {
  return svg2png(sourceBuffer, { width, height })
    .then((pngBuffer) => {
      if (!bgColor) {
        return pngBuffer;
      }
      return jimp.read(pngBuffer)
        .then(image => new Promise((resolve, reject) => {
          const rgb = tinycolor(bgColor).toRgb();
          image
            .background(jimp.rgbaToInt(rgb.r, rgb.g, rgb.b, 0xFF))
            .rgba(false)
            .getBuffer(jimp.MIME_PNG, (err, buffer) => {
              if (err) {
                reject(err);
              } else {
                resolve(buffer);
              }
            });
        }));
    });
};
