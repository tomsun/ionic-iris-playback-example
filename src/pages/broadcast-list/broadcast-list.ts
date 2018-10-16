import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import moment from 'moment';
import * as agent from 'superagent';

import { JavaScriptPlayerPage } from '../player-js/player-js';
import { NativePlayerPage } from '../player-native/player-native';

// API key generated at https://dashboard.bambuser.com/developer
const READONLY_API_KEY:string = 'CHANGEME';

@Component({
  selector: 'page-broadcast-list',
  templateUrl: 'broadcast-list.html',
})
export class BroadcastListPage {
  isFetching = false;
  errorMessage = '';
  mayShowSpinner = true;
  refresher: any;
  broadcasts = [];
  moment: any;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController) {

    this.moment = moment; // provide to template
  }

  ionViewDidEnter() {
    console.log('showing broadcast list');
    this.reloadData();
  }

  reloadData() {
    if (READONLY_API_KEY.endsWith('NGEME')) {
      new Promise(resolve => setTimeout(resolve, 500)).then(() => {
         // Let page animations to finish before using alert()
         alert('Warning: READONLY_API_KEY is not set. Get your key at https://dashboard.bambuser.com/developer and update pages/broadcast-list/broadcast-list.ts, then rebuild the app.');
      });
      return;
    }
    // TODO: support pagination / endless scroll
    this.errorMessage = '';
    this.isFetching = true;
    console.log('Fetching broadcast list');
    // https://bambuser.com/docs/api/get-broadcast-metadata/#get-metadata-for-multiple-broadcasts
    return agent.get('https://api.bambuser.com/broadcasts')
    .set('Accept', 'application/vnd.bambuser.v1+json')
    .set('Authorization', 'Bearer ' + READONLY_API_KEY)
    .then(res => {
      console.log('got broadcast response', res.body);
      this.isFetching = false;
      this.broadcasts = res.body.results;
    }).catch(e => {
      console.log('error while fetching broadcasts', e);
      this.errorMessage = e.message;
      this.isFetching = false;
    });
  }

  onPullToRefresh(refresher) {
    // don't show our own spinner: refresher component has an internal spinner
    this.mayShowSpinner = false;
    this.reloadData().then(() => {
      refresher.complete();
      this.mayShowSpinner = true;
    })
  }

  playBroadcast(broadcast) {
    // In this demo we choose to start live broadcasts in a native player SDK,
    // since it supports low latency playback in more scenarios.
    // and we choose to use the JavaScript player API for archived videos,
    // since it has a richer UI and event model.
    //
    // Both players are capable of both live and archived playback though:
    // for your own app: try both and make your own decision on which player to use when.
    let PlayerPage = JavaScriptPlayerPage;
    if (broadcast.type === 'live' && window['bambuser'] && window['bambuser']['player']) {
      PlayerPage = NativePlayerPage;
    }

    // Open player page in a modal window
    // and instruct it to play the selected broadcast
    const playerModal = this.modalCtrl.create(PlayerPage, {
      resourceUri: broadcast.resourceUri,
      autoplay: true,
      showCloseButton: true,
    });
    playerModal.present();
  }

  ionViewWillLeave() {
     console.log('leaving broadcast list');
  }
}
