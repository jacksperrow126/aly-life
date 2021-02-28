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
  constructor(private moneyService: MoneyService) {}

  ngOnInit() {
    this.subcription = this.moneyService.initMoneyService.subscribe((data) => {
      if (data.length === 0) {
        this.moneyService.setListWallets({
          id: '',
          name: 'Chứng Khoán',
          currentBalance: 0,
          type: 'coPhieu',
          detail: 'Đầu tư',
          transactions: [],
        });
      }
    });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
