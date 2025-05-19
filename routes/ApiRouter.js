import express from "express";

import OrderRouter from "../routes/OrderRouter.js";

const router = express.Router();

router.use("/orders", OrderRouter);

export default router;
