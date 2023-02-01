import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Price = db.define("Price", {
  mount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Price;
