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

  constructor(private moneyService: MoneyService) { }

  ngOnInit() {
    this.subcription = this.moneyService.initMoneyService.subscribe(data => {
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
    })
  }

  ngOnDestroy() {
    this.subcription.unsubscribe()
  }
}
