import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BasicPlayerPage } from '../pages/player-basic/player-basic';
import { HighlightsPlayerPage } from '../pages/player-highlights/player-highlights';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BroadcastListPage } from '../pages/broadcast-list/broadcast-list';

@NgModule({
  declarations: [
    MyApp,
    BasicPlayerPage,
    HighlightsPlayerPage,
    HomePage,
    TabsPage,
    BroadcastListPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BasicPlayerPage,
    HighlightsPlayerPage,
    HomePage,
    TabsPage,
    BroadcastListPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
