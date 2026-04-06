import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stockSymbol: { type: String, required: true, uppercase: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    shares: { type: Number, required: true, min: 1 },
    buyPrice: { type: Number, required: true, min: 0 },
    note: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);
