# generate-cordova-assets

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

> Automatically generate assets for a Cordova based project.

This provides a Cordova hook which can automatically generate icons and splash screens from a single source.


## Installation

```sh
npm install generate-cordova-assets --save
```


## Usage

### Cordova Hook

This project comes with a Cordova hook that generates pixel perfect icons and splash screens from one icon.

This is best put in the `after_prepare` [hook](hooks). This means that the hook will overwrite images **after** Cordova has copied its default images.

For more info, see the Cordova documentation about [icons](icons) and [splash screens](splashscreens).


#### Preference configuration options

| Name                | Description
|---------------------|-------------
| IconSource          | The source icon to read.
| IconBackgroundColor | The color to use to fill the color for images that may not be transparent.


#### Example

Add the following configurations to the *config.xml* file in your Cordova project:

```xml
<preference name="IconSource" value="www/icon.svg"/>
<preference name="IconBackgroundColor" value="#eeeeee"/>

<hook type="after_prepare" src="node_modules/generate-cordova-assets/generate-cordova-assets.js"/>
```


### CLI Tool

The CLI tool may be used to convert an icon to an output icon of a given width, height and background color. This may be useful to create assets for uploading to Google Play or the App Store.

For options, run:

```
./node_modules/.bin/process-icon --help
```


### NodeJS

The NodeJS API may be used. However, it is not the main API and it is not guaranteed to stay the same in the forseeable future.


## FAQ

###### Why not any of the other hooks on npm?

The other hooks I found don't support SVG or splash screens or require extra configurations.

###### Why are legacy launch images used for iOS?

There are two methods of defining splash images [docs](splashscreens-ios).

1. Legacy launch images.
2. Launch storyboard images.

Cordova defaults to the legacy launch images, when nothing is specified in *config.xml*.


[npm-image]: https://img.shields.io/npm/v/generate-cordova-assets.svg
[npm-url]: https://www.npmjs.com/package/generate-cordova-assets
[travis-image]: https://img.shields.io/travis/remcohaszing/generate-cordova-assets.svg
[travis-url]: https://travis-ci.org/remcohaszing/generate-cordova-assets
[downloads-image]: https://img.shields.io/npm/dm/generate-cordova-assets.svg
[downloads-url]: https://www.npmjs.com/package/generate-cordova-assets

[icons]: http://cordova.apache.org/docs/en/latest/config_ref/images.html
[hooks]: http://cordova.apache.org/docs/en/latest/guide/appdev/hooks/index.html
[splashscreens]: cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/index.html
[splashscreens-ios]: http://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/index.html#ios-specific-information
