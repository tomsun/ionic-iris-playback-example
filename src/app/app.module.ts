import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { JavaScriptPlayerPage } from '../pages/player-js/player-js';
import { NativePlayerPage } from '../pages/player-native/player-native';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BroadcastListPage } from '../pages/broadcast-list/broadcast-list';

@NgModule({
  declarations: [
    MyApp,
    JavaScriptPlayerPage,
    NativePlayerPage,
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
    JavaScriptPlayerPage,
    NativePlayerPage,
    HomePage,
    TabsPage,
    BroadcastListPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
