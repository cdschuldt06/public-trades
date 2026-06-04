import { TradeProvider, RawGovTrade } from "./tradeProvider";

export class QuiverProvider implements TradeProvider {
  async fetchTrades(): Promise<RawGovTrade[]> {
    // TODO: replace with real Quiver API call
    // For now we simulate structure so system stays stable

    return [
      {
        politicianName: "Nancy Pelosi",
        ticker: "NVDA",
        transactionType: "Purchase",
        amountMin: 100001,
        amountMax: 250000,
        transactionDate: new Date(),
        disclosureDate: new Date(),
      },
    ];
  }
}