import userModel from '../models/userModel.js';

// get cart items for a user
const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // 👈 from auth middleware
    const { itemId } = req.body;

    const user = await userModel.findById(userId);

    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

   
    if (!user.cartData) {
      user.cartData = {};
    }

    if (user.cartData[itemId]) {
      user.cartData[itemId] += 1;
    } else {
      user.cartData[itemId] = 1;
    }
    user.markModified('cartData');
    await user.save();

    res.json({
      success: true,
      cartData: user.cartData,
      message: "Item added to cart"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Add to cart failed"
    });
  }
};


//remove from user cart

 const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    const user = await userModel.findById(userId);

   
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // If item exists in cart
    if (user.cartData[itemId] > 0) {
      user.cartData[itemId] -= 1;

      // Remove item completely if quantity becomes 0
      if (user.cartData[itemId] === 0) {
        delete user.cartData[itemId];
      }
      user.markModified('cartData');

      await user.save();
    }

    res.json({
      success: true,
      cartData: user.cartData,
      message: "Item removed from cart"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Remove from cart failed"
    });
  }
};


//fetch user cart data

 const getCartItems = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.json({
      success: true,
      cartData: user.cartData || {}
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load cart"
    });
  }
};


export { addToCart, removeFromCart, getCartItems };