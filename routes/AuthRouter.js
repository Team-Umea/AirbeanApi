import express from "express";
import { logIn, logOut } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/login', logIn);
router.post('/logout', logOut);


export default router;
