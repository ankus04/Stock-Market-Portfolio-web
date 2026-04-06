import express from "express";
import User from "../models/User.js";
import Portfolio from "../models/Portfolio.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    const counts = await Portfolio.aggregate([
      {
        $group: {
          _id: "$user",
          totalPortfolios: { $sum: 1 },
          totalInvested: { $sum: { $multiply: ["$shares", "$buyPrice"] } },
        },
      },
    ]);

    const countMap = new Map(counts.map((item) => [String(item._id), item]));

    const response = users.map((user) => {
      const portfolioInfo = countMap.get(String(user._id));
      return {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        country: user.country,
        hobby: user.hobby,
        role: user.role,
        createdAt: user.createdAt,
        totalPortfolios: portfolioInfo?.totalPortfolios || 0,
        totalInvested: portfolioInfo?.totalInvested || 0,
      };
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Failed to load users" });
  }
});

router.get("/users/:userId/portfolios", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const portfolios = await Portfolio.find({ user: req.params.userId }).sort({
      createdAt: -1,
    });

    res.json({ user, portfolios });
  } catch (error) {
    res.status(500).json({ message: "Failed to load user portfolios" });
  }
});

export default router;
