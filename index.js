//const express = require("express");
import express, { application } from "express";
import csurf from "csurf";
import cookieParser from "cookie-parser";

import homeRoutes from "./routes/index.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/sellings.routes.js";
import db from "./config/db.js";

//crear la app
export const server = express();

// Habilitar datos de forms
server.use(express.urlencoded({ extended: true }));

// Habilitar cookie parser
server.use(cookieParser());
// Habilitar csrf
server.use(csurf({ cookie: true }));

// conexion db

try {
  await db.authenticate();
  db.sync();
} catch (error) {
  console.log(error);
}

// pug
server.set("view engine", "pug");
server.set("views", "./views");

// Public
server.use(express.static("public"));

// Routes
//con use usa todas las rutas con una asociacion de '/'
server.use("/", homeRoutes);
server.use("/auth", authRoutes);
server.use("/dashboard", dashboardRoutes);

// Definir el puerto
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running in port ${port} \n localhost:${port}`);
});
