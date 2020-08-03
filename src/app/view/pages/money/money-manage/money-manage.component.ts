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
  constructor(private moneyService: MoneyService) { }

  ngOnInit() {
    this.moneyService.initMoneyService.subscribe(data => {
      this.wallets = data;
    })
  }

}
