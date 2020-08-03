import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Wallet, Transaction } from '@core/models/money/wallet.model';
import { WalletType } from '@core/models/money/wallet-types.model';
import { walletType } from '@core/data/wallet-type';
import { InOutcome } from '@core/models/money/in-outcome.model';
import { getToday } from '@core/helper/getToday';
import { BehaviorSubject } from 'rxjs';
import { randomID } from '@core/helper/random-id';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {
  public wallets: Wallet[] = [];
  public walletType: WalletType[] = walletType;
  public moneyBill: InOutcome[] = [];
  public initMoneyService = new BehaviorSubject(null);
  constructor(private storage: Storage) {
    this.getListWallets();
  }

  getListWallets() {
    this.storage.ready().then(() => {
      this.storage.get('wallets').then(data => {
        if (data) {
          this.wallets = data;
        }
        this.initMoneyService.next(this.wallets);
      })
    })
  }

  getCurrentBalance() {
    let currentBalance = 0;
    this.wallets.forEach(wallet => {
      currentBalance += wallet.currentBalance
    });
    return currentBalance
  }

  getDataForChart() {
    let data = {
      date: [],
      data: []
    };
    this.wallets.forEach(wallet => {
      wallet.transactions.forEach(transaction => {
        if (transaction) {
          data.date.push(transaction.dateId);
          data.data.push(transaction.balance);
        }
      })
    })
    return data
  }

  get getWallet() {
    return this.wallets
  }

  get getMoneyBill() {
    return this.moneyBill
  }

  setListWallets(data: Wallet) {
    data.id = 'wallet_' + randomID();
    data.transactions = [];
    this.wallets.push(data);
    this.saveWallets();
  }

  saveWallets() {
    this.storage.ready().then(() => {
      this.storage.set(`wallets`, this.wallets).then(data => {
        this.initMoneyService.next(this.wallets);
      })
    })
  }

  updateWallets() {

  }

  setMoneyByDay(moneyBill: InOutcome, day = getToday()) {
    this.moneyBill.push(moneyBill);
    this.wallets.forEach(wallet => {
      if (wallet.name == moneyBill.wallet) {
        let transaction = wallet.transactions.find(bill => {
          return bill.dateId == day
        });
        if (transaction) {
          transaction.bill.push(moneyBill)
        } else {
          transaction = new Transaction(day, wallet.currentBalance, moneyBill.date);
          transaction.bill.push(moneyBill)
          wallet.transactions.push(transaction);
        }
        switch (moneyBill.type) {
          case 'income': {
            transaction.balance += moneyBill.money;
            transaction.income += moneyBill.money;
            wallet.currentBalance += moneyBill.money;
            break;
          }
          case 'outcome': {
            transaction.balance -= moneyBill.money;
            transaction.outcome += moneyBill.money;
            wallet.currentBalance -= moneyBill.money;
            break;
          }
        }
        this.saveWallets();
      }
    });
  }

  getBillByDay(day: string) {
    let result = [];
    this.wallets.forEach(wallet => {
      result = result.concat(wallet.transactions.filter(transaction => {
        return transaction.dateId == day
      }))
    })
    return result
  }

  getBillByMonth(month: number) {
    let result = [];
    this.wallets.forEach(wallet => {
      result = result.concat(wallet.transactions.filter(transaction => {
        let date = new Date(transaction.dateFilter)
        return date.getMonth() == month
      }))
    })
    return result
  }


}
