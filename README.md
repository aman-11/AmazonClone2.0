# Installation Steps

## Using npm

Run commands

1. `npm install`

2. `npm run dev`

## Or using yarn

Run commands

1. `npm install --global yarn`

2. `yarn install`

3. `yarn run dev`

## stripe

checkout (proceed to checkout) -> gen stripe checkout session -> with id redirects to checkout page of stripe
-> PAY -> if pay (success) -> store in firebase Db -> and redirect to success page of our app

stripe in between pay and payment succeeds -> stripe fire the event i.e web Hooks
use that webHook to store in  firebase Db 
## stripe listen --forward-to localhost:3000/api/webhook
## 6203a6324457f989d7c3fb2ca5fef775d30eb  --dependent local sys will cahnge after session expires

    client
1) micro
2) firebase-admin

## session object
{
  id: 'cs_test_b1dANpKeguBOOcFigRYplQobkk95eliYk1A1dW9q8JWnfGDzd7x3EPARPz',
  object: 'checkout.session',
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 24220,
  amount_total: 24919,
  automatic_tax: { enabled: false, status: null },
  billing_address_collection: null,
  cancel_url: 'http://localhost:3000/checkout',
  client_reference_id: null,
  consent: null,
  consent_collection: null,
  currency: 'usd',
  customer: 'cus_LJaaATQ1fpifLQ',
  customer_creation: 'always',
  customer_details: {
    email: 'test@test12.com',
    phone: null,
    tax_exempt: 'none',
    tax_ids: []
  },
  customer_email: null,
  expires_at: 1647287218,
  livemode: false,
  locale: null,
  metadata: {
    email: 'aayushaman11@gmail.com',
    image: '["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"]',
    totalItems: '3'
  },
  mode: 'payment',
  payment_intent: 'pi_3KcxNWSEI2xEw6XX0snAh8vB',
  payment_link: null,
  payment_method_options: {},
  payment_method_types: [ 'card' ],
  payment_status: 'paid',
  phone_number_collection: { enabled: false },
  recovered_from: null,
  setup_intent: null,
  shipping: {
    address: {
      city: 'edew',
      country: 'US',
      line1: 'ewdew',
      line2: 'eew',
      postal_code: '34234',
      state: 'FL'
    },
    name: 'dwsdwedwed'
  },
  shipping_address_collection: { allowed_countries: [ 'IN', 'US' ] },
  shipping_options: [
    {
      shipping_amount: 699,
      shipping_rate: 'shr_1KcmHPSEI2xEw6XXxwFWS4GV'
    }
  ],
  shipping_rate: 'shr_1KcmHPSEI2xEw6XXxwFWS4GV',
  status: 'complete',
  submit_type: null,
  subscription: null,
  success_url: 'http://localhost:3000/success',
  total_details: { amount_discount: 0, amount_shipping: 699, amount_tax: 0 },
  url: null
}