const sizes = require('./sizes');


module.exports = {
  /**
   * Convert an icon definining a density to an object containing a width and height.
   */
  processIconDensity(icon) {
    if (!icon.density) {
      return icon;
    }
    const size = sizes.icons[icon.density];
    return {
      width: size,
      height: size,
      src: icon.src
    };
  },


  /**
   * Convert a splash screen definining a density to an object containing a width and height.
   */
  processSplashScreenDensity(splashScreen) {
    if (!splashScreen.density) {
      return splashScreen;
    }
    const match = splashScreen.density.match(/^(?:(land|port)(?=-)|)-?((?:l|m|(?:x{0,3})h)dpi)$/);
    const orientation = match[1] || 'port';
    const density = match[2];
    const size = sizes.splashScreens[density];
    if (orientation === 'land') {
      // Dimensions are defined for portrait views. Width and height are swapped for landscape.
      return Object.assign({}, splashScreen, { width: size.height, height: size.width });
    }
    return Object.assign({}, splashScreen, size);
  },


  /**
   * Set the background color of an object defining an image.
   */
  setBackground(image, bgColor) {
    return Object.assign({ bgColor }, image);
  }
};
