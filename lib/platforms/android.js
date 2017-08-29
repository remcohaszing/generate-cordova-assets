/**
 * https://cordova.apache.org/docs/en/latest/config_ref/images.html#android
 */
const icons = {
  'res/mipmap-ldpi/icon.png': {
    transparent: true,
    width: 36,
    height: 36
  },
  'res/mipmap-mdpi/icon.png': {
    transparent: true,
    width: 48,
    height: 48
  },
  'res/mipmap-hdpi/icon.png': {
    transparent: true,
    width: 72,
    height: 72
  },
  'res/mipmap-xhdpi/icon.png': {
    transparent: true,
    width: 96,
    height: 96
  },
  'res/mipmap-xxhdpi/icon.png': {
    transparent: true,
    width: 144,
    height: 144
  },
  'res/mipmap-xxxhdpi/icon.png': {
    transparent: true,
    width: 192,
    height: 192
  }
};


/**
 * https://github.com/phonegap/phonegap/wiki/App-Splash-Screen-Sizes#android.
 */
const splashScreens = {
  'res/drawable-land-ldpi/screen.png': {
    width: 320,
    height: 200
  },
  'res/drawable-land-mdpi/screen.png': {
    width: 480,
    height: 320
  },
  'res/drawable-land-hdpi/screen.png': {
    width: 800,
    height: 480
  },
  'res/drawable-land-xhdpi/screen.png': {
    width: 1280,
    height: 720
  },
  'res/drawable-land-xxhdpi/screen.png': {
    width: 1600,
    height: 960
  },
  'res/drawable-land-xxxhdpi/screen.png': {
    width: 1920,
    height: 1280
  },
  'res/drawable-port-ldpi/screen.png': {
    width: 200,
    height: 320
  },
  'res/drawable-port-mdpi/screen.png': {
    width: 320,
    height: 480
  },
  'res/drawable-port-hdpi/screen.png': {
    width: 480,
    height: 800
  },
  'res/drawable-port-xhdpi/screen.png': {
    width: 720,
    height: 1280
  },
  'res/drawable-port-xxhdpi/screen.png': {
    width: 960,
    height: 1600
  },
  'res/drawable-port-xxxhdpi/screen.png': {
    width: 1280,
    height: 1920
  }
};


module.exports = {
  icons,
  splashScreens
};
