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
};

export default Product;
