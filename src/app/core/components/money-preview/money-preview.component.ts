import { Component, OnInit } from '@angular/core';
import { MoneyService } from '@core/services/money.service';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'aly-money-preview',
  templateUrl: './money-preview.component.html',
  styleUrls: ['./money-preview.component.scss'],
})
export class MoneyPreviewComponent implements OnInit {
  public currentBalance: number;
  public loan: number;
  public inOutcomeColor = ['#e4eb26', '#eb3626'];
  public loanChartData: any[];
  public inOutcomeChartData: any[];

  constructor(private moneyService: MoneyService) {}

  ngOnInit() {
    this.moneyService.initMoneyService.subscribe((data) => {
      this.currentBalance = this.moneyService.getCurrentBalance();
      this.loan = this.moneyService.getCurrentLoan();
      this.loanChartData = [
        { name: 'Tổng tiền', y: this.currentBalance },
        { name: 'Tổng nợ', y: this.loan },
      ];
      const totalIncome = this.moneyService.getTotalInOutCome().totalIncome;
      const totalOutcome = this.moneyService.getTotalInOutCome().totalOutcome;
      this.inOutcomeChartData = [
        {
          name: 'Thu nhập',
          y: totalIncome,
        },
        {
          name: 'Chi tiêu',
          y: totalOutcome,
        },
      ];
    });
  }
}
