import { TagPlan } from './../models/money/tag-plan.model';
import { moneyOutcomeType, moneyIncomeType } from '@core/data/money';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  Wallet,
  Transaction,
  WalletDataFromDB,
} from '@core/models/money/wallet.model';
import { WalletType } from '@core/models/money/wallet-types.model';
import { walletType, WalletTypeString } from '@core/data/wallet-type';
import { InOutcome } from '@core/models/money/in-outcome.model';
import { getToday } from '@core/helper/getToday';
import { BehaviorSubject } from 'rxjs';
import { randomID } from '@core/helper/random-id';
import { Stock } from '@core/models/money/stock.model';
import { HttpClient } from '@angular/common/http';
import { backEndUrl, apiRoutes } from './api';

@Injectable({
  providedIn: 'root',
})
export class MoneyService {
  public wallets: Wallet[] = [];
  public walletType: WalletType[] = walletType;
  public moneyBill: InOutcome[] = [];
  public initMoneyService = new BehaviorSubject(null);
  public incomePlan: TagPlan[] = [];
  public outcomePlan: TagPlan[] = [];
  public inOutInMonth = [];
  public inOutType = [];
  public stockList: Stock[] = [];
  public changeStockList = new BehaviorSubject(null);
  public moneyServiceError = new BehaviorSubject(null);

  constructor(private storage: Storage, private http: HttpClient) {
    this.getListWallets();
    this.getStock();
    this.checkPlanAndSetDefault();
    moneyIncomeType.forEach((type) => {
      this.inOutType.push(type.id);
    });
    moneyOutcomeType.forEach((type) => {
      this.inOutType.push(type.id);
    });
  }

  backUpWalletsData(data) {
    return this.http.post(backEndUrl + apiRoutes.money.backUp, {
      username: 'admin_test',
      data: JSON.stringify(data),
    });
  }

  getWalletsData() {
    return this.http.post(backEndUrl + apiRoutes.money.getWallets, {
      username: 'admin_test',
    });
  }

  getListWallets() {
    this.storage.ready().then(() => {
      this.storage.get('wallets').then((data) => {
        if (data) {
          this.wallets = data;
          // this.getWalletsData().subscribe(
          //   (walletDataFromDB: WalletDataFromDB) => {
          //     if (walletDataFromDB.data) {
          //       this.wallets = JSON.parse(walletDataFromDB.data);
          //     }
          //   }
          //   );
        } else {
          this.wallets = [];
        }
        this.initMoneyService.next(this.wallets);
      });
    });
  }

  getCurrentBalance() {
    let currentBalance = 0;
    this.wallets.forEach((wallet) => {
      if (wallet.type !== WalletTypeString.TIN_DUNG) {
        currentBalance += wallet.currentBalance;
      }
    });
    return currentBalance;
  }

  getCurrentLoan() {
    let loan = 0;
    this.wallets.forEach((wallet) => {
      loan += wallet.loan || wallet.margin || 0;
    });
    return loan;
  }

  getDataForChart() {
    const data = [];
    this.wallets.forEach((wallet) => {
      wallet.transactions.forEach((transaction) => {
        if (transaction) {
          data.push([new Date(transaction.dateFilter), transaction.balance]);
        }
      });
    });
    return data;
  }

  get getWallet() {
    return this.wallets;
  }

  get getMoneyBill() {
    return this.moneyBill;
  }

  get getIncomePlan() {
    return this.incomePlan;
  }

  get getOutcomePlan() {
    return this.outcomePlan;
  }

