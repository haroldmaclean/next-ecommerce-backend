// routes/checkout.js
const express = require('express')
const router = express.Router()
const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) // uses current API version

// POST /api/checkout
router.post('/', async (req, res) => {
  try {
    const items = req.body.items

    const line_items = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image], // assumes full image URLs
        },
        unit_amount: Math.round(item.price * 100), // in cents
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${process.env.CLIENT_URL}/thank-you`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    })

    return res.json({ sessionId: session.id })
  } catch (err) {
    console.error('❌ Stripe session creation error:', err.message)
    return res.status(500).json({ error: 'Stripe session creation failed' })
  }
})

module.exports = router
