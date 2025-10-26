const express = require('express')
const router = express.Router()
const Product = require('../models/productModel')

// TEMP DEBUG ROUTE
router.get('/testload', (req, res) => {
  res.json({ message: 'Category routes file loaded successfully!' })
})

// GET products by category (and search query)
router.get('/:category', async (req, res) => {
  try {
    const category = req.params.category
    const searchQuery = req.query.search // Base filter: FIX: Use case-insensitive regex for category matching

    let filter = {
      category: { $regex: new RegExp(category, 'i') },
    } // If a search query is provided, add name filtering (case-insensitive)

    if (searchQuery) {
      filter.name = { $regex: searchQuery, $options: 'i' }
      console.log(`Searching for "${searchQuery}" in category: ${category}`)
    } else {
      console.log(`Fetching all products for category: ${category}`)
    } // Use the combined filter to find products

    const products = await Product.find(filter)

    if (products.length === 0) {
      // NOTE: If the debug test worked, this 404 is the issue.
      // We will now return the 404 only if the category itself is invalid,
      // not just if the search yields zero results.
      if (!searchQuery) {
        return res
          .status(404)
          .json({ message: 'No products found for this category' })
      } else {
        // If search was involved, return empty array (200 OK) so the client can display
        // the "no results" message cleanly.
        return res.json([])
      }
    }

    res.json(products)
  } catch (err) {
    console.error('Error fetching category products:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router

// const express = require('express')
// const router = express.Router()
// const Product = require('../models/productModel')

// // GET products by category
// router.get('/:category', async (req, res) => {
//   try {
//     const category = req.params.category
//     console.log(category)
//     const products = await Product.find({ category })

//     if (products.length === 0) {
//       console.log(products)
//       return res
//         .status(404)
//         .json({ message: 'No products found for this category' })
//     }

//     res.json(products)
//   } catch (err) {
//     console.error('Error fetching category products:', err)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// module.exports = router
