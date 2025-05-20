import { z } from "zod";

export const loginSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 character" }),
  })
  .strict();

export const registerSchema = z
  .object({
    username: z.string().min(3, "Username måste vara minst 3 tecken"),
    password: z.string().min(6, "Password måste vara minst 6 tecken"),
    email: z.string().email({ message: "Invalid email" }),
  })
  .strict();

export const validateLoginReqBody = (req, res, next) => {
  try {
    loginSchema.parse(req.body);

    next();
  } catch (err) {
    next(err);
  }
};

export const validateResigterReqBody = (req, res, next) => {
  try {
    registerSchema.parse(req.body);

    next();
  } catch (err) {
    next(err);
  }
};
