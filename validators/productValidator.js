import { z } from "zod";
import Product from "../models/ProductModel.js";

const productIdReqParamSchmea = z
  .string({ message: "'productId' must be a string" })
  .nonempty({ message: "'productId' is required" });

const newProductSchema = z
  .object({
    productName: z
      .string({ message: "Product name must be a string" })
      .nonempty({ message: "Product name is required" }),
    productInfo: z
      .string({ message: "Product info must be a string" })
      .min(10, { message: "Product info must be atleast 10 characters long" })
      .max(5000, { message: "Product info cannot not be longer than 5000 characters" }),
    cost: z
      .number({ message: "Cost must be a number" })
      .positive({ message: "cost must be a postive number" }),
    stockQuantity: z
      .number({ message: "Stock quantity must be a number" })
      .positive({ message: "Stock quantity must be a postive number" }),
  })
  .strict();

const existingProductSchema = z
  .object({
    productName: z
      .string({ message: "Product name must be a string" })
      .nonempty({ message: "Product name is required" })
      .optional(),
    productInfo: z
      .string({ message: "Product info must be a string" })
      .min(10, { message: "Product info must be atleast 10 characters long" })
      .max(5000, { message: "Product info cannot not be longer than 5000 characters" })
      .optional(),
    cost: z
      .number({ message: "Cost must be a number" })
      .positive({ message: "cost must be a postive number" })
      .optional(),
    stockQuantity: z
      .number({ message: "Stock quantity must be a number" })
      .positive({ message: "Stock quantity must be a postive number" })
      .optional(),
  })
  .strict();

const productStockQuantitySchema = z
  .number({ message: "Cost must be a number" })
  .positive({ message: "cost must be a postive number" })
  .optional();

export const validateProductIdReqParam = async (req, res, next) => {
  try {
    const parsedId = productIdReqParamSchmea.parse(req.params.productId);

    //throws an error if product chould't be found
    await Product.getById(parsedId);

    next();
  } catch (err) {
    next(err);
  }
};

export const validateNewProductReqBody = async (req, res, next) => {
  try {
    newProductSchema.parse(req.body);

    next();
  } catch (err) {
    next(err);
  }
};

export const validateExistingProductReqBody = async (req, res, next) => {
  try {
    existingProductSchema.parse(req.body);

    next();
  } catch (err) {
    next(err);
  }
};

export const validateProductStockQuantityReqBody = async (req, res, next) => {
  try {
    productStockQuantitySchema.parse(req.body.stockQuantity);

    next();
  } catch (err) {
    next(err);
  }
};
