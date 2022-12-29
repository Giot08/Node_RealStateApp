//const express = require("express");
import express, { application } from "express";
import router from "./routes/index.routes.js";

//crear la app
export const server = express();

//con use usa todas las rutas con una asociacion de '/'
server.use('/', router)

// Definir el puerto
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running in port ${port} \n localhost:${port}`);
})

