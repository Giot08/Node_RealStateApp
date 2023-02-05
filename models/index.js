import Category from "./Category.js";
import Price from "./Price.js";
import User from "./User.js";
import Sell from "./Sell.js";

//Price.hasOne(Sell);

Sell.belongsTo(Price, { foreignKey: "priceId" });
Sell.belongsTo(Category, { foreignKey: "categoryId" });
Sell.belongsTo(User, { foreignKey: "userId" });

export {
    Category,
    Price,
    User,
    Sell
}