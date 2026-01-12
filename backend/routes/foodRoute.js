import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/add", upload.single("image"), addFood);
router.get("/list", listFood);
router.post("/remove", removeFood);

export default router;
