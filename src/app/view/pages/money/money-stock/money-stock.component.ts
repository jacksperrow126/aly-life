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
import { WalletTypeString } from '@core/data/wallet-type';

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
      const stockWallets = this.wallets.find(
        (wallet) => wallet.type === WalletTypeString.CO_PHIEU
      );
      this.totalValue = stockWallets.currentBalance;
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
    let margin = 0;
    this.stockList.forEach((stock) => {
      balance += stock.value;
      margin += stock.margin;
    });
    const stockWallet = this.wallets.find(
      (wallet) => wallet.type === WalletTypeString.CO_PHIEU
    );
    stockWallet.grossBalance = balance;
    stockWallet.margin = margin;
    stockWallet.currentBalance = stockWallet.grossBalance - stockWallet.margin;

    this.moneyService.saveWallets();
  }

  sellStock(stockCode: string) {
    this.moneyService.sellStock(stockCode);
  }
}
