/**
 * Icon sizes are taken from https://github.com/phonegap/phonegap/wiki/App-Icon-Sizes#android.
 */
const icons = {
  ldpi: 36,
  mdpi: 48,
  hdpi: 72,
  xhdpi: 96,
  xxhdpi: 144,
  xxxhdpi: 192
};


/**
 * Splash screen sizes are taken from https://github.com/phonegap/phonegap/wiki/App-Splash-Screen-Sizes#android.
 */
const splashScreens = {
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


module.exports = {
  icons,
  splashScreens
};
