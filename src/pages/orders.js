import { getSession, useSession } from "next-auth/react";
import Header from "../components/Header";
import db from "../../firebase";
import moment from "moment";
import Order from "../components/Order";

function orders({ orders }) {
  const { data: session } = useSession();
  console.log("orders", orders);

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-2 border-yellow-400">
          Your Orders
        </h1>

        {session ? (
          <h2>{orders.length} Order(s)</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders &&
            orders.map(
              ({
                id,
                amount,
                quantity,
                items,
                amountShipping,
                images,
                timestamp,
              }) => (
                <Order
                  key={id}
                  id={id}
                  amount={amount}
                  items={items}
                  amountShipping={amountShipping}
                  images={images}
                  timestamp={timestamp}
                  quantity={quantity}
                />
              )
            )}
        </div>
      </main>
    </div>
  );
}

export default orders;

export async function getServerSideProps(context) {
  //this is backend server side props
  //so anything inside this is node js
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //get the user logged in credential
  const session = await getSession(context);

  if (!session)
    return {
      props: {},
    };
  //get firestore db
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp","desc")
    .get();

  //get stripe db
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
      quantity: order.data().quantity,
    }))
  );

  return {
    props: { orders },
  };
}
