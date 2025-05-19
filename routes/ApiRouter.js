import express from "express";

import OrderRouter from "../routes/OrderRouter.js";

const router = express.Router();

router.use("/order", OrderRouter);

export default router;
