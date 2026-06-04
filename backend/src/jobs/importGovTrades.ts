import { QuiverProvider } from "../providers/quiverProvider";

import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { importTrades } from "../ingestion/tradeImporter";

const normalize = (str: string) =>
  str.toLowerCase().replace(/\s+/g, " ").trim();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    const provider = new QuiverProvider();
    const rawTrades = await provider.fetchTrades();


    if (!rawTrades.length) {
        throw new Error("No trades parsed from government file");
    }

    const politicians = await prisma.politician.findMany();
    const tickers = await prisma.ticker.findMany();
    const mappedTrades = rawTrades
  .map((trade) => {
    const politician = politicians.find(
      (p) =>
        normalize(`${p.firstName} ${p.lastName}`) ===
        normalize(trade.politicianName)
    );

    const ticker = tickers.find(
      (t) => normalize(t.symbol) === normalize(trade.ticker)
    );

    if (!politician || !ticker) {
      console.warn(
        `Skipping trade: ${trade.politicianName} / ${trade.ticker}`
      );
      return null;
    }

    return {
      politicianId: politician.id,
      tickerId: ticker.id,
      transactionType: trade.transactionType,
      amountMin: trade.amountMin,
      amountMax: trade.amountMax,
      transactionDate: trade.transactionDate,
      disclosureDate: trade.disclosureDate,
    };
  })
  .filter(
    (t): t is {
      politicianId: number;
      tickerId: number;
      transactionType: string;
      amountMin: number;
      amountMax: number;
      transactionDate: Date;
      disclosureDate: Date;
    } => t !== null
  );
  await importTrades(prisma, mappedTrades);

  console.log("Government data imported successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });