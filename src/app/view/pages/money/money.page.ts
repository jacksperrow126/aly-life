import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoneyService } from '@core/services/money.service';
import { Subscription } from 'rxjs';
import { WalletTypeString } from '@core/data/wallet-type';

@Component({
  selector: 'aly-money',
  templateUrl: './money.page.html',
  styleUrls: ['./money.page.scss'],
})
export class MoneyPage implements OnInit, OnDestroy {
  private subcription: Subscription;
  constructor(private moneyService: MoneyService) {}

  ngOnInit() {
    this.subcription = this.moneyService.initMoneyService.subscribe((data) => {
      if (data.length === 0) {
        this.moneyService.setListWallets({
          id: '',
          name: 'Chứng Khoán',
          currentBalance: 0,
          type: WalletTypeString.CO_PHIEU,
          detail: 'Đầu tư',
          transactions: [],
          margin: 0,
          notMine: 0,
          grossBalance: 0,
          cash: 0,
          investmentValue: 0,
        });
      }
    });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
