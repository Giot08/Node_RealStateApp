import express from "express";

import {
  dashboard,
  createSelling,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", dashboard);
router.get("/create_selling", createSelling);

export default router;
