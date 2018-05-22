import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { RecordsPage } from '../records/records';
import { ChartsPage } from '../charts/charts';
import { AddRecordPage } from '../add-record/add-record';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  recordsTabRoot = RecordsPage;
  chartsTabRoot = ChartsPage;


  recordTypes: any = [ 'Income', 'Expense', 'Savings', 'All' ];
  selectedRecordTypes: any;

  categories: any = [];
  selectedCategories: any;


  constructor(
    public navCtrl: NavController,
    private sqlite: SQLite
  ) {
  }


  /*ngOnInit(): void {
    this.selectedRecordTypes = this.recordTypes[3];
  }*/

  openAddRecordPage(): void {
    this.navCtrl.push(AddRecordPage);
  }

}
