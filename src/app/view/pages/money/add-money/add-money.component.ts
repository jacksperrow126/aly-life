import { Component, OnInit } from '@angular/core';
import { moneyIncomeType, moneyOutcomeType } from '@core/data/money';
import { MoneyService } from '@core/services/money.service';
import { Wallet } from '@core/models/money/wallet.model';
import { NgForm } from '@angular/forms';
import { randomID } from '@core/helper/random-id';
import { getToday } from '@core/helper/getToday';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'aly-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.scss'],
})
export class AddMoneyComponent implements OnInit {
  public type = moneyOutcomeType;
  public wallets: Wallet[];
  constructor(private moneyService: MoneyService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.wallets = this.moneyService.getWallet;
  }

  selectTags(type) {
    if (type === 'income') {
      this.type = moneyIncomeType
    } else {
      this.type = moneyOutcomeType
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    let moneyBill = form.value;
    moneyBill.id = 'bill_' + randomID();
    moneyBill.date = new Date();
    this.moneyService.setMoneyByDay(moneyBill, getToday(moneyBill.date));
    this._snackBar.open('Thành công rồi!!!', '', { duration: 1000, });
    this.router.navigateByUrl('/money')
  }
}
