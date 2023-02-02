import Price from "../models/Price.js";
import Category from "../models/Category.js";

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
    categories,
    prices,
  });
};

export { dashboard, createSelling };
