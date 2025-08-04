// testMongo.js
const mongoose = require('mongoose')

const uri =
  'mongodb+srv://haroldmaclean:harold060409876204281983mj@cluster0.hk9vghd.mongodb.net/next-ecommerce-backend?retryWrites=true&w=majority'

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connection successful')
    mongoose.disconnect()
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message)
  })
