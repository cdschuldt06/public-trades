import { Component, inject } from '@angular/core';
import { TradesService } from './services/trades.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private tradesService = inject(TradesService);

  constructor() {
    this.tradesService.getTrades().subscribe((trades) => {
      console.log(trades);
    });
  }
}