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
  private inAnimation = false;
  public greeting: string;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.quote = this.homeService.getRandomQuote();
    this.getGreeting()
  }

  pressAnimation(card: HTMLElement){
    if(this.inAnimation) return;
    card.classList.add('press');
    this.inAnimation = true;
    setTimeout(()=>{
      this.inAnimation = false;
      card.classList.remove('press')
    },1000)
  }

  getGreeting(){
    let date = new Date();
    this.greeting = this.homeService.getGreeting(date.getHours());
  }
}
