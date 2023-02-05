import { Price, Category, Sell } from "../models/index.js";
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
    data: "",
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
      data: req.body,
    });
  }

  try {
    const {
      title,
      description,
      rooms,
      parking,
      bathrooms,
      street,
      lat,
      lng,
      price: priceId,
      category: categoryId,
    } = req.body;

    const { id: userId } = req.user;

    const saveSell = await Sell.create({
      title,
      description,
      rooms,
      parking,
      bathrooms,
      street,
      lat,
      lng,
      priceId,
      categoryId,
      userId,
      image: "",
    });

    const { id } = saveSell;
    res.redirect(`/sells/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export { dashboard, createSelling, saveSelling };
