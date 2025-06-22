const express = require('express')
const router = express.Router()
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

// ✅ Confirm route is live
router.post('/checkout', async (req, res) => {
  console.log('🛒 Incoming req.body:', req.body)

  // ✅ Validate incoming data before proceeding
  if (!req.body.items || !Array.isArray(req.body.items)) {
    return res.status(400).json({ error: 'Invalid or missing items array' })
  }

  try {
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image || 'https://via.placeholder.com/150'],
        },
        unit_amount: Math.round(item.price * 100),
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

    res.json({ sessionId: session.id })
  } catch (err) {
    console.error('❌ Checkout error:', err.message)
    res.status(500).json({ error: 'Checkout session creation failed' })
  }
})

module.exports = router
