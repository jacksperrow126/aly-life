import { Component, OnInit } from '@angular/core';
import { TagPlan } from '@core/models/money/tag-plan.model';
import { MoneyService } from '@core/services/money.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'aly-money-plan-container',
  templateUrl: './money-plan-container.component.html',
  styleUrls: ['./money-plan-container.component.scss'],
})
export class MoneyPlanContainerComponent implements OnInit {
  public incomePlan: TagPlan[];
  public outcomePlan: TagPlan[];
  public selectedTag: TagPlan;
  public isShowSlider: boolean = false;
  constructor(private moneyService: MoneyService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.moneyService.initMoneyService.subscribe(data => {
      this.incomePlan = this.moneyService.incomePlan;
      this.outcomePlan = this.moneyService.outcomePlan;
    });
  }

  choose(plan) {
    this.selectedTag = plan;
    this.isShowSlider = true
  }

  submitChange() {
    this.isShowSlider = false;
    this.moneyService.changePlan(this.selectedTag);
    this._snackBar.open('Thành công rồi!', '', { duration: 1000, })
  }
}
