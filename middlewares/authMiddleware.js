import { verifyToken } from "../utils/jwt.js";
import AdminModel from "../models/AdminModel.js";
import { UnauthenticatedError } from "../errors/authErrors.js";

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
