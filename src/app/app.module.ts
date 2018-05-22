import { SQLite } from '@ionic-native/sqlite';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RecordsPage } from '../pages/records/records';
import { ChartsPage } from '../pages/charts/charts';
import { AddRecordPage } from '../pages/add-record/add-record';
import { MockDataProvider } from '../providers/mock-data/mock-data';
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RecordsPage,
    ChartsPage,
    AddRecordPage
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RecordsPage,
    ChartsPage,
    AddRecordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    MockDataProvider
  ]
})
export class AppModule {}
