import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


/*
  Generated class for the MockDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MockDataProvider {

  constructor(private sqlite: SQLite) {
    console.log('Hello MockDataProvider Provider');
  }

  getEntriesFromDB() {
    let records: any = [];

    this.sqlite.create({
      name: 'finappcije.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS record(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT, category TEXT, description TEXT, amount TEXT)', {})
        .catch(e => console.log(e));

      db.executeSql('SELECT * FROM record ORDER BY rowid DESC', {})
        .then(res => {

          for (let i = 0; i < res.rows.length; ++i) {
            records.push({
              rowid: res.rows.item(i).rowid,
              date: res.rows.item(i).date,
              type: res.rows.item(i).type,
              category: res.rows.item(i).category,
              description: res.rows.item(i).description,
              amount: res.rows.item(i).amount
            });
          }
        })
        .catch(e => console.log(e));
    }).catch(e => console.log(e));

    return records;
  }

  getCategoriesIncome(){
    return ['Paycheck', 'Payment', 'Gift', 'Other']
  }

  getCategoriesExpense(){
    return ['Food and Drink', 'Bills', 'Houseware', 'Car and Transport', 'Clothes', 'Sport', 'Holiday and Relax', 'Fun', 'Other']
  }
}
