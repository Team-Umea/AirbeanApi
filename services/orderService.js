import { OrderModel } from "../models/OrderModel.js";

export const OrderService = {
  createOrder: async (orderData) => {
    const { profile_id, total_amount, order_status, order_items } = orderData;
    if (!order_items || order_items.length === 0) {
      throw new Error("Order must include at least one item.");
    }
    if (!profile_id || total_amount === undefined) {
      throw new Error("Missing profile_id or total_amount.");
    }
    return await OrderModel.createOrder(
      profile_id,
      total_amount,
      order_status,
      order_items
    );
  },

  getOrderById: async (orderId) => {
    const order = await OrderModel.getOrderById(orderId);
    if (!order) {
      const error = new Error(`Order with id ${orderId} not found`);
      error.status = 404;
      throw error;
    }
    return order;
  },

  getOrdersByProfileId: async (profileId) => {
    const orders = await OrderModel.getOrdersByProfileId(profileId);
    if (!orders || orders.length === 0) {
      const error = new Error(`No orders found for profile ${profileId}`);
      error.status = 404;
      throw error;
    }
    return orders;
  },

  getOrdersWithItemsByProfileId: async (profileId) => {
    const orders = await OrderModel.getOrdersWithItemsByProfileId(profileId);
    if (!orders || orders.length === 0) {
      const error = new Error(
        `No orders with items found for profile ${profileId}`
      );
      error.status = 404;
      throw error;
    }
    return orders;
  },

  updateOrderStatus: async (orderId, newStatus) => {
    const updatedOrder = await OrderModel.updateOrderStatus(orderId, newStatus);
    if (!updatedOrder) {
      const error = new Error(`Order with id ${orderId} not found`);
      error.status = 404;
      throw error;
    }
    return updatedOrder;
  },

  deleteOrder: async (orderId) => {
    const deletedOrder = await OrderModel.deleteOrder(orderId);
    if (!deletedOrder) {
      const error = new Error(`Order with id ${orderId} not found`);
      error.status = 404;
      throw error;
    }
    return deletedOrder;
  },

  getOrderWithItemsById: async (orderId) => {
    const orderWithItems = await OrderModel.getOrderWithItemsById(orderId);
    if (!orderWithItems) {
      const error = new Error(`Order with id ${orderId} not found`);
      error.status = 404;
      throw error;
    }
    return orderWithItems;
  },

  getFullOrderHistory: async (profileId) => {
    const history = await OrderModel.getFullOrderHistory(profileId);
    if (!history || history.length === 0) {
      const error = new Error(
        `No order history found for profile ${profileId}`
      );
      error.status = 404;
      throw error;
    }
    return history;
  },

  getOrderItemsByProductAndDateRange: async (productId, startDate, endDate) => {
    const items = await OrderModel.getOrderItemsByProductAndDateRange(
      productId,
      startDate,
      endDate
    );
    if (!items || items.length === 0) {
      const error = new Error(
        `No order items found for product ${productId} in given date range`
      );
      error.status = 404;
      throw error;
    }
    return items;
  },

  confirmOrder: async (orderId) => {
    return await OrderModel.confirmOrder(orderId);
  },

  getActiveOrderByProfileId: async (profileId) => {
    return await OrderModel.getActiveOrderByProfileId(profileId);
  },
};
