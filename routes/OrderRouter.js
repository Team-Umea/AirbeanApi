import express from "express";
import { OrderController } from "../controllers/OrderController.js";

const router = express.Router();

router.post("/", OrderController.createOrder);

router.get("/:id", OrderController.getOrder);

router.get("/:orderId/full", OrderController.getOrderWithItemsById);

router.get("/profile/:profileId", OrderController.getOrdersByProfile);

router.get("/history/:profileId", OrderController.getFullOrderHistory);

router.patch("/:id/status", OrderController.updateStatus);

router.delete("/:id", OrderController.deleteOrder);

router.patch("/:id/confirm", OrderController.confirmOrder);

// GET /orders/product/:productId?start=YYYY-MM-DD&end=YYYY-MM-DD
router.get(
  "/product/:productId",
  OrderController.getOrderItemsByProductAndDateRange
);

export default router;
