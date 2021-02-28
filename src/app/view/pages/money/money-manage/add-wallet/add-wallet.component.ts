import { Component, OnInit } from '@angular/core';
import { MoneyService } from '@core/services/money.service';
import { WalletType } from '@core/models/money/wallet-types.model';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'aly-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.scss'],
})
export class AddWalletComponent implements OnInit {
  public walletType: WalletType[];
  constructor(
    private moneyService: MoneyService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.walletType = this.moneyService.walletType.filter(
      (type) => type.value !== 'coPhieu'
    );
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.moneyService.setListWallets(form.value);
    this._snackBar.open('Thành công rồi!', '', { duration: 1000 });
    this.router.navigateByUrl('/money');
  }
}
