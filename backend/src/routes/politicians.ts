import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (_req, res) => {
  const politicians = await prisma.politician.findMany();

  res.json(politicians);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid politician ID" });
  }

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

  if (!politician) {
    return res.status(404).json({ error: "Politician not found" });
  }

  res.json(politician);
});

export default router;