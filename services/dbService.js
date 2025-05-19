import pool from "../config/postgres.js";
import { sanitizeValues } from "../utils/utils.js";

export const executeQuery = async (query, values = []) => {
  const sanitizedValues = sanitizeValues(values);
  const client = await pool.connect();

  try {
    const response = await client.query(query, sanitizedValues);
    return response.rows;
  } catch (err) {
    console.error("Database query error:", err);
    throw err;
  } finally {
    client.release();
  }
};

export const createTables = async () => {
  try {
    await executeQuery("BEGIN");

    await executeQuery(`
      CREATE TABLE IF NOT EXISTS profile (
        "id" integer PRIMARY KEY,
        "email" varchar UNIQUE NOT NULL,
        "username" varchar UNIQUE NOT NULL,
        "password" varchar NOT NULL,
        "role" varchar,
        "jwt_version" integer,
        "created_at" timestamp
      );

      CREATE TABLE IF NOT EXISTS admin (
        "id" integer PRIMARY KEY,
        "profile_id" integer UNIQUE NOT NULL,
        "created_at" timestamp,
        FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS product_table (
        "product_id" integer PRIMARY KEY,
        "product_name" varchar,
        "product_info" text,
        "cost" decimal(10,2),
        "in_stock" boolean,
        "created_at" timestamp,
        "added_by_user_id" integer NOT NULL
      );

      CREATE TABLE IF NOT EXISTS orders (
        "id" integer PRIMARY KEY,
        "profile_id" integer NOT NULL,
        "order_date" timestamp,
        "total_amount" decimal(10,2),
        "order_status" varchar,
        FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS order_item (
        "id" integer PRIMARY KEY,
        "order_id" integer NOT NULL,
        "product_id" integer NOT NULL,
        "quantity" integer DEFAULT 1,
        "unit_price" decimal(10,2),
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES product_table(product_id) ON DELETE CASCADE
      );
    `);

    await executeQuery("COMMIT");
  } catch (err) {
    await executeQuery("ROLLBACK");
    console.log(`Error creating tables: `, err);
  }
};
