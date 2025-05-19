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
};

export default Product;
