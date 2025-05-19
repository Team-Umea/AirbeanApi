import expres from "express";
import { addProduct, getProductById, getProducts } from "../controllers/ProductController.js";

const router = expres.Router();

//get product by id
router.get("/:productId", getProductById);

//get all products, optionally include query params like sort, order, searchquery and limit
router.get("/", getProducts);

//add a new product - needs to be proected so only admins can add a new product
router.post("/", addProduct);

//update the name, price and more of an existing product
// router.patch("/:productId");

//delete a product
// router.delete("/:productId");

export default router;
