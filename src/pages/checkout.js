import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import {
  selectItems,
  selectTotal,
  selectTotalItems,
} from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession, signIn } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key); //require the public key

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const totalItems = useSelector(selectTotalItems);
  const { data: session, status } = useSession();

  const createCheckoutSession = async () => {
    //send basket items to stripe session
    //then create session for stripe

    //get instance
    const stripe = await stripePromise;

    //call the backend to create checkout session
    //use axios lib to send user to endpoints means making request
    //API -> POST, GET
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
      totalItems: totalItems,
    });

    //redirect the user to stripe checkout page with ID we got after hitting the endpoint checkoutSession(res)
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    //if result has error
    if (result.error) alert(result.error.message);
  };

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/*left side */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
                count={item.count}
              />
            ))}
          </div>
        </div>

        {/*right side */}
        {items.length > 0 && (
          <div className="flex flex-col bg-white p-10 shadow-md">
            {items.length > 0 && (
              <>
                <h2 className="whitespace-nowrap">
                  SubTotal ({totalItems} items):{" "}
                  <span className="font-bold">
                    <Currency quantity={total} currency="USD" />
                  </span>
                </h2>

                <button
                  role="link"
                  onClick={createCheckoutSession}
                  disabled={!session}
                  className={`button mt-2 ${
                    !session &&
                    "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {!session ? "Sign in to checkout" : "Proceed to checkout"}
                </button>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Checkout;
