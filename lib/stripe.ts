import Stripe from "stripe";

let stripeClient: Stripe | undefined;

/** Returns a server-only Stripe client. Never import this from a client component. */
export function getStripeClient() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) throw new Error("Stripe is not configured.");

  if (!stripeClient) stripeClient = new Stripe(apiKey);
  return stripeClient;
}

export function isStripeTestMode() {
  return Boolean(process.env.STRIPE_SECRET_KEY?.match(/^(?:sk|rk)_test_/));
}
