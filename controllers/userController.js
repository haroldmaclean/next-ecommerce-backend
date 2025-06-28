const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/tempModel");
const { loginSchema } = require("../validations/userValidation");

// ✅ REGISTER USER
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user", // ✅ Add default role
    });

    const savedUser = await user.save();

    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role }, // ✅ Include role in token
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered",
      userId: savedUser._id,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ LOGIN USER
exports.loginUser = async (req, res, next) => {
  try {
    // ✅ Validate request
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, // ✅ Include role in token
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      token,
      role: user.role, // ✅ Return role to frontend
    });
  } catch (error) {
    next(error);
  }
};
