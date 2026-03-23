import foodModel from "../models/foodModel.js";
import fs from "fs";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";

// add food item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required"
      });
    }

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.filename
    });

    await food.save();

    res.json({ success: true, message: "Food Added" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// list food
const listFood = async (req, res) => {
    try {
        // Ensure Database Connection is Ready (Especially for Vercel Cold Boots!)
        if (mongoose.connection.readyState !== 1) {
            console.log("⚠️ DB not ready, attempting to reconnect...");
            await connectDB();
        }
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        res.json({ success: false, message: "Error fetching food" });
    }
}

// remove food
// remove food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    // SAFETY CHECK
    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found"
      });
    }

    // Only delete the image file if we are NOT on Vercel
    // Vercel is "production" and has a read-only file system
    if (process.env.NODE_ENV !== 'production') {
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) console.log("Image delete error:", err);
      });
    }

    // delete document from MongoDB (This works fine on Vercel!)
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food removed" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };