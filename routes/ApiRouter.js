import express from "express";
import ProductRouter from "./ProductRouter.js";
import OrderRouter from "../routes/OrderRouter.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use("/products", ProductRouter);

router.use("/orders", authenticate, OrderRouter);

export default router;
