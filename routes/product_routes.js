import express from "express";
import { getBrandCounts, getProducts, getSingleProduct, getUniqueBrands } from "../controllers/product_controller.js";


const router = express.Router();

router.get("/products", getProducts);
router.get('/products/brands', getUniqueBrands);
router.get('/products/count_brands', getBrandCounts);
router.get("/products/:id", getSingleProduct);

export default router;