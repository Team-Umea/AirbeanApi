import { OrderService } from "../services/orderService.js";
import {
  orderSchema,
  orderStatusSchema,
  orderIdParamSchema,
  profileIdParamSchema,
  productDateQuerySchema,
} from "../validators/orderValidator.js";
import { z } from "zod";

export const OrderController = {
  createOrder: async (req, res) => {
    try {
      const parsed = orderSchema.parse(req.body);
      const profile_id = req.user.id;

      const order = await OrderService.createOrder({
        ...parsed,
        profile_id,
        order_status: "Behandlas",
      });

      // Beräknar uppskattad leveranstid
      const estimatedDeliveryTime = new Date(Date.now() + 15 * 60 * 1000);

      // Ger beräknad tid kvar i sekunder
      //Starta en timer med värdet på countdownSeconds och dekrementera den varje sekund
      const countdownSeconds = Math.floor((estimatedDeliveryTime - Date.now()) / 1000);

      res.status(201).json({
        ...order,
        estimatedDeliveryTime: estimatedDeliveryTime.toISOString(),
        countdownSeconds,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      res.status(500).json({ error: "Failed to create order" });
    }
  },

  getOrder: async (req, res) => {
    try {
      const { id } = orderIdParamSchema.parse(req.params);
      const order = await OrderService.getOrderById(Number(id));
      if (!order) return res.status(404).json({ error: "Order not found" });

      res.json(order);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
      res.status(500).json({ error: "Failed to fetch order" });
    }
  },

  getOrderWithItemsById: async (req, res) => {
    try {
      const { id: orderId } = orderIdParamSchema.parse({
        id: req.params.orderId,
      });
      const fullOrder = await OrderService.getOrderWithItemsById(Number(orderId));
      if (!fullOrder) return res.status(404).json({ error: "Order not found" });

      res.json(fullOrder);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
      res.status(500).json({ error: "Failed to fetch full order" });
    }
  },

  getOrdersByProfile: async (req, res) => {
    try {
      const profile_id = req.user.id;
      const orders = await OrderService.getOrdersByProfileId(profile_id);
      res.json(orders);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  },

  getOrdersWithItemsByProfile: async (req, res) => {
    try {
      const { profileId } = profileIdParamSchema.parse(req.params);
      const orders = await OrderService.getOrdersWithItemsByProfileId(Number(profileId));
      res.json(orders);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
      res.status(500).json({ error: "Failed to fetch orders with items" });
    }
  },

  getFullOrderHistory: async (req, res) => {
    try {
      const profile_id = req.user.id;
      const history = await OrderService.getFullOrderHistory(profile_id);
      res.json(history);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
      res.status(500).json({ error: "Failed to fetch order history" });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { id } = orderIdParamSchema.parse(req.params);
      const { newStatus } = orderStatusSchema.parse(req.body);

      const updated = await OrderService.updateOrderStatus(Number(id), newStatus);

      if (!updated) return res.status(404).json({ error: "Order not found" });

      res.json({ success: true, status: newStatus });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
      res.status(500).json({ error: "Failed to update status" });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const { id } = orderIdParamSchema.parse(req.params);
      const deleted = await OrderService.deleteOrder(Number(id));
      if (!deleted) return res.status(404).json({ error: "Order not found" });

      res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
      res.status(500).json({ error: "Failed to delete order" });
    }
  },

  confirmOrder: async (req, res) => {
    try {
      const { id } = orderIdParamSchema.parse(req.params);
      const confirmedOrder = await OrderService.confirmOrder(Number(id));
      if (!confirmedOrder) {
        return res.status(404).json({ error: "Order not found or cannot be confirmed" });
      }
      res.status(200).json({
        message: "Order confirmed successfully",
        order: confirmedOrder,
      });
    } catch (err) {
      console.error("Error in confirmOrder:", err);
      res.status(500).json({ error: "Failed to confirm order", details: err.message });
    }
  },

  getOrderItemsByProductAndDateRange: async (req, res) => {
    try {
      const parsed = productDateQuerySchema.parse({
        productId: req.params.productId,
        start: req.query.start,
        end: req.query.end,
      });

      const data = await OrderService.getOrderItemsByProductAndDateRange(
        Number(parsed.productId),
        parsed.start,
        parsed.end
      );

      res.json(data);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
      res.status(500).json({ error: "Failed to fetch order items" });
    }
  },

  getActiveOrder: async (req, res) => {
    try {
      const profile_id = req.user.id;

      const activeOrder = await OrderService.getActiveOrderByProfileId(profile_id);
      if (!activeOrder) {
        return res.status(404).json({ error: "No active order" });
      }
      res.json(activeOrder);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch active order" });
    }
  },
};
