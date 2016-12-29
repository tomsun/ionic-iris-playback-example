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
