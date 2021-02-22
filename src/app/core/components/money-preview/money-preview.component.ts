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

  constructor(private moneyService: MoneyService) {}

  ngOnInit() {
    this.moneyService.initMoneyService.subscribe((data) => {
      this.currentBalance = this.moneyService.getCurrentBalance();
    });
  }
}
