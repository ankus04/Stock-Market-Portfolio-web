import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Stock Market Portfolio API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/admin", adminRoutes);

const seedAdmin = async () => {
  const adminEmail = "umashankar19249@gmail.com";
  const adminPasswordHash = await bcrypt.hash("Uma@54321", 10);
  const existingAdmin = await User.findOne({
    $or: [{ email: adminEmail }, { username: "uma004" }],
  });

  if (existingAdmin) {
    let updated = false;

    if (existingAdmin.role !== "admin") {
      existingAdmin.role = "admin";
      updated = true;
    }

    if (existingAdmin.fullName !== "admin_uma") {
      existingAdmin.fullName = "admin_uma";
      updated = true;
    }

    if (existingAdmin.country !== "India") {
      existingAdmin.country = "India";
      updated = true;
    }

    if (existingAdmin.hobby !== "Stock research") {
      existingAdmin.hobby = "Stock research";
      updated = true;
    }

    existingAdmin.username = "uma004";
    existingAdmin.email = adminEmail;
    existingAdmin.password = adminPasswordHash;
    updated = true;

    if (updated) {
      await existingAdmin.save();
    }

    return;
  }

  await User.create({
    fullName: "admin_uma",
    username: "uma004",
    email: adminEmail,
    password: adminPasswordHash,
    country: "India",
    hobby: "Stock research",
    role: "admin",
  });
};

const startServer = async () => {
  await connectDB();
  await seedAdmin();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
