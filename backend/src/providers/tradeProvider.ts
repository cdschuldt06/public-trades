export type RawGovTrade = {
  politicianName: string;
  ticker: string;
  transactionType: string;
  amountMin: number;
  amountMax: number;
  transactionDate: Date;
  disclosureDate: Date;
};

export interface TradeProvider {
  fetchTrades(): Promise<RawGovTrade[]>;
}