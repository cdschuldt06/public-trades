import { prisma } from "../lib/prisma";

export async function getAllPoliticians() {
  return prisma.politician.findMany();
}

export async function getPoliticianById(id: number) {
  return prisma.politician.findUnique({
    where: { id },
    include: {
      trades: {
        include: {
          ticker: true,
        },
      },
    },
  });
}