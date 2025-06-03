import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    // Set up connection event listeners BEFORE connecting
    mongoose.connection.on("connected", () => {
      console.log("✅ Connected to MongoDB successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("🔌 MongoDB disconnected");
    });

    // Handle application termination
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log(
        "🔌  MongoDB connection closed due to application termination"
      );
      process.exit(0);
    });

    // Set connection options
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000, // 45 second socket timeout
      bufferCommands: false, // Disable mongoose buffering
      maxPoolSize: 10, // Maintain up to 10 socket connections
    };

    // Connect to MongoDB
    console.log("🔗 Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI!, options);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    throw new Error("Failed to connect to database");
  }
};

export default connectToDB;
