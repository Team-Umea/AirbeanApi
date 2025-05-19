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
    //transaction to create tables
    await executeQuery("BEGIN");

    /*TODO: Create tables*/

    //COMMIT all sql
    await executeQuery("COMMIT");
  } catch (err) {
    //if any error occurs abort all sql
    await executeQuery("ROLLBACK");
    console.log(`Error creating tables: `, err);
  }
};
