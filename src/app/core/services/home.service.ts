import { Injectable } from '@angular/core';
import { quotes } from '@core/data/quotes'
import { Quote } from '@core/models/quotes.model';
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
}
