import { TagIcon } from './../../../../core/helper/getTagIcon';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoneyService } from '@core/services/money.service';
import { InOutcome } from '@core/models/money/in-outcome.model';
import { getToday } from '@core/helper/getToday';
import { Storage } from '@ionic/storage';
import { Transaction } from '@core/models/money/wallet.model';
import { Subscription } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'aly-money-history',
  templateUrl: './money-history.component.html',
  styleUrls: ['./money-history.component.scss'],
})
export class MoneyHistoryComponent implements OnInit, OnDestroy {
  public transactions: any[];
  private subcription: Subscription;
  public selectedDate: string;
  constructor(private moneyService: MoneyService, private storage: Storage) { }

  ngOnInit() {
    this.subcription = this.moneyService.initMoneyService.subscribe(data => {
      let day = new Date();
      this.selectedDate = getToday(day);
      this.transactions = this.moneyService.getBillByMonth(day.getMonth());
    })
  }

  getToday(day: string) {
    return getToday(day)
  }

  pickDate(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = getToday(event.value);
    this.transactions = this.moneyService.getBillByMonth(event.value.getMonth());
  }

  getTagIcon( id){
    return TagIcon[id]
  }
  ngOnDestroy() {
    this.subcription.unsubscribe()
  }
}   
