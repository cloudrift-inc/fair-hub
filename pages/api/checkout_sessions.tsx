import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import {getStripeSecretKey} from "@/lib/faircompute";

const stripeSecretKey = getStripeSecretKey();

if (!stripeSecretKey) {
  throw new Error("Stripe secret key not found in environment variables");
}

const stripeClient = new Stripe(stripeSecretKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      try {
        const priceId = process.env.PRICE_ID; 
        
        if (!priceId) {
          throw new Error("Stripe secret key not found in environment variables");
        }
        const price = await stripeClient.prices.retrieve(priceId);




        // Create Checkout Session from body params
        const session = await stripeClient.checkout.sessions.create({
          ui_mode: "embedded",
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          mode: "payment",
          return_url: `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
        });

        res.send({
          clientSecret: session.client_secret,
          amount: price.unit_amount, // Send amount along with clientSecret
        });
      } catch (err: any) {
        res.status(err.statusCode || 500).json({ message: err.message });
      }
      break;
    case "GET":
      try {
        const session = await stripeClient.checkout.sessions.retrieve(
          req.query.session_id as string
        );

        // Check if session.customer_details is not null before accessing its properties
        const customerEmail = session.customer_details?.email;

        if (customerEmail) {
          res.send({
            status: session.status,
            customer_email: customerEmail,
            amount: session.amount_total,
          });
        } else {
          res.status(404).json({ message: "Customer email not found" });
        }
      } catch (err: any) {
        res.status(err.statusCode || 500).json({ message: err.message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end("Method Not Allowed");
      break;
  }
}
