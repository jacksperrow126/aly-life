import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ADD_STOCK } from '@core/const/model-form-key';
import { Stock } from '@core/models/money/stock.model';
import { FormService } from '@core/services/form.service';
import { MoneyService } from '@core/services/money.service';
import { pipe } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Wallet } from '@core/models/money/wallet.model';

@Component({
  selector: 'aly-money-stock',
  templateUrl: './money-stock.component.html',
  styleUrls: ['./money-stock.component.scss'],
})
export class MoneyStockComponent implements OnInit {
  public stockList: Stock[] = [];
  public totalValue: number;
  private wallets: Wallet[];
  constructor(
    private formService: FormService,
    private moneyService: MoneyService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.moneyService.initMoneyService.subscribe((data) => {
      this.wallets = data;
      console.log(this.wallets);
      this.totalValue = this.wallets.find(
        (wallet) => wallet.type === 'coPhieu'
      ).currentBalance;
    });
    this.moneyService.changeStockList.subscribe(() => {
      this.stockList = this.moneyService.stockList;
      this.changeStockWalletBalance();
      this.snackBar.open('Cập nhật thành công', '', { duration: 1000 });
    });
  }

  showForm() {
    this.formService.showForm({ key: ADD_STOCK });
  }

  changeStock(stockData) {
    this.formService.showForm({ key: ADD_STOCK, data: stockData });
  }

  changeStockWalletBalance() {
    let balance = 0;
    this.stockList.forEach((stock) => {
      balance += stock.value;
    });
    this.wallets.find(
      (wallet) => wallet.type === 'coPhieu'
    ).currentBalance = balance;
    this.moneyService.saveWallets();
  }

  sellStock(stockCode: string) {
    this.moneyService.sellStock(stockCode);
  }
}
