import { Component, OnInit, Input } from '@angular/core';
import { Wallet } from '@core/models/money/wallet.model';
import { MoneyService } from '@core/services/money.service';

@Component({
  selector: 'aly-wallet-detail',
  templateUrl: './wallet-detail.component.html',
  styleUrls: ['./wallet-detail.component.scss'],
})
export class WalletDetailComponent implements OnInit {
  @Input() wallet: Wallet;
  public income: number = 0;
  public outcome: number = 0;
  constructor(private moneyService: MoneyService) { }

  ngOnInit() {
    this.moneyService.initMoneyService.subscribe(data => {
      this.getInOutCome();
    })
  }

  getInOutCome() {
    this.wallet.transactions.forEach(transaction => {
      this.income += transaction.income;
      this.outcome += transaction.outcome;
    })
  }
}
