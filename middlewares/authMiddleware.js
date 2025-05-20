import { verifyToken } from "../utils/jwt.js";
import { AppError } from "../errors/errors.js";
import AdminModel from "../models/AdminModel.js";

export const authenticate = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return next(new AppError("Not authenticated", 401));

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

//only need to check admin role here since token is already validated
export const authorizeAdmin = async (req, res, next) => {
  authenticate(req, res, async (err) => {
    if (err) {
      return next(err);
    }

    const { id: profileId } = req.user;

    try {
      await AdminModel.getById(profileId);
    } catch (err) {
      next(err);
    }
  });
};
