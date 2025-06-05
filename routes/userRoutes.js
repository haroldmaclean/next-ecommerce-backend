const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");
const validate = require("../middlewares/validateMiddleware");
const {
  registerSchema,
  loginSchema,
} = require("../validations/userValidation");

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser); // ✅ Add this line

module.exports = router;
