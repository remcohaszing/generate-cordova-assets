# generate-cordova-assets

> Automatically generate assets for a Cordova based project.

This provides a Cordova hook which can automatically generate icons and splash screens from a single source.


## Installation

```sh
npm install generate-cordova-assets --save
```


## Usage

Add the following configurations to the *config.xml* file in your Cordova project:

```xml
<preference name="IconSource" value="www/icon.svg"/>
<preference name="IconBackgroundColor" value="#eeeeee"/>

<hook type="before_prepare" src="node_modules/generate-cordova-assets/generate-cordova-assets.js"/>

<platform name="android">
  <icon src="res/android/icon-ldpi.png" density="ldpi"/>
  <icon src="res/android/icon-mdpi.png" density="mdpi"/>
  <icon src="res/android/icon-hdpi.png" density="hdpi"/>
  <icon src="res/android/icon-xhdpi.png" density="xhdpi"/>
  <icon src="res/android/icon-xxhdpi.png" density="xxhdpi"/>
  <icon src="res/android/icon-xxxhdpi.png" density="xxxhdpi"/>
</platform>
<platform name="ios">
  <icon src="res/ios/icon-60@3x.png" width="180" height="180"/>
  <icon src="res/ios/icon-60.png" width="60" height="60"/>
  <icon src="res/ios/icon-60@2x.png" width="120" height="120"/>
  <icon src="res/ios/icon-76.png" width="76" height="76"/>
  <icon src="res/ios/icon-76@2x.png" width="152" height="152"/>
  <icon src="res/ios/icon-40.png" width="40" height="40"/>
  <icon src="res/ios/icon-40@2x.png" width="80" height="80"/>
  <icon src="res/ios/icon.png" width="57" height="57"/>
  <icon src="res/ios/icon@2x.png" width="114" height="114"/>
  <icon src="res/ios/icon-72.png" width="72" height="72"/>
  <icon src="res/ios/icon-72@2x.png" width="144" height="144"/>
  <icon src="res/ios/icon-small.png" width="29" height="29"/>
  <icon src="res/ios/icon-small@2x.png" width="58" height="58"/>
  <icon src="res/ios/icon-50.png" width="50" height="50"/>
  <icon src="res/ios/icon-50@2x.png" width="100" height="100"/>
</platform>
```


## Configuration options

### Preferences

| Name                | Description
|---------------------|-------------
| IconSource          | The source icon to read.
| IconBackgroundColor | The color to use to fill the color for images that may not be transparent.

### Hook

This is best put in the `before_prepare` [hook](http://cordova.apache.org/docs/en/latest/guide/appdev/hooks/index.html).

### Icons / Splashscreens

No extra configuration is needed. The hook will automatically detect which icons and splash screens to generate from your *config.xml*. Just specify them normally as specified in the [Cordova documentation](http://cordova.apache.org/docs/en/latest/config_ref/images.html).


## FAQ

###### Why not any of the other hooks on npm?

The other hooks I found don't support SVG or splash screens or require extra configurations.
