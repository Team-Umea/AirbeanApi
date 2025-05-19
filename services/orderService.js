import { OrderModel } from "../models/OrderModel.js";

export const OrderService = {
  createOrder: async (orderData) => {
    const { profile_id, total_amount, order_status, order_items } = orderData;
    if (!order_items || order_items.length === 0) {
      throw new Error("Order must include at least one item.");
    }
    return await OrderModel.createOrder(
      profile_id,
      total_amount,
      order_status,
      order_items
    );
  },

  getOrderById: async (id) => {
    return await OrderModel.getOrderById(id);
  },

  getOrderWithItemsById: async (orderId) => {
    return await OrderModel.getOrderWithItemsById(orderId);
  },

  getOrdersByProfileId: async (profileId) => {
    return await OrderModel.getOrdersByProfileId(profileId);
  },

  getFullOrderHistory: async (profileId) => {
    return await OrderModel.getFullOrderHistory(profileId);
  },

  getOrderItemsByProductAndDateRange: async (productId, start, end) => {
    return await OrderModel.getOrderItemsByProductAndDateRange(
      productId,
      start,
      end
    );
  },

  updateOrderStatus: async (orderId, newStatus) => {
    return await OrderModel.updateOrderStatus(orderId, newStatus);
  },

  deleteOrder: async (orderId) => {
    return await OrderModel.deleteOrder(orderId);
  },
};
