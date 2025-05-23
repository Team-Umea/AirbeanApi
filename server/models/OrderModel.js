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
    const query = `SELECT * FROM orders WHERE id = $1`;
    const rows = await executeQuery(query, [orderId]);
    return rows[0] || null;
  },

  getOrdersByProfileId: async (profileId) => {
    const query = `SELECT * FROM orders WHERE profile_id = $1 ORDER BY order_date DESC`;
    return await executeQuery(query, [profileId]);
  },

  getOrderWithItemsById: async (orderId) => {
    const queryOrder = `SELECT * FROM orders WHERE id = $1`;
    const orders = await executeQuery(queryOrder, [orderId]);
    if (orders.length === 0) return null;

    const queryItems = `SELECT * FROM order_item WHERE order_id = $1`;
    const items = await executeQuery(queryItems, [orderId]);

    return { ...orders[0], items };
  },

  getOrdersWithItemsByProfileId: async (profileId) => {
    const query = `
      SELECT 
        o.id as order_id, o.profile_id, o.order_date, o.total_amount, o.order_status,
        json_agg(
          json_build_object(
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'product_name', p.product_name
          )
        ) as order_items
      FROM orders o
      LEFT JOIN order_item oi ON o.id = oi.order_id
      LEFT JOIN product p ON oi.product_id = p.id
      WHERE o.profile_id = $1
      GROUP BY o.id, o.profile_id, o.order_date, o.total_amount, o.order_status
      ORDER BY o.order_date DESC, o.id
    `;
    const rows = await executeQuery(query, [profileId]);
    return rows.map((row) => ({
      id: row.order_id,
      profile_id: row.profile_id,
      order_date: row.order_date,
      total_amount: row.total_amount,
      order_status: row.order_status,
      order_items:
        row.order_items[0].product_id === null ? [] : row.order_items,
    }));
  },

  getFullOrderHistory: async (profileId) => {
    const query = `
    SELECT o.*, oi.product_id, oi.quantity, oi.unit_price
    FROM orders o
    LEFT JOIN order_item oi ON o.id = oi.order_id
    WHERE o.profile_id = $1
    ORDER BY o.order_date DESC`;
    const rows = await executeQuery(query, [profileId]);
    return rows;
  },

  getOrderItemsByProductAndDateRange: async (productId, startDate, endDate) => {
    const query = `
      SELECT oi.*
      FROM order_item oi
      JOIN orders o ON oi.order_id = o.id
      WHERE oi.product_id = $1
        AND o.order_date BETWEEN $2 AND $3`;
    return await executeQuery(query, [productId, startDate, endDate]);
  },

  updateOrderStatus: async (orderId, newStatus) => {
    const query = `
      UPDATE orders SET order_status = $1 WHERE id = $2 RETURNING *`;
    const rows = await executeQuery(query, [newStatus, orderId]);
    return rows[0] || null;
  },

  deleteOrder: async (orderId) => {
    const query = `DELETE FROM orders WHERE id = $1 RETURNING *`;
    const rows = await executeQuery(query, [orderId]);
    return rows[0] || null;
  },

  confirmOrder: async (orderId) => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const orderRes = await client.query(
        `SELECT order_status FROM orders WHERE id = $1 FOR UPDATE`,
        [orderId]
      );

      if (orderRes.rows.length === 0) {
        throw { status: 404, message: "Order not found" };
      }

      if (orderRes.rows[0].order_status !== "Behandlas") {
        throw {
          status: 400,
          message: "Order is not pending and cannot be confirmed",
        };
      }

      const itemsRes = await client.query(
        `SELECT product_id, quantity FROM order_item WHERE order_id = $1`,
        [orderId]
      );
      const items = itemsRes.rows;

      for (const item of items) {
        const stockRes = await client.query(
          `SELECT stock_quantity FROM product WHERE id = $1 FOR UPDATE`,
          [item.product_id]
        );

        if (stockRes.rows.length === 0) {
          throw {
            status: 400,
            message: `Product with id ${item.product_id} not found`,
          };
        }

        if (stockRes.rows[0].stock_quantity < item.quantity) {
          throw {
            status: 400,
            message: `Insufficient stock for product ${item.product_id}`,
          };
        }
      }

      for (const item of items) {
        await client.query(
          `UPDATE product SET stock_quantity = stock_quantity - $1 WHERE id = $2`,
          [item.quantity, item.product_id]
        );
      }

      await client.query(
        `UPDATE orders SET order_status = 'Behandlas' WHERE id = $1 RETURNING *`,
        [orderId]
      );

      await client.query("COMMIT");

      return { message: "Order confirmed and stock updated" };
    } catch (error) {
      await client.query("ROLLBACK");
      if (error.status && error.message) {
        const err = new Error(error.message);
        err.status = error.status;
        throw err;
      }
      throw new Error("Failed to confirm order: " + error.message);
    } finally {
      client.release();
    }
  },

  getActiveOrderByProfileId: async (profileId) => {
    const query = `
      SELECT 
        o.id as order_id, o.profile_id, o.order_date, o.total_amount, o.order_status,
        json_agg(
          json_build_object(
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'product_name', p.product_name
          )
        ) as order_items
      FROM orders o
      LEFT JOIN order_item oi ON o.id = oi.order_id
      LEFT JOIN product p ON oi.product_id = p.id
      WHERE o.profile_id = $1 AND o.order_status = 'Behandlas'
      GROUP BY o.id, o.profile_id, o.order_date, o.total_amount, o.order_status
      ORDER BY o.order_date DESC
      LIMIT 1
    `;
    const rows = await executeQuery(query, [profileId]);
    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id: row.order_id,
      profile_id: row.profile_id,
      order_date: row.order_date,
      total_amount: row.total_amount,
      order_status: row.order_status,
      order_items:
        row.order_items[0].product_id === null ? [] : row.order_items,
    };
  },
};
