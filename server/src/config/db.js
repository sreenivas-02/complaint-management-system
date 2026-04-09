import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/complaint_management";
  try {
    await mongoose.connect(uri, {
      dbName: "complaint_management",
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error", err);
    throw err;
  }
};

export default connectDB;

