import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@IonicPage()
@Component({
  selector: 'page-add-record',
  templateUrl: 'add-record.html',
})
export class AddRecordPage {

  data = { date:"", type:"", description:"", amount:0 };


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRecordPage');
  }

}
