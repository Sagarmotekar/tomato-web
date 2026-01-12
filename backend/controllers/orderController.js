import express from "express";
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", placeOrder);
router.post("/verify", verifyOrder);
router.post("/userorders", userOrders);
router.get("/list", listOrders); // admin view
router.post("/status", updateStatus); // update order status

export default router;
