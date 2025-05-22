import express from "express";
import { OrderController }  from '../controllers/OrderController.js';
import {
  validateNewOrderBody,
  validateIdParam,
  validateProfileIdParam,
  validateOrderStatusBody,
  validateProductDateQuery,
} from "../validators/orderValidator.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Skapa order
router.post("/", authenticate, validateNewOrderBody, OrderController.createOrder);

// Hämta aktiv order
// router.get("/active", OrderController.getActiveOrder);

// Hämta full order med items
router.get(
  "/:orderId/full",
  validateIdParam,
  OrderController.getOrderWithItemsById
);

// Hämta order via ID
router.get("/:id", validateIdParam, OrderController.getOrder);

// Hämta orders för en profil (basic)
router.get(
  "/profile/:profileId",
  validateProfileIdParam,
  OrderController.getOrdersByProfile
);

// Hämta orders med items för en profil
router.get(
  "/with-items/profile/:profileId",
  validateProfileIdParam,
  OrderController.getOrdersWithItemsByProfile
);

// Hämta full orderhistorik för en profil
router.get(
  "/history/:profileId",
  validateProfileIdParam,
  OrderController.getFullOrderHistory
);

// Uppdatera orderstatus
router.patch(
  "/:id/status",
  validateIdParam,
  validateOrderStatusBody,
  OrderController.updateStatus
);

// Ta bort order
router.delete("/:id", validateIdParam, OrderController.deleteOrder);

// Bekräfta order och uppdatera lagersaldo
router.patch("/:id/confirm", validateIdParam, OrderController.confirmOrder);

// Hämta orderitems för produkt och datumintervall
router.get(
  "/product/:productId",
  validateProductDateQuery,
  OrderController.getOrderItemsByProductAndDateRange
);

export default router;
