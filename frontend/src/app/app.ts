import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TradesService } from './services/trades.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private tradesService = inject(TradesService);

  trades: any[] = [];

    constructor() {
    this.tradesService.getTrades().subscribe((trades: any) => {
      console.log("Trades loaded:", trades);
      this.trades = trades;
    });
  }
}