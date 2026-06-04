import { PrismaClient } from "../generated/prisma/client";

type TradeInput = {
  politicianId: number;
  tickerId: number;
  transactionType: string;
  amountMin: number;
  amountMax: number;
  transactionDate: Date;
  disclosureDate: Date;
};

export async function importTrades(
  prisma: PrismaClient,
  trades: TradeInput[]
) {
  for (const trade of trades) {
    await prisma.trade.create({
      data: trade,
    });
  }
}