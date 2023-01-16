import { check, validationResult } from "express-validator";

import User from "../models/User.js";
import { generateID } from "../helpers/token.js";
import { emailRegister } from "../helpers/emails.js";

const formLogin = (req, res) => {
  res.render("auth/login", {
    page: "Login",
  });
};
const formRegister = (req, res) => {
  res.render("auth/register", {
    page: "Register",
    csrfToken: req.csrfToken()
  });
};
const postFormRegister = async (req, res) => {
  const { name, email, password } = req.body;

  await check("name").notEmpty().withMessage("Name can't be empty").run(req);
  await check("email").isEmail().withMessage("Email not valid").run(req);
  await check("password")
    .isLength({ min: 8 })
    .withMessage("Password needs min 8 characters")
    .run(req);
  await check("repeat_password")
    .equals(password)
    .withMessage("Password are not equals")
    .run(req);

  let result = validationResult(req);

  if (!result.isEmpty()) {
    console.log(req.body);
    return res.render("auth/register", {
      page: "Register",
      csrfToken: req.csrfToken(),
      errors: result.array(),
      user: {
        name: name,
        email: email,
      },
    });
  }

  const findUser = await User.findOne({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.render("auth/register", {
      page: "Register",
      csrfToken: req.csrfToken(),
      errors: [{ msg: "User already exist" }],
      user: {
        name: name,
        email: email,
      },
    });
  }

  //create user
  const newUser = await User.create({
    name,
    email,
    password,
    token: generateID(),
  });

  res.render("templates/succesfulRegister", {
    page: "User created succesfully.",
    msg: `Activation email have been send to ${newUser.email}.`,
  });

  //Send email Authenticator
  emailRegister({
    name: newUser.name,
    email: newUser.email,
    token: newUser.token,
  });
};

const validateEmail = async (req, res) => {
  const { token } = req.params;

  // Verificar token
  const user = await User.findOne({
    where: {
      token: token,
    },
  });

  if (!user) {
    return res.render("auth/validate_account", {
      page: "Error",
      msg: "Error when validating account, try again.",
      error: true,
    });
  }
  // confirmar cuenta

  user.token = null;
  user.emailAuthenticate = true;

  try {
    await user.save();
    res.render("auth/validate_account", {
      page: "Email validated",
      msg: "Email validate succesful",
    });
  } catch (error) {
    console.log(error);
  }
};

const formForgotPassword = (req, res) => {
  res.render("auth/forgot_password", {
    page: "Forgot password",
  });
};

export {
  formLogin,
  formRegister,
  postFormRegister,
  validateEmail,
  formForgotPassword,
};
