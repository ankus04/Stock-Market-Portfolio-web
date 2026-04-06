import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri =
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/stock-market-portfolio";

  try {
    if (!process.env.MONGODB_URI) {
      console.log(
        "MONGODB_URI not found in environment. Using default local MongoDB URI."
      );
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
