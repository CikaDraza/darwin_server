import express from "express";
import { addCart, getSingleCart, removeProductCart } from "../controllers/cart_controller.js";

const router = express.Router();

router.post("/add", addCart);
router.get("/get", getSingleCart);
router.delete("/remove", removeProductCart);

export default router;