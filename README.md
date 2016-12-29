ionic-iris-playback-example
---------------------------

[Ionic](https://ionicframework.com/)-based example of how the
[Iris Platform web player](https://irisplatform.io/docs/playback/web-player/)
can be used in a hybrid app.

This repo uses Docker to manage its dependencies
(Node.js, Ionic, Cordova, Android SDK...).
To be able to use the instructions below verbatim, make sure to
[install Docker](https://www.docker.com/products/docker) first.


## Browser-based testing

```
./docker-run.sh ionic serve
```
then open http://localhost:7816 in a browser


## Building mobile apps

After checkout, fetch Cordova projects and plugins with:
```
./docker-run.sh ionic state restore
```

#### Building for Android

The Docker container includes the Android SDK, so the following works out-of-the-box
```
./docker-run.sh ionic build android
```
The resulting `.apk` can be found in `./example/platforms/android/build/outputs/apk/`.

Note that rebuilding the Docker image results in a new signing key. If you installed
the `.apk` with a previous key, reinstallation will fail. Workaround: uninstall
the app when switching keys. Solution: add key management to Docker image.


#### Building for iOS

The Docker image does not provide a complete iOS build environment, but it can
prepare the `./example/platforms/ios/` directory for use with Xcode:
```
./docker-run.sh npm run prepare:ios
```
...to update `www/`, ´config.xml` etc, then open `./example/platforms/ios/example.xcodeproj`
in XCode and press run, to deploy to the simulator or an attached device.
