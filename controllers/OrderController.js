import { OrderService } from "../services/orderService.js";

export const OrderController = {
  createOrder: async (req, res) => {
    try {
      const newOrder = await OrderService.createOrder(req.body);
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  },

  getOrder: async (req, res) => {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      res.status(200).json(order);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  },

  getOrdersByProfile: async (req, res) => {
    try {
      const orders = await OrderService.getOrdersByProfileId(
        req.params.profileId
      );
      res.status(200).json(orders);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const updatedOrder = await OrderService.updateOrderStatus(
        req.params.id,
        req.body.order_status
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const deletedOrder = await OrderService.deleteOrder(req.params.id);
      res.status(200).json(deletedOrder);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  },

  getOrderWithItemsById: async (req, res) => {
    try {
      const orderWithItems = await OrderService.getOrderWithItemsById(
        req.params.orderId
      );
      res.status(200).json(orderWithItems);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  },

  getFullOrderHistory: async (req, res) => {
    try {
      const history = await OrderService.getFullOrderHistory(
        req.params.profileId
      );
      res.status(200).json(history);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  },

  getOrderItemsByProductAndDateRange: async (req, res) => {
    try {
      const { productId } = req.params;
      const { start, end } = req.query;
      const items = await OrderService.getOrderItemsByProductAndDateRange(
        productId,
        start,
        end
      );
      res.status(200).json(items);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
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
