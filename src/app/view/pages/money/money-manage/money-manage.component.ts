import { TagPlan } from './../../../../core/models/money/tag-plan.model';
import { Component, OnInit } from '@angular/core';
import { MoneyService } from '@core/services/money.service';
import { Wallet } from '@core/models/money/wallet.model';

@Component({
  selector: 'aly-money-manage',
  templateUrl: './money-manage.component.html',
  styleUrls: ['./money-manage.component.scss'],
})
export class MoneyManageComponent implements OnInit {
  public wallets: Wallet[];
  public incomePlan: TagPlan[];
  public outcomePlan: TagPlan[];

  constructor(private moneyService: MoneyService) { }

  ngOnInit() {
    this.moneyService.initMoneyService.subscribe(data => {
      this.wallets = data;
    });
    this.incomePlan = this.moneyService.incomePlan;
    this.outcomePlan = this.moneyService.outcomePlan;
  }

}
