const express = require('express')
const cors = require('cors') // ✅ Import CORS
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const testRoutes = require('./routes/testRoutes')
const errorHandler = require('./middlewares/errorHandler')
const checkoutRoute = require('./routes/checkout')

dotenv.config()
connectDB()

const app = express()

app.use('/api/checkout', checkoutRoute)

app.use(cors()) // ✅ Enable CORS for all origins

app.use(express.json())

// Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/test', testRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
