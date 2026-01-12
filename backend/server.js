import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import multer from "multer"; // for image uploads

// Import routes
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL, // allow your frontend
  credentials: true
}));

// For file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Routes
app.use("/api/food", foodRouter(upload)); // pass upload middleware
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Test API
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
