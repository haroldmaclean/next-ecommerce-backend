const Product = require("../models/productModel");

// Get all products with optional search
// 👇 Add this to productController.js

// Get all products with optional search
exports.getAllProducts = async (req, res, next) => {
  try {
    const searchQuery = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const keyword = {
      name: { $regex: searchQuery, $options: "i" },
    };

    const total = await Product.countDocuments(searchQuery ? keyword : {});
    const products = await Product.find(searchQuery ? keyword : {})
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching single product:", error.message);
    next(error);
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(400).json({ message: "Failed to add product" });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(400).json({ message: "Failed to update product" });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
