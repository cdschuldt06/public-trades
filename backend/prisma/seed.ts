import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { politicians } from "./seed-data/politicians";
import { tickers } from "./seed-data/tickers";
import { trades } from "./seed-data/trades";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  for (const politician of politicians) {
    await prisma.politician.create({
      data: politician,
    });
  }

  for (const ticker of tickers) {
    await prisma.ticker.create({
      data: ticker,
    });
  }

  for (const trade of trades) {
    const politician = await prisma.politician.findFirstOrThrow({
      where: {
        lastName: trade.politicianLastName,
      },
    });

    const ticker = await prisma.ticker.findUniqueOrThrow({
      where: {
        symbol: trade.tickerSymbol,
      },
    });

    await prisma.trade.create({
      data: {
        politicianId: politician.id,
        tickerId: ticker.id,
        transactionType: trade.transactionType,
        amountMin: trade.amountMin,
        amountMax: trade.amountMax,
        transactionDate: trade.transactionDate,
        disclosureDate: trade.disclosureDate,
      },
    });
  }

  console.log("Database seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });