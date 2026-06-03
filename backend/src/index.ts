import express from "express";

import tradesRouter from "./routes/trades";
import politiciansRouter from "./routes/politicians";

const app = express();
const port = 3000;

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

app.use("/politicians", politiciansRouter);
app.use("/trades", tradesRouter);

app.listen(port, () => {
  console.log(`PublicTrades API running on http://localhost:${port}`);
});