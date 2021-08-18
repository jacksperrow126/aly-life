import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'aly-money-progress',
  templateUrl: './money-progress.component.html',
  styleUrls: ['./money-progress.component.scss'],
})
export class MoneyProgressComponent implements OnInit {
  @Input() progressTag;
  public progress: number;
  public daysOfTheMonth: number;
  public today: number;
  constructor() {}

  ngOnInit() {
    this.progress = (this.progressTag.progress / this.progressTag.max) * 100;
    this.daysOfTheMonth = this.daysInMonth(
      new Date().getMonth(),
      new Date().getFullYear()
    );
    this.today = new Date().getDate();
    if (this.progress > 100) {
      this.progress = 100;
    }
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
}
