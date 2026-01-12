import mongoose from "mongoose";
import foodModel from "./models/foodModel.js";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

async function deleteAllFoods() {
  try {
    const result = await foodModel.deleteMany({});
    console.log(`✓ Deleted ${result.deletedCount} food items from database`);
    console.log("\nNow you can re-upload your food items through the admin panel.");
    console.log("The new uploads will have proper Cloudinary URLs and images will display correctly.");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

deleteAllFoods();
