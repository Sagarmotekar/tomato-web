import mongoose from "mongoose";
import foodModel from "./models/foodModel.js";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

async function fixImageUrls() {
  try {
    // Get all foods
    const foods = await foodModel.find({});
    console.log(`Found ${foods.length} food items`);

    for (const food of foods) {
      console.log(`\nFood: ${food.name}`);
      console.log(`Current image: ${food.image}`);
      
      // Check if image is already a full URL
      if (!food.image.startsWith('http')) {
        console.log(`  -> This needs to be fixed (it's a filename, not a URL)`);
        console.log(`  -> You need to re-upload this item through the admin panel`);
      } else {
        console.log(`  -> Already a valid URL ✓`);
      }
    }

    console.log("\n\n=== SUMMARY ===");
    console.log("Items with filenames (need re-upload):", foods.filter(f => !f.image.startsWith('http')).length);
    console.log("Items with valid URLs:", foods.filter(f => f.image.startsWith('http')).length);
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

fixImageUrls();
