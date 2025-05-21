import express from "express";
import { logIn, logOut, me, register } from "../controllers/AuthController.js";
import { validateLoginReqBody, validateRegisterReqBody } from "../validators/authValidator.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", validateLoginReqBody, logIn);

router.post("/register", validateRegisterReqBody, register);

router.post("/logout", logOut);

router.get("/me", authenticate, me);

export default router;
