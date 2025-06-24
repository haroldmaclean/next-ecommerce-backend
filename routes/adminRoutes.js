// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

// Protected admin route
router.get('/admin', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to the protected admin route!' });
});

module.exports = router;
