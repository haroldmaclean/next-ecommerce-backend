const express = require("express");
const router = express.Router();

router.get("/error", (req, res, next) => {
  const error = new Error("This is a test error");
  error.statusCode = 418; // You can use any custom status code
  next(error);
});

module.exports = router;