  getTotalInOutCome() {
    const data = this.getInOutcomeMoneyByTag(new Date().getMonth());
    const incomeProgress = [];
    const outcomeProgress = [];
    const outcomePlan = moneyOutcomeType.map((type) => {
      return type.id;
    });
    const incomePlan = moneyIncomeType.map((type) => {
      return type.id;
    });
    Object.keys(data).map((tag, i) => {
      incomePlan.find((id) => {
        if (id === tag) {
          incomeProgress.push({
            progress: data[tag],
          });
          return;
        }
      });
      outcomePlan.find((id) => {
        if (id === tag) {
          outcomeProgress.push({
            progress: data[tag],
          });
          return;
        }
      });
    });
    let totalIncome = 0;
    let totalOutcome = 0;
    incomeProgress.forEach((progress) => {
      totalIncome += progress.progress;
    });
    outcomeProgress.forEach((progress) => {
      totalOutcome += progress.progress;
    });

    return { totalIncome, totalOutcome };
  }

  setListWallets(data: Wallet) {
    data.id = 'wallet_' + randomID();
    data.transactions = [];
    this.wallets.push(data);
    this.saveWallets();
  }

  saveWallets() {
    this.storage.ready().then(() => {
      this.storage.set(`wallets`, this.wallets).then((data) => {
        this.initMoneyService.next(this.wallets);
        // this.backUpWalletsData(this.wallets).subscribe((res) => {
        //   console.log('backup data', res);
        // });
      });
    });
  }

  transferMoney(data) {
    let isErr = false;
    const fromWallet = this.wallets.find(
      (wallet) => wallet.name === data.wallet
    );
    if (fromWallet.currentBalance < data.money) {
      isErr = true;
    }
    if (fromWallet.cash !== undefined && fromWallet.cash < data.money) {
      isErr = true;
    }
    if (!isErr) {
      const toWallet = this.wallets.find(
        (wallet) => wallet.name === data.toWallet
      );

      this.wallets.forEach((wallet) => {
        if (wallet.name === data.wallet) {
          wallet.currentBalance -= data.money;

          // Add Cash and Investment value if from wallet is Co Phieu
          if (fromWallet.type === WalletTypeString.CO_PHIEU) {
            wallet.cash -= data.money;
            if (data.money > wallet.investmentValue) {
              wallet.currentBalance -= data.money - wallet.investmentValue;
              this.setMoneyByDay(
                {
                  ...data,
                  money: data.money - wallet.investmentValue,
                  type: 'income',
                  tag: 'lai',
                },
                getToday(data.date)
              );
              wallet.investmentValue = 0;
            } else {
              wallet.investmentValue -= data.money;
            }
          }

          // Set bill when transfer to Tin Dung wallet
          if (toWallet.type === WalletTypeString.TIN_DUNG) {
            const reducer = (total: number, currentValue: Transaction) =>
              total + currentValue.outcome - currentValue.income;

            const totalMoneyHadSpentOnCredit = toWallet.transactions.reduce(
              reducer,
              0
            );
            const netValue =
              totalMoneyHadSpentOnCredit > 0
                ? data.money - totalMoneyHadSpentOnCredit
                : data.money;
            fromWallet.currentBalance += netValue;

            this.setMoneyByDay(
              {
                ...data,
                money: netValue,
                type: 'outcome',
                tag: 'credit',
              },
              getToday(data.date)
            );
            toWallet.transactions[0].income += data.money;
          }
        }
        if (wallet.name === data.toWallet) {
          wallet.currentBalance += data.money;
          if (toWallet.type === WalletTypeString.CO_PHIEU) {
            wallet.cash += data.money;
            wallet.investmentValue += data.money;
          }
          if (wallet.type === WalletTypeString.TIN_DUNG) {
            if (wallet.loan < data.money) {
              wallet.loan = 0;
            } else {
              wallet.loan -= data.money;
            }
          }
        }
      });
      this.saveWallets();
    }
  }

