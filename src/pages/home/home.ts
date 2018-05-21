import { Component, OnInit } from '@angular/core';

import { RecordsPage } from '../records/records';
import { ChartsPage } from '../charts/charts';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  recordsTabRoot = RecordsPage;
  chartsTabRoot = ChartsPage;


  recordTypes: any = [ 'Income', 'Expense', 'Savings', 'All' ];
  selectedRecordTypes: any;

  categories: any = [];
  selectedCategories: any;


  constructor() {

  }


  ngOnInit(): void {
    this.selectedRecordTypes = this.recordTypes[3];
  }

}
