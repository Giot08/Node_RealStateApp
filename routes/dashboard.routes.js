import express from "express";

import { body } from "express-validator";

import {
  dashboard,
  createSelling,
  saveSelling,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", dashboard);
router.get("/create_selling", createSelling);
router.post(
  "/create_selling",
  body("title").notEmpty().withMessage("Title can't be empty."),
  body("description").notEmpty().withMessage("Description can't be empty."),
  body("description").isLength({max:200}).withMessage("Description too large, the max is 200 char length"),
  body("category").isNumeric().withMessage("Select a category"),
  body("price").isNumeric().withMessage("Select a price"),
  body("rooms").isNumeric().withMessage("Select a rooms"),
  body("parking").isNumeric().withMessage("Select a parking"),
  body("bathrooms").isNumeric().withMessage("Select a bathrooms"),
  body("lat").notEmpty().withMessage("Find your location in the map"),

  saveSelling
);

export default router;
