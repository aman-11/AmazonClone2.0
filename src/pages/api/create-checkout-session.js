const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email, totalItems } = req.body;

  const transformItems = items.map((item) => ({
    //impilicit return means returning data without using retrun keyword
    // use -> ()  -> inside paranthesis use {} braces in order to make object and retrurn in each element
    description: item.description,
    quantity: item.count,
    price_data: {
      currency: "usd",
      product_data: {
        name: item.title,
        images: [item.image],
      },
      unit_amount: item.price * 100,
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1KcmHPSEI2xEw6XXxwFWS4GV"],
    shipping_address_collection: {
      allowed_countries: ["IN", "US"],
    },
    line_items: transformItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      image: JSON.stringify(items.map((item) => item.image)),
      totalItems,
    },
  });

  //stripe give an id in response
  res.status(200).json({ id: session.id });
};

//async function wht is gonna called whn this endpoint is hit
