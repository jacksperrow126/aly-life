import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoneyService } from '@core/services/money.service';
import { moneyIncomeType, moneyOutcomeType } from '@core/data/money';
import { Subscription } from 'rxjs';

@Component({
  selector: 'aly-money-overview',
  templateUrl: './money-overview.component.html',
  styleUrls: ['./money-overview.component.scss'],
})
export class MoneyOverviewComponent implements OnInit, OnDestroy {
  private dataForPie;
  public incomePieChartLabels = [];
  public incomePieChartData = [];
  public outcomePieChartLabels = [];
  public outcomePieChartData = [];
  public pieChartType = 'doughnut';
  public chartOptions = {
    // scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      labels: {
        fontColor: 'black',
        fontSize: 12,
        fontFamily: ''
      }
    }
  };
  public subcription: Subscription;
  public incomeProgress = [];
  public outcomeProgress = [];
  public daysOnChart = [];
  public dataOnChart = [];
  public barChartOptions: {
    scaleShowVerticalLines: boolean,
    responsive: boolean,
    legend: {
      labels: {
        fontColor: string,
        fontSize: number,
        fontFamily: string
      }
    }
  };
  public barChartLabels = this.daysOnChart;
  public barChartType: string;
  public barChartLegend: boolean;
  public barChartData = [];
  constructor(private moneyService: MoneyService) { }

  ngOnInit() {
    this.initChart()
    this.subcription = this.moneyService.initMoneyService.subscribe(data => {
      this.updateData();
    })
  }


  updateData() {
    let data = this.moneyService.getDataForChart();
    this.dataOnChart = data.data;
    this.daysOnChart = data.date;
    if (this.dataOnChart.length > 3) {
      this.dataOnChart = this.dataOnChart.slice(0, 2);
      this.daysOnChart = this.daysOnChart.slice(0, 2);
    }
    this.barChartLabels = this.daysOnChart;
    this.barChartData = [
      { data: this.dataOnChart, label: 'Tổng tài sản', borderColor: 'red' },
    ];
    this.incomePieChartLabels = [];
    this.incomePieChartData = [];
    this.outcomePieChartLabels = [];
    this.outcomePieChartData = [];
    this.outcomeProgress = [];
    this.incomeProgress = [];
    this.dataForPie = this.moneyService.getInOutcomeMoneyByTag();
    let outcomePlan = this.moneyService.getOutcomePlan
    let incomePlan = this.moneyService.getIncomePlan

    Object.keys(this.dataForPie).map(tag => {
      incomePlan.find(type => {
        if (type.id == tag) {
          this.incomePieChartLabels.push(type.name);
          this.incomeProgress.push({ name: type.name, progress: this.dataForPie[tag], max: type.value, icon: type.icon, type: type.type })
          this.incomePieChartData.push(this.dataForPie[tag])
          return;
        }
      })
      outcomePlan.find(type => {
        if (type.id == tag) {
          this.outcomePieChartLabels.push(type.name);
          this.outcomeProgress.push({ name: type.name, progress: this.dataForPie[tag], max: type.value, icon: type.icon, type: type.type })
          this.outcomePieChartData.push(this.dataForPie[tag])
          return;
        }
      })
    })
  }

  initChart() {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      legend: {
        labels: {
          fontColor: 'black',
          fontSize: 12,
          fontFamily: ''
        }
      }
    };
    this.barChartLabels = this.daysOnChart;
    this.barChartType = 'line';
    this.barChartLegend = true;
    this.barChartData = [
      { data: this.dataOnChart, label: 'Tổng tài sản', },
    ];
  }

  ngOnDestroy() {
    this.subcription.unsubscribe()
  }
}
