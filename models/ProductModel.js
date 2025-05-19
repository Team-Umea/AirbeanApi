import { ResourceError } from "../errors/resourceErrors.js";
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
      throw new ResourceError(`Product with ID '${productId}' not found`);
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
            created_at
    `,
      [data.productName, data.producInfo, data.cost, !!data.inStock, data.userId]
    );
  },
};

export default Product;
