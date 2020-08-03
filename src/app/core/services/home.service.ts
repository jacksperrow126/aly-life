import { Injectable } from '@angular/core';
import { quotes } from '@core/data/quotes'
import { Quote } from '@core/models/user/quotes.model';
import { Greeting } from '@core/helper/greeting';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private quotes: Quote[] = quotes;
  constructor() { }

  getRandomQuote(): Quote {
    let random = Math.floor(Math.random() * 102);
    return this.quotes[random]
  }

  getGreeting(time: number): string {
    let moment = '';
    if (time <= 12 && time > 5) moment = 'morning';
    if (time <= 18 && time > 12) moment = 'afternoon';
    if (time < 22 && time > 18) moment = 'evening';
    if (time <= 5 || time >= 22) moment = 'night';
    return Greeting[moment]
  }
}
