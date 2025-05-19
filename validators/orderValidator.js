import { z } from "zod";

export const orderItemSchema = z.object({
  product_id: z.number().int().positive(),
  quantity: z.number().int().min(1),
  unit_price: z.number().nonnegative(),
});

export const orderSchema = z.object({
  profile_id: z.number().int().positive(),
  total_amount: z.number().nonnegative(),
  order_status: z.string().min(1),
  order_items: z.array(orderItemSchema).min(1),
});

export const orderStatusSchema = z.object({
  orderId: z.string().regex(/^\d+$/),
  newStatus: z.string().min(1),
});

export const orderIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/),
});

export const profileIdParamSchema = z.object({
  profileId: z.string().regex(/^\d+$/),
});

export const productDateQuerySchema = z.object({
  productId: z.string().regex(/^\d+$/),
  start: z
    .string()
    .optional()
    .refine((date) => !date || /^\d{4}-\d{2}-\d{2}$/.test(date), {
      message: "Invalid start date format",
    }),
  end: z
    .string()
    .optional()
    .refine((date) => !date || /^\d{4}-\d{2}-\d{2}$/.test(date), {
      message: "Invalid end date format",
    }),
});
