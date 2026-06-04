import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { importTrades } from "../ingestion/tradeImporter";
import { fetchGovTrades } from "../fetchers/senateTradesFetcher";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const rawTrades = await fetchGovTrades();

  const politicians = await prisma.politician.findMany();
  const tickers = await prisma.ticker.findMany();

  const mappedTrades = rawTrades.map((trade) => {
    const politician = politicians.find(
      (p) => `${p.firstName} ${p.lastName}` === trade.politicianName
    );

    const ticker = tickers.find((t) => t.symbol === trade.ticker);

    if (!politician || !ticker) {
      throw new Error(
        `Missing match for ${trade.politicianName} or ${trade.ticker}`
      );
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
  });

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