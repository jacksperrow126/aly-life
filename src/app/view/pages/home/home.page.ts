import { Component, OnInit } from '@angular/core';
import { Quote } from '@core/models/quotes.model';
import { HomeService } from '@core/services/home.service';

@Component({
  selector: 'aly-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public quote: Quote;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.quote = this.homeService.getRandomQuote();
    console.log(this.quote);

  }

}
