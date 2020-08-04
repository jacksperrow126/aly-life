import { moneyIncomeType, moneyOutcomeType } from '@core/data/money';
import { Component, OnInit } from '@angular/core';
import { MoneyService } from '@core/services/money.service';

@Component({
  selector: 'aly-money-preview',
  templateUrl: './money-preview.component.html',
  styleUrls: ['./money-preview.component.scss'],
})
export class MoneyPreviewComponent implements OnInit {
  public currentBalance: number;
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
    this.initChart();
    this.moneyService.initMoneyService.subscribe(data => {
      this.updateData();

    })
  }

  updateData() {
    let data = this.moneyService.getDataForChart();
    this.currentBalance = this.moneyService.getCurrentBalance();
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
} 
