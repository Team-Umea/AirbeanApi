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
      const order = await OrderService.createOrder(parsed);
      res.status(201).json(order);
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
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      res.status(500).json({ error: "Failed to fetch order" });
    }
  },

  getOrderWithItemsById: async (req, res) => {
    try {
      const { orderId } = orderIdParamSchema.parse({ id: req.params.orderId });
      const fullOrder = await OrderService.getOrderWithItemsById(
        Number(orderId)
      );
      if (!fullOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(fullOrder);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      res.status(500).json({ error: "Failed to fetch full order" });
    }
  },

  getOrdersByProfile: async (req, res) => {
    try {
      const { profileId } = profileIdParamSchema.parse(req.params);
      const orders = await OrderService.getOrdersByProfileId(Number(profileId));
      res.json(orders);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  },

  getFullOrderHistory: async (req, res) => {
    try {
      const { profileId } = profileIdParamSchema.parse(req.params);
      const history = await OrderService.getFullOrderHistory(Number(profileId));
      res.json(history);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      res.status(500).json({ error: "Failed to fetch order history" });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const parsed = orderStatusSchema.parse({
        orderId: req.params.id,
        newStatus: req.body.newStatus,
      });

      const updated = await OrderService.updateOrderStatus(
        Number(parsed.orderId),
        parsed.newStatus
      );

      if (!updated) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.json({ success: true, status: parsed.newStatus });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      res.status(500).json({ error: "Failed to update status" });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const { id } = orderIdParamSchema.parse(req.params);
      const result = await OrderService.deleteOrder(Number(id));
      if (!result) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      res.status(500).json({ error: "Failed to delete order" });
    }
  },

  confirmOrder: async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const result = await OrderService.confirmOrder(orderId);
      res.status(200).json({
        message: "Order confirmed successfully",
        order: result,
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to confirm order" });
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
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      res.status(500).json({ error: "Failed to fetch order items" });
    }
  },
};
