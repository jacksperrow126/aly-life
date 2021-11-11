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
      this.wallets = this.moneyService.wallets;
      const stockWallets = this.wallets.find(
        (wallet) => wallet.type === WalletTypeString.CO_PHIEU
      );
      this.totalValue = stockWallets.currentBalance;
    });
    this.moneyService.changeStockList.subscribe(() => {
      this.stockList = this.moneyService.stockList;
      this.snackBar.open('Cập nhật thành công', '', { duration: 1000 });
    });
    this.moneyService.moneyServiceError.subscribe((err) => {
      if (err && err.isErr) {
        this.snackBar.open(err.message, '', {
          duration: 1000,
        });
      }
    });
  }

  showForm() {
    this.formService.showForm({ key: ADD_STOCK });
  }

  changeStock(stockData) {
    this.formService.showForm({ key: ADD_STOCK, data: stockData });
  }

  sellStock(stockCode: string) {
    this.moneyService.sellStock(stockCode);
  }
}
