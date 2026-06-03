import express from "express";

const app = express();
const port = 3000;

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

app.listen(port, () => {
  console.log(`PublicTrades API running on http://localhost:${port}`);
});