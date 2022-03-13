import { buffer } from "micro"; //generate certificate
import * as admin from "firebase-admin";

//secure connection to firebase server
//admin has access to evrything for backend
const serviceAccount = require("../../../fireabase_admin.json");

//not initalizing double app
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

//establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//listening to the script-cli for the event fired after payment success
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  console.log("inside fulfilling order", session);
  console.log(
    "-----------------------going to use firebase APP--------------------------"
  );
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.image),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      quantity: session.metadata.totalItems,
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} has been added to DB!!!`);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    //verify the genuine events to avoid hacker to publish fake event in order to attack so we have certificates
    const reqBuffer = await buffer(req);
    const payload = reqBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    //verify the event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      console.log("event after valid", event);
    } catch (error) {
      console.error("ERROR", error);
      return res.status(404).send(`Webhook error: ${error}`);
    }

    //passes the try catch -> genuine/legit -> handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("SESSION", session);
      //fulfill the order -> store to firebase Db
      return fulfillOrder(session)
        .then(() => res.status(200).send("DB Worked!!!"))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
