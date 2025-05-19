import { OrderService } from "../services/orderService.js";
import { OrderModel } from "../models/OrderModel.js";

export const OrderController = {
  createOrder: async (req, res) => {
    try {
      const order = await OrderService.createOrder(req.body);
      res.status(201).json({ data: order });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getOrder: async (req, res) => {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      if (!order) return res.status(404).json({ error: "Order not found" });
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getOrderWithItemsById: async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await OrderModel.getOrderWithItemsById(orderId);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.json(order);
    } catch (err) {
      console.error("❌ Error fetching order with items:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getOrdersByProfile: async (req, res) => {
    try {
      const orders = await OrderService.getOrdersByProfileId(
        req.params.profileId
      );
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getFullOrderHistory: async (req, res) => {
    const { profileId } = req.params;

    try {
      const orders = await OrderModel.getOrdersWithItemsByProfileId(profileId);
      res.json(orders);
    } catch (err) {
      console.error("❌ Error fetching full order history:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getOrderItemsByProductAndDateRange: async (req, res) => {
    const { productId } = req.params;
    const { start, end } = req.query;

    if (!start || !end) {
      return res
        .status(400)
        .json({ error: "Start and end dates are required" });
    }

    try {
      const items = await OrderModel.getOrderItemsByProductAndDateRange(
        productId,
        start,
        end
      );
      res.json(items);
    } catch (err) {
      console.error(
        "❌ Error fetching order items by product and date range:",
        err
      );
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const updated = await OrderService.updateOrderStatus(
        req.params.id,
        req.body.order_status
      );
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const deleted = await OrderService.deleteOrder(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Order not found" });
      res.json({ message: "Order deleted successfully", deleted });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  confirmOrder: async (req, res) => {
    try {
      const result = await OrderService.confirmOrder(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  },
};
