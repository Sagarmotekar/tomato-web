import userModel from "../models/userModel.js";

// Add to cart
const addToCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const cartData = user.cartData || {};

    cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const cartData = user.cartData || {};

    if (cartData[req.body.itemId] > 0) cartData[req.body.itemId] -= 1;

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing from cart" });
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const cartData = user.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching cart" });
  }
};

export { addToCart, removeFromCart, getCart };
