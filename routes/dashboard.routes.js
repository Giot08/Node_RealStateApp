import express from "express";

import { body } from "express-validator";

import {
  dashboard,
  createSelling,
  saveSelling,
  addImage,
  saveImage,
  imageSuccesful,
  editSelling,
  saveChanges,
  deleteSell
} from "../controllers/dashboard.controller.js";

import protectRoute from "../middleware/protectRoutes.js";
import upload from "../middleware/uploadImage.js";

const router = express.Router();

router.get("/", protectRoute, dashboard);
router.get("/create_selling", protectRoute, createSelling);
router.post(
  "/create_selling",
  protectRoute,
  body("title").notEmpty().withMessage("Title can't be empty."),
  body("description").notEmpty().withMessage("Description can't be empty."),
  body("description")
    .isLength({ max: 200 })
    .withMessage("Description too large, the max is 200 char length"),
  body("category").isNumeric().withMessage("Select a category"),
  body("price").isNumeric().withMessage("Select a price"),
  body("rooms").isNumeric().withMessage("Select a rooms"),
  body("parking").isNumeric().withMessage("Select a parking"),
  body("bathrooms").isNumeric().withMessage("Select a bathrooms"),
  body("lat").notEmpty().withMessage("Find your location in the map"),
  saveSelling
);
//router.get("/create_selling/add-image/:id", protectRoute, addImage);
router.get("/:id", protectRoute, imageSuccesful);
router.get("/create_selling/add-image/:id", protectRoute, addImage);
router.post("/add-image/:id", protectRoute, upload.single("image"), saveImage);

router.get("/edit_selling/:id", protectRoute, editSelling);

router.post(
  "/edit_selling/:id",
  protectRoute,
  body("title").notEmpty().withMessage("Title can't be empty."),
  body("description").notEmpty().withMessage("Description can't be empty."),
  body("description")
  .isLength({ max: 200 })
  .withMessage("Description too large, the max is 200 char length"),
  body("category").isNumeric().withMessage("Select a category"),
  body("price").isNumeric().withMessage("Select a price"),
  body("rooms").isNumeric().withMessage("Select a rooms"),
  body("parking").isNumeric().withMessage("Select a parking"),
  body("bathrooms").isNumeric().withMessage("Select a bathrooms"),
  body("lat").notEmpty().withMessage("Find your location in the map"),
  saveChanges
  );

  router.post('/edit_selling/delete/:id', 
  protectRoute,
  deleteSell
  )

export default router;
