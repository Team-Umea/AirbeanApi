import { executeQuery } from "../services/dbService.js";
import pool from "../config/postgres.js";

export const OrderModel = {
  createOrder: async (profileId, totalAmount, orderStatus, orderItems) => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const orderRes = await client.query(
        `INSERT INTO orders (profile_id, order_date, total_amount, order_status)
         VALUES ($1, NOW(), $2, $3) RETURNING *`,
        [profileId, totalAmount, orderStatus]
      );

      const orderId = orderRes.rows[0].id;

      for (const item of orderItems) {
        await client.query(
          `INSERT INTO order_item (order_id, product_id, quantity, unit_price)
           VALUES ($1, $2, $3, $4)`,
          [orderId, item.product_id, item.quantity, item.unit_price]
        );
      }

      await client.query("COMMIT");
      return orderRes.rows[0];
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("❌ Failed to create order with items:", err);
      throw err;
    } finally {
      client.release();
    }
  },

  getOrderById: async (orderId) => {
    const order = await executeQuery(`SELECT * FROM orders WHERE id = $1`, [
      orderId,
    ]);
    const items = await executeQuery(
      `SELECT * FROM order_item WHERE order_id = $1`,
      [orderId]
    );
    return { ...order[0], items };
  },

  getOrderWithItemsById: async (orderId) => {
    const [order] = await executeQuery(`SELECT * FROM orders WHERE id = $1`, [
      orderId,
    ]);

    if (!order) return null;

    const items = await executeQuery(
      `SELECT * FROM order_item WHERE order_id = $1`,
      [orderId]
    );

    order.items = items;

    return order;
  },

  getOrdersByProfileId: async (profileId) => {
    return await executeQuery(
      `SELECT * FROM orders WHERE profile_id = $1 ORDER BY order_date DESC`,
      [profileId]
    );
  },

  getOrdersWithItemsByProfileId: async (profileId) => {
    const orders = await executeQuery(
      `SELECT * FROM orders WHERE profile_id = $1 ORDER BY order_date DESC`,
      [profileId]
    );

    for (const order of orders) {
      const items = await executeQuery(
        `SELECT * FROM order_item WHERE order_id = $1`,
        [order.id]
      );
      order.items = items;
    }

    return orders;
  },

  getOrderItemsByProductAndDateRange: async (productId, startDate, endDate) => {
    const query = `
    SELECT oi.*, o.order_date, o.profile_id
    FROM order_item oi
    JOIN orders o ON oi.order_id = o.id
    WHERE oi.product_id = $1
      AND o.order_date BETWEEN $2 AND $3
    ORDER BY o.order_date DESC
  `;

    return await executeQuery(query, [productId, startDate, endDate]);
  },

  updateOrderStatus: async (orderId, newStatus) => {
    const result = await executeQuery(
      `UPDATE orders SET order_status = $1 WHERE id = $2 RETURNING *`,
      [newStatus, orderId]
    );
    return result[0];
  },

  deleteOrder: async (orderId) => {
    const result = await executeQuery(
      `DELETE FROM orders WHERE id = $1 RETURNING *`,
      [orderId]
    );
    return result[0];
  },
};
