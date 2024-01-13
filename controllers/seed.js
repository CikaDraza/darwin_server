import expressAsyncHandler from "express-async-handler";
import Company_account from "../models/company_account_model.js";
import Product from "../models/product_model.js";
import data from "../utils/data.js";

export const seed = expressAsyncHandler(async (req, res) => {
  try {
    await Company_account.deleteMany();
    await Company_account.insertMany(data.users);
    await Product.deleteMany();
    await Product.insertMany(data.products);
    res.send({ message: 'Seeded successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error seeding data', error });
  }
});
