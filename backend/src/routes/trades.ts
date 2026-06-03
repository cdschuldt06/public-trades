import { Router } from "express";
import { getAllTrades } from "../services/tradeService";

const router = Router();

router.get("/", async (_req, res) => {
  const trades = await getAllTrades();

  res.json(trades);
});

export default router;