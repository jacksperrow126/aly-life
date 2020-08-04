import { TagPlan } from './../../../../core/models/money/tag-plan.model';
import { Component, OnInit } from '@angular/core';
import { MoneyService } from '@core/services/money.service';
import { Wallet } from '@core/models/money/wallet.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'aly-money-manage',
  templateUrl: './money-manage.component.html',
  styleUrls: ['./money-manage.component.scss'],
})
export class MoneyManageComponent implements OnInit {
  public wallets: Wallet[];
  public incomePlan: TagPlan[];
  public outcomePlan: TagPlan[];
  public selectedTag: TagPlan;
  public isShowSlider: boolean = false;
  constructor(private moneyService: MoneyService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.moneyService.initMoneyService.subscribe(data => {
      this.wallets = data;
    });
    this.incomePlan = this.moneyService.incomePlan;
    this.outcomePlan = this.moneyService.outcomePlan;
  }

  choose(plan) {
    this.selectedTag = plan;
    this.isShowSlider = true
  }

  submitChange() {
    this.isShowSlider = false;
    this.moneyService.changePlan(this.selectedTag);
    this._snackBar.open('Thành công rồi!', '', { duration: 1000, })

  }
}
