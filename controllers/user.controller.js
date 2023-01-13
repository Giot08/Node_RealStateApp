import {check, validationResult} from "express-validator";

import Usuario from "../models/User.js";

const formLogin = (req, res) => {
  res.render("auth/login", {
    page: "Login",
  });
};
const formRegister = (req, res) => {
  res.render("auth/register", {
    page: "Register",
  });
};
const postFormRegister = async (req, res) => {
  await check('name').notEmpty().withMessage("Name can\'t be empty").run(req);
  

  let result = validationResult(req);

  res.json({"Resultado": result})
};

const formForgotPassword = (req, res) => {
  res.render("auth/forgot_password", {
    page: "Forgot password",
  });
};

export { formLogin, formRegister, postFormRegister, formForgotPassword };
