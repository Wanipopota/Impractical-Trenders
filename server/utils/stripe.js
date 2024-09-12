const stripe = require('stripe')(process.env.sk_test_51Py2DyRoahsY22m3rDGwdjKoNU2Rf0vu2W319MMwb4XB68yLk3rvQyFzu6sE1gNws0qqzm9tbsuLkknC7bFBTNQh00dzjJolYU);

module.exports = {
  createCheckoutSession: async function(items) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price * 100, // Stripe expects the amount in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    return session;
  },

  retrieveCheckoutSession: async function(sessionId) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  },
};