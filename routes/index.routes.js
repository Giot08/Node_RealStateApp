import express from "express";

import { viewItem } from "../controllers/index.controller.js";

const router = express.Router();

// routing
router.get("/", (req, res) => {
  res.json({ msg: "hola", txt: "Lorem ipsun" });
});
router.get("/view/:id", viewItem);

export default router;
