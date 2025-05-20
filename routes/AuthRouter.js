import express from "express";
import { logIn, logOut, register } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", logIn);

router.post("/logout", logOut);

router.post("/register", register);

export default router;
