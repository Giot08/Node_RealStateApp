import { unlink } from 'node:fs/promises'
import { Price, Category, Sell } from "../models/index.js";
import { validationResult } from "express-validator";

const dashboard = async (req, res) => {
  const { id } = req.user;
  console.log(id);

  const sellings = await Sell.findAll({
    where: {
      userId: id,
    },
    include: [
      {
        model: Category, //as: "category"
      },
      {
        model: Price, // as "price"
      },
    ],
  });

  res.render("dashboard/home", {
    page: "Dashboard",
    sellings,
    csrfToken: req.csrfToken(),
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
    data: {},
  });
};

const saveSelling = async (req, res) => {
  let result = validationResult(req);
  if (!result.isEmpty()) {
    const [categories, prices] = await Promise.all([
      Category.findAll(),
      Price.findAll(),
    ]);

    return res.render("dashboard/create", {
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
    res.redirect(`/dashboard/create_selling/add-image/${id}`);
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
  if (req.user.id.toString() !== sellObject.userId.toString()) {
    return res.redirect("/dashboard");
  }

  // que no este publicada
  // que la propiedad pertenece al quien usa
  res.render("dashboard/add-image", {
    page: "Add Image",
    subtitle: "Add your images for publish your selling!",
    csrfToken: req.csrfToken(),
    sellObject,
  });
};

const saveImage = async (req, res, next) => {
  const { id } = req.params;
  // que exista
  const sellObject = await Sell.findByPk(id);
  if (!sellObject) {
    return res.redirect("/dashboard");
  }
  if (sellObject.published) {
    return res.redirect("/dashboard");
  }
  if (req.user.id.toString() !== sellObject.userId.toString()) {
    return res.redirect("/dashboard");
  }
  try {
    sellObject.image = req.file.filename;
    sellObject.published = 1;
    await sellObject.save();
    next();
    // Save image
  } catch (error) {
    console.log(error);
  }
};

const imageSuccesful = async (req, res) => {
  const { id } = req.params;

  const sellObject = await Sell.findByPk(id);
  console.log(sellObject.image);
  if (sellObject.image) {
    console.log("activo");
    return res.render("dashboard/home", {
      page: "Dashboard",
      image: true,
    });
  }
  res.render("dashboard/home", {
    page: "Dashboard",
    image: false,
  });
};

const editSelling = async (req, res) => {
  const { id } = req.params;
  const sell = await Sell.findByPk(id);
  console.log(sell);
  if (!sell) {
    return res.redirect("/dashboard");
  }
  if (sell.userId.toString() != req.user.id.toString()) {
    return res.redirect("/dashboard");
  }
  const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll(),
  ]);

  res.render("dashboard/edit", {
    page: "Dashboard",
    subtitle: `Edit your selling: ${sell.title}`,
    csrfToken: req.csrfToken(),
    categories,
    prices,
    data: sell,
  });
};

const saveChanges = async (req, res) => {
  // verify
  let result = validationResult(req);
  if (!result.isEmpty()) {
    const [categories, prices] = await Promise.all([
      Category.findAll(),
      Price.findAll(),
    ]);

    return res.render("dashboard/edit", {
      page: "Dashboard",
      subtitle: "Edit your selling",
      csrfToken: req.csrfToken(),
      categories,
      prices,
      errors: result.array(),
      data: req.body,
    });
  }

  // get params

  const { id } = req.params;
  const sell = await Sell.findByPk(id);
  console.log(sell);
  if (!sell) {
    return res.redirect("/dashboard");
  }
  if (sell.userId.toString() != req.user.id.toString()) {
    return res.redirect("/dashboard");
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

    sell.set({
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
    });

    await sell.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

const deleteSell = async (req, res) => {

  const { id } = req.params;
  const sell = await Sell.findByPk(id);
  console.log(sell);
  if (!sell) {
    return res.redirect("/dashboard");
  }
  if (sell.userId.toString() != req.user.id.toString()) {
    return res.redirect("/dashboard");
  }

  // Delete method 
  await unlink(`public/uploads/${sell.image}`)

  await sell.destroy()
  res.redirect("/dashboard");


}

export {
  dashboard,
  createSelling,
  saveSelling,
  addImage,
  saveImage,
  imageSuccesful,
  editSelling,
  saveChanges,
  deleteSell
};
