<div>
  <br/><br />
  <p align="center">
    <a href="https://bambuser.com" target="_blank" align="center">
        <img src="https://bambuser.com/wp-content/themes/bambuser/assets/images/logos/bambuser-logo-horizontal-black.png" width="280">
    </a>
  </p>
  <br/><br />
</div>

bambuser-exampleplayer-ionic
----------------------------

[Ionic](https://ionicframework.com/)-based example of how the
[Bambuser JavaScript player](https://bambuser.com/docs/playback/web-player/#javascript-player)
can be used in a hybrid app.

Also [check out this article](https://bambuser.com/docs/playback/cordova/),
which goes a bit deeper into what this app does.


### Prerequisites:

This example can either produce a webapp or a native app.

At minimum, ensure Node.js and Ionic CLI are installed locally. Get the latter
by running `npm install -g ionic`.

If you want to build a native app you also need need XCode and / or Android Studio,
depending on whether you are targeting iOS or Android or both. On top of that
you need the Cordova CLI, which can be installed by running `npm install -g cordova`.

If you want to encapsulate the Node.js parts in a Docker container instead of
installing Node.js globally on your machine, run `docker-compose run --service-ports example`
and handle the Node.js based steps in that shell.


### Web based usage


1. Run `npm install` to install project-specific dependencies declared in `package.json`


2. Test the app in a web browser by running `npm run ionic:serve` and
opening http://localhost:8100 in a web browser.



### Native usage

Follow steps 1-2 in the previous section, then:


3. Add Cordova platform-specific project files

   a) Run `ionic cordova platform add android` to generate a Cordova based
   Android Studio project in `./platforms/android`

   AND / OR

   b) Run `ionic cordova platform add ios` to generate a Cordova based
   XCode project in `./platforms/ios/`


4. If you want to try the native player (optional), install [cordova-plugin-bambuser](https://github.com/bambuser/cordova-plugin-bambuser)
with `ionic cordova plugin add cordova-plugin-bambuser@0.9.3`


5. Run `npm run prepare` after each change to the HTML5 parts of your
hybrid app, i.e. the files in `./src/`.

This outputs optimized JavaScript and CSS bundles into `./platforms/*/www/`


6. Build the native app

   a) Open the project in `./platforms/android` with Android Studio to build an
   Android app.

   AND / OR

   b) Open the project in `./platforms/ios` with XCode to build for an iOS device
   (live streaming not supported in the simulator)


### What's next?

Also consider reading the [broadcasting guide](https://bambuser.com/docs/broadcasting/cordova/)
and trying out the Ionic [example broadcasting app](https://github.com/bambuser/bambuser-examplebroadcaster-ionic).
