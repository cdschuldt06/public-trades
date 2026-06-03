import express from "express";
import { prisma } from "./lib/prisma";

const app = express();
const port = 3000;

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

app.get("/trades", async (_req, res) => {
  const trades = await prisma.trade.findMany({
    include: {
      politician: true,
      ticker: true,
    },
  });

  res.json(trades);
});

app.get("/politicians", async (_req, res) => {
  const politicians = await prisma.politician.findMany();

  res.json(politicians);
});

app.get("/politicians/:id", async (req, res) => {
  const id = Number(req.params.id);

  const politician = await prisma.politician.findUnique({
    where: { id },
    include: {
      trades: {
        include: {
          ticker: true,
        },
      },
    },
  });

  res.json(politician);
});

app.listen(port, () => {
  console.log(`PublicTrades API running on http://localhost:${port}`);
});