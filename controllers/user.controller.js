import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import User from "../models/User.js";
import { generateID } from "../helpers/token.js";
import { emailRegister, emailResetPassword } from "../helpers/emails.js";

const formLogin = (req, res) => {
  res.render("auth/login", {
    page: "Login",
  });
};
const formRegister = (req, res) => {
  res.render("auth/register", {
    page: "Register",
    csrfToken: req.csrfToken(),
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

  res.render("templates/message", {
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
    csrfToken: req.csrfToken(),
  });
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  await check("email").isEmail().withMessage("Email not valid").run(req);
  let result = validationResult(req);

  if (!result.isEmpty()) {
    return res.render("auth/forgot_password", {
      page: "Forgot password",
      csrfToken: req.csrfToken(),
      errors: result.array(),
    });
  }

  const user = await User.findOne({ where: { email } });

  console.log(user);
  if (!user) {
    return res.render("auth/forgot_password", {
      page: "Forgot password",
      csrfToken: req.csrfToken(),
      errors: [{ msg: "User email does not exist." }],
    });
  }

  user.token = generateID();
  await user.save();

  // enviar email
  emailResetPassword({
    email: user.email,
    name: user.name,
    token: user.token,
  });
  res.render("templates/message", {
    page: "Email send",
    msg: "Password reset email have been send",
  });
};

const checkToken = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ where: { token } });

  console.log(user);

  if (!user) {
    return res.render("auth/validate_account", {
      page: "Restart your Password",
      msg: "Error when validating account, try again.",
      error: true,
    });
  }

  // show form for modify password
  res.render("auth/reset_password", {
    page: "Restart your Password",
    csrfToken: req.csrfToken()
  });
};
const newPassword = async (req, res) => {
  // Validar
  await check("password")
    .isLength({ min: 8 })
    .withMessage("Password needs min 8 characters")
    .run(req);

  let result = validationResult(req);

  // Vista error
  if (!result.isEmpty()) {
    return res.render("auth/reset_password", {
      page: "Restart your Password",
      csrfToken: req.csrfToken(),
      errors: result.array()
    });
  }

  const {token} = req.params;
  const {  password} = req.body

  const user = await User.findOne({where: {token}});

  // hashpassword
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.token = null;

  await user.save();

  res.render("auth/validate_account", {
    page:"Password change succesful",
    msg: "Password change correctly"
  })



};

export {
  formLogin,
  formRegister,
  postFormRegister,
  validateEmail,
  formForgotPassword,
  resetPassword,
  checkToken,
  newPassword,
};
