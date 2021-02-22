import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ADD_STOCK } from '@core/const/model-form-key';
import { Stock } from '@core/models/money/stock.model';
import { FormService } from '@core/services/form.service';
import { MoneyService } from '@core/services/money.service';
import { pipe } from 'rxjs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'aly-money-stock',
  templateUrl: './money-stock.component.html',
  styleUrls: ['./money-stock.component.scss'],
})
export class MoneyStockComponent implements OnInit {
  public stockList: Stock[] = [];
  a: number;
  b: number;
  c;

  constructor(private formService: FormService, private moneyService: MoneyService, private _snackBar: MatSnackBar, private store: Storage,) { }
  ngOnInit() {
    this.moneyService.changeStockList.subscribe(() => {
      this.stockList = this.moneyService.stockList;
      this._snackBar.open('Cập nhật thành công', '', { duration: 1000, });
    });
    this.store.ready().then(() => {
      this.store.get('money').then(data => {
        data = this.b;
      });
    });

  }

  showForm() {
    this.formService.showForm({ key: ADD_STOCK });
  }
  show() {
    this.b = this.a;
    this.a = this.c;
  }
}
