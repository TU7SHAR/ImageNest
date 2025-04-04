import mongoose from "mongoose";

const connectDB = async () => {
  const MONGODB_URI =
    process.env.URI ||
    "mongodb+srv://gautamtushar00011:gautamtushar00011@cluster0.h3emy4a.mongodb.net/imageNest?retryWrites=true&w=majority&appName=Cluster0";
  console.log("URI:", MONGODB_URI);
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
