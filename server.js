const express = require('express')
const cors = require('cors') // ✅ Import CORS
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const testRoutes = require('./routes/testRoutes')
const errorHandler = require('./middlewares/errorHandler')
const checkoutRoutes = require('./routes/checkout')

dotenv.config()
connectDB()

const app = express()

// app.use(cors()) // ✅ Enable CORS for all origins
const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:3000']

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)

app.use(express.json())

// Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/test', testRoutes)
app.use('/api', checkoutRoutes) // ✅ This creates /api/checkout

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
