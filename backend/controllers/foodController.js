import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";

// Add food
const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Validate all fields
    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Validate image upload
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Food image is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    const food = await foodModel.create({
      name,
      description,
      price,
      category,
      image: result.secure_url,
    });
    return res.status(201).json({ success: true, food });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "food_images",
    });

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: result.secure_url, // Full Cloudinary URL
    });

    await food.save();

    res.status(201).json({ success: true, message: "Food Added", data: food });
  } catch (error) {
    console.error("Add Food Error:", error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

// List all foods
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.error("List Food Error:", error);
    res.status(500).json({ success: false, message: "Error fetching food list" });
  }
};

// Remove food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Delete image from Cloudinary if exists
    if (food.image) {
      // Extract public_id from URL
      const parts = food.image.split("/");
      const publicIdWithExt = parts[parts.length - 1]; // e.g., food_13.png
      const publicId = `food_images/${publicIdWithExt.split(".")[0]}`;
      await cloudinary.uploader.destroy(publicId);
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("Remove Food Error:", error);
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};

export { addFood, listFood, removeFood };
