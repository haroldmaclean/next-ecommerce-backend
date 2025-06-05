const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById, // ✅ Import single product controller
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  createProductSchema,
  updateProductSchema,
} = require("../validations/productValidation");

const validate = require("../middlewares/validateMiddleware");
const verifyToken = require("../middlewares/verifyToken"); // ✅ Import token middleware

// ✅ Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById); // 👈 Public route to get single product

// 🔒 Protected routes
router.post("/", verifyToken, validate(createProductSchema), addProduct);
router.put("/:id", verifyToken, validate(updateProductSchema), updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
