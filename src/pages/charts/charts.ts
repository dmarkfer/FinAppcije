import {ChangeDetectorRef, Component, NgZone, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';

import {MockDataProvider} from "../../providers/mock-data/mock-data";
import {BaseChartDirective} from "ng2-charts";


@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
  providers: [
    MockDataProvider
  ]
})
export class ChartsPage {
  private transactions = [];
  private transactionsIncome = [];
  private transactionsExpense = [];
  private incomeCategories = [];
  private expenseCategories = [];

  private incomeDataCategory;
  private expenseDataCategory;
  private showChart;

  private chartIncomeData = [];
  private chartIncomeLabels = [];
  private totalIncomeAmount = 0;

  private chartExpenseData = [];
  private chartExpenseLabels = [];
  private totalExpenseAmount = 0;

  private totalGraphData = [];
  private totalIncome = 0;
  private totalExpense = 0;

  @ViewChild("baseChart")
  chart: BaseChartDirective;

  constructor(public navCtrl: NavController, private mockData: MockDataProvider, private zone: NgZone) {
    this.incomeDataCategory = "all";
    this.expenseDataCategory = "all";
    this.getNewData();
    this.showChart = true;
  }

  getNewData() {
    this.transactions = this.mockData.getEntriesFromDB();
    this.incomeCategories = this.mockData.getCategoriesIncome();
    this.expenseCategories = this.mockData.getCategoriesExpense();

    this.chartIncomeData = [];
    this.chartIncomeLabels = [];
    this.totalIncomeAmount = 0;

    this.chartExpenseData = [];
    this.chartExpenseLabels = [];
    this.totalExpenseAmount = 0;

    this.totalGraphData = [];
    this.totalExpense = 0;
    this.totalIncome = 0;


    for (let transaction of this.transactions) {
      if(transaction.type == "income") this.totalIncome += transaction.amount
      else this.totalExpense += transaction.amount
    }

    this.totalGraphData.push(this.totalIncome);
    this.totalGraphData.push(this.totalExpense);

    this.transactionsIncome = this.transactions.filter(item => item.type == "income")
    if (this.incomeDataCategory != "all") this.transactionsIncome = this.transactionsIncome.filter(item => item.category == this.incomeDataCategory)

    this.transactionsIncome.sort((first, second) => {
      if (first.amount < second.amount) {
        return -1
      } else if (first.amount > second.amount) {
        return 1
      } else {
        return 0
      }
    });

    for (let transaction of this.transactions) {
      this.chartIncomeLabels.push(transaction.description);
      this.chartIncomeData.push(transaction.amount);
      this.totalIncomeAmount += transaction.amount;
    }

    this.transactionsExpense = this.transactions.filter(item => item.type == "expense")
    if (this.expenseDataCategory != "all") this.transactionsExpense = this.transactionsExpense.filter(item => item.category == this.expenseDataCategory)

    this.transactionsExpense.sort((first, second) => {
      if (first.amount < second.amount) {
        return -1
      } else if (first.amount > second.amount) {
        return 1
      } else {
        return 0
      }
    });

    for (let transaction of this.transactions) {
      this.chartExpenseLabels.push(transaction.description);
      this.chartExpenseData.push(transaction.amount);
      this.totalExpenseAmount += transaction.amount;
    }

    this.reloadChart()
  }

  reloadChart() {
    this.zone.run(()=>{
      this.showChart = false;
      setTimeout(()=>{this.showChart = true}, 200)
    });

  }
}
