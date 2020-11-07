import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { getChartOptions } from './money-chart-options';
@Component({
  selector: 'aly-money-chart',
  templateUrl: './money-chart.component.html',
  styleUrls: ['./money-chart.component.scss'],
})
export class MoneyChartComponent implements OnInit {
  @Input() chartData: any[];
  @Input() type: string = 'pie';

  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: Highcharts.Options;

  constructor() { }

  ngOnInit() {
    this.chartOptions = getChartOptions(this.type, this.chartData);
  }

}
