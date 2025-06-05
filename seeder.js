const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/productModel");
const products = require("./data/products");

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI); // Debug line to verify env value

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear old data
    await Product.insertMany(products);
    console.log("Sample data imported!");
    process.exit();
  } catch (error) {
    console.error("Import failed:", error);
    process.exit(1);
  }
};

importData();
