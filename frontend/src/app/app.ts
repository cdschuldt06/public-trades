import { Component, inject, signal } from '@angular/core';
import { TradesService } from './services/trades.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private tradesService = inject(TradesService);

  trades = signal<any[]>([]);

  constructor() {
    this.tradesService.getTrades().subscribe((trades: any) => {
      this.trades.set(trades);
    });
  }
}