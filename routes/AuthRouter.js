import express from "express";
import { logIn, logOut, register } from "../controllers/AuthController.js";
import {
  validateLoginReqBody,
  validateRegisterReqBody,
} from "../validators/authValidator.js";

const router = express.Router();

router.post("/login", validateLoginReqBody, logIn);

router.post("/register", validateRegisterReqBody, register);

router.post("/logout", logOut);

export default router;
