import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoneyService } from '@core/services/money.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'aly-money',
  templateUrl: './money.page.html',
  styleUrls: ['./money.page.scss'],
})
export class MoneyPage implements OnInit, OnDestroy {
  private subcription: Subscription;
  constructor(private moneyService: MoneyService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.subcription = this.moneyService.initMoneyService.subscribe(data => {
      if (data.length == 0) {
        this.router.navigateByUrl('/money/add-wallet');
        this._snackBar.open('Lần đầu?', 'Hãy tạo mới 1 ví nhé', { duration: 3000, });
      }
    })
  }

  ngOnDestroy() {
    this.subcription.unsubscribe()
  }

}
