import express from "express";

import { admin } from "../controllers/dashboard.controller.js"

const router = express.Router();

router.get('/', admin)

export default router