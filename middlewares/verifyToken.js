const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Get the token part

  try {
    // Verify the token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add decoded user ID to the request
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
