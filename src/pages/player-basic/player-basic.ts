import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-player-basic',
  templateUrl: 'player-basic.html'
})
export class BasicPlayerPage {
  // Bind '<div #player>' in template to this.playerEl
  @ViewChild('player') playerEl: ElementRef;
  playerLog = [];

  constructor(
    private element: ElementRef,
    public navCtrl: NavController,
    private zone: NgZone) {
  }

  ionViewDidEnter() {
    console.log('starting basic player');

    // BambuserPlayer is loaded to window in index.html
    const BambuserPlayer:any = window['BambuserPlayer'];

    // resourceUri received from a custom backend, which either uses
    // the GET /broadcasts API or uses custom signing
    // https://bambuser.com/docs/key-concepts/resource-uri/
    // https://bambuser.com/docs/api/get-broadcast-metadata/
    const resourceUri = 'https://cdn.bambuser.net/broadcasts/3dab4df8-9cb0-21f0-a086-a866b0cd813f?da_signature_method=HMAC-SHA256&da_id=9e1b1e83-657d-7c83-b8e7-0b782ac9543a&da_timestamp=1482921565&da_static=1&da_ttl=0&da_signature=088e4972f5138cbcde1eb1991b505122eebbe47e911e7383ca4278745bc7ace1';

    // https://bambuser.com/docs/playback/web-player/
    const player = BambuserPlayer.create(this.playerEl.nativeElement, resourceUri);
    player.controls = true;

    const log = str => {
      // Ensure template is re-rendered even though caller might be an
      // event listener on an emitter outside of Angular's zone.
      // https://angular.io/docs/ts/latest/api/core/index/NgZone-class.html
      this.zone.run(() => {
        this.playerLog.unshift(`${player.currentTime} ${player.duration} ${str}`);
      });
    }

    // Make player available in console, for debugging purposes
    console.log('The player object is now assigned to window.player to enable manual debugging of the player API. Try player.pause(), player.play(), reading from and assigning to player.currentTime etc...', player);
    window['player'] = player;

    // Log all player events as they occur, for debugging purposes
    [
      'canplay',
      'durationchange',
      'ended',
      'error',
      'loadedmetadata',
      'pause',
      'play',
      'playing',
      'progress',
      'seeked',
      'seeking',
      'timeupdate',
      'volumechange',
      'waiting'
    ].map(eventName => player.addEventListener(eventName, e => log(eventName)));
  }

  ionViewWillLeave() {
    // Remove player from DOM.
    //
    // By design, Ionic tabs controller keeps the page alive in the background
    // when navigating away. Leaving a player in the background might be
    // resource-consuming and otherwise unexpected though...
    //
    // If retaining the player state is desired when navigating back and forth,
    // consider replacing the below assignment with player.pause() / player.play()

    console.log('closing basic player');
    this.playerEl.nativeElement.innerHTML = '';
    this.playerLog = [];
  }
}
