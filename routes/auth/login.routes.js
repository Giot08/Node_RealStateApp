import express from "express";
import {formLogin, formRegister} from "../../controllers/user.controller.js"

const router = express.Router()

// routing
router.get('/login', formLogin);
router.get('/register', formRegister);

export default router;