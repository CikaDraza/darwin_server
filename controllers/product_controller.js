import Product from "../models/product_model.js";
import expressAsyncHandler from "express-async-handler";
import db from "../utils/db.js";

export const getProducts = expressAsyncHandler(async (req, res) => {
  try {
    db.connect();
    const brandQuery = req.query.brand;
    let filter = {};
    if (brandQuery) {
      filter.brand = brandQuery;
    }
    console.log("Filter being applied:", filter);
    const products = await Product.find(filter);
    db.disconnect();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getSingleProduct = expressAsyncHandler(async (req, res) => {
  try {
    db.connect();
    const id = req.params.id;

    const product = await Product.findById({ _id: id });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    db.disconnect();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export const getUniqueBrands = expressAsyncHandler(async (req, res) => {
  try {
    db.connect();
    const brands = await Product.aggregate([
      {
        $group: {
          _id: "$brand",
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    const brandNames = brands.map(b => b._id);
    db.disconnect();
    res.json(brandNames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getBrandCounts = expressAsyncHandler(async (req, res) => {
  try {
    db.connect();
    const brandCounts = await Product.aggregate([
      { $group: { _id: "$brand", count: { $sum: 1 } } },
      { $project: { brand: "$_id", count: 1, _id: 0 } },
    ]);
    db.disconnect();
    res.status(200).json(brandCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});