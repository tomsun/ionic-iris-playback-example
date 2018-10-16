import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';

import { NavController, NavParams, Platform } from 'ionic-angular';

import moment from 'moment';

// Application id generated at https://dashboard.bambuser.com/developer
const APPLICATION_ID:string = 'CHANGEME';

@Component({
  selector: 'page-player-native',
  templateUrl: 'player-native.html'
})
export class NativePlayerPage {
  player: any;
  playerLog = [];
  showCloseButton = false;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public platform: Platform,
    private zone: NgZone) {

    platform.ready().then(() => {
      // Using array syntax workaround, since types are not declared.
      if (window['bambuser'] && window['bambuser']['player']) {
        this.player = window['bambuser']['player'];
        this.player.setApplicationId(APPLICATION_ID);
      } else {
        // Cordova plugin not installed or running in a web browser
      }
    });
  }

  ionViewDidEnter() {
    console.log('starting native player');

    if (APPLICATION_ID.endsWith('NGEME')) {
      new Promise(resolve => setTimeout(resolve, 500)).then(() => {
        // Let page animations to finish before using alert()
        alert('Warning: APPLICATION_ID is not set. Get your application id at https://dashboard.bambuser.com/developer and update pages/player-native/player-native.ts, then rebuild the app.');
      });
      return;
    }

    if (!this.player) {
      new Promise(resolve => setTimeout(resolve, 500)).then(() => {
        // Let page animations to finish before using alert()
        alert('Native player is not ready yet');
      });
      return;
    }

    console.log('Displaying player behind webview');

    // Engage our Ionic CSS background overrides that ensure native player behind webview is visible.
    document.getElementsByTagName('body')[0].classList.add("show-native-player");

    this.player.showPlayerBehindWebView();

    // https://bambuser.com/docs/key-concepts/resource-uri/
    // The resourceUri is used to fetch the broadcast media
    //
    // Either use a broadcast provided by another page in the application
    let resourceUri = this.navParams.get('resourceUri');
    if (!resourceUri) {
      // ...or fall back to using a static resourceUri, for demo purposes
      resourceUri = 'https://cdn.bambuser.net/broadcasts/0b9860dd-359a-67c4-51d9-d87402770319?da_signature_method=HMAC-SHA256&da_id=9e1b1e83-657d-7c83-b8e7-0b782ac9543a&da_timestamp=1482921565&da_static=1&da_ttl=0&da_signature=cacf92c6737bb60beb1ee1320ad85c0ae48b91f9c1fbcb3032f54d5cfedc7afe';

      // normally you would get the resourceUri from the GET /broadcasts API
      // either by directly accessing it from your mobile app, or with your
      // custom backend as mediator.
      // https://bambuser.com/docs/api/get-broadcast-metadata/
    }

    const log = str => {
      // Ensure template is re-rendered even though caller might be an
      // event listener on an emitter outside of Angular's zone.
      // https://angular.io/docs/ts/latest/api/core/index/NgZone-class.html
      this.zone.run(() => {
        this.playerLog.unshift(`${moment().format('hh:mm:ss')} ${str}`);
      });
    }

    // Log all player events as they occur, for debugging purposes
    [
      'broadcastLoaded',
      'stateChange',
    ].map(eventName => this.player.addEventListener(eventName, e => log(eventName + ': ' + JSON.stringify(e))));

    if (this.navParams.get('showCloseButton')) {
      this.showCloseButton = true;
    }

    this.player.loadBroadcast(resourceUri);
  }

  closePlayer() {
    // Relevant only if player is opened as a modal
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    console.log('closing native player');

    // Disengage our Ionic CSS background overrides, to ensure the rest of the app looks ok.
    document.getElementsByTagName('body')[0].classList.remove("show-native-player");

    if (this.player) {
      this.player.hidePlayer();
      this.player.close();
    }
  }
}
