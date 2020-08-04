import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'aly-money-progress',
  templateUrl: './money-progress.component.html',
  styleUrls: ['./money-progress.component.scss'],
})
export class MoneyProgressComponent implements OnInit {
  @Input() progressTag;
  public progress: number;
  constructor() { }

  ngOnInit() {
    this.progress = this.progressTag.progress / this.progressTag.max * 100;
    if (this.progress > 100) {
      this.progress = 100
    }
    console.log(this.progress);

  }

}
