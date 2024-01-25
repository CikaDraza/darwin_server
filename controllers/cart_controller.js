import expressAsyncHandler from "express-async-handler";
import Cart from "../models/cart_model.js";

export const addCart = expressAsyncHandler(async (req, res) => {
    const { userId, productId, productImage, title, brand, articleCode, price } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        console.log(cart);
        if (cart) {
            cart.items.push({ productImage, productId, title, brand, articleCode, price });
            await cart.save();
        } else {
            const newCart = await Cart.create({ userId, items: [{ productImage, productId, title, brand, articleCode, price }] });
            await newCart.save();
        }
        res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export const getSingleCart = expressAsyncHandler(async (req, res) => {
  const userId = req.params;

  try {
    const cart = await Cart.find(userId);
    console.log(userId, cart);
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const deleteProductCart = async (req, res) => {
  try {

    const { userId, productId, productImage, title, brand, articleCode, price } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.items.findIndex((item) => item._id.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    cart.items.splice(productIndex, 1);

    await cart.save();


    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting a product" });
  }
}