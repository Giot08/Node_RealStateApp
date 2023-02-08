import { Price, Category, Sell } from "../models/index.js";
import { validationResult } from "express-validator";

const dashboard = (req, res) => {
  res.render("dashboard/home", {
    page: "Dashboard",
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

const addImage = async (req, res) => {
  const { id } = req.params;

  // que exista
  const sellObject = await Sell.findByPk(id);
  if (!sellObject) {
    return res.redirect("/dashboard");
  }
  if (sellObject.published) {
    return res.redirect("/dashboard");
  }
  //console.log(req.user)
  if(req.user.id.toString() !== sellObject.userId.toString()){
    return res.redirect("/dashboard");
  }

  // que no este publicada
  // que la propiedad pertenece al quien usa

  res.render("dashboard/add-image", {
    page: "Add Image",
    subtitle: "Add your images for publish your selling!",
    csrfToken: req.csrfToken(),
    sellObject
  });
};

export { dashboard, createSelling, saveSelling, addImage };
