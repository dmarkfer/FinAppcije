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
  private categories = [];

  private dataType;
  private dataCategory;
  private showChart;

  private chartData = [];
  private chartLabels = [];
  private totalAmount = 0;

  @ViewChild("baseChart")
  chart: BaseChartDirective;

  constructor(public navCtrl: NavController, private mockData: MockDataProvider, private zone: NgZone) {
    this.dataCategory = "all";
    this.dataType = "income";
    this.getNewData();
    this.showChart = true;
  }

  getNewData() {
    this.transactions = this.mockData.getEntriesFromDB();
    this.categories = this.mockData.getCategoriesFromDB();

    this.transactions = this.transactions.filter(item => item.type == this.dataType)
    if (this.dataCategory != "all") this.transactions = this.transactions.filter(item => item.category == this.dataCategory)

    this.chartData = [];
    this.chartLabels = [];
    this.totalAmount = 0;

    this.transactions.sort((first, second) => {
      if (first.amount < second.amount) {
        return -1
      } else if (first.amount > second.amount) {
        return 1
      } else {
        return 0
      }
    });

    for (let transaction of this.transactions) {
      this.chartLabels.push(transaction.description);
      this.chartData.push(transaction.amount);
      this.totalAmount += transaction.amount;
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
