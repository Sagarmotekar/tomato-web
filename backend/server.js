import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

// app config
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*", // TEMP: allow all (fix later)
    credentials: true
  })
);

// database connection
connectDB();

// api routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ❌ uploads folder is NOT reliable on Render
// app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Backend API is running successfully 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
