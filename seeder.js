const mongoose = require('mongoose')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const Product = require('./models/productModel')
const products = require('./data/products')

dotenv.config()

// Connect to MongoDB
connectDB()

const importData = async () => {
  try {
    console.log('🧹 Clearing old product data...')
    await Product.deleteMany() // Clear old data

    console.log('📦 Inserting new sample data...')
    await Product.insertMany(products) // Insert new data with external image URLs

    console.log(
      '✅ Sample data imported successfully with external image URLs!'
    )
    process.exit() // Exit script
  } catch (error) {
    console.error('❌ Import failed:', error)
    process.exit(1)
  }
}

importData()
