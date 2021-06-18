import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MoneyService } from '@core/services/money.service';
import { Subscription } from 'rxjs';
import { Moment } from 'moment';
const incomeColor = ['#fcbf14', '#e32a19', '#3cd611', '#278dcc', '#b765ba'];
@Component({
  selector: 'aly-money-overview',
  templateUrl: './money-overview.component.html',
  styleUrls: ['./money-overview.component.scss'],
})
export class MoneyOverviewComponent implements OnInit, OnDestroy {
  private dataForPie;
  public totalMoneyChartData;
  public incomePieChartLabels = [];
  public incomePieChartData = [];
  public outcomePieChartLabels = [];
  public outcomePieChartData = [];
  public subcription: Subscription;
  public incomeProgress = [];
  public outcomeProgress = [];
  public totalIncomeProgress = 0;
  public totalOutcomeProgress = 0;
  public totalIncomeMax = 0;
  public totalOutcomeMax = 0;
  public dateSelect: number = new Date().getMonth();

  constructor(private moneyService: MoneyService) {}

  ngOnInit() {
    this.subcription = this.moneyService.initMoneyService.subscribe(() => {
      this.updateData();
    });
    this.totalMoneyChartData = this.moneyService.getDataForChart();
  }

  updateData() {
    this.resetData();
    this.dataForPie = this.moneyService.getInOutcomeMoneyByTag(this.dateSelect);
    const outcomePlan = this.moneyService.getOutcomePlan;
    const incomePlan = this.moneyService.getIncomePlan;

    Object.keys(this.dataForPie).map((tag, i) => {
      incomePlan.find((type) => {
        if (type.id === tag) {
          this.incomePieChartLabels.push(type.name);
          this.incomeProgress.push({
            name: type.name,
            progress: this.dataForPie[tag],
            max: type.value,
            icon: type.icon,
            type: type.type,
          });
          this.incomePieChartData.push({
            name: type.name,
            y: this.dataForPie[tag],
            color: incomeColor[i],
          });
          return;
        }
      });
      outcomePlan.find((type) => {
        if (type.id === tag) {
          this.outcomePieChartLabels.push(type.name);
          this.outcomeProgress.push({
            name: type.name,
            progress: this.dataForPie[tag],
            max: type.value,
            icon: type.icon,
            type: type.type,
          });
          this.outcomePieChartData.push({
            name: type.name,
            y: this.dataForPie[tag],
          });
          return;
        }
      });
    });
    this.incomeProgress.forEach((progress) => {
      this.totalIncomeMax += progress.max;
      this.totalIncomeProgress += progress.progress;
    });
    this.outcomeProgress.forEach((progress) => {
      this.totalOutcomeMax += progress.max;
      this.totalOutcomeProgress += progress.progress;
    });
  }

  resetData() {
    this.totalIncomeMax = 0;
    this.totalIncomeProgress = 0;
    this.totalOutcomeMax = 0;
    this.totalOutcomeProgress = 0;
    this.incomePieChartLabels = [];
    this.incomePieChartData = [];
    this.outcomePieChartLabels = [];
    this.outcomePieChartData = [];
    this.outcomeProgress = [];
    this.incomeProgress = [];
  }

  chosenMonthHandler(event: Date, datepicker: MatDatepicker<Moment>) {
    const date = new Date(event);
    this.dateSelect = date.getMonth();
    this.updateData();
    datepicker.close();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
