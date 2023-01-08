import express from "express";
import {formLogin, formRegister,formForgotPassword} from "../../controllers/user.controller.js"

const router = express.Router()

// routing
router.get('/login', formLogin);
router.get('/register', formRegister);
router.get('/forgot_password', formForgotPassword);

export default router;