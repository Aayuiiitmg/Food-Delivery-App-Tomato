import mongoose from "mongoose";
import fs from "fs";
import { connectDB } from "./config/db.js";
import foodModel from "./models/foodModel.js";

const food_list = [
    { name: "Greek salad", price: 12, description: "Food provides essential nutrients for overall health and well-being", category: "Salad", baseImage: "food_1.png" },
    { name: "Veg salad", price: 18, description: "Food provides essential nutrients for overall health and well-being", category: "Salad", baseImage: "food_2.png" },
    { name: "Clover Salad", price: 16, description: "Food provides essential nutrients for overall health and well-being", category: "Salad", baseImage: "food_3.png" },
    { name: "Chicken Salad", price: 24, description: "Food provides essential nutrients for overall health and well-being", category: "Salad", baseImage: "food_4.png" },
    { name: "Lasagna Rolls", price: 14, description: "Food provides essential nutrients for overall health and well-being", category: "Rolls", baseImage: "food_5.png" },
    { name: "Peri Peri Rolls", price: 12, description: "Food provides essential nutrients for overall health and well-being", category: "Rolls", baseImage: "food_6.png" },
    { name: "Chicken Rolls", price: 20, description: "Food provides essential nutrients for overall health and well-being", category: "Rolls", baseImage: "food_7.png" },
    { name: "Veg Rolls", price: 15, description: "Food provides essential nutrients for overall health and well-being", category: "Rolls", baseImage: "food_8.png" },
    { name: "Ripple Ice Cream", price: 14, description: "Food provides essential nutrients for overall health and well-being", category: "Deserts", baseImage: "food_9.png" },
    { name: "Fruit Ice Cream", price: 22, description: "Food provides essential nutrients for overall health and well-being", category: "Deserts", baseImage: "food_10.png" },
    { name: "Jar Ice Cream", price: 10, description: "Food provides essential nutrients for overall health and well-being", category: "Deserts", baseImage: "food_11.png" },
    { name: "Vanilla Ice Cream", price: 12, description: "Food provides essential nutrients for overall health and well-being", category: "Deserts", baseImage: "food_12.png" },
    { name: "Chicken Sandwich", price: 12, description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich", baseImage: "food_13.png" },
    { name: "Vegan Sandwich", price: 18, description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich", baseImage: "food_14.png" },
    { name: "Grilled Sandwich", price: 16, description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich", baseImage: "food_15.png" },
    { name: "Bread Sandwich", price: 24, description: "Food provides essential nutrients for overall health and well-being", category: "Sandwich", baseImage: "food_16.png" },
    { name: "Cup Cake", price: 14, description: "Food provides essential nutrients for overall health and well-being", category: "Cake", baseImage: "food_17.png" },
    { name: "Vegan Cake", price: 12, description: "Food provides essential nutrients for overall health and well-being", category: "Cake", baseImage: "food_18.png" },
    { name: "Butterscotch Cake", price: 20, description: "Food provides essential nutrients for overall health and well-being", category: "Cake", baseImage: "food_19.png" },
    { name: "Sliced Cake", price: 15, description: "Food provides essential nutrients for overall health and well-being", category: "Cake", baseImage: "food_20.png" },
    { name: "Garlic Mushroom ", price: 14, description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg", baseImage: "food_21.png" },
    { name: "Fried Cauliflower", price: 22, description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg", baseImage: "food_22.png" },
    { name: "Mix Veg Pulao", price: 10, description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg", baseImage: "food_23.png" },
    { name: "Rice Zucchini", price: 12, description: "Food provides essential nutrients for overall health and well-being", category: "Pure Veg", baseImage: "food_24.png" },
    { name: "Cheese Pasta", price: 12, description: "Food provides essential nutrients for overall health and well-being", category: "Pasta", baseImage: "food_25.png" },
    { name: "Tomato Pasta", price: 18, description: "Food provides essential nutrients for overall health and well-being", category: "Pasta", baseImage: "food_26.png" },
    { name: "Creamy Pasta", price: 16, description: "Food provides essential nutrients for overall health and well-being", category: "Pasta", baseImage: "food_27.png" },
    { name: "Chicken Pasta", price: 24, description: "Food provides essential nutrients for overall health and well-being", category: "Pasta", baseImage: "food_28.png" },
    { name: "Buttter Noodles", price: 14, description: "Food provides essential nutrients for overall health and well-being", category: "Noodles", baseImage: "food_29.png" },
    { name: "Veg Noodles", price: 12, description: "Food provides essential nutrients for overall health and well-being", category: "Noodles", baseImage: "food_30.png" },
    { name: "Somen Noodles", price: 20, description: "Food provides essential nutrients for overall health and well-being", category: "Noodles", baseImage: "food_31.png" },
    { name: "Cooked Noodles", price: 15, description: "Food provides essential nutrients for overall health and well-being", category: "Noodles", baseImage: "food_32.png" }
];

const seedDB = async () => {
  await connectDB();
  
  // Wait a second for connection if it is slow
  await new Promise(r => setTimeout(r, 2000));
  
  const uploadFiles = fs.readdirSync('uploads').filter(f => f.endsWith('.png'));
  
  // Clear old items to avoid duplicates
  await foodModel.deleteMany({});
  console.log("Cleared old food items.");

  for (let food of food_list) {
      // Find the file in the uploads folder that ends with food.baseImage
      const matchedImage = uploadFiles.find(f => f.endsWith(food.baseImage));
      
      if (matchedImage) {
          const newFood = new foodModel({
              name: food.name,
              description: food.description,
              price: food.price,
              category: food.category,
              image: matchedImage
          });
          await newFood.save();
          console.log(`Saved ${food.name}`);
      } else {
          console.log(`Could not find image for ${food.name}`);
      }
  }
  
  console.log("Seeding complete!");
  process.exit(0);
};

seedDB();
