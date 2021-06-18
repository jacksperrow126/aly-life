import { InOutcome } from './in-outcome.model';

export interface Wallet {
  id: string;
  name: string;
  currentBalance: number;
  type: string;
  detail?: string;
  transactions: Transaction[];
  margin?: number;
  notMine?: number;
  grossBalance?: number;
  loan?: number;
}

export class Transaction {
  dateId: string;
  dateFilter: Date;
  bill: InOutcome[];
  balance: number;
  income: number;
  outcome: number;

  constructor(date, balance, dateFilter) {
    this.dateId = date;
    this.dateFilter = dateFilter;
    this.balance = balance;
    this.income = 0;
    this.outcome = 0;
    this.bill = [];
  }
}