  setMoneyByDay(moneyBill: InOutcome, day = getToday()) {
    this.moneyBill.push(moneyBill);
    this.wallets.forEach((wallet) => {
      if (wallet.name === moneyBill.wallet) {
        let transaction = wallet.transactions.find((bill) => {
          return bill.dateId === day;
        });
        if (transaction) {
          transaction.bill.push(moneyBill);
        } else {
          transaction = new Transaction(
            day,
            wallet.currentBalance,
            moneyBill.date
          );
          transaction.bill.push(moneyBill);
          wallet.transactions.push(transaction);
        }
        switch (moneyBill.type) {
          case 'income': {
            transaction.balance += moneyBill.money;
            transaction.income += moneyBill.money;
            wallet.currentBalance += moneyBill.money;
            if (wallet.type === WalletTypeString.TIN_DUNG) {
              wallet.loan -= moneyBill.money;
            }
            break;
          }
          case 'outcome': {
            transaction.balance -= moneyBill.money;
            transaction.outcome += moneyBill.money;
            wallet.currentBalance -= moneyBill.money;
            if (wallet.type === WalletTypeString.TIN_DUNG) {
              wallet.loan += moneyBill.money;
            }
            break;
          }
        }
        this.saveWallets();
      }
    });
  }

  deleteBill(moneyBill: InOutcome) {
    this.wallets.forEach((wallet) => {
      if (wallet.name === moneyBill.wallet) {
        const transaction = wallet.transactions.find((bill) => {
          return bill.dateId === getToday(moneyBill.date);
        });
        if (transaction) {
          const bill = transaction.bill.find(
            (bills) => bills.id === moneyBill.id
          );
          transaction.bill.splice(transaction.bill.indexOf(bill), 1);
        }
        switch (moneyBill.type) {
          case 'income': {
            transaction.balance -= moneyBill.money;
            transaction.income -= moneyBill.money;
            wallet.currentBalance -= moneyBill.money;
            if (wallet.type === WalletTypeString.TIN_DUNG) {
              wallet.loan += moneyBill.money;
            }
            break;
          }
          case 'outcome': {
            transaction.balance += moneyBill.money;
            transaction.outcome -= moneyBill.money;
            wallet.currentBalance += moneyBill.money;
            if (wallet.type === WalletTypeString.TIN_DUNG) {
              wallet.loan -= moneyBill.money;
            }
            break;
          }
        }
        this.saveWallets();
      }
    });
  }

  getBillByDay(day: string) {
    let result = [];
    this.wallets.forEach((wallet) => {
      result = result.concat(
        wallet.transactions.filter((transaction) => {
          return transaction.dateId === day;
        })
      );
    });
    return result;
  }

  getBillByMonth(month: number) {
    const result = [];
    this.wallets.forEach((wallet) => {
      wallet.transactions.forEach((transaction) => {
        const date = new Date(transaction.dateFilter);
        if (date.getMonth() === month) {
          const dataByDay = result.find(
            (data) => data.date === transaction.dateId
          );
          if (dataByDay) {
            dataByDay.bills = [...dataByDay.bills, ...transaction.bill];
          } else {
            result.push({ bills: transaction.bill, date: transaction.dateId });
          }
        }
      });
    });
    return result.reverse();
  }

  getInOutcomeMoneyByTag(month: number) {
    const data = {};
    this.inOutType.forEach((type) => {
      data[type] = 0;
    });
    this.wallets.forEach((wallet) => {
      wallet.transactions.forEach((transaction) => {
        transaction.bill.forEach((bill) => {
          const billDate = new Date(bill.date);
          if (billDate.getMonth() === month) {
            data[bill.tag] += bill.money;
          }
        });
      });
    });
    return data;
  }

  checkPlanAndSetDefault() {
    const PLANS_KEY = 'plans-setted';
    this.storage.ready().then(() => {
      this.storage.get(PLANS_KEY).then((data) => {
        if (data === null) {
          this.storage.set(PLANS_KEY, true).then(() => {
            moneyOutcomeType.forEach((outcome) => {
              this.storage
                .set('planOutcome' + outcome.id, {
                  id: outcome.id,
                  name: outcome.name,
                  value: 100000,
                  type: 'outcome',
                  icon: outcome.icon,
                })
                .then((outcomeData) => {
                  this.outcomePlan.push(outcomeData);
                });
            });
            moneyIncomeType.forEach((income) => {
              this.storage
                .set('planIncome' + income.id, {
                  id: income.id,
                  name: income.name,
                  value: 1000000,
                  type: 'income',
                  icon: income.icon,
                })
                .then((incomeData) => {
                  this.incomePlan.push(incomeData);
                });
            });
          });
        } else {
          this.getPlan();
        }
      });
    });
  }

