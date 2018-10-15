import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { BasicPlayerPage } from '../player-basic/player-basic';
import { HighlightsPlayerPage } from '../player-highlights/player-highlights';
import { BroadcastListPage } from '../broadcast-list/broadcast-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
 // tab1Root: any = HomePage;
  tab2Root: any = BasicPlayerPage;
  tab3Root: any = HighlightsPlayerPage;
  tab4Root: any = BroadcastListPage;
  tab1Root: any = BroadcastListPage;

  constructor() {

  }
}
