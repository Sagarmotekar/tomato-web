import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";

const router = express.Router();

// Wrap router in a function to inject multer upload
const foodRouter = (upload) => {
  router.post("/add", upload.single("image"), addFood);
  router.get("/list", listFood);
  router.post("/remove", removeFood);
  return router;
};

export default foodRouter;
