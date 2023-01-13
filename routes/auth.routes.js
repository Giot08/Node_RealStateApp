import express from "express";
import {
  formLogin,
  formRegister,
  formForgotPassword,
  postFormRegister,
  validateEmail,
} from "../controllers/user.controller.js";

const router = express.Router();

// routing
router.get("/login", formLogin);
router.get("/register", formRegister);
router.post("/register", postFormRegister);
router.get("/register/validate/:token", validateEmail);

router.get("/forgot_password", formForgotPassword);

export default router;
