import expressAsyncHandler from "express-async-handler";
import Cart from "../models/cart_model.js";

export const addCart = expressAsyncHandler(async (req, res) => {
    const { userId, items } = req.body;
    console.log(req.body);

    try {
        const cart = await Cart.findOne({ userId });
        console.log(cart);
        if (cart) {
            cart.items.push(...items);
            await cart.save();
        } else {
            const newCart = await Cart.create({ userId, items });
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

export const removeProductCart = expressAsyncHandler(async (req, res) => {
  const { userId, productId } = req.body;

  try {
      const cart = await Cart.findOne({ userId });
      if (cart) {
          cart.items = cart.items.filter(item => item.productId !== productId);
          await cart.save();
          res.status(200).json({ message: 'Product removed from cart' });
      } else {
          res.status(404).json({ message: 'Cart not found' });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});