import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { JavaScriptPlayerPage } from '../player-js/player-js';
import { NativePlayerPage } from '../player-native/player-native';
import { BroadcastListPage } from '../broadcast-list/broadcast-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = JavaScriptPlayerPage;
  tab3Root: any = NativePlayerPage;
  tab4Root: any = BroadcastListPage;

  constructor() {

  }
}
