import express from "express";
import {
  formLogin,
  formRegister,
  formForgotPassword,
  postFormRegister,
  validateEmail,
  resetPassword,
  checkToken,
  newPassword,
} from "../controllers/user.controller.js";

const router = express.Router();

// routing
router.get("/login", formLogin);
router.get("/register", formRegister);
router.post("/register", postFormRegister);
router.get("/register/validate/:token", validateEmail);

router.get("/forgot_password", formForgotPassword);
router.post("/forgot_password", resetPassword);

// Almacena password
router.get("/forgot_password/:token", checkToken);
router.post("/forgot_password/:token", newPassword);

export default router;
