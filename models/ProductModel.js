import {
  InvalidResourceValue,
  ResourceNotFoundError,
  ResourceUpdateError,
} from "../errors/resourceErrors.js";
import { executeQuery } from "../services/dbService.js";

const Product = {
  getAll: async function () {
    return await executeQuery(`
        SELECT 
            id,
            product_name,
            product_info,
            cost,
            stock_quantity,
            created_at
        FROM product;
    `);
  },

  getById: async function (productId) {
    const result = await executeQuery(
      `
        SELECT
            id,
            product_name,
            product_info,
            cost,
            stock_quantity,
            created_at
        FROM product
        WHERE id = $1
      `,
      [productId]
    );

    if (result.length === 0) {
      throw new ResourceNotFoundError(`Product with ID '${productId}' not found`);
    }

    return result[0];
  },

  create: async function (data) {
    const result = await executeQuery(
      `
        INSERT INTO product 
        (product_name, product_info, cost, stock_quantity, added_by_user_id)
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING
            id,
            product_name,
            product_info,
            cost,
            stock_quantity,
            created_at;
      `,
      [data.productName, data.productInfo, data.cost, !!data.inStock, data.userId]
    );

    return result[0];
  },

  update: async function (data, productId) {
    // Ensure the product exists before updating
    await this.getById(productId);

    const { productName, productInfo, cost, stockQuantity } = data;

    const fieldsToUpdate = {
      ...(productName !== undefined && { product_name: productName }),
      ...(productInfo !== undefined && { product_info: productInfo }),
      ...(cost !== undefined && { cost }),
      ...(stockQuantity !== undefined && { stock_quantity: stockQuantity }),
    };

    if (Object.keys(fieldsToUpdate).length === 0) {
      throw new ResourceUpdateError(
        `Failed to update product with ID '${productId}', due to missing fields to update`
      );
    }

    const keys = Object.keys(fieldsToUpdate);
    const values = Object.values(fieldsToUpdate);

    values.push(parseInt(productId));

    const SET_CLAUSE = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");

    const result = await executeQuery(
      `
        UPDATE product
        SET ${SET_CLAUSE}
        WHERE id = $${keys.length + 1} 
        RETURNING
            id,
            product_name,
            product_info,
            cost,
            stock_quantity,
            created_at;
      `,
      values
    );

    return result[0];
  },
  updateStock: async function (stockQuantity, productId) {
    // Ensure the product exists before updating
    const product = await this.getById(productId);

    if (stockQuantity < 0) {
      throw new InvalidResourceValue(
        `Stock quantity of ${product.product_name} cannot be less than 0`
      );
    }

    const result = await executeQuery(
      `
        UPDATE product
        SET stock_quantity = $1
        WHERE id = $2 
        RETURNING
            id,
            product_name,
            product_info,
            cost,
            stock_quantity,
            created_at;
      `,
      [stockQuantity, productId]
    );

    return result[0];
  },
  delete: async function (productId) {
    // Ensure the product exists before updating
    await this.getById(productId);

    const result = await executeQuery(
      `
        DELETE FROM product
        WHERE id = $1    
        RETURNING
            id,
            product_name,
            product_info,
            cost,
            stock_quantity,
            created_at;
    `,
      [productId]
    );

    return result[0];
  },
};

export default Product;
