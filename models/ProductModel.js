import { ResourceNotFoundError, ResourceUpdateError } from "../errors/resourceErrors.js";
import { executeQuery } from "../services/dbService.js";

const Product = {
  getAll: async () => {
    return await executeQuery(`
        SELECT 
            product_id,
            product_name,
            product_info,
            cost,
            in_stock,
            created_at
        FROM product;
    `);
  },
  getById: async (productId) => {
    const result = await executeQuery(
      `
        SELECT
            product_id,
            product_name,
            product_info,
            cost,
            in_stock,
            created_at
        FROM product
        WHERE product_id = $1
        `,
      [productId]
    );

    if (result.length === 0) {
      throw new ResourceNotFoundError(`Product with ID '${productId}' not found`);
    }

    return result[0];
  },
  create: async (data) => {
    return await executeQuery(
      `
        INSERT INTO product 
        (product_name, product_info, cost, in_stock, added_by_user_id)
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING
            product_id,
            product_name,
            product_info,
            cost,
            in_stock,
            created_at;
    `,
      [data.productName, data.producInfo, data.cost, !!data.inStock, data.userId]
    );
  },
  update: async (data, productId) => {
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

    const SET_CLASUE = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");

    return await executeQuery(
      `
        UPDATE product
        SET ${SET_CLASUE}
        WHERE id = $${keys.length + 1}
        RETURNING
            product_id,
            product_name,
            product_info,
            cost,
            in_stock,
            created_at;
    `,
      [values]
    );
  },
};

export default Product;
