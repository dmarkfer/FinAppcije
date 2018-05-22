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

  records: any = [];
  totalIncome: number = 0;
  totalExpense: number = 0;
  balance: number = 0;


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

  ionViewDidLoad(): void {
    this.getRecords();
  }

  ionViewWillEnter(): void {
    this.getRecords();
  }

  getRecords(): void {
    this.sqlite.create({
      name: 'finappcije.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('CREATE TABLE IF NOT EXISTS record(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT, description TEXT, amount TEXT)', {})
        .catch(e => console.log(e));
      
      db.executeSql('SELECT * FROM record ORDER BY rowid DESC', {})
        .then(res => {
          this.records = [];
          for(let i=0; i<res.rows.length; ++i) {
            this.records.push({
              rowid: res.rows.item(i).rowid,
              date: res.rows.item(i).date,
              type: res.rows.item(i).type,
              description: res.rows.item(i).description,
              amount: res.rows.item(i).amount
            });
          }
        })
        .catch(e => console.log(e));

      db.executeSql('SELECT SUM(amount) AS totalIncome FROM record WHERE type="Income"', {})
        .then(res => {
          if(res.rows.length > 0) {
            this.totalIncome = parseInt(res.rows.item(0).totalIncome);
            this.balance = this.totalIncome - this.totalExpense;
          }
        })
        .catch(e => console.log(e));
      
      db.executeSql('SELECT SUM(amount) AS totalExpense FROM record WHERE type="Expense"', {})
        .then(res => {
          if(res.rows.length > 0) {
            this.totalExpense = parseInt(res.rows.item(0).totalExpense);
            this.balance = this.totalIncome - this.totalExpense;
          }
        });

    }).catch(e => console.log(e));
  }

  openAddRecordPage(): void {
    this.navCtrl.push(AddRecordPage);
  }

}
