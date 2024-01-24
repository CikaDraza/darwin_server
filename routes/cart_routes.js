import express from "express";
import { addCart, deleteProductCart, getSingleCart } from "../controllers/cart_controller.js";

const router = express.Router();

router.post("/add", addCart);
router.get("/get", getSingleCart);
router.post("/delete", deleteProductCart);

export default router;