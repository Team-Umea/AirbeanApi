import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import ProfileModel from "../models/ProfileModel.js";
import ProfileService from "../services/profileService.js";
import { ResourceConflictError } from "../errors/resourceErrors.js";
import { LoginError } from "../errors/authErrors.js";

export const register = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const isUnique = await ProfileService.ensureUnique(username, email);

    if (!isUnique) {
      throw new ResourceConflictError("Email or username already exists");
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await ProfileModel.create(username, email, password_hash);

    const payload = { id: user.id, username: user.username, email: user.email };

    const token = generateToken(payload);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .status(201)
      .json({
        success: true,
        message: "User registered",
        token,
        data: payload,
      });
  } catch (error) {
    next(error);
  }
};

export const logIn = async (req, res, next) => {
  const { username, password } = req.body;
  const { as: role } = req.query;

  try {
    const user = await ProfileService.login(username, password);

    if (!user) {
      throw new LoginError("Username or password is incorrect");
    }

    const payload = { id: user.id, username: user.username, email: user.email, role };

    const token = generateToken(payload);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully",
        data: payload,
      });
  } catch (error) {
    next(error);
  }
};

export const logOut = (req, res) => {
  res.clearCookie("token").status(200).json({ sucess: true, message: "Logged out" });
};

export const me = (req, res) => {
  const user = req.user;

  res.status(200).json({ data: user, sucuess: true });
};
