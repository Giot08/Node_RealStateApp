import Price from "../models/Price.js";
import Category from "../models/Category.js";
import { validationResult } from "express-validator";

const dashboard = (req, res) => {
  res.render("dashboard/home", {
    page: "Dashboard",
    nav: true,
  });
};
const createSelling = async (req, res) => {
  //db
  const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll(),
  ]);

  res.render("dashboard/create", {
    page: "Dashboard",
    subtitle: "Create new selling",
    nav: true,
    csrfToken: req.csrfToken(),
    categories,
    prices,
  });
};

const saveSelling = async (req, res) => {
  let result = validationResult(req);
  if (!result.isEmpty()) {
    const [categories, prices] = await Promise.all([
      Category.findAll(),
      Price.findAll(),
    ]);

    res.render("dashboard/create", {
      page: "Dashboard",
      subtitle: "Create new selling",
      nav: true,
      csrfToken: req.csrfToken(),
      categories,
      prices,
      errors: result.array(),
    });
  }
};

export { dashboard, createSelling, saveSelling };
