import { Injectable } from '@angular/core';

/*
  Generated class for the MockDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MockDataProvider {

  constructor() {
    console.log('Hello MockDataProvider Provider');
  }

  getEntriesFromDB(){
    return [
      {rowid: 0, date: "22.04.2017", type: "income", category: 4, description: "Paycheck", amount: 7600},
      {rowid: 1, date: "23.04.2017", type: "expense", category: 2, description: "Režije", amount: 500},
      {rowid: 2, date: "25.04.2017", type: "expense", category: 1, description: "Stanarina", amount: 1700},
      {rowid: 3, date: "26.04.2017", type: "income", category: 3, description: "Dividende", amount: 400},
      {rowid: 4, date: "27.04.2017", type: "expense", category: 2, description: "Namirnice", amount: 300},
      {rowid: 5, date: "28.04.2017", type: "income", category: 3, description: "Mirko vratio pare", amount: 150},
    ]
  }

  getCategoriesFromDB(){
    return [
      {rowid: 4, name: "Posao"},
      {rowid: 1, name: "Troškovi življenja"},
      {rowid: 3, name: "Posuđen novac"},
      {rowid: 2, name: "Fond za auto"},
      {rowid: 0, name: "Razonoda"}
    ]
  }
}
