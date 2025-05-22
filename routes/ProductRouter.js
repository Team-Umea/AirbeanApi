import expres from "express";
import {
  addProduct,
  deleteProduct,
  getOverview,
  getProductById,
  getProducts,
  updateProduct,
  updateProductStockQuantity,
} from "../controllers/ProductController.js";
import {
  validateExistingProductReqBody,
  validateNewProductReqBody,
  validateProductIdReqParam,
  validateProductStockQuantityReqBody,
} from "../validators/productValidator.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = expres.Router();

//get overview and stats
router.get("/overview", authenticate, authorizeAdmin, getOverview);

//get product by id
router.get("/:productId", validateProductIdReqParam, getProductById);

//get all products, optionally include query params like sort, order, searchquery and limit
router.get("/", getProducts);

//authorize admin to modify products
router.use(authenticate, authorizeAdmin);

//add a new product - needs to be proected so only admins can add a new product
router.post("/", validateNewProductReqBody, addProduct);

//update the name, price and more of an existing product
router.put("/:productId", validateProductIdReqParam, validateExistingProductReqBody, updateProduct);

//refill product quantity in stock
router.patch(
  "/:productId",
  validateProductIdReqParam,
  validateProductStockQuantityReqBody,
  updateProductStockQuantity
);

// delete a product
router.delete("/:productId", validateProductIdReqParam, deleteProduct);

export default router;
