import express from "express";
import Portfolio from "../models/Portfolio.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: "Failed to load portfolio data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { stockSymbol, companyName, shares, buyPrice, note } = req.body;

    if (
      !stockSymbol ||
      !companyName ||
      shares === undefined ||
      buyPrice === undefined
    ) {
      return res.status(400).json({ message: "Missing portfolio fields" });
    }

    const portfolio = await Portfolio.create({
      user: req.user._id,
      stockSymbol,
      companyName,
      shares: Number(shares),
      buyPrice: Number(buyPrice),
      note,
    });

    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Failed to create portfolio item" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }

    res.json({ message: "Portfolio item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete portfolio item" });
  }
});

export default router;
