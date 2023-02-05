import { exit } from "node:process";

import categories from "./categories.js";
import prices from "./prices.js";
import users from "./users.js";
import db from "../config/db.js";
import { Category, Price, User } from "../models/index.js";

const importData = async () => {
  try {
    //auth
    await db.authenticate();

    // gen table
    await db.sync();

    // insert
    await Promise.all([
      Price.bulkCreate(prices),
      Category.bulkCreate(categories),
      User.bulkCreate(users),
    ]);

    console.log("Data imported correctly");
    exit(0);
  } catch (error) {
    console.error(error);
    exit(1);
  }
};

const deleteData = async () => {
  try {
    /*await Promise.all([
      Price.destroy({ where: {}, truncate: true }),
      Category.destroy({ where: {}, truncate: true }),
    ]);*/

    await db.sync({ force: true });
    console.log("Delete data succesful");
    exit(0);
  } catch (error) {
    console.error(error);
    exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
}
if (process.argv[2] === "-d") {
  deleteData();
}
