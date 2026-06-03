import { prisma } from "../lib/prisma";

export async function getAllTrades() {
  return prisma.trade.findMany({
    include: {
      politician: true,
      ticker: true,
    },
  });
}