  getPlan() {
    this.storage.ready().then(() => {
      moneyIncomeType.forEach((income) => {
        this.storage.get('planIncome' + income.id).then((data) => {
          this.incomePlan.push(data);
        });
      });
      moneyOutcomeType.forEach((outcome) => {
        this.storage.get('planOutcome' + outcome.id).then((data) => {
          this.outcomePlan.push(data);
        });
      });
    });
  }

  changePlan(changedPlan: TagPlan) {
    this.storage.ready().then(() => {
      if (changedPlan.type === 'income') {
        this.storage
          .set('planIncome' + changedPlan.id, changedPlan)
          .then(() => {
            this.incomePlan.forEach((plan) => {
              if (plan.id === changedPlan.id) {
                plan.value = changedPlan.value;
              }
            });
          });
      } else {
        this.storage
          .set('planOutcome' + changedPlan.id, changedPlan)
          .then(() => {
            this.incomePlan.forEach((plan) => {
              if (plan.id === changedPlan.id) {
                plan.value = changedPlan.value;
              }
            });
          });
      }
    });
  }

  addStock(stockInfo: Stock) {
    const stockWallet = this.wallets.find(
      (wallet) => wallet.type === WalletTypeString.CO_PHIEU
    );

    const currentStock = this.stockList.find(
      (stock) => stock.code === stockInfo.code
    );

    if (currentStock) {
      if (currentStock.volume !== stockInfo.volume) {
        const netValue = stockInfo.value - stockInfo.margin;
        if (netValue > stockWallet.cash) {
          this.moneyServiceError.next({
            isErr: true,
            message: 'Giá trị mua lớn hơn số tiền hiện có',
          });
          return;
        }
        stockWallet.cash =
          stockWallet.cash -
          (stockInfo.value - currentStock.value) +
          stockInfo.margin -
          currentStock.margin;
      }
      Object.keys(currentStock).forEach((key) => {
        currentStock[key] = stockInfo[key];
      });
    } else {
      const netValue = stockInfo.value - stockInfo.margin;
      if (netValue > stockWallet.cash) {
        this.moneyServiceError.next({
          isErr: true,
          message: 'Giá trị mua lớn hơn số tiền hiện có',
        });
        return;
      }
      this.stockList.push(stockInfo);
      stockWallet.cash = stockWallet.cash - stockInfo.value + stockInfo.margin;
    }
    this.saveStock();
  }

  sellStock(stockCode: string) {
    const currentStock = this.stockList.find(
      (stock) => stock.code === stockCode
    );
    if (currentStock) {
      const stockWallet = this.wallets.find(
        (wallet) => wallet.type === WalletTypeString.CO_PHIEU
      );
      stockWallet.cash =
        stockWallet.cash + currentStock.value - currentStock.margin;

      this.stockList.splice(this.stockList.indexOf(currentStock), 1);
    }
    this.saveStock();
  }

  getStock() {
    this.storage.ready().then(() => {
      this.storage.get('stock').then((data) => {
        if (data) {
          this.stockList = data;
        }
      });
    });
  }

  saveStock() {
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
    stockWallet.currentBalance =
      stockWallet.cash + stockWallet.grossBalance - stockWallet.margin;
    this.storage.ready().then(() => {
      this.storage.set('stock', this.stockList).then((data) => {});
    });
    this.saveWallets();
    this.changeStockList.next('Changed');
  }
}
