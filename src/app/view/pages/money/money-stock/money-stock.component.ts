import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ADD_STOCK } from '@core/const/model-form-key';
import { Stock } from '@core/models/money/stock.model';
import { FormService } from '@core/services/form.service';
import { MoneyService } from '@core/services/money.service';

@Component({
  selector: 'aly-money-stock',
  templateUrl: './money-stock.component.html',
  styleUrls: ['./money-stock.component.scss'],
})
export class MoneyStockComponent implements OnInit {
  public stockList: Stock[] = [];
  constructor(private formService: FormService, private moneyService: MoneyService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.moneyService.changeStockList.subscribe(() => {
      this.stockList = this.moneyService.stockList;
      this._snackBar.open('Cập nhật thành công', '', { duration: 1000, });
    });
  }

  showForm() {
    this.formService.showForm({ key: ADD_STOCK });
  }
}
