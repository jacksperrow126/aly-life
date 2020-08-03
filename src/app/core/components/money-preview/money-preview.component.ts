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
    scaleLabel: string
  };
  public barChartLabels = this.daysOnChart;
  public barChartType: string;
  public barChartLegend: boolean;
  public barChartData = [];

  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';
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
      { data: this.dataOnChart, label: 'Tổng tài sản', backgroundColor: 'red' },
    ];
  }

  initChart() {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scaleLabel: 'abc'
    };
    this.barChartLabels = this.daysOnChart;
    this.barChartType = 'line';
    this.barChartLegend = true;
    this.barChartData = [
      { data: this.dataOnChart, label: 'Tổng tài sản', backgroundColor: 'red' },
    ];
  }
} 
