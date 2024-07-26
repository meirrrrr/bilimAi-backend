import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://meiirzhan04:Pifagor2016@cluster0.mikq3ld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB connected...");
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
