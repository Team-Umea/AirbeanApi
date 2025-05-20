import express from "express";
import { logIn, logOut, register } from "../controllers/AuthController.js";
import { validateLoginReqBody, validateResigterReqBody } from "../validators/authValidator.js";

const router = express.Router();

router.post("/login", validateLoginReqBody, logIn);

router.post("/register", validateResigterReqBody, register);

router.post("/logout", logOut);

export default router;
