import { verifyToken } from "../utils/jwt.js";
import AdminModel from "../models/AdminModel.js";
import { UnauthenticatedError, UnauthorizedError } from "../errors/authErrors.js";

export const authenticate = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new UnauthenticatedError());
  }

  try {
    const payload = verifyToken(token);

    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

export const authorizeAdmin = async (req, res, next) => {
  const { id: profileId, role } = req.user;

  if (role !== "admin") {
    return next(new UnauthorizedError("You lack admin permissions"));
  }

  try {
    await AdminModel.getById(profileId);
    next();
  } catch (err) {
    next(err);
  }
};
