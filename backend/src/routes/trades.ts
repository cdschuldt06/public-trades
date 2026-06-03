import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (_req, res) => {
  const trades = await prisma.trade.findMany({
    include: {
      politician: true,
      ticker: true,
    },
  });

  res.json(trades);
});

export default router;