import { TradeProvider, RawGovTrade } from "../tradeProvider";

export class QuiverProvider implements TradeProvider {
  private apiKey = process.env.QUIVER_API_KEY;

  async fetchTrades(): Promise<RawGovTrade[]> {
    if (!this.apiKey) {
      throw new Error("Missing QUIVER_API_KEY in environment variables");
    }

    // NOTE: endpoint may vary depending on Quiver plan
    const res = await fetch("https://api.quiverquant.com/beta/live/congresstrading", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Quiver API error: ${res.status} - ${text}`);
    }

    const data = await res.json();

    // Map Quiver format → your internal format
    return data.map((t: any) => ({
      politicianName: t.Representative,
      ticker: t.Ticker,
      transactionType: t.Transaction,
      amountMin: t.Amount?.split("-")?.[0]?.replace(/\D/g, "") ?? 0,
      amountMax: t.Amount?.split("-")?.[1]?.replace(/\D/g, "") ?? 0,
      transactionDate: new Date(t.Date),
      disclosureDate: new Date(t.Date),
    }));
  }
}