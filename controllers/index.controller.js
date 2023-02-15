import { Sell } from "../models/index.js";
import { validationResult } from "express-validator";

const viewItem = async (req, res) => {
    const { id } = req.params

    // Validate
    const sell = await Sell.findByPk(id);

    if(!sell){
        res.redirect('/404')
    }


    res.render("layout/show-item", {
        sell,
        page: sell.title
      });
};

export { viewItem };
