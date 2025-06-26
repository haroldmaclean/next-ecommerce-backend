const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')
const verifyToken = require('../middlewares/verifyToken')

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')

    if (!user) return res.status(404).json({ message: 'User not found' })

    // console.log('✅ User fetched:', user) // moved after user is declared

    res.json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin, // ✅ Use the actual boolean
    })
  } catch (err) {
    console.error('❌ Profile error:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
