import { z } from "zod";
import { OrderModel } from "../models/OrderModel.js";

const orderItemSchema = z.object({
  product_id: z
    .number({ required_error: "product_id is required" })
    .int()
    .positive(),
  quantity: z.number({ required_error: "quantity is required" }).int().min(1),
  unit_price: z
    .number({ required_error: "unit_price is required" })
    .nonnegative(),
});

const newOrderSchema = z
  .object({
    profile_id: z
      .number({ required_error: "profile_id is required" })
      .int()
      .positive(),
    total_amount: z
      .number({ required_error: "total_amount is required" })
      .nonnegative(),
    order_status: z
      .string({ required_error: "order_status is required" })
      .min(1),
    order_items: z.array(orderItemSchema).min(1),
  })
  .strict();

const orderStatusSchema = z.object({
  newStatus: z.string({ required_error: "newStatus is required" }).min(1),
});

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, { message: "Invalid id format" }),
});

const profileIdParamSchema = z.object({
  profileId: z.string().regex(/^\d+$/, { message: "Invalid profileId format" }),
});

const productDateQuerySchema = z.object({
  productId: z.string().regex(/^\d+$/, { message: "Invalid productId format" }),
  start: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid start date" })
    .optional(),
  end: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid end date" })
    .optional(),
});

export const validateNewOrderBody = (req, res, next) => {
  try {
    newOrderSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateOrderStatusBody = (req, res, next) => {
  try {
    orderStatusSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateIdParam = (req, res, next) => {
  try {
    idParamSchema.parse(req.params);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateProfileIdParam = (req, res, next) => {
  try {
    profileIdParamSchema.parse(req.params);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateProductDateQuery = (req, res, next) => {
  try {
    productDateQuerySchema.parse(req.query);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateOrderExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.getOrderById(Number(id));
    if (!order) {
      const error = new Error("Order not found");
      error.status = 404;
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export {
  newOrderSchema as orderSchema,
  orderStatusSchema,
  idParamSchema as orderIdParamSchema,
  profileIdParamSchema,
  productDateQuerySchema,
};
