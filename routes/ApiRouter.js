import express from "express";
import ProductRouter from "./ProductRouter.js";

import OrderRouter from "../routes/OrderRouter.js";

const router = express.Router();

router.use("/products", ProductRouter);

router.use("/orders", OrderRouter);

export default router;
