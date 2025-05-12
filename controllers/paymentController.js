// const Stripe = require('stripe');
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// exports.createCheckoutSession = async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'subscription',
//       line_items: [{
//         price: 'price_xxxx', // from your Stripe dashboard
//         quantity: 1,
//       }],
//       success_url: `${process.env.FRONTEND_URL}/success`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//       metadata: {
//         userId: req.user.id
//       }
//     });

//     res.json({ url: session.url });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to create Stripe session', detail: err.message });
//   }
// };
