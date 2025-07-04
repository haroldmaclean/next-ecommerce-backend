const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const testRoutes = require('./routes/testRoutes')
const errorHandler = require('./middlewares/errorHandler')
const checkoutRoutes = require('./routes/checkout')
const adminRoutes = require('./routes/adminRoutes')
const profileRoutes = require('./routes/profile')

console.log('📦 Starting server.js...')

dotenv.config()
connectDB()

const app = express()

// ✅ Allow both Vercel, Render, and localhost frontend origins
const allowedOrigins = [
  'https://next-ecommerce-store-qfqo.vercel.app',
  'https://next-ecommerce-store.onrender.com',
  'http://localhost:3000'
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  })
)

app.use(express.json())

// ✅ Routes
app.use('/api', profileRoutes)
app.use('/api', userRoutes) // supports /api/register, /api/login
app.use('/api/products', productRoutes)
app.use('/api/test', testRoutes)
app.use('/api', checkoutRoutes)
app.use('/api', adminRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
