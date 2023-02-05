import Category from "./Category.js";
import Price from "./Price.js";
import User from "./User.js";
import Sell from "./Sell.js";

//Price.hasOne(Sell);

Sell.belongsTo(Price, { froeignKey: "priceId" });
Sell.belongsTo(Category, { froeignKey: "categoryId" });
Sell.belongsTo(User, { froeignKey: "userId" });

export {
    Category,
    Price,
    User,
    Sell
}