import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET;

export const generateToken = (payload) => {
  if (!SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